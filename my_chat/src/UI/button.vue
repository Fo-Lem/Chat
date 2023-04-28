<template lang="">
    <button>
        <slot></slot>
    </button>
</template>
<script>
export default {
    name: 'ui-button'
    
}
</script>
<style scoped>
button{
    padding: 5px 10px;
    border-radius: 5px;
    border: 1px solid green;
    background-color: white;
    cursor: pointer;
    font-size: 16px;
}
    
</style>