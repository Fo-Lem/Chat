<template>
    <p>
        <slot></slot>
    </p>
</template>
<script>
export default {
    name: 'ui-message'
    
}
</script>
<style scoped>
p{
    padding: 5px 10px ;
    border-radius: 5px;
    border: 1px solid green;
    background-color: white;
    cursor: pointer;
    font-size: 16px;
}
    
</style>