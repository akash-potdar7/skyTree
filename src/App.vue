<template>
  <div id="app">
    <h3 v-if="!root">
      Initialize heirarchy
    </h3>
    <div v-if="false">
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

    <div class="layout-container">

      <v-container>
        <v-row no-gutters>

          <v-col cols="3">
            <div class="hierarchy-wrapper">
              <v-card
                v-if="root"
                class="mx-auto explorer-card">
                  <Tree
                    v-if="root"
                    v-on:node-click="nodeClickHandler"
                    :node="root"/>
              </v-card>
            </div>
          </v-col>
            
          <v-col style="margin-left: 44px;">
            <div class="tab-layout">
                <div>
                  <v-tabs
                    v-model="tab">
                    <v-tab
                      v-for="item in tabs"
                      :key="item">
                        <span class="tab-item-title">
                          {{ item }}
                        </span>
                    </v-tab>
                  </v-tabs>
              
                  <v-tabs-items v-model="tab">
                    <v-tab-item>
                      <HierarchyAction />
                    </v-tab-item>
                    <v-tab-item>
                      <Logins />
                    </v-tab-item>
                  </v-tabs-items>
                </div>
            </div>
          </v-col>

        </v-row>
      </v-container>

    </div>

  </div>
</template>

<script>
import Tree from "./components/Tree.vue";
import Logins from "./components/Logins.vue";
import HierarchyAction from './components/HierarchyAction';

import TreeUtil from "./treeUtil.js";
import store from "./store.js";

const treeUtil = new TreeUtil();

export default {
  name: "app",
  components: {
    Tree,
    Logins,
    HierarchyAction
  },
  data() {
    return {
      tab: null,
      tabs: ["Actions", "Logins"],
    }
  },
  computed: {
    root() {
      return store.state._root;
    },
    devENV() {
      return 'development' == process.env.NODE_ENV;
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

  .layout-container {
    display: flex;
    > .layout-subject {
      flex: 1;
    }
  }

  .explorer-card {
    margin-left: 20px;
    padding: 16px;
  }

  .tab-item-title {
    text-transform: none;
  }

</style>
