<template>
    <div class="sidebar">
        <div class="sidebar__icon" :style="{ visibility: isSideBarOpen ? 'hidden' : 'visible' }" @click="toggleSideBar">
            <i class="fa-solid fa-bars"></i>
        </div>
        
        <div class="sidebar__menu" v-show="isSideBarOpen">
            <button class="sidebar__button"  @click="toggleSideBar">
                Menu
            </button>

            <ul class="sidebar__categories">
                <li v-for="(category, index) in categories" :key=index @click="selectCategory(category)">
                    {{ category }}
                </li>
            </ul>

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isSideBarOpen: false,
                categories: ['Show All','Design', 'Technology', 'Science', 'Business', 'Health'],
            }
        },
        methods: {
            toggleSideBar() {
                this.isSideBarOpen = !this.isSideBarOpen;
            },
            selectCategory(category) {
                if (category === 'Show All') {
                    this.$emit('categorySelected', null);
                } else {
                this.$emit('categorySelected', category);
                }
                this.toggleSideBar();
            }
        }
    }
</script>

<style scoped>
.sidebar {
    position: relative;
    width: 60px; /* Default width when closed */
    transition: width 1s ease-in;
    z-index: 1;
}

.sidebar__icon {
    cursor: pointer;
    border-radius: 100%;
    padding: 16px;
    background-color: #ff6b6b;
    color: #fff;
    text-align: center;
}

.sidebar__menu {
    background-color: #f4f4f4;
    width: 420px;
    padding: 16px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    font-size: 28px;
    font-weight: 600;
    position: fixed;
    top: 0;
    left: 0;
    cursor: pointer;
    transition: all 0.3s ease;
}

.sidebar__categories li:hover {
    color: #dadada
}

ul {
    list-style-type: none;
    padding: 0;
}

ul li {
    margin-bottom: 12px;
}

.sidebar__button {
    background-color: #ff6b6b;
    border: none;
    padding: 8px 16px;
    color: white;
    cursor: pointer;
    margin-bottom: 16px;
    display: inline-block;
}
</style>