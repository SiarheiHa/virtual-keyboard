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
    this.title = createNode('h1', ['title'], 'To change the language, press Ctrl + Shift or click on the language change key');
    this.subtitle = createNode('h2', ['subtitle'], 'The keyboard was created in Windows');
    this.textArea = createNode('textarea', ['textarea']);
    this.keyboard = createNode('div', ['keyboard']);

    this.buildKeys();

    this.wrapper.append(this.title, this.subtitle, this.textArea, this.keyboard);
    document.body.append(this.wrapper);
    this.bindEvents();
    return this;
  }

  buildKeys() {
    this.keyboard.innerHTML = '';
    this.keys = [];
    // получить язык при первом запуске
    if (!this.lang) this.getLang();
    this.lang.forEach((key) => {
      const currentKey = new Key(key).buildKey();
      this.keys.push(currentKey);
    });
    this.keyboard.append(...this.keys);
  }

  bindEvents() {
    document.addEventListener('mousedown', this.handleDown.bind(this));
    document.addEventListener('mouseup', this.handleUp.bind(this));
    document.addEventListener('keydown', this.handleDown.bind(this));
    document.addEventListener('keyup', this.handleUp.bind(this));
    return this;
  }

  handleDown(e) {
    const { type, target, code } = e;
    const pressedKey = target.closest('.key') // нажатая кнопка
    || this.keys.find((key) => key.dataset.key === code);
    // для событий кнопки отключить поведение по умолчанию
    if (type === 'keydown') e.preventDefault();
    if (e.repeat === true && !pressedKey.dataset.key.match(/Backspace|Delete|Arrow/)) {
      return;
    }
    // фокус на поле для текста
    this.textArea.focus();
    if (pressedKey) {
      // добавление класса нажатия на кнопку
      pressedKey.classList.add('pressed');
      // проверка на нажатие капса
      if (pressedKey.dataset.key === 'CapsLock') {
        if (!this.isCaps) {
          this.showBigLetter();
          this.isCaps = true;
          pressedKey.classList.add('active');
        } else {
          this.showSmallLetter();
          this.isCaps = false;
          pressedKey.classList.remove('active');
        }
        return;
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
          this.isShift = true;
        }
      }
      // смена языка
      if ((e.ctrlKey === true && e.shiftKey === true)
        || (pressedKey.dataset.key === 'MetaLeft' && type === 'mousedown')) {
        setTimeout(this.changeLang.bind(this), 100);
      }
      // печать
      if (pressedKey.dataset.key.match(/Backquote|Digit|Minus|Equal|Comma|Backslash|Backspace|Tab|Delete|Key|Enter|Semicolon|Bracket|Period|Slash|Quote|Arrow|Space/)) {
        this.print(pressedKey.dataset.key);
      }
    }
  }

  handleUp(e) {
    const pressedKey = e.target.closest('.key')
    || this.keys.find((key) => key.dataset.key === e.code);
    this.textArea.focus();
    if (pressedKey) {
      pressedKey.classList.remove('pressed');
      // проверка на нажатие шифта
      if (pressedKey.dataset.key === 'ShiftLeft'
    || pressedKey.dataset.key === 'ShiftRight') {
        this.hideShiftLetter();
        if (this.isCaps) {
          this.showBigLetter();
          this.isShift = false;
        } else {
          this.showSmallLetter();
          this.isShift = false;
        }
      }
    }
  }

  showBigLetter() {
    this.keys.forEach((key) => {
      const currentKey = key;
      if (!currentKey.classList.contains('key_fn')) {
        currentKey.firstChild.innerText = currentKey.firstChild.innerText.toUpperCase();
        currentKey.lastChild.innerText = currentKey.lastChild.innerText.toUpperCase();
      }
    });
  }

  showSmallLetter() {
    this.keys.forEach((key) => {
      const currentKey = key;
      if (!currentKey.classList.contains('key_fn')) {
        currentKey.firstChild.innerText = currentKey.firstChild.innerText.toLowerCase();
        currentKey.lastChild.innerText = currentKey.lastChild.innerText.toLowerCase();
      }
    });
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

    this.keys.forEach((key) => {
      const currentKeyObj = this.lang.find((keyObj) => keyObj.code === key.dataset.key);
      const currentKey = key;
      currentKey.lastChild.innerText = currentKeyObj.letter;
      currentKey.firstChild.innerText = currentKeyObj.shiftLetter || currentKeyObj.letter;
    });
    if (this.isCaps && this.isShift) this.showSmallLetter();
    this.setLang();
  }

  print(code) {
    const currentKeyObj = this.lang.find((key) => key.code === code);

    let position = this.textArea.selectionStart;
    const head = this.textArea.value.slice(0, position);
    const tail = this.textArea.value.slice(position);

    let letter;
    switch (code) {
      case 'ArrowLeft': {
        if (position > 0)position -= 1;
        this.textArea.setSelectionRange(position, position);
        return;
      }
      case 'ArrowRight': {
        if (position <= this.textArea.value.length - 1)position += 1;
        this.textArea.setSelectionRange(position, position);
        return;
      }
      case 'Backspace': {
        this.textArea.value = `${head.slice(0, -1)}${tail}`;
        if (position > 0) this.textArea.setSelectionRange(position - 1, position - 1);
        else (this.textArea.setSelectionRange(0, 0));
        return;
      }
      case 'Delete': {
        this.textArea.value = `${head}${tail.slice(1)}`;
        this.textArea.setSelectionRange(position, position);
        return;
      }
      case 'Enter':
        letter = '\n';
        break;
      case 'Tab':
        letter = '\t';
        break;
      case 'Space':
        letter = ' ';
        break;
      default: {
        if (this.isShift) {
          letter = currentKeyObj.shiftLetter;
        } else {
          letter = currentKeyObj.letter;
        }
        if (this.isCaps && this.isShift) letter = letter.toLowerCase();
        else if (this.isCaps) letter = letter.toUpperCase();
        else if (this.isShift) letter = letter.toUpperCase();
      }
    }
    this.textArea.value = `${head}${letter}${tail}`;
    this.textArea.setSelectionRange(position + 1, position + 1);
  }
}
