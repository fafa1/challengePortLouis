<template>
  <div>
    <!-- Retirar o botao do componente 'register-form' e colocar no dataTable que faz a cahamada -->
    <el-button type="primary" @click="flag = true">New Register</el-button>
  
    <register-form
      :flagVisible="flag"
      @submit="onModalDialogSubmit"
      @close="flag = false">
    </register-form>

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
                @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
            </template>
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
      debugger
      this.recordData.push({...data})
    },

    onModalDialogClose () {
      this.flag = false
    },

    handleEdit(index, row) {
      this.flag = !this.flag
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
}
</script>