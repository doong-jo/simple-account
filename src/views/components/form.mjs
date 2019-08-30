import NodeBuilder from '../../services/nodebuilder.mjs';
import TagList from './taglist.mjs';

class Form {
    constructor(className, ind = 0) {
        this.formElement = document.getElementsByClassName(className)[ind];

        this.init();
    }

    init() {
        this.makeElementOfType = {
            'label' : (args) => {
                const l = NodeBuilder.makeLabel(args);
                this.formElement.appendChild(l);
            },
    
            'input' : (args) => {
                const i = NodeBuilder.makeInput(args);
                this.formElement.appendChild(i);
            },
    
            'element-rows' : (args) => {
                const 
                    flexCotainerDiv = document.createElement("div"),
                    { elements } = args;
    
                flexCotainerDiv.className = "form-inputs-container";
    
                elements.forEach(eachArgs => {
                    const 
                        flexItemDiv = document.createElement("div"),
                        elementBuilder = NodeBuilder.makeElementByType(),
                        child = elementBuilder[eachArgs.type](eachArgs);    
                    
                    if( eachArgs.attrType ) {
                        child.type = eachArgs.attrType;
                    }
                    
                    flexItemDiv.className = "form-flex-items";
                    flexItemDiv.appendChild(child);
    
                    flexCotainerDiv.appendChild(flexItemDiv);
                }); 
                this.formElement.appendChild(flexCotainerDiv);
            },
    
            'select' : (args) => {
                const s = NodeBuilder.makeSelectAndOption(args);
                this.formElement.appendChild(s);
            },
    
            'checkboxWithText' : (args) => { 
                const 
                    div = document.createElement('div'),
                    sp = document.createElement('span'),
                    chk = NodeBuilder.makeInput(args),
                    { checkboxPos, underlined, text, textClassName, textOnClick } = args;
    
                div.className = "vertical-margin";
                sp.innerHTML = text;
                sp.className = textClassName;
                sp.onclick = textOnClick;

                if( underlined ) sp.style = underlined ? "text-decoration: underline;" : "";
    
                const checkboxPosAdjusting = {
                    'left': () => {
                        chk.style = "margin-right: 1em;";
                        div.appendChild(chk);
                        div.appendChild(sp);
                    },
                    'right': () => {
                        chk.style = "margin-left: 1em;";
                        div.appendChild(sp);
                        div.appendChild(chk);
                    }
                };
    
                const pos = checkboxPos || right;
                checkboxPosAdjusting[pos]();
    
                this.formElement.appendChild(div);
            },

            'tag-list' : (args) => {
                const tagList = new TagList(args.id, args.defaultValues);
                this.formElement.appendChild(tagList.element);
            }
        };
    }

    registerEvents() {

    }

    makeForm(formData) {
        formData.forEach(data => {
            this.makeElementOfType[data.type](data);
        });
    }
}

export default Form;