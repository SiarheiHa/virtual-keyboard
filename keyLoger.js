let en = []

document.addEventListener('keydown', (e) => {
    en.push({
        code: e.code,
        letter: e.key,
        shiftLetter: null,
    })
    console.log(en)
})

en.forEach(letter => {
    if(letter.code.includes("Key")) {
        letter.shiftLetter = letter.letter.toUpperCase()
    }
})
// ru.forEach(letter => {
//     if(letter.code.includes("Key")) {
//         letter.shiftLetter = letter.letter.toUpperCase()
//     }
// })