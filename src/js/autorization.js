import * as basicLightBox from 'basiclightbox';
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
    updateCurrentUser,
} from 'firebase/auth';
import icons from '../images/icons.svg';

const provider = new GoogleAuthProvider();
const firebaseConfig = {
    apiKey: 'AIzaSyA5Rlj0L2mDk1x_n-ysmA7r6zBCd7fyn60',
    authDomain: 'goit-js-project-filmoteka.firebaseapp.com',
    databaseURL:
        'https://goit-js-project-filmoteka-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'goit-js-project-filmoteka',
    storageBucket: 'goit-js-project-filmoteka.appspot.com',
    messagingSenderId: '221296181202',
    appId: '1:221296181202:web:aef293a7dffbafe8ce920b',
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const registrationBtn = document.querySelector('#user');
let form, registrationForm, loginForm, google, cancel;

let user = JSON.parse(sessionStorage.getItem('user'));
registrationBtn.addEventListener('click', openRegistrationForm);

function openRegistrationForm() {
    form = basicLightBox.create(
        /*html*/ `
        <form class="form" id='loginForm'>
        <h2 class="form__title">Login</h2>
        <label class="form__label">E-mail
            <input class="form__input" name='email'/>
        </label>
        <label class="form__label">Password
            <input class="form__input" name='password' type="password"/>
        </label>
        <div class="form__thumb">
            <button class ="form__button" type='submit' id='login'>Login</button>
            <button class ="form__button" type='button' id='google'>
                <svg width="24" height="24">
                    <use href="${icons}#google"></use>
                </svg> 
                <span>Sign-in with Google</span>
            </button>
        </div>
    </form>
        <form class="form" id='registrationForm'>
        <h2 class="form__title">
            <span class="form__text">or&nbsp;</span>join</h2>
        <label class="form__label"> Name
            <input class="form__input" name='login'/>
        </label>
        <label class="form__label">E-mail
            <input class="form__input" name='email'/>
        </label>
        <label class="form__label">Password
            <input class="form__input" name='password' type="password"/>
        </label>
        <div class="form__thumb">
            <button class ="form__button" type='submit'>Join</button>
            <button class ="form__button" type='button' id='cancel'>Cancel</button>
    </form>
    `,
        {
            onClose: () => {
                document.body.removeAttribute('style');
            },
        }
    );
    form.show();
    document.body.setAttribute('style', 'overflow: hidden');
    registrationForm = document.querySelector('#registrationForm');
    loginForm = document.querySelector('#loginForm');
    google = document.querySelector('#google');
    cancel = document.querySelector('#cancel');

    registrationForm.addEventListener('submit', registration);
    loginForm.addEventListener('submit', loginization);
    google.addEventListener('click', enteringWithGoogle);
    cancel.addEventListener('click', closeModal);
}
async function registration(event) {
    event.preventDefault();
    const email = form.email.value;
    const password = form.password.value;
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        user = userCredential.user;
        user.displayName = form.login.value;
        updateUser(user.displayName);
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        form.close();
    }
    afterEnter();
}

async function loginization(event) {
    event.preventDefault();
    const email = formLoginization.email.value;
    const password = formLoginization.password.value;
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        user = userCredential.user;
    } catch (error) {
        console.log(error);
    } finally {
        form.close();
    }
    afterEnter();
}
async function updateUser(userName) {
    try {
        await updateProfile(auth.currentUser, {
            displayName: userName,
        });
    } catch (error) {
        console.log(error);
    }
}

async function enteringWithGoogle() {
    try {
        const userCredential = await signInWithPopup(auth, provider);
        user = userCredential.user;
    } catch (error) {
        console.log(error);
    } finally {
        form.close();
    }
    afterEnter();
}

function afterEnter() {
    sessionStorage.setItem('user', JSON.stringify(user));
    checkLogin();
    sessionStorage.setItem('Page', 1);
    document.body.dispatchEvent(new Event('close'));
}
function openLogOutForm() {
    form = basicLightBox.create(/*html*/ `
    <div class="form__container">
        <p class="form__question">Do you want to finish your session?</p>
        <button class ="form__button" type='button' id='logOutBtn'>Logout</button>
        <button class ="form__button" type='button' id='cancel'>Cancel</button>
    </div>`);
    form.show();
    const logOutBtn = document.querySelector('#logOutBtn');
    const cancel = document.querySelector('#cancel');
    logOutBtn.addEventListener('click', logOut);
    cancel.addEventListener('click', closeModal);
}
function logOut() {
    user = null;
    sessionStorage.removeItem('user');
    checkLogin();
    form.close();
    sessionStorage.setItem('Page', 1);
    document.body.dispatchEvent(new Event('close'));
}

function closeModal() {
    form.close();
}

export default function checkLogin() {
    if (user) {
        registrationBtn.textContent = user.displayName || 'Anonymous';
        registrationBtn.removeEventListener('click', openRegistrationForm);
        registrationBtn.addEventListener('click', openLogOutForm);
    } else {
        registrationBtn.textContent = 'Login | Join';
        registrationBtn.removeEventListener('click', openLogOutForm);
        registrationBtn.addEventListener('click', openRegistrationForm);
    }
}
