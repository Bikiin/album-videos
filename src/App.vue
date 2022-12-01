<script setup>
import HeaderVue from './components/HeaderComponent.vue';
import BodyVue from './components/BodyComponent.vue';
import { ref } from 'vue';
import { saveVideo, onGetVideos, deleteVideo } from './utils/firebase.js'
import { createToast } from './utils/toast'

const toast = ref(null)
const videoList = ref([])

onGetVideos((querySnapshot) => {
  videoList.value = []
  querySnapshot.forEach( doc => videoList.value.unshift({video: doc.data(), id: doc.id}))
})

function saveVideos(videos){
  videos.forEach(video => 
    saveVideo(video)
    .then(()=> createToast('Se subio el video', 'succes', toast.value))
  )
}

function showDeleteMessage(id){
  deleteVideo(id).then(()=> createToast('Se elimino el video', 'succes', toast.value))
}

function showError(message){
  createToast(message, 'error', toast.value)
}
</script>

<template>
  <div class="container">
    <HeaderVue @saveVideos="saveVideos" @error="showError" />
    <BodyVue :videoList="videoList" @delete="showDeleteMessage" />
    <div ref="toast" id="toasts"></div>
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
#toasts{
  position: fixed;
  bottom: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.toast{
  width: 300px;
  height: 70px;
  border-radius: 5px;
  margin: 0.5rem;
  color: #ffffff;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row-reverse;
}
.succes{
  background-color: #4caf50;
}
.error{
  background-color: #ff5252;
}
</style>

