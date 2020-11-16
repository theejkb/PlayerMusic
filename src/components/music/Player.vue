<template>
  <v-card class="PlayerBottom">
    <v-list>
      <v-list-item>
        <v-img class="ml-1 rounded image" :src="image" />

        <v-card-text>
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
    someValue: 30,
    music: new Audio(),
    idCurrentMusic: 0,
    currentId: '',
    volume: 0.3,
    duration: 0,
    current_time: 0,
    isPlaying: true,
    skipInverse: false,
    showPlaylists: false,
    showPlaylist_var: "",
    likedSong: [],
    colorSongLiked: "",
    songLiked: false,
  }),
  props: {
    player: Array,
    idMusic: Number,
  },
  methods: {
    playerImage() {
      return "../../" + this.player.image;
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
      if (this.player[this.idMusic - 1]) {
        this.idMusic -= 1;
      } else {
        this.idMusic = this.player.length - 1;
      }
      this.skipInverse = true;
      this.changeSong();
    },
    next() {
      if (this.player[this.idMusic + 1]) {
        this.idMusic += 1;
      } else {
        this.idMusic = 0;
      }
      //On envoie le fichier mp3 de notre tableau à l'index souhaité
      this.skipInverse = false;
      this.changeSong();
    },
    changeSong() {
      //Reinitialisation des params des toutes les variables propres à this.music
      this.current_time = 0;
      this.music.src = this.player[this.idMusic].mp3;
      this.idCurrentMusic = this.player[this.idMusic].id;
      this.music.volume = this.volume;
      this.checkLikedSong();
      this.playSong();
    },
    endSong() {
      // TODO: changer de musique à la fin de lecture d'une musique
    },
    handleBtnPlaying() {
      this.isPlaying = !this.isPlaying;
      if (this.isPlaying) {
        this.playSong();
      } else {
        this.music.pause();
      }
    },
    playSong() {
      var playPromise = this.music.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isPlaying = true;

            this.music.play();
          })
          
      }
    },
    playThisSong(music) {
      //   this.music.src = music.mp3;
      this.idCurrentMusic = music.id;
      //   this.music.title = music.title;
      //   this.music.image = music.image;
      //   this.music.author = music.author;
      this.currentIndex = music.id;
      this.changeSong();
      this.playSong();
    },
    songVolume() {
      return (this.music.volume = this.volume);
    },
    audioDuration() {
      this.duration = this.music.duration;
      return this.duration;
    },
    seeking(seek) {
      if (this.music) this.music.currentTime = seek;
    },
    onClickValue() {
      this.current_time;
    },
    getMusicTime() {
      let time = this.current_time;
      let s = Math.floor(time % 60);
      let m = Math.floor(time / 60);
      s = s < 10 ? "0" + s : s;
      m = m < 10 ? "0" + m : m;
      let display = +m + ":" + s;
      return (this.time_affichage = display);
    },
    getMusicTimeEnd() {
      let duration = this.duration;
      let timePass = this.current_time;
      let timeleft = duration - timePass;
      let s = timeleft % 60;
      let m = Math.floor(timeleft / 60) % 60;
      s = s < 10 ? "0" + s : s;
      m = m < 10 ? "0" + m : m;
      let display = "-" + m + ":" + s;
      return (this.end_time_affichage = display);
    },

    shuffleMusics(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
    handleBtnLike(music) {
      let song = {};
      song.title = music.title;
      song.mp3 = music.mp3;
      song.author = music.author;
      song.image = music.image;
      song.id = music.id;
      console.log(song.id);

      song.liked = music.liked;
      if (music.liked == false) {
        song.liked = true;
        this.likeSong();
        this.likedSong.push(song);
      } else {
        this.unlikeSong();
        // Remove a song when unlicked
        let val = this.likedSong.indexOf(song.id);
        this.likedSong.splice(val, 1);
      }
    },
    likeSong() {
      this.colorSongLiked = "red";
      this.currentSong.liked = true;
    },
    unlikeSong() {
      this.colorSongLiked = "";
      this.currentSong.liked = false;
    },
    checkLikedSong() {
      if (this.currentSong.liked == true) {
        this.colorSongLiked = "red";
      } else {
        this.colorSongLiked = "";
      }
    },
  },
  created() {
    // fetch("https://jsonplaceholder.typicode.com/photos")
    //     .then((response) => response.json())
    //     .then((json) => (this.musics = json));
    // this.getThisMusic(0);
  },
  computed: {
    currentSong() {
      return this.player.find((el) => el.id === this.idMusic);
    },
    image() {
      return this.currentSong.image;
    },
    musicSource(){
      return this.currentSong.mp3;
    }
  },
  // beforeUpdate() {
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
  mounted() {
    this.music.src = this.musicSource;
    this.duration = this.music.duration || 0;
    this.music.addEventListener("timeupdate", () => {
      this.duration = Math.round(this.music.duration) || 0;
      this.current_time = this.music.currentTime;
    });
    this.music.addEventListener("durationchange", () => {
      this.music.currentTime = this.current_time;
    });
    console.log(this.player);
    console.log(this.idMusic);

    this.$emit("music", this.player, this.idMusic);
  },
  // watch: {
  //   currentSong: function() {
  //     this.music.src = this.currentSong.mp3;
  //     this.duration = this.music.duration || 0;
  //     this.music.addEventListener("timeupdate", () => {
  //       this.duration = Math.round(this.music.duration) || 0;
  //       this.current_time = this.music.currentTime;
  //     });
  //     this.music.addEventListener("durationchange", () => {
  //       this.music.currentTime = this.current_time;
  //     });
  //   },
  // },
};
</script>

<style>
.PlayerBottom {
  right: 0;
  bottom: 125px;
  left: 0;
}
.v-sheet.v-card {
  border-radius: 0 !important;
}
.image {
  width: 50px;
  height: 50px;
}
</style>
