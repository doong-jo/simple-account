import NodeBuilder from '../../services/nodebuilder.mjs';
import TagList from './taglist.mjs';

class Form {
    constructor(id) {
        this.formElement = document.getElementById(id);
        this.tagList = {};
        this.hasValidatorItems = [];
        this.formData = {};
        this.itemEvents = {};

        this.makeElementOfType = {
            'label' : (args) => {
                const l = NodeBuilder.makeLabel(args);
                this.formElement.appendChild(l);
            },
    
            'input' : (args) => {
                const i = NodeBuilder.makeInput(args);
                this.formElement.appendChild(i);
                this.makeSpanValidator(args, i);
                i.addEventListener('input', this.valueChangeListener(args));
            },
    
            'element-rows' : (args) => {
                const 
                    flexCotainerDiv = document.createElement("div"),
                    { elements } = args;
    
                flexCotainerDiv.className = "form-inputs-container";
                this.formElement.appendChild(flexCotainerDiv);
                this.makeSpanValidator(args, flexCotainerDiv);

                elements.forEach(eachArgs => {
                    const 
                        flexItemDiv = document.createElement("div"),
                        elementBuilder = NodeBuilder.makeElementByType(),
                        child = elementBuilder[eachArgs.type](eachArgs); 
                        
                    eachArgs.spanValidator = args.spanValidator;
                    flexItemDiv.className = "form-flex-items";
                    flexItemDiv.appendChild(child);
                    flexCotainerDiv.appendChild(flexItemDiv);

                    this.addEventByType(child, eachArgs);
                }); 
            },

            'button' : (args) => {
                const b = NodeBuilder.makeButton(args);
                this.formElement.appendChild(b);
            },
    
            'select' : (args) => {
                const s = NodeBuilder.makeSelectAndOption(args);
                this.formElement.appendChild(s);
                this.makeSpanValidator(args, s);

                s.addEventListener('change', this.valueChangeListener(args));
            },
    
            'checkboxWithText' : (args) => { 
                const 
                    div = document.createElement('div'),
                    sp = NodeBuilder.makeSpan(args),
                    chk = NodeBuilder.makeInput(args),
                    { checkboxPos } = args;

                div.className = "term vertical-margin";
                const 
                    checkboxPosAdjusting = {
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
                    },
                    pos = checkboxPos || right;

                checkboxPosAdjusting[pos]();
                this.formElement.appendChild(div);
            },

            'tag-list' : (args) => {
                const
                    { nameAndId, minTag } = args, 
                    newTagList = new TagList(nameAndId, minTag);
                this.formElement.appendChild(newTagList.element);

                this.makeSpanValidator(args, newTagList.element);
                newTagList.inputElem
                    .addEventListener('focus', 
                        this.tagListFocusListener(newTagList, args));

                newTagList.inputElem
                    .addEventListener('input', 
                        this.tagListInputChangeListener(newTagList, args));

                this.tagList[nameAndId] = newTagList;
            }
        };

        this.getValueOfEachType = {
            'input': (elem) => {
                const { value } = this.formElement.querySelector(`#${elem.nameAndId}`);
                return { 
                    value, 
                    denySentence: elem.denySentence,
                    id: elem.nameAndId,
                };
            },
            'select': (elem) => { // same function => input
                const { value } = this.formElement.querySelector(`#${elem.nameAndId}`);
                return { 
                    value, 
                    denySentence: elem.denySentence,
                    id: elem.nameAndId,
                };
            },
            'checkboxWithText': (elem) => {
                const { checked } = this.formElement.querySelector(`#${elem.nameAndId}`);
                return { 
                    value : checked, 
                    denySentence: elem.denySentence,
                    id: elem.nameAndId,
                };
            },
            'element-rows': (rows) => {
                const r = [];
                rows.elements.forEach(elem => {
                    const { value } = document.querySelector(`#${elem.nameAndId}`);
                    r.push({
                        value, denySentence: elem.denySentence,
                        validator : elem.validator,
                        id: elem.nameAndId,
                    })
                });

                return r;
            },
            'tag-list': (elem) => {
                const 
                    tagList = this.tagList[elem.nameAndId],
                    value = tagList.tags.length < tagList.minTag ? false : tagList.tags;

                return { 
                    value, 
                    denySentence: elem.denySentence,
                    id: tagList.inputElem.id,
                };
            },
        };
    }

