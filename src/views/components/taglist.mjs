class TagList {
    constructor(id) {
        this.tagElement = document.createElement('div');
        this.tagElement.className = "tag-container vertical-margin";
        this.tagElement.id = id;

        this.CLOSE_SVG_PATH = "public/svg/close.svg";

        this.tagData = [];

        this.init();
    }

    init() {
        this.tagInput = document.createElement('input');
        this.tagInput.type = "text";

        for(var i=0; i<this.tagData.length; i++) {
            this.makeTag(this.tagData[i]);
        }
        this.tagElement.appendChild(this.tagInput);

        this.registerEvents();
    }

    reset() {
        this.tagData = [];
        const children = this.tagElement.children; 

        for(var i=children.length - 1; i >= 0; i--) {
            if( children[i].tagName !== "INPUT" ) {
                this.tagElement.removeChild(children[i]); 
            }
        }
    }

    registerEvents() {
        this.tagInput.addEventListener('input', this.inputEvent.bind(this));
        this.tagInput.addEventListener('keydown', this.keyDownEvent.bind(this));
    }

    inputEvent(e) {
        const inp = e.data;
        if( inp === "," ||
            // check hangul '가,'
            (inp.length === 2 && String(inp)[1] === "," ) ) {
            this.tagInput.value = this.tagInput.value.trim();
            if( this.tagInput.value !== ',' ) { this.addTag();}

            this.tagInput.value = '';
        } else if( inp === "Backspace" &&
            this.tagData.length > 0 &&
            this.tagInput.value === '' ) {
            this.removeLastTag();
        }
    }

    keyDownEvent(e) {
        const inp = e.key;

        if( inp === "Backspace" &&
            this.tagData.length > 0 &&
            this.tagInput.value === '' ) {
            this.removeLastTag();

            e.preventDefault();
        }
    }

    removeLastTag() {
        this.tagInput.value = this.tagData.pop();

        const tagBoxes = document.getElementsByClassName("tag-box");
        tagBoxes[tagBoxes.length - 1].remove();
    }

    addTag() {
        const tagStr = this.tagInput.value.slice(0, -1);

        this.makeTag(tagStr);   
        this.tagData.push(tagStr);
    }

    makeTag(tagStr) {
        const
            div = document.createElement('div'),
            span = document.createElement('span'),
            img = document.createElement('img');
        
        span.innerHTML = tagStr;
        img.src = this.CLOSE_SVG_PATH;
        img.onclick = (e) => {
            e.target.parentElement.remove();
        };
        
        div.className = "inline tag-box";

        div.appendChild(span);
        div.appendChild(img);

        const tagBoxes = document.getElementsByClassName("tag-box");

        if( tagBoxes.length < 1 ) {
            this.tagElement.insertAdjacentElement('afterbegin', div);
        } else {
            this.tagInput.insertAdjacentElement('beforebegin', div);;
        }
    }

    get tags() {
        return this.tagData;
    }

    get element() {
        return this.tagElement;
    }

    get id() {
        return this.tagElement.id;
    }
}

export default TagList;