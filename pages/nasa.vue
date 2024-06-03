<template>
  <div>
    
  </div>
</template>

<script lang="ts" setup>
const response = await useAsyncData('projects', ()=>$fetch('https://api.spacexdata.com/v5/launches/latest'));

</script>

<style>

</style>