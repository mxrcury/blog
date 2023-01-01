export const parseCamelCase = (text) => {
    return text
        .split("")
        .map((t, i) => {
            if (i === 0) {
                return t.toUpperCase();
            }
            if (isUpperCase(t)) {
                return ` ${t}`;
            } else {
                return t;
            }
        })
        .join("");
};

const isUpperCase = (text) => {
    return text.toUpperCase() === text;
};
