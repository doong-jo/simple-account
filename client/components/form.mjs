import NodeBuilder from '../services/nodebuilder.mjs';
import Util from '../services/util.mjs';
import FormValidator from '../services/form-validator.mjs';

import TagList from './taglist.mjs';

function valueChangeListener(args) {
    return  Util.debounce((e) => {
        const { value } = e.target;
        const { inputType, maxLength } = args;

        if (inputType === 'number' || inputType === 'tel') {
            e.target.value = value.slice(0, maxLength);
        }

        FormValidator.showValidation(args, value);
    }, 500);
}

function addEventInputAndSelect(elem, args) {
    const { tagName } = elem;

    if (tagName === 'INPUT' || tagName === 'SELECT') {
        elem.addEventListener('input', valueChangeListener(args));
    }
}

function tagListListener(tagList, args) {
    return (e) => {
        if (e.target.value === '') {
            FormValidator.showValidation(args, tagList.tags);
        }
    };
}

function getRefactedFormData(body) {
    const birth = `${body.f_birth_year}-${body.f_birth_month}-${body.f_birth_day}`;
    const data = {
        id: body.f_id,
        pwd: body.f_pw,
        name: body.f_name,
        birth,
        sex: body.f_sex,
        email: body.f_email,
        phone: body.f_phone,
        favorite: body.f_favorite,
    };

    return data;
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
                NodeBuilder.makeSpanValidator(args, i);
                i.addEventListener('input', valueChangeListener(args));
            },

            'element-rows': (args) => {
                const flexCotainerDiv = document.createElement('div');
                const { elements } = args;

                flexCotainerDiv.className = 'form-inputs-container';
                this.formElement.appendChild(flexCotainerDiv);
                NodeBuilder.makeSpanValidator(args, flexCotainerDiv);

                elements.forEach((eachArgs) => {
                    const flexItemDiv = document.createElement('div');
                    const elementBuilder = NodeBuilder.makeElementByType();
                    const child = elementBuilder[eachArgs.type](eachArgs);

                    // eslint-disable-next-line no-param-reassign
                    eachArgs.spanValidator = args.spanValidator;
                    flexItemDiv.className = 'form-flex-items';
                    flexItemDiv.appendChild(child);
                    flexCotainerDiv.appendChild(flexItemDiv);

                    addEventInputAndSelect(child, eachArgs);
                });
            },

            button: (args) => {
                const b = NodeBuilder.makeButton(args);
                this.formElement.appendChild(b);
            },

            select: (args) => {
                const s = NodeBuilder.makeSelectAndOption(args);
                this.formElement.appendChild(s);
                NodeBuilder.makeSpanValidator(args, s);

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

                NodeBuilder.makeSpanValidator(args, newTagList.element);
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
                const value = tagList.tags;

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

    // 유효성 검사의 결과들을 저장
    async validateEachItems(value, denySentence, doValidate, id) {
        this.formData[id] = value;

        const { result, failCase } = await doValidate(value);
        return {
            result, denySentence: denySentence[failCase], id
        };
    }

    async validate() {
        const res = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const itemData of this.hasValidatorItems) {
            // 1. 유효성 검사를 위해 각 Form 항목의 값을 가져온다
            const valueforValidate = this.getValueOfEachType[itemData.type](itemData);
            const { validator } = itemData;

            // 2. 단일 항목과 여러 Element들이 있는 한 항목을 분기하여 처리
            if (Array.isArray(valueforValidate)) {
                valueforValidate.forEach(async (row) => {
                    const { value, denySentence = '', id } = row;
                    const thisValidator = row.validator;
                    // 3. { id, value } 형태로 formData(form 전송 시 사용) 저장
                    res.push(await this.validateEachItems(value, denySentence, thisValidator, id));
                });
            } else {
                const { value, denySentence = '', id } = valueforValidate;
                res.push(await this.validateEachItems(value, denySentence, validator, id));
            }
        }

        return res;
    }

    async submit(serverUrl = '', successFn, failFn) {
        if (serverUrl === '') { return; }

        await Util.requestServer('POST',
            getRefactedFormData(this.formData),
            serverUrl, successFn, failFn);
    }

    async getValidateResult() {
        const validatedResultArr = await this.validate();

        let sentence = '';
        let focusId = '';

        console.log('validatedResultArr', validatedResultArr);
        validatedResultArr.some((v) => {
            console.log('v', v);
            sentence = !v.result ? v.denySentence : '';
            focusId = v.id;
            return !v.result;
        });

        if (sentence !== '') {
            document.querySelector(`#${focusId}`).focus();
            return sentence;
        }

        return 'success';
    }

    get container() {
        return this.formElement;
    }
}

export default Form;
