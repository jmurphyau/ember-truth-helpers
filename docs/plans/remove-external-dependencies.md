# Plan: remove external dependencies

> **Status:** proposed, not started. A throwaway spike validated the design (§8).
> **Next step:** §6 step 1.
> **Target release:** 6.0.0 (breaking, §7). Written 2026-09-23 against `5.0.0` (`463f748`).

## TL;DR

- Everything external that reaches consumers gets a small local implementation of the
  same idea, not a copy:
  - `@embroider/addon-shim` → `addon-main.cjs` (~25 lines; requires only `node:path`)
  - `isArray` (`@ember/array`) → `src/-private/is-array-like.ts`
  - `isEmpty`, `isEqual` (`@ember/utils`) → implemented in their helper files
  - `Helper` (`@ember/component/helper`) → `src/-private/lazy-helper.ts`
- End state: no `dependencies`. The only external import left in `dist/` is `@ember/helper`,
  the host's helper-manager API. It can't be removed without losing short-circuiting (§5.4).
  `declarations/` reference nothing external.
- Behavior changes are deliberate and listed (§7), so this ships as a major.

**Decisions made here (push back if you disagree):**

1. `devDependencies` are out of scope. They're build/test/lint tooling and never reach
   consumers.
2. `@ember/helper` stays: it's the only way to keep `and`/`or` lazy.
3. The behavior changes in §7 are accepted, so this is 6.0.0.
4. Shared internals go in `src/-private/`.
5. The classic-build "needs ember-auto-import ≥ 2" assertion is dropped.
6. The shim keeps `cacheKeyForTree` and `allowCachingPerBundle`.

## 1. Scope

External dependency means anything the published package makes a consumer install or
resolve that isn't this package's code:

- `package.json#dependencies`
- bare-specifier imports in `dist/` and `declarations/`
- `require`s in `addon-main.cjs`

## 2. Inventory at 5.0.0 (from `pnpm build` output)

| External | Used in | What we use | Cost today |
|---|---|---|---|
| `@embroider/addon-shim` ^1.8.9 | `addon-main.cjs` | `addonV1Shim(__dirname)` | our only `dependencies` entry; its production tree is 67 packages (broccoli-funnel, semver, common-ancestor-path, @embroider/shared-internals, …) |
| `@ember/array` | `utils/truth-convert.ts`, `helpers/is-array.ts` | `isArray` | our truthiness follows Ember's `EmberArray`/`typeOf` rules |
| `@ember/utils` | `helpers/is-empty.ts`, `helpers/is-equal.ts` | `isEmpty`, `isEqual`, re-exported as-is | our semantics change whenever Ember's do |
| `@ember/component/helper` | `helpers/and.ts`, `helpers/or.ts` | `Helper` base class, used only for lazy args | one EmberObject instance (plus a destroyable) per `{{and}}`/`{{or}}` invocation; `.d.ts` exposes Ember's `Helper` type |

