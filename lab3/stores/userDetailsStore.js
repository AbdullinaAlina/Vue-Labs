import { defineStore } from 'pinia';

export const useUserDetailsStore = defineStore('userDetailsStore', {
  state: () => ({
    age: null,
    address: {
      city: '',
      country: '',
    },
    rating: 0,
  }),
  actions: {
    updateDetails(age, city, country, rating) {
      this.age = age;
      this.address.city = city;
      this.address.country = country;
      this.rating = rating;
    },
  },
});
