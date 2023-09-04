import templateOnly from '@ember/component/template-only';

interface Signature {
  Element: HTMLDivElement;
  Args: {
    andArg: object | boolean;
    orArg: object | boolean;
    andFallbackArg: string;
    orFallbackArg: string;
  };
}

const AndOrTypeChecking = templateOnly<Signature>();

export default AndOrTypeChecking;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    AndOrTypeChecking: typeof AndOrTypeChecking;
  }
}
