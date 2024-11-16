<template>
    <li :class="[taskClass, 'todo__item']">
    <span>{{ task.title }}</span>
    <div class="todo__actions">
        <button @click="markComplete">Complete</button>
        <button @click="deleteTask">Delete</button>
    </div>
    </li>
   
  </template>
  
  <script lang="ts">

  import { defineComponent, PropType } from 'vue';
  import { Task } from './TaskInterface.ts';
  
  export default defineComponent({
    props: {
      task: {
        type: Object as PropType<Task>,
        required: true,
      },
    },
    emits: ['markComplete', 'deleteTask'],
    computed: {
      taskClass() {
        return {
          'task-completed': this.task.completed,
          'task-high-priority': this.task.priority === 'high',
        };
      },
    },
    methods: {
      markComplete() {
        this.$emit('markComplete', this.task.id);
      },
      deleteTask() {
        this.$emit('deleteTask', this.task.id);
      },
    },
  });
  </script>
  
  <style>
  .todo__item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .todo__actions {
    display: flex;
    flex-direction: row;
    gap: 12px;
  }

  .task-completed {
    display: flex;
    justify-content: space-between;
    text-decoration: line-through;
    opacity: 0.6;
  }
  .task-high-priority {
    font-weight: 800;
    color: red;
  }
  </style>
  