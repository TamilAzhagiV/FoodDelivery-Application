const safeParse = (value) => {

    if (!value) {
        return value;
    }

    if (typeof value === "string") {
        try {
            return JSON.parse(value);
        } catch (error) {
            return value;
        }
    }

    return value;
};

module.exports = safeParse;