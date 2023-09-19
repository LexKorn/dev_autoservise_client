import { $authHost } from ".";

export const createStamp = async (stamp: string) => {
    const {data} = await $authHost.post('api/stamps', {stamp});
    return data;
};

export const fetchStamps = async () => {
    const {data} = await $authHost.get('api/stamps');
    return data;
};

export const fetchOneStamp = async (id: number) => {
    const {data} = await $authHost.get('api/stamps/' + id);
    return data;
};

export const updateStamp = async (id: number, stamp: string) => {
    const {data} = await $authHost.put('api/stamps/' + id, {stamp});
    return data;
};

export const deleteStamp = async (stamp: string) => {
    const {data} = await $authHost.delete('api/stamps/' + stamp);
    return data;
};