<template>
  <v-app>
    <layout/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Layout from '../src/components/Layout.vue'
export default {
  name: 'App',

  data () {
    return {
      //
    }
  },
  components: {
    'layout': Layout
  }
};
</script>
