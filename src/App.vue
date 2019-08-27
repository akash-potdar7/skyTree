<template>
  <div id="app">
    <h3 v-if="!root">
      Initialize heirarchy
    </h3>
    <div>
      <v-btn
        v-if="root"
        v-on:click="traverseAll" small>
          Traverse through
      </v-btn>
      <v-btn
        v-on:click="addNode" small>
          Add node
      </v-btn>
      <v-btn
        v-if="root"
        v-on:click="removeNode" small>
          Remove node (cascades)
      </v-btn>
      <v-btn
        v-if="root"
        v-on:click="updateNode" small>
          Update node
      </v-btn>
    </div>

    <v-card
      v-if="root"
      max-width="344"
      class="mx-auto explorer-card">
        <Tree
          v-if="root"
          v-on:node-click="nodeClickHandler"
          :node="root"/>
    </v-card>

  </div>
</template>

<script>
import Tree from "./components/Tree.vue";
import TreeUtil from "./treeUtil.js";
import store from "./store.js";

const treeUtil = new TreeUtil();

export default {
  name: "app",
  components: {
    Tree
  },
  computed: {
    root() {
      return this.$store.state._root;
    }
  },
  methods: {
    nodeClickHandler(node) {
      store.dispatch('setCurrentContextNode', node);
      console.log('current node set in the context is', store.state.currentContextNode)
    },

    traverseAll() {
      treeUtil.traverse(this.root);
    },

    addNode() {
      const parentNode = store.state.currentContextNode;
      treeUtil.addNode("dist", parentNode);
    },

    removeNode() {
      const currentNode = store.state.currentContextNode;
      treeUtil.removeNode(currentNode.id);
    },

    updateNode() {
      const currentNode = store.state.currentContextNode;
      treeUtil.updateNode(currentNode, "distribution");
    },

  }
};
</script>

<style lang="scss">

  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    margin-top: 60px;
  }

  .explorer-card {
    margin-left: 20px;
    padding: 16px;
  }

</style>
