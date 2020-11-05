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
      <h3 class="title is-3">Filtres</h3>
      <div class="filters-content">
        <div class="filters-item filters-importance">
          <b-field label="Importance">
            <b-select v-model="importanceSelected" id="importanceSelected">
              <option
                v-for="importance in importanceType"
                :key="importance.value"
                :value="importance.value"
              >
                {{ importance.text }}
              </option>
            </b-select>
          </b-field>
        </div>
        <div class="filters-item filters-date">
          <b-field label="Trier par :">
            <b-select
              v-model="orderedSelected"
              @change.native="orderedBy($event)"
            >
              <option
                v-for="option in orderedType"
                :value="option.value"
                :key="option.value"
              >
                {{ option.text }}
              </option>
            </b-select>
          </b-field>
        </div>
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
    <div>
      {{ allTodos }}
    </div>
  </section>
</template>

<script>
import TodoItem from "@/components/todo/TodoItem";
import TodoItemEdit from "@/components/todo/TodoItemEdit";
import TodoForm from "@/components/todo/TodoForm";
import { mapGetters, mapMutations } from "vuex";

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
          date: new Date("December 4, 2020 03:24:00"),
        },
        {
          id: 2,
          title: "Laver la SDB",
          description: "Je dois laver la SDB, c'est important",
          importance: "yellow",
          date: new Date("December 5, 2020 03:24:00"),
        },
        {
          id: 3,
          title: "Finir la todo liste",
          description: "Je dois la finir rapidement",
          importance: "red",
          date: new Date("December 3, 2020 03:24:00"),
        },
      ],
      todoDefault: {
        id: Number,
        title: "",
        description: "",
        importance: "",
        date: new Date(),
      },
      updating: false,
      todoUpdated: Object,
      isCreationOpen: false,
      open: false,
      importanceSelected: "all",
      importanceType: [
        { text: "Tous", value: "all" },
        { text: "Jaune", value: "yellow" },
        { text: "Orange", value: "orange" },
        { text: "Rouge", value: "red" },
      ],
      orderedSelected: "creationDate",
      orderedType: [
        { text: "Par date de création", value: "creationDate" },
        { text: "Date de fin", value: "endedDate" },
        { text: "Ordre alphabétique", value: "alphabetic" },
      ],
    };
  },
  computed: {
    ...mapGetters({
      allTodos: "todos/getAllTodos",
    }),
    filterByImportance() {
      if (this.importanceSelected != "all") {
        return this.allTodos.filter((todo) => {
          return todo.importance.includes(this.importanceSelected);
        });
      } else {
        return this.allTodos;
      }
    },
  },
  methods: {
    orderedBy(event) {
      if (event.target.value.includes("endedDate")) {
        this.todos = this.todos.sort((a, b) => {
          return a.date > b.date;
        });
      } else if (event.target.value.includes("alphabetic")) {
        this.todos = this.todos.sort((a, b) => {
          if (a.title < b.title) {
            return -1;
          }
          if (a.title > b.title) {
            return 1;
          }
          return 0;
        });
      } else {
        this.todos = this.todos.sort((a, b) => {
          return a.id - b.id;
        });
      }
    },
        ...mapMutations({
      addTodoMutation: "todos/addTodo",
    }),
    addTodo(item) {
      if (item.title && item.description && item.importance) {
        const payload = {
          id: this.allTodos.length + 1,
          title: item.title,
          description: item.description,
          importance: item.importance,
          date: item.date,
        };
        this.addTodoMutation(payload);
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
.filters-content {
  margin-top: 30px;
  display: flex;
}
.filters-item {
  margin-right: 30px;
}
.card-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-columns: 300px;
  gap: 10px 10px;
  margin-top: 60px;
}
</style>

