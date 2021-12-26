<template>
  <div>
      <v-card
        elevation="2"
        class="ma-4"
      >
        <v-card-title>
          <v-container class="pa-1">
            <v-row v-if="titleEdit === true" no-gutters>
              <v-col md="6" cols="11">
                <v-text-field
                  label="Title"
                  v-model="quest.locales.en"
                  outlined
                  dense
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col>
                <v-btn
                  icon
                  color="grey"
                  @click="editTitle()"
                >
                  <v-icon>mdi-pencil-off</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-row v-else no-gutters>
              <v-col cols="auto">
                <span class="text-subtitle-2">en</span> {{ quest.locales.en }}
              </v-col>
              <v-col>
                <v-btn
                  icon
                  color="grey"
                  @click="editTitle()"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-row class="text-subtitle-2 ml-0" no-gutters>
              ID: {{quest.id}}
            </v-row>
          </v-container>
        </v-card-title>
        <v-card-text class="mx-1 mb-4">
          <div class="text-subtitle-2">
            General:
          </div>
          <div>
            <v-container class="pa-0">
                <v-row no-gutters class="align-center">
                    <v-col v-if="giverEdit === true" cols="3">
                        <v-select
                            v-model="quest.giver"
                            :items="givers"
                            item-text="name"
                            item-value="giverid"
                            label="Giver"
                            single-line
                            dense
                        ></v-select>
                    </v-col>
                    <v-col v-else cols="auto">
                        Giver: {{ giver }}
                    </v-col>
                    <v-col cols="auto">
                        <v-btn
                            icon
                            small
                            color="grey"
                            @click="editGiver()"
                        >
                            <v-icon small>mdi-pencil</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>

                <v-row no-gutters class="align-center">
                    <v-col v-if="expEdit === true" cols="3">
                        <v-text-field
                            label="EXP"
                            v-model="quest.exp"
                            outlined
                            dense
                            hide-details
                            type="number"
                        ></v-text-field>
                    </v-col>
                    <v-col v-else cols="auto">
                        EXP: {{ quest.exp }}
                    </v-col>
                    <v-col cols="auto">
                        <v-btn
                            icon
                            small
                            color="grey"
                            @click="editExp()"
                        >
                            <v-icon small>mdi-pencil</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>

                <v-row no-gutters class="align-center">
                    <v-col v-if="wikiEdit === true" cols="11">
                        <v-text-field
                            label="Wiki Link"
                            v-model="quest.wiki"
                            outlined
                            dense
                            hide-details
                        ></v-text-field>
                    </v-col>
                    <v-col v-else cols="auto">
                        Wiki: <a :href="quest.wiki">{{ quest.wiki }}</a>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn
                            icon
                            small
                            color="grey"
                            @click="editWiki()"
                        >
                            <v-icon small>mdi-pencil</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
          </div>
        </v-card-text>
      </v-card>
  </div>
</template>
<script>
  export default {
    name: 'QuestDetails',
    props: {
      quest: {
        type: Object,
      },
    },
    data: () => ({ 
      titleEdit: false,
      giverEdit: false,
      expEdit: false,
      wikiEdit: false,
    }),
    computed: {
        giver: function() {
            return Object.values(this.$store.copy('traders/data'))?.filter(t => t.id == this.quest.giver)[0]?.locale?.en || this.quest.giver
        },
        givers: function() {
            return Object.values(this.$store.copy('traders/data'))?.map(trader => {
                return {name: trader.locale.en, giverid: trader.id}
            }) || []
        }
    },
    methods: {
      editTitle() {
        this.$set(this, 'titleEdit', (this.titleEdit == true ? false : true))
      },
      editGiver() {
        this.$set(this, 'giverEdit', (this.giverEdit == true ? false : true))
      },
      editExp() {
        this.$set(this, 'expEdit', (this.expEdit == true ? false : true))
      },
      editWiki() {
        this.$set(this, 'wikiEdit', (this.wikiEdit == true ? false : true))
      },
    }
  }
</script>
