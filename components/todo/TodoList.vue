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
          <TodoForm :todo="todoDefault" @addTodoEvent="addTodo" :add="true"/>

        </div>
      </b-collapse>
    </div>
    <div class="card-container">
      <TodoItem
        @deleteTodoEvent="deleteTodo"
        @editTodoEvent="editTodo"
        v-for="todo in todos"
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
        <TodoItemEdit :todo="todoUpdated" @saveTodoEvent="saveTodo"></TodoItemEdit>
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
    TodoForm
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
          completed: false
        },
        {
          id: 2,
          title: "Laver la SDB",
          description: "Je dois laver la SDB, c'est important",
          importance: "yellow",
          date: new Date(),
          completed: false
        },
        {
          id: 3,
          title: "Finir la todo liste",
          description: "Je dois la finir rapidement",
          importance: "red",
          date: new Date(),
          completed: false
        }
      ],
      updating: false,
      todoDefault: {
        id: Number,
        title: "",
        description: "",
        importance: "",
        date: new Date(),
        completed: false
      },
      todoUpdated: Object,
      isCreationOpen: false
    };
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
          date: item.date
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
      this.todoUpdated = item
    },
    saveTodo() {
      console.log(this.todoUpdated)
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

.card-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-columns: 300px;
  gap: 10px 10px;
  margin-top: 60px;
}
</style>
