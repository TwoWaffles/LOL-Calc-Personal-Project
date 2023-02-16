<script>
export default {
  data() {
    return {
      message: 'Hello World!'
    }
  },

  props: ['test123']


}
</script>


<template>
  <div>
    <h1> Champions </h1>
    <input
    type = "text"
    name="chamption"
    :placeholder="test123" />
    <button>Search</button>
  </div>
</template>

<style scoped>

</style>
