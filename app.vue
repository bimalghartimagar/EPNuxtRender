<template>
  <div>
    <Menubar :model="items">
      <template #item="{ item, props, hasSubmenu, label }">
        <NuxtLink
          :to="item.to"
          class="p-menuitem-link"
        >
          {{ label }}
          <Icon
            v-if="hasSubmenu"
            name="flowbite:angle-down-outline"
            class="ml-1"
          />
        </NuxtLink>
      </template>
      <template #end>
        <div class="flex gap-4">
          <InputText
            v-if="hideSearchBox"
            :placeholder="`Search ${String(route?.name)}`"
            type="text"
            class="w-8rem sm:w-auto"
            v-model="searchText"
            ref="searchRef"
          />
          <Avatar shape="circle">
            <Icon name="material-symbols:person" />
          </Avatar>
        </div>
      </template>
    </Menubar>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const route = useRoute()
const searchText = useSearchText();
// const searchRef = useSearchRef();
const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    to: "/"
  },
  {
    label: 'Prerender Countries',
    icon: 'pi pi-star',
    to: "/prerender/country"
  },
  {
    label: 'Prerender Universities',
    icon: 'pi pi-envelope',
    to: "/prerender/university"
  },

  {
    label: 'SWR Countries',
    icon: 'pi pi-star',
    to: "/swr/country"
  },
  {
    label: 'SWR Universities',
    icon: 'pi pi-envelope',
    to: "/swr/university"
  },

  {
    label: 'ISR Countries',
    icon: 'pi pi-star',
    to: "/isr/country"
  },
  {
    label: 'ISRUniversities',
    icon: 'pi pi-envelope',
    to: "/isr/university"
  },

  {
    label: 'CSR Countries',
    icon: 'pi pi-star',
    to: "/country"
  },
  {
    label: 'CSR Universities',
    icon: 'pi pi-envelope',
    to: "/university"
  }
]);
const hideSearchBox = computed(() => ["/university", "/country"].includes(route.path))
</script>

<style>
@import url("primevue/resources/themes/aura-dark-amber/theme.css");
@import url("primeflex/primeflex.css");

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(0.5rem);
}
</style>
