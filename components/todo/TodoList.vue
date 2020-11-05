<template>
  <section>
    <div class="todo-add_container">
      <b-collapse
        aria-id="addTodo"
        class="todo-add"
        v-model="isCreationOpen"
        animation="slide"
      >
        <div
          slot="trigger"
          role="button"
          aria-controls="addTodo"
          class="todo-add_title"
        >
          <strong>Ajouter une tache</strong>
        </div>
        <div class="todo-add_content">
          <TodoForm :todo="todoDefault" @addTodoEvent="addTodo" :add="true" />
        </div>
      </b-collapse>
    </div>
    <div class="filters-container">
      <div class="filters-importance">
        <h3 class="title is-3">Filtres</h3>
        <b-field label="Importance">
          <b-select v-model="importanceSelected" id="importanceSelected">
            <option value="all">Tous</option>
            <option value="yellow">Jaune</option>
            <option value="orange">Orange</option>
            <option value="red">Rouge</option>
          </b-select>
        </b-field>
      </div>
    </div>
    <div class="card-container">
      <TodoItem
        @deleteTodoEvent="deleteTodo"
        @editTodoEvent="editTodo"
        v-for="todo in filterByImportance"
        :key="todo.id"
        :todo="todo"
      ></TodoItem>
      <b-modal
        v-model="updating"
        has-modal-card
        trap-focus
        :destroy-on-hide="false"
        aria-role="dialog"
        aria-modal
      >
        <TodoItemEdit
          :todo="todoUpdated"
          @saveTodoEvent="saveTodo"
          @close="open = false"
        ></TodoItemEdit>
      </b-modal>
    </div>
  </section>
</template>

<script>
import TodoItem from "@/components/todo/TodoItem";
import TodoItemEdit from "@/components/todo/TodoItemEdit";
import TodoForm from "@/components/todo/TodoForm";

export default {
  name: "TodoList",
  components: {
    TodoItem,
    TodoItemEdit,
    TodoForm,
  },
  data() {
    return {
      todos: [
        {
          id: 1,
          title: "Faire la vaisselle",
          description: "Je dois faire la vaisselle, c'est important",
          importance: "orange",
          date: new Date(),
          completed: false,
        },
        {
          id: 2,
          title: "Laver la SDB",
          description: "Je dois laver la SDB, c'est important",
          importance: "yellow",
          date: new Date(),
          completed: false,
        },
        {
          id: 3,
          title: "Finir la todo liste",
          description: "Je dois la finir rapidement",
          importance: "red",
          date: new Date(),
          completed: false,
        },
      ],
      updating: false,
      todoDefault: {
        id: Number,
        title: "",
        description: "",
        importance: "",
        date: new Date(),
        completed: false,
      },
      todoUpdated: Object,
      isCreationOpen: false,
      open: false,
      importanceSelected: "all",
    };
  },
  computed: {
    filterByImportance() {
      if (this.importanceSelected != "all") {
        return this.todos.filter((todo) => {
          return todo.importance.includes(this.importanceSelected);
        });
      } else {
        return this.todos;
      }
    },
  },
  methods: {
    addTodo(item) {
      console.log(item);
      if (item.title && item.description && item.importance) {
        this.todos.push({
          id: this.todos.length + 1,
          title: item.title,
          description: item.description,
          importance: item.importance,
          date: item.date,
        });
      } else {
        console.log("error");
      }
    },
    deleteTodo(item) {
      var index = this.todos.indexOf(item);
      this.todos.splice(index, 1);
      /*       this.todos = this.todos.filter(todo => todo.id !== id);
       */
    },
    editTodo(item) {
      this.updating = true;
      this.todoUpdated = item;
    },
    saveTodo() {
      console.log(this.todoUpdated);
    },
  },
};
</script>

<style>
.filters-container {
  margin-top: 30px;
}
.card-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-columns: 300px;
  gap: 10px 10px;
  margin-top: 60px;
}
</style>

