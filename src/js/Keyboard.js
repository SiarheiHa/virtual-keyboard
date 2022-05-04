import createNode from './createNode';
import en from './lang/en';
import ru from './lang/ru';
import Key from './Key';

export default class Keyboard {
  constructor() {
    this.isCaps = false;
    this.isShift = false;
  }

  getLang() {
    const lang = localStorage.getItem('lang');
    if (lang === 'ru') this.lang = ru;
    else { this.lang = en; }
  }

  setLang() {
    if (this.lang === ru) {
      localStorage.setItem('lang', 'ru');
    } else {
      localStorage.setItem('lang', 'en');
    }
  }

  buildKeyboard() {
    this.wrapper = createNode('div', ['wrapper']);
    this.title = createNode('h1', ['title'], 'For change language press Ctrl + Shift');
    this.textArea = createNode('textarea', ['textarea']);

    this.keyboard = createNode('div', ['keyboard']);

    this.buildKeys();

    this.wrapper.append(this.title, this.textArea, this.keyboard);
    document.body.append(this.wrapper);
    this.bindEvents();
    return this;
  }

  buildKeys() {
    this.keyboard.innerHTML = '';
    this.keys = [];
    if (!this.lang) this.getLang();
    this.lang.forEach((key) => {
      const currentKey = new Key(key).buildKey();
      this.keyboard.append(currentKey);
      this.keys.push(currentKey);
    });
  }

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
    if (e.repeat === true) return;
    const { type, target, code } = e;
    // e.preventDefault()
    // console.log(e);
    const pressedKey = target.closest('.key') // нажатая кнопка
    || this.keys.find((key) => key.dataset.key === code);
    // || document.querySelector(`[data-key=${e.code}]`);
    if (pressedKey) {
      // добавление класса нажатия на кнопку
      pressedKey.classList.add('pressed');
      // проверка на нажатие капса
      if (pressedKey.dataset.key === 'CapsLock') {
        if (!this.isCaps) {
          this.showBigLetter();
          this.isCaps = true;
        } else {
          this.showSmallLetter();
          this.isCaps = false;
        }
      }
      // проверка на нажатие шифта
      if (pressedKey.dataset.key === 'ShiftLeft'
      || pressedKey.dataset.key === 'ShiftRight') {
        this.showShiftLetter();
        if (this.isCaps) {
          this.showSmallLetter();
          this.isShift = true;
        } else {
          this.showBigLetter();
          this.isShift = false;
        }
      }
      // проверка на нажатие Alt
      if (e.ctrlKey === true && e.shiftKey === true
        || pressedKey.dataset.key === 'MetaLeft') {
        this.changeLang();
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
      // проверка на нажатие шифта
      if (pressedKey.dataset.key === 'ShiftLeft'
    || pressedKey.dataset.key === 'ShiftRight') {
        this.hideShiftLetter();
        if (this.isCaps) {
          this.showBigLetter();
          this.isShift = true;
        } else {
          this.showSmallLetter();
          this.isShift = false;
        }
      }
    }
  }

  showBigLetter() {
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

  showSmallLetter() {
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

  showShiftLetter() {
    this.keys.forEach((key) => {
      key.firstChild.classList.remove('hidden');
      key.lastChild.classList.add('hidden');
    });
  }

  hideShiftLetter() {
    this.keys.forEach((key) => {
      key.firstChild.classList.add('hidden');
      key.lastChild.classList.remove('hidden');
    });
  }

  changeLang() {
    if (this.lang === ru) this.lang = en;
    else { this.lang = ru; }
    this.buildKeys();
    this.setLang();
  }
}
