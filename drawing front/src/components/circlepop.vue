<template>
  <v-dialog  dark max-width="600px" v-model="dialog"  >
   
    <v-card>
      <v-card-title>
        <h2> New Circule </h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form" 
          @submit="submit"
          onSubmit="return false;"
        >
 
          <v-text-field   v-model="radius" label="Radius" prepend-icon="mdi-radius-outline" :rules="inputRules" 
           ></v-text-field>

          <v-spacer></v-spacer>

          <v-btn text @click="submit"  color="cyan" class=" font-weight-bold mx-0 mt-3" >Add Circle</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {bus} from '../main' 
export default { 
  data() {
    return {     
      inputRules: [
        v => !!v || 'This field is required',
        v => this.check&&v.length!=0 || 'Must be number',
        v => v.length <= 5 || 'Maximum length is 5 digit',
      ],
      dialog:false,
      radius:"",

    }
  },
  methods: {
    submit() {    
          if(this.$refs.form.validate()) {
          this.$emit('circlerad',this.radius)
          this.dialog = false
          }
    }
  },
  created () {
      var vm = this
      bus.$on('dialog', function (value) {
        vm.dialog = value
      })
    }, computed: {
    check() {
      return !isNaN(this.radius)
    },
    },
    
    
  
}
</script>