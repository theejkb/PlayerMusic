<template>
  <div class="Songs">
    <h1 class="d-flex justify-center mt-5 mb-5">Songs</h1>
    <v-text-field
      color="red"
      v-model="musicSearch"
      label="Find in Songs"
    ></v-text-field>
    <div class="test">
      <div class="songs-container">
        <div class="d-flex justify-center mb-10">
          <v-btn aria-label="play" class="play mr-2" elevation="0">
            <v-icon color="red">mdi-play</v-icon>
            <p class="text-display my-auto ml-2" @click="playAllSongs">Play</p>
          </v-btn>
          <v-btn aria-label="pause" class="play ml-2" elevation="0">
            <v-icon color="red">mdi-shuffle</v-icon>
            <p class="text-display my-auto ml-2" @click="playAllSongsShuffle">
              Shuffle
            </p>
          </v-btn>
        </div>
        <div
          class="mt-n5"
          v-for="music in searchMusic"
          :key="music.id"
          @click="playThisMusic(music)"
        >
          <div class="mt-5 d-flex justify-start">
            <v-img
              class="rounded"
              :src="music.image"
              max-width="50px"
              max-height="50px"
            />
            <div class="displayText">
              <v-card-text class="text--primary mt-n3 text-music">
                <div>
                  <b>{{ music.title }}</b>
                </div>
                <div>{{ music.author }}</div>
              </v-card-text>
            </div>
          </div>
          <hr class="mt-n1" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Songs",
  props: {
    allSongs: {},
  },
  components: {},
  data: function () {
    return {
      music: "",
      musicSearch: "",
    };
  },
  methods: {
    playThisMusic(music) {
      this.$emit("playThisMusic", music);
      console.log(music);
    },
    playAllSongs() {
      this.$emit("playAllSongs");
    },
    playAllSongsShuffle() {
      this.$emit("playAllSongsShuffle");
    },
  },
  computed: {
    searchMusic() {
      const musics = this.allSongs.filter((e) => {
        const regex = /[^A-Za-z0-9]/g;
        const search_input = this.musicSearch.toLowerCase().replace(regex, "");
        const title = e.title.toLowerCase().replace(regex, "");
        const author = e.author.toLowerCase().replace(regex, "");
        return title.includes(search_input) || author.includes(search_input);
      });
      return musics;
    },
  },
  watch: {},
};
</script>
<style scoped>
.songs-container {
  width: 100%;
  overflow: scroll;
  padding-bottom: 25px;
  max-height: 54vh;
  overflow-x: hidden;
}
@media screen and (max-width: 500px) {
  .songs-container {
    width: 100%;
    overflow: scroll;
    max-height: 60vh;
    overflow-x: hidden;
  }
}
.displayText {
  white-space: nowrap;
  overflow: hidden;
  width: auto;
  margin: 0 60px 0 0;
}

hr {
  width: auto;
  margin: 0px 60px;
  height: 1px;
  background-color: transparent;
}
</style>