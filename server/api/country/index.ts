export default defineEventHandler(async event => {
    // const keys = await useStorage().getKeys();
    // if(keys.includes('country')){
    //     let datetime = new Date().toUTCString();
    //     // await sleep(5000);
    //     let items = await useStorage().getItem('country')
    //     return {
    //         datetime,
    //         items
    //     };
    // }
    const response: any[] | null = await useStorage('dataFileSystem').getItem(`countries.json`);
    await useStorage().setItem('country', response as object);
    let datetime = new Date().toUTCString();
    return {
        datetime,
        items: response
    };
})

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
