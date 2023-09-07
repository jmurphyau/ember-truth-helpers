import templateOnly from '@ember/component/template-only';

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

const AndOrTypeChecking = templateOnly<Signature>();

export default AndOrTypeChecking;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    AndOrTypeChecking: typeof AndOrTypeChecking;
  }
}
