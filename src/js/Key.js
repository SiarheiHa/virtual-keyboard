import createNode from './createNode';

export default class Key {
  constructor({ code, letter, shiftLetter }) {
    this.code = code;
    this.letter = letter;
    this.shiftLetter = shiftLetter;
    this.isFnKey = !shiftLetter;
  }

  buildKey() {
    this.keyWrapper = createNode('div', ['key']);
    if (this.isFnKey) {
      this.keyWrapper.classList.add('key_fn', this.code);
    }
    this.keyWrapper.setAttribute('data-key', this.code);
    this.letterNode = createNode('p', ['key__letter'], this.letter);
    this.shiftLetterNode = createNode('p', ['key__shift-letter', 'hidden'], this.shiftLetter);
    if (this.isFnKey || this.code.includes('Key')) {
      this.shiftLetterNode.innerHTML = this.letter;
    }

    this.keyWrapper.append(this.shiftLetterNode, this.letterNode);
    return this.keyWrapper;
  }
}
