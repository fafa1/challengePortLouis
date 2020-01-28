<template>
  <div>
    <el-button type="primary" @click="flag = true">New Register</el-button>

    <el-row :gutter="20" type="flex" justify="center">
      <el-col :span="16">
        <el-table
          :data="recordData"
          :row-class-name="tableRowClassName"
          style="width: 100%">
          <el-table-column
            label="Name"
            prop="name">
          </el-table-column>
          <el-table-column
            label="telephone"
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
    tableRowClassName ({ row, rowIndex }) {
      let areaCode =this.getCodeValue(row.telefone)
      if (areaCode === '11') return 'success-row'
    },

    getCodeValue (numberTel) {
      return numberTel.replace(/\D/g,"").slice(0, 2)
    },

    onModalDialogSubmit (data) {
      this.recordData.push({ ...data })
    },

    onModalDialogClose () {
      this.flag = false
    },

    sendEdit(index, row) {
      this.$root.$emit('edit', row, index)
      this.flag = !this.flag
    },

    handleUpdate (data = {}, index) {
      this.recordData.splice(index, 1, ...data)
    },

    handleDelete(index) {
      this.recordData.splice(index, 1)
    }
  }
}
</script>

<style>
  .el-table .success-row {
    background: #eceef3;
  }
</style>