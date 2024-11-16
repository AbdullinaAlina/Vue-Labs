<template>
    <div class="todo-list">
      <h1>To-Do List</h1>
      <div class="todo-list__form">
        <input v-model="newTaskTitle" placeholder="Task Title" class="todo-list__input"/>
        <select v-model="newTaskPriority" class="todo-list__input">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        </select>
        <button @click="addTask">Add Task</button>
  
      </div>
      
      <p>Pending Tasks: {{ pendingTasks }}</p>
  
      <TransitionGroup name="list" tag="ul">
        <ToDoItem 
          v-for="task in sortedTasks" 
          :key="task.id" 
          :task="task" 
          @markComplete="markComplete" 
          @deleteTask="deleteTask" 
        />
      </TransitionGroup>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed, nextTick, watch, TransitionGroup } from 'vue';
  import { Task } from './TaskInterface.ts';
import ToDoItem from './ToDoItem.vue';

  export default defineComponent({

    components: { ToDoItem },

    setup() {
      const tasks = ref<Task[]>([]);
      const newTaskTitle = ref('');
      const newTaskPriority = ref<'low' | 'medium' | 'high'>('low');
      const nextId = ref(1);
  
      const addTask = () => {
        if (!newTaskTitle.value) return;
        tasks.value.push({
          id: nextId.value++,
          title: newTaskTitle.value,
          priority: newTaskPriority.value,
          completed: false,
        });

        newTaskTitle.value = '';
        newTaskPriority.value = 'low';
  
        nextTick(() => {
          const list = document.querySelector('.todo-list ul');
          if (list) list.scrollTop = list.scrollHeight;
        });
      };
  
      const markComplete = (id: number) => {
        const task = tasks.value.find((t) => t.id === id);
        if (task) task.completed = !task.completed;
      };
  
      const deleteTask = (id: number) => {
        tasks.value = tasks.value.filter((t) => t.id !== id);
      };
  
      const sortedTasks = computed(() => {
        return [...tasks.value].sort((a, b) => {
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        });
      });
  
      const pendingTasks = computed({
        get() {
            return tasks.value.filter((t) => !t.completed).length
        },
        set() {

        }
    });
  
      watch(
        tasks,
        (newTasks) => {
          console.log(`Task list updated. ${newTasks.length} tasks available.`);
        },
        { deep: true }
      );
  
      return {
        tasks,
        newTaskTitle,
        newTaskPriority,
        sortedTasks,
        addTask,
        markComplete,
        deleteTask,
        pendingTasks,
      };
    },
  });
  </script>
  
  <style>
  .todo-list__form {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px
  }
  .todo-list__input {
    height: 36px;
  }
  .todo-list ul {
    list-style: none;
    padding: 0;
  }
  .list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
  </style>
  