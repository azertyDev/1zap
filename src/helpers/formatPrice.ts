export const formatPrice = (val: string) => {
    let formated = '';

    for (let i = 0; i < val.length; i++) {
        if (i % 2 === 0) {
            formated += ' ';
            formated += val[i];
        } else {
            formated += val[i];
        }
    }

    return formated;
};
