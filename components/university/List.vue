<template>
  <div>
    <h1>University List  {{ data?.items.length }}</h1>
    <h4 v-if="searchText.trim() !== ''">Results for <span class="underline">{{ searchText }}</span> {{filtered.length}}</h4>
    <h4 v-else><span>Search</span> to filter the list.</h4>
    <h4 class="text-xs">Server Side Date: {{ data?.datetime }}</h4>
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
            {{ (currentPage*pageItems) + index + 1 }}. <NuxtLink :to="`${route.path}/${item.encodedName}`">{{ `${item.name}, ${item.country}`
              }}</NuxtLink>
          </template>
        </Card>
      </TransitionGroup>
    <Paginator :rows="pageItems" :totalRecords="filtered.length" :rowsPerPageOptions="[10, 20, 30]"
    @page="updatePage"></Paginator>
  </div>
</template>

<script setup lang="ts">
import type { PageState } from 'primevue/paginator';

const nuxtApp = useNuxtApp();
const searchText = useSearchText();
const route = useRoute();

const { data } = await useAsyncData('universities',
  () => $fetch('/api/university'), {
  getCachedData(key) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
  }
})

const filtered = computed(() => {

  if (searchText.value.trim() === "") return data.value.items;
  return data.value.items.filter(x =>
    x.name.toLowerCase().indexOf(searchText.value.toLowerCase()) > -1
    || x.country.toLowerCase().indexOf(searchText.value.toLowerCase()) > -1);
})
const currentPage = ref(0)
const pageItems = ref(10);
const totalItems = computed(()=>{
  if(data.value){
    return data.value.items.length;
  }
  return 0;
});
const paginated = computed(() => {
  let mappedFilter = filtered.value.map(x => ({ ...x, encodedName: encodeURIComponent(x.name) }))
  return mappedFilter.slice(currentPage.value*pageItems.value, (currentPage.value*pageItems.value)+pageItems.value);
})
const updatePage = (pageState: PageState) => {
  console.log(pageState)
  currentPage.value = pageState.page;
}
</script>

<style>
.scroller {
  height: 625px;
}

.user {
  height: 25px;
  padding: 0 12px;
  display: flex;
  align-items: center;
}
</style>