import Component from '@glimmer/component';

export default class extends Component {
  get maybeString(): string | undefined {
    return Date.now() === 0 ? 'now has gone' : undefined;
  }
}
