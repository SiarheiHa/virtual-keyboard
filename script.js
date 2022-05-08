/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/sass/style.scss":
/*!*****************************!*\
  !*** ./src/sass/style.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/js/Key.js":
/*!***********************!*\
  !*** ./src/js/Key.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Key)
/* harmony export */ });
/* harmony import */ var _createNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createNode */ "./src/js/createNode.js");


class Key {
  constructor({ code, letter, shiftLetter }) {
    this.code = code;
    this.letter = letter;
    this.shiftLetter = shiftLetter;
    this.isFnKey = !shiftLetter;
  }

  buildKey() {
    this.keyWrapper = (0,_createNode__WEBPACK_IMPORTED_MODULE_0__["default"])('div', ['key']);
    if (this.isFnKey) {
      this.keyWrapper.classList.add('key_fn', this.code);
    }
    this.keyWrapper.setAttribute('data-key', this.code);
    this.letterNode = (0,_createNode__WEBPACK_IMPORTED_MODULE_0__["default"])('p', ['key__letter'], this.letter);
    this.shiftLetterNode = (0,_createNode__WEBPACK_IMPORTED_MODULE_0__["default"])('p', ['key__shift-letter', 'hidden'], this.shiftLetter);
    if (this.isFnKey || this.code.includes('Key')) {
      this.shiftLetterNode.innerHTML = this.letter;
    }

    this.keyWrapper.append(this.shiftLetterNode, this.letterNode);
    return this.keyWrapper;
  }
}


/***/ }),

/***/ "./src/js/Keyboard.js":
/*!****************************!*\
  !*** ./src/js/Keyboard.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Keyboard)
/* harmony export */ });
/* harmony import */ var _createNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createNode */ "./src/js/createNode.js");
/* harmony import */ var _lang_en__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lang/en */ "./src/js/lang/en.js");
/* harmony import */ var _lang_ru__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lang/ru */ "./src/js/lang/ru.js");
/* harmony import */ var _Key__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Key */ "./src/js/Key.js");





class Keyboard {
  constructor() {
    this.isCaps = false;
    this.isShift = false;
  }

  getLang() {
    const lang = localStorage.getItem('lang');
    if (lang === 'ru') this.lang = _lang_ru__WEBPACK_IMPORTED_MODULE_2__["default"];
    else { this.lang = _lang_en__WEBPACK_IMPORTED_MODULE_1__["default"]; }
  }

  setLang() {
    if (this.lang === _lang_ru__WEBPACK_IMPORTED_MODULE_2__["default"]) {
      localStorage.setItem('lang', 'ru');
    } else {
      localStorage.setItem('lang', 'en');
    }
  }

  buildKeyboard() {
    this.wrapper = (0,_createNode__WEBPACK_IMPORTED_MODULE_0__["default"])('div', ['wrapper']);
    this.title = (0,_createNode__WEBPACK_IMPORTED_MODULE_0__["default"])('h1', ['title'], 'To change the language, press Ctrl + Shift or click on the language change key');
    this.subtitle = (0,_createNode__WEBPACK_IMPORTED_MODULE_0__["default"])('h2', ['subtitle'], 'The keyboard was created in Windows');
    this.textArea = (0,_createNode__WEBPACK_IMPORTED_MODULE_0__["default"])('textarea', ['textarea']);
    this.keyboard = (0,_createNode__WEBPACK_IMPORTED_MODULE_0__["default"])('div', ['keyboard']);

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
      const currentKey = new _Key__WEBPACK_IMPORTED_MODULE_3__["default"](key).buildKey();
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
    if (this.lang === _lang_ru__WEBPACK_IMPORTED_MODULE_2__["default"]) this.lang = _lang_en__WEBPACK_IMPORTED_MODULE_1__["default"];
    else { this.lang = _lang_ru__WEBPACK_IMPORTED_MODULE_2__["default"]; }

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


/***/ }),

/***/ "./src/js/createNode.js":
/*!******************************!*\
  !*** ./src/js/createNode.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((tag, classes, inner) => {
  let node;
  if (tag) {
    node = document.createElement(tag);
  }
  if (classes) {
    node.classList.add(...classes);
  }
  if (inner) {
    node.innerText = inner;
  }
  return node;
});


/***/ }),

