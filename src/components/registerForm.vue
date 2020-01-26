<template>
  <div>
    <el-dialog title="Register"
      :append-to-body="true"
      :visible.sync="isVisibleFlag"
      width="35%"
      @close="close">
      <el-form v-model="form">
        <el-form-item label="Name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Cel" :label-width="formLabelWidth">
          <el-input v-model="form.telefone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="close">Cancel</el-button>
        <el-button type="primary" @click="submit">Confirm</el-button>
      </span>
    </el-dialog> 
  </div>
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

  computed: {

  },

  data() {
    return{
      dialogFormVisible: false,
      formLabelWidth: '120px',
      isVisibleFlag: false,
      form: {
        name: '',
        telefone: ''
      }
    }
  },

  methods: {
    submit () {
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
    }
  }
}
</script>

<style scoped>

</style>