import Util from '../../services/util.mjs';

let formElement;

const Form = {
    initializeById : function (id) {
        formElement = document.getElementById(id)[0];
    },

    initializeByClassName : function (className) {
        formElement = document.getElementsByClassName(className)[0];
    },

    makeElementOfType : {
        'label' : (args) => {
            const l = Util.makeLabel(args);
            formElement.appendChild(l);
        },

        'input' : function (args) {
            const i = Util.makeInput(args);
            formElement.appendChild(i);
        },

        'element-rows' : (args) => {
            const 
                flexCotainerDiv = document.createElement("div"),
                { elements } = args;

            flexCotainerDiv.className = "form-inputs-container";

            elements.forEach(eachArgs => {
                console.log(eachArgs.type);
                const 
                    flexItemDiv = document.createElement("div"),
                    elementBuilder = Util.makeElementByType(),
                    child = elementBuilder[eachArgs.type](eachArgs);    

                
                flexItemDiv.className = "form-flex-items";
                flexItemDiv.appendChild(child);

                flexCotainerDiv.appendChild(flexItemDiv);
            }); 
            formElement.appendChild(flexCotainerDiv);
        },

        'select' : (args) => {
            const s = Util.makeSelectAndOption(args);
            formElement.appendChild(s);
        },

        'checkboxWithText' : (args) => { 
            const 
                div = document.createElement('div'),
                sp = document.createElement('span'),
                chk = Util.makeInput(args),
                { checkboxPos, underlined, text } = args;

            div.className = "inline"
            sp.innerHTML = text;
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

            formElement.appendChild(div);
        },
    },

    makeForm : function(formData)  {
        formData.forEach(data => {
            this.makeElementOfType[data.type](data);
        });
    },
};

export default Form;