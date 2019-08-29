<template>
  <div id="create-login-layout">
    <v-dialog v-model="dialogeState" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn small color="rgb(69, 145, 255)" v-on="on">
          <span class="btn-text">Create login</span>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Create login</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-form ref="createloginForm" class="px-3" v-model="valid">
                  <v-text-field label="Hierarchy Id" v-model="userModel.heirarchyId" disabled></v-text-field>
                  <v-text-field label="Username*" v-model="userModel.username" :rules="usernameRules" required></v-text-field>
                  <v-text-field label="Password*" type="password" v-model="userModel.password" :rules="passwordRules" required></v-text-field>
                  <v-text-field label="Re-enter the Password*" type="password" v-model="userModel.reEnterPassword" :rules="reEnterPasswordRules" required></v-text-field>
                  <v-checkbox label="Login should have view only access" v-model="userModel.viewOnly" required></v-checkbox>
                  <v-checkbox label="Login can delete patients" v-model="userModel.canDeletePatients" required></v-checkbox>
                  <small>*indicates required field</small>
                  <div class="form-actions">
                    <v-btn small color="#7E7E7E" @click="onClose">
                      <span class="btn-text">Close</span>
                    </v-btn>
                    <v-btn small color="rgb(69, 145, 255)" @click="onSave">
                      <span class="btn-text">Create login</span>
                    </v-btn>
                  </div>
                </v-form>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

export default {

    data() {
      return {
        dialogeState: false,
        valid: true,
        userModel: {
          heirarchyId: '782474', // further should be assigned to current hierarchy id.
          username: '',
          password: '',
          reEnterPassword: '',
          viewOnly: false,
          canDeletePatients: false,
        },

        usernameRules: [
          v => !!v || 'Username is required',
          v => (v && v.length >= 3) || 'Minimum length is 3 characters',
        ],
        passwordRules: [
          v => !!v || 'Password is required',
          v => (v && v.length >= 8) || 'Minimum length is 8 characters',
        ],
        reEnterPasswordRules: [
          v => !!v || 'Password is required',
          v => (!!v && v) === this.userModel.password || "Password doesn't match",
        ]
      }
    },

    methods: {

      closeDialoge() {
        this.dialogeState = false;
      },

      clearForm() {
        this.$refs.createloginForm.resetValidation();
        this.$refs.createloginForm.reset();
      },

      onClose() {
        this.clearForm();
        this.closeDialoge();
      },

      onSave() {
        if (this.$refs.createloginForm.validate()) {
          this.clearForm();
          this.closeDialoge();
        }
      },

    },

};
</script>


<style lang="scss" scoped>

  .btn-text {
    color: white;
    text-transform: none;
  }

  .form-actions {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: 38%;
    margin-top: 6px;
  }

</style>

