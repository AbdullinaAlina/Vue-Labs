<!-- components/Post.vue -->
<template>
  <div class="card">
    <div class="card__header">
      <NuxtLink v-if="user" :to="profileLink">
        <div class="card__user">
          <img
            class="card__avatar"
            :src="user.Avatar ? user.Avatar : '/assets/no_pfp.svg'"
            alt="Avatar"
          />
        </div>
      </NuxtLink>

      <div class="card__info">
        <div class="card__posted">
          <h2 class="card__username">{{ userStore.getDisplayName(user.id) }}</h2>

          <p class="card__date">{{ formattedPubDate }}</p>
        </div>

        <div class="card__rating">
          <font-awesome
            v-for="star in Math.floor(post.likeCount / 4)"
            :icon="['fas', 'star']"
            :key="`full-${star}`"
          />

          <font-awesome
            v-if="post.likeCount % 4 >= 2"
            :icon="['fas', 'star-half-stroke']"
          />

          <font-awesome
            v-for="star in (5 - Math.floor(post.likeCount / 4)) - (post.likeCount % 4 >= 2 ? 1 : 0)"
            :icon="['far', 'star']"
            :key="`empty-${star}`"
          />
        </div>
      </div>
    </div>
    <p class="card__content">{{ post.Commentary }}</p>

    <div class="card__actions" >
      <button
        class="card__like-button"
        @click="toggleLike(post.id)"
        :style="{ color: isLiked ? '#007BFF' : '#cccccc' }"
        :disabled="!isAuth || isAuthor"
      >
        <font-awesome :icon="['fas', 'thumbs-up']" />
        {{ post.likeCount }}
      </button>

      <button
        v-if="isAuthor"
        class="card__delete-button"
        @click="deletePost"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script>
import { format, formatDistanceToNow, isToday, isYesterday } from "date-fns";
import { useStore } from "../stores/useStore";
import { useUserStore } from "~/stores/userStore";

export default {
  props: {
    post: {
      type: Object,
      required: true,
      validator(value) {
        return value?.userId && typeof value.userId === "string";
      },
    },
  },
  data() {
    return {
      user: null, 
    };
  },
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  computed: {
    isAuth() {
      const userStore = useUserStore();

      return this.userStore.user.isAuth;
    },
    isAuthor() {
      const userStore = useUserStore();
      return String(userStore.user?.id) === String(this.post?.userId);
    },
    isLiked() {
      const userStore = useUserStore();
      return userStore.user.likedPosts.includes(this.post.id);
    },
    profileLink() {
      if (this.isAuthor) {
        return "/profile";
      }
      return this.user ? `/user/${this.user.id}` : "#";
  },
    formattedPubDate() {
      const pubDate = new Date(this.post.PubDate);
      const now = new Date();

      if (isToday(pubDate)) {
        return `Today, ${format(pubDate, "HH:mm")}`;
      } else if (isYesterday(pubDate)) {
        return `Yesterday, ${format(pubDate, "HH:mm")}`;
      } else if (now - pubDate < 7 * 24 * 60 * 60 * 1000) {
        const daysAgo = formatDistanceToNow(pubDate, { addSuffix: true });
        return `${daysAgo}, ${format(pubDate, "HH:mm")}`;
      } else {
        return format(pubDate, "dd.MM.yyyy");
      }
    },
  },
  methods: {
    toggleLike() {
      const userStore = useUserStore();
      if (this.isLiked) {
        userStore.unlikePost(this.post.id);
      } else {
        userStore.likePost(this.post.id);
      }
    },
    fetchUser() {
      const userStore = useStore();
      const foundUser = userStore.getUserById(this.post.userId);
      if (!foundUser) {
        console.warn(`User with ID ${this.post.userId} not found.`);
        this.user = { id: 0, name: "Unknown", Avatar: "/assets/no_pfp.svg" };
      } else {
        this.user = foundUser;
      }
    },
    async deletePost() {
      const store = useStore();
      await store.deletePost(this.post.id);

      // Add logic for deleting the post
    },
  },
  watch: {
    post: {
      immediate: true,
      handler(newPost) {
        if (newPost?.userId) {
          this.fetchUser();
        }
      },
    },
  },
};
</script>

<style scoped>
.card {
  background-color: #5bb9cd;
  color: #ffffff;
  border-radius: 10px;
  padding: 24px;
  text-align: left;
  width: 100%;
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
  margin-bottom: 8px;
}

.card__content {
  margin-bottom: 8px;
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

.card__actions {
  display: flex;
  justify-content: space-between;
}

.card__like-button {
  background-color: #ffffff;
  color: #F4E285;
  padding: 4px 16px;
  border-radius: 100px;

}

.card__delete-button {
  text-transform: uppercase;
  background-color: #EF2757;
  border-radius: 8px;
  color: #ffffff;
  padding: 4px 12px;
}

.card__rating {
  display: flex;
  flex-direction: row;
  color: #F4E285;
  gap: 2px;
}

button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #43ef27;
}

button i {
  margin-right: 5px;
}

@media (max-width: 768px) {
  .card {
    padding: 12px; /* Reduce padding on mobile */
  }

  .card__posted {
    flex-direction: column; /* Stack post info vertically */
    align-items: flex-start; /* Align text to the left */
    gap: 4px; /* Reduce spacing between elements */
  }
}

.card__avatar {
  object-fit: cover; /* Prevent image distortion */
}
</style>
