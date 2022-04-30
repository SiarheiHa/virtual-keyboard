import createNode from './createNode';

export default class Key {
  constructor({ code, letter, shiftLetter }) {
    this.code = code;
    this.letter = letter;
    this.shiftLetter = shiftLetter;
  }

  buildKey() {
    this.keyWrapper = createNode('div', ['key']);
    this.letterNode = createNode('p', ['key__letter'], this.letter);
    this.shiftLetterNode = createNode('p', ['key__shift-letter'], this.shiftLetter);

    this.keyWrapper.append(this.shiftLetterNode, this.letterNode);
    return this.keyWrapper;
  }
}
