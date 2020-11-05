<template>
  <div>
    <b-field label="Titre">
      <b-input v-model="todo.title" type="text" />
    </b-field>
    <b-field label="Description">
      <b-input v-model="todo.description" type="text" />
    </b-field>
    <b-field label="Importance">
      <div v-if="add" class="todo-add_importance">
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
      <div v-if="edit" class="todo-add_importance">
        <div class="todo-add_importance-input">
          <input
            type="radio"
            v-model="todo.importance"
            id="yellow-2"
            value="yellow"
          />
          <label for="yellow-2">
            <span class="todo-add_importance--yellow"></span>
          </label>
        </div>
        <div class="todo-add_importance-input">
          <input
            type="radio"
            v-model="todo.importance"
            id="orange-2"
            value="orange"
          />
          <label for="orange-2">
            <span class="todo-add_importance--orange"></span>
          </label>
        </div>
        <div class="todo-add_importance-input">
          <input
            type="radio"
            v-model="todo.importance"
            id="red-2"
            value="red"
          />
          <label for="red-2">
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
      >Sauvegarder</b-button
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
      locale: undefined
    };
  },
  methods: {
    addTodo(event) {
      this.$emit("addTodoEvent", this.todo);
    },
    saveTodo(event) {
      this.$emit("saveTodoEvent");
      this.$emit("close");
    }
  }
};
</script>

<style>
.todo-add {
  margin-top: 10px;
  border-radius: 5px;
  max-width: 500px;
}

.todo-add_title {
  padding: 15px;
  background-color: #dfdfdf;
}

.todo-add_content {
  padding: 20px;
  background-color: #f2f2f2;
}

.todo-add_button {
  margin-top: 30px;
}

.todo-add_importance {
  display: flex;
  justify-content: space-around;
}

.todo-add_importance input {
  display: none;
}

.todo-add_importance input:checked + label span {
  border: 2px solid #363636;
}

.todo-add_importance label span {
  width: 40px;
  height: 40px;
  display: inline-block;
  border-radius: 100%;
  cursor: pointer;
}

.todo-add_importance--yellow {
  background-color: #fff971;
}

.todo-add_importance--orange {
  background-color: #ff8b00;
}

.todo-add_importance--red {
  background-color: #ff0000;
}
</style>
