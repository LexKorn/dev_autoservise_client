import { IActivity, IAutopart } from "../types/types";

export const convertNumToStr = (num: number) => {
    return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export const convertStrToNum = (str: string) => {
    return Number(str.replace(/\s+/g, ''));
};

export const calcSum = (arr: (IActivity | IAutopart)[]) => {
    const result = arr.reduce((sum, current) => {
        return sum += current.price;
    }, 0);
    return result;
};

// export const textDate = (date: string) => {
//     return new Date(date).toUTCString().substring(5, 17);
// };

export const textDate = (date: string): string => {
    const str = new Date(date).toUTCString().substring(5, 17);
    let ruStr: string;

    ruStr = str.replace(/Jan/g, 'Янв').replace(/Feb/g, 'Фев').replace(/Mar/g, 'Мар').replace(/Apr/g, 'Апр').replace(/May/g, 'Мая').replace(/Jun/g, 'Июн').replace(/Jul/g, 'Июл').replace(/Aug/g, 'Авг').replace(/Sep/g, 'Сен').replace(/Oct/g, 'Окт').replace(/Nov/g, 'Ноя').replace(/Dec/g, 'Дек');

    return ruStr;
};

export const trimString = (str: string): string => {
    let newStr: string = str;

    if (str.length > 30) {
        newStr = str.substring(0, 30) + '...';
    }

    return newStr;
};