<template>
  <div class="flex align-items-center gap-4 mt-4 flex-wrap sm:px-1 md:px-5 w-full justify-content-center">

    <CustomCard>
      <template #title>Name</template>
      <template #content>
        <span class="text-5xl">{{ country?.item?.name?.official }}</span>
      </template>
    </CustomCard>

    <CustomCard>
      <template #title>Flag</template>
      <template #content>
        <Icon
          :name="`twemoji:flag-${flagName}`"
          size="4em"
        />
      </template>
    </CustomCard>

    <CustomCard>
      <template #title>Region</template>
      <template #content>
        <span class="text-5xl">{{ country?.item?.region }}</span>
      </template>
    </CustomCard>

    <CustomCard>
      <template #title>Sub-Region</template>
      <template #content>
        <span class="text-5xl">{{ country?.item?.subregion }}</span>
      </template>
    </CustomCard>

    <CustomCard>
      <template #title>Maps</template>
      <template #content>
        <span class="text-5xl"><a
            :href="country?.item?.maps?.openStreetMaps"
            target="_blank"
            rel="noreferrer"
          >Open Street Maps</a></span>
      </template>
    </CustomCard>

  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const nuxtApp = useNuxtApp();
const { data: country } = await useAsyncData(`countries-${route.params.name}`,
  () => $fetch(`/api/country/${route.params.name}`), {
  getCachedData(key) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key] ||
      nuxtApp.payload.data['countries']?.items?.find(x => x.name === route.params.name);
  }
})
const flagName = computed(() => {
  return country.value?.item.name?.common.replace(/\s/g, /-/g).toLowerCase();
})
</script>

<style></style>