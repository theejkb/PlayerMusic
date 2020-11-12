<template>
  <div>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeInLeftBig"
      leave-active-class="animated fadeOutLeftBig"
      key="playlist"
    >
      <div v-if="displayingPlaylist">
        <h1 class="d-flex justify-center mt-5 mb-5">Playlists</h1>
        <v-text-field label="Find in Playlists"></v-text-field>
        <div class="d-flex justify-start">
          <div class="mt-5 ml-2 image-small rounded-sm">
            <v-icon>mdi-plus</v-icon>
          </div>
          <div>
            <v-card-text class="text--primary mt-2">
              <div>
                <b>New Playlist...</b>
              </div>
            </v-card-text>
          </div>
        </div>
        <hr class="ml-15" />

        <div
          class="d-flex justify-start"
          v-for="playlist in playlists"
          :key="playlist.playlistId"
          @click="openPlaylist(playlist)"
        >
          <div class="mt-5 ml-2 image-small rounded-sm">
            <v-img :src="playlist.playlistImg" width="100px" height="100px" />
          </div>
          <div>
            <v-container fill-height>
              <v-layout class="text--primary text-center ml-2 mt-10">
                <b>{{playlist.playlistName}}</b>                
              </v-layout>
              
            </v-container>
          </div>
          <v-icon fill-width class="mt-2 ml-auto mr-5">mdi-chevron-right</v-icon>
        </div>
      </div>
    </transition>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeInRightBig"
      leave-active-class="animated fadeOutRightBig"
      key="playlist"
    >
      <div v-if="!displayingPlaylist">
        <div class="retour mt-10">
          <v-icon color="red">mdi-chevron-left</v-icon>
          <span @click="goBack" class="text-display">Playlists</span>
        </div>
        <div>
          <v-card :elevation="10" height="250" width="250" class="transparent mx-auto mt-10">
            <v-img :src="displayImg"></v-img>
          </v-card>
          <v-card-text class="text--primary mt-2 text-center title">
            <b>{{displayName}}</b>
          </v-card-text>
          <div class="d-flex justify-center">
            <v-btn class="play mr-2" elevation="0">
              <v-icon color="red">mdi-play</v-icon>
              <p class="text-display my-auto ml-2">Play</p>
            </v-btn>
            <v-btn class="play ml-2" elevation="0">
              <v-icon color="red">mdi-shuffle</v-icon>
              <p class="text-display my-auto ml-2">Shuffle</p>
            </v-btn>
          </div>
          <hr class="mt-5 mb-5 mx-auto" width="400px" />
          <div width="400px">
            <div v-for="music in displayPlaylist" :key="music">
              <v-img class="mt-5 image-music">
                <v-img
                  class="image rounded-xl"
                  :src="music.image"
                  :key="music.id"
                />
              </v-img>
              <div class="displayText">
                <v-card-text class="text--primary mb-n5">
                  <div>
                    <b>{{ music.title }}</b>
                  </div>
                </v-card-text>

                <v-card-subtitle>
                  <div>{{ music.author }}</div>
                </v-card-subtitle>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Playlist",
  components: {},
  props:{
      playlists: {},
  },
  data: () => ({
    displayingPlaylist: true,
    diplayImg: '',
    displayName: '',
    displayPlaylist: [],
    image : '',    
  }),
  methods: {
    openPlaylist(playlist) {
      this.diplayPlaylist = [...playlist.playlist];
      this.displayName = playlist.playlistName;
      this.displayImg = playlist.playlistImg;
      this.displayingPlaylist = false;
    },
    goBack() {
      this.displayingPlaylist = true;
      this.diplayPlaylist = '';
      this.displayName = '';
      this.displayImg = '';
    }
  },
  watch: {},
};
</script>
<style scoped>
.text-center {
  text-align: center;
}
.retour,
.play {
  color: rgb(80, 80, 80);
}
.buttonDisplay {
  margin: auto;
}
.text-display {
  color: red;
}
</style>