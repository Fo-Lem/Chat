<template>
  <div class="roomsContainer">
    <div class="rooms">
      <ui-button v-for="room in rooms" :key="room.chat.id" @click="selectRoom(room.chat.id)">
        <small>№{{ room.chat.id }}</small> {{ room.chat.name }}</ui-button>


    </div>
    <form class="createRoom" @submit.prevent="createNewRoom" action="\">
      <ui-input v-model="newRoom" :placeholder="'Имя комнаты'" class="input"></ui-input>
      <ui-button class="createRoomButton">Создать</ui-button>
    </form>
    <form class="createRoom" @submit.prevent="subscribeRoom" action="\">
      <ui-input v-model="subRoom" :placeholder="'Номер комнаты'" class="input"></ui-input>
      <ui-button class="createRoomButton">Вступить</ui-button>
    </form>

  </div>
</template>

<script>
import { checkCountRoom, checkRoom, createRoom } from "@/http/roomsApi";
import { subscribe } from "@/http/subscribeApi";
export default {
  name: "rooms-container",
  data() {
    return {
      rooms: [],
      subRoom:'',
      newRoom: "",
      placeholder: 'Имя комнаты'

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
    selectRoom(id) {
      this.$emit('selectRoom', id)


    },
    async getRooms(offset, limit) {
      const data = await checkRoom(offset, limit, this.user.id);
      console.log(data)
      this.rooms = data;
    },
    async createNewRoom() {
      if (this.newRoom != "") {
        await createRoom(this.newRoom, this.user.id, this.user, this.socket);
      }
      this.newRoom = "";
    },
    async subscribeRoom() {
      if (this.subRoom != "") {
        await subscribe(this.subRoom, this.user.id, this.user, this.socket);
      }
      this.subRoom = "";
    }

  },

  mounted() {

    checkCountRoom(this.user.id).then((count) => {
      let limit = 10;
      let offset = 0;
      if (count) {
        count >= 20 ? offset = count - 20 : offset = 0;
      }
      this.getRooms(offset, limit);
    });

  }

};
</script>

<style scoped>
.roomsContainer {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between;

}

.rooms {
  height: 100%;
  width: 350px;
  border: 1px solid green;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.createRoom {
  display: flex;
  gap: 5px;
  justify-content: space-between;
}

.input {
  width: 100%;
}

.createRoomButton {
  background-color: rgb(212, 253, 212);
}

.createRoomButton:hover {
  background-color: rgb(185, 255, 185);
}
</style>
