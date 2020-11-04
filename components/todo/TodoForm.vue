<template>
  <div>
    <b-field label="Titre">
      <b-input v-model="todo.title" type="text" />
    </b-field>
    <b-field label="Description">
      <b-input v-model="todo.description" type="text" />
    </b-field>
    <b-field label="Importance">
      <div class="todo-add_importance">
        <div class="todo-add_importance-input">
          <input
            type="radio"
            v-model="todo.importance"
            id="yellow"
            value="yellow"
          />
          <label for="yellow">
            <span class="todo-add_importance--yellow"></span>
          </label>
        </div>
        <div class="todo-add_importance-input">
          <input
            type="radio"
            v-model="todo.importance"
            id="orange"
            value="orange"
          />
          <label for="orange">
            <span class="todo-add_importance--orange"></span>
          </label>
        </div>
        <div class="todo-add_importance-input">
          <input type="radio" v-model="todo.importance" id="red" value="red" />
          <label for="red">
            <span class="todo-add_importance--red"></span>
          </label>
        </div>
      </div>
    </b-field>
    <b-field label="Date">
      <b-datepicker
        v-model="todo.date"
        placeholder="Cliquez pour sélectionner une date..."
        icon="calendar-today"
        trap-focus
      >
      </b-datepicker>
    </b-field>
    <b-button
      v-if="add"
      @click="addTodo"
      class="todo-add_button is-success"
      expanded
      >Ajouter</b-button
    >
    <b-button v-if="edit" @click="saveTodo" class="is-success" expanded
      >Modifier</b-button
    >
  </div>
</template>

<script>
/* import dayjs from "dayjs";
 */
export default {
  name: "TodoForm",
  props: {
    todo: Object,
    add: false,
    edit: false
  },
  data() {
    return {
      showWeekNumber: false,
      locale: undefined,
      importance: ""
    };
  },
  methods: {
    addTodo(event) {
      this.$emit("addTodoEvent", this.todo);
    },
    saveTodo(event) {
      this.$emit("saveTodoEvent");
    }
  }
};
</script>
