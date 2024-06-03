export default defineEventHandler(async event => {
    let name = getRouterParam(event, 'name')
    
    if(name == undefined) return {}

    name = decodeURIComponent(name);
    const response: any[] | null = await useStorage('assets:server').getItem(`countries.json`);
    return {
        datetime: null,
        item: getCountry(response as any[], name)
    };
})

function getCountry(countries: any[], countryName: string|undefined){
    const country = countries.find(x=>x.name.common.toLocaleLowerCase() === countryName?.toLocaleLowerCase())
    return country === undefined ? {} : country;
}