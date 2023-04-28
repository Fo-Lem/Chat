<template>
    <form @submit="signIn" class="form" @submit.prevent="onSubmit" action="\">
      <label for=""
        >Логин
        <ui-input
          v-bind:class="{ red: errorFlag == 1 }"
          v-model="email"
          type="text"
          minlength="6"
          name="email"
          placeholder="Ваш email"
          id="email"
          required
      /></label>
      
      
      
      <label for=""
        >Пароль
        <ui-input
        v-bind:class="{ red: errorFlag == 2 }"
          v-model="password"
          minlength="6"
          type="password"
          name="Password"
          placeholder="Ваш password"
          id="Password"
          autocomplete=""
          pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
          required
      /></label>
      
      <p v-if="error!=''" class="help errors">{{ error }}</p>

      <ui-button
      type="submit">Войти</ui-button>
      <div class="link">

      <p>Нет аккаунта?</p>      <router-link to="/registration">Регистрация</router-link>
    </div>
      
      
    </form>
  </template>
  
  <script>
import {login} from '../http/userApi'
  export default {
    name: "signIn",
    data() {
      return {
        email: "",
        password: "",
        result: "",
        error: "",
        errorFlag:""
      }
    },
    emits: ['sign-in'],
    methods: {
      async signIn() {
        try {
          const data = await login(this.email,this.password)
          this.$emit('sign-in', data)
          this.$router.push('rooms');
        } catch (e) {
          let error=e.response.data.message
          if(error=='Пользователь не найден'){
            this.errorFlag=1;
            this.error=error
          }else{
            this.errorFlag=2;
            this.error=error
          }

          
          
        }
      
      

    },
    
},
    
  };
  </script>
  
  <style scoped>
  .form {
    margin: 20px auto;
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid black;
  }
  .form .input {
    padding: 10px;
    width: 100%;
    border-radius: 5px;
    border: 1px solid black;
  }
 
  .form label {
    display: flex;
    flex-direction: column;
    align-items: bottom;
    position: relative;
    gap: 10px;  
    justify-content: space-between;
  }
  
  .errors {
    color: red;
    font-size: 14px;
  }
  .red {
    transition: 1s;
    box-shadow: 0px 0px 10px  red;
  }
  .help{
    font-size: 12px;
  }
  .link{
    display: flex;
    gap:10px
  }
  </style>