/***/ "./src/js/lang/en.js":
/*!***************************!*\
  !*** ./src/js/lang/en.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([
  {
    code: 'Backquote',
    letter: '`',
    shiftLetter: '~',
  },
  {
    code: 'Digit1',
    letter: '1',
    shiftLetter: '!',
  },
  {
    code: 'Digit2',
    letter: '2',
    shiftLetter: '@',
  },
  {
    code: 'Digit3',
    letter: '3',
    shiftLetter: '#',
  },
  {
    code: 'Digit4',
    letter: '4',
    shiftLetter: '$',
  },
  {
    code: 'Digit5',
    letter: '5',
    shiftLetter: '%',
  },
  {
    code: 'Digit6',
    letter: '6',
    shiftLetter: '^',
  },
  {
    code: 'Digit7',
    letter: '7',
    shiftLetter: '&',
  },
  {
    code: 'Digit8',
    letter: '8',
    shiftLetter: '*',
  },
  {
    code: 'Digit9',
    letter: '9',
    shiftLetter: '(',
  },
  {
    code: 'Digit0',
    letter: '0',
    shiftLetter: ')',
  },
  {
    code: 'Minus',
    letter: '-',
    shiftLetter: '_',
  },
  {
    code: 'Equal',
    letter: '=',
    shiftLetter: '+',
  },
  {
    code: 'Backslash',
    letter: '\\',
    shiftLetter: '|',
  },
  {
    code: 'Backspace',
    letter: '←',
    shiftLetter: null,
  },
  {
    code: 'Tab',
    letter: 'Tab',
    shiftLetter: null,
  },
  {
    code: 'KeyQ',
    letter: 'q',
    shiftLetter: 'Q',
  },
  {
    code: 'KeyW',
    letter: 'w',
    shiftLetter: 'W',
  },
  {
    code: 'KeyE',
    letter: 'e',
    shiftLetter: 'E',
  },
  {
    code: 'KeyR',
    letter: 'r',
    shiftLetter: 'R',
  },
  {
    code: 'KeyT',
    letter: 't',
    shiftLetter: 'T',
  },
  {
    code: 'KeyY',
    letter: 'y',
    shiftLetter: 'Y',
  },
  {
    code: 'KeyU',
    letter: 'u',
    shiftLetter: 'U',
  },
  {
    code: 'KeyI',
    letter: 'i',
    shiftLetter: 'I',
  },
  {
    code: 'KeyO',
    letter: 'o',
    shiftLetter: 'O',
  },
  {
    code: 'KeyP',
    letter: 'p',
    shiftLetter: 'P',
  },
  {
    code: 'BracketLeft',
    letter: '[',
    shiftLetter: '{',
  },
  {
    code: 'BracketRight',
    letter: ']',
    shiftLetter: '}',
  },
  {
    code: 'Delete',
    letter: 'Delete',
    shiftLetter: null,
  },
  {
    code: 'CapsLock',
    letter: 'CapsLock',
    shiftLetter: null,
  },
  {
    code: 'KeyA',
    letter: 'a',
    shiftLetter: 'A',
  },
  {
    code: 'KeyS',
    letter: 's',
    shiftLetter: 'S',
  },
  {
    code: 'KeyD',
    letter: 'd',
    shiftLetter: 'D',
  },
  {
    code: 'KeyF',
    letter: 'f',
    shiftLetter: 'F',
  },
  {
    code: 'KeyG',
    letter: 'g',
    shiftLetter: 'G',
  },
  {
    code: 'KeyH',
    letter: 'h',
    shiftLetter: 'H',
  },
  {
    code: 'KeyJ',
    letter: 'j',
    shiftLetter: 'J',
  },
  {
    code: 'KeyK',
    letter: 'k',
    shiftLetter: 'K',
  },
  {
    code: 'KeyL',
    letter: 'l',
    shiftLetter: 'L',
  },
  {
    code: 'Semicolon',
    letter: ';',
    shiftLetter: ':',
  },
  {
    code: 'Quote',
    letter: "'",
    shiftLetter: '"',
  },
  {
    code: 'Enter',
    letter: 'Enter',
    shiftLetter: null,
  },
  {
    code: 'ShiftLeft',
    letter: 'Shift',
    shiftLetter: null,
  },
  {
    code: 'KeyZ',
    letter: 'z',
    shiftLetter: 'Z',
  },
  {
    code: 'KeyX',
    letter: 'x',
    shiftLetter: 'X',
  },
  {
    code: 'KeyC',
    letter: 'c',
    shiftLetter: 'C',
  },
  {
    code: 'KeyV',
    letter: 'v',
    shiftLetter: 'V',
  },
  {
    code: 'KeyB',
    letter: 'b',
    shiftLetter: 'B',
  },
  {
    code: 'KeyN',
    letter: 'n',
    shiftLetter: 'N',
  },
  {
    code: 'KeyM',
    letter: 'm',
    shiftLetter: 'M',
  },
  {
    code: 'Comma',
    letter: ',',
    shiftLetter: '<',
  },
  {
    code: 'Period',
    letter: '.',
    shiftLetter: '>',
  },
  {
    code: 'Slash',
    letter: '/',
    shiftLetter: '?',
  },
  {
    code: 'ArrowUp',
    letter: '↑',
    shiftLetter: null,
  },
  {
    code: 'ShiftRight',
    letter: 'Shift',
    shiftLetter: null,
  },
  {
    code: 'ControlLeft',
    letter: 'Ctrl',
    shiftLetter: null,
  },
  {
    code: 'MetaLeft',
    letter: 'en',
    shiftLetter: null,
  },
  {
    code: 'AltLeft',
    letter: 'Alt',
    shiftLetter: null,
  },
  {
    code: 'Space',
    letter: ' ',
    shiftLetter: null,
  },
  {
    code: 'ControlRight',
    letter: 'Ctrl',
    shiftLetter: null,
  },
  {
    code: 'ArrowLeft',
    letter: '←',
    shiftLetter: null,
  },
  {
    code: 'ArrowDown',
    letter: '↓',
    shiftLetter: null,
  },
  {
    code: 'ArrowRight',
    letter: '→',
    shiftLetter: null,
  },
]);


/***/ }),

