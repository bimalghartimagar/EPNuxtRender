export default defineEventHandler(async event => {
    // const keys = await useStorage().getKeys();
    // if(keys.includes('university')){
    //     let datetime = new Date().toUTCString();
    //     // await sleep(5000);
    //     let items = await useStorage().getItem('university')
    //     return {
    //         datetime,
    //         items
    //     };
    // }
    const response: any[] | null =  await useStorage('dataFileSystem').getItem(`universities.json`);
    await useStorage().setItem('university', response as object);
    let datetime = new Date().toUTCString();
    return {
        datetime,
        items: response
    };
})