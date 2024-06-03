<template>
  <div>
    <h1>University List {{ paginated.length }} / {{ data.length }}</h1>
    <h4 v-if="searchText.trim() !== ''">Results for <span class="underline">{{ searchText }}</span></h4>
    <h4 v-else><span>Search</span> to filter the list.</h4>
    <h4 class="text-xs">Server Side Date: {{ data?.datetime }}</h4>
    <ClientOnly>
      <h4 class="text-xs">Client Side Date: {{ new Date().toUTCString() }}</h4>
    </ClientOnly>
    <!-- <VirtualScroller
      :items="paginated"
      :itemSize="50"
      style="height: 75vh"
    >
      <template v-slot:item="{ item, options }">
        <Card class="m-2 h-4rem">
          <template #title>
            {{ options.index + 1 }}. <NuxtLink :to="`${route.path}/${item.encodedName}`">{{ `${item.name}, ${item.country}`
              }}</NuxtLink>
          </template>
</Card>
</template>
</VirtualScroller> -->
    <RecycleScroller
      class="scroller"
      :items="data.items"
      :item-size="50"
      :prerender="1000"
      key-field="name"
      v-slot="{ item }"
    >
      <div class="user">
        <NuxtLink :to="`${route.path}/${encodeURIComponent(item.name)}`">{{ `${item.name}, ${item.country}`
              }}</NuxtLink>
      </div>
    </RecycleScroller>
  </div>
</template>

<script setup lang="ts">
import { RecycleScroller } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

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
const paginated = computed(() => {
  let mappedFilter = filtered.value.map(x => ({ ...x, encodedName: encodeURIComponent(x.name) }))
  return mappedFilter.slice(0, 50);
})
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