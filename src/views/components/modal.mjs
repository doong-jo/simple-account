class Modal {
    constructor(id, options = {}) {
        this.options = options;

        this.init(id);
    }

    init(id) {
        this.modalContainer = document.getElementById(id);

        const
            title = document.createElement('div'),
            content = document.createElement('div');

        this.makeModal(this.options);
    }

    makeModal(options) {
        /* build */

        this.modalView = /*html*/`
            <div class="modal-title">
                <span class="modal-title-text">${options.title}</span><img src="public/svg/close.svg" />
            </div>
            <div class="modal-content">
                ${options.content}
            </div>
            <div class="modal-footer">

            </div>
        `;

        return this.modalView;
    }

    setContent(htmlStr) {

    }

    toggle() {
        
    }
}

export default Modal;