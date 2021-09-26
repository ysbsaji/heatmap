export default {
  methods: {
    cloneVariable (data) {
      if (!data) return null
      return JSON.parse(JSON.stringify(data))
    }
  }
}