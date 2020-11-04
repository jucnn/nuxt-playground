<template>
  <div>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          {{ todo.title }}
        </p>
        <span
          class="card-header-importance"
          :importance="todo.importance"
        ></span>
      </header>
      <div class="card-content">
        <div class="content">
          <p class="content-time">
            <time>Date de fin : {{ selectedDate }}</time>
          </p>
          <span> {{ todo.description }}</span>
        </div>
      </div>
      <footer class="card-footer">
        <b-button
          type="is-info is-light"
          class="card-footer-item"
          @click="editTodo"
          >Edit</b-button
        >
        <b-button
          @click="deleteTodo"
          type="is-danger is-light"
          class="card-footer-item"
          >Delete</b-button
        >
      </footer>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "TodoItem",
  props: {
    todo: Object
  },
  computed: {
    selectedDate: function() {
      return dayjs(this.todo.date).format("DD/MM/YYYY");
    }
  },
  methods: {
    deleteTodo(event) {
      this.$emit("deleteTodoEvent", this.todo);
    },
    editTodo(event) {
      this.$emit("editTodoEvent", this.todo);
    }
  }
  
};
</script>

<style>
.card-header span[importance="yellow"] {
  background-color: #fff971;
}
.card-header span[importance="orange"] {
  background-color: #ff8b00;
}
.card-header span[importance="red"] {
  background-color: #ff0000;
}

.card-header {
  display: flex;
  align-items: center;
}
.card-header span {
  width: 20px;
  height: 20px;
  border-radius: 100%;
  margin-right: 20px;
}

.content-time {
  text-align: right;
  font-size: 12px;
  color: grey;
}

.card-content span {
  padding: 5px;
}
</style>
