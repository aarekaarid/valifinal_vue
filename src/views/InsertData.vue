<template>
  <div class="home">
    <br>
    <p>{{ sum(2, 4) }}</p>
    <h1>INSERT STUDENT</h1>
    <table align="center" border="1">
      <tr>
        <th>ID</th>
        <th>STUDENTS</th>
      </tr>
      <tr v-for="(row, index) in namesList">
        <td>{{ index + 1 }}</td>
        <td>{{ row.name }}</td>
      </tr>
    </table>
    <p>
      <input v-model="student.name" placeholder="insert name"><br>
    </p>
    <button v-on:click="addStudent()">Submit</button>
    <br><br>

    <h1>INSERT TOPIC</h1>
    <table align="center" border="1">
      <tr>
        <th>ID</th>
        <th>TOPICS</th>
      </tr>
      <tr v-for="(row, index) in topicsList">
        <td>{{ index + 1 }}</td>
        <td>{{ row.topicName }}</td>
      </tr>
    </table>
    <p>
      <input v-model="topic.topicName" placeholder="insert topic name"></p>
    <button v-on:click="addTopic()">Submit</button>
    <br>
    <!--    <button v-on:click="displayTopics()">Display topics</button>-->
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
    <table align="center" border="1">
      <tr>
        <th>ID</th>
        <th>EXERCISES</th>
      </tr>
      <tr v-for="(row, index) in exerciseList">
        <td>{{ index + 1 }}</td>
        <td>{{ row.exerciseName }}</td>
      </tr>
    </table>
    <p>
      <input v-model="exName" placeholder="insert exercise text"><br>
    </p>
    <p>{{ errorMessage }}</p>
    <button v-on:click="addExercise()">Submit</button>
  </div>
</template>

<script>
//STUDENT
let returnNames = function (response) {
  this.namesList = response.data;
}

let displayNames = function () {
  let url = "http://localhost:8080/student/table";
  this.$http.get(url).then(this.returnNames);
}

let addStudent = function () {
  let url = "http://localhost:8080/student";
  this.$http.post(url, this.student).then(this.returnNames);
  this.student = {};
}
//END OF STUDENT

//TOPIC
let returnTopics = function (response) {
  this.topicsList = response.data;
}

let displayTopics = function () {
  let url = "http://localhost:8080/topic/table";
  this.$http.get(url).then(this.returnTopics);
}

let addTopic = function () {
  let url = "http://localhost:8080/topic";
  this.$http.post(url, this.topic).then(this.returnTopics);
  this.topic = {};
}
//END OF TOPIC

//EXERCISE
let returnExercises = function (response) {
  this.exerciseList = response.data;
  // this.errorMessage = response.error;
  // console.log(this.errorMessage)
}

let returnError = function (error) {
  this.errorMessage = error.error;
}

let displayExercises = function () {
  let url = "http://localhost:8080/exercise/" + this.dropDownTopic;
  this.$http.get(url).then(this.returnExercises);
  // .then(() => alert(error.message));
}

// try {
//   displayExercises()
// } catch (err) {
//   document.getElementById("error").innerText = err.message;
// }


let addExercise = function () {
  let url = "http://localhost:8080/exercise";
  let requestParams = {
    params: {
      topName: this.dropDownTopic,
      exName: this.exName,
    }
  }
  this.$http.put(url, {}, requestParams).then(this.returnExercises)
      .catch(function (error) {
        alert(JSON.stringify(error.response.data)); //
        // console.log(error.response.data); // this is the part you need that catches 400 request
      });
}
//           error => {
//         if (error.response) {
//           console.log(error.response.data);
//         }
//       });
//   this.exName = "";
// }

// const err = Error("This exercise is already in your list")

export default {
  methods: {
    addStudent: addStudent,
    returnNames: returnNames,
    displayNames: displayNames,
    addTopic: addTopic,
    returnTopics: returnTopics,
    displayTopics: displayTopics,
    addExercise: addExercise,
    returnExercises: returnExercises,
    displayExercises: displayExercises,
    returnError: returnError,

    sum: function (a, b) {
      return a + b;
    }
  },
  data: function () {
    return {
      err: "",
      student: {},
      namesList: [],
      topic: {},
      topicsList: [],
      dropDownTopic: "",
      topName: "",
      exName: "",
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
