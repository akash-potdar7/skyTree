<template>
  <div id="create-login-layout">
    <v-dialog v-model="dialogeState" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="#74B7A2" small v-on="on">
            <span class="btn-text">Change password</span>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Change password</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-form ref="changePasswordForm" class="px-3" v-model="valid">
                  <v-text-field label="Password*" type="password" v-model="password" :rules="passwordRules" required></v-text-field>
                  <v-text-field label="Re-enter the Password*" type="password" v-model="reEnterPassword" :rules="reEnterPasswordRules" required></v-text-field>
                  <small>*indicates required field</small>
                  <div class="form-actions">
                    <v-btn small color="#7E7E7E" @click="onClose">
                      <span class="btn-text">Cancel</span>
                    </v-btn>
                    <v-btn small color="rgb(69, 145, 255)" @click="onSave">
                      <span class="btn-text">Save</span>
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
        password: '',
        reEnterPassword: '',

        passwordRules: [
          v => !!v || 'Password is required',
          v => (v && v.length >= 8) || 'Minimum length is 8 characters',
        ],
        reEnterPasswordRules: [
          v => !!v || 'Password is required',
          v => (!!v && v) === this.password || "Password doesn't match",
        ]

      }
    },

    methods: {

      closeDialoge() {
        this.dialogeState = false;
      },

      clearForm() {
        this.$refs.changePasswordForm.resetValidation();
        this.$refs.changePasswordForm.reset();
      },

      onClose() {
        this.clearForm();
        this.closeDialoge();
      },

      onSave() {
        if (this.$refs.changePasswordForm.validate()) {
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

