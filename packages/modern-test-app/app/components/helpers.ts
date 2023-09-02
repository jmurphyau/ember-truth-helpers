import Component from '@glimmer/component';

export default class extends Component {
  get objectOrUndefined(): object | undefined {
    return new Date().getMonth() === 7 ? { foo: 'bar' } : undefined;
  }

  get arrayOrUndefined(): object | undefined {
    return new Date().getMonth() === 6 ? ['foo', 'bar'] : undefined;
  }
}
