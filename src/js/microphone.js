import { Report } from 'notiflix';
import { input } from '../index';
const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

const microphoneBtn = document.querySelector('.header__btn-mic');
const recordIcon = document.querySelector('.header__icon-record');
let doesSupported = true;
let recognition;

export default function initialMicrophone() {
    microphoneBtn.addEventListener('click', function () {
        input.value = '';
        if (doesSupported) startRecognition();
        else
            Report.failure(
                "Sorry, your browser doesn't suppurt speech recognition",
                'Try using Chrome, Edge or Safari',
                'Okey',
                {
                    width: '400px',
                    svgSize: '100px',
                    titleFontSize: '20px',
                    messageFontSize: '18px',
                    buttonFontSize: '20px',
                    borderRadius: '10px',
                    titleMaxLength: 54,
                }
            );
    });
}

try {
    recognition = new SpeechRecognition();
    recognition.lang = 'en-EN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onnomatch = function (e) {
        alert("I didn't recognise that movie.");
        recordIcon.classList.add('visually-hidden');
        microphoneBtn.classList.remove('-active');
        recognition.stop();
    };

    recognition.onerror = function (e) {
        alert(`Error occurred in recognition: ${e.error}`);
        recordIcon.classList.add('visually-hidden');
        microphoneBtn.classList.remove('-active');
        recognition.stop();
    };
} catch {
    doesSupported = false;
}

function listenSpeech(e) {
    const transcript = e.results[0][0].transcript;
    input.value = transcript;
    if (e.results[0].isFinal) {
        console.log('is Final', e.results[0].isFinal);
        recognition.onspeechend = stopRecognition();
    }
    input.dispatchEvent(new Event('input'));
}

function startRecognition() {
    recognition.addEventListener('result', listenSpeech);
    recordIcon.classList.remove('visually-hidden');
    microphoneBtn.classList.add('-active');
    recognition.start();
}
function stopRecognition() {
    recognition.removeEventListener('result', listenSpeech);
    recordIcon.classList.add('visually-hidden');
    microphoneBtn.classList.remove('-active');
    recognition.stop();
}
