import { signInRequest, apiService } from '../../api/api-handlers';
import { ROUTES } from '../../shared/constants/routes';
import { setToken, setUserLocal } from '../../shared/services/local-storage-service';
import { Spinner } from '../../shared/spinner';
import { responseMapper } from '../../shared/helpers';
import { 
    emailValidator, 
    showErrorMessage, 
    hideErrorMessage,
    errorTagsIds 
} from '../../shared/validators';

export const signInHandler = () => {
    const signInBtn = document.getElementById('sign-in-btn');
    const passInput = document.getElementById('passInput');
    const mailInput = document.getElementById('mailInput');
    const userData = {
        email: '',
        password: ''
    }

    passInput.oninput = () => {
        userData.password = passInput.value;
        checkFormValid();
        hideErrorMessage('required_hide', errorTagsIds.get('pass_1'));
    }

    passInput.onblur = () => {
        if (!passInput.value) {
            passInput.classList.add('invalid-input');
            showErrorMessage('required_show', errorTagsIds.get('pass_1'));
        } else {
            passInput.classList.remove('invalid-input');
            hideErrorMessage('required_hide', errorTagsIds.get('pass_1'));
        }
    }

    mailInput.oninput = () => {
        userData.email = mailInput.value;
        checkFormValid();
        hideErrorMessage('email_hide', errorTagsIds.get('email'));
        hideErrorMessage('required_hide', errorTagsIds.get('required_email'));
    }

    mailInput.onblur = () => {
        if (!mailInput.value) {
            mailInput.classList.add('invalid-input');
            showErrorMessage('required_show', errorTagsIds.get('required_email'));
            hideErrorMessage('email_hide', errorTagsIds.get('email'));
        } else if (!emailValidator(mailInput.value)) {
            mailInput.classList.add('invalid-input');
            hideErrorMessage('required_hide', errorTagsIds.get('required_email'));
            showErrorMessage('email_show', errorTagsIds.get('email'));
        } else {
            mailInput.classList.remove('invalid-input');
            hideErrorMessage('email_hide', errorTagsIds.get('email'));
            hideErrorMessage('required_hide', errorTagsIds.get('required_email'));
        }
    }

    signInBtn.onclick = async () => {
        let userId = '';
        let requestCounter = 0;

        Spinner.showSpinner();
        await signInRequest(userData)
            .then(({ user: { accessToken, uid }}) => {
                setToken(accessToken);
                userId = uid;   
                requestCounter++;             
            });
        await apiService.get('users')
            .then(response => {
                const users = responseMapper(response, 'userId');
                const user = users.find(user => user.authId === userId);
                
                requestCounter++;
                setUserLocal(user);
            })

        if (requestCounter === 2) {
            window.location.href = ROUTES.main; 
        }
    }

    const checkFormValid = () => {
        const isFormValid = Object.values(userData).every(value => !!value);
        
        isFormValid ?
            signInBtn.removeAttribute('disabled') : 
            signInBtn.setAttribute('disabled', true);
    }
}
