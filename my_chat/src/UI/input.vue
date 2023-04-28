<template>
    <input type="text" class="input" :placeholder="placeholder" @input="updateInput">
</template>
<script>
export default {
    name:'ui-input',
    props:{
        modelValue:[String,Number],
        placeholder:[String,Number]
          
    },
    methods:{
       updateInput(event){
        // передаем содержимое инпута
        this.$emit('update:modelValue',event.target.value)

       } 
    }
    
}
</script>
<style scoped>
.input{
    padding: 5px;
    border-radius: 5px;
    border: 1px solid green;
    font-size: 16px;
    
}
</style>