<template>
  <div class="home">
    <br>
    <h1>INSERT GRADES</h1>
    <p>
    </p>
    <p><input v-model="name" placeholder="pick name"></p>
    <!--          <select v-model="row.dropDown">-->
    <!--            <option v-for="option in namesList" v-bind:value="option.name">-->
    <!--              {{ option.name }}-->
    <!--            </option>-->
    <!--          </select>-->
    <p><input v-model="exerciseName" placeholder="pick exercise">    </p>
    <p><input v-model="grade" placeholder="insert grade">   </p>
    <button v-on:click="insertGrade()">Submit</button>
    <p>
      <br>
    </p>
    <table border="1">
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Exercise name</th>
        <th>Grade</th>
      </tr>
      <tr v-for="(row, index) in summaryList">
        <td>{{ index + 1 }}</td>
        <td>{{row.studentId}}</td>
          <!--          <select v-model="row.dropDown">-->
          <!--            <option v-for="option in namesList" v-bind:value="option.name">-->
          <!--              {{ option.name }}-->
          <!--            </option>-->
          <!--          </select>-->
        <td>{{row.exerciseId}}</td>
        <td>{{row.grade}}</td>
      </tr>
      <tr>
        <td>
          <button v-on:click="addRow()">Add row</button>
        </td>
        <td><p></p></td>
        <td><p></p></td>
        <td>
          <button v-on:click="insertGrade()">Submit</button>
        </td>
      </tr>
    </table><br><br>
    <table border="1">
      <tr v-for="row in summaryList">
        <td><input v-model="row.studentId" placeholder="pick name"></td>
        <td><input v-model="row.exerciseId" placeholder="pick exercise"></td>
        <td><input v-model="row.grade" placeholder="insert grade"></td>
      </tr>
      <tr>
        <td>
          <button v-on:click="addRow()">Add row</button>
        </td>
        <td><p></p></td>
        <td>
          <button v-on:click="insertGrade()">Submit</button>
        </td>
      </tr>
    </table>
    <br><br><br>
    <p>
      <input v-model="topName" placeholder="pick topic"><br>
    </p>
    <button v-on:click="pickTopic()">Pick topic</button>
    <br>
    {{ a }}
  </div>
</template>

<script>
let addRowF = function () {
  this.summaryList.push({});
}

let returnSummaryF = function (response) {
  this.summaryList = response.data;
}

let displaySummaryF = function () {
  let url = "http://localhost:8080/summary/table";
  this.$http.get(url).then(this.returnSummary);
}

// let returnNamesF = function (response) {
//   this.namesList = response.data;
// }
//
// let displayNamesF = function () {
//   let url = "http://localhost:8080/student/table";
//   this.$http.get(url).then(this.returnNames);
// }

let insertGradeF = function () {
  let url = "http://localhost:8080/summary";
  let requestParams = {
    params: {
      name: this.name,
      exerciseName: this.exerciseName,
      grade: this.grade
    }
  }
  this.$http.put(url, {}, requestParams);
  // .then(this.showResponse)
  this.name = "";
  this.exerciseName = "";
  this.grade = "";
}

// let returnTopId = function (response) {
//   this.a = response.data;
// }
//
// let pickTopicF = function () {
//   let url = "http://localhost:8080/topic/" + this.topName;
//   this.$http.get(url).then(this.returnTopId);
//   this.topName = "";
// }

export default {
  methods: {
    addRow: addRowF,
    returnSummary: returnSummaryF,
    displaySummary: displaySummaryF,//created osas ka
    // returnNames: returnNamesF,
    // displayNames: displayNamesF,
    insertGrade: insertGradeF,
    // returnTopId: returnTopId,
    // pickTopic: pickTopicF,
  },
  data: function () {
    return {
      newRow: [],
      summaryList: [],
      namesList: [],
      name: "",
      exerciseName: "",
      studentId: 0,
      exerciseId: 0,
      grade: "",
      topName: "",
      a: "",
    }
  },
  created() {   //selle abil tulevad andmed automaatselt, hetkel veel konsooli
    this.displaySummary()
  }
}

</script>
