<template>
  <v-container>
    <v-row no-gutters>
      <v-col 
        md="6" 
        cols="12"
        v-for="quest in $store.get('quests/data')"
        :key="quest.id"
      >
        <v-lazy
          :options="{
            threshold: .5
          }"
          min-height="200"
          transition="fade-transition"
        >
          <QuestDetails :quest="quest" />
        </v-lazy>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  import QuestDetails from '@/components/QuestDetails'
  export default {
    components: {
      QuestDetails,
    },
    data: () => ({ 
      titleEdit: {},
    }),
    methods: {
      editTitle(questId) {
        this.$set(this.titleEdit, questId, (this.titleEdit[questId] == true ? false : true))
      },
    }
  }
</script>
