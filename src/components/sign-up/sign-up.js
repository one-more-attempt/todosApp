import * as moment from 'moment';

import { 
    signInRequest,
    createUserAuthRequest, 
    createUserDataRequest,
    apiService
} from '../../api/api-handlers';
import { setToken, setUserLocal } from '../../shared/services/local-storage-service';
import { ROUTES } from '../../shared/constants/routes';
import { emailValidator, showErrorMessage, hideErrorMessage } from '../../shared/validators';
import { Spinner } from '../../shared/spinner';
import { errorTagsIds } from '../../shared/validators';

export const signUpHandler = () => {
    const firstNameInput = document.getElementById('firstNameInput');
    const lastNameInput = document.getElementById('lastNameInput');
    const birthInput = document.getElementById('birthInput');
    const emailInput = document.getElementById('emailInput');
    const passInput1 = document.getElementById('passInput1');
    const passInput2 = document.getElementById('passInput2');
    const signUpBtn = document.getElementById('signUpBtn');
    const userData = {
        firstName: '',
        lastName: '',
        birth: '',
        email: '',
        password_1: '',
        password_2: '',
    } 

    firstNameInput.oninput = () => {
        userData.firstName = firstNameInput.value;
        checkFormValid();
        hideErrorMessage('required_hide', errorTagsIds.get('first_name'));
    }

    firstNameInput.onblur = () => {
        if (!firstNameInput.value) {
            firstNameInput.classList.add('invalid-input');
            showErrorMessage('required_show', errorTagsIds.get('first_name'));
        } else {
            firstNameInput.classList.remove('invalid-input');
            hideErrorMessage('required_hide', errorTagsIds.get('first_name'));
        }
    }

    lastNameInput.oninput = () => {
        userData.lastName = lastNameInput.value;
        checkFormValid();
        hideErrorMessage('required_hide', errorTagsIds.get('last_name'));
    }

    lastNameInput.onblur = () => {
        if (!lastNameInput.value) {
            lastNameInput.classList.add('invalid-input');
            showErrorMessage('required_show', errorTagsIds.get('last_name'));
        } else {
            lastNameInput.classList.remove('invalid-input');
            hideErrorMessage('required_hide', errorTagsIds.get('last_name'));
        }
    }

    birthInput.oninput = () => {
        userData.birth = moment(birthInput.value).format();
        checkFormValid();
        hideErrorMessage('required_hide', errorTagsIds.get('birth'));
    }

    birthInput.onblur = () => {
        if (!birthInput.value) {
            birthInput.classList.add('invalid-input');
            showErrorMessage('required_show', errorTagsIds.get('birth'));
        } else {
            birthInput.classList.remove('invalid-input');
            hideErrorMessage('required_hide', errorTagsIds.get('birth'));
        }
    }

    emailInput.oninput = () => {
        userData.email = emailInput.value;
        checkFormValid();
        hideErrorMessage('email_hide', errorTagsIds.get('email'));
        hideErrorMessage('required_hide', errorTagsIds.get('required_email'));
    }

    emailInput.onblur = () => {
        if (!emailInput.value) {
            showErrorMessage('required_show', errorTagsIds.get('required_email'));
            hideErrorMessage('email_hide', errorTagsIds.get('email'));
            emailInput.classList.add('invalid-input');
        } else if (!emailValidator(emailInput.value)) {
            emailInput.classList.add('invalid-input');
            hideErrorMessage('required_hide', errorTagsIds.get('required_email'));
            showErrorMessage('email_show', errorTagsIds.get('email'));
        } else {
            emailInput.classList.remove('invalid-input');
            hideErrorMessage('email_hide', errorTagsIds.get('email'));
            hideErrorMessage('required_hide', errorTagsIds.get('required_email'));
        }
    }

    passInput1.oninput = () => {
        userData.password_1 = passInput1.value;
        checkFormValid();
        hideErrorMessage('required_hide', errorTagsIds.get('pass_1'));
    }

    passInput1.onblur = () => {
        if (!passInput1.value) {
            passInput1.classList.add('invalid-input');
            showErrorMessage('required_show', errorTagsIds.get('pass_1'));
        } else {
            passInput1.classList.remove('invalid-input');
            hideErrorMessage('required_hide', errorTagsIds.get('pass_1'));
        }
    }

    passInput2.oninput = () => {
        userData.password_2 = passInput2.value;
        checkFormValid();
        hideErrorMessage('passwords_hide', errorTagsIds.get('pass_2'));
    }

    passInput2.onblur = () => {
        if (passInput1.value !== passInput2.value) {
            passInput2.classList.add('invalid-input');
            showErrorMessage('passwords_show', errorTagsIds.get('pass_2'));
        } else {
            passInput2.classList.remove('invalid-input');
            hideErrorMessage('passwords_hide', errorTagsIds.get('pass_2'));
        }
    }

    signUpBtn.onclick = async () => {
        const { email, password_1: password } = userData;

        let requestCount = 0;
        let authId = '';
        let userId = '';

        Spinner.showSpinner();
        await createUserAuthRequest(userData)
            .then(response => {
                authId = response.user.uid;
                requestCount++;
            });
        await createUserDataRequest({...userData, authId})
            .then(res => {
                userId = res.name;
                requestCount++;
            });
        await signInRequest({email, password})
            .then(({ user: { accessToken }}) => {
                setToken(accessToken);
                requestCount++;
            });
        await apiService.get(`users/${userId}`)
            .then((res) => {
                setUserLocal(res);
                requestCount++;
            });

        if (requestCount === 4) {
            window.location.href = ROUTES.main;
        }
    }

    const checkFormValid = () => {
        const isFormValid = Object.values(userData).every(value => !!value);
        const isPasswordEqual = userData.password_1 === userData.password_2;
        
        isFormValid && isPasswordEqual ?
            signUpBtn.removeAttribute('disabled') : 
            signUpBtn.setAttribute('disabled', true);
    }
}