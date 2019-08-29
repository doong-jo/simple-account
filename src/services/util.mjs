const Util = {
    parseURL: () => {
        const url = location.pathname || '/';
        return url;
    },

    appendCSS: (name) => {
        var link = document.createElement( "link" );
        link.href = 'public/css/' + name + '.css';
        link.type = "text/css";
        link.rel = "stylesheet";

        document.getElementsByTagName("head")[0].appendChild( link );
    }
};

export default Util;