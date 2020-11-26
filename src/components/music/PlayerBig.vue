<template>
  <div class="mainBigPlayer pl-5 pr-5">
    <!--<div
      class="background"
      :style="{ backgroundImage: 'url(' + currentSong.image + ')' }"
    ></div>-->
    <v-icon large class="mx-auto d-block mt-8" @click="leavePlayerBig"
      >mdi-window-close</v-icon
    >

    <Music
      class="mt-10"
      :affichage="showPlaylist_var"
      :music="currentSong"
      :skipInverse="skipInverse"
    ></Music>
    <div v-if="showPlaylists">
      <div class="d-flex justify-space-between">
        <p>Playing Next</p>
        <v-btn
          aria-label="shuffle"
          @click="shuffleMusics(musics)"
          elevation="0"
          color="white"
        >
          <v-icon>mdi-shuffle</v-icon>
        </v-btn>
      </div>
      <div class="musics-container">
        <div v-for="(music, idx) in player" :key="idx">
          <div @click="playThisMusicPlayer(music)" v-if="music.id != idMusic">
            <Music :music="music" :affichage="showPlaylist_var"></Music>
          </div>
        </div>
      </div>
    </div>
    <v-card-text>
      <v-slider
        v-model="currentTime"
        @change="seeking(currentTime)"
        @click="currentTime"
        step="1"
        min="0"
        :max="durationParent"
        track-color="#E7E7E7"
        thumb-color="#AFAFAF"
        color="#AFAFAF"
        class="mb-n9"
      ></v-slider>
      <v-card
        elevation="0"
        class="mr-2 ml-2 d-flex justify-space-between"
        style="background: transparent"
      >
        <span>{{ getMusicTime() }}</span>
        <span>{{ getMusicTimeEnd() }}</span>
      </v-card>
    </v-card-text>
    <div class="d-flex justify-space-around">
      <v-btn
        @click="previous"
        class="ml-2 mt-3"
        fab
        icon
        height="40px"
        right
        width="40px"
      >
        <v-icon>mdi-skip-previous</v-icon>
      </v-btn>
      <v-card-actions>
        <v-btn
          @click="handleBtnPlaying()"
          class="ml-2 mt-1"
          fab
          icon
          height="40px"
          right
          width="40px"
        >
          <v-icon v-if="isPlaying == false">mdi-play</v-icon>
          <v-icon v-else>mdi-pause</v-icon>
        </v-btn>
      </v-card-actions>
      <v-btn
        @click="next"
        class="ml-2 mt-3"
        fab
        icon
        height="40px"
        right
        width="40px"
      >
        <v-icon>mdi-skip-next</v-icon>
      </v-btn>
    </div>
    <v-card-text class="d-flex"></v-card-text>
    <div class="d-flex justify-end mb-5 align-baseline mx-5">
      <knob-control
        class="mr-auto"
        :min="0"
        :max="1"
        :size="80"
        :stepSize="0.01"
        primary-color="#adadad"
        secondary-color="#dedede"
        text-color="#636363"
        @input="emitSongVolume"
        v-model="songVolume"
      ></knob-control>
      <v-icon class="mx-5" @click="showPlaylist">mdi-library</v-icon>
      <v-icon
        class="mx-5"
        @click="handleBtnLike(currentSong)"
        :color="colorSongLiked"
        >mdi-heart</v-icon
      >
      <v-icon class="mx-5">mdi-shuffle</v-icon>
    </div>
  </div>
</template>

<script>
import Music from "./Music";
import KnobControl from "vue-knob-control";

export default {
  name: "PlayerBig",
  components: {
    Music,
    KnobControl,
  },
  data: () => ({
    rating: 0,
    someValue: 30,
    index_playing: 0,
    music: new Audio(),
    idCurrentMusic: 0,
    music_playing: -1,
    current_time_affichage: "0:00",
    end_time_affichage: "0:00",
    skipInverse: false,
    showPlaylists: false,
    showPlaylist_var: "",
    colorSongLiked: "",
    currentTime: "",
    songVolume: 0.5,
    isSongLikedChild: false,
  }),
  props: {
    player: Array,
    idMusic: Number,
    currentSong: Object,
    isPlaying: Boolean,
    durationParent: Number,
    currentTimeParent: Number,
    volumeParent: Number,
    isSongLiked: Boolean,
  },
  methods: {
    leavePlayerBig() {
      this.$emit("leavePlayerBig");
    },
    showPlaylist() {
      this.showPlaylists = !this.showPlaylists;
      if (this.showPlaylists == true) {
        this.showPlaylist_var = "small";
        console.log(this.showPlaylist_var);
      } else {
        this.showPlaylist_var = "big";
      }
    },
    previous() {
      this.$emit("previousSong");
      this.skipInverse = true;
    },
    next() {
      this.$emit("nextSong");
      this.skipInverse = false;
    },
    handleBtnPlaying() {
      if (this.isPlaying) {
        this.$emit("paused");
      } else {
        this.$emit("playing");
      }
    },
    playSong() {
      this.isPlaying = true;
      this.music.play();
    },
    playThisMusicPlayer(music) {
      this.$emit("playThisMusicPlayer", music);
    },
    audioDuration() {
      this.durationParent = this.music.duration;
      return this.durationParent;
    },
    seeking(currentTime) {
      if (this.music) {
        this.currentTime = currentTime;
        console.log(currentTime);
        this.$emit("currentTimeSeek", this.currentTime);
      }
    },
    onClickValue() {
      this.currentTime;
    },
    getMusicTime() {
      let time = this.currentTimeParent;
      let s = Math.floor(time % 60);
      let m = Math.floor(time / 60);
      s = s < 10 ? "0" + s : s;
      m = m < 10 ? "0" + m : m;
      let display = +m + ":" + s;
      return (this.current_time_affichage = display);
    },
    getMusicTimeEnd() {
      this.currentTime = this.currentTimeParent;
      let duration = this.durationParent;
      let timePass = this.currentTimeParent;
      let timeleft = duration - timePass;
      let s = Math.floor(timeleft % 60);
      let m = Math.floor(timeleft / 60) % 60;
      s = s < 10 ? "0" + s : s;
      m = m < 10 ? "0" + m : m;
      let display = "-" + m + ":" + s;
      return (this.end_time_affichage = display);
    },
    emitSongVolume() {
      this.songVolume = Number(this.songVolume.toFixed(2));
      this.$emit("setSongVolume", this.songVolume);
    },
    handleBtnLike(music) {
      this.$emit("handleLikedSong", music);
      if (this.isSongLiked) {
        this.unlikeSong();
      } else {
        this.likeSong();
      }
    },
    likeSong() {
      this.colorSongLiked = "red";
    },
    unlikeSong() {
      this.colorSongLiked = "";
    },
  },
  created() {
    if (this.isSongLiked) {
      this.likeSong();
    } else {
      this.unlikeSong();
    }
  },
};
</script>

<style>
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  filter: blur(5rem);
}
.musics-container {
  height: 350px;
  overflow: scroll;
}
.mainBigPlayer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-color: white;
}
hr {
  width: 50px;
  height: 3px;
  background-color: black;
}

@media screen and (max-width: 500px) {
  .mainBigPlayer {
    height: 100%;
    width: 100%;
    margin-top: 0%;
    background-color: white;
  }
}
</style>
