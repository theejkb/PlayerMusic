<template>
  <div>
      
    <h1 class="d-flex justify-center">SONGS</h1>
    <v-text-field color="red" label="Find in Songs"></v-text-field>
    <div class="test">
      <div class="songs-container">
        <div v-for="(playlist, idx) in playlists" :key="idx">
          <div v-for="(music, idx) in playlist.playlist" :key="idx" @click="openPlayer(music)">
            <div class="mt-5 image-small rounded-sm d-flex justify-start">
              <v-img :src="music.image" max-width="50px" max-height="50px" />
              <div class="displayText">
                <v-card-text class="text--primary mt-n3">
                  <div>
                    <b>{{ music.title }}</b>
                  </div>
                  <div>{{ music.author }}</div>
                </v-card-text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   
  </div>
</template>

<script>

export default {
  name: "Songs",
  props: {
    playlists: {}
  },
  components: {
  },
  data: function() {
    return {
        music: "",
    };
  },
  methods: {
      openPlayer(music){
          this.music = music;
      }
  },
  watch: {}
};
</script>
<style scoped>
.songs-container {
  height: 73vh;
  overflow: scroll;
}
.displayText {
}
.test {
  /* height: 50vh; */
}
</style>