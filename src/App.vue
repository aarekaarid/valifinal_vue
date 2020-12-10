<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link v-if="!token" to="/siteuser">LogIn</router-link> |
      <router-link v-if="token" to="/insertdata">Insert data</router-link> |
      <router-link v-if="token" to="/insertgrade">Insert grade</router-link> |
      <router-link v-if="token" to="/generate">Generate test</router-link> |
<!--      <router-link to="/about">About</router-link> |-->
      <button v-if="token" v-on:click="logoutUser()">Log out</button>
    </div>
    <router-view/>
  </div>
</template>

<script>

let logoutUser = function (){
  localStorage.removeItem('user-token') // remove on logout
  this.$router.push( {path: '/'})
  location.reload()
}

  export default{
    methods: {
      logoutUser: logoutUser,
    },
    data(){
      return {
        token: ''
      }
    },
    created() {
      this.token = localStorage.getItem('user-token')
    }
  }

</script>

<style>
@import './views/styles.css';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

/*#logout_location{*/
/*  position: absolute;*/
/*  top: 6%;*/
/*  left: 90%;*/
/*}*/

</style>
