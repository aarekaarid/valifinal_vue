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
  <br>
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
  alert(this.student)
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
            addExercise: addExercise
    // , showResponse: showResponse
  },
  data: function (){return{
    student:{},
    topName: "",
    exName: ""
  }}
}
</script>
