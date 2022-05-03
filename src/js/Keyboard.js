import createNode from './createNode';
import en from './lang/en';
import ru from './lang/ru';
import Key from './Key';

export default class Keyboard {
  constructor() {
    this.keys = [];
    this.isCaps = false;
    this.isShift = false;
  }

  buildKeyboard(lang) {
    this.wrapper = createNode('div', ['wrapper']);
    this.title = createNode('h1', ['title'], 'For change language press Shift + Alt');
    this.textArea = createNode('textarea', ['textarea']);
    let currentLang;
    if (lang === 'en') {
      currentLang = en;
    } else {
      currentLang = ru;
    }
    this.lang = currentLang;
    this.keyboard = createNode('div', ['keyboard']);
    currentLang.forEach((key) => {
      const currentKey = new Key(key).buildKey();
      this.keyboard.append(currentKey);
      this.keys.push(currentKey);
    });

    // console.log(this.keys)
    this.wrapper.append(this.title, this.textArea, this.keyboard);
    document.body.append(this.wrapper);
    this.bindEvents();
    // console.log(this);
    return this;
    // return this.keyboard;
  }

  // Bind Events
  bindEvents() {
    // console.log(this)
    // .bind - привязка контекста
    document.addEventListener('mousedown', this.handleDown.bind(this));
    // document.addEventListener('mousedown', (event) => this.handleDown(event));
    document.addEventListener('mouseup', this.handleUp.bind(this));
    document.addEventListener('keydown', this.handleDown.bind(this));
    document.addEventListener('keyup', this.handleUp.bind(this));
    return this;
  }

  handleDown(e) {
    // добавление класса нажатия
    const pressedKey = e.target.closest('.key') // нажатая кнопка
    || this.keys.find((key) => key.dataset.key === e.code);
    // || document.querySelector(`[data-key=${e.code}]`);
    if (pressedKey) {
      pressedKey.classList.add('pressed');
      // проверка на нажатие капса и шифта
      // this.isCaps = pressedKey.getAttribute('data-key') === 'CapsLock';
      // if (pressedKey.getAttribute('data-key') === 'ShiftRight'
      // || pressedKey.getAttribute('data-key') === 'ShiftLeft') {
      //   this.isShift = true;
      // }
      if (pressedKey.dataset.key === 'CapsLock') {
        if (!this.isCaps) {
          this.showShiftLetter();
          this.isCaps = true;
        } else {
          this.hideShiftLetter();
          this.isCaps = false;
        }
      }
      // console.log(this.isCaps)

    // // если капс был нажат нужно менять классы у элементов кнопкок всей клавиатуры
    // if (this.isCaps || this.isShift) {
    //   this.showKeysInCaps();
    // }
    }
  }

  handleUp(e) {
    const pressedKey = e.target.closest('.key')
    || this.keys.find((key) => key.dataset.key === e.code);
    if (pressedKey) {
      pressedKey.classList.remove('pressed');
    }
  }

  showShiftLetter() {
    this.keys.forEach((key) => {
      // console.log(key.firstChild.innerText.toUpperCase())
      const currentKey = key;
      if (!currentKey.classList.contains('key_fn')) {
        currentKey.firstChild.innerText = currentKey.firstChild.innerText.toUpperCase();
        currentKey.lastChild.innerText = currentKey.lastChild.innerText.toUpperCase();
      }
      // key.firstChild.classList.remove('hidden');
      // key.lastChild.classList.add('hidden');
    });
    // const shiftLetters = document.querySelectorAll('.key__shift-letter');
    // const smallLetters = document.querySelectorAll('.key__letter');
    // shiftLetters.forEach((letter) => letter.classList.remove('hidden'));
    // smallLetters.forEach((letter) => letter.classList.add('hidden'));
  }

  hideShiftLetter() {
    this.keys.forEach((key) => {
      const currentKey = key;
      if (!currentKey.classList.contains('key_fn')) {
        currentKey.firstChild.innerText = currentKey.firstChild.innerText.toLowerCase();
        currentKey.lastChild.innerText = currentKey.lastChild.innerText.toLowerCase();
      }
      // key.firstChild.classList.add('hidden');
      // key.lastChild.classList.remove('hidden');
    });
    // const shiftLetters = document.querySelectorAll('.key__shift-letter');
    // const smallLetters = document.querySelectorAll('.key__letter');
    // shiftLetters.forEach((letter) => letter.classList.add('hidden'));
    // smallLetters.forEach((letter) => letter.classList.remove('hidden'));
  }
}
