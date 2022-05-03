import './sass/style.scss';
import Keyboard from './js/Keyboard';


const keyboard = new Keyboard();
let lang = 'en';
keyboard.buildKeyboard(lang);
// console.log(keyboard.keys)
