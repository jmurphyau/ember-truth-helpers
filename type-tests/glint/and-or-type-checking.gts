import type { TOC } from '@ember/component/template-only';

interface Signature {
  Element: HTMLDivElement;
  Args: {
    andArg1: unknown[];
    andArg2: false;
    andArg3: true;
    andArg4: { isTruthy: true };
    orArg: object;
    stringArg: string;
  };
}

const AndOrTypeChecking: TOC<Signature> = <template>
  <div>
    {{! template-lint-disable no-log }}
    {{log @andArg1}}
    {{log @andArg2}}
    {{log @andArg3}}
    {{log @andArg4}}
    {{log @orArg}}
  </div>
</template>;

export default AndOrTypeChecking;
