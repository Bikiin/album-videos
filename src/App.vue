<script setup>
import HeaderVue from './components/HeaderComponent.vue';
import BodyVue from './components/BodyComponent.vue';
</script>

<template>
  <div class="container">
    <HeaderVue />
    <BodyVue />
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

