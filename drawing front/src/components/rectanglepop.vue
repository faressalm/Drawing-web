<template>
  <v-dialog  dark max-width="600px" v-model="dialogr" >
   
    <v-card>
      <v-card-title>
        <h2> New Rectangle </h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form" @submit="submit"
          onSubmit="return false;">
          <v-text-field v-model="width" label="Width" prepend-icon="mdi-alpha-w-circle-outline" :rules="inputRules" v-on:keyup.enter="submit"></v-text-field>
          <v-text-field v-model="length" label="Length" prepend-icon="mdi-alpha-l-circle-outline" :rules="inputRules" v-on:keyup.enter="submit"></v-text-field>
         <v-spacer></v-spacer>

         <v-btn text @click="submit" color="cyan" class="font-weight-bold mx-0 mt-3" >Add Rectangle</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {busr} from '../main' 
export default {
  data() {
    return {
          
      inputRules: [
        
        v => !!v || 'This field is required',
        v => this.check&&v.length!=0 || 'Must be number',
        v => v.length <= 5 || 'Maximum length is 5 digit',
        
        
      ],
      dialogr:false,
      width:"",
      length:""   
    }
  },
  methods: {
    submit() {    
          if(this.$refs.form.validate()) {
          this.$emit('rectangleval',this.width,this.length)
          this.dialogr = false}
          
    }
  },
  created () {
      var vm = this
      busr.$on('dialog', function (value) {
        vm.dialogr = value
      })
    }, computed: {
    check() {
        if(this.width!=0&&this.length==0){
        return !isNaN(this.width)
      }
      if(this.length!=0&&this.width==0){
       return !isNaN(this.length)
      }
      
      if(this.length!=0&&this.width!=0){
        return !isNaN(this.width)&&!isNaN(this.length)
      }
      return true
    },
    }
    
  
}
</script>