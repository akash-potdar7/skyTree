<template>
    <div>
        <div
            @click="nodeClicked"
            :style="{ 'margin-left': `${depth*20}px` }"
            class="node">
                <span 
                    v-if="hasChildren"
                    class="type">
                        {{ expanded ? "&#9660;" : "&#9658;" }}
                </span>
                <span
                    class="type"
                    v-else>
                        &#9671;
                </span>
                <span :style="styleNode(node)">{{ node.name }}</span>
        </div>
        <span
            v-if="expanded">
                <Tree
                    v-for="child in node.children"
                    :key="child.name"
                    :node="child"
                    :depth="depth + 1"
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
        }
    },
    computed: {
        hasChildren() {
            return this.node.children
        }
    },
    methods: {
        nodeClicked() {
            this.expanded = !this.expanded;
            if (!this.hasChildren) {
                this.$emit("node-click", this.node);
            }
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
</style>
