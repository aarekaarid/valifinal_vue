<template>
<div class="home">
  <br>
  <p>
    <input v-model="student.name" placeholder="insert name"><br>
  </p>
  <button v-on:click="addStudent()">Register</button><br>
  </div>
</template>

<script>
// let showResponse =function (response){
//   this.a = response.data;
// }
// let a = "promise"
let addStudent = function (){
  let url = "http://localhost:8080/student"
  this.$http.post(url, this.student)
      // .then(this.showResponse)
  this.student = {}
}

export default {
  methods: {addStudent: addStudent
    // , showResponse: showResponse
  },
  data: function (){return{
    student:{}
  }}
}

</script>
