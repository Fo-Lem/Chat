<template>
    <textarea  class="input" @input="updateInput" name=""  id="" cols="30" rows="10"></textarea>
</template>
<script>
export default {
    name:'ui-text-area',
    props:{
        modelValue:[String,Number]
    },
    methods:{
       updateInput(event){
        // передаем содержимое инпута
        this.$emit('updateInput',event.target.value)

       } 
    }
    
}
</script>
<style scoped>
.input{
    padding: 5px;
    border-radius: 5px;
    font-size: 18px;
    width: 100%;
    height: 100%;
    resize: none;
    border: 1px solid green;
    
}
:focus-visible {
    outline: 1px solid green;
}
</style>