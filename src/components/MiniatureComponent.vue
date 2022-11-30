<script setup>
import ModalVue  from './ModalComponent.vue'
import { ref, computed} from "vue";

const prop = defineProps({
  video: Object,
})
const key = 'AIzaSyBmLLu8YlvN9ZhoHIII2VIOANa2ss5kgPA'
const durationVideo = ref('')
const url = new URL("https://www.googleapis.com/youtube/v3/videos");
const showDelete = ref(false)
const showVideoInfo = ref(false)

url.search = new URLSearchParams({
  id: prop.video.id,
  key,
  part: "contentDetails",
}).toString();
fetch(url)
  .then(response => response.json())
  .then(({items}) => items[0].contentDetails)
  .then(({duration}) => durationVideo.value = duration)

const durationFormat = computed(() => {
  const duration = { hours: 0, minutes: 0, seconds: 0 };
  const durationParts = durationVideo.value
    .replace("PT", "")
    .replace("H", ":")
    .replace("M", ":")
    .replace("S", "")
    .split(":");

  if (durationParts.length === 3) {
    duration["hours"] = durationParts[0];
    duration["minutes"] = durationParts[1];
    duration["seconds"] = durationParts[2];
  }

  if (durationParts.length === 2) {
    duration["minutes"] = durationParts[0];
    duration["seconds"] = durationParts[1];
  }

  if (durationParts.length === 1) {
    duration["seconds"] = durationParts[0];
  }

  return duration.hours && duration.minutes
  ? `${duration.hours}:${duration.minutes}:${duration.seconds}`
  : `${duration.minutes}:${duration.seconds}`
})

</script>

<template>
  <div class="video-container">
      <img @click="showVideoInfo = true" :src="prop.video.snippet.thumbnails.medium.url" :alt="prop.video.title">
      <span @click="showVideoInfo = true" class="time" v-show="durationVideo">{{durationFormat}}</span>
      <span class="delete"  @click="showDelete = true" >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="2" fill="#F5F5F5"/>
          <path d="M2 24C1.41667 24 0.9375 23.8125 0.5625 23.4375C0.1875 23.0625 0 22.5833 0 22V2C0 1.41667 0.1875 0.9375 0.5625 0.5625C0.9375 0.1875 1.41667 0 2 0H22C22.5833 0 23.0625 0.1875 23.4375 0.5625C23.8125 0.9375 24 1.41667 24 2V22C24 22.5833 23.8125 23.0625 23.4375 23.4375C23.0625 23.8125 22.5833 24 22 24H2ZM12 14L16 18L18 16L14 12L18 8L16 6L12 10L8 6L6 8L10 12L6 16L8 18L12 14Z" fill="rgb(0,0,0, 0.75)"/>
        </svg>
      </span>
      <ModalVue v-show="showDelete" @close-modal="showDelete = false">
        <div class="delete-modal">
          <h2>¿Seguro que quieres eliminar este video?</h2>
          <div class="buttons">
            <button class="button-cancel" @click="showDelete = false">Cancelar</button>
            <button class="button-delete" @click="$emit('delete')">Eliminar</button>
          </div>
        </div>
      </ModalVue>
      <ModalVue v-show="showVideoInfo" @close-modal="showVideoInfo = false">
        <div class="video-info">
          <iframe 
            :src="`https://www.youtube.com/embed/${prop.video.id}`" 
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
          </iframe>
          <section>
            <h2>{{prop.video.snippet.title}}</h2>
            <p>{{prop.video.snippet.description}}</p>
          </section>
        </div>
      </ModalVue>
  </div>
</template>

<style scoped>
.video-container{
  width: 264px;
  height: 150px;
  position: relative;
  display: inline-block;
}
img{
  width: 100%;
  height: 100%;
}
span{
  position: absolute;
  right: 6px;
  background-color: rgb(0,0,0, 0.75);
  color: white;
  text-align: center;
  border-radius: 2px;
}
.time{
  bottom: 6px;
  min-width: 48px;
  height: 18px;
  padding: 0px 2px;
}
.delete-modal{
  height: 227px;
  width: 900px;
}
.delete{
  height: 24px;
  top: 6px;
}
h2{
  color: #3C3E41;
  font-weight: 500;
  margin-top: 0px;
  margin-bottom: 0px;
  margin-left: 90px;
  padding-top: 50px;
}
.buttons{
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  margin-top: 45px;
}
.buttons button{
  width: 250px;
  height: 57px;
  filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.2)) drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.12)) drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.14));
  border-radius: 10px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
}
.button-cancel{
  border: 1px solid #136AE4;
  color: #136AE4;
  background-color: white;
}
.button-delete{
  margin-right: 60px;
  margin-left: 29px;
  background-color: #136AE4;
  color: white;
  border: none;
}
.video-info{
  width: 1096px;
  height: 438px;
  display: flex;
  justify-content: center;
  align-items: center;
}
section{
  width: 551px;
  height: 70%;
  overflow: auto;
}
section h2, section p{
  margin-left: 18px;
  margin-top: 0px;
  width: 468px;
  color: #3C3E41;
  padding: 0px;
}
section p{
  font-size: 21px;
  font-weight: 400;
}
iframe{
  width: 492px;
  height: 308px;
}
@media (max-width: 1090px){
  h2{
    margin: 0px;
    text-align: center;
    padding-top: 74px;
  }
  .buttons{ 
    justify-content: center;
    flex-direction: column;
  }
  .button-delete{
    margin-right: 0px;
    margin-left: 0px;
    margin-top: 8px;
    margin-bottom: 16px;
  }
  .delete-modal{
    width: auto;
    height: auto;
  }
  .video-info{
    flex-direction: column;
  }
  .video-info, section{
    width: 100%;
    height: auto;
  }
  iframe{
    margin-top: 18px;
    margin-bottom: 18px;
  }
  section{
    overflow: inherit;
  }
  section h2, section p{
    overflow: auto;
    width: 80%;
    margin: 0px auto;
  }
  section h2{
    padding: 0px;
    margin-bottom: 16px;
  }
  section p{
    height: 200px;
  }
  iframe{
    width: 90%;
  }
}
</style>