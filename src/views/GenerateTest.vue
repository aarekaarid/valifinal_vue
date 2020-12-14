<template>
  <div class="home">
    <p></p>
    <br>
<!--    <h1>GENERATE TEST</h1>-->
    <p>
      <select v-model="dropDownStudent">  <!--NB! This is the  selected value-->
        <option value="" selected disabled>choose name</option>
        <option v-for="option in namesList" v-bind:value="option.name">
          {{ option.name }}
        </option>
      </select>
    </p>
    <button v-on:click="generateTest()">Generate test</button>
    <p>{{dropDownStudent}}</p>

    <table align="center" border="1" v-if="getMapSize(this.testMap)">
      <tr>
        <th>Topic</th>
        <th>Exercise</th>
      </tr>
      <tr v-for="(row, index) in testMap">{{index}}
        <td>{{row}} + EXERCISE TEXT</td>
      </tr>
    </table>
    <div v-if="!getMapSize(this.testMap)">
      ...
    </div>
  </div>
</template>

<script>
let returnNames = function (response) {
  this.namesList = response.data;
  // console.log(this.namesList.length);
}

let displayNames = function () {
  let url = this.$host + "/student/table";
  this.$http.get(url).then(this.returnNames);
}

function returnTest(response) {
  this.testMap = response.data;
  console.log(getMapSize(this.testMap));
  // if (getMapSize(this.testMap) === 0){
  //   alert(this.dropDownStudent + " has passed all the topics")
  // }
}

let generateTest = function () {
  let url = this.$host + "/generatetest/" + this.dropDownStudent;
  if (this.dropDownStudent === ""){
    alert("You have to pick a student!");
  }
  this.$http.get(url).then(this.returnTest)
      .catch(function (error) {
        alert(Object.values(error.response.data));
  });
  // this.dropDownStudent = "";
}

function getMapSize(input){
  let len = 0;
  for(let count in input){
    len++
  }
  return len;
}

export default {
  methods: {
    returnNames: returnNames,
    displayNames: displayNames,
    returnTest: returnTest,
    generateTest: generateTest,
    getMapSize: getMapSize
  },
  data: function () {
    return {
      namesList: [],
      dropDownStudent: "",
      studentName: "",
      testMap: {},
    }
  },
  created() {   //selle abil tulevad andmed automaatselt
    this.displayNames();
  }
}

</script>
<style scoped>
th{
  width: 200px;
}

</style>