On addon-shim: ember-source 6.4 and 6.7 depend on `@embroider/addon-shim` themselves
(4.12, 5.12 and 6.0 don't), and so do most v2 addons. Many apps will keep it installed
either way. What we remove is our own edge: zero declared dependencies and no version range
we impose.

## 3. End state (verify with the §6 commands)

- `package.json` has no `dependencies` key.
- `dist/**/*.js` has exactly one external import:
  `import { capabilities, setHelperManager } from '@ember/helper'` in
  `dist/-private/lazy-helper.js`.
- `declarations/**` has zero external references (5.0.0 has 4).
- `addon-main.cjs` requires only `node:path` and `./package.json`.

## 4. Where the new code lives

| File | Replaces | Why this location |
|---|---|---|
| `addon-main.cjs` (rewritten) | `@embroider/addon-shim` | `package.json#ember-addon.main` and `exports["./addon-main.js"]` fix the path, and the file exists only for classic compatibility. The shim *is* this file; a second file would just pass through. |
| `src/-private/is-array-like.ts` (new) | `isArray` | Shared by `utils/truth-convert.ts` and `helpers/is-array.ts`. `-private/` is the Ember convention for "importable, not API". `utils/` is effectively public: `ember-truth-helpers/utils/truth-convert` is importable and type-tested. |
| `src/-private/lazy-helper.ts` (new) | `Helper` | Shared by `and` and `or`; not API. |
| `src/helpers/is-empty.ts`, `src/helpers/is-equal.ts` (rewritten) | `isEmpty`, `isEqual` | These files exist only to expose the function, so they become the implementation. |

No build-config change is needed:

- `publicEntrypoints(['**/*.js', …])` emits `-private/*` as their own modules.
- `appReexports(['helpers/**/*.js', …])` ignores them.
- `addon.dependencies()` guards against a missing `dependencies` key and keeps `@ember/*`
  external.

## 5. Per dependency

### 5.1 `@embroider/addon-shim` → local v1 shim in `addon-main.cjs`

**What the shim does.** Read from 1.10.0 `src/index.ts` and diffed against the latest,
1.10.3 `dist/index.js`.

- `treeForApp` and `treeForPublic` build a broccoli-funnel over the `ember-addon.app-js` and
  `public-assets` maps. The maps allow any file, anywhere, renamed, which is why it needs
  `common-ancestor-path` and a `getDestinationPath` lookup.
- `treeForAddon` returns `undefined`. v2 code reaches the app only through
  ember-auto-import (EAI).
- `included` registers with the elected EAI leader. It calls `leader()` on EAI ≥ 2.10 and
  otherwise `require`s EAI's internal `auto-import.js`. It goes through the leader only so it
  can forward `autoImportCompat` options. It also supports an optional `disabled` hook.
- `_eaiAssertions` throws if the *parent* is a v1 package without EAI ≥ 2, checked with
  `semver`. It runs in `included` in 1.10.0. 1.10.3 moved it to `postprocessTree` and also
  added `allowCachingPerBundle: true`.
- It also provides a stable `cacheKeyForTree`, an `isDevelopingAddon` override (true when the
  app is inside the addon's directory), and `registerV2Addon` forwarding for old child shims.

**What the host actually needs.** Read from ember-auto-import 2.13.1, ember-cli 7.3.0 and
@embroider/addon-dev.

- EAI bundles `import … from 'X'` found in app code only if the app's `package.json` lists
  `X`, or if `X` was registered (`Package#hasDependency` → `v2AddonResolver.hasV2Addon`).
  Registration therefore matters exactly when the app reaches us through another addon,
  which is this package's common case.
- The EAI addon instance's `registerV2Addon(name, root)` forwards to the leader in every 2.x.
  Sources: addon-shim's own comment, and EAI 2.13.1 `index.js`. Since we pass no
  `autoImportCompat`, we don't need `leader()`.
- ember-cli sets `addon.app` on every top-level addon before calling any `included`
  (`lib/broccoli/ember-app.js`). Registering from `included` is therefore safe in any
  addon order.
- `appReexports` always writes `./X → ./dist/_app_/X`, so our `app-js` map is an identity map
  under one directory. The funnel and common-ancestor machinery collapses to a single
  `treeGenerator` call.
- Overriding `treeForApp` opts out of ember-cli's tree cache: the default `cacheKeyForTree`
  returns `null`. A stable key lets every instance share one tree. That matters here because
  this package is usually nested under many addons.

**Implementation (validated in the spike):**

```js
'use strict';

// Classic (ember-cli) build support; replaces @embroider/addon-shim.
// - dist/_app_ is merged into the host app, so the resolver finds `helper:and` etc.
// - ember-auto-import is told we're a v2 addon, so it bundles the `ember-truth-helpers/*`
//   imports in those files even when the app only depends on us through another addon.
const { join } = require('node:path');

module.exports = {
  name: require('./package.json').name,

  // we have no child addons, so one shared instance can serve every parent
  allowCachingPerBundle: true,

  included(...args) {
    this._super.included.apply(this, args);
    let autoImport = this.project.addons.find((addon) => addon.name === 'ember-auto-import');
    autoImport?.registerV2Addon?.(this.name, __dirname);
  },

  treeForApp() {
    return this.treeGenerator(join(__dirname, 'dist', '_app_'));
  },

  // our trees depend only on our own files, so every instance can share them
  cacheKeyForTree(treeType) {
    return `${this.name}/${treeType}/${__dirname}`;
  },
};
```

**Deliberately not carried over:**

- **Generic `app-js`/`public-assets` mapping:** replaced by the fixed layout above. We have no
  public assets; if one is ever added, add `treeForPublic` then.
- **`leader()`, EAI internals and `semver`:** replaced by feature detection with
  `registerV2Addon?.()`. Only EAI ≥ 2 has that method.
- **`_eaiAssertions`:** dropped. A classic v1 addon that imports us from JS without depending
  on EAI ≥ 2 now fails at runtime with a missing module, instead of at build time. We've
  been a v2 addon since 4.0.0 (2023-09-02), so any such consumer has already had to fix this.
- **`isDevelopingAddon`:** ember-cli's default already covers our only case, which is this
  repo acting as the ember-cli project in the compat try-scenarios.
- **`disabled`, `autoImportCompat`, and `registerV2Addon` forwarding:** unused, since we
  have no child addons.
- **`treeForAddon`/`treeForPublic` overrides:** ember-cli's defaults return nothing when
  `addon/` and `public/` don't exist (`_treeFor` checks `existsSync`).

**Embroider/Vite consumers are unaffected.** Embroider reads `package.json#ember-addon`
directly. `addon-main.cjs` only runs `included`, which registers with EAI only if EAI is
present, exactly as the shim did.

**Coverage gap to close:** nothing in the repo exercises the classic path today.

- The Vite suite never loads `addon-main.cjs`.
- The compat try-scenarios load it, because ember-cli includes an addon project as one of its
  own addons (`discoverProjectAddons`). But they build with Embroider, not the classic
  broccoli + EAI pipeline.

The classic smoke test in §6 closes this gap.

### 5.2 `isArray` from `@ember/array` → `src/-private/is-array-like.ts`

**What Ember does.** Read from ember-source 6.7.0: `@ember/array/index.js`,
`@ember/utils/lib/type-of.js`, `@ember/object/core.js`.

- In dev builds it unwraps CoreObject's debug Proxy via `PROXY_CONTENT`. That Proxy throws
  "use `.get()`" whenever a read would go through `unknownProperty`, as on an ObjectProxy.
- It returns `false` for falsy values and for anything with `setInterval` (i.e. `window`).
- It returns `true` for `Array.isArray` or `EmberArray.detect` (a mixin lookup).
- Otherwise it requires `typeOf(obj) === 'object'` and a non-NaN numeric `length`. `typeOf`
  returns `'instance'` for EmberObject instances, `'filelist'` for FileList and `'string'`
  for boxed strings, so all of those are excluded.

**The idea we keep:** a list is an object with a numeric `length`. That's the definition our
`TruthConvert` type already uses (`ArrayLike<unknown>`), so runtime and types now agree.

```ts
// Replaces `isArray` from '@ember/array': an array is any object with a numeric `length`
// (native arrays, ArrayProxy, arguments, NodeList, …). Checking `in` before reading keeps
// Ember's dev-mode ObjectProxy guard from seeing a forwarded `length` read.
export default function isArrayLike(value: unknown): value is ArrayLike<unknown> {
  return (
    typeof value === 'object' &&
    value !== null &&
    'length' in value &&
    typeof value.length === 'number'
  );
}
```

Callers:

- `truth-convert.ts`: `if (isArrayLike(result)) return result.length !== 0;`
- `helpers/is-array.ts`: `params.every(isArrayLike)`

**Differences from Ember:**

- **Unchanged:** native arrays; Proxies over native arrays; ArrayProxy (it has a native
  `length` getter); `arguments`; typed arrays; NodeList. An ObjectProxy wrapping an array is
  still `false`.
- **Now counted as arrays:** EmberObject instances with a numeric `length`, `FileList`,
  `window`, boxed strings, and `{ length: NaN }`. The realistic case is a model with a
  `length` attribute. With `length: 0` it becomes falsy in `and`/`or`/`not`/`xor`, and
  `is-array` returns true for it.

### 5.3 `@ember/utils` → `src/helpers/is-empty.ts`, `src/helpers/is-equal.ts`

**What Ember's `isEmpty` does:**

- `null`/`undefined` → true.
- A numeric `obj.size` decides, except on objects with `unknownProperty`.
- For objects it then tries `get(obj, 'size')` and `get(obj, 'length')`. Both see through
  proxies and are autotracked.
- Otherwise a numeric `length` decides, except on functions (so strings work).

**The idea we keep:** nothing at all, or a string or collection with no entries.

```ts
// Replaces `isEmpty` from '@ember/utils': null/undefined, or a string or collection whose
// `size` (Map, Set) or `length` (string, array-like) is 0.
export default function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.length === 0;
  if (typeof value !== 'object') return false;
  if ('size' in value && typeof value.size === 'number') return value.size === 0;
  if ('length' in value && typeof value.length === 'number') return value.length === 0;
  return false;
}
```

**Differences from Ember:**

- **No ObjectProxy forwarding:** `ObjectProxy.create({ content: [] })` now gives `false`
  (it gave `true`).
- **No autotracking of KVO mutation:** a plain array changed through
  `A()`/`pushObject`/`notifyPropertyChange` no longer makes `{{is-empty}}` recompute.
  - Verified: after `pushObject`, Ember's `isEmpty` updates but the local one stays stale.
  - `{{not}}` is already stale today in the same case, because `truthConvert` reads
    `.length` directly. The local `is-empty` just matches it.
  - ArrayProxy still recomputes, because its `length` getter consumes its own tag.
  - Reassigning a tracked property still recomputes.
- **`size` only counts on objects.**

**What Ember's `isEqual` does:** if `a` has an `isEqual` method, `a.isEqual(b)` decides.
Dates compare by `getTime()`. Everything else uses `===`. With only three rules, any
faithful version looks like this one, and we want the semantics unchanged. `is-equal-test`
pins the asymmetry: only the left operand's `isEqual` counts.

```ts
// Replaces `isEqual` from '@ember/utils': `===`, except a left operand with an
// `isEqual(other)` method decides for itself, and Dates compare by time.
export default function isEqual(a: unknown, b: unknown): boolean {
  if (typeof (a as { isEqual?: unknown } | null | undefined)?.isEqual === 'function') {
    return (a as { isEqual(other: unknown): boolean }).isEqual(b);
  }
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
  return a === b;
}
```

### 5.4 `Helper` from `@ember/component/helper` → `src/-private/lazy-helper.ts` (+ `and.ts`, `or.ts`)

**Why `and`/`or` extend `Helper` today:** laziness, so they short-circuit. Read from
ember-source 6.7.0 `@glimmer/manager`:

- A plain function helper goes through `FunctionHelperManager.getValue`, which calls
  `fn(...args.positional)`. The spread evaluates every argument.
- A custom manager receives the `argsProxyFor(…)` proxy instead. Reading `positional.length`
  evaluates nothing, and reading `positional[i]` evaluates only argument `i`.
- `Helper`'s `ClassicHelperManager` is one of these custom managers. On top of that it calls
  `definition.create(ownerInjection)` on every invocation and adds a destroyable and a
  recompute tag.

**The idea we keep:** give the helper the lazy positional proxy. We do it through the
public helper-manager API (RFC 625, Ember ≥ 3.25), without EmberObject.

```ts
import { capabilities, setHelperManager } from '@ember/helper';

// Replaces extending Helper from '@ember/component/helper'. Templates hand `pick` the lazy
// positional-args proxy, so only the arguments it reads are evaluated (and tracked).
// JavaScript callers get a normal variadic function.
export default function lazyHelper<Fn extends (...params: never[]) => unknown>(
  pick: (params: ArrayLike<unknown>) => unknown,
): Fn {
  const helper = (...params: unknown[]) => pick(params);
  const manager = {
    capabilities: capabilities('3.23', { hasValue: true }),
    createHelper: (_: unknown, args: { positional: ArrayLike<unknown> }) => args,
    getValue: (args: { positional: ArrayLike<unknown> }) => pick(args.positional),
  };
  return setHelperManager(() => manager, helper) as unknown as Fn;
}
```

```ts
// src/helpers/and.ts (the FirstFalsy<T> type is unchanged)
// Lazy so it short-circuits like `&&`: arguments after the first falsy one are never evaluated.
export default lazyHelper<
  <const T extends MaybeTruthy[]>(...params: T) => FirstFalsy<T>
>((params) => {
  for (let i = 0; i < params.length; i++) {
    const param = params[i];
    if (!truthConvert(param)) return param;
  }
  return params[params.length - 1];
});
```

`or.ts` has the same shape: `<T extends MaybeTruthy[]>(...params: T) => FirstTruthy<T>`
with `if (truthConvert(param)) return param;`.

- **The one import that stays: `@ember/helper`.** Registering a manager with the host's VM is
  the only way to receive lazy args. The zero-import alternative is plain functions, and
  they evaluate every argument. That fails the short-circuit tests in
  `tests/helpers/{and,or}-test.gts` and breaks guards like
  `{{and this.user (can-edit this.user)}}`.
- **Types:** `and` and `or` are exported as generic function types, so
  `FirstFalsy`/`FirstTruthy` inference is unchanged.
  - Glint resolves a plain function with an identity overload,
    `resolve<T>(item: T): NonNullable<T>`. That's true in Glint 1.5.2 (latest stable) and
    2.0.0-alpha.3, in both the strict and the loose environment, so generics survive in
    templates and in the registry.
  - The `.d.ts` no longer references `@ember/component/helper`.
- **New capability:** `and(a, b)` and `or(a, b)` can now be called from JS. They evaluate
  eagerly there, as JS always does.
- **Type tests:** `type-tests/helpers/{and,or}.test.ts` build
  `new AndHelper<T>().compute(params)`. Replace the wrapper body with `return and(...params)`
  (likewise for `or`). The expectations stay the same.

### 5.5 `package.json` and lockfile

- Delete `dependencies`, then run `pnpm install` to update `pnpm-lock.yaml`. Never edit the
  lockfile by hand.
- addon-shim stays in the lockfile through devDependencies (ember-source 6.7, ember-qunit,
  @ember/test-helpers, …). That's expected.
- `peerDependencies` stays absent, and `ember-addon.versionCompatibility.ember` stays `>=4.8`.

## 6. Steps

Each step is independent and each commit must be green on `pnpm lint && pnpm test`.

1. Add `src/-private/is-array-like.ts` and switch `truth-convert.ts` and `helpers/is-array.ts`
   to it. This drops `@ember/array`.
2. Rewrite `helpers/is-empty.ts` and `helpers/is-equal.ts`. This drops `@ember/utils`.
3. Add `src/-private/lazy-helper.ts`, rewrite `and.ts` and `or.ts`, and port the type tests.
   This drops `@ember/component/helper`.
4. Rewrite `addon-main.cjs`, delete `dependencies`, run `pnpm install`, and add the classic
   smoke test and its CI job.
5. README:
   - Update the `is-array`, `is-empty` and `is-equal` rows to describe the local rules.
   - Update the paragraph saying "`is-equal` uses `Ember.isEqual`".
   - The Compatibility section is unchanged.

**Tests to add**, grouped by the step that needs them:

- **Step 1** (`is-array` and `truthConvert`):
  - empty and non-empty ArrayProxy;
  - an ObjectProxy wrapping an array gives `false`, with no assertion in a dev build;
  - an EmberObject with `length: 0`, to document the new rule.
- **Step 2:**
  - `is-empty`: Map and Set; ArrayProxy; an ObjectProxy gives `false` (documents the
    change); an `A()` + `pushObject` case that documents the missing KVO recompute.
  - `is-equal`: Dates.
- **Step 3** (`and`/`or`):
  - A throwing sub-expression after the deciding argument is never evaluated. Test it in
    strict mode and in loose mode (`this.owner.register('helper:and', and)` plus
    `precompileTemplate(…, { strictMode: false })`).
  - Direct JS calls.
- **Step 4:** add `scripts/classic-smoke-test.sh` and run it from a new `classic-smoke` CI
  job:
  1. Run `pnpm pack` to get a tarball.
  2. Generate an app with `npx ember-cli@5.12 new classic-app --skip-git --skip-npm`.
  3. Generate a minimal v1 addon:
     - `keywords: ["ember-addon"]`;
     - dependencies: `ember-cli-babel`, `ember-cli-htmlbars` and the tarball;
     - `app/components/uses-truth.hbs` uses the helpers.
  4. Make the app depend on that addon only. If the app depended on us directly, the
     registration code would never be exercised.
  5. Run `npm install --install-links`. Plain `file:` links skip the addon's own dependencies.
  6. Run `ember test` with one integration test:
     - `<UsesTruth />` renders the expected values;
     - `{{and this.foo.bar this.foo.baz}}` in the app template reads only `bar`.

  This is the only test that covers `treeForApp` and the EAI registration.

**Verification:**

```sh
pnpm lint && pnpm test
pnpm build
grep -rhE "^(import|export) .* from ['\"][^.'\"]" dist --include=*.js | grep -v "ember-truth-helpers/" | sort -u
#   expect exactly: import { capabilities, setHelperManager } from '@ember/helper';
grep -rE "(from |import\()['\"][^.'\"]" declarations | wc -l    # expect 0 (5.0.0: 4)
node -p "require('./package.json').dependencies"                  # expect undefined
bash scripts/classic-smoke-test.sh
```

The CI try matrix (4.8 LTS through alpha) must also be green. The spike only ran on
ember-source 6.7.0 (Vite) and 5.12.0 (classic).

## 7. Breaking changes → 6.0.0

- **`and`/`or` default exports** change from `Helper` subclasses to functions. That breaks
  code that `new`s them, `.extend()`s them, or types them as classes. Template usage is
  unchanged.
- **`is-empty`** no longer forwards through ObjectProxy and no longer autotracks KVO
  mutation (§5.3).
- **Array-likeness** in `is-array` and in `and`/`or`/`not`/`xor` truthiness now means any
  object with a numeric `length` (§5.2).
- **Classic builds** lose the build-time "needs ember-auto-import ≥ 2" assertion (§5.1).
- **Release**, per RELEASE.md: label the PR `breaking`. release-it bumps the version and
  writes CHANGELOG, so edit neither by hand.

## 8. Spike evidence

The spike was a throwaway worktree off `463f748` and was not committed.

- **Vite suite (ember-source 6.7.0):** the 72 existing tests pass, plus 5 spike tests
  covering:
  - short-circuiting through the custom manager, in strict and loose mode (loose via
    `owner.register`);
  - a throwing-argument guard;
  - ArrayProxy;
  - an ObjectProxy in a dev build;
  - direct JS calls.
- **Guard proof:** removing `'length' in value` makes the ObjectProxy test fail with Ember's
  "You attempted to access the `length` property … use `.get('length')`" assertion.
- **KVO:** after `A()` + `pushObject`, Ember's `isEmpty` recomputes and the local one doesn't.
  `{{not}}` doesn't recompute with either implementation. ArrayProxy + `pushObject`
  recomputes with the local one.
- **Lint:** `lint:js`, `lint:types`, `lint:types-tests` and `lint:hbs` pass with
  function-typed `and`/`or` and the type tests ported as in §5.4. `lint:format` flagged only
  the hand-written spike files; `pnpm format` fixes those.
- **Build:** `dist/` imports only `@ember/helper`, and `declarations/` has 0 external
  references.
- **Classic app:** ember-cli 5.12.0, ember-source 5.12.0, ember-auto-import 2.13.1, webpack
  5.111.1. The app depends on ember-truth-helpers only through a v1 addon. `ember test`
  passes: the helpers render from the addon's app-tree template and from the app's own
  template, and short-circuiting holds.
- **Negative control:** without the `registerV2Addon` call the same test fails. The EAI
  chunk no longer defines `ember-truth-helpers/helpers/and`; only the app's AMD re-export
  references it.
- **Not verified:** the Ember 4.8–6.6 runtime (the CI try matrix covers it) and classic
  ember-cli versions other than 5.12.

## 9. Rejected alternatives

- **Vendoring any dependency's code:** the brief excludes it, and addon-shim would also
  bring its 4 dependencies.
- **`init() { this.treePaths.app = 'dist/_app_' }` instead of `treeForApp`:** it's shorter
  and keeps ember-cli's default caching. But it mutates an undocumented ember-cli property,
  whereas `treeForApp` plus `treeGenerator` are the points addon-shim already relies on
  everywhere.
- **Plain-function `and`/`or` with zero imports:** loses laziness (§5.4).
- **An iterable-based array check (`Symbol.iterator` plus `length`):** ArrayProxy isn't
  iterable in ember-source 6.7, so an empty ArrayProxy would turn truthy.
- **`objectAt` duck-typing:** misses NodeList, `arguments` and typed arrays.
- **Keeping `get()` in `is-empty`** for proxies and KVO: that needs `@ember/object`.
