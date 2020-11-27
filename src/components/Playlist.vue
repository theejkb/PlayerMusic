<template>
  <div class="playlistParent">
    <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeInLeftBig"
      leave-active-class="animated fadeOutLeftBig"
      key="playlist"
    >
      <div v-if="displayingPlaylist" class="playlists">
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
          v-for="(playlist, idx) in musics"
          :key="idx"
          @click="openPlaylist(playlist)"
        >
          <div class="mt-5 ml-2 image-small rounded-sm">
            <v-img :src="playlist.playlistImg" width="100px" height="100px" />
          </div>
          <div>
            <v-container fill-height>
              <v-layout class="text--primary text-center ml-2 mt-10">
                <b>{{ playlist.playlistName }}</b>
              </v-layout>
            </v-container>
          </div>
          <v-icon fill-width class="mt-2 ml-auto mr-5"
            >mdi-chevron-right</v-icon
          >
        </div>
      </div>
    </transition>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeInRightBig"
      leave-active-class="animated fadeOutRightBig"
      key="playlistopen"
    >
      <div v-if="!displayingPlaylist" class="playlistOpen">
        <div class="retour mt-10">
          <v-icon @click="goBack" color="red">mdi-chevron-left</v-icon>
          <span @click="goBack" class="text-display">Playlists</span>
        </div>
        <div>
          <v-card
            :elevation="10"
            height="250"
            width="250"
            class="transparent mx-auto mt-10"
          >
            <v-img :src="displayImg"></v-img>
          </v-card>
          <v-card-text class="text--primary mt-2 text-center title">
            <b>{{ displayName }}</b>
          </v-card-text>
          <div class="d-flex justify-center">
            <v-btn aria-label="play" class="play mr-2" elevation="0">
              <v-icon color="red">mdi-play</v-icon>
              <p
                class="text-display my-auto ml-2"
                @click="playThisPlaylist(playlistId)"
              >
                Play
              </p>
            </v-btn>
            <v-btn aria-label="shuffle" class="play ml-2" elevation="0">
              <v-icon color="red">mdi-shuffle</v-icon>
              <p
                class="text-display my-auto ml-2"
                @click="playThisPlaylistShuffle(playlistId)"
              >
                Shuffle
              </p>
            </v-btn>
          </div>
          <hr class="mt-5 mb-5 mx-auto" width="400px" />
          <div width="400px">
            <div
              v-for="music in displayPlaylist"
              :key="music.id"
              @click="playThisMusicPlaylist(music, playlistId)"
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
              <hr class="ligne" />
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
  props: {
    musics: {},
  },
  data: () => ({
    displayingPlaylist: true,
    diplayImg: "",
    displayName: "",
    displayPlaylist: [],
    playlistId: "",
    image: "",
  }),
  methods: {
    openPlaylist(playlist) {
      this.displayPlaylist = [...playlist.playlist];
      this.displayName = playlist.playlistName;
      this.displayImg = playlist.playlistImg;
      this.playlistId = playlist.playlistId;
      this.displayingPlaylist = false;
    },
    goBack() {
      this.displayingPlaylist = true;
      this.diplayPlaylist = "";
      this.playlistId = "";
      this.displayName = "";
      this.displayImg = "";
    },
    playThisPlaylist(playlistId) {
      this.$emit("playThisPlaylist", playlistId);
    },
    playThisPlaylistShuffle(playlistId) {
      this.$emit("playThisPlaylistShuffle", playlistId);
    },
    playThisMusicPlaylist(music, playlistId) {
      this.$emit("playThisMusicPlaylist", music, playlistId);
    },
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
.playlistOpen {
  width: 100%;
  overflow: scroll;
  padding-bottom: 25px;
  max-height: 74vh;
  overflow-x: hidden;
}
.playlists {
  width: 100%;
  overflow: scroll;
  padding-bottom: 25px;
  max-height: 74vh;
  overflow-x: hidden;
}
.playlistParent {
  width: 100%;
  height: 85%;
  --animate-duration: 0.5s;
}
.displayText {
  white-space: nowrap;
  overflow: hidden;
  width: auto;
  margin: 0 20px 0 0;
}
hr {
  width: auto;
  margin: -10px 20px;
  height: 1px;
  background-color: transparent;
}
.ligne {
  width: 80vh;
  margin-left: 66px;
}
</style>
