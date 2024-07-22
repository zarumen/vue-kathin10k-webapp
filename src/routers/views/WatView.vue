<template>
  <!-- <div>
    province: {{ $route.params.id }}
    <v-btn @click="back">back</v-btn>
  </div> -->
  <v-card
    flat
    class="mx-auto my-4"
    color="surface-variant"
    max-width="800"
    variant="outlined"
  >
    <v-toolbar>
      <v-select
        class="ml-2 my-auto"
        v-model="districtSelected"
        label="เลือกอำเภอ"
        :items="stateStore.districts"
        :item-props="itemProps"
        item-value="id"
        color="orange darken-4"
        variant="solo-filled"
      ></v-select>
      <v-spacer></v-spacer>
      <v-btn
        prepend-icon="mdi-check-circle"
        color="orange darken-4"
        variant="outlined"
        @click="fetch"
      >
        เลือก
      </v-btn>
    </v-toolbar>
  </v-card>
  <v-card
    flat
    class="mx-auto"
    color="surface-variant"
    max-width="800"
    variant="outlined"
  >
    <v-card-title class="d-flex align-center pe-2">
      <v-icon icon="mdi-video-input-component"></v-icon> &nbsp;
      รายชื่อวัดในอำเภอ
      <v-spacer></v-spacer>

      <v-text-field
        v-model="search"
        density="compact"
        label="ค้นหาชื่อวัด"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        flat
        hide-details
        single-line
      ></v-text-field>
    </v-card-title>

    <v-divider></v-divider>
    <v-data-table
      v-model:search="search"
      :items="stateStore.wats"
      :headers="headers"
      :loading="stateStore.isLoading"
    >
    <template v-slot:item.id="{ item }">
      <v-btn
        color="orange darken-4"
        rounded
        :disabled="isWorking[item.id]"
        :loading="isWorking[item.id]"
        @click.stop="copyId(item.id)"
      >
        <template v-slot:loader>
          <v-expand-transition>
            Copied
          </v-expand-transition>
        </template>
        {{ item.id }}
      </v-btn>
    </template>
    <template v-slot:item.wat-type="{ item }">
      <v-chip
        :color="item['wat-type'] === 'พระอารามหลวง' ? 'red' : '#F7BB70'"
        size="small"
        label
      >
        {{ item['wat-type'] }}
      </v-chip>
    </template>
    </v-data-table>
  </v-card>
  <v-card
    flat
    class="ma-5"
    color="transparent"
  >
    <v-row justify="center">
      <v-col cols="auto">
        <v-btn
          variant="outlined"
          height="72"
          min-width="164"
          @click="back"
        >
          กลับสู่หน้าแรก
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { useStateStore } from '@/stores/stateStore';
import useClipboard from 'vue-clipboard3'

const stateStore = useStateStore()
const route = useRoute()
const router = useRouter()
const { toClipboard } = useClipboard()
const districtSelected = ref()
const search = ref()
let isWorking = ref({})

const headers = [
  {
    title: 'จังหวัด',
    align: 'start',
    key: 'province',
  },
  {
    title: 'อำเภอ',
    align: 'start',
    key: 'amphur',
  },
  {
    title: 'ตำบล',
    align: 'start',
    key: 'tumbol',
  },
  {
    title: 'ชื่อวัด',
    align: 'start',
    key: 'wat-fullname',
  },
  {
    title: 'ID วัด',
    align: 'start',
    key: 'id',
  },
  {
    title: 'ประเภทวัด',
    align: 'end',
    key: 'wat-type',
  },
]

onMounted(() => {
  stateStore.fetchDistrict(route.params.id)
});

const itemProps = (item) => {
  return {
    title: item['attributes/name'],
    subtitle: item.displayname
  }
}

const fetch = () => {
  if(districtSelected.value) return stateStore.fetchWat(districtSelected.value)
}

const back = () => {
  router.push('/')
}

const copyId = async (id) => {
  try {
    await toClipboard(id)
    isWorking.value[id] = true; // Start animation for the specific button
    setTimeout(() => {
      isWorking.value[id] = false; // Stop animation after 2 seconds
    }, 1000);
  } catch (e) {
    console.error(e)
  }
}

</script>