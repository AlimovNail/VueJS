<template>
  <v-card class="pa-10" min-height="500px">
    <v-text-field label="New Category" v-model="newCategory"></v-text-field>
    <v-btn color="success" @click="addCategory(newCategory)">Add</v-btn>
    <v-list flat class="pb-0">
      <v-subheader>Categories</v-subheader>
      <v-list-item-group color="primary">
        <v-card v-for="(category, i) in getCategoriesList" :key="i">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title v-text="category"></v-list-item-title>
            </v-list-item-content>
            <v-btn icon @click="deleteCategory(category)">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-list-item>
        </v-card>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "CategoriesList",

  data() {
    return {
      newCategory: "",
    };
  },

  computed: {
    ...mapGetters(["getCategoriesList"]),
  },

  methods: {
    ...mapMutations(["createCategory", "removeCategory"]),

    deleteCategory(category) {
      this.$store.commit("removeCategory", category);
    },
    addCategory(category) {
      if (!category) return;
      this.$store.commit("createCategory", category);
      this.newCategory = "";
    },
  },
};
</script>

<style>
</style>