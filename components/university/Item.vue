<template>
    <div v-if="university">

        <h4 class="text-xs">Server Side Date: {{ generatedDateTime }}</h4>
        <ClientOnly>
            <h4 class="text-xs">Client Side Date: {{ new Date().toUTCString() }}</h4>
        </ClientOnly>
        <div class="flex flex-wrap align-items-center gap-4 mt-4 sm:px-1 md:px-5 w-full justify-content-center">

            <CustomCard>
                <template #title>Name</template>
                <template #content>
                    <span class="text-5xl">{{ university.item?.name }}</span>
                </template>
            </CustomCard>

            <CustomCard>
                <template #title>Country</template>
                <template #content>
                    <span class="text-5xl">{{ university.item?.country }}</span>
                </template>
            </CustomCard>

            <CustomCard>
                <template #title>State/Province</template>
                <template #content>
                    <span class="text-5xl">{{ university.item?.stateProvince }}</span>
                </template>
            </CustomCard>

            <CustomCard>
                <template #title>Web Pages</template>
                <template #content>
                    <a
                        v-for="webpage in university.item?.web_pages"
                        :href="webpage"
                        target="_blank"
                        rel="noreferrer"
                    >{{ webpage }}</a>
                </template>
            </CustomCard>

        </div>
    </div>

</template>

<script lang="ts" setup>
const route = useRoute()
const nuxtApp = useNuxtApp();
const generatedDateTime = useState(()=> new Date().toUTCString())
const { data: university, refresh } = await useAsyncData(`universities-${route.params.name}`,
    () => $fetch(`/api/university/${route.params.name}`), {
    getCachedData(key) {
        return nuxtApp.payload.data[key] || nuxtApp.static.data[key] ||
            nuxtApp.payload.data['universities']?.items?.find(x => x.name === route.params.name);
    },
    transform(data){
        return data;
    }
})
const flagName = computed(() => {
    return university.value.item?.name?.replace(/\s/g, /-/g).toLowerCase();
})
</script>

<style></style>