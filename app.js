const fileE = document.getElementById('fileUploadE');
const encryptionKeyInputE = document.getElementById('encryptionKeyE');
const outputBoxE = document.getElementById('outputBoxE');
const encryptButton = document.getElementById('encryptBtn');
const suggestKeyBtn = document.getElementById('sugKeyBtn');
const encryptAndDownButton = document.getElementById('encryptNDownBtn');


const fileD = document.getElementById('fileUploadD');
const encryptionKeyInputD = document.getElementById('encryptionKeyD');
const outputBoxD = document.getElementById('outputBoxD');
const decryptButton = document.getElementById('decryptBtn');
const decryptAndDownButton = document.getElementById('decryptNDownBtn');

function myAlgoEncryptWithKey(text, encryptionKey) {
    if (encryptionKey == 0) {
        return text;
    }
    let skipValue = 5;
    let encryptedText = '';
    let j = 0;
    let keyLength = encryptionKey.length;
    for (let i = 0; i < text.length; i++) {
        let char = text[i];

        char = String.fromCharCode(char.charCodeAt(0) + encryptionKey.charCodeAt(j));

        if (j == keyLength - 1) {
            j = 0;
        } else {
            j++;
        }

        encryptedText += char;
    }
    return encryptedText;
}

function myAlgoDecryptWithKey(text, encryptionKey) {
    if (encryptionKey == 0) {
        return text;
    }
    let decryptedText = '';
    let j = 0;
    let keyLength = encryptionKey.length;
    for (let i = 0; i < text.length; i++) {
        let char = text[i];

        char = String.fromCharCode(char.charCodeAt(0) - encryptionKey.charCodeAt(j));

        if (j == keyLength - 1) {
            j = 0;
        } else {
            j++;
        }

        decryptedText += char;
    }
    return decryptedText;
}

encryptButton.addEventListener('click', (e) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        const text = e.target.result;
        const encryptionKey = encryptionKeyInputE.value || 0;
        const encryptedText = myAlgoEncryptWithKey(text, encryptionKey);
        outputBoxE.innerHTML = encryptedText;
    };
    reader.readAsText(fileE.files[0]);
}, false);

decryptButton.addEventListener('click', (e) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        const text = e.target.result;
        const encryptionKey = encryptionKeyInputD.value || 0;
        const encryptedText = myAlgoDecryptWithKey(text, encryptionKey);
        outputBoxD.innerHTML = encryptedText;
    };
    reader.readAsText(fileD.files[0]);
}, false);

function generateRandomKey(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-=_+';
    let randomKey = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomKey += characters.charAt(randomIndex);
    }

    return randomKey;
}

suggestKeyBtn.addEventListener('click', (e) => {
    encryptionKeyInputE.value = generateRandomKey(32);
});

function startDownload(text, type, filename) {
    const blob = new Blob([text], { type });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
}

encryptAndDownButton.addEventListener('click', (e) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        const text = e.target.result;
        const encryptionKey = encryptionKeyInputE.value || 0;
        const encryptedText = myAlgoEncryptWithKey(text, encryptionKey);
        startDownload(encryptedText, "text/plain", "encryptedFile.txt");
        startDownload(encryptionKeyInputE.value, "text/plain", "encryptionKey.txt");
    };
    reader.readAsText(fileE.files[0]);
}, false);

decryptAndDownButton.addEventListener('click', (e) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        const text = e.target.result;
        const encryptionKey = encryptionKeyInputD.value || 0;
        const encryptedText = myAlgoDecryptWithKey(text, encryptionKey);
        startDownload(encryptedText, "text/plain", "decryptedFile.txt");
    };
    reader.readAsText(fileD.files[0]);
}, false);