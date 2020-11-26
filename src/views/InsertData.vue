<template>
<div class="home">
  <br>
  <h1>INSERT STUDENT</h1>
  <p>
    <input v-model="student.name" placeholder="insert name"><br>
  </p>
  <button v-on:click="addStudent()">Submit</button>
  <br><br><br><br><br><br>
  <br>
  <br>
  <h1>INSERT TOPIC</h1>
  <p>
    <input v-model="topic.topicName" placeholder="insert topic name"><br>
  </p>
  <button v-on:click="addTopic()">Submit</button>
  <br>
  <table border="1">
    <tr>
      <th>TOPICS:</th>
    </tr>
    <tr v-for="row in resultList">
      <td>{{row}}</td>
    </tr>
  </table>
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
let addStudentF = function (){
  let url = "http://localhost:8080/student";
  this.$http.post(url, this.student);
  this.student = {};
}

//adds topic and returns topic list
let addTopicF = function (){
  let url = "http://localhost:8080/topic";
  this.$http.post(url, this.topic).then(this.showTable);
  this.topic = {};
}

let addExerciseF = function (){
  let url = "http://localhost:8080/exercise";
  let requestParams = {
    params: {
      topName: this.topName,
      exName: this.exName,
    }
  }
  this.$http.post(url, {}, requestParams);
  this.exName = "";
}

let showTableF = function (response){
  this.resultList = response.data;
  console.log(this.resultList)
}

export default {
  methods: {addStudent: addStudentF,
            addTopic: addTopicF,
            addExercise: addExerciseF,
            showTable: showTableF
  },
  data: function (){return{
    student:{},
    topic:{},
    topName: "",
    exName: "",
    resultList:[],
    topicName:""
  }}
}
</script>
