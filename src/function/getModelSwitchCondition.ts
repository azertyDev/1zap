export const getModelSwitchCondition = (val: { $: { name: string } }) => {
    switch (val.$.name) {
        case 'Модель':
            return val;
        case 'Серия':
            return val;
        case 'Vehicle family':
            return val;
        case 'Семейство':
            return val;
        case 'Торговое обозначение':
            return val;
        case 'Vehicle name':
            return val;
        case 'Model':
            return val;
    }
};
