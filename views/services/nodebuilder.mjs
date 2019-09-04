const NodeBuilder = {
    appendCSS: (name) => {
        const link = document.createElement('link');
        link.id = name;
        link.href = `public/css/${name}.css`;
        link.type = 'text/css';
        link.rel = 'stylesheet';

        document.getElementsByTagName('head')[0].appendChild(link);
    },

    removeCSS: (id) => {
        document.querySelector(`link[id=${id}]`).remove();
    },

    disalbeCSS: (id) => {
        document.querySelector(`link[id=${id}]`).disabled = true;
    },

    enableCSS: (id) => {
        document.querySelector(`link[id=${id}]`).disabled = false;
    },


    removeChildren(parent, cond = () => true) {
        const { children } = parent;

        for (let i = children.length - 1; i >= 0; i -= 1) {
            if (cond(children[i])) { parent.removeChild(children[i]); }
        }
    },

    makeInput: (args) => {
        const i = document.createElement('input');
        const {
            inputType, nameAndId, placeholder,
            value, disabled, maxLength,
        } = args;

        i.type = inputType;
        i.name = nameAndId;
        i.id = nameAndId;
        if (maxLength) { i.maxLength = maxLength; }

        if (inputType !== 'checkbox') {
            i.placeholder = placeholder || '';
        } else {
            i.value = value;
            i.disabled = disabled;
        }

        return i;
    },

    makeLabel: (args) => {
        const l = document.createElement('label');

        l.htmlFor = args.for;
        l.innerHTML = args.innerHTML;

        return l;
    },

    makeSelectAndOption: (args) => {
        const s = document.createElement('select');
        const { selectedInd, values, nameAndId } = args;

        s.id = nameAndId;
        s.name = nameAndId;
        values.forEach((v, i) => {
            const o = document.createElement('option');
            o.value = v;
            o.innerHTML = v;

            if (i === selectedInd) { o.selected = true; }

            s.appendChild(o);
        });

        return s;
    },

    makeButton: (args) => {
        const btn = document.createElement('button');
        const {
            text, doAction, className,
            disabled, attrType,
        } = args;

        btn.type = attrType;
        btn.innerHTML = text;
        btn.onclick = doAction;
        btn.className = className || '';
        btn.disabled = disabled;

        return btn;
    },

    makeElementByType() {
        return {
            input: this.makeInput,
            label: this.makeLabel,
            select: this.makeSelectAndOption,
            checkbox: this.makeInput,
            button: this.makeButton,
        };
    },

    makeOptionsOfSelect(s, options) {
        this.removeChildren(s);

        Object.values(options).forEach((v) => {
            const opt = document.createElement('option');
            opt.value = v;
            opt.innerHTML = v;

            s.appendChild(opt);
        });
    },

    makeSpan(args) {
        const sp = document.createElement('span');
        const {
            className, innerHTML, onclick,
            textClassName, textOnClick, text,
            underlined,
        } = args;
        const underlineStyle = 'text-decoration: underline; text-underline-position: under;';
        sp.className = textClassName || className;
        sp.innerHTML = text || innerHTML;
        sp.onclick = textOnClick || onclick;
        sp.style = underlined ? underlineStyle : '';

        return sp;
    },

    makeSpanValidator(args, parentElem) {
        const sp = NodeBuilder.makeSpan({
            className: 'form-validator vertical-margin',
            innerHTML: '&nbsp;',
        });

        parentElem.insertAdjacentElement('afterend', sp);
        // eslint-disable-next-line no-param-reassign
        if (args.length) {
            args.forEach((v) => {
                v.spanValidator = sp;
            });
        } else {
            args.spanValidator = sp;
        }

        return sp;
    },
};

export default NodeBuilder;
