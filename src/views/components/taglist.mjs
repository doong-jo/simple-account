class TagList {
    constructor(id, defaultValues) {
        this.tagElement = document.createElement('div');
        this.tagElement.className = "tag-container vertical-margin";
        this.tagElement.id = id;

        this.CLOSE_SVG_PATH = "public/svg/close.svg";

        this.tagData = defaultValues;

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

    registerEvents() {
        this.tagInput.addEventListener('input', this.inputEvent.bind(this));
        this.tagInput.addEventListener('keydown', this.keyDownEvent.bind(this));
    }

    inputEvent(e) {
        const inp = e.data;
        // only characters and comma and backspace
        console.log(e.data);
        if( ( /[a-zA-Z0-9-_,ㄱ-ㅎㅏ-ㅣ]/.test(inp) || 
                inp.length === 1
            ) && inp === "," ) {
            if( this.tagInput.value !== ',' ) {
                this.addTag();
            }

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
            this.tagElement.appendChild(div);
        } else {
            const lastTagBox = tagBoxes[tagBoxes.length - 1];
            lastTagBox.insertAdjacentElement('afterend', div);
        }
    }

    get tags() {
        return this.tagData;
    }

    get element() {
        return this.tagElement;
    }
}

export default TagList;