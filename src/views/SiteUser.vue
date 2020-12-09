<template>
  <div class="about">
    <h1>This is login page</h1>

    <input v-model="siteUser.username" placeholder="create username">
    <input v-model="siteUser.password" type="password" placeholder="create password">
    <button v-on:click="addUser()">Submit</button>
    <br><br>
    <br><br>
    <br><br>
    <input v-model="loginData.username" placeholder="insert username">
    <input v-model="loginData.password" type="password" placeholder="insert password">
    <button v-on:click="loginUser()">Log in</button>
    <p>{{loginMessage}}</p>
  </div>
</template>

<script>
let addUser = function (){
  let url = this.$host + "/siteuser";
  this.$http.post(url, this.siteUser);
  this.siteUser={};
}

let returnLoginMessage = function (response){
  this.loginMessage = response.data;
}

let loginUser = function (){
  let url = this.$host + "/validateuser";
  this.$http.put(url, this.loginData).then(this.returnLoginMessage);
  this.loginData = {};
  localStorage.setItem('user-token', token) // store the token
  this.$http.defaults.headers.common['Authorization'] = "Bearer" + token
  localStorage.removeItem('user-token') // remove on logout
}

//here are all the methods and variables, that I want to use in HTML
export default {
  methods: {
    addUser: addUser,
    loginUser: loginUser,
    returnLoginMessage: returnLoginMessage,
  },
  data: function () {
    return {
      siteUser: {},
      // loginUsername: "",
      // loginPassword: "",
      loginMessage: "",
      loginData: {},
    }
  },
}
</script>