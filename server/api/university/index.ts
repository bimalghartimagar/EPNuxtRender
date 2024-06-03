export default defineEventHandler(async event => {
    const response: any[] | null =  await useStorage('assets:server').getItem(`universities.json`);
    await useStorage().setItem('university', response as object);
    return {
        datetime: null,
        items: response
    };
})