export default defineEventHandler(async event => {
    let name = getRouterParam(event, 'name')
    
    if(name == undefined) return {}

    name = decodeURIComponent(name);
    // const keys = await useStorage().getKeys();

    // if(keys.includes('country')){
    //     const countries = await useStorage().getItem('country');
    //     return getCountry(countries as any[], name);
    // }
    
    // const response = await $fetch('https://restcountries.com/v3.1/all');
    const response: any[] | null = await useStorage('dataFileSystem').getItem(`countries.json`);
    // const filtered = response?.filter(x=>x.subregion === "North America");
    // await useStorage().setItem('country', response as object);
    // return getCountry(response as any[], name);
    let datetime = new Date().toUTCString();
    return {
        datetime,
        item: getCountry(response as any[], name)
    };
})

function getCountry(countries: any[], countryName: string|undefined){
    const country = countries.find(x=>x.name.common.toLocaleLowerCase() === countryName?.toLocaleLowerCase())
    return country === undefined ? {} : country;
}