import NodeBuilder from '../../services/nodebuilder.mjs';
import TagList from './taglist.mjs';

class Form {
    constructor(className, ind = 0) {
        this.formElement = document.getElementsByClassName(className)[ind];
        this.tagList = [];
        this.chkBoxes = [];
        this.hasValidateorItems = [];

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
    
                this.chkBoxes.push(chk);

                div.className = "term vertical-margin";
                sp.innerHTML = text;
                sp.className = textClassName;

                console.log(textOnClick);
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
                const newTagList = new TagList(args.id, args.defaultValues)
                this.formElement.appendChild(newTagList.element);

                this.tagList.push(newTagList);
            }
        };

        const getElemVal = (nameAndId) => { 
            return document.querySelector(`${nameAndId}`).value;
        };
        this.getValueOfEachType = {
            'input': (elem) => {
                const value = getElemVal(elem.nameAndId);
                return { value, denySentence: elem.denySentence };
            },
            'select': (elem) => { // same function => input
                const value = getElemVal(elem.nameAndId);
                return { value, denySentence: elem.denySentence };
            },
            'checkboxWithText': (elem) => {
                const { checked } = getElemVal(elem.nameAndId);
                return { value : checked, denySentence: elem.denySentence };
            },
            'element-rows': (elems) => {
                let r = [];
                elems.elements.forEach(elem => {
                    const { value } = getElemVal(elem.nameAndId);
                    r.push({
                        value, denySentence: elem.denySentence
                    })
                });

                return r;
            },
        };
    }

    makeForm(formData) {
        formData.forEach(itemData => {
            this.makeElementOfType[itemData.type](itemData);
            if( itemData.validator ) { this.hasValidateorItems.push(itemData); }
        });

        return this;
    }

    reset() {
        this.formElement.reset();
        this.tagList.forEach(item => {
            item.reset();
        })
    }

    // checkInvalidTagList() {
    //     let id = '';
    //     this.tagList.some(item => {
    //         id = item.id;
    //         return item.tags.length === 0;
    //     })

    //     return id;
    // }

    // checkInvalidFormItem() {
    //     const formData = new FormData(this.formElement);
    //     let invalidKey = '';

    //     const keys = Array.from(formData.keys());

    //     keys.some((item) => {
    //         return formData.get(item) === '' ?
    //              (invalidKey = item, true) : false;
    //     })

    //     return invalidKey;
    // }

    validateForm() {
        const res = [];
        this.hasValidateorItems.forEach(itemData => {
            const valueforValidate = this.getValueOfEachType[itemData.type](itemData);

            if( valueforValidate.length ) {
                value.forEach(v => {
                    const { value, denySentence = '' } = v;
                    res.push(
                        itemData.validator({value, denySentence})
                    );
                });
            } else {
                const { value, denySentence = '' } = valueforValidate;
                res.push(
                    itemData.validator({value, denySentence})
                );
            }
        });

        return res;
    }

    get denySentence() {
        const validatedResultArr = this.validateForm();
        console.log(validatedResultArr);
        if( validatedResultArr.length > 0 ) {
            return validatedResultArr[0].sentence;
        }

        return 'success';
    }
}

export default Form;