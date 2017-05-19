<style>
  .markdown-modal {
    height: auto!important;
    width: 50vw!important;
  }
  .marked-text-area {
    width: 100%;
    height: 100px;
  }
  span {
  }
  select {
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #bfcbd9;
    box-sizing: border-box;
    color: #1f2d3d;
    display: block;
    font-size: inherit;
    height: 36px;
    line-height: 1;
    outline: 0;
    padding: 3px 10px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
  }
</style>
<template>
  <div class="Todo">
    <el-row>
      <el-col :span="24">
        <div class="header">
          <h1>Using Element.io TODO APP</h1>
        </div>
      </el-col>
    </el-row>
    <el-row>

      <el-col :offset="4" :span="16">
        <el-table style="width: 100%" :data="jackdos">
          <el-table-column type="expand">
            <template scope="scope">
              <div v-html="returnMarked(scope.row)"></div>
              <el-button @click="changeMarkdown(scope.row)" type="text" size="small">
                Edit
              </el-button>
            </template>
          </el-table-column>

          <el-table-column sortable prop="description" :width="400" label="Todo">
            <template scope="scope">
              <el-button @click="changeDescription(scope.row)" type="text" size="large">
                {{ scope.row.description }}
              </el-button>
            </template>
          </el-table-column>

          <el-table-column sortable label="Category" align="center" :width="200" prop="category">
            <template scope="scope">
              <el-select type="select" v-model="scope.row.category" placeholder="Select">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

            </template>
          </el-table-column>

          <el-table-column sortable align="center" :width="120" label="Created" :formatter="dateFormatter" prop="created"></el-table-column>

          <el-table-column sortable prop="due" align="center" :width="250" label="Due">
            <template scope="scope">
              <div class="block">
                <span class="demonstration"></span>
                <el-date-picker
                  v-model="scope.row.due"
                  type="date"
                  placeholder="Pick a day">
                </el-date-picker>
              </div>
            </template>
          </el-table-column>

          <el-table-column align="center" :width="100" label="Remove">
            <template scope="scope">
              <el-button size="small" type="danger" @click="deleteRow(scope.$index, scope.row)">Delete
            </el-button>
          </template>
        </el-table-column>

          <el-table-column align="center" sortable prop="complete" :width="150" label="Complete">
            <template scope="scope">
              <el-checkbox v-model="scope.row.complete"></el-checkbox>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <el-button @click="newTodo()">New</el-button>
        </div>
      </el-col>

    </el-row>

  </div>
</template>

<script>
import marked from './marked.js'
export default {
  watch: {
    jackdos: {
      handler () {
        this.$store.set('jackdos', this.jackdos)
      },
      deep: true
    }
  },
  mounted () {
    this.jackdos = this.$store.get('jackdos')
    if (this.jackdos.length < 1) {
      this.$store.set('jackdos', [{
        'description': 'your description here',
        'created': new Date(),
        'category': 'Other',
        'due': '',
        'complete': false,
        'markdown': '# No Notes'
      }])
      this.jackdos = this.$store.get('jackdos')
    } else {
      console.log(this.jackdos)
    }
  },
  data: () => ({
    selectedCat: '',
    options: [{
      value: 'Other',
      label: 'Other'
    },
    {
      value: 'Home',
      label: 'Home'
    },
    {
      value: 'Work',
      label: 'Work'
    },
    {
      value: 'Personal',
      label: 'Personal'
    },
    {
      value: 'Projects',
      label: 'Projects'
    }],
    input: '# hello',
    jackdos: [],
    value1: '',
    tableData: [{
      name: 'Jack',
      description: 'description'
    }]
  }),
  computed: {
    compiledMarkdown () {
      return marked(this.input, { sanitize: true })
    }
  },
  methods: {
    actionFunc (action) {
      console.log('this pos action is -> ', action)
      if (action === 'confirm') {
        return ('Saved!')
      } else {
        return (action + '!')
      }
    },
    newTodo () {
      this.jackdos.push({
        'description': 'your description here',
        'created': new Date(),
        'category': 0,
        'due': '',
        'complete': false,
        'markdown': '# insert markdown here'
      })
      this.$store.set('jackdos', this.jackdos)
    },
    returnMarked (a) {
      let realIndex = this.jackdos.indexOf(a)
      this.input = this.jackdos[realIndex].markdown
      return this.compiledMarkdown
    },
    update (e) {
      this.input = e.target.value
    },
    deleteRow (a, b) {
      console.log('---> ', a, ' : ', b)
      this.jackdos.splice(a, 1)
      this.$store.set('jackdos', this.jackdos)
    },
    dateFormatter (a, b) {
      // console.log(a.created)
      return new Date(a.created).toLocaleString({}, {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
      })
    },
    changeMarkdown (i) {
      this.value = this.jackdos[this.jackdos.indexOf(i)].markdown
      const h = this.$createElement
      let temp = ''
      this.$msgbox({
        customClass: 'markdown-modal',
        title: 'Edit Notes with Markdown',
        message: h('div', null, [
          h('div', null, [
            h('textarea', {
              class: 'marked-text-area',
              domProps: {
                value: this.jackdos[this.jackdos.indexOf(i)].markdown
              },
              on: {
                input: e => {
                  this.input = e.target.value
                  temp = this.input
                }
              }
            })
          ])
        ]),
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            this.jackdos[this.jackdos.indexOf(i)].markdown = temp
            instance.confirmButtonLoading = true
            instance.confirmButtonText = 'Loading...'
            setTimeout(() => {
              done()
              setTimeout(() => {
                instance.confirmButtonLoading = false
                // console.log()
              }, 100)
            }, 200)
          } else {
            done()
          }
        }
      }).then(action => {
        this.$message({
          type: 'info',
          message: this.actionFunc(action)
        })
      })
    },
    changeDescription (a) {
      const h = this.$createElement
      let temp = ''
      this.$msgbox({
        title: 'Edit Todo Description',
        message: h('p', null, [
          h('span', null, 'Description: '),
          h('input', {
            type: 'text',
            domProps: {
              value: this.jackdos[this.jackdos.indexOf(a)].description
            },
            on: {
              input: e => {
                // this.jackdos[this.jackdos.indexOf(a)].description = e.target.value
                temp = e.target.value
              }
            }
          })
        ]),
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            this.jackdos[this.jackdos.indexOf(a)].description = temp
            instance.confirmButtonLoading = true
            instance.confirmButtonText = 'Loading...'
            setTimeout(() => {
              done()
              setTimeout(() => {
                instance.confirmButtonLoading = false
                // console.log()
              }, 100)
            }, 200)
          } else {
            done()
          }
        }
      }).then(action => {
        this.$message({
          type: 'info',
          message: this.actionFunc(action)
        })
      })
    }
  }
}
</script>
