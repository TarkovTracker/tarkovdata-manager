<template>
  <v-container>
    <v-row no-gutters>
      <v-col 
        md="6" 
        cols="12"
        v-for="quest in $store.get('quests/data')"
        :key="quest.id"
      >
        <QuestDetails :quest="quest" />
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
