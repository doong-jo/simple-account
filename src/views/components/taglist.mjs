class TagList {
    constructor(id, defaultValues) {
        this.tagElement = document.createElement('div');
        this.tagElement.className = "tag-container vertical-margin";
        this.tagElement.id = id;

        this.removeSVGPath = "public/svg/close.svg";
        this.KEY_COMMA = "Comma";

        this.values = [];

        this.init(defaultValues);
    }

    init(defaultValues) {
        this.values = defaultValues;
        this.tagInput = document.createElement('input');

        this.tagInput.type = "text";

        for(var i=0; i<defaultValues.length; i++) {
            this.makeTag(defaultValues[i]);
        }
        
        this.tagElement.appendChild(this.tagInput);

        this.registerEvents();
    }

    registerEvents() {
        let tagStr = '';
        
        this.tagInput.addEventListener('keyup', e => {
            const inp = e.key;
            // only characters and comma and backspace

            if( ( 
                    /[a-zA-Z0-9-_,ㄱ-ㅎㅏ-ㅣ]/.test(inp) || 
                    e.key.length == 1
                ) && e.key === "," ) {
                if( this.tagInput.value !== ',' ) {
                    this.makeTag(this.tagInput.value.slice(0, -1));   
                }

                this.tagInput.value = '';
            }
        });
    }

    makeTag(tagStr) {
        const
            div = document.createElement('div'),
            span = document.createElement('span'),
            img = document.createElement('img');
        
        span.innerHTML = tagStr;
        img.src = this.removeSVGPath;
        img.onclick = (e) => {
            e.target.parentElement.remove();
        };

        div.className = "inline tag-box";
        div.appendChild(span);
        div.appendChild(img);

        const tagBoxes = document.getElementsByClassName("tag-box");
        console.log('tagBoxes', tagBoxes);
        if( tagBoxes.length < 1 ) {
            this.tagElement.appendChild(div);
        } else {
            const lastTagBox = tagBoxes[tagBoxes.length - 1];
            lastTagBox.insertAdjacentElement('afterend', div);
        }
    }

    add() {
        // this.tagElement.appendChild();
    }

    delete() {
        // this.tagElement.removeChild();
    }

    get tags() {
        return this.values;
    }

    get element() {
        return this.tagElement;
    }
}

export default TagList;