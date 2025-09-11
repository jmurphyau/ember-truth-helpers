import Component from '@glimmer/component';
import {
  and,
  gt,
  gte,
  eq,
  isArray,
  isEmpty,
  lt,
  lte,
  notEq,
  not,
  or,
  xor,
} from '#src/index.ts';
import { array, hash } from '@ember/helper';
import AndOrTypeChecking from './and-or-type-checking.gts';

export default class extends Component {
  get maybeString(): string | undefined {
    return Date.now() === 0 ? 'now has gone' : undefined;
  }

  <template>
    {{and true false}}
    {{eq true true}}
    {{gt 8 5}}
    {{gte 6 6}}
    {{isArray (array 5 6 7)}}
    {{isEmpty (hash)}}
    {{lt 5 8}}
    {{lte 6 6}}
    {{notEq 6 5}}
    {{not true}}
    {{or true false}}
    {{xor true false}}

    <AndOrTypeChecking
      @andArg1={{and (hash) (array)}}
      @andArg2={{and true false}}
      @andArg3={{and true true}}
      @andArg4={{and 1 (hash isTruthy=true)}}
      @orArg={{or (hash) (array)}}
      @stringArg={{or this.maybeString "string"}}
    />
  </template>
}
