import * as moment from 'moment';

export class Comment {

    static getComment(
        { 
            firstName, 
            lastName, 
            id: userId 
        }, 
        { 
            date, 
            text, 
            id: commentId,
            likes 
        }, 
        likeHandler
    ) {
        const commentWrapper = document.createElement('div');
        const photo = document.createElement('div');
        const img = document.createElement('img');
        const info = document.createElement('div');
        const user_info = document.createElement('p');
        const comment_date = document.createElement('p');
        const comment_text = document.createElement('p');
        const like = document.createElement('div');
        const like_count = document.createElement('span');
        const isLikeWasDone = likes && likes.includes(userId);

        commentWrapper.className = 'comment';
        photo.className = 'comment__photo';
        info.className = 'comment__info';
        like.className = 'comment__like';

        if (isLikeWasDone) {
            like.classList.add('active');
        }

        user_info.innerText = `${firstName} ${lastName}`;
        comment_date.innerText = moment(date).format('LLLL');
        comment_text.innerText = text;

        img.setAttribute('src', 'src/assets/img/no-avatar.png');

        like.innerHTML = '<i class="fa-solid fa-heart"></i>';
        like_count.innerText = likes ? likes.length : 0;

        like.onclick = () => likeHandler(userId, commentId, isLikeWasDone);

        like.append(like_count);
        info.append(user_info, comment_date, comment_text);
        photo.append(img);
        commentWrapper.append(photo, info, like);

        return commentWrapper;
    }
}
