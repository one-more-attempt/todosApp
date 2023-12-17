import { Header } from '../header/header';
import { apiService } from '../../api/api-handlers';
import { Spinner } from '../../shared/spinner';
import { ROUTES } from '../../shared/constants/routes';
import { setCurrentUserData } from '../../shared/services/local-storage-service';
import { responseMapper } from '../../shared/helpers';

export const findUsersHandler = async () => {
    const find_users = document.querySelector('.find-users');
    const usersWrapper = document.getElementById('users');
    const first_name_table = document.querySelector('.find-users__header__first-name');
    const last_name_table = document.querySelector('.find-users__header__last-name');
    const email_table = document.querySelector('.find-users__header__email');
    const id_table = document.querySelector('.find-users__header__id');
    const search = document.getElementById('search');
    let users = [];

    const renderUsers = users => {
        const table_data_tags = document.querySelectorAll('.table-data');

        table_data_tags.forEach(tag => tag.remove());

        users.forEach(user => {
            const { firstName, lastName, email, userId } = user;
            const firstNameValue = document.createElement('p');
            const lastNameValue = document.createElement('p');
            const emailValue = document.createElement('p');
            const idValue = document.createElement('p');
            const tags_array = [firstNameValue, lastNameValue, emailValue, idValue];

            firstNameValue.className = 'table-data';
            lastNameValue.className = 'table-data';
            emailValue.className = 'table-data';
            idValue.className = 'table-data';

            firstNameValue.innerText = firstName;
            lastNameValue.innerText = lastName;
            emailValue.innerText = email;
            idValue.innerText = userId;

            tags_array.forEach(tag => {
                tag.onclick = () => {
                    setCurrentUserData({ ...user});
                    window.location.href = ROUTES.user_details;
                }
            });

            first_name_table.append(firstNameValue);
            last_name_table.append(lastNameValue);
            email_table.append(emailValue);
            id_table.append(idValue);
        });
    }

    search.oninput = () => {
        const searching_users = users.filter(user => user.firstName.startsWith(search.value));

        renderUsers(searching_users);
    }

    Header.getHeader(find_users);
    Spinner.showSpinner();
    await apiService.get('users')
        .then(response => {
            users = responseMapper(response, 'userId');
            renderUsers(users);
        });
}