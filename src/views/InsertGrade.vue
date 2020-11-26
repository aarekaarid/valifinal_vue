<template>
<div class="home">
  <br>
  <h1>INSERT GRADES</h1>
  <p>
    <input v-model="name" placeholder="pick name"><br>
  </p>
  <p>
    <input v-model="exerciseName" placeholder="pick exercise"><br>
  </p>
  <p>
    <input v-model="grade" placeholder="insert grade"><br>
  </p>
  <button v-on:click="insertGrade()">Submit</button>
  <br><br><br>
  <p>
    <input v-model="topName" placeholder="pick topic"><br>
  </p>
  <button v-on:click="pickTopic()">Pick topic</button><br>
  {{a}}
  </div>
</template>

<script>
let returnTopId =function (response){
  this.a = response.data;
}

let insertGradeF = function (){
  let url = "http://localhost:8080/summary";
  let requestParams = {
    params: {
      name: this.name,
      exerciseName: this.exerciseName,
      grade: this.grade
    }
  }
  this.$http.put(url, {}, requestParams);
      // .then(this.showResponse)
  this.name="";
  this.exerciseName = "";
  this.grade="";
}

let pickTopicF = function (){
  let url = "http://localhost:8080/topic/"+this.topName;
  this.$http.get(url).then(this.returnTopId);
  this.topName= "";

}

export default {
  methods: {insertGrade: insertGradeF,
      pickTopic: pickTopicF
    , returnTopId: returnTopId
  },
  data: function (){return{
    name: "",
    exerciseName:"",
    grade:"",
    topName: "",
    a: ""
  }}
}

</script>
