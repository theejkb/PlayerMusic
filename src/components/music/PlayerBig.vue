<template>
  <div class="playerMusic">
    <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeInLeftBig"
      leave-active-class="animated fadeOutLeftBig"
      key="playerBottom"
    >
      <v-card v-if="!playerBig" class="PlayerBottom">
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
              <v-btn @click="handleBtnPlaying()" icon color="black">
                <v-icon v-if="isPlaying == false">mdi-play</v-icon>
                <v-icon v-else>mdi-pause</v-icon>
              </v-btn>
            </v-list-item-icon>

            <v-list-item-icon>
              <v-btn icon @click="next">
                <v-icon color="black">mdi-skip-next</v-icon>
              </v-btn>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-card>
    </transition>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeInLeftBig"
      leave-active-class="animated fadeOutLeftBig"
      key="playerBottom"
    >
      <div v-if="playerBig" class="PlayerBig">
        <Music
          :affichage="showPlaylist_var"
          :value="duration"
          :music="currentSong"
          :skipInverse="skipInverse"
        ></Music>
        <div v-if="showPlaylists">
          <div class="d-flex justify-space-between">
            <p>Playing Next</p>
            <v-btn @click="shuffleMusics(musics)" elevation="0" color="white">
              <v-icon>mdi-shuffle</v-icon>
            </v-btn>
          </div>
          <div class="musics-container">
            <!-- Boucle sur notre tableau de musique -->
            <div v-for="(music, idx) in musics" :key="idx">
              <!-- On n'affiche pas la musique courante -->
              <div
                @click="playThisSong(music)"
                v-if="music.id != idCurrentMusic"
              >
                <Music :music="music" :affichage="showPlaylist_var"></Music>
              </div>
            </div>
          </div>
        </div>
        <v-card-text>
          <v-card elevation="0" class="d-flex justify-space-between">
            <span>{{ getMusicTime() }}</span>
            <span>{{ getMusicTimeEnd() }}</span>
          </v-card>
          <v-slider
            v-model="current_time"
            @change="seeking(current_time)"
            @click="onClickValue"
            step="1"
            min="0"
            :max="duration"
            thumb-color="#b0b0b0"
            track-color="#ebebeb"
            color="#adadad"
          ></v-slider>
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
              class="ml-2 mt-3"
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

        <!-- <v-card-text>
        <v-slider
          v-model="volume"
          @input="songVolume"
          thumb-color="black"
          track-color="rgba(0,0,0,0.08)"
          color="black"
          step="0.01"
          min="0"
          max="1"
          append-icon="mdi-volume-high"
          prepend-icon="mdi-volume-low"
        ></v-slider>
    </v-card-text>-->
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
            @input="songVolume"
            v-model="volume"
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
    </transition>
  </div>
</template>

<script>
// import Music from "./Music";
// import KnobControl from "vue-knob-control";