/***/ "./src/js/lang/ru.js":
/*!***************************!*\
  !*** ./src/js/lang/ru.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([
  {
    code: 'Backquote',
    letter: 'ё',
    shiftLetter: 'Ё',
  },
  {
    code: 'Digit1',
    letter: '1',
    shiftLetter: '!',
  },
  {
    code: 'Digit2',
    letter: '2',
    shiftLetter: '"',
  },
  {
    code: 'Digit3',
    letter: '3',
    shiftLetter: '№',
  },
  {
    code: 'Digit4',
    letter: '4',
    shiftLetter: ';',
  },
  {
    code: 'Digit5',
    letter: '5',
    shiftLetter: '%',
  },
  {
    code: 'Digit6',
    letter: '6',
    shiftLetter: ':',
  },
  {
    code: 'Digit7',
    letter: '7',
    shiftLetter: '?',
  },
  {
    code: 'Digit8',
    letter: '8',
    shiftLetter: '*',
  },
  {
    code: 'Digit9',
    letter: '9',
    shiftLetter: '(',
  },
  {
    code: 'Digit0',
    letter: '0',
    shiftLetter: ')',
  },
  {
    code: 'Minus',
    letter: '-',
    shiftLetter: '_',
  },
  {
    code: 'Equal',
    letter: '=',
    shiftLetter: '+',
  },
  {
    code: 'Backslash',
    letter: '\\',
    shiftLetter: '/',
  },
  {
    code: 'Backspace',
    letter: '←',
    shiftLetter: null,
  },
  {
    code: 'Tab',
    letter: 'Tab',
    shiftLetter: null,
  },
  {
    code: 'KeyQ',
    letter: 'й',
    shiftLetter: 'Й',
  },
  {
    code: 'KeyW',
    letter: 'ц',
    shiftLetter: 'Ц',
  },
  {
    code: 'KeyE',
    letter: 'у',
    shiftLetter: 'У',
  },
  {
    code: 'KeyR',
    letter: 'к',
    shiftLetter: 'К',
  },
  {
    code: 'KeyT',
    letter: 'е',
    shiftLetter: 'Е',
  },
  {
    code: 'KeyY',
    letter: 'н',
    shiftLetter: 'Н',
  },
  {
    code: 'KeyU',
    letter: 'г',
    shiftLetter: 'Г',
  },
  {
    code: 'KeyI',
    letter: 'ш',
    shiftLetter: 'Ш',
  },
  {
    code: 'KeyO',
    letter: 'щ',
    shiftLetter: 'Щ',
  },
  {
    code: 'KeyP',
    letter: 'з',
    shiftLetter: 'З',
  },
  {
    code: 'BracketLeft',
    letter: 'х',
    shiftLetter: 'Х',
  },
  {
    code: 'BracketRight',
    letter: 'ъ',
    shiftLetter: 'Ъ',
  },
  {
    code: 'Delete',
    letter: 'Delete',
    shiftLetter: null,
  },
  {
    code: 'CapsLock',
    letter: 'CapsLock',
    shiftLetter: null,
  },
  {
    code: 'KeyA',
    letter: 'ф',
    shiftLetter: 'Ф',
  },
  {
    code: 'KeyS',
    letter: 'ы',
    shiftLetter: 'Ы',
  },
  {
    code: 'KeyD',
    letter: 'в',
    shiftLetter: 'В',
  },
  {
    code: 'KeyF',
    letter: 'а',
    shiftLetter: 'А',
  },
  {
    code: 'KeyG',
    letter: 'п',
    shiftLetter: 'П',
  },
  {
    code: 'KeyH',
    letter: 'р',
    shiftLetter: 'Р',
  },
  {
    code: 'KeyJ',
    letter: 'о',
    shiftLetter: 'О',
  },
  {
    code: 'KeyK',
    letter: 'л',
    shiftLetter: 'Л',
  },
  {
    code: 'KeyL',
    letter: 'д',
    shiftLetter: 'Д',
  },
  {
    code: 'Semicolon',
    letter: 'ж',
    shiftLetter: 'Ж',
  },
  {
    code: 'Quote',
    letter: 'э',
    shiftLetter: 'Э',
  },
  {
    code: 'Enter',
    letter: 'Enter',
    shiftLetter: null,
  },
  {
    code: 'ShiftLeft',
    letter: 'Shift',
    shiftLetter: null,
  },
  {
    code: 'KeyZ',
    letter: 'я',
    shiftLetter: 'Я',
  },
  {
    code: 'KeyX',
    letter: 'ч',
    shiftLetter: 'Ч',
  },
  {
    code: 'KeyC',
    letter: 'с',
    shiftLetter: 'С',
  },
  {
    code: 'KeyV',
    letter: 'м',
    shiftLetter: 'М',
  },
  {
    code: 'KeyB',
    letter: 'и',
    shiftLetter: 'И',
  },
  {
    code: 'KeyN',
    letter: 'т',
    shiftLetter: 'Т',
  },
  {
    code: 'KeyM',
    letter: 'ь',
    shiftLetter: 'Ь',
  },
  {
    code: 'Comma',
    letter: 'б',
    shiftLetter: 'Б',
  },
  {
    code: 'Period',
    letter: 'ю',
    shiftLetter: 'Ю',
  },
  {
    code: 'Slash',
    letter: '.',
    shiftLetter: ',',
  },
  {
    code: 'ArrowUp',
    letter: '↑',
    shiftLetter: null,
  },
  {
    code: 'ShiftRight',
    letter: 'Shift',
    shiftLetter: null,
  },
  {
    code: 'ControlLeft',
    letter: 'Ctrl',
    shiftLetter: null,
  },
  {
    code: 'MetaLeft',
    letter: 'ru',
    shiftLetter: null,
  },
  {
    code: 'AltLeft',
    letter: 'Alt',
    shiftLetter: null,
  },
  {
    code: 'Space',
    letter: ' ',
    shiftLetter: null,
  },
  {
    code: 'ControlRight',
    letter: 'Ctrl',
    shiftLetter: null,
  },
  {
    code: 'ArrowLeft',
    letter: '←',
    shiftLetter: null,
  },
  {
    code: 'ArrowDown',
    letter: '↓',
    shiftLetter: null,
  },
  {
    code: 'ArrowRight',
    letter: '→',
    shiftLetter: null,
  },
]);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sass_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sass/style.scss */ "./src/sass/style.scss");
/* harmony import */ var _js_Keyboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/Keyboard */ "./src/js/Keyboard.js");



const keyboard = new _js_Keyboard__WEBPACK_IMPORTED_MODULE_1__["default"]();
keyboard.buildKeyboard();

})();

/******/ })()
;
//# sourceMappingURL=script.js.map