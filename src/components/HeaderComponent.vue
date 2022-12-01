<script setup>
import { ref } from 'vue';


const emit = defineEmits({
  saveVideos: (items) => {
    if(items.length){
      return items
    }
    throw 404 
  },
  error: (message) => message
})
const url = ref('')
const key = 'AIzaSyBmLLu8YlvN9ZhoHIII2VIOANa2ss5kgPA'
const express = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w-]+\?v=|embed\/|v\/)?)([\w-]+)(\S+)?$/
const endpoint = new URL("https://www.googleapis.com/youtube/v3/videos");

function searchVideo(){
  try{
    if(!express.test(url.value)){
      throw 400
    }
    const search = (new URL(url.value)).search
    const id = search.split('?v=').pop()
    endpoint.search = new URLSearchParams({
      id,
      key,
      part: "snippet",
 
    }).toString();
    fetch(endpoint)
    .then(response => response.json())
    .then(videoData => emit('saveVideos', videoData.items))
    .catch(error => {
      if( error === 404) emit('error', 'Video no encontrado')
    })
  }
  catch(error){
    if(!url.value.length){
      emit('error', 'Ingresa una URL')
    }
    else{
      if(error === 400){
        emit('error', 'Url invalida')
      }
      if(typeof error === 'object' && error?.message.includes('Invalid URL') && url.value.length){
        emit('error', 'Url invalida')
      }
    }
  }
  finally{
    url.value = ''
  }
}
</script>

<template>
  <header>
    <h1>Añadir nuevo video</h1>
    <div>
      <input type="text" name="url" v-model="url" placeholder="Añadir"/>
      <button @click="searchVideo">Añadir</button>
    </div>
  </header>
</template>

<style scoped>
h1{
  font-size: 28px;
  font-weight: 500;
}
header{
  width: 1076px;
  margin: 120px auto 134px auto;
}
div{
  display: flex;
  position: relative;
}
input{
  width: 76.5%;
  height: 53px;
  border-radius: 5px 0px 0px 5px;
  padding-left: 23px;
  border-right: none;
  border: 1px solid rgba(0, 0, 0, 0.3);
}
input:focus{
    outline: none;
}
button{
  width: 23.5%;
  height: 57px;
  border-radius: 0px 10px 10px 0px;
  border: none;
  color: white;
  background-color: #136AE4;
  font-weight: 700;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.2), 0px 1px 4px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.14);
}
button:hover{
  cursor: pointer;
}

@media (max-width: 1090px){
  header{
    width: 90%;
    margin: 50px auto;
  }
}
</style>