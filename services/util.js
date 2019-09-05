const Util = {
    parseJSON(val) {
        try {
            return JSON.parse(val);
        } catch(e) {
            return val;
        }
    },
};

module.exports = Util;
