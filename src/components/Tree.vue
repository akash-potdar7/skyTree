<template>
    <div>
        <div
            @click="nodeClicked"
            :style="[{ 'margin-left': `${depth*20}px` }, { 'background-color': bgColor}]"
            class="node">
                <div
                    v-on:click.stop="expanded = !expanded"
                    v-if="hasChildren"
                    class="prepend-icon-wrapper">
                        <v-icon small>{{prependIcon}}</v-icon>
                </div>
                <div
                    v-on:click.stop="expanded = !expanded"
                    class="prepend-icon-wrapper"
                    v-else>
                        <v-icon small>fas fa-minus</v-icon>
                </div>
                <div class="node-content-wrapper">
                    <div class="node-label">
                        <span :style="{'color': labelColor}">
                            {{ node.name }}
                        </span>
                    </div>
                    <div v-if="hasChildren">
                        <v-avatar color="#4591FF" size="20" right>
                            <span class="white--text">{{node.children.length}}</span>
                        </v-avatar>
                    </div>
                </div>
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

import store from '../store';

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
            const c = this.node.children
            return c && (c.length > 0);
        },
        prependIcon() {
            return this.expanded ? 'fas fa-minus-square' : 'fas fa-plus-square';
        },
        bgColor() {
            if (!store.state.currentContextNode)
                return;
            const node = this.node;
            const cNode = store.state.currentContextNode;
            if (cNode.name == node.name) {
                return '#DBEAFF';
            }
            return '';
        },
        labelColor() {
            if (!store.state.currentContextNode)
                return;
            const node = this.node;
            const cNode = store.state.currentContextNode;
            if (cNode.name == node.name) {
                return '#1957B1';
            }
            return '';
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

    $pointer: pointer;
    $flex: flex;

    %user-select-none {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none; 
    }

    .white--text {
        color: #fff;
        font-size: 0.6rem;
        font-weight: bold;
    }

    .node {
        @extend %user-select-none;
        display: $flex;
        cursor: $pointer;
        position: relative;
        align-items: center;
        text-align: left;
        min-height: 44px;
        padding: 12px;
        margin-top: 8px;
        margin-bottom: 8px;
        border-radius: 4px;
        transition: 0.3s all;
    }
    .node:hover {
        background-color: #F9F9F9;
    }

    .prepend-icon-wrapper {
        margin-right: 6px;
    }

    .node-content-wrapper {
        display: $flex;
        align-items: center;
        flex-basis: 0%;
        flex-grow: 1;
        flex-shrink: 0;
        min-width: 0;

        .node-label {
            flex: 1;
            font-size: inherit;
            margin-left: 6px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
</style>
