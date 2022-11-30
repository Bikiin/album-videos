<script setup>
import HeaderVue from './components/HeaderComponent.vue';
import BodyVue from './components/BodyComponent.vue';
import { ref } from 'vue';

const videoList = ref([])

function saveVideos(videos){
  videoList.value = [...videos,...videoList.value]
}
function deleteVideo(index, videoId){
  videoList.value.splice(index, 1)
  console.log(videoId)
}
</script>

<template>
  <div class="container">
    <HeaderVue @saveVideos="saveVideos" />
    <BodyVue :videoList="videoList" @delete="deleteVideo" />
  </div>
</template>

<style>
html, body, .container{
  min-height: 100%;
  width: 100%;
  margin: 0px;
  background-color: #F5F5F5;
  font-family: 'Roboto', sans-serif;
}
</style>

