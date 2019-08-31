import NodeBuilder from '../../services/NodeBuilder.mjs';

class Modal {
    constructor(id, options = {}) {
        this.options = options;
        this.elementId = id;
    }

    makeModal(options) {
        this.modalView = /*html*/`
            <div id="${this.elementId}" class="modal-container invisible">
                <div class="modal-title">
                    <span class="modal-title-text">${options.title}</span>
                    <img class="close" src="public/svg/close.svg" />
                </div>
                <div class="modal-content"></div>
                <div class="modal-footer"></div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', this.modalView);
        this.modalContainer = document.querySelector(`#${this.elementId}`);

        this.setSize(options.width, options.height);
        this.setCloseBtnEvent();
        this.setContent(options.content);
        this.setButtons(options.footer);

        return this;
    }

    setSize(width, height) {
        if( !width && !height ) { return; }
        this.modalContainer.style =  `width : ${width}; height: ${height}`;
    }

    setCloseBtnEvent() {
        const closeBtn = document.querySelector(`#${this.elementId} .close`);
        const closeBtnClickedListener = () => {
            this.toggle(false);
        };
        closeBtn.addEventListener('click', closeBtnClickedListener);
    }

    toggle(trig) {
        const mdContainerClasses = this.modalContainer.classList;

        if( !trig ) {
            mdContainerClasses.remove('visible');
            mdContainerClasses.add('invisible');
        } else {
            mdContainerClasses.remove('invisible');
            mdContainerClasses.add('visible');
        }
    }

    setContent(content) {
        const modalContent = document.querySelector(`#${this.elementId} .modal-content`);
        modalContent.innerHTML = content;
    }

    setButtons(footerOptions) {
        const footer = document.querySelector(`#${this.elementId} .modal-footer`);

        if( footerOptions.cancleBtn ) {
            const btn = NodeBuilder.makeButton(footerOptions.cancleBtn);
            btn.onclick = () => { this.toggle(false) };
            footer.appendChild(btn);
        }
        
        if( footerOptions.confirmBtn ) {
            const btn = NodeBuilder.makeButton(footerOptions.confirmBtn);
            footer.appendChild(btn);
        }
        
    }

    get container() {
        return this.modalContainer;
    }
}

export default Modal;