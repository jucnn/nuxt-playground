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
          <TodoForm :todo="todoDefault" @addTodoEvent="addTodo" :add="true" :edit="false" />
        </div>
      </b-collapse>
      <b-notification
        v-if="todoCreated"
        type="is-success is-light"
        aria-close-label="Close notification"
      >
        Todo créée
      </b-notification>
    </div>
    <div class="filters-container">
      <h3 class="title is-3">Filtres</h3>
      <div class="filters-content">
        <div class="filters-item filters-importance">
          <b-field label="Importance">
            <b-select v-model="importanceSelected" id="importanceSelected">
              <option
                v-for="importance in allImportance"
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
                v-for="option in allOrderedType"
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
        @deleteTodoEvent="deleteTodoMutation(todo)"
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
      todoCreated: false,
      importanceSelected: "all",
      orderedSelected: "creationDate",
    };
  },
  computed: {
    ...mapGetters({
      allTodos: "todos/getAllTodos",
      allImportance: "todos/getAllImportance",
      allOrderedType: "todos/getAllOrderedType"
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
        this.allTodos = this.allTodos.sort((a, b) => {
          return a.date > b.date;
        });
      } else if (event.target.value.includes("alphabetic")) {
        this.allTodos = this.allTodos.sort((a, b) => {
          if (a.title < b.title) {
            return -1;
          }
          if (a.title > b.title) {
            return 1;
          }
          return 0;
        });
      } else {
        this.allTodos = this.allTodos.sort((a, b) => {
          return a.id - b.id;
        });
      }
    },
    ...mapMutations({
      addTodoMutation: "todos/addTodo",
      updateTodoMutation: "todos/updateTodo",
      deleteTodoMutation: "todos/deleteTodo"
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
        this.todoDefault = {
          id: Number,
          title: "",
          description: "",
          importance: "",
          date: new Date(),
        };
        this.isCreationOpen = false;
        this.todoCreated = true;
      } else {
        console.log("error");
      }
    },
    editTodo(item) {
      this.updating = true;
      this.todoUpdated = item;
    },
    saveTodo(item) {
      this.updating = false;
      this.updateTodoMutation(item)
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

.todo-add_container {
  margin-bottom: 20px;
  max-width: 500px;
}
.todo-add_container .b-notification {
  margin: 20px 0;
}
.todo-add {
  margin-top: 10px;
  border-radius: 5px;
}

.todo-add_title {
  padding: 15px;
  background-color: #dfdfdf;
}

.todo-add_content {
  padding: 20px;
  background-color: #f2f2f2;
}
</style>

