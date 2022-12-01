<script setup>
import MiniatureVue from './MiniatureComponent.vue';
const props = defineProps({
  videoList: Array,
})

</script>

<template>
  <main>
    <MiniatureVue 
      v-for="(data, index) in props.videoList" 
      :key="index + '-' + data.video.id"
      :video="data.video" 
      @delete="$emit('delete', data.id)"
    />
  </main>
</template>

<style scoped>
main{
  max-width: 928px;
  margin: 0px auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(264px, 1fr));
  justify-items: center;
  column-gap: 68px;
  row-gap: 87px;
}

@media (max-width: 700px){
  main{
    width: 90%;
  }
}
</style>