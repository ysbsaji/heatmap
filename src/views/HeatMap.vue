<template>
  <div>
    <v-row class="pa-2">
      <v-col cols="12" md="3">
        <v-select
          outlined
          dense
          hide-details
          v-model="indexVal"
          :items="indexLists"
          label="Select an index"
          single-line
        ></v-select>
      </v-col>
      <v-col cols="12" md="3">
        <v-select
          outlined
          dense
          hide-details
          :disabled="indexVal ? (indexVal === 'Select' ? true : false) : true"
          :items="topicLists"
          v-model="selectedTopic"
          label="Select topic"
          persistent-hint
          single-line
        ></v-select>
      </v-col>
    </v-row>
    <data-list :payload="listOfPayload" class="my-3 pa-3" :key="reRender">
    </data-list>

  </div>
</template>

<script>
import DataList from '../components/DataList.vue'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      reRender: 0,
      selectedTopic: null,
      indexVal: null,
      initialList: [
        { manager: 'manager1' },
        { manager: 'manager2' },
        { manager: 'manager3' },
        { manager: 'manager4' },
        { manager: 'manager5' }
      ],
      initialHearderList: [
        { text: 'manager', value: 'manager' },
        { text: 'Engagement', value: 'Engagement' },
        { text: 'Manager Satisfaction', value: 'Manager Satisfaction' },
        { text: 'Job Satisfaction', value: 'Job Satisfaction' }
      ],
      manager: ['manager1', 'manager2', 'manager3', 'manager4', 'manager5'],
      listOfPayload: {
        loading: false,
        list: [],
        headers: []
      },
      indexLists: ['Select', 'Engagement', 'Manager Satisfaction', 'Job Satisfaction'],
      topicLists: [],
      url: '09a1870d-294b-4d53-ac4f-87b676ddd000'
    }
  },
  components: {
    'data-list': DataList
  },
  computed: {
    ...mapGetters(['definitionsLists', 'dataLists'])
  },
  watch: {
    indexVal (val) {
      if (val !== 'Select') {
        this.topicLists = []
        this.listOfPayload.list = this.cloneVariable(this.initialList)
        this.listOfPayload.headers = []
        this.listOfPayload.headers.push({ text: 'manager', value: 'manager' })
        this.definitionsLists.filter(list => {
          if (list.index === this.indexVal) {
            this.topicLists.push(list.topic)
            this.listOfPayload.headers.push({ text: list.topic, value: list.topic })
          }
        })
        this.listOfPayload.headers.forEach(head => {
          this.dataLists.filter(data => {
            const index = this.manager.indexOf(data.manager)
          if (data.parameter === head.text) {
            this.listOfPayload.list[index][head.text] = this.listOfPayload.list[index][head.text] ? this.listOfPayload.list[index][head.text] : 0
            this.listOfPayload.list[index][head.text] += Number(data.score) 
          }
        })
      })
      this.getTheTotalCount()
      } else {
        this.topicLists = []
        this.constructTheData()
      }
    },
    selectedTopic () {
      this.listOfPayload.list = this.cloneVariable(this.initialList)
        this.listOfPayload.headers = []
        this.listOfPayload.headers.push({ text: 'manager', value: 'manager' })
        this.definitionsLists.filter(list => {
          if (list.topic === this.selectedTopic) {
            this.listOfPayload.headers.push({ text: list.subTopic, value: list.subTopic })
          }
        })
        this.listOfPayload.headers.forEach(head => {
          this.dataLists.filter(data => {
            const index = this.manager.indexOf(data.manager)
          if (data.parameter === head.text) {
            this.listOfPayload.list[index][head.text] = this.listOfPayload.list[index][head.text] ? this.listOfPayload.list[index][head.text] : 0
            this.listOfPayload.list[index][head.text] += Number(data.score) 
          }
        })
      })
      this.getTheTotalCount()
    }
  },
  mounted () {
    this.getDatalistHandler()
  },
  methods: {
    getDatalistHandler () {
      this.listOfPayload.loading = true
      this.$api.execute('get', this.url).then(response => {
        const modelData = this.cloneVariable(response.data)
        this.$store.commit('loadDefinitionslist', modelData.definitions)
        this.$store.commit('loadDatalist', modelData.data)
        this.constructTheData()
        this.listOfPayload.loading = false
      })
    },
    constructTheData () {
      this.listOfPayload.list = []
      this.listOfPayload.headers = this.cloneVariable(this.initialHearderList)
      this.listOfPayload.list = this.cloneVariable(this.initialList)
      this.listOfPayload.headers.forEach(head => {
        this.dataLists.filter(data => {
          const index = this.manager.indexOf(data.manager)
          if (data.parameter === head.text) {
            this.listOfPayload.list[index][head.text] = this.listOfPayload.list[index][head.text] ? this.listOfPayload.list[index][head.text] : 0
            this.listOfPayload.list[index][head.text] += Number(data.score) 
          }
        })
      })
      this.getTheTotalCount()
    },
    getTheTotalCount () {
      const totalObj = { manager: 'Aggegate' }
      this.listOfPayload.list.forEach(data => {
        const keys = Object.keys(data)
        keys.forEach(key => {
          if (!['manager'].includes(key)) {
            totalObj[key] = totalObj[key] ? totalObj[key] : 0
            totalObj[key] += data[key]
          }
        })
      })
      this.listOfPayload.list.push(totalObj)
    }
  }
}
</script>

<style>

</style>