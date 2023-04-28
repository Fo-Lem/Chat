<template>
  <div class="wrapper">
    <rooms-container v-bind:roomId="roomId" v-bind:user="user" v-bind:socket="socket"
      @selectRoom="selectRoom"></rooms-container>
    <div class="room">
      <messages-container v-bind:roomId="roomId" v-bind:messages="messages"
        @updateMessages="updateMessages"></messages-container>
      <create-message-form v-bind:roomId="roomId" v-bind:user="user" v-bind:socket="socket"></create-message-form>
    </div>
  </div>
</template>

<script>

import roomsContainer from "@/components/rooms.vue";
import messagesContainer from "@/components/messages.vue";
import createMessageForm from "@/components/createMessageForm.vue";
import { auth } from "../http/wsApi";

export default {
  components: { roomsContainer, messagesContainer, createMessageForm },
  name: "room-container",
  data() {
    return {
      messages: [],
      roomId: "",
      socket: "",
    };
  },
  props: {
    user: {
      required: true,
    },
  },
  methods: {
    subscribe() {

      this.socket = new WebSocket("ws://localhost:8081/api/ws/subscribe");
      auth(this.user, this.socket);
      this.socket.onmessage = (event) => {
        const newMsg = JSON.parse(event.data);
        if (newMsg.type == "message"&&this.roomId==newMsg.chatId) {
          
          this.messages.push(newMsg);
        }
      };
    },

    selectRoom(id) { this.roomId = id },
    updateMessages(messages) { this.messages = messages }

  },
  mounted() {
    if (this.socket == "") {
      this.subscribe();
    }
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  gap: 10px;
  height: 800px;
  margin: 0 auto;
  padding: 10px;
  border: 1px solid green;
  border-radius: 10px;
}

.room {
  width: 620px;
  border: 1px solid green;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 5px;
}
</style>
