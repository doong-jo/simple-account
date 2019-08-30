const NodeBuilder = {
    appendCSS: (name) => {
        var link = document.createElement( "link" );
        link.href = 'public/css/' + name + '.css';
        link.type = "text/css";
        link.rel = "stylesheet";

        document.getElementsByTagName("head")[0].appendChild( link );
    },

    makeInput: (args) => {
        const 
            i = document.createElement("input"),
            { inputType, nameAndId, placeholder, value, disabled } = args;
    
        i.type = inputType;
        i.name = nameAndId;
        i.id = nameAndId;

        if (inputType !== 'checkbox') {
            i.placeholder = placeholder;
        } else {
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
            { selectedInd, values } = args;


        values.forEach((v, i) => {
            const o = document.createElement("option");
            o.value = v;
            o.innerHTML = v;

            if( i === selectedInd ) { o.selected = true; }

            s.appendChild(o);
        });

        return s;
    },

    makeButton: (args) => {
        const
            btn = document.createElement('button'),
            { text, doAction, className } = args;

        btn.innerHTML = text;
        btn.onclick = doAction;
        btn.className = className || "";

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
};

export default NodeBuilder;