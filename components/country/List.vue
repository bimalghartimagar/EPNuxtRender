<template>
    <div>
      <h1>Country List {{ paginated?.length }} / {{ data.items?.length }}</h1>
      <h4 v-if="searchText.trim() !== ''">Results for <span class="underline">{{ searchText }}</span></h4>
      <h4 v-else>Search to filter the list.</h4>
      <h4 class="text-xs">Server Side Date: {{ generatedDateTime }}</h4>
      <ClientOnly>
        <h4 class="text-xs">Client Side Date: {{ new Date().toUTCString() }}</h4>
      </ClientOnly>
      <TransitionGroup
        name="list"
        :key="'list-group'"
      >
        <Card
          class="m-2 h-4rem"
          v-for="(item, index) in paginated"
          :key="index"
        >
          <template #title>
            {{ index + 1 }}. <NuxtLink :to="`${route.path}/${item.name.common}`">{{ item.name.common }}</NuxtLink>
          </template>
        </Card>
      </TransitionGroup>
  
    </div>
  </template>
  
  <script lang="ts" setup>
  const nuxtApp = useNuxtApp();
  const searchText = useSearchText();
  const route = useRoute();

  const generatedDateTime = useState(()=> new Date().toUTCString())

  const { data } = await useAsyncData('countries',
  () => $fetch('/api/country'), {
    getCachedData(key) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    }
  })
  const filtered = computed(() => {
    if (searchText.value.trim() === "") return data.value.items;

    return data.value.items.filter(x =>
      x.name.common.toLowerCase().indexOf(searchText.value.toLowerCase()) > -1
      || x.name.official.toLowerCase().indexOf(searchText.value.toLowerCase()) > -1);
  })
  const paginated = computed(() => {
    let mappedFilter = filtered.value.map(x=>({...x, encodedName: encodeURIComponent(x.name.common)}))
    return mappedFilter;
  })
  </script>
  
  <style>
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }
  
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
  </style>