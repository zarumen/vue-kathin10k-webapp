<template>
  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
      max-width="900"
    >
      <v-img
        class="mb-4"
        height="150"
        src="@/assets/kathin.png"
      />

      <div class="text-center">
        <div class="text-body-2 font-weight-light mb-n1">ถวาย</div>

        <h1 class="text-h2 font-weight-bold">กฐิน 10,000 วัด</h1>
      </div>

      <div class="py-4" />

      <v-row>

        <v-col cols="12">
          <v-card
            class="mx-auto"
            color="surface-variant"
            max-width="500"
            variant="outlined"
          >
            <v-toolbar color="orange darken-4" flat>
              <v-btn icon="mdi-information"></v-btn>

              <v-toolbar-title class="font-weight-light">
                กรุณาเลือกจังหวัด
              </v-toolbar-title>

              <v-spacer></v-spacer>

            </v-toolbar>

            <v-card-text>

              <v-autocomplete
                v-model="search"
                :custom-filter="customFilter"
                :items="stateStore.states"
                color="orange accent-4"
                item-title="province"
                item-value="number"
                variant="outlined"
                label="จังหวัด"
              ></v-autocomplete>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                color="orange darken-4"
                variant="outlined"
                @click="save"
              >
                Next
              </v-btn>
            </v-card-actions>

            <!-- <v-snackbar
              v-model="stateStore.hasSaved"
              :timeout="2000"
              location="bottom left"
              position="absolute"
              attach
            >
              Your profile has been updated
            </v-snackbar> -->
          </v-card>
        </v-col>

      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useStateStore } from '@/stores/stateStore';
import { useRouter, useRoute } from 'vue-router';

const stateStore = useStateStore();
const search = ref()
const router = useRouter()
const route = useRoute()

onMounted(() => {
  stateStore.fetchStates();
});

const customFilter = (itemTitle, queryText, item) => {
  console.log('item title: ' + itemTitle)
  console.log('query text: ' + queryText)
  console.log('item: ' + JSON.stringify(item))
  const textOne = item.raw.province;
  const textTwo = item.raw.zone;
  const searchText = queryText.toLowerCase();

  return textOne.includes(searchText) || textTwo.includes(searchText);
};

const save = () => {
  stateStore.save(search.value);
  router.push({ path: `/wat/${search.value}` })
    .then(() => {
      console.log('Navigation complete: ' + route.fullPath);
    })
};
</script>
