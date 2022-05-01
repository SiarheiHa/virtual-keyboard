import createNode from './createNode';
import en from './lang/en';
import ru from './lang/ru';
import Key from './Key';

export default class Keyboard {
//   constructor({ code, letter, shiftLetter }) {
//     this.code = code;
//     this.letter = letter;
//     this.shiftLetter = shiftLetter;
//   }

  buildKeyboard(lang) {
    let currentLang;
    if (lang === 'en') {
      currentLang = en;
    } else {
      currentLang = ru;
    }
    // lang === 'en' ? currentLang = en : currentLang = ru;
    this.keyboard = createNode('div', ['keyboard']);
    // this.letterNode = createNode('p', ['key__letter'], this.letter);
    // this.shiftLetterNode = createNode('p', ['key__shift-letter'], this.shiftLetter);

    // this.keyWrapper.append(this.shiftLetterNode, this.letterNode);
    currentLang.forEach((key) => {
      this.keyboard.append(new Key(key).buildKey());
    });
    this.bindEvents();
    return this.keyboard;
  }

  // Bind Events
  bindEvents() {
    this.keyboard.addEventListener('mousedown', this.addClassPressed);
    this.keyboard.addEventListener('mouseup', this.removeClassPressed);
    document.addEventListener('keydown', this.addClassPressed);
    document.addEventListener('keyup', this.removeClassPressed);
  }

  addClassPressed(e) {
    console.log(e.code) // надо искать кнопку по дата-атр
    if (e.target.closest('.key')) {
      e.target.closest('.key').classList.add('pressed');
    }
  }

  removeClassPressed(e) {
    if (e.target.closest('.key')) {
      e.target.closest('.key').classList.remove('pressed');
    }
  }
}
