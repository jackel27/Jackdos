<style scoped>
  .container {
    text-align: center;
    padding-top: 15%;
  }
  .table {
    background-color: rgba(255, 255, 255, 0.1);
    color: #F5F3F5;
  }
  .table tr:hover td {
    background-color: rgba(255, 255, 255, 0.1)!important;
    color: black;
  }
  th :hover {
    /*background-color: rgba(255, 0, 0, 0)!important;*/
  }
  .columns {
    height: 100vh;
  }
</style>
<template>
  <div class="landing">
    <section class="hero is-dark is-small">
      <div class="hero-body">
        <div class="container">
          <p class="title">
            JackeL's Todo Manager
          </p>
          <p class="subtitle">
            built with <3
          </p>
        </div>
      </div>
    </section>
    <div class="columns is-multiline">
      <div class="column is-3">

      </div>
      <div class="column is 6">
        <table class="table">
          <thead>
            <tr>
              <th><abbr title="Position">#</abbr></th>
              <th><abbr title="Description">Description</abbr></th>
              <th><abbr title="Date">Date Created</abbr></th>
              <th><abbr title="Category">Category</abbr></th>
              <th><abbr title="Due Date">Due</abbr></th>
              <th><abbr title="Complete">Complete</abbr></th>
              <th><abbr title="Remove">Remove</abbr></th>
            </tr>
          </thead>
          <tfoot>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th><button class="button is-primary btn" @click="addTodo" name="button">Add</button></th>
          </tfoot>
          <tbody>
            <tr v-for="todo in jackdos">
              <!-- Items clicked on will allow user to edit by class change.  -->
              <th>{{ jackdos.indexOf(todo)}}</th>
              <td>
                <input type="text" name="" v-model="todo.description" @change="changeDescription(jackdos.indexOf(todo), todo.description)" :value="todo.description">
                <div class="abs">
                  <div class="color">

                  </div>
                </div>
              </td>
              <td>{{ todo.created }}</td>
              <td>
                <p class="control">
                 <span class="select">
                   <select v-model="todo.category" @click="changeCategory(jackdos.indexOf(todo), todo.category)">
                     <option :selected="todo.category === 0" @click="changeCategory(jackdos.indexOf(todo), '0')" value="0">Select Category</option>
                     <option :selected="todo.category === 1" @click="changeCategory(jackdos.indexOf(todo), '1')" value="1">Work</option>
                     <option :selected="todo.category === 2" @click="changeCategory(jackdos.indexOf(todo), '2')" value="2">Home</option>
                     <option :selected="todo.category === 3" @click="changeCategory(jackdos.indexOf(todo), '3')" value="3">Personal</option>
                     <option :selected="todo.category === 4" @click="changeCategory(jackdos.indexOf(todo), '4')" value="4">Projects</option>
                   </select>
                 </span>
               </p>
              </td>
              <td> <input type="date" name="" v-model="todo.due" @change="changeDue(jackdos.indexOf(todo), todo.due)"></td>
              <td>
                <p class="control">
                  <label class="checkbox">
                    <input type="checkbox" @change="changeComplete(jackdos.indexOf(todo), todo.complete)" :checked='todo.complete'>
                    Complete
                  </label>
                </p>
              </td>
              <td>
                <button class="button is-danger btn" @click="removeTodo(jackdos.indexOf(todo))" name="button">Remove</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="column is-3">

      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'landing',
  mounted () {
    this.jackdos = this.$store.get('jackdos')
    if (!this.jackdos) {
      this.$store.set('jackdos', [{
        'order': 0,
        'description': 'your description here',
        'created': new Date(),
        'category': 0,
        'due': 'Some date..',
        'complete': false
      }])
    } else {
      console.log('jackdos', this.jackdos)
    }
  },
  data () {
    return {
      jackdos: {},
      editmode: false
    }
  },
  methods: {
    toggleEdit () {
      this.editmode = !this.editmode
    },
    retrieveTodos () {
    },
    changeCategory (index, cat) {
      this.jackdos[index].category = cat
      // console.log('category is... ', index, '  -   ', cat)
      this.$store.set('jackdos', this.jackdos)
    },
    changeDescription () {
      console.log('event fired!')
    },
    addTodo () {
      this.jackdos.push({
        'order': 0,
        'description': 'your description herfee',
        'created': new Date().toLocaleString(),
        'category': 0,
        'due': 'Some date..',
        'complete': false
      })
      this.$store.set('jackdos', this.jackdos)
    },
    removeTodo (index) {
      this.jackdos.splice(index, 1)
      this.$store.set('jackdos', this.jackdos)
    },
    changeComplete (index) {
      this.jackdos[index].complete = !this.jackdos[index].complete
      this.$store.set('jackdos', this.jackdos)
    },
    changeDue (index, date) {
      console.log(date)
      this.jackdos[index].due = date
      this.$store.set('jackdos', this.jackdos)
    }
  }
}
</script>
