<template>
    <div id="layout-container">
        <div class="create-login-actions">
            <CreateLogin />
        </div>
        <div class="divider-wrapper">
            <v-divider></v-divider>
        </div>
        <div class="update-login-actions">
            <span class="mr-6">
                <v-btn color="#74B7A2" small>
                    <span class="btn-text">Change password</span>
                </v-btn>
            </span>
            <span class="mr-6">
                <v-btn color="#C70039" small @click="deleteLogin">
                    <span class="btn-text">Delete login</span>
                </v-btn>
            </span>
        </div>
        <div class="divider-wrapper">
            <v-divider></v-divider>
        </div>
        <div class="login-list-wrapper">
            <span v-if="logins.length > 0">

            <v-list dense rounded>
                <v-subheader>Logins</v-subheader>
                <v-list-item-group v-model="item" color="#2898E7">
                    <v-list-item
                        v-on:click="onLoginItemClick(user)"
                        v-for="(user, i) in logins"
                        :key="i">
                            <v-list-item-content>
                                <v-list-item-title v-text="user.name"></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </span>
            <span v-else>No logins available</span>
        </div>
    </div>
</template>

<script>
import CreateLogin from '../pages/CreateLogin';

export default {
    components: {
        CreateLogin
    },
    data() {
        return {
            item: null,
            logins: [ {id: 1, name: 'Sky'}, {id: 2, name:'Ron'}, {id: 3, name:'Edward'}],
            selectedLogin: null,
        }
    },
    methods: {

        onLoginItemClick(login) {
            this.selectedLogin = login;
        },

        deleteLogin() {
            let login = this.selectedLogin;
            if (login) {
                let index = this.findIndexById(login.id, this.logins);
                if (index !== -1) {
                    this.logins.splice(index, 1);
                    this.selectedLogin = null;
                }
            }
        },

        findIndexById(id, list) {
            return list.findIndex( el => id === el.id);
        }

    }
}
</script>

<style lang="scss" scoped>

    $flex: flex;

    #layout-container {
        display: $flex;
        flex-direction: column;
        padding: 20px 12px;
    }

    .create-login-actions {
        display: $flex;
        padding: 10px 0;
        justify-content: flex-start;
    }

    .update-login-actions {
        display: $flex;
        padding: 10px 0;
    }

    .divider-wrapper {
        margin: 8px 0px;
    }

    .login-list-wrapper {
        display: block;
        padding: 8px 0px;
        text-align: left;
    }

    .btn-text {
        color: white;
        text-transform: none;
    }

    .mr-6 {
        margin-right: 6px;
    }

</style>
