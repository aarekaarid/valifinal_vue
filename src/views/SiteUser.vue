<template>
  <div class="about">
    <h1>This is login page</h1>

    <input v-model="siteUser.username" placeholder="create username">
    <input v-model="siteUser.password" type="password" placeholder="create password">
    <button v-on:click="addUser()">Submit</button>
    <br><br>
    <input v-model="siteUser.registeredUsername" placeholder="insert username">
    <input v-model="siteUser.registeredPassword" type="password" placeholder="insert password">
    <button v-on:click="logIn()">Log in</button>
  </div>
</template>

<script>
let addUser = function (){
  let url = "http://localhost:8080/siteuser";
  this.$http.post(url, this.siteUser);
  this.siteUser={};
}

//here are all the methods and variables, that I want to use in HTML
export default {
  methods: {
    addUser: addUser,
    // logIn: logIn
  },
  data: function () {
    return {
      siteUser: {},
    }
  },
}
</script>