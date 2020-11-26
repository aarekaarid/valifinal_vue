<template>
<div class="home">
  <br>
  <p>
    <input v-model="summary.name" placeholder="pick name"><br>
  </p>
  <p>
    <input v-model="topName" placeholder="pick topic"><br>
  </p>
  <button v-on:click="pickTopic()">Pick topic</button><br>
  <p>
    <input v-model="summary.exerciseName" placeholder="pick exercise"><br>
  </p>
  <p>
    <input v-model="summary.grade" placeholder="insert grade"><br>
  </p>
  <button v-on:click="insertGrade()">Submit</button>
  <br><br><br>
  {{a}}
  </div>
</template>

<script>
let returnTopId =function (response){
  this.a = response.data;
}

let insertGradeF = function (){
  let url = "http://localhost:8080/summary";
  this.$http.put(url, {}, this.summary);
      // .then(this.showResponse)
  this.summary = {};
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
    summary:{},
    topName: "",
    a: ""
  }}
}

</script>
