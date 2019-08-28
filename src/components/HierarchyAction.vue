<template>
    <div id="hierarchy-action-layout">
        
        <v-container>
            <v-row>
              <v-col cols="12">
                <v-form ref="hierarchyActionForm" class="px-1" v-model="valid">

                    <v-text-field label="Name" disabled></v-text-field>

                    <v-checkbox label="Hierarchy allows MERM registration" required></v-checkbox>
                    <v-checkbox label="Hierarchy allows VOT registration" required></v-checkbox>

                    <div class="divider-wrapper">
                        <v-divider></v-divider>
                    </div>

                    <div class="left-align-content">
                        <v-btn color="#4591ff" small>
                            <span class="btn-text">Edit details</span>
                        </v-btn>
                    </div>

                    <div class="divider-wrapper">
                        <v-divider></v-divider>
                    </div>

                    <v-text-field label="Id" disabled></v-text-field>
                    <v-text-field label="ParentId" disabled></v-text-field>
                    <v-text-field label="Level" disabled></v-text-field>
                    <v-text-field label="Type" disabled></v-text-field>
                    <v-text-field label="Cases linked to this hierarchy" disabled></v-text-field>
                    <v-text-field label="Children" disabled></v-text-field>
                    <v-text-field label="Siblings" disabled></v-text-field>

                    <div class="divider-wrapper">
                        <v-divider></v-divider>
                    </div>

                    <div class="create-hierarchy-btn-actions">
                        <span class="mr-6">
                            <v-btn color="#7E7E7E" small>
                                <span class="btn-text">Add hierarchy below this</span>
                            </v-btn>
                        </span>
                        <span class="mr-6">
                            <v-btn color="#7E7E7E" small>
                                <span class="btn-text">Add hierarchy at this level</span>
                            </v-btn>
                        </span>
                    </div>

                    <div class="divider-wrapper">
                        <v-divider></v-divider>
                    </div>

                    <div class="delete-btn-wrapper">
                        <v-btn small color="#c70039">
                            <span class="btn-text">Delete this hierarchy</span>
                        </v-btn>

                        <v-subheader :inset="false">
                            This hierarchy is the root directory - you cannot delete this root directory.
                            Please contact your system administrator for help.
                        </v-subheader>

                    </div>

                </v-form>
              </v-col>
            </v-row>
        </v-container>
    
    </div>    
</template>

<script>
export default {

    data: () => ({
        valid: true,
    }),

}
</script>

<style lang="scss" scoped>

    $flex: flex;

    #hierarchy-action-layout {
        display: $flex;
        flex-direction: column;
        padding: 8px 0;
    }

    .left-align-content {
        display: $flex;
        align-items: flex-start;   
        padding: 10px 0;
    }

    .btn-text {
        color: white;
        text-transform: none;
    }

    .form-actions {
        display: $flex;
        align-items: flex-start;
        justify-content: space-between;
        width: 38%;
        margin-top: 6px;
    }

    .divider-wrapper {
        margin: 8px 0px;
    }

    .create-hierarchy-btn-actions {
        display: $flex;
        padding: 10px 0;
    }

    .mr-6 {
        margin-right: 6px;
    }

    .delete-btn-wrapper {
        display: $flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-direction: column;
        padding: 10px 0;
    }

</style>

