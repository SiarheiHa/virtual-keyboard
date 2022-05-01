import './sass/style.scss';
import en from './js/lang/en';
import ru from './js/lang/ru';
import Key from './js/Key';
import Keyboard from './js/Keyboard';

// console.log(en);
// console.log(ru);

// en.forEach((key) => {
//   console.log(key.shiftLetter);
// });
// en.forEach((key) => {
//   document.body.append(new Key(key).buildKey());
// });
// const keyWaw = new Key(en[20]).buildKey();
// document.body.append(keyWaw);
// console.log(keyWaw);

document.body.append(new Keyboard().buildKeyboard('en'));
