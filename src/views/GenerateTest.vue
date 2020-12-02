<template>
  <div class="home">
    <br>
    <p>
      <select v-model="dropDownStudent">  <!--NB! This is the  selected value-->
        <option value="" selected disabled>choose name</option>
        <option v-for="option in namesList" v-bind:value="option.name">
          {{ option.name }}
        </option>
      </select>
    </p>
    <button v-on:click="generateTest()">Generate test</button>
    <p id="test"></p>
  </div>
</template>

<script>
let returnNames = function (response) {
  this.namesList = response.data;
}

let displayNames = function () {
  let url = "http://localhost:8080/student/table";
  this.$http.get(url).then(this.returnNames);
}

let returnTest = function (response) {
  this.testList = response.data;
  document.getElementById("test").innerText = response.data;
}

let generateTest = function () {
  let url = "http://localhost:8080/generatetest/"+this.dropDownStudent;
  this.$http.get(url).then(this.returnTest)
  this.dropDownStudent = "";
}

export default {
  methods: {
    returnNames: returnNames,
    displayNames: displayNames,
    returnTest: returnTest,
    generateTest: generateTest
  },
  data: function () {
    return {
      namesList: [],
      dropDownStudent: "",
      studentName: "",
      testList: [],
    }
  },
  created() {   //selle abil tulevad andmed automaatselt
    this.displayNames();
  }
}

</script>
