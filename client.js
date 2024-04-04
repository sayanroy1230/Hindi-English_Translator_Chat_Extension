const form = document.getElementById('form_container');
const msgio = document.getElementById('messageinp');
const msgcontainer = document.querySelector('.container')

const append = (message, position) => {
    const msgelem = document.createElement('div');
    msgelem.innerHTML = message;
    msgelem.classList.add('message');
    msgelem.classList.add(position);
    msgcontainer.append(msgelem);
}

const detectLanguage = (text) => {
    const hindiRegex = /[\u0900-\u097F\u1CD0-\u1CFF\uA8E0-\uA8FF]/; // Range of Unicode characters for Hindi
    const englishRegex = /[A-Za-z]/; // English alphabet characters

    if (hindiRegex.test(text)) {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=hi&tl=en&dt=t&q=${encodeURI(text)}`;
        fetch(url)
            .then((response) => response.json())
            .then(json => {
                const item = json[0].map(item => item[0]).join("");
                append(`${item}`, 'left');
            })
    } else if (englishRegex.test(text)) {
        const url1 = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=hi&dt=t&q=${encodeURI(text)}`;
        fetch(url1)
            .then((response) => response.json())
            .then(json => {
                const item = json[0].map(item => item[0]).join("");
                append(`${item}`, 'left');
            })
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = msgio.value;
    if (message != "") {
        append(`${message}`, 'right');
        msgio.value = '';
        detectLanguage(message)
    }
})
