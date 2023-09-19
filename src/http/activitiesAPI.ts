import { $authHost } from ".";

export const createActivity = async (name: string, price: number, orderId: number) => {
    const {data} = await $authHost.post('api/activities', {name, price, orderId});
    return data;
};

export const fetchActivities = async () => {
    const {data} = await $authHost.get('api/activities');
    return data;
};

export const fetchOneActivity = async (id: number) => {
    const {data} = await $authHost.get('api/activities/' + id);
    return data;
};

export const updateActivity = async (id: number, name: string, price: number) => {
    const {data} = await $authHost.put('api/activities/' + id, {name, price});
    return data;
};

export const deleteActivity = async (id: number) => {
    const {data} = await $authHost.delete('api/activities/' + id);
    return data;
};