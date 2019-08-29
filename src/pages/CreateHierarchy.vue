<template>
  <div id="create-hierarchy-layout">
    <v-dialog v-model="dialogeState" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn small color="#7E7E7E" v-on="on">
          <span class="btn-text">{{addType}}</span>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Create hierarchy</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-form ref="createHierarchyForm" class="px-3" v-model="valid">
                  <v-text-field label="Parent Id" v-model="hierarchyModel.parentId" disabled></v-text-field>
                  <v-text-field label="Level" v-model="hierarchyModel.level" disabled></v-text-field>
                  <v-text-field label="Name*" v-model="hierarchyModel.name" :rules="nameRules" required></v-text-field>
                  <v-text-field label="Code*" v-model="hierarchyModel.code" :rules="codeRules" required></v-text-field>
                  <v-checkbox label="Hierarchy allows MERM registrations" v-model="hierarchyModel.allowsMERMRegistration" required></v-checkbox>
                  <v-checkbox label="Hierarchy allows VOT registrations" v-model="hierarchyModel.allowsVOTRegistration" required></v-checkbox>
                  <small>*indicates required field</small>
                  <div class="form-actions">
                    <v-btn small color="#7E7E7E" @click="onClose">
                      <span class="btn-text">Close</span>
                    </v-btn>
                    <v-btn small color="rgb(69, 145, 255)" @click="onSave">
                      <span class="btn-text">Create hierarchy</span>
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

    props: {
        type: String // level_below || level_same
    },

    computed: {

        addType() {
            if ('level_below' === this.type)
                return 'Add hierarchy below this';
            else
                return 'Add hierarchy at this level';
        }
    },

    data() {
      return {
        dialogeState: false,
        valid: true,
        hierarchyModel: {
          id: '',
          parentId: '',
          level: '',
          name: '',
          code: '',
          allowsMERMRegistration: false,
          allowsVOTRegistration: false,
        },

        nameRules: [
          v => !!v || 'Name is required'
        ],
        codeRules: [
          v => !!v || 'Code is required'
        ],

      }
    },

    methods: {

      closeDialoge() {
        this.dialogeState = false;
      },

      clearForm() {
        this.$refs.createHierarchyForm.resetValidation();
        this.$refs.createHierarchyForm.reset();
      },

      onClose() {
        this.clearForm();
        this.closeDialoge();
      },

      onSave() {
        if (this.$refs.createHierarchyForm.validate()) {
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

