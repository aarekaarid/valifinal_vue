<template>
  <div class="home">
    <br>
    <h1>INSERT GRADES</h1>
    <table border="1" align="center" v-if="summaryList.length">
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
        <td>{{ row.topicName }}</td>
        <td>{{ row.exerciseName }}</td>
        <td><select v-model="row.dropDownGrade">  <!--NB! This is the  selected value-->
          <option value="" selected disabled>choose grade</option>
          <option v-for="option in dropDownGradeJsons" v-bind:value="option.gradeValue">
            {{ option.gradeValue }}
          </option>
        </select></td>
        <td>
          <button v-on:click="updateGrade(row), displayOverviewList()">Insert</button>
        </td>
      </tr>
    </table>
    <!--overview table-->
    <br><br><br>
    <table align="center" border="1" v-if="overviewList.length">
      <tr>
        <th>No</th>
        <th>Student name</th>
        <th v-for="(topic, index) in overviewList[0].grades">{{ index }}</th>
      </tr>
      <tr v-for="(row,index) in overviewList">
        <td>{{ index + 1 }}</td>
        <td>{{ row.name }}</td>
        <td v-for="(grade) in row.grades"
            :class="{passed: grade === 'OK', failed: grade === 'Failed',
            empty: grade === 'null'}">{{ grade }}</td>
      </tr>
    </table>
<!--    <div v-bind:class="{ ok, failed, empty }"></div>-->
    <div v-if="!overviewList.length">
      ...
    </div>
  </div>
</template>

<script>
let returnSummaryF = function (response) {
  this.summaryList = response.data;
  console.log(this.summaryList)
}

let displaySummaryF = function () {
  let url = this.$host + "/summary/table";
  this.$http.get(url).then(this.returnSummary);
}

let updateGrade = function (row, index) {
  let url = this.$host + "/grade/update";
  console.log(row.grade);
  let requestParams = {
    params: {
      studentName: row.studentName,
      exerciseName: row.exerciseName,
      grade: row.dropDownGrade
    }
  };
  this.$http.put(url, {}, requestParams)
      .then(this.returnSummary)
      .catch(function (error) {
        alert(JSON.stringify(error.response.data))
      });
}

let returnNamesF = function (response) {
  this.namesList = response.data;
}

let displayNamesF = function () {
  let url = this.$host + "/student/table";
  this.$http.get(url).then(this.returnNames);
}

let returnTopics = function (response) {
  this.topicsList = response.data;
  console.log(this.topicsList)
}

let displayTopics = function () {
  let url = this.$host + "/topic/table";
  this.$http.get(url, this.topic).then(this.returnTopics);
}

let returnExercises = function (response) {
  this.exerciseList = response.data;
  // console.log(this.exerciseList)
}

let displayExercises = function () {
  let url = this.$host + "/exercise/" + this.dropDownTopic;
  this.$http.get(url).then(this.returnExercises);
}

let insertGradeF = function () {
  let url = this.$host + "/summary";
  let requestParams = {
    params: {
      name: this.dropDownStudent,
      exerciseName: this.dropDownExercise,
      grade: this.dropDownGrade
    }
  }
  this.$http.put(url, {}, requestParams).then(this.returnSummary);
  this.dropDownTopic = "";
  this.dropDownExercise = "";
  this.dropDownGrade = "";
}

let returnOverviewList = function (response) {
  this.overviewList = response.data;
  console.log(this.overviewList);
}

let displayOverviewList = function () {
  let url = this.$host + "/overview";
  this.$http.get(url).then(this.returnOverviewList);
}

export default {
  methods: {
    returnSummary: returnSummaryF,
    displaySummary: displaySummaryF,
    updateGrade: updateGrade,
    returnNames: returnNamesF,
    displayNames: displayNamesF,
    insertGrade: insertGradeF,
    returnTopics: returnTopics,
    displayTopics: displayTopics,
    returnExercises: returnExercises,
    displayExercises: displayExercises,
    returnOverviewList: returnOverviewList,
    displayOverviewList: displayOverviewList
  },
  data: function () {
    return {
      newRow: [],
      summaryList: [],
      namesList: [],
      topicsList: [],
      exerciseList: [],
      studentName: "",
      exerciseName: "",
      grade: "null",
      topName: "",
      dropDownStudent: "",
      dropDownTopic: "",
      dropDownExercise: "",
      dropDownGrade: "",
      dropDownGradeJsons:
          [{gradeValue: "OK"},
            {gradeValue: "Failed"}],
      overviewList: [],
    }
  },
  created() {   //selle abil tulevad andmed automaatselt
    this.displaySummary();
    this.displayOverviewList();
  }
}

</script>

<style>
.failed {
  background: red;
}
.passed {
  background: forestgreen;
}
.empty {
  background: white;
}
</style>