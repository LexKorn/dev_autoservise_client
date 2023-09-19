import { $authHost } from ".";

export const createAutopart = async (name: string, price: number, orderId: number) => {
    const {data} = await $authHost.post('api/autoparts', {name, price, orderId});
    return data;
};

export const fetchAutoparts = async () => {
    const {data} = await $authHost.get('api/autoparts');
    return data;
};

export const fetchOneAutopart = async (id: number) => {
    const {data} = await $authHost.get('api/autoparts/' + id);
    return data;
};

export const updateAutopart = async (id: number, name: string, price: number) => {
    const {data} = await $authHost.put('api/autoparts/' + id, {name, price});
    return data;
};

export const deleteAutopart = async (id: number) => {
    const {data} = await $authHost.delete('api/autoparts/' + id);
    return data;
};