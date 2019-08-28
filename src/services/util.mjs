const Util = {
    parseURL: () => {
        const url = location.pathname || '/';
        return url;
    }
};

export default Util;