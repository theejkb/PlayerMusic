<template>
  <div>
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
        <div v-for="(music, idx) in player" :key="idx">
          <!-- On n'affiche pas la musique courante -->
          <div @click="playThisSong(music)" v-if="music.id != idCurrentMusic">
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
</template>

<script>
import Music from "./music/Music";
import KnobControl from "vue-knob-control";

export default {
  name: "PlayerSong",
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
    volume: 0.3,
    duration: 0,
    current_time: 0,
    current_time_affichage: "0:00",
    end_time_affichage: "0:00",
    isPlaying: false,
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
      if (this.musics[this.idMusic - 1]) {
        this.idMusic -= 1;
      } else {
        this.idMusic = this.idMusic - 1;
      }
      this.skipInverse = true;
      this.changeSong();
    },
    next() {
      if (this.musics[this.idMusic + 1]) {
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
      this.music.src = this.musics[this.idMusic].mp3;
      this.idCurrentMusic = this.musics[this.idMusic].id;
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
        this.music.play();
      } else {
        this.music.pause();
      }
    },
    playSong() {
      this.isPlaying = true;
      this.music.play();
    },
    playThisSong(music) {
      //   this.music.src = music.mp3;
      this.idCurrentMusic = music.id;
      //   this.music.title = music.title;
      //   this.music.image = music.image;
      //   this.music.author = music.author;
      this.index_playing = music.id;
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
  },
  mounted() {
    this.music.src = this.currentSong.mp3;
    this.duration = this.music.duration || 0;
    this.music.addEventListener("timeupdate", () => {
      this.duration = Math.round(this.music.duration) || 0;
      this.current_time = this.music.currentTime;
    });
    this.music.addEventListener("durationchange", () => {
      this.music.currentTime = this.current_time;
    });
  },
};
</script>

<style>
.musics-container {
  height: 340px;
  overflow: scroll;
}

.player-container {
  background-color: black;
  height: 100%;
}

.background {
  position: absolute;
  filter: blur(0.5rem);
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center;
}

.player {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
}

@media screen and (max-width: 500px) {
  .player {
    height: 100%;
    margin-top: 0%;
  }
}

.v-card__actions {
  padding: 0;
}

::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* make scrollbar transparent */
}

.background {
  transition: 0.3s ease-out;
}
</style>
