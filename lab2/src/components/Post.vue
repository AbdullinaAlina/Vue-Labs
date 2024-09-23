<template>
    <div class="card">
        <div class="card__header">
            <div class="card__user">
                <img class="card__avatar" :src="post.Avatar ? post.Avatar : 'src/assets/no_pfp.svg'" alt="Avatar">
            </div>
            <div class="card__info">
                <div class="card__posted">
                    <h2 class="card__username">{{ post.PersonName }}</h2>
                    <p class="card__date">{{ post.PubDate }}</p>
                </div>

                <div class="card__rating">
                    <i v-for="star in Math.floor(post.likeCount / 4)" 
                    class="fa-star fa-solid"></i>

                    <i v-if="post.likeCount % 4 >= 2" 
                    class="fa-regular fa-star-half-stroke"></i>

                    <i v-for="star in ( 5 - Math.floor(post.likeCount / 4)) - (post.likeCount % 4 >= 2 ? 1 : 0)" 
                    class="fa-star fa-regular"></i>

                </div>

            </div>
            
        </div>
        <p class="card__content">{{ post.Commentary }}</p>
        <!-- <p>{{ post.Topic }}</p> -->

      <!-- Like button -->
    <button class="card__like-button" @click="toggleLike" :style="{color: post.isLiked ? '#007BFF' : '#cccccc'}">
        <i class="fa fa-thumbs-up"></i>
        {{ post.likeCount }}
    </button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      post: Object  // We will pass the person object as a prop from the parent component
    },
    methods: {
        toggleLike() {
        this.post.isLiked = !this.post.isLiked;
        this.post.likeCount += this.post.isLiked ? 1 : -1;
        }
  }
  }
  </script>
  
  <style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 24px;
  width: 600px;
  text-align: left;
}

.card__header {
    display: flex;
    flex-direction: row;
    gap: 8px;
    margin-bottom: 8px;
}

.card__info {
    width: 100%;
}

.card__posted {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card__username {
    font-size: 16px;
}

.card__date {
    font-size: 14px;
}

.card__user {
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: center;
}


.card__avatar {
    border-radius: 100%;
    width: 56px;
    height: 56px;
}

.card__like-button {
    padding: 4px 8px;
}

.card__rating {
    display: flex;
    flex-direction: row;
    color: #FFD700; /* Gold for stars */
    gap: 2px;
}

button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #007BFF;
}
button i {
  margin-right: 5px;
}
</style>
  