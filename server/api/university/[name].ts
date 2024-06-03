export default defineEventHandler(async event => {
    let name = getRouterParam(event, 'name')
    
    if(name == undefined) return {}

    name = decodeURIComponent(name);
    // const keys = await useStorage().getKeys();

    // if(keys.includes('university')){
    //     const universities = await useStorage().getItem('university');
    //     return getUniversity(universities as any[], name);
    // }
    
    // const response = await $fetch('http://universities.hipolabs.com/search?name=');
    const response: any[] | null =  await useStorage('dataFileSystem').getItem(`universities.json`);
    // const northAmericas = ["Canada"]//, "Bermuda", "United States Minor Outlying Islands", "United States", "Greenland", "Saint Pierre and Miquelon", "Mexico"];
    // const filtered = response?.filter(x=>northAmericas.includes(x.country));
    
    // await useStorage().setItem('university', response as object);
    let datetime = new Date().toUTCString();
    return {
        datetime,
        item: getUniversity(response as any[], name)
    };
})

function getUniversity(universities: any[], universityName: string|undefined){
    const university = universities.find(x=>x.name.toLocaleLowerCase() === universityName?.toLocaleLowerCase())
    return university === undefined ? {} : university;
}