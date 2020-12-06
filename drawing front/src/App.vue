<template >
  <v-app>
    <v-content
      class="blue-grey darken-4"
      :style="{
        backgroundImage: 'url(' + require('@/assets/f.jpg') + ')',
        backgroundSize: 'cover',
      }"
    >
      <Canvas></Canvas>
    </v-content>
  </v-app>
</template>

<script>
import Canvas from "./components/Canvas.vue";

export default {
  name: "App",
  components: { Canvas },
};
</script>


