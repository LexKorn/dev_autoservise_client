import { $authHost } from ".";

export const createOrder = async (opened: string, closed: string, income: number, comment: string, autoId: number, masterId: number) => {
    const {data} = await $authHost.post('api/orders', {opened, closed, income, comment, autoId, masterId});
    return data;
};

export const fetchOrders = async () => {
    const {data} = await $authHost.get('api/orders');
    return data;
};

export const fetchOneOrder = async (id: string | undefined) => {
    const {data} = await $authHost.get('api/orders/' + id);
    return data;
};

export const updateOrder = async (id: number, opened: string, closed: string, income: number, comment: string, autoId: number, masterId: number) => {
    const {data} = await $authHost.put('api/orders/' + id, {opened, closed, income, comment, autoId, masterId});
    return data;
};

export const deleteOrder = async (id: number) => {
    const {data} = await $authHost.delete('api/orders/' + id);
    return data;
};