<template>
    <div>
        <div
            :style="{ 'margin-left': `${depth*20}px` }"
            class="node">

                <span
                    @click="expanded = !expanded"
                    v-if="hasChildren"
                    class="type">
                        {{ expanded ? "&#9660;" : "&#9658;" }}
                </span>
                <span
                    @click="expanded = !expanded"
                    class="type"
                    v-else>
                        &#9671;
                </span>
                <span @click="nodeClicked" class="text">{{ node.name }}</span>
        </div>
        <span
            v-if="expanded">
                <Tree
                    v-for="child in node.children"
                    :key="child.name"
                    :node="child"
                    :depth="depth + ONE"
                    v-on:node-click="(node) => $emit('node-click', node)"
                />
        </span>
    </div>
</template>

<script>

import * as ColorHash from 'color-hash';
const ch = new ColorHash();

export default {
    name: "Tree",
    props: {
        node: Object,
        depth: {
            type: Number,
            default: 0
        }
    },
    data: function() {
        return {
            expanded: false,
            ONE: 1
        }
    },
    computed: {
        hasChildren() {
            return this.node.children
        }
    },
    methods: {
        nodeClicked() {
            this.$emit("node-click", this.node);
        },
        styleNode(node) {
            let color = 'red';
            if (!node.children) {
                color = ch.hex(node.name.split('.').pop());
            }
            return { color: color };
        }
    }
}
</script>

<style lang="scss" scoped>
    .node {
        text-align: left;
    }
    .type {
        margin-right: 6px; 
    }
    .type:hover {
        cursor: default;
    }
    .text:hover {
        cursor: pointer;
    }
</style>
