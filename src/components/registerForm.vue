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
    onValidationName() {
      let sizeName, character
      const minCharacters = new RegExp(/(.*[a-z]){3}/i)

      const nameS = this.form.name.split(' ')
      sizeName = nameS.length

      if (sizeName === 1) {
        alert('Porfavor insire Nome e Sobrenome')
      }

      nameS.forEach(nome => {
        character = minCharacters.test(nome)

        if(character === false) {
          alert('Nome e Sobrenome Precisa no mínimo de 3 letras')
          return false
        }
      })

      return {
        character,
        sizeName
      }
    },

    onValidationTephone(tel) {
      tel=tel.replace(/\D/g,"")
      tel=tel.replace(/^(\d{2})(\d)/g,"($1)$2")
      tel=tel.replace(/(\d)(\d{4})$/,"$1-$2")

      this.form.telefone = tel
    },

    onSubmit () {
      const { character, sizeName } = this.onValidationName()

      if (character === false || sizeName === 1) return

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

  watch: {
    flagVisible () {
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
    },

    'form.telefone' () {
      this.onValidationTephone(this.form.telefone)
    }
  }
}
</script>

<style scoped>
  #text {
    font-weight: bold;
  }
</style>
