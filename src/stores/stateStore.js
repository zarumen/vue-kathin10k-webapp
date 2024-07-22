import { defineStore } from 'pinia';
import axios from '@/plugins/axios';

export const useStateStore = defineStore('stateStore', {
  state: () => ({
    states: [],
    districts: [],
    wats: [],
    hasSaved: false,
    isLoading: false,
  }),
  actions: {
    async fetchStates() {
      console.log('Fetching')
      try {
        const response = await axios.getData('/tabs/Provinces'); // Replace with your API endpoint
        this.states = response.data;
      } catch (error) {
        console.error('Failed to fetch states:', error);
      }
    },
    async fetchDistrict(id) {
      try {
        const response = await axios.getData(`/tabs/Districts/provincenumber/${id}`); // Replace with your API endpoint
        this.districts = response.data;
      } catch (error) {
        console.error('Failed to fetch districts:', error);
      }
    },
    async fetchWat(id) {
      this.isLoading = true;
      try {
        const response = await axios.getData(`/tabs/Data/amphur-id/${id}`); // Replace with your API endpoint
        this.wats = response.data;
        this.isLoading = false;
      } catch (error) {
        console.error('Failed to fetch wats:', error);
        this.isLoading = true;
      }
    },
    save(id) {
      console.log('ID: ' + id)
      this.hasSaved = true
    },
  },
});