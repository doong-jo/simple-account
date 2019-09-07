import NodeBuilder from '../services/nodebuilder.mjs';

class Modal {
    constructor(id, options = {}) {
        this.options = options;
        this.elementId = id;
        // this.modalContainer = document.querySelector(`#${this.elementId}`);

        this.modalContainer = document.createElement('div');
        this.modalContainer.id = id;
        this.modalContainer.className = 'modal-container';
        document.body.appendChild(this.modalContainer);
    }

    makeModal(options) {
        this.modalView = /* html */`
            <div class="modal-title">
                <span class="modal-title-text">${options.title}</span>
                <img alt="close" class="close" src="public/svg/close.svg" />
            </div>
            <div class="modal-content"></div>
            <div class="modal-footer"></div>
        `;

        this.modalContainer.insertAdjacentHTML('beforeend', this.modalView);
        this.closeBtn = this.modalContainer.querySelector('.close');
        const { width, height, top, content, footer} = options;
        this.setSize(width, height, top);
        this.setCloseBtnEvent();
        if (content) this.setContent(content);
        if (footer) this.setButtons(footer);
        

        return this;
    }

    setSize(width, height, top) {
        if (!width && !height && !top) { return; }
        this.modalContainer.style = `width : ${width}; height: ${height}; top: ${top};`;
    }

    setCloseBtnEvent() {
        this.closeBtn.addEventListener('click', () => {
            this.toggle(false);
        });
    }

    toggle(trig) {
        const mdContainerClasses = this.modalContainer.classList;

        mdContainerClasses.remove(trig ? 'invisible' : 'visible');
        mdContainerClasses.add(trig ? 'visible' : 'invisible');
    }

    setContent(content) {
        this.modalContainer
            .querySelector('.modal-content')
            .innerHTML = content;
    }

    setButtons(footerOptions) {
        const footer = this.modalContainer.querySelector('.modal-footer');

        if (footerOptions.cancleBtn) {
            const btn = NodeBuilder.makeButton(footerOptions.cancleBtn);
            btn.onclick = () => { this.toggle(false); };
            footer.appendChild(btn);
        }

        if (footerOptions.confirmBtn) {
            footer.appendChild(NodeBuilder.makeButton(footerOptions.confirmBtn));
        }
    }

    get container() {
        return this.modalContainer;
    }
}

export default Modal;