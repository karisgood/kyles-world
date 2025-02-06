<template>
  <div id="app">
    <nav class="navigation">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/dogs">Dogs</router-link> |
      <router-link to="/cats">Cats</router-link> |
      <router-link to="/canvas">Canvas</router-link> |
      <router-link to="/heading">Heading</router-link> |
      <router-link to="/Contact">Contact</router-link> |
      <router-link to="/hello">Hello</router-link> |
      <router-link to="/snake">Snake Game</router-link> |
      <router-link to="/photocard">Photo Card</router-link> |
      <router-link to="/rpg">RPG</router-link> |
      <router-link to="/email">Email Signature</router-link> |
      <router-link to="/pages">Pages</router-link>
    </nav>

    <img alt="Vue logo" src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.navigation {
  padding: 30px;
}

.navigation a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin: 0 10px;
}

.navigation a.router-link-exact-active {
  color: #3498db;
}
</style>
