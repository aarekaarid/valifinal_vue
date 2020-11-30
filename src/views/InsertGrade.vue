<template>
  <div class="home">
    <br>
    <h1>INSERT GRADES</h1>
    <table border="1" align="center">
      <tr>
        <th>ID</th>
        <th>Student name</th>
        <th>Topic name</th>
        <th>Exercise name</th>
        <th>Grade</th>
      </tr>
      <tr v-for="(row, index) in summaryList">
        <td>{{ index + 1 }}</td>
        <td>{{ row.studentName }}</td>
        <!--          <select v-model="row.dropDown">-->
        <!--            <option v-for="option in namesList" v-bind:value="option.name">-->
        <!--              {{ option.name }}-->
        <!--            </option>-->
        <!--          </select>-->
        <td>{{ row.topicName }}</td>
        <td>{{ row.exerciseName }}</td>
        <td>{{ row.grade }}</td>
      </tr>
      <tr>
        <td>
          <button v-on:click="addRow()">Add row</button>
        </td>
      </tr>
    </table>
    <p><input v-model="name" placeholder="pick name"></p>
<!--    <p><input v-model="topicName" placeholder="pick topic"></p>-->
    <p><input v-model="exerciseName" placeholder="pick exercise"></p>
    <p><input v-model="grade" placeholder="insert grade"></p>
    <button v-on:click="insertGrade()">Submit</button>
    <br><br>
<!--    <br><br><br>-->
<!--    <p>-->
<!--      <input v-model="topName" placeholder="pick topic"><br>-->
<!--    </p>-->
<!--    <button v-on:click="pickTopic()">Pick topic</button>-->
<!--    <br>-->
<!--    {{ a }}-->
  </div>
</template>

<script>
let addRowF = function () {
  this.summaryList.push({});
}

let returnSummaryF = function (response) {
  this.summaryList = response.data;
  console.log(this.summaryList)
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
  this.$http.put(url, {}, requestParams).then(this.returnSummary);
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
      // studentId: 0,
      // exerciseId: 0,
      grade: "",
      topName: "",
      a: "",
    }
  },
  created() {   //selle abil tulevad andmed automaatselt
    this.displaySummary()
  }
}

</script>