    showValidation(args, value) {
        const 
            { result, failCase } = args.validator(value),
            { spanValidator, denySentence, successSentence } = args,
            classes = spanValidator.classList,
            addClass = result ? 'okay' : 'warning',
            rmClass = addClass === 'okay' ? 'warning' : 'okay';

        if( value === '' ) {
            classes.remove('okay');
            classes.remove('warning');
            return;
        }

        spanValidator.innerHTML = result ?
            successSentence : denySentence[failCase];

        if( !classes.contains(addClass) ) {
            classes.remove(rmClass);
            // restart animation, https://bit.ly/2UkQglI
            void spanValidator.offsetWidth;
            classes.add(addClass);
        }
    }

    addEventByType(elem, args) {
        const { tagName } = elem;

        if( tagName === 'INPUT' || tagName === 'SELECT') {
            elem.addEventListener('input', this.valueChangeListener(args))
        }
    }

    tagListFocusListener(tagList, args) {
        return () => { this.showValidation(args, tagList.checkLength); };
    }

    tagListInputChangeListener(tagList, args) {
        return (e) => {
            if( !e.target.value.length ) { 
                this.showValidation(args, tagList.checkLength); 
            }
        };
    }

    valueChangeListener(args) {
        return (e) => {
            const 
                { value } = e.target,
                { inputType, maxLength } = args;

            if( inputType === 'number' || inputType === 'tel') {
                e.target.value = value.slice(0, maxLength);
            }

            this.showValidation(args, value);
        };
    }

    makeSpanValidator(args, itemElem) {
        const sp = NodeBuilder.makeSpan({
            className: 'form-validator vertical-margin',
            innerHTML: '&nbsp;',
        });
        
        itemElem.insertAdjacentElement('afterend', sp);
        args.spanValidator = sp;
    }

    build(formData) {
        let tabInd = 1;
        formData.forEach(itemData => {
            itemData.tabIndex = tabInd++;
            this.makeElementOfType[itemData.type](itemData);
            if( itemData.validator ) { 
                this.hasValidatorItems.push(itemData);
             }
        });

        return this;
    }

    reset() {
        this.formElement.reset();

        for(const tagListName in this.tagList) {
            this.tagList[tagListName].reset();
        }
    }

    validate() {
        const res = [];
        this.hasValidatorItems.forEach(itemData => {
            const 
                valueforValidate = this.getValueOfEachType[itemData.type](itemData),
                { nameAndId, validator } = itemData,
                pushToRes = function (value, denySentence, validator, id) {
                    const { result, failCase } = validator(value);
                    res.push({
                        result, denySentence : denySentence[failCase], id
                    });
                    this.formData[nameAndId] = value;
                }.bind(this);

            if( valueforValidate.length ) {
                valueforValidate.forEach(row => {
                    const { value, denySentence = '', validator, id } = row;
                    pushToRes(value, denySentence, validator, id);
                });
            } else {
                const { value, denySentence = '', id } = valueforValidate;
                pushToRes(value, denySentence, validator, id);
            }
        });

        return res;
    }

    submit(serverUrl = '') {
        // TODO : send to server 
        // data : this.formData
        document.location.href = '/';
    }

    getValidateResult() {
        const validatedResultArr = this.validate();

        let 
            sentence = '',
            focusId = '';

        validatedResultArr.some(v => {
            sentence = !v.result ? v.denySentence : '';
            focusId = v.id;
            return !v.result;
        });

        return { sentence, focusId };
    }

    get denySentence() {
        const { sentence, focusId } = this.getValidateResult();

        if( sentence.length ) {
            document.querySelector(`#${focusId}`).focus();
            document.querySelector(`#${focusId}`)
            return sentence;
        }

        return 'success';
    }

    get container() {
        return this.formElement;
    }
}

export default Form;