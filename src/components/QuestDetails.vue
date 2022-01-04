<template>
  <div>
      <v-card
        elevation="2"
        class="ma-4"
      >
        <v-card-title>
          <v-container class="pa-1">
            <v-row v-if="editing.title === true" no-gutters>
              <v-col md="11" cols="11">
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
                  @click="editField('title')"
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
                  @click="editField('title')"
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
          <div class="text-subtitle-2 text-decoration-underline">
            Requirements:
          </div>
          <div>
            <v-container class="pa-0">
                <v-row no-gutters class="align-center">
                    <v-col v-if="editing.levelrequire === true" cols="3">
                        <v-text-field
                            label="Level Required"
                            v-model="quest.require.level"
                            outlined
                            dense
                            hide-details
                            type="number"
                        ></v-text-field>
                    </v-col>
                    <v-col v-else cols="auto">
                        Level Required: {{ quest.require.level }}
                    </v-col>
                    <v-col cols="auto">
                        <v-btn
                            icon
                            small
                            color="grey"
                            @click="editField('levelrequire')"
                        >
                            <v-icon small>mdi-pencil</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row no-gutters class="align-center">
                    <v-container class="pa-0">
                        <v-row
                            no-gutters
                            v-for="(required, i) in quest.require.quests"
                            :key="i"
                            class="align-center"
                        >
                            <template v-if="Array.isArray(required) == true">
                              One-of:&nbsp;
                              <span v-for="(indiv, z) in required" :key="z">
                                {{$store.get('quests/data').filter(q => q.id == indiv)[0].locales.en}},&nbsp;
                              </span>
                            </template>
                            <template v-else>
                                {{$store.get('quests/data').filter(q => q.id == required)[0].locales.en}}
                            </template>
                            <v-btn
                                icon
                                small
                                color="grey"
                                @click="removeQuestRequired(i)"
                                title="Remove requirement"
                            >
                                <v-icon small>mdi-playlist-remove</v-icon>
                            </v-btn>
                        </v-row>
                        <v-row
                          no-gutters
                          class="align-center"
                        >
                          <v-dialog
                            v-model="requiredDialog"
                            width="500"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                dark
                                v-bind="attrs"
                                v-on="on"
                                x-small
                              >
                                Add Requirement
                              </v-btn>
                            </template>

                            <v-card>
                              <v-card-title>
                                Add {{ quest.locales.en }} required quest(s)
                              </v-card-title>

                              <v-card-text>
                                <v-select
                                  v-model="questRequireSelect"
                                  :items="requireTypes"
                                  item-text="name"
                                  item-value="type"
                                  label="Required State"
                                  dense
                                ></v-select>

                                <v-divider class="mb-5"></v-divider>

                                <span
                                  v-for="(selected, selectIndex) in requiredSelectArray"
                                  :key="selectIndex"
                                >
                                <v-row>
                                  <v-col>
                                    <v-autocomplete
                                      v-model="requiredSelectArray[selectIndex]"
                                      :items="otherQuests"
                                      hide-no-data
                                      hide-selected
                                      item-text="name"
                                      item-value="id"
                                      label="Quest"
                                      placeholder="Start typing to Search"
                                    ></v-autocomplete>
                                  </v-col>
                                  <v-col cols="auto" v-if="requiredSelectArray.length > 1">
                                    <v-btn
                                        icon
                                        small
                                        color="grey"
                                        @click="requiredQuestSelects.splice(selectIndex, 1)"
                                        title="Remove this requirement"
                                    >
                                        <v-icon small>mdi-playlist-remove</v-icon>
                                    </v-btn>
                                  </v-col>
                                </v-row>
                                </span>
                                <template v-if="questRequireSelect == 'oneof'">
                                  <v-btn
                                      icon
                                      small
                                      color="grey"
                                      @click="requiredQuestSelects.push(otherQuests[0].id)"
                                      title="Add another one-of quest requirement"
                                  >
                                      <v-icon small>mdi-playlist-plus</v-icon>
                                  </v-btn>
                                </template>
                              </v-card-text>

                              <v-divider></v-divider>

                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                  color="primary"
                                  text
                                  @click="addRequiredQuests()"
                                >
                                  Add Requirement
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </v-row>
                    </v-container>
                </v-row>
            </v-container>
          </div>
          <div class="text-subtitle-2 mt-2 text-decoration-underline">
            General:
          </div>
          <div>
            <v-container class="pa-0">
                <v-row no-gutters class="align-center">
                    <v-col v-if="editing.giver === true" cols="3">
                        <v-select
                            v-model="quest.giver"
                            :items="traders"
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
                            @click="editField('giver')"
                        >
                            <v-icon small>mdi-pencil</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>

                <v-row no-gutters class="align-center">
                    <v-col v-if="editing.wiki === true" cols="11">
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
                            @click="editField('wiki')"
                        >
                            <v-icon small>mdi-pencil</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>

                <v-row no-gutters class="align-center">
                    <v-col v-if="editing.gameId === true" cols="11">
                        <v-text-field
                            label="Game ID"
                            v-model="quest.gameId"
                            outlined
                            dense
                            hide-details
                        ></v-text-field>
                    </v-col>
                    <v-col v-else cols="auto">
                        Game ID: {{ quest.gameId }}
                    </v-col>
                    <v-col cols="auto">
                        <v-btn
                            icon
                            small
                            color="grey"
                            @click="editField('gameId')"
                        >
                            <v-icon small>mdi-pencil</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
          </div>
          <div class="text-subtitle-2 mt-2 text-decoration-underline">
            Rewards:
          </div>
          <div>
            <v-container class="pa-0">
              <v-row no-gutters class="align-center">
                    <v-col v-if="editing.exp === true" cols="3">
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
                            @click="editField('exp')"
                        >
                            <v-icon small>mdi-pencil</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row no-gutters class="align-center">
                    <v-container class="pa-0">
                        <v-row
                            no-gutters
                            v-for="(reputation, i) in quest.reputation"
                            :key="i"
                            class="align-center"
                        >
                            Reputation with {{ traderName(reputation.trader) }} {{ reputationNumber(reputation.rep) }}
                            <v-btn
                                icon
                                small
                                color="grey"
                                @click="removeReputation(i)"
                                title="Remove reputation change"
                            >
                                <v-icon small>mdi-playlist-remove</v-icon>
                            </v-btn>
                        </v-row>
                        <v-row
                          no-gutters
                          class="align-center"
                        >
                          <v-dialog
                            v-model="reputationDialog"
                            width="500"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                dark
                                v-bind="attrs"
                                v-on="on"
                                x-small
                              >
                                Add Reputation
                              </v-btn>
                            </template>

                            <v-card>
                              <v-card-title>
                                Add {{ quest.locales.en }} reputation changes
                              </v-card-title>

                              <v-card-text>
                                <v-select
                                    v-model="reputationTraderSelect"
                                    :items="traders"
                                    item-text="name"
                                    item-value="giverid"
                                    label="Trader"
                                    single-line
                                    dense
                                ></v-select>
                                <v-text-field
                                    label="Amount"
                                    v-model="reputationAmountSelect"
                                    outlined
                                    dense
                                    hide-details
                                    type="number"
                                ></v-text-field>
                              </v-card-text>

                              <v-divider></v-divider>

                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                  color="primary"
                                  text
                                  @click="addReputationChange()"
                                >
                                  Add Reputation Change
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </v-row>
                    </v-container>
                </v-row>
            </v-container>
          </div>
          <div class="text-subtitle-2 mt-2 text-decoration-underline">
            Objectives:
          </div>
          <div>
            <v-container class="pa-0">
              <v-row no-gutters class="align-center">
                <v-container class="pa-0">
                  <v-row
                      no-gutters
                      v-for="(objective, i) in quest.objectives"
                      :key="i"
                      class="align-center"
                  >
                     <b>Type:</b>&nbsp;{{ typeLanguage(objective.type) }}&nbsp;<b>Number:</b>&nbsp;{{ objective.number }}&nbsp;<b>Location:</b>&nbsp;{{ locationLanguage(objective.location) }}&nbsp;<b>Target:</b>&nbsp;{{ targetLanguage(objective.target) }}&nbsp;{{ objective.hint ? `Hint: ${objective.hint}` : ''}}&nbsp;<span v-if="objective.gps" class="font-weight-bold">Has GPS Coords</span>
                     <v-btn
                          icon
                          small
                          color="grey"
                          @click="quest.objectives.splice(i, 1)"
                          title="Remove this objective"
                      >
                          <v-icon small>mdi-playlist-remove</v-icon>
                      </v-btn>
                  </v-row>
                </v-container>
              </v-row>
              <v-row
                no-gutters
                class="align-center"
              >
                <v-dialog
                  v-model="objectiveDialog"
                  width="500"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      dark
                      v-bind="attrs"
                      v-on="on"
                      x-small
                    >
                      Add Objective
                    </v-btn>
                  </template>

                  <v-card>
                    <v-card-title>
                      Add {{ quest.locales.en }} objective
                    </v-card-title>

                    <v-card-text>
                      <v-select
                          v-model="objectiveTypeSelect"
                          :items="objectiveTypes"
                          item-text="name"
                          item-value="type"
                          label="Type"
                          single-line
                          dense
                      ></v-select>
                      <v-combobox
                        v-if="objectiveTypeSelect == 'mark'"
                        v-model="objectiveToolSelect"
                        :items="targets"
                        hide-no-data
                        hide-selected
                        item-text="name"
                        item-value="id"
                        label="Tool"
                        placeholder="Select item used for marking"
                        class="mt-2"
                        :ref="`${quest.id}targetselect`"
                      ></v-combobox>
                      <v-select
                          v-model="objectiveLocationSelect"
                          :items="locations"
                          item-text="name"
                          item-value="id"
                          label="Location"
                          single-line
                          dense
                      ></v-select>
                      <v-text-field
                          label="Number"
                          v-model="objectiveNumberSelect"
                          outlined
                          dense
                          hide-details
                          type="number"
                      ></v-text-field>
                      <v-combobox
                        v-model="objectiveTargetSelect"
                        :items="targets"
                        hide-no-data
                        hide-selected
                        item-text="name"
                        item-value="id"
                        label="Targets"
                        placeholder="Type target or select item"
                        class="mt-2"
                        :ref="`${quest.id}targetselect`"
                      ></v-combobox>
                      <v-text-field
                          label="Hint (Optional)"
                          v-model="objectiveHintSelect"
                          outlined
                          dense
                          hide-details
                      ></v-text-field>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="primary"
                        text
                        @click="addObjective()"
                      >
                        Add Objective
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
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
      editing: {},
      requireTypes: [
        { name: "Single Quest", "type": "single"},
        { name: "One-of-quest", "type": "oneof"}
      ],
      questRequireSelect: "single",
      requiredQuestSelects: [0],
      requiredDialog: false,
      reputationDialog: false,
      reputationTraderSelect: 0,
      reputationAmountSelect: 0.01,
      objectiveTypes: [
        { name: "Kill", type: "kill" },
        { name: "Find item in raid", type: "find" },
        { name: "Collect (not FIR)", type: "collect" },
        { name: "Pick up item", type: "pickup" },
        { name: "Place item", type: "place" },
        { name: "Mark location", type: "mark" },
        { name: "Locate (reach proximity)", type: "locate" },
        { name: "Key required", type: "key" },
        { name: "Achieve reputation", type: "reputation" },
        { name: "Achieve skill level", type: "skill" },
        { name: "Build weapon", type: "build" },
        { name: "Special condition warning", type: "warning" },
      ],
      objectiveDialog: false,
      objectiveTypeSelect: "kill",
      objectiveLocationSelect: -1,
      objectiveNumberSelect: 1,
      objectiveTargetSelect: "Scavs",
      objectiveHintSelect: "",
      objectiveToolSelect: null,
    }),
    computed: {
        locations: function() {
          var locations = Object.values(this.$store.copy('maps/data'))?.map(m => {
            return {name: m.locale.en, id: m.id}
          }) || []
          locations.unshift({name: "General warning", id: -2})
          locations.unshift({name: "Any location", id: -1})
          return locations
        },
        giver: function() {
            return Object.values(this.$store.copy('traders/data'))?.filter(t => t.id == this.quest.giver)[0]?.locale?.en || this.quest.giver
        },
        traders: function() {
            return Object.values(this.$store.copy('traders/data'))?.map(trader => {
                return {name: trader.locale.en, giverid: trader.id}
            }) || []
        },
        requiredSelectArray: function() {
          return this.questRequireSelect == "single" ? this.requiredQuestSelects.slice(0,1) : this.requiredQuestSelects
        },
        otherQuests: function() {
          return this.$store.copy('quests/data').filter(q => q.id != this.quest.id).map(q => {
            return {name: q.locales.en, id: q.id}
          })
        },
        targets: function() {
          return Object.values(this.$store.copy('items/data'))
        },
    },
    methods: {
      editField(field) {
          this.$set(this.editing, field, (this.editing[field] == true ? false : true))
      },
      removeQuestRequired(index) {
          this.quest.require.quests.splice(index, 1)
      },
      addRequiredQuests() {
          this.quest.require.quests.push(this.questRequireSelect == "single" ? this.requiredQuestSelects[0] : this.requiredQuestSelects)
          this.requiredDialog = false
      },
      traderName(traderIndex) {
        return Object.values(this.$store.copy('traders/data')).filter(t => t.id == traderIndex)[0]?.locale?.en || traderIndex
      },
      reputationNumber(number) {
        return `${number < 0 ? "" : "+"}${number}`
      },
      removeReputation(index) {
          this.quest.reputation.splice(index, 1)
      },
      addReputationChange() {
        this.quest.reputation.push({trader: this.reputationTraderSelect, rep: this.reputationAmountSelect})
        this.reputationDialog = false
      },
      typeLanguage(type) {
        return this.objectiveTypes.filter(t => t.type == type)[0].name
      },
      locationLanguage(location) {
        if (location == -2) {
          return "Nowhere"
        }
        return this.locations.filter(t => t.id == location)[0]?.name || location
      },
      targetLanguage(target) {
        return this.$store.copy(`items/data@${target}`)?.name || target
      },
      addObjective() {
        this.$refs[`${this.quest.id}targetselect`].blur();
        this.$nextTick(() => {
          debugger
        });
      }
    }
  }
</script>
