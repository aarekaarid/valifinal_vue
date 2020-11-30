<template>
  <div class="home">
    <br>
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
<!--      <tr>-->
<!--        <td>-->
<!--          <button v-on:click="addRow()">Add row</button>-->
<!--        </td>-->
<!--      </tr>-->
    </table>
    <p>
    <input v-model="student.name" placeholder="insert name"><br>
    </p>
    <button v-on:click="addStudent()">Submit</button>
    <br><br><br><br><br><br>

    <h1>INSERT TOPIC</h1>
    <table border="1" align="center">
      <tr>
        <th>ID</th>
        <th>TOPICS</th>
      </tr>
      <tr v-for="(row, index) in topicsList">
        <td>{{ index + 1 }}</td>
        <td>{{ row.topicName }}</td>
      </tr>
<!--      <tr>-->
<!--        <td>-->
<!--          <button v-on:click="addRow()">Add row</button>-->
<!--        </td>-->
<!--      </tr>-->
    </table>
    <p>
    <input v-model="topic.topicName" placeholder="insert topic name"></p>
    <button v-on:click="addTopic()">Submit</button><br>
<!--    <button v-on:click="displayTopics()">Display topics</button>-->
    <br><br><br><br>

    <h1>CHOOSE TOPIC/ ADD EXERCISE</h1>
    <p>
      <input v-model="topName" placeholder="insert topic name"><br>
    </p>
    <p>
      <input v-model="exName" placeholder="insert exercise text"><br>
    </p>
    <button v-on:click="addExercise()">Submit</button>
  </div>
</template>

<script>
//ADD STUDENT
let addStudent = function () {
  let url = "http://localhost:8080/student";
  this.$http.post(url, this.student).then(this.returnNames);
  this.student = {};
}

let returnNames = function (response) {
  this.namesList = response.data;
}

let displayNames = function () {
  let url = "http://localhost:8080/student/table";
  this.$http.get(url).then(this.returnNames);
}


//END OF STUDENT

// let addRowF = function () {
//   this.newRow.push({});
// }

//adds topic and returns topic list
let addTopic = function () {
  let url = "http://localhost:8080/topic";
  this.$http.post(url, this.topic).then(this.returnTopics);
  this.topic = {};
}

let returnTopics = function (response) {
  this.topicsList = response.data;
  console.log(this.topicsList)
}

let displayTopics = function () {
  let url = "http://localhost:8080/topic/table";
  this.$http.get(url, this.topic).then(this.returnTopics);
}

let addRow = function () {
  this.topicsList.push({});
}

let addExercise = function () {
  let url = "http://localhost:8080/exercise";
  let requestParams = {
    params: {
      topName: this.topName,
      exName: this.exName,
    }
  }
  this.$http.put(url, {}, requestParams);
  this.exName = "";
}

export default {
  methods: {
    addStudent: addStudent,
    returnNames: returnNames,
    displayNames: displayNames,
    addTopic: addTopic,
    returnTopics: returnTopics,
    displayTopics: displayTopics,
    addRow: addRow,
    addExercise: addExercise,
  },
  data: function () {
    return {
      student: {},
      // name: "",
      namesList: [],
      topic: {},
      newRow: [],
      topName: "",
      exName: "",
      topicsList: [],
      // topicName: ""
    }
  },
  created(){   //selle abil tulevad andmed automaatselt
    this.displayTopics();
    this.displayNames()
  }
}
</script>
