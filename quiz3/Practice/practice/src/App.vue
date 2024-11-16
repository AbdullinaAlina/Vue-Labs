<template>
  <!-- <HelloWorld /> -->
   <ToDoList />
   
</template>

<script>
import ToDoItem from './components/ToDoItem.vue';
import ToDoList from './components/ToDoList.vue';

export default {
  components: {
    ToDoList,
    ToDoItem
  }
}
</script>