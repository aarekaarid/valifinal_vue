<template>
<div class="home">
  <br>
  <h1>INSERT STUDENT</h1>
  <p>
    <input v-model="student.name" placeholder="insert name"><br>
  </p>
  <button v-on:click="addStudent()">Submit</button>
  <br>
  <br>
  <h1>INSERT TOPIC</h1>
  <p>
    <input v-model="topic.topicName" placeholder="insert topic name"><br>
  </p>
  <button v-on:click="addTopic()">Submit</button>
  <br>
  <br>
  <br>
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
// let showResponse =function (response){
//   this.a = response.data;
// }
// let a = "promise"
let addStudent = function (){
  let url = "http://localhost:8080/student";
  this.$http.post(url, this.student);
  // .then(this.showResponse)
  this.student = {};
}

let addTopic = function (){
  let url = "http://localhost:8080/topic";
  this.$http.post(url, this.topic);
  // .then(this.showResponse)
  this.topic = {};
}

let addExercise = function (){
  let url = "http://localhost:8080/exercise";
  let requestParams = {
    params: {
      topName: this.topName,
      exName: this.exName,
    }
  }
  this.$http.post(url, {}, requestParams);
  // .then(this.showResponse)
  this.topName = "";
  this.exName = "";
}

export default {
  methods: {addStudent: addStudent,
            addTopic: addTopic,
            addExercise: addExercise
    // , showResponse: showResponse
  },
  data: function (){return{
    student:{},
    topic:{},
    topName: "",
    exName: ""
  }}
}
</script>
