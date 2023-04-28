<template>
  <div class="app">
    <header-app @exit="exit" v-bind:user="User"></header-app>
    <router-view v-on:registration="updateUser" v-on:sign-in="updateUser" v-slot="{ Component }">
      <transition name="slide" mode="out-in">
        <component :is="Component" v-bind:user="User" :key="$route.path" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import registrationFormApp from "@/components/registrationForm.vue";
import signInApp from "@/components/signInForm.vue";
import headerApp from "@/components/header.vue";
import roomContainer from "@/components/roomContainer.vue";
import { check } from './http/userApi';


export default {
  components: { registrationFormApp, signInApp, headerApp, roomContainer },
  name: "App",
  data() {
    return {
      User: '',
      loading: true,
      transitionName: "",
    };
  },
  methods: {
    updateUser(data) {
      this.User = data;
      console.log(this.User);
    },
    exit() {
      this.User = '';
      localStorage.removeItem('token')
      this.$router.push('login');
    }
  },
  watch: {},
  beforeMount() {
    check().then(data => {
      if (data) {
        this.User = data;
        //console.log(this.User);
        this.$router.push('rooms')
      }
    });
    if (this.User == '') {
      this.$router.push('login');
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: 'Roboto', sans-serif;
  

}
.app {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 300ms;
}

.slide-enter-from {
  opacity: 0;
}

.slide-leave-to

/* .slide-fade-leave-active до версии 2.1.8 */
  {
  opacity: 0;
}
</style>
