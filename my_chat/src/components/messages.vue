<template>
  <div ref="messages" class="messages">
    <ui-message class="message" v-for="message in sortedMessage" :key="message.id">
      <p class="UserName">{{ message.user.name }}</p>
      <p v-html="message.body" class=""></p>
      <p v-html="formData(message.createdAt)" class="data"></p>

    </ui-message>
  </div>
</template>

<script>
import {
  checkMessage,
  checkCountMessage
} from "../http/messageApi";

export default {
  name: "messages-container",
  data() {
    return {
      offset: 0,
      limit: 20,
    };
  },
  props: {
    roomId: {
      required: true,
    },
    messages: {
      required: true,
    },
  },
  methods: {

    formData(data) {
      data = data.split('T')
      data[1] = data[1].split('.')[0]
      data = data.join(' / ')
      //console.log(data)
      return data
    }
    ,
    async getMessage(offset, limit, roomId) {
      console.log(offset)
      const data = await checkMessage(offset, limit, roomId);
      this.$emit('updateMessages', data)
    }


  },
  computed: {
    sortedMessage() {
      return [...this.messages].sort(
        (msg1, msg2) => msg2.id - msg1.id
      );
    },

  },
  watch: {
    roomId(newroomId) {
      if (newroomId != "") {
        checkCountMessage(this.roomId).then((count) => {
          console.log(count)
          if (count) {
            count >= 20 ? this.offset = count - 20 : this.offset = 0;
            console.log(this.offset)
          }
          this.getMessage(this.offset, this.limit, this.roomId);
        });
        
      }
    }
  }
};
</script>

<style scoped>
.messages::-webkit-scrollbar {
  display: none;
}

.message {
  position: relative;
  font-size: 20px;
}

.UserName {
  position: absolute;
  top: -15px;
  right: 20px;
  background-color: #fff;
  padding: 0 5px;
}

.data {
  position: absolute;
  font-size: 12px;
  top: -10px;
  left: 40%;
  background-color: #fff;
  padding: 0 5px;
}


.messages {
  gap: 30px;
  display: flex;
  flex-direction: column-reverse;
  height: 100%;
  overflow-y: auto;
  -ms-overflow-style: none;
  /* IE и Edge */
  scrollbar-width: none;
  /* Firefox */
}
</style>