export default {
  name: "Player",
  components: {
    // Music,
    // KnobControl,
  },
  data: () => ({
    playerBig: false,
    // someValue: 30,
    // music: new Audio(),
    // idCurrentMusic: "",
    // idCurrentMusicTmp: "",
    // volume: 0.5,
    // duration: 0,
    // current_time: 0,
    // isPlaying: true,
    // skipInverse: false,
    // showPlaylists: false,
    // showPlaylist_var: "",
    // showPlayer: false,
    // likedSong: [],
    // colorSongLiked: "",
    // songLiked: false,
  }),
  props: {
    isPlaying: Boolean,
    currentSong: Object,
    // player: Array,
    // idMusic: Number,
    // isShuffle: Boolean,
  },
  methods: {
    showPlayerBig() {
      this.playerBig = true;
    },
    // TODO: Clean-up methods
    // showPlaylist() {
    //   this.showPlaylists == !this.showPlaylists;
    //   if (this.showPlaylists == true) {
    //     this.showPlaylist_var = "small";
    //     console.log(this.showPlaylist_var);
    //   } else {
    //     this.showPlaylist_var = "big";
    //   }
    // },
    // resizePlayer() {
    //   this.showPlayer = true;
    //   console.log("test");
    // },
    // previous() {
    //   if (this.isShuffle == true) {
    //     this.shuffle();
    //   } else {
    //     if (this.player[this.idCurrentMusic - 1]) {
    //       this.idCurrentMusic -= 1;
    //     } else {
    //       this.idCurrentMusic = this.player.length - 1;
    //     }
    //   }
    //   this.skipInverse = true;
    //   this.changeSong();
    // },
    next() {
      this.$emit("nextSong");
    },
    //   if (this.isShuffle == true) {
    //     this.shuffle();
    //   } else {
    //     if (this.player[this.idCurrentMusic + 1]) {
    //       this.idCurrentMusic += 1;
    //     } else {
    //       this.idCurrentMusic = 0;
    //     }
    //   }
    //   //On envoie le fichier mp3 de notre tableau à l'index souhaité
    //   this.skipInverse = false;
    //   this.changeSong();
    // },
    // shuffle() {
    //   this.idCurrentMusicTmp = this.idCurrentMusic;
    //   this.idCurrentMusic = this.entierAleatoire(0, this.player.length - 1);
    //   while (this.idCurrentMusic == this.idCurrentMusicTmp) {
    //     this.idCurrentMusic = this.entierAleatoire(0, this.player.length - 1);
    //   }
    // },
    // entierAleatoire(min, max) {
    //   return Math.floor(Math.random() * (max - min + 1)) + min;
    // },
    // changeSong() {
    //   //Reinitialisation des params des toutes les variables propres à this.music
    //   this.music.pause();
    //   this.current_time = 0;
    //   this.idCurrentMusic = this.idMusic;
    //   console.log(this.currentSong.mp3);
    //   this.music.src = this.currentSong.mp3;
    //   // this.playThisMusic(this.music);
    //   // this.$emit("getMusic", this.currentSong);
    //   // this.checkLikedSong();
    //   this.playSong();
    // },
    // playAllSongs() {
    //   this.music.pause();
    //   if (this.isShuffle == true) {
    //     this.shuffle();
    //   }
    //   this.current_time = this.idCurrentMusic;
    //   this.idMusic = 0;
    //   this.changeSong();
    // },
    handleBtnPlaying() {
      // this.isPlaying = !this.isPlaying;
      if (this.isPlaying) {
        this.$emit("paused");
      } else {
        this.$emit("playing");
      }
    },
    // playSong() {
    //   var playPromise = this.music.play();
    //   if (playPromise !== undefined) {
    //     playPromise.then(() => {
    //       this.isPlaying = true;
    //       this.music.play();
    //     });
    //   }
    // },
    // playThisMusic(music) {
    //   this.music.pause();
    //   console.log("Player -> playThisMusic");
    //   this.idCurrentMusic = music.id;
    //   this.currentIndex = music.id;
    //   this.music.src = music.mp3;
    //   // this.checkLikedSong();
    //   this.playSong();
    // },
    // songVolume() {
    //   return (this.music.volume = this.volume);
    // },
    // audioDuration() {
    //   this.duration = this.music.duration;
    //   return this.duration;
    // },
    // seeking(seek) {
    //   if (this.music) this.music.currentTime = seek;
    // },
    // onClickValue() {
    //   this.current_time;
    // },
    // getMusicTime() {
    //   let time = this.current_time;
    //   let s = Math.floor(time % 60);
    //   let m = Math.floor(time / 60);
    //   s = s < 10 ? "0" + s : s;
    //   m = m < 10 ? "0" + m : m;
    //   let display = +m + ":" + s;
    //   return (this.time_affichage = display);
    // },
    // getMusicTimeEnd() {
    //   let duration = this.duration;
    //   let timePass = this.current_time;
    //   let timeleft = duration - timePass;
    //   let s = timeleft % 60;
    //   let m = Math.floor(timeleft / 60) % 60;
    //   s = s < 10 ? "0" + s : s;
    //   m = m < 10 ? "0" + m : m;
    //   let display = "-" + m + ":" + s;
    //   return (this.end_time_affichage = display);
    // },
    // shuffleMusics(array) {
    //   for (let i = array.length - 1; i > 0; i--) {
    //     const j = Math.floor(Math.random() * (i + 1));
    //     [array[i], array[j]] = [array[j], array[i]];
    //   }
    //   return array;
    // },
    // handleBtnLike(music) {
    //   let song = {};
    //   song.title = music.title;
    //   song.mp3 = music.mp3;
    //   song.author = music.author;
    //   song.image = music.image;
    //   song.id = music.id;
    //   console.log(song.id);
    //   song.liked = music.liked;
    //   if (music.liked == false) {
    //     song.liked = true;
    //     this.likeSong();
    //     this.likedSong.push(song);
    //   } else {
    //     this.unlikeSong();
    //     // Remove a song when unlicked
    //     let val = this.likedSong.indexOf(song.id);
    //     this.likedSong.splice(val, 1);
    //   }
    // },
    // likeSong() {
    //   this.colorSongLiked = "red";
    //   this.currentSong.liked = true;
    // },
    // unlikeSong() {
    //   this.colorSongLiked = "";
    //   this.currentSong.liked = false;
    // },
    // checkLikedSong() {
    //   if (this.currentSong.liked == true) {
    //     this.colorSongLiked = "red";
    //   } else {
    //     this.colorSongLiked = "";
    //   }
    // },
    // isSongEnd() {
    //   console.log(this.music.duration + " -- " + this.music.currentTime);
    //   if (this.music.duration == this.music.currentTime) {
    //     return this.next();
    //   }
    // },
  },
  created() {
    // fetch("https://jsonplaceholder.typicode.com/photos")
    //     .then((response) => response.json())
    //     .then((json) => (this.musics = json));
    // this.getThisMusic(0);
  },
  computed: {
    // currentSong() {
    //   return this.player.find((el) => el.id === this.idMusic);
    // },
  },
  // mounted() {
  //   this.music.src = this.musicSource;
  //   this.duration = this.music.duration || 0;
  //   this.music.addEventListener("timeupdate", () => {
  //     this.duration = Math.round(this.music.duration) || 0;
  //     this.current_time = this.music.currentTime;
  //   });
  //   this.music.addEventListener("durationchange", () => {
  //     this.music.currentTime = this.current_time;
  //   });
  // },
  // watch: {
  // TODO: Changer de musique quand elle est terminée
  // },
};
</script>

<style scoped>
.PlayerBottom {
  right: 0;
  bottom: 125px;
  left: 0;
}
.playerMusic {
  overflow: visible !important;
}
.v-sheet.v-card {
  border-radius: 0 !important;
}
.image {
  width: 50px;
  height: 50px;
}
</style>
