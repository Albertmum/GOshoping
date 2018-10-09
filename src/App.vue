<template>
    <div id="app">
      <img alt="Vue logo" src="./assets/logo.png">
      <h2 >{{message}}</h2>
      <h1>{{input}}</h1>
      <input type="text" >
    </div>
</template>

<script>
export default {
  name: "app",
  data: function() {
    return {
      message: "你好!",
      input:'hello world!'
    };
  }
};
</script>

<style>
</style>
