<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      app
    >
      <v-list>
        <v-list-item
          :to="'home'"
        >
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Overview</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          :to="'quests'"
        >
          <v-list-item-icon>
            <v-icon>mdi-clipboard-check</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Quests</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
         <v-list-item
          :to="'raw'"
        >
          <v-list-item-icon>
            <v-icon>mdi-code-json</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Raw</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="mini = !mini"></v-app-bar-nav-icon>

      <v-toolbar-title>
        TarkovData Manager
        <template v-if="$store.get('quests/retrieved') == false">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </template>
    </v-toolbar-title>
    </v-app-bar>

    <v-main
      class="ma-8"
    >
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({ 
      drawer: null,
      mini: true,
    }),
    computed: {
      diff: function() {
        const Diff = require('diff');
        var diffLines = Diff.diffJson(
          this.$store.copy('quests/original'), 
          this.$store.copy('quests/data')
        )
        return diffLines
      },
    },
    mounted() {
      fetch('https://tarkovtracker.github.io/tarkovdata/quests.json')
        .then(response => response.json())
        .then(data => {
          this.$store.set('quests/original', data)
          this.$store.set('quests/data', data)
          this.$store.set('quests/retrieved', true)
          this.$forceUpdate()
        });

      fetch('https://tarkovtracker.github.io/tarkovdata/traders.json')
        .then(response => response.json())
        .then(data => {
          this.$store.set('traders/original', data)
          this.$store.set('traders/data', data)
          this.$store.set('traders/retrieved', true)
          this.$forceUpdate()
        });
    },
  }
</script>