<template>
  <form @submit="registrationUser" class="form" @submit.prevent="onSubmit" action="\">
    <label for="">Email
      <ui-input v-bind:class="{ red: error != '' }" v-model="email" type="text" minlength="6" name="email"
        placeholder="Ваш Email" id="email" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" title="foo@mail.ru" required></ui-input>
    </label>

    <label for="">Имя
      <ui-input v-model="name" type="text" name="name" placeholder="Ваше имя" title="Иван / Ivan" required id="name">
      </ui-input>
    </label>
    <label for="">Фамилия (не обязательно)
      <ui-input v-model="surname" type="text" name="surname" placeholder="Ваше фамилия" title="Дулин / Dukin"
        id="surname"></ui-input>
    </label>

    <label for="">Пароль
      <ui-input v-model="password" minlength="6" type="password" name="Password" placeholder="Ваш пароль" id="Password"
        autocomplete="" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
        title="Пароль должен иметь хотябы одну буквы и цыфру, не может содержать спецсимволы" required></ui-input>
    </label>

    <label for="">Повторите пароль
      <ui-input v-model="password_check" minlength="6" type="password" name="Password" placeholder="Повторите ваш пароль"
        id="Password_check" autocomplete="" required /></label>
    <p v-if="error != ''" class="help errors">{{ error }}</p>
    <ui-button v-bind:disabled="passValidation" type="submit">
      Регистрация
    </ui-button>
    <div class="link">
      <p>Уже зарагестрированы?</p>
      <router-link to="/login">Войти</router-link>
    </div>
  </form>
</template>

<script>
import { registration } from "../http/userApi";
export default {
  name: "registrationForm",
  data() {
    return {
      email: "",
      name: "",
      surname: "",
      password: "",
      password_check: "",

      result: "",
      error: "",
    };
  },
  emits: ["registration"],
  methods: {
    async registrationUser() {
      try {
        const data = await registration(
          this.email,
          this.name,
          this.surname,
          this.password
        );
        this.$emit("registration", data);
        this.$router.push('rooms');
      } catch (e) {
        this.error = e.response.data.message;
      }
    },
  },

  computed: {
    passValidation() {
      if (
        this.email != "" &&
        this.password != "" &&
        this.password_check != "" &&
        this.password === this.password_check
      ) {
        return false;
      }
      return true;
    },
  },
  props: {},
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

.form label {
  display: flex;
  flex-direction: column;
  align-items: bottom;
  position: relative;
  gap: 10px;
  justify-content: space-between;
}

.form label:nth-child(1)::before {
  content: "*";
  color: red;
  position: absolute;
  top: 0px;
  left: -7px;
}

.form label:nth-child(2)::before {
  content: "*";
  color: red;
  position: absolute;
  top: 0px;
  left: -7px;
}

.form label:nth-child(4)::before {
  content: "*";
  color: red;
  position: absolute;
  top: 0px;
  left: -7px;
}

.form label:nth-child(5)::before {
  content: "*";
  color: red;
  position: absolute;
  top: 0px;
  left: -7px;
}

.errors {
  color: red;
  font-size: 14px;
}

.red {
  transition: 1s;
  box-shadow: 0px 0px 10px red;
}

.help {
  font-size: 12px;
}

.link {
  display: flex;
  gap: 10px;
}
</style>
