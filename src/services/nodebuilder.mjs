const NodeBuilder = {
    appendCSS: (name) => {
        const link = document.createElement( "link" );
        link.href = 'public/css/' + name + '.css';
        link.type = "text/css";
        link.rel = "stylesheet";

        document.getElementsByTagName("head")[0].appendChild( link );
    },

    disalbeCSS: (title) => {
        document.querySelector(`link[title=${title}]`).disabled = true;
    },

    enableCSS: (title) => {
        document.querySelector(`link[title=${title}]`).disabled = false;
    },

    removeChildren(parent, cond = () => { return true; }) {
        const { children } = parent;

        for(let i=children.length - 1; i >= 0; i--) {
            if( cond(children[i]) ) { parent.removeChild(children[i]);  }
        }
    },

    makeInput: (args) => {
        const 
            i = document.createElement("input"),
            { inputType, nameAndId, placeholder,
                value, disabled, maxLength } = args;
    
        i.type = inputType;
        i.name = i.id = nameAndId;
        if( maxLength ) { i.maxLength = maxLength; }
        
        if (inputType !== 'checkbox') { i.placeholder = placeholder; } 
        else {
            i.value = value;
            i.disabled = disabled;
        }
    
        return i;
    },

    makeLabel: (args) => {
        const l = document.createElement("label");

        l.htmlFor = args.for;
        l.innerHTML = args.innerHTML;

        return l;
    },

    makeSelectAndOption: (args) => {
        const 
            s = document.createElement("select"),
            { selectedInd, values, nameAndId } = args;

        s.id = s.name = nameAndId;

        values.forEach((v, i) => {
            const o = document.createElement("option");
            o.value = o.innerHTML = v;

            if( i === selectedInd ) { o.selected = true; }

            s.appendChild(o);
        });

        return s;
    },

    makeButton: (args) => {
        const
            btn = document.createElement('button'),
            { text, doAction, className, disabled, attrType } = args;

        btn.type = attrType;
        btn.innerHTML = text;
        btn.onclick = doAction;
        btn.className = className || "";
        btn.disabled = disabled;

        return btn;
    },

    makeElementByType: function() {
        return {
            'input' : this.makeInput,
            'label' : this.makeLabel,
            'select' : this.makeSelectAndOption,
            'checkbox' : this.makeInput,
            'button' : this.makeButton,
        }
    },

    makeOptionsOfSelect: function(s, values) {
        this.removeChildren(s);
        
        for(const value of values) {
            const opt = document.createElement('option');
            opt.value = opt.innerHTML = value;
            
            s.appendChild(opt);
        }
    },

    makeSpan: function(args) {
        const 
            sp = document.createElement('span'), 
            { 
                className, innerHTML, onclick, 
                textClassName, textOnClick, text,
                underlined
            } = args;
        sp.className = textClassName || className;
        sp.innerHTML = text || innerHTML;
        sp.onclick = textOnClick || onclick;
        sp.style = underlined ? 
            'text-decoration: underline; text-underline-position: under;' : '';

        return sp;
    }
};

export default NodeBuilder;