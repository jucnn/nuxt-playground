const state = () => ({
  todos: [{
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
  importance: [{
      text: "Tous",
      value: "all"
    },
    {
      text: "Jaune",
      value: "yellow"
    },
    {
      text: "Orange",
      value: "orange"
    },
    {
      text: "Rouge",
      value: "red"
    }
  ],
  orderedType: [{
      text: "Par date de création",
      value: "creationDate"
    },
    {
      text: "Date de fin",
      value: "endedDate"
    },
    {
      text: "Ordre alphabétique",
      value: "alphabetic"
    },
  ]
})

const getters = {
  getAllTodos: state => state.todos,
  getAllImportance: state => state.importance,
  getAllOrderedType: state => state.orderedType,
}

const mutations = {
  setAllTodos(state, todos) {
    state.todos = todos
  },
  addTodo(state, data) {
    state.todos.push(data)
  },
  updateTodo(state, data) {
    console.log(data)
    const index = state.todos.findIndex(item => item.id === data.id);
    state.todos[index] = data
  },
  deleteTodo(state, item) {
    state.todos.splice(state.todos.indexOf(item), 1)
  }
}

const actions = {

}


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
