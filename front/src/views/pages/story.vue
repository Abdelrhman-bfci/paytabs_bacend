<template>
  <v-container id="story" fluid tag="section">
    <v-skeleton-loader
      v-if="$store.getters['story/storyLoad']"
      class="mx-auto"
      type="table-heading, list-item-two-line, image, table-tfoot"
    ></v-skeleton-loader>
    <v-row justify="center" v-else>
      <v-col cols="12" md="12">
        <base-material-card>
          <template v-slot:heading>
            <div class="font-weight-light">
              Wirte your story
            </div>
          </template>

          <v-form ref="edit">
            <v-container class="py-0">
              <v-row class="pt-5">
                <v-col cols="12" md="6" class="d-flex">
                  <v-icon class="mr-3">
                    mdi-rename-box
                  </v-icon>
                  <v-text-field label="Story Name" v-model="story.name" class="purple-input"/>
                </v-col>

                <v-col cols="12" md="6" class="d-flex">
                  <v-icon class="mr-3">
                    mdi-format-list-numbered
                  </v-icon>
                  <v-text-field label="Story Number" v-model="story.story_number" class="purple-input"/>
                </v-col>

                <v-col cols="12" md="6" class="d-flex">
                  <v-icon class="mr-3">
                    mdi-message-image
                  </v-icon>
                  <v-text-field label="Story Icon" v-model="story.icon" class="purple-input"/>
                </v-col>

                <v-col cols="12" md="6" class="d-flex">
                  <v-icon class="mr-3">
                    mdi-image-multiple
                  </v-icon>
                  <v-combobox
                    v-model="story.images"
                    label="Story Images"
                    multiple
                    chips
                    clearable
                  ></v-combobox>
                </v-col>

                <v-col cols="12" md="6" class="d-flex">
                  <v-icon class="mr-3">
                    mdi-format-text
                  </v-icon>
                  <v-text-field label="Phrase" v-model="story.phrase" class="purple-input"/>
                </v-col>

                <v-col cols="12" md="6" class="d-flex">
                  <v-icon class="mr-3">
                    mdi-checkbox-marked
                  </v-icon>
                  <v-select
                    v-model="story.right_keywords"
                    :items="all_words"
                    attach
                    chips
                    label="Right Keywords"
                    multiple
                    clearable
                  ></v-select>
                </v-col>

                <v-col cols="12" md="6" class="d-flex">
                  <v-icon class="mr-3">
                    mdi-close-box
                  </v-icon>
                  <v-select
                    v-model="story.wrong_keywords"
                    :items="all_words"
                    attach
                    chips
                    label="Wrong Keywords"
                    multiple
                    clearable
                  ></v-select>
                </v-col>

                <v-col cols="12" md="6" class="d-flex">
                  <v-icon class="mr-3">
                    mdi-message-image
                  </v-icon>
                  <v-text-field label="Story End" v-model="story.end" class="purple-input"/>
                </v-col>

                <v-col cols="12" class="text-right">
                  <v-btn @click="save" color="success" class="mr-0">
                    Add story
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import Vue from "vue";

  export default {
    name: 'story',
    data() {
      return {
        story: {
          name: '',
          story_number: '',
          icon: '',
          images: [],
          phrase: '',
          right_keywords: [],
          wrong_keywords: [],
          end:''
        },
        // allwords: [],
      }
    },
    computed: {
      all_words() {
        if (this.story.phrase !== " ") {
          return this.story.phrase.split(" ");
        }
      }
    },

    methods: {
      save() {
        this.$store.dispatch('story/save', {id: ``, query: this.story}).then(_ => {
          this.story = {
            name: '',
            story_number: '',
            icon: '',
            images: [],
            phrase: '',
            right_keywords: [],
            wrong_keywords: [],
            end:''
          }
          this.$notify({
            group: 'foo',
            title: 'Store Story Success',
            type: 'success',
            text: 'this story is storied Done Successful Thank You Man '
          })
        });
      }
    },
  }

</script>

<style scoped>
  .v-input__slot {
    width: 100%;
  }

  i {
    font-size: 30px !important;
    color: #4CAFAF !important;
  }
</style>
