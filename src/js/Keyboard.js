import createNode from './createNode';
import en from './lang/en';
import ru from './lang/ru';
import Key from './Key';

export default class Keyboard {
  // constructor() {
  //   this.keys = [];
  // }

  buildKeyboard(lang) {
    let currentLang;
    if (lang === 'en') {
      currentLang = en;
    } else {
      currentLang = ru;
    }
    this.keyboard = createNode('div', ['keyboard']);
    currentLang.forEach((key) => {
      const currentKey = new Key(key).buildKey();
      this.keyboard.append(currentKey);
      // this.keys.push(currentKey);
    });
    // console.log(this.keys)
    this.bindEvents();
    return this.keyboard;
  }

  // Bind Events
  bindEvents() {
    // console.log(this.keyboard)
    this.keyboard.addEventListener('mousedown', this.addClassPressed);
    this.keyboard.addEventListener('mouseup', this.removeClassPressed);
    document.addEventListener('keydown', this.addClassPressed);
    document.addEventListener('keyup', this.removeClassPressed);
  }

  addClassPressed(e) {
    // this.keys.find(key => key.getAttribute('data-key') === e.code)
    // console.log(e.code); // надо искать кнопку по дата-атр

    // console.log(keys.find(key => key.getAttribute('data-key') == e.code))
    // console.log(document.querySelectorAll('.key'))
    if (e.target.closest('.key') || e.code) {
      const keys = document.querySelectorAll('.key');
      const pressedKey = e.target.closest('.key')
      || Array.from(keys).find((key) => key.getAttribute('data-key') === e.code);

      pressedKey.classList.add('pressed');
    }
  }

  removeClassPressed(e) {
    if (e.target.closest('.key') || e.code) {
      const keys = document.querySelectorAll('.key');
      const pressedKey = e.target.closest('.key')
      || Array.from(keys).find((key) => key.getAttribute('data-key') === e.code);

      pressedKey.classList.remove('pressed');
    }
  }
}
