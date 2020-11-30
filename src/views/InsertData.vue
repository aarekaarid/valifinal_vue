<template>
  <div class="home">
    <br>
    <h1>INSERT STUDENT</h1>
    <p>
      <input v-model="student.name" placeholder="insert name"><br>
    </p>
    <button v-on:click="addStudent()">Submit</button>
    <br><br><br><br><br><br>

    <h1>INSERT TOPIC</h1>
    <p>
      <br>
    </p>

    <table border="1">
      <tr>
        <th>ID</th>
        <th>TOPICS</th>
      </tr>
      <tr v-for="(row, index) in resultList">
        <td>{{ index + 1 }}</td>
        <td>{{ row.topicName }}</td>
      </tr>
      <tr>
        <td>
          <button v-on:click="addRow()">Add row</button>
        </td>
      </tr>
    </table>
    <input v-model="topic.topicName" placeholder="insert topic name">
    <button v-on:click="addTopic()">Submit</button>
    <br>
    <button v-on:click="displayTopics()">Display topics</button>
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
let addStudentF = function () {
  let url = "http://localhost:8080/student";
  this.$http.post(url, this.student);
  this.student = {};
}

let addRowF = function () {
  this.newRow.push({});
}

//adds topic and returns topic list
let addTopicF = function () {
  let url = "http://localhost:8080/topic";
  this.$http.post(url, this.topic);
  this.topic = {};
}

let addExerciseF = function () {
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

let displayTopicsF = function () {
  let url = "http://localhost:8080/topic/table";
  this.$http.get(url, this.topic).then(this.showResult);
}

let showResultF = function (response) {
  this.resultList = response.data;
  console.log(this.resultList)
}

export default {
  methods: {
    addStudent: addStudentF,
    addRow: addRowF,
    addTopic: addTopicF,
    addExercise: addExerciseF,
    showResult: showResultF,
    displayTopics: displayTopicsF
  },
  data: function () {
    return {
      student: {},
      topic: {},
      newRow: [],
      topName: "",
      exName: "",
      resultList: [],
      topicName: ""
    }
  },
  // created(){   //selle abil tulevad andmed automaatselt
  //   this.displayTopics()
  // }
}
</script>
