<template>
  <div>
    <modal-form>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Modifier le todo</p>
        </header>
        <section class="modal-card-body">
          <TodoForm :todo="todo" :edit="true" :add="false" v-on="$listeners"> </TodoForm>
        </section>
      </div>
    </modal-form>
  </div>
</template>

<script>
import TodoForm from "@/components/todo/TodoForm";

export default {
  name: "TodoItemEdit",
  props: {
    todo: Object
  },
  components: {
    TodoForm
  }
};
</script>
