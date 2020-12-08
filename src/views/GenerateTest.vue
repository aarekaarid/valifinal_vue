<style>
/*.home{*/
/*  background-image: url("https://media-exp1.licdn.com/dms/image/C560BAQEOuQ7My1_XpQ/company-logo_200_200/0?e=2159024400&v=beta&t=I_zKiQJcUUOOU7s4B5Lv_dFwueKjQUHuHLvztdPF6SM");*/
/*}*/
p {
  color: black;
  font-family: "Dubai Medium";
  font-size: x-large;
}

button {
  background-color: forestgreen;
}

select {
  background: #2c3e50;
  color: antiquewhite;
  border-color: #2c3e50;
}

table {
  background: darkgrey;
  color: black;
}
</style>

<template>
  <div class="home">
    <br>
    <h1>Generate test</h1>
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

    <table align="center" border="1"> <!--  v-if="testList.length"  -->
      <tr>
        <th>Topic</th>
        <th>Exercise</th>
      </tr>
      <tr v-for="(row, index) in testList">{{index}}
        <td>{{row}}</td>
      </tr>
    </table>
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
  // document.getElementById("test").innerText = response.data;
}

let generateTest = function () {
  let url = "http://localhost:8080/generatetest/" + this.dropDownStudent;
  this.$http.get(url).then(this.returnTest).catch(function (error) {
    alert(JSON.stringify(error.response.data));
  });
  // this.dropDownStudent = "";
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
      testList: {},
    }
  },
  created() {   //selle abil tulevad andmed automaatselt
    this.displayNames();
  }
}

</script>
