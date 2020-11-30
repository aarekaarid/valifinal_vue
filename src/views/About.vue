<template>
  <div class="about">
    <h1>This is an about page or not</h1>

    <p>
      <button v-on:click="test()">Add row</button>
    </p>
    <p>
      <button v-on:click="showTopicTable()">Get topics</button>
    </p>
    <table border="1">
      <tr>
        <th>ID</th>
        <th>TOPICS</th>
        <th>Delete</th>
      </tr>
      <tr v-for="(row,index) in resultTable">
        <td>{{index+1}}</td>
        <td><input v-model="row.topicName"></td>
        <td><button v-on:click="deleteRow(index)">Delete</button></td>
        <td> <select v-model="row.dropDownId">
          <option v-for="option in resultTable" v-bind:value="option.topicName">
            {{option.topicName}}
          </option>
        </select></td>
      </tr>
      <button v-on:click="send()">Send</button>
    </table>

<!--    <p>-->
<!--      <button v-on:click="pickTopic">Get topic ID</button> //inputti on ka veel vaja-->
<!--    </p>-->

  </div>
</template>

<script>
let test = function () {
  this.resultTable.push({}); //push on nagu add
}

let showResult = function (response) {
  this.resultTable = response.data;
  this.dropDownData = response.data;  //see dubleerib ülesmist rida, hetkel ei funktsioneeri
  console.log(this.resultTable)
}

let getData = function (){  //see funktsioon toob andmed automaatselt lehele
  this.$http.get("http://localhost:8080/topic/table").then(this.showResult);
}

let send = function (){
  this.$http.post("http://localhost:8080/topic/table", this.resultTable);
  this.topic = {};
  console.log(this.resultTable)
}

let deleteRow = function (index){
  this.resultTable.splice(index, 1);
}

// let showTopicTable = function () {  //see funktsioon tagastab andmed nupule vajutusega (samad adnmed, mis getData funktsioonis)
//   let url = "http://localhost:8080/topic/table";
//   this.$http.get(url).then(this.showResult);
//   // this.topic = {};
// }

// let pickTopicF = function (){
//   let url = "http://localhost:8080/topic/"+this.topName;
//   this.$http.post(url).then(this.returnTopId);
//   this.topName= "";
// }

//here are all the methods and variables, that I want to use in HTML, i.e. export from JS to HTML
export default {
  methods: {
    // insertGrade: insertGradeF,
    //   pickTopic: pickTopicF,
    // returnTopId: returnTopId,
    test: test,
    // showTopicTable: showTopicTable,
    showResult: showResult,
    deleteRow: deleteRow,
    // pickTopic: pickTopicF,
    getData: getData,
    send: send
  },
  data: function () {
    return {
      // resultList: [],
      topic: {},
      resultTable: [],
      dropDownData: []
          // [{name:"one"},
          // {name:"two"},
          // {name:"three"}]   //nii töötab ka
          // [{id:1, name:"one"},
          //    {id:2, name:"two"},
          //    {id:3, name:"three"}]   //selle listi asemel võiks olla meie poolt tagastatud list
    }
  },
  created (){   //selle abil tulevad andmed automaatselt
    this.getData()
  }
}
</script>