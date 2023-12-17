export class Spinner {
    static showSpinner() {
        const body = document.getElementsByTagName('body')[0];

        body.insertAdjacentHTML(
            'afterbegin',
            `<div id="spinner" class="spinner">
                <div class="spinner-border text-primary" role="status"></div>
            </div>`
        );
    }

    static hideSpinner() {
        const spinner = document.getElementById('spinner');

        spinner ? spinner.remove() : null;
    }
}
