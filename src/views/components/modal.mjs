import NodeBuilder from '../../services/NodeBuilder.mjs';

class Modal {
    constructor(id, options = {}) {
        this.options = options;

        this.elementId = id;
        this.init(id);
    }

    init(id) {
        this.modalContainer = document.getElementById(id);
        this.makeModal(this.options);
    }

    makeModal(options) {
        /* build */

        this.modalView = /*html*/`
            <div class="modal-title">
                <span class="modal-title-text">${options.title}</span>
                <img src="public/svg/close.svg" />
            </div>
            <div class="modal-content">
                ${options.content}
            </div>
            <div class="modal-footer"></div>
        `;

        this.modalContainer.innerHTML = this.modalView;

        this.setContent(options);
        this.setButtons(options);

        return this.modalView;
    }

    setContent(options) {
        const content = document.querySelector(`#${elementId} .modal-content`);

        content.innerHTML = options.content;
    }

    setButtons(options) {
        const footer = document.querySelector(`#${elementId} .modal-footer`);

        if( options.confirmBtn ) {
            const btn = NodeBuilder.makeButton(options.confirmBtn);
            footer.appendChild(btn);
        }
        if( options.cancleBtn ) {
            const btn = NodeBuilder.makeButton(options.cancleBtn);
            footer.appendChild(btn);
        }
    }

    toggle() {
        
    }
}

export default Modal;