let formElement;

function makeInput(args) {
    const 
        i = document.createElement("input"),
        { inputType, nameAndId, placeholder } = args;

    i.type = inputType;
    i.name = nameAndId;
    i.id = nameAndId;
    i.placeholder = placeholder;

    return i;
}

const Form = {
    initializeById : (Id) => {
        formElement = document.getElementById(Id)[0];
    },

    initializeByClassName : (className) => {
        formElement = document.getElementsByClassName(className)[0];
    },

    makeElementOfType : {
        'label' : (args) => {
            const l = document.createElement("label");

            l.htmlFor = args.for;
            l.innerHTML = args.innerHTML;

            formElement.appendChild(l);
        },

        'input' : function (args) {
            const inputElement = makeInput(args);
            formElement.appendChild(inputElement);
        },

        'input-rows' : (args) => {
            const 
                flexCotainerDiv = document.createElement("div"),
                { inputs } = args;

            flexCotainerDiv.className = "form-inputs-container";

            inputs.forEach(eachArgs => {
                const 
                    flexItemDiv = document.createElement("div"),
                    inputElement = makeInput(eachArgs);

                flexItemDiv.className = "form-flex-items";
                flexItemDiv.appendChild(inputElement);

                flexCotainerDiv.appendChild(flexItemDiv);
            }); 
            formElement.appendChild(flexCotainerDiv);
        },

        'select' : (args) => {
            const 
                selectElement = document.createElement("select"),
                { selectedInd, values } = args;
            

            values.forEach((v, i) => {
                const optionElement = document.createElement("option");
                optionElement.value = v;
                optionElement.innerHTML = v;

                if( i === selectedInd ) { optionElement.selected = true; }

                selectElement.appendChild(optionElement);
            });

            formElement.appendChild(selectElement);
        },

        'form' : (args) => {
            /* after tag_list component is made */
        },

        'hr' : (args) => {
            const l = document.createElement("hr");

            formElement.appendChild(l);
        }
    },

    makeForm : function(formData)  {
        formData.forEach(data => {
            this.makeElementOfType[data.type](data);
        });
    },

    //<input type="checkbox" name="chk_info" value="HTML">HTML
    addCheckBoxWithText : (args) => {
        const 
            div = document.createElement('div'),
            sp = document.createElement('span'),
            chk = document.createElement('input'),
            { checkboxPos, text, underlined, nameAndId, disabled } = args;

        chk.type = "checkbox";
        chk.name = nameAndId;
        chk.id = nameAndId;
        chk.value = text;
        chk.innerHTML = text;
        chk.disabled = disabled;

        sp.innerHTML = text;
        if( underlined )
        sp.style = underlined ? "text-decoration: underline;" : "";

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

        formElement.appendChild(div);

        const pos = checkboxPos || right;
        checkboxPosAdjusting[pos]();
    },
};

export default Form;