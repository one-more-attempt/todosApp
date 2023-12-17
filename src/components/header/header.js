import { getUserLocal, clearLocalStorage } from '../../shared/services/local-storage-service';
import { ROUTES } from '../../shared/constants/routes';
import { Modal } from '../../shared/modal';
import { MODAL_MESSAGES } from '../../shared/constants/modal-messages';

export class Header {
    constructor() {}

    static getHeader(place) {
      if (Object.values(getUserLocal()).length) {
        const { firstName, lastName, email, photo } = getUserLocal();
        const header = document.createElement('div');
        const headerLogo = document.createElement('div');
        const headerTitle = document.createElement('div');
        const headerUser = document.createElement('div');
        const headerUserInfo = document.createElement('div');
        const headerUserName = document.createElement('p');
        const headerUserEmail = document.createElement('p');
        const headerUserPhoto = document.createElement('div');
        const headerButtons = document.createElement('div');
        const headerFindUser = document.createElement('button');
        const dropdownWrapper = document.createElement('div');
        const logout = document.getElementById('logout');
        const image = document.createElement('img');

        header.className = 'header';
        headerLogo.className = 'header__logo';
        headerUser.className = 'header__user';
        headerUserInfo.className = 'header__user__info';
        headerUserPhoto.className = 'header__user__photo';
        headerButtons.className = 'header__user__btns';
        image.setAttribute('id', 'avatar');

        headerTitle.innerText = 'TODO LIST';
        headerUserName.innerText = `${firstName} ${lastName}`;
        headerUserEmail.innerText = email;
        headerFindUser.innerText = 'FIND USERS';
        dropdownWrapper.innerHTML = 
          `
            <div class="btn-group">
              <button type="button" class="btn">Action</button>
              <button type="button" class="btn dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                <span class="visually-hidden">Toggle Dropdown</span>
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="profile.html">Profile</a></li>
                <li><hr class="dropdown-divider"></li>
                <li id="logout"><a class="dropdown-item">Logout</a></li>
              </ul>
            </div>
          `;

        headerTitle.onclick = () => {
          window.location.href = ROUTES.main;
        }

        
        image.setAttribute('src', photo || 'src/assets/img/no-avatar.png');
        headerUserPhoto.append(image);

        headerLogo.append(headerTitle);
        headerUser.append(headerUserInfo, headerUserPhoto, headerButtons);
        headerUserInfo.append(headerUserName, headerUserEmail);
        headerButtons.append(headerFindUser, dropdownWrapper);//Append here!
        header.append(headerLogo, headerUser);
        place.prepend(header);

        headerFindUser.onclick = () => {
          window.location.href = ROUTES.find_users;
        };

      } else this.logout();

      logout.onclick = () => new Modal(MODAL_MESSAGES.logout, this.logout).showModal();
    }

    static logout() {
      clearLocalStorage();
      window.location.href = ROUTES.sign_in;
    }

    static refreshAvatar() {
      const avatar_wrapper = document.querySelector('.header__user__photo');
      const image = document.getElementById('avatar');
      const { photo } = getUserLocal();

      image.remove();
      image.setAttribute('src', photo);
      avatar_wrapper.append(image);
    }
}
