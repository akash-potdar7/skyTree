<template>
  <div id="app">
    <h1>File explorer tree</h1>
    <Tree
      v-on:node-click="nodeClickHandler"
      :node="root"/>
  </div>
</template>

<script>
import Tree from "./components/Tree.vue";

export default {
  name: "app",
  components: {
    Tree
  },
  data: function() {
    return {
      root: this.$store.state.rawData,
    }
  },
  methods: {
    nodeClickHandler(node) {
      console.log('clicked node', node);
    }
  }
};
</script>

<style lang="scss">
body {
  background-color: #333333;
  color: #ffffff;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
</style>
