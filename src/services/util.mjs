const Util = {
    getURLPath: () => {
        const url = location.pathname || '/';
        return url;
    },
};

export default Util;