<template>
  <v-dialog  dark max-width="600px" v-model="dialoge">
   
    <v-card>
      <v-card-title>
        <h2> New Ellipse </h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form" @submit="submit"
          onSubmit="return false;">
          <v-text-field v-model="radx" label="Radius of the x-axis" prepend-icon="mdi-arrow-right-thin-circle-outline" :rules="inputRules" v-on:keyup.enter="submit"></v-text-field>
          <v-text-field v-model="rady" label="Radius of y-axis" prepend-icon="mdi-arrow-up-thin-circle-outline" :rules="inputRules" v-on:keyup.enter="submit"></v-text-field>

          <v-spacer></v-spacer> 

          <v-btn text @click="submit" color="cyan" class="font-weight-bold mx-0 mt-3" >Add Ellipse</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {buse} from '../main' 
export default {
   
  data() {
    return {
      radx: '',   
      rady: '',      
      inputRules: [
        
        v => !!v || 'This field is required',
        v => this.check&&v.length!=0 || 'Must be number',
        v => v.length <= 5 || 'Maximum length is 5 digit',
        
        
      ],
      dialoge:false
    }
  },
  methods: {
    submit() {    
          if(this.$refs.form.validate()) {
           this.$emit('ellipseval',this.radx,this.rady)
          this.dialoge = false}
         
    }
  },
  created () {
      var vm = this
      buse.$on('dialog', function (value) {
        vm.dialoge = value
      })
    }, computed: {
    check() {
      if(this.radx.length!=0&&this.rady.length==0){
       return !isNaN(this.radx)
      }
      if(this.rady.length!=0&&this.radx.length==0){
        return !isNaN(this.rady)
      }
      if(this.rady.length!=0&&this.radx.length!=0){
        return !isNaN(this.radx)&&!isNaN(this.rady)
      }
      return true
    },
    }
    
  
}
</script>