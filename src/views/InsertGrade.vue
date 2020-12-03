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
        <td>{{ row.topicName }}</td>
        <td>{{ row.exerciseName }}</td>
        <td>{{ row.grade }}</td>
      </tr>
    </table>
    <p>
      <select v-model="dropDownStudent">  <!--NB! This is the  selected value-->
        <option value="" selected disabled>choose name</option>
        <option v-for="option in namesList" v-bind:value="option.name">
          {{option.name}}
        </option>
      </select>
    </p>
      <select v-on:change="displayExercises()" v-model="dropDownTopic">  <!--NB! This is the  selected value-->
        <option value="" selected disabled>choose topic</option>
        <option v-for="option in topicsList" v-bind:value="option.topicName">
          {{option.topicName}}
        </option>
      </select>
    <p>
      <select v-model="dropDownExercise">  <!--NB! This is the  selected value-->
        <option value="" selected disabled>choose exercise</option>
        <option v-for="option in exerciseList" v-bind:value="option.exerciseName">
          {{option.exerciseName}}
        </option>
      </select>
    </p>
    <p>
      <select v-model="dropDownGrade">  <!--NB! This is the  selected value-->
        <option value="" selected disabled>choose grade</option>
        <option v-for="option in dropDownGradeJsons" v-bind:value="option.gradeValue">
          {{option.gradeValue}}
        </option>
      </select>
    </p>
    <button v-on:click="insertGrade()">Submit</button>
    <br><br>
  </div>
</template>

<script>
let returnSummaryF = function (response) {
  this.summaryList = response.data;
  console.log(this.summaryList)
}

let displaySummaryF = function () {
  let url = "http://localhost:8080/summary/table";
  this.$http.get(url).then(this.returnSummary);
}

let returnNamesF = function (response) {
  this.namesList = response.data;
}

let displayNamesF = function () {
  let url = "http://localhost:8080/student/table";
  this.$http.get(url).then(this.returnNames);
}

let returnTopics = function (response) {
  this.topicsList = response.data;
  console.log(this.topicsList)
}

let displayTopics = function () {
  let url = "http://localhost:8080/topic/table";
  this.$http.get(url, this.topic).then(this.returnTopics);
}

let returnExercises = function (response) {
  this.exerciseList = response.data;
  // console.log(this.exerciseList)
}

let displayExercises = function () {
  let url = "http://localhost:8080/exercise/"+this.dropDownTopic;
  this.$http.get(url).then(this.returnExercises);
}

let insertGradeF = function () {
  let url = "http://localhost:8080/summary";
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

export default {
  methods: {
    returnSummary: returnSummaryF,
    displaySummary: displaySummaryF,
    returnNames: returnNamesF,
    displayNames: displayNamesF,
    insertGrade: insertGradeF,
    returnTopics: returnTopics,
    displayTopics: displayTopics,
    returnExercises: returnExercises,
    displayExercises: displayExercises,
  },
  data: function () {
    return {
      newRow: [],
      summaryList: [],
      namesList: [],
      topicsList: [],
      exerciseList: [],
      name: "",
      exerciseName: "",
      grade: "",
      topName: "",
      dropDownStudent:"",
      dropDownTopic:"",
      dropDownExercise:"",
      dropDownGrade:"",
      dropDownGradeJsons:
          [{gradeValue:true},
            {gradeValue:false}]
    }
  },
  created() {   //selle abil tulevad andmed automaatselt
    this.displaySummary();
    this.displayNames();
    this.displayTopics();
    // this.displayExercises()
  }
}

</script>
