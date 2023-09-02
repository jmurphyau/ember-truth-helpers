import templateOnly from '@ember/component/template-only';

interface Signature {
  Element: HTMLDivElement;
  Args: {
    andArg: object | string[];
    orArg: object | string[];
  };
}

const AndOrTypeChecking = templateOnly<Signature>();

export default AndOrTypeChecking;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    AndOrTypeChecking: typeof AndOrTypeChecking;
  }
}
