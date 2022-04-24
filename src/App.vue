<template>
  <cesiumContainer />
</template>

<script>
import cesiumContainer from "./components/cesiumContainer.vue";

export default {
  name: "App",
  components: {
    cesiumContainer,
  },
};
</script>

<style>
html,
body,
#app {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
