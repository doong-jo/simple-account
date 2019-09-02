/* eslint-disable import/extensions */
import NodeBuilder from '../../services/nodebuilder.mjs';
import TagList from './taglist.mjs';


const FormWork = {
    showValidation: (args, value) => {
        const { result, failCase } = args.validator(value);
        const { spanValidator, denySentence, successSentence } = args;
        const classes = spanValidator.classList;
        const addClass = result ? 'okay' : 'warning';
        const rmClass = addClass === 'okay' ? 'warning' : 'okay';

        if (value === '') {
            classes.remove('okay');
            classes.remove('warning');
            return;
        }

        spanValidator.innerHTML = result ? successSentence : denySentence[failCase];

        if (!classes.contains(addClass)) {
            classes.remove(rmClass);
            // restart animation, https://bit.ly/2UkQglI
            // eslint-disable-next-line no-void
            void spanValidator.offsetWidth;
            classes.add(addClass);
        }
    },
    addEventByType: (elem, args) => {
        const { tagName } = elem;

        if (tagName === 'INPUT' || tagName === 'SELECT') {
            // eslint-disable-next-line no-use-before-define
            elem.addEventListener('input', valueChangeListener(args));
        }
    },
    makeSpanValidator: (args, itemElem) => {
        const sp = NodeBuilder.makeSpan({
            className: 'form-validator vertical-margin',
            innerHTML: '&nbsp;',
        });

        itemElem.insertAdjacentElement('afterend', sp);
        // eslint-disable-next-line no-param-reassign
        args.spanValidator = sp;
    },
};

function tagListListener(tagList, args) {
    return (e) => {
        if (!e.target.value.length) {
            FormWork.showValidation(args, tagList.checkLength);
        }
    };
}

function valueChangeListener(args) {
    return (e) => {
        const { value } = e.target;
        const { inputType, maxLength } = args;

        if (inputType === 'number' || inputType === 'tel') {
            e.target.value = value.slice(0, maxLength);
        }

        FormWork.showValidation(args, value);
    };
}

