import { REGEX } from './regex';

export const ERRORS_MESSAGES = new Map([
    ['email', 'Invalid email template. Please, correct it.'],
    ['required', 'This field is required.'],
    ['passwords', 'Both passwords must be the same.'],
    ['wrong_file_type', 'Alowed file types are .png, .jpeg, .jpg'],
    ['wrong_file_size', 'Alowed file size is 5 MB']
]);

const showErrorTag = (id, message) => {
    const error_tag = document.getElementById(id);

    error_tag.style.display = 'block';
    error_tag.innerText = message;
}

const hideErrorTag = id => {
    const error_tag = document.getElementById(id);

    error_tag.style.display = 'none';
}

const errorTagsHandlers = new Map([
    ['email_show', id => showErrorTag(id, ERRORS_MESSAGES.get('email'))],
    ['email_hide', id => hideErrorTag(id)],
    ['required_show', id => showErrorTag(id, ERRORS_MESSAGES.get('required'))],
    ['required_hide', id => hideErrorTag(id)],
    ['passwords_show', id => showErrorTag(id, ERRORS_MESSAGES.get('passwords'))],
    ['passwords_hide', id => hideErrorTag(id)]
]);

export const errorTagsIds = new Map([
    ['email', 'emailInputError'],
    ['required_email', 'requiredEmailInputError'],
    ['first_name', 'firstNameInputError'],
    ['last_name', 'lastNameInputError'],
    ['birth', 'birthInputError'],
    ['pass_1', 'passInputError1'],
    ['pass_2', 'passInputError2']
]);

export const emailValidator = email => REGEX.email.test(email);

export const showErrorMessage = (error_type, id) => {
    errorTagsHandlers.get(error_type)(id);
}

export const hideErrorMessage = (error_type, id) => {
    errorTagsHandlers.get(error_type)(id);
}
