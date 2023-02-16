<script>
export default {
  data() {
    return {
      // message: 'Hello World!'
    }
  }
}
</script>

<template>
  <div>
    <h1> Champions </h1>
    <input
    type = "text"
    name="chamption"
    v-model="email"
    placeholder="champion" />
    <button>Search</button>
  </div>
</template>

<style scoped>

</style>
