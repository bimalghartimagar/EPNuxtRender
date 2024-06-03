export default defineEventHandler(async event => {
    const response: any[] | null = await useStorage('assets:server').getItem(`countries.json`);
    await useStorage().setItem('country', response as object);
    return {
        datetime: null,
        items: response
    };
})

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
