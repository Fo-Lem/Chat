<template>
  <div class="header">
    <h1 class="siteName">Alcove</h1>
    <div v-if="user != ''" class="user">
      <h3>{{ user.name }}</h3>
      <ui-button @click="$emit('exit')">Выйти</ui-button>
    </div>
  </div>
</template>
  
<script>

export default {
  name: "headerApp",
  props: {
    user: {
      required: true,
    },
  },


};
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
  display: flex;
  justify-content: space-between;

}

.user {
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 18px;


}
</style>
  