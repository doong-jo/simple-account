/* eslint-disable import/extensions */
import NodeBuilder from '../../services/nodebuilder.mjs';

class TagList {
    constructor(id, min) {
        this.CLOSE_SVG_PATH = 'public/svg/close.svg';

        this.tagElement = document.createElement('div');
        this.tagElement.className = 'tag-container vertical-margin';
        this.tagElement.id = `${id}-list`;
        this.tagData = [];
        this.minTag = min;

        this.init(id);
    }

    init(id) {
        this.tagInput = NodeBuilder.makeInput({
            inputType: 'text',
            nameAndId: id,
        });

        for (let i = 0; i < this.tagData.length; i += 1) {
            this.makeTag(this.tagData[i]);
        }
        this.tagElement.appendChild(this.tagInput);

        this.registerEvents();
    }

    reset() {
        this.tagData = [];

        NodeBuilder.removeChildren(this.tagElement, (child) => {
            return child.tagName !== 'INPUT';
        });
    }

    registerEvents() {
        this.tagInput.addEventListener('input', this.inputEvent.bind(this));
        this.tagInput.addEventListener('keydown', this.keyDownEvent.bind(this));
    }

    inputEvent(e) {
        const inp = e.data;
        const { length, value } = this.tagInput;
        if (inp === null) { return; }
        if (inp === ',' // check hangul '가,'
            || (inp.length === 2 && String(inp)[1] === ',')) {
            this.tagInput.value = this.tagInput.value.trim();
            if (this.tagInput.value !== ',') { this.addTag(); }

            this.tagInput.value = '';
        } else if (inp === 'Backspace' && length > 0 && value === '') {
            this.removeLastTag();
        }
    }

    keyDownEvent(e) {
        const inp = e.key;
        const { value } = this.tagInput;
        const { length } = this.tagData;

        if (inp === 'Backspace' && length > 0 && value === '') {
            this.removeLastTag();
            e.preventDefault();
        }
    }

    removeLastTag() {
        this.tagInput.value = this.tagData.pop();

        const tagBoxes = this.tagElement.querySelectorAll('.tag-box');
        tagBoxes[tagBoxes.length - 1].remove();
    }

    removeClickedTag(e) {
        const { parentElement } = e.target;
        const tagBoxes = this.tagElement.querySelectorAll('.tag-box');
        const idx = Array.from(tagBoxes).indexOf(parentElement);

        parentElement.remove();
        this.tagData.splice(idx, 1);
    }

    addTag() {
        const tagStr = this.tagInput.value.slice(0, -1);

        this.makeTag(tagStr);
        this.tagData.push(tagStr);
    }

    makeTag(tagStr) {
        const div = document.createElement('div');
        const span = document.createElement('span');
        const img = document.createElement('img');

        span.innerHTML = tagStr;
        img.src = this.CLOSE_SVG_PATH;
        img.onclick = this.removeClickedTag.bind(this);

        div.className = 'tag-box';
        div.appendChild(span);
        div.appendChild(img);

        const { length } = this.tagElement.querySelectorAll('.tag-box');

        if (length < 1) {
            this.tagElement.insertAdjacentElement('afterbegin', div); 
        } else {
            this.tagInput.insertAdjacentElement('beforebegin', div);
        }
    }

    get tags() {
        return this.tagData;
    }

    get element() {
        return this.tagElement;
    }

    get inputElem() {
        return this.tagElement.querySelector('input');
    }

    get id() {
        return this.tagElement.id;
    }

    get min() {
        return this.minTag;
    }

    get checkLength() {
        return this.tags.length >= this.min;
    }
}

export default TagList;
