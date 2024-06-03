export default defineEventHandler(async event => {
    let name = getRouterParam(event, 'name')
    if(name == undefined) return {}
    
    name = decodeURIComponent(name);
    const response: any[] | null =  await useStorage('assets:server').getItem(`universities.json`);
    return {
        datetime: null,
        item: getUniversity(response as any[], name)
    };
})

function getUniversity(universities: any[], universityName: string|undefined){
    const university = universities.find(x=>x.name.toLocaleLowerCase() === universityName?.toLocaleLowerCase())
    return university === undefined ? {} : university;
}