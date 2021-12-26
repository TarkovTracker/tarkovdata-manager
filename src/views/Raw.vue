<template>
  <div>
    <v-textarea
      filled
      label="quests.json"
      auto-grow
      v-model="questData"
    ></v-textarea>
  </div>
</template>

<script>

export default {
  name: 'Raw',
  computed: {
      questData: {
        get () {
          return JSON.stringify(this.$store.copy('quests/data'), null, 4)
        },
        set (value) {
          JSON.parse(this.$store.set('quests/data', value))
        },
      },
    //   diff: function() {
    //     const Diff = require('diff');
    //     var diffLines = Diff.diffJson(
    //       this.$store.copy('quests/original'), 
    //       this.$store.copy('quests/data')
    //     )
    //     return JSON.stringify(diffLines, null, 4)
    //   },
  },
}
</script>
