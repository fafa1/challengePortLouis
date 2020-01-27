<template>
  <el-dialog 
    title="Register"
    :center="true"
    class="text-central"
    :append-to-body="true"
    :visible.sync="isVisibleFlag"
    width="35%"
    @close="close">
    <el-form :model="form" @keyup.native.enter="onSubmit">
      <el-form-item id="text" label="Name:">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item id="text" label="Cel:">
        <el-input v-model="form.telefone" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="danger" @click="close">Cancel</el-button>
      <el-button type="primary" @click="onSubmit">Confirm</el-button>
    </span>
  </el-dialog> 
</template>

<script>
export default {
  name: 'registerForm',

  props: {
    flagVisible: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return{
      dialogFormVisible: false,
      isVisibleFlag: false,
      indice: '',
      form: {
        name: '',
        telefone: ''
      }
    }
  },

  methods: {
    // chama a função que manda os dados para o dataTable para atualizar, se for a flag de atualizar
    onSubmit () {
        debugger
      if (this.indice !== '') {
        const rowData = {
          name: this.form.name,
          telefone: this.form.telefone,
        }

        this.$emit('editar', rowData, this.indice)
      }

      this.$emit('submit', this.form)
      this.close()
    },

    close () {
      this.isVisibleFlag = false
      this.$emit('close')
    }
  },

  // Depois ver a possiblidade de criar um funçao dentro do computed e char no watch - encapsular o $roo.emit nma funcao
  watch: {
    flagVisible () {
      debugger
      this.isVisibleFlag = this.flagVisible

      if (this.isVisibleFlag === false) {
        this.indice = ''
        return
      }

      this.$root.$on('edit', (row, index) => {
        this.form.name = row.name
        this.form.telefone = row.telefone
        this.indice = index
      })
    }
  }
}
</script>

<style scoped>
  #text {
    font-weight: bold;
  }
</style>