class Form {
    constructor(id) {
        this.formElement = document.getElementById(id);
        this.tagList = {};
        this.hasValidatorItems = [];
        this.formData = {};
        this.itemEvents = {};

        this.makeElementOfType = {
            label: (args) => {
                const l = NodeBuilder.makeLabel(args);
                this.formElement.appendChild(l);
            },

            input: (args) => {
                const i = NodeBuilder.makeInput(args);
                this.formElement.appendChild(i);
                FormWork.makeSpanValidator(args, i);
                i.addEventListener('input', valueChangeListener(args));
            },

            'element-rows': (args) => {
                const flexCotainerDiv = document.createElement('div');
                const { elements } = args;

                flexCotainerDiv.className = 'form-inputs-container';
                this.formElement.appendChild(flexCotainerDiv);
                FormWork.makeSpanValidator(args, flexCotainerDiv);

                elements.forEach((eachArgs) => {
                    const flexItemDiv = document.createElement('div');
                    const elementBuilder = NodeBuilder.makeElementByType();
                    const child = elementBuilder[eachArgs.type](eachArgs);

                    // eslint-disable-next-line no-param-reassign
                    eachArgs.spanValidator = args.spanValidator;
                    flexItemDiv.className = 'form-flex-items';
                    flexItemDiv.appendChild(child);
                    flexCotainerDiv.appendChild(flexItemDiv);

                    FormWork.addEventByType(child, eachArgs);
                });
            },

            button: (args) => {
                const b = NodeBuilder.makeButton(args);
                this.formElement.appendChild(b);
            },

            select: (args) => {
                const s = NodeBuilder.makeSelectAndOption(args);
                this.formElement.appendChild(s);
                FormWork.makeSpanValidator(args, s);

                s.addEventListener('change', valueChangeListener(args));
            },

            checkboxWithText: (args) => { 
                const div = document.createElement('div');
                const sp = NodeBuilder.makeSpan(args);
                const chk = NodeBuilder.makeInput(args);
                const { checkboxPos } = args;

                div.className = 'term vertical-margin';
                const checkboxPosAdjusting = {
                    left: () => {
                        chk.style = 'margin-right: 1em;';
                        div.appendChild(chk);
                        div.appendChild(sp);
                    },
                    right: () => {
                        chk.style = 'margin-left: 1em;';
                        div.appendChild(sp);
                        div.appendChild(chk);
                    },
                };
                const pos = checkboxPos || 'right';

                checkboxPosAdjusting[pos]();
                this.formElement.appendChild(div);
            },

            'tag-list': (args) => {
                const { nameAndId, minTag } = args;
                const newTagList = new TagList(nameAndId, minTag);
                this.formElement.appendChild(newTagList.element);

                FormWork.makeSpanValidator(args, newTagList.element);
                newTagList.inputElem
                    .addEventListener('focus', tagListListener(newTagList, args));

                newTagList.inputElem
                    .addEventListener('input', tagListListener(newTagList, args));

                this.tagList[nameAndId] = newTagList;
            },
        };

        this.getValueOfEachType = {
            input: (elem) => {
                const { value } = this.formElement.querySelector(`#${elem.nameAndId}`);
                return {
                    value,
                    denySentence: elem.denySentence,
                    id: elem.nameAndId,
                };
            },
            select: (elem) => { // same function => input
                const { value } = this.formElement.querySelector(`#${elem.nameAndId}`);
                return {
                    value,
                    denySentence: elem.denySentence,
                    id: elem.nameAndId,
                };
            },
            checkboxWithText: (elem) => {
                const { checked } = this.formElement.querySelector(`#${elem.nameAndId}`);
                return {
                    value: checked,
                    denySentence: elem.denySentence,
                    id: elem.nameAndId,
                };
            },
            'element-rows': (rows) => {
                const r = [];
                rows.elements.forEach((elem) => {
                    const { value } = document.querySelector(`#${elem.nameAndId}`);
                    r.push({
                        value,
                        denySentence: elem.denySentence,
                        validator: elem.validator,
                        id: elem.nameAndId,
                    });
                });

                return r;
            },
            'tag-list': (elem) => {
                const tagList = this.tagList[elem.nameAndId];
                const value = tagList.tags.length < tagList.minTag ? false : tagList.tags;

                return {
                    value,
                    denySentence: elem.denySentence,
                    id: tagList.inputElem.id,
                };
            },
        };
    }

    build(formData) {
        formData.forEach((itemData) => {
            this.makeElementOfType[itemData.type](itemData);
            if (itemData.validator) {
                this.hasValidatorItems.push(itemData);
            }
        });

        return this;
    }

    reset() {
        this.formElement.reset();
        const elems = this.formElement.querySelectorAll('.okay, .warning');
        for (let i = 0; i < elems.length; i += 1) {
            elems[i].classList.remove('okay');
            elems[i].classList.remove('warning');
        }

        Object.values(this.tagList).forEach((tagList) => {
            tagList.reset();
        });
    }

    validate() {
        const res = [];
        this.hasValidatorItems.forEach((itemData) => {
            const valueforValidate = this.getValueOfEachType[itemData.type](itemData);
            const { nameAndId, validator } = itemData;
            const pushToRes = (value, denySentence, doValidate, id) => {
                const { result, failCase } = doValidate(value);
                res.push({
                    result, denySentence: denySentence[failCase], id,
                });
                this.formData[nameAndId] = value;
            };

            if (valueforValidate.length) {
                valueforValidate.forEach((row) => {
                    const { value, denySentence = '', id } = row;
                    const thisValidator = row.validator;
                    pushToRes(value, denySentence, thisValidator, id);
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

        let sentence = '';
        let focusId = '';

        validatedResultArr.some(v => {
            sentence = !v.result ? v.denySentence : '';
            focusId = v.id;
            return !v.result;
        });

        return { sentence, focusId };
    }

    get denySentence() {
        const { sentence, focusId } = this.getValidateResult();

        if (sentence.length) {
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
