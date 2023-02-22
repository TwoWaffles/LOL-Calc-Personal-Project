<script>
import DropdownChampions from '../components/dropdownChampions/DropdownChampions.vue';
import DropdownItem from '../components/dropdownChampions/DropdownItem.vue';
import Test from '../components/Test.vue';

export default {
  data() {
    return {
      bomba: 'bomba',
      champions: ["test123","another123"]
    }
  },
  components: {
    Test,
    DropdownChampions,
    DropdownItem
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
    <Test test123="bigxd"></Test>
    <!-- <DropdownChampions :champions=champions></DropdownChampions> -->
    <DropdownChampions></DropdownChampions>
  </div>
</template>