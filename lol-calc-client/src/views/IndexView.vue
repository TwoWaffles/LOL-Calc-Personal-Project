<script>
import Test from '../components/Test.vue';

export default {
  data() {
    return {
      message: 'Hello World!',
      bomba: 'bomba',
      champions: []
    }
  },
  components: {
    Test
  },
  methods: {
    getChampions() {
      //some axios call to get all champions and return them under the variable name champions
      // for loop over the object and return the .name? or whatever to return just the champion names
      //return champions
    }
  }
}
</script>

<template>
  <div>
    <h1>{{ champions }}</h1>
    <h2>{{ bomba }}</h2>
    <h3>{{ someCall(5) }}</h3>
    <Test />
  </div>
</template>