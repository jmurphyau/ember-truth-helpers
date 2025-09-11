/**
 * Debugging:
 *   https://eslint.org/docs/latest/use/configure/debug
 *  ----------------------------------------------------
 *
 *   Print a file's calculated configuration
 *
 *     npx eslint --print-config path/to/file.js
 *
 *   Inspecting the config
 *
 *     npx eslint --inspect-config
 *
 */
import babelParser from '@babel/eslint-parser';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import ember from 'eslint-plugin-ember/recommended';
import importPlugin from 'eslint-plugin-import';
import n from 'eslint-plugin-n';
import globals from 'globals';
import ts from 'typescript-eslint';

const esmParserOptions = {
  ecmaFeatures: { modules: true },
  ecmaVersion: 'latest',
};

const tsParserOptions = {
  projectService: true,
  project: true,
  tsconfigRootDir: import.meta.dirname,
};

const config = [
  js.configs.recommended,
  prettier,
  ember.configs.base,
  ember.configs.gjs,
  ember.configs.gts,
  /**
   * Ignores must be in their own object
   * https://eslint.org/docs/latest/use/configure/ignore
   */
  {
    ignores: [
      'dist/',
      'dist-*/',
      'declarations/',
      'node_modules/',
      'coverage/',
      '!**/.*',
    ],
  },
  /**
   * https://eslint.org/docs/latest/use/configure/configuration-files#configuring-linter-options
   */
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      parser: babelParser,
    },
  },
  {
    files: ['**/*.{js,gjs}'],
    languageOptions: {
      parserOptions: esmParserOptions,
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    files: ['**/*.{ts,gts}'],
    languageOptions: {
      parser: ember.parser,
      parserOptions: tsParserOptions,
    },
    extends: [...ts.configs.recommendedTypeChecked, ember.configs.gts],
  },
  {
    files: ['src/**/*'],
    plugins: {
      import: importPlugin,
    },
    rules: {
      // require relative imports use full extensions
      'import/extensions': ['error', 'always', { ignorePackages: true }],
    },
  },
  /**
   * CJS node files
   */
  {
    files: [
      '**/*.cjs',
      '.prettierrc.cjs',
      '.template-lintrc.cjs',
      'addon-main.cjs',
    ],
    plugins: {
      n,
    },

    languageOptions: {
      sourceType: 'script',
      ecmaVersion: 'latest',
      globals: {
        ...globals.node,
      },
    },
  },
  /**
   * ESM node files
   */
  {
    files: ['**/*.mjs'],
    plugins: {
      n,
    },

    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 'latest',
      parserOptions: esmParserOptions,
      globals: {
        ...globals.node,
      },
    },
  },
];

export default ts.config(...config);
