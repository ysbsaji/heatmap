<template>
  <div>
    <v-data-table
      :headers="payload.headers"
      :items="payload.list"
      :loading="payload.loading"
      class="elevation-1"
    >
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: ['payload'],
}
</script>

<style>

</style>