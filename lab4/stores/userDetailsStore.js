import { defineStore } from 'pinia';

export const useUserDetailsStore = defineStore('userDetailsStore', {
  state: () => ({
    age: null,
    location: {
      city: '',
      country: '',
    },
    rating: 0,
  }),
  actions: {
    updateDetails(age, city, country, rating) {
      this.age = age;
      this.location.city = city;
      this.location.country = country;
      this.rating = rating;
    },
  },
});
