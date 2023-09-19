import { $authHost } from ".";

export const createMaster = async (master: string) => {
    const {data} = await $authHost.post('api/masters', {master});
    return data;
};

export const fetchMasters = async () => {
    const {data} = await $authHost.get('api/masters');
    return data;
};

export const fetchOneMaster = async (id: number) => {
    const {data} = await $authHost.get('api/masters/' + id);
    return data;
};

export const updateMaster = async (id: number, master: string) => {
    const {data} = await $authHost.put('api/masters/' + id, {master});
    return data;
};

export const deleteMaster = async (master: string) => {
    const {data} = await $authHost.delete('api/masters/' + master);
    return data;
};