<template>
  <div class="messageInputs">
    <form class="form" @submit.prevent="createNewMessage" action="\">
      <ui-text-area @keyup.enter.exact="createNewMessage" @updateInput="updateInput" v-bind:message="newMessage"
        :value="newMessage"></ui-text-area>
      <ui-button type="submit">Отправить</ui-button>
    </form>
  </div>
</template>

<script>
import {
  createMessage
} from "../http/messageApi";


export default {
  name: "create-message-form",
  data() {
    return {
      newMessage: ""
    };
  },
  props: {
    user: {
      required: true,
    },
    socket: {
      required: true,
    },
    roomId: {
      required: true,
    },
  },
  methods: {

    updateInput(message) {
      this.newMessage = message
    },
    async createNewMessage() {
      if (this.newMessage != "" && this.roomId != "") {
        await createMessage(
          "message", this.newMessage, this.user.id, this.roomId, this.user, this.socket)
      }
      this.newMessage = "";
    }
  }
};
</script>

<style scoped>
.messageInputs form {
  height: 100px;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 5px;
}
</style>
