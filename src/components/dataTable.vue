<template>
  <div>
    <!-- Retirar o botao do componente 'register-form' e colocar no dataTable que faz a cahamada -->
    <el-button type="primary" @click="flag = true">New Register</el-button>

    <el-row :gutter="20" type="flex" justify="center">
      <el-col :span="16">
        <el-table
          :data="recordData"
          style="width: 100%">
          <el-table-column
            label="Nome"
            prop="name">
          </el-table-column>
          <el-table-column
            label="Telefone"
            prop="telefone">
          </el-table-column>
          <el-table-column
            label="Date"
            align="right">
            <template slot="header" slot-scope="scope">
              <!-- <p>Ação</p> -->
            </template>
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="sendEdit(scope.$index, scope.row)">Edit</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index)">Delete</el-button>
            </template>
              <register-form :flagVisible="flag" @submit="onModalDialogSubmit" @editar="handleUpdate" @close="flag = false"></register-form>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import registerForm from './registerForm'

export default {
  name: 'dataTable',

  components: {
    registerForm
  },

  data() {
    return {
      recordData: [],
      flag: false
    }
  },

  methods: {
    onValidation() {
    },

    // Mudar nome desta função
    onModalDialogSubmit (data) {
      this.recordData.push({...data})
    },

    onModalDialogClose () {
      this.flag = false
    },

    handleUpdate (data = {}, index) {
      debugger
      this.recordData.splice(index, 1, ...data)
    },

    sendEdit(index, row) {
      debugger
      this.$root.$emit('edit', row, index)
      this.flag = !this.flag
    },

    handleDelete(index) {
      this.recordData.splice(index, 1)
    }
  }
}
</script>