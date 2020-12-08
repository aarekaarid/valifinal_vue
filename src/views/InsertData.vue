<template>
  <div class="home">
    <br>
    <h1>INSERT STUDENT</h1>
    <table align="center" border="1" v-if="namesList.length">
      <tr>
        <th>No</th>
        <th>STUDENTS</th>
      </tr>
      <tr v-for="(row, index) in namesList">
        <td>{{ index + 1 }}</td>
        <td><input v-bind:disabled="!row.active" v-model="row.name"></td>
        <td><button v-on:click="activateName(row, index)">activate</button></td>
        <td><button v-bind:disabled="!row.active" v-on:click="updateStudent(row)">Update</button></td>
      </tr>
    </table>
    <p>
      <input v-model="student.name" placeholder="insert name"><br>
    </p>
    <button v-on:click="addStudent()">Submit</button>
    <br><br>

    <h1>INSERT TOPIC</h1>
    <table align="center" border="1" v-if="topicsList.length">
      <tr>
        <th>No</th>
        <th>TOPICS</th>
      </tr>
      <tr v-for="(row, index) in topicsList">
        <td>{{ index + 1 }}</td>
        <td><input v-bind:disabled="!row.active" v-model="row.topicName"></td>
<!--        <td><input v-bind:disabled="!row.active" v-model="row.id">-->
        <td><button v-on:click="activateTopic(row)">activate</button></td>
        <td><button v-bind:disabled="!row.active" v-on:click="updateTopic(row)">Update</button></td>
      </tr>
    </table>
    <p>
      <input v-model="topic.topicName" placeholder="insert topic name" ></p>
    <button v-on:click="addTopic()">Submit</button>
    <br>
    <br><br>

    <h1>CHOOSE TOPIC/ ADD EXERCISE</h1>
    <!--TOPICS DROPDOWN-->
    <p>
      <select v-on:change="displayExercises()" v-model="dropDownTopic">  <!--NB! This is the  selected value-->
        <option value="" selected disabled>choose topic</option>
        <option v-for="option in topicsList" v-bind:value="option.topicName">
          {{ option.topicName }}
        </option>
      </select>
    </p>
    <!--END OF TOPICS DROPDOWN-->
    <table align="center" border="1" v-if="exerciseList.length">
      <tr>
        <th>No</th>
        <th>EXERCISES</th>
      </tr>
      <tr v-for="(row, index) in exerciseList">
        <td>{{ index + 1 }}</td>
<!--        <td>{{row.exerciseName}}</td>-->
        <td><input v-bind:disabled="!row.active" v-model="row.exerciseName"></td>
        <td><button v-on:click="activateExercise(row)">activate</button></td>
        <td><button v-bind:disabled="!row.active" v-on:click="updateExercise(row)">Update</button></td>
      </tr>
    </table>
    <p>
      <input v-model="exerciseName" placeholder="insert exercise text" width="" height="10"><br>
    </p>
    <p>{{ errorMessage }}</p>
    <button v-on:click="addExercise()">Submit</button>
  </div>
</template>

<script>
//START STUDENT
let returnNames = function (response) {
  this.namesList = response.data;
}

let addStudent = function () {
  let url = "http://localhost:8080/student";
  this.$http.post(url, this.student).then(this.displayNames)
      .catch(function (error){
        alert(JSON.stringify(error.response.data))
      });
  this.student = {};
}

let displayNames = function () {
  let url = "http://localhost:8080/student/table";
  this.$http.get(url).then(this.returnNames);
}

// let activateName = function (row){
//   row.active = true;  //activating cell
//   this.namesList.splice();
// }
//OR
let activateName = function (row, index) {
  row.active = true;
  this.namesList.splice(index, 1, row);
}

let updateStudent = function (row, index){
  let url = "http://localhost:8080/student/update";
  this.$http.put(url, row);
  row.active = false; //deactivating cell after pressing 'update'
  this.namesList.splice(index, row);
}
//END OF STUDENT

//START TOPIC
let returnTopics = function (response) {
  this.topicsList = response.data;
}

let displayTopics = function () {
  let url = "http://localhost:8080/topic/table";
  this.$http.get(url).then(this.returnTopics);
}

let addTopic = function () {
  let url = "http://localhost:8080/topic";
  this.$http.post(url, this.topic).then(this.returnTopics)
      .catch(function (error){
        alert(JSON.stringify(error.response.data))
      })
      .then(this.displayTopics);
  this.topic = {};
}

let activateTopic = function (row){
  row.active = true;
  this.topicsList.splice();
}

let updateTopic = function (row, index){
  let url = "http://localhost:8080/topic/update";
  this.$http.put(url, row)
      .catch(function (error){
        alert(JSON.stringify(error.response.data))
      })
      .then(this.displayTopics);  //NB! updates list to previous state after alert!!!
  row.active = false;
  this.topicsList.splice(row, index);
}
//END OF TOPIC

//START EXERCISE
let returnExercises = function (response) {
  this.exerciseList = response.data;
  // this.errorMessage = response.error;
  console.log(this.errorMessage)
}

let returnError = function (error) {
  this.errorMessage = error.error;
}

let displayExercises = function () {
  let url = "http://localhost:8080/exercise/" + this.dropDownTopic;
  this.$http.get(url).then(this.returnExercises);
  // .then(() => alert(error.message));
}

let addExercise = function () {
  let url = "http://localhost:8080/exercise";
  let requestParams = {
    params: {
      topicName: this.dropDownTopic,
      exerciseName: this.exerciseName,
    }
  }
  this.$http.put(url, {}, requestParams)
      .then(this.returnExercises)
      .catch(function (error) {
        alert(JSON.stringify(error.response.data)); //this is the part you need that catches 400 request
      });
}

let activateExercise = function (row){
  row.active = true;
  this.exerciseList.splice();
}

let updateExercise = function (row, index){
  let url = "http://localhost:8080/exercise/update";
  this.$http.put(url, row)
      .catch(function (error) {
    alert(JSON.stringify(error.response.data))
  });
  row.active = false; // deacticating the cell after clicking Update!!!
  this.exerciseList.splice(row, index); //need to investigate!!!
}

//END OF EXERCISE

export default {
  methods: {
    addStudent: addStudent,
    returnNames: returnNames,
    displayNames: displayNames,
    activateName: activateName,
    updateStudent: updateStudent,
    addTopic: addTopic,
    returnTopics: returnTopics,
    displayTopics: displayTopics,
    activateTopic: activateTopic,
    updateTopic: updateTopic,
    addExercise: addExercise,
    returnExercises: returnExercises,
    displayExercises: displayExercises,
    activateExercise: activateExercise,
    updateExercise: updateExercise,
    returnError: returnError,

  },
  data: function () {
    return {
      err: "",
      student: {},
      namesList: [],
      topic: {},
      topicsList: [],
      dropDownTopic: "",
      topicName: "",
      exerciseName: "",
      exerciseList: [],
      errorMessage: "",
    }
  },
  created() {   //selle abil tulevad andmed automaatselt
    this.displayTopics();
    this.displayNames();
    // this.displayExercises()
  }
}
</script>
