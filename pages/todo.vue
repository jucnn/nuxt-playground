<template>
  <section class="section">
      <h1 class="title">Liste des tâches</h1>
      <TodoList></TodoList>
  </section>
</template>

<script>
import TodoList from '@/components/todo/TodoList'
export default {
    name:'todo',
    components: {
        TodoList
    }
}
</script>