<template>
  <div>
    <data-list :payload="listOfPayload" class="my-3 pa-3"/>
  </div>
</template>

<script>
import DataList from '../components/DataList.vue'
export default {
  data () {
    return {
      listOfPayload: []
    }
  },
  components: {
    'data-list': DataList
  }
}
</script>

<style>

</style>