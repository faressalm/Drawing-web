<template>
  <v-dialog  dark max-width="600px" v-model="dialogs">
   
    <v-card>
      <v-card-title>
        <h2> New Sqaure </h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form" @submit="submit"
          onSubmit="return false;">
          <v-text-field   v-model="length" label="Length" prepend-icon="mdi-alpha-l-circle-outline" :rules="inputRules"></v-text-field>

          <v-spacer></v-spacer>

          <v-btn text @click="submit" color="cyan" class=" font-weight-bold mx-0 mt-3" >Add Square</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {buss} from '../main' 
export default {
   
  data() {
    return {
      length: '',     
      inputRules: [
        
        v => !!v || 'This field is required',
        v => this.check&&v.length!=0 || 'Must be number',
        v => v.length <= 5 || 'Maximum length is 5 digit',
        
        
      ],
      dialogs:false
    }
  },
  methods: {
    submit() {    
          if(this.$refs.form.validate()) {
          this.$emit('squareval',this.length)
           this.dialogs = false}
           
    }
  },
  created () {
      var vm = this
      buss.$on('dialog', function (value) {
        vm.dialogs = value
      })
    }, computed: {
    check() {
      return !isNaN(this.length)
    },
    }
    
  
}
</script>