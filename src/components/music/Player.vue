<template>
  <div class="playerMusic">
    <v-card class="PlayerBottom">
      <v-list>
        <v-list-item>
          <v-img
            class="ml-1 rounded image"
            @click="showPlayerBig"
            :src="currentSong.image"
          />

          <v-card-text @click="showPlayerBig">
            <b>{{ currentSong.title }}</b>
          </v-card-text>
          <v-spacer></v-spacer>

          <v-list-item-icon>
            <v-btn
              aria-label="play/pause"
              @click="handleBtnPlaying()"
              icon
              color="black"
            >
              <v-icon v-if="isPlaying == false">mdi-play</v-icon>
              <v-icon v-else>mdi-pause</v-icon>
            </v-btn>
          </v-list-item-icon>

          <v-list-item-icon>
            <v-btn aria-label="next" icon @click="next">
              <v-icon color="black">mdi-skip-next</v-icon>
            </v-btn>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Player",
  props: {
    isPlaying: Boolean,
    currentSong: Object,
  },
  methods: {
    showPlayerBig() {
      this.$emit("showPlayerBig");
    },
    next() {
      this.$emit("nextSong");
    },
    handleBtnPlaying() {
      if (this.isPlaying) {
        this.$emit("paused");
      } else {
        this.$emit("playing");
      }
    },
  },
};
</script>

<style scoped>
.PlayerBottom {
  position: absolute;
  bottom: 50px;
  width: 100%;
}

.v-sheet.v-card {
  border-radius: 0 !important;
}
.image {
  width: 50px;
  height: 50px;
}
</style>
