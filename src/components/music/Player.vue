<template>
  <div class="player-container mx-auto">
    <div class="background" :style="{ backgroundImage: 'url(' + image + ')' }" />
    <v-card class="mx-auto player rounded-xl px-3" outlined>
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
            <div @click="playThisSong(music)" v-if="music.id != idCurrentMusic">
              <Music :music="music" :affichage="showPlaylist_var"></Music>
            </div>
          </div>
        </div>
      </div>
      <v-card-text>
        <v-card elevation="0" class="d-flex justify-space-between">
          <span>{{getMusicTime()}}</span>
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
        <v-btn @click="previous" class="ml-2 mt-3" fab icon height="40px" right width="40px">
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
        <v-btn @click="next" class="ml-2 mt-3" fab icon height="40px" right width="40px">
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
          :min=0
          :max=1
          :size=80
          :stepSize=0.01
          primary-color="#adadad"
          secondary-color="#dedede"
          text-color="#636363"
          @input="songVolume"
          v-model="volume"
        ></knob-control>
        <v-icon class="mx-5" @click="showPlaylist">mdi-library</v-icon>
        <v-icon class="mx-5" @click="likeThisSong(currentSong)" :color="colorSongLiked">mdi-heart</v-icon>
        <v-icon class="mx-5">mdi-shuffle</v-icon>
      </div>
    </v-card>
  </div>
</template>

<script>
import Music from "./Music";
import KnobControl from "vue-knob-control";

export default {
  name: "Player",
  components: {
    Music,
    KnobControl
  },
  data: () => ({
    musics: [
      {
        id: 0,
        title: "The Curse of the Sad Mummy",
        image: require("../../assets/musics/img/mummy.jpg"),
        mp3: require("../../assets/musics/the-curse-of-the-sad-mummy-amumu-music-video-league-of-legends.mp3"),
        author: "Riot Games"
      },
      {
        id: 1,
        title: "POP/STARS",
        image: require("../../assets/musics/img/kda_popstars.jpg"),
        mp3: require("../../assets/musics/kda-popstars-ft-madison-beer-gi-dle-jaira-burns-music-video-league-of-legends.mp3"),
        author: "K/DA (ft. Madison Beer, (G)I-DLE, Jaira Burns)"
      },
      {
        id: 2,
        title: "Ignite - Worlds 2016",
        image: require("../../assets/musics/img/zeddIgnite.jpg"),
        mp3: require("../../assets/musics/ignite-ft-zedd-worlds-2016-league-of-legends.mp3"),
        author: "Riot Games (ft. Zedd)"
      },
      {
        id: 3,
        title: "Legends Never Die",
        image: require("../../assets/musics/img/legendsNeverDie.jpg"),
        mp3: require("../../assets/musics/legends-never-die-ft-against-the-current-worlds-2017-league-of-legends.mp3"),
        author: "Riot Games (ft. Against The Current)"
      },
      {
        id: 4,
        title: "RISE",
        image: require("../../assets/musics/img/rise.jpg"),
        mp3: require("../../assets/musics/rise-ft-the-glitch-mob-mako-and-the-word-alive-worlds-2018-league-of-legends (1).mp3"),
        author: "Riot Games (ft. The Glitch Mob, Mako, and The Word Alive)"
      },
      {
        id: 5,
        title: "True Damage",
        image: require("../../assets/musics/img/truedamage_giants.jpg"),
        mp3: require("../../assets/musics/true-damage-giants-ft-becky-g-keke-palmer-soyeon-duckwrth-thutmose-league-of-legends.mp3"),
        author:
          "GIANTS (ft. Becky G, Keke Palmer, SOYEON de (G)I-DLE, DUCKWRTH, Thutmose)"
      },
      {
        id: 6,
        title: "Warriors",
        image: require("../../assets/musics/img/warrios.jpg"),
        mp3: require("../../assets/musics/warriors-ft-imagine-dragons-worlds-2014-league-of-legends.mp3"),
        author: "Riot Games (ft. Imagine Dragons)"
      },
      {
        id: 7,
        title: "Get Jinxed",
        image: require("../../assets/musics/img/getJinxed.jpg"),
        mp3: require("../../assets/musics/get-jinxed-jinx-music-video-league-of-legends.mp3"),
        author: "Riot Games"
      }
    ],
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
    songLiked: false
  }),

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
      if (this.musics[this.index_playing - 1]) {
        this.index_playing -= 1;
      } else {
        this.index_playing = this.musics.length - 1;
      }
      this.skipInverse = true;
      this.changeSong();
    },
    next() {
      if (this.musics[this.index_playing + 1]) {
        this.index_playing += 1;
      } else {
        this.index_playing = 0;
      }
      //On envoie le fichier mp3 de notre tableau à l'index souhaité
      this.skipInverse = false;
      this.changeSong();
    },
    changeSong() {
      //Reinitialisation des params des toutes les variables propres à this.music 
      this.current_time = 0;
      this.music.src = this.musics[this.index_playing].mp3;
      this.idCurrentMusic = this.musics[this.index_playing].id;
      this.music.volume = this.volume;
      this.unlikeSong();
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
    likeThisSong(music) {
      let song = {};
      song.title = music.title;
      song.mp3 = music.mp3;
      song.author = music.author;
      song.image = music.image;
      song.id = music.id;
      song.liked = false;
      if (this.song.liked == false) {
        this.likeSong();
        this.song.liked = true;
        this.likedSong.push(song);
      } else {
        this.unlikeSong();
        this.likedSong = this.likedSong.filter(
          item => item.id !== this.song.id
        );
      }
    },
    // likeSong() {
    //   this.colorSongLiked = "red";
    //   this.songLiked = true;
    // },
    // unlikeSong() {
    //   this.colorSongLiked = "";
    //   this.songLiked = false;
    // }
  },
  created() {
    // fetch("https://jsonplaceholder.typicode.com/photos")
    //     .then((response) => response.json())
    //     .then((json) => (this.musics = json));
    // this.getThisMusic(0);
  },
  computed: {
    currentSong() {
      return this.musics[this.index_playing];
    },
    image() {
      return this.currentSong.image;
    }
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
  }
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
