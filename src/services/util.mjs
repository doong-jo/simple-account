const Util = {
    parseURL: () => {
        const url = location.pathname !== '/' ? 
            location.pathname.slice(0, -1) : '/';
        return url;
    }
};

export default Util;