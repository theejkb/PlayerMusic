<template>
  <div class>
    <h1 class="d-flex justify-center mt-5 mb-5">Songs</h1>
    <v-text-field color="red" label="Find in Songs"></v-text-field>    
    <div class="test">      
      <div class="songs-container">
         <div class="d-flex justify-center mb-5">
            <v-btn class="play mr-2" elevation="0">
              <v-icon color="red">mdi-play</v-icon>
              <p class="text-display my-auto ml-2" @click="playAllSongs">Play</p>
            </v-btn>
            <v-btn class="play ml-2" elevation="0">
              <v-icon color="red">mdi-shuffle</v-icon>
              <p class="text-display my-auto ml-2" @click="playAllSongsShuffle">Shuffle</p>
            </v-btn>
          </div>
          <div v-for="(music) in allSongs" :key="music.id" @click="playThisMusic(music.id)">
            <div class="mt-5 d-flex justify-start">
              <v-img class="rounded" :src="music.image" max-width="50px" max-height="50px" />
              <div class="displayText">
                <v-card-text class="text--primary mt-n3 text-music">
                  <div>
                    <b>{{ music.title }}</b>
                  </div>
                  <div>{{ music.author }}</div>
                </v-card-text>
              </div>
            </div>
            <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Songs",
  props: {
    allSongs: {}
  },
  components: {},
  data: function() {
    return {
      music: ""
    };
  },
  methods: {
    playThisMusic(event) {
      this.$emit('playThisMusic', event);
    },
    playAllSongs() {
      this.$emit('playAllSongs');
    },
    playAllSongsShuffle() {
      this.$emit('playAllSongsShuffle');
    }
  },
  watch: {}
};
</script>
<style scoped>
.songs-container {
  position: fixed;
  height: 65%;
  width: 100%;
  overflow: scroll;
  padding-bottom: 25px;
 
}
.displayText {
  white-space: nowrap;
  overflow: hidden;
  width: auto;
  margin: 0 60px 0 0;
}

hr {
  width: auto;
  margin: -10px 60px;
  height: 1px;
}


</style>