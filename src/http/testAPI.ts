import { $authHost } from ".";

// export const createTest = async (test: FormData) => {
//     const {data} = await $authHost.post('api/test', test);
//     return data;
// };

export const createTest = async (name: string, phone: string, country: string) => {
    const {data} = await $authHost.post('api/test', {name, phone, country});
    return data;
};

export const fetchTests = async () => {
    const {data} = await $authHost.get('api/test');
    return data;
};

export const fetchOneTest = async (id: number) => {
    const {data} = await $authHost.get('api/test/' + id);
    return data;
};

export const updateTest = async (id: number, test: FormData) => {
    const {data} = await $authHost.put('api/test/' + id, test);
    return data;
};

export const deleteTest = async (id: number) => {
    const {data} = await $authHost.delete('api/test/' + id);
    return data;
};