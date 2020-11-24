<template>
  <v-app>
    <v-card class="player">
      <v-main class="mr-5 ml-5 Main">
        <router-view
          :musics="musics"
          :allSongs="allSongs"
          :idMusic="idMusic"
          @playAllSongsShuffle="playAllSongsShuffle"
          @playThisPlaylist="playThisPlaylist"
          @playThisPlaylistShuffle="playThisPlaylistShuffle"
          @playAllSongs="playAllSongs"
          @playThisMusicPlaylist="playThisMusicPlaylist"
          @playThisMusic="playThisMusic"
        ></router-view>
      </v-main>

      <Player
        v-if="showPlayer == true"
        :currentSong="currentSong"
        :isPlaying="isPlaying"
        @nextSong="nextSong"
        @playing="playing"
        @paused="paused"
        @showPlayerBig="showPlayerBig"
      />
      <transition name="showPlayerBig">
        <PlayerBig
          v-if="isPlayerBigVisible == true"
          :player="player"
          :currentSong="currentSong"
          :idMusic="idMusic"
          :isPlaying="isPlaying"
          :currentTimeParent="currentTime"
          :durationParent="duration"
          :songVolume="songVolume"
          @nextSong="nextSong"
          @previousSong="previousSong"
          @playing="playing"
          @paused="paused"
          @leavePlayerBig="leavePlayerBig"
          @currentTimeSeek="currentTimeSeek"
          @setSongVolume="setSongVolume"
          @playThisMusicPlayer="playThisMusicPlayer"
        />
      </transition>
      <v-bottom-navigation
        horizontal
        absolute
        v-if="isPlayerBigVisible == false"
      >
        <router-link to="/" class="nav mr-5">
          <v-icon color="grey" class="mt-2" @click="goToSongs"
            >mdi-music-box-multiple-outline</v-icon
          >
          <p class="text-red" @click="goToSongs">Songs</p>
        </router-link>

        <router-link to="/playlists" class="nav ml-5 mr-5">
          <v-icon color="grey" class="mt-2" @click="goToPlaylist"
            >mdi-playlist-music</v-icon
          >
          <p class="text-red" @click="goToPlaylist">Playlist</p>
        </router-link>

        <router-link to="/playerSong" class="nav ml-5">
          <v-icon color="grey" color-active="red" class="mt-2"
            >mdi-card-search-outline</v-icon
          >
          <p class="text-red">Player</p>
        </router-link>
      </v-bottom-navigation>
    </v-card>
  </v-app>
</template>

<script>
import Player from "./components/music/Player";
import PlayerBig from "./components/music/PlayerBig";

export default {
  name: "App",

  components: {
    Player,
    PlayerBig,
  },

  data: () => ({
    image: "",
    player: [],
    showPlayer: false,
    playerTemp: [],
    idMusic: 0,
    idMusicTmp: "",
    isShuffle: false,
    isPlaying: false,
    isPlayerBigVisible: false,
    duration: 0,
    currentTime: 0,
    songVolume: 0.5,
    musics: [
      {
        playlistId: 0,
        playlistName: "League of Legends",
        playlistImg: require("./assets/musics/img/lol.png"),
        playlist: [
          {
            id: 0,
            title: "The Curse of the Sad Mummy",
            image: require("./assets/musics/img/mummy.jpg"),
            mp3: require("./assets/musics/the-curse-of-the-sad-mummy-amumu-music-video-league-of-legends.mp3"),
            author: "Riot Games",
            liked: false,
          },
          {
            id: 1,
            title: "POP/STARS",
            image: require("./assets/musics/img/kda_popstars.jpg"),
            mp3: require("./assets/musics/kda-popstars-ft-madison-beer-gi-dle-jaira-burns-music-video-league-of-legends.mp3"),
            author: "K/DA (ft. Madison Beer, (G)I-DLE, Jaira Burns)",
            liked: false,
          },
          {
            id: 2,
            title: "Ignite - Worlds 2016",
            image: require("./assets/musics/img/zeddIgnite.jpg"),
            mp3: require("./assets/musics/ignite-ft-zedd-worlds-2016-league-of-legends.mp3"),
            author: "Riot Games (ft. Zedd)",
            liked: false,
          },
          {
            id: 3,
            title: "Legends Never Die",
            image: require("./assets/musics/img/legendsNeverDie.jpg"),
            mp3: require("./assets/musics/legends-never-die-ft-against-the-current-worlds-2017-league-of-legends.mp3"),
            author: "Riot Games (ft. Against The Current)",
            liked: false,
          },
          {
            id: 4,
            title: "RISE",
            image: require("./assets/musics/img/rise.jpg"),
            mp3: require("./assets/musics/rise-ft-the-glitch-mob-mako-and-the-word-alive-worlds-2018-league-of-legends (1).mp3"),
            author: "Riot Games (ft. The Glitch Mob, Mako, and The Word Alive)",
            liked: false,
          },
          {
            id: 5,
            title: "True Damage",
            image: require("./assets/musics/img/truedamage_giants.jpg"),
            mp3: require("./assets/musics/true-damage-giants-ft-becky-g-keke-palmer-soyeon-duckwrth-thutmose-league-of-legends.mp3"),
            author:
              "GIANTS (ft. Becky G, Keke Palmer, SOYEON de (G)I-DLE, DUCKWRTH, Thutmose)",
            liked: false,
          },
          {
            id: 6,
            title: "Warriors",
            image: require("./assets/musics/img/warrios.jpg"),
            mp3: require("./assets/musics/warriors-ft-imagine-dragons-worlds-2014-league-of-legends.mp3"),
            author: "Riot Games (ft. Imagine Dragons)",
            liked: false,
          },
          {
            id: 7,
            title: "Get Jinxed",
            image: require("./assets/musics/img/getJinxed.jpg"),
            mp3: require("./assets/musics/get-jinxed-jinx-music-video-league-of-legends.mp3"),
            author: "Riot Games",
            liked: false,
          },
        ],
      },
      {
        playlistId: 1,
        playlistName: "Hip-Hop",
        playlistImg: require("./assets/musics/img/hip-hop.jpg"),
        playlist: [
          {
            id: 0,
            title: "The Curse of the Sad Mummy",
            image: require("./assets/musics/img/mummy.jpg"),
            mp3: require("./assets/musics/the-curse-of-the-sad-mummy-amumu-music-video-league-of-legends.mp3"),
            author: "Riot Games",
            liked: false,
          },
          {
            id: 1,
            title: "The Curse of the Sad Mummy",
            image: require("./assets/musics/img/mummy.jpg"),
            mp3: require("./assets/musics/the-curse-of-the-sad-mummy-amumu-music-video-league-of-legends.mp3"),
            author: "Riot Games",
            liked: false,
          },
        ],
      },
    ],
    allSongs: [
      {
        id: 0,
        title: "The Curse of the Sad Mummy",
        image: require("./assets/musics/img/mummy.jpg"),
        mp3: require("./assets/musics/the-curse-of-the-sad-mummy-amumu-music-video-league-of-legends.mp3"),
        author: "Riot Games",
        liked: false,
      },
      {
        id: 1,
        title: "POP/STARS",
        image: require("./assets/musics/img/kda_popstars.jpg"),
        mp3: require("./assets/musics/kda-popstars-ft-madison-beer-gi-dle-jaira-burns-music-video-league-of-legends.mp3"),
        author: "K/DA (ft. Madison Beer, (G)I-DLE, Jaira Burns)",
        liked: false,
      },
      {
        id: 2,
        title: "Ignite - Worlds 2016",
        image: require("./assets/musics/img/zeddIgnite.jpg"),
        mp3: require("./assets/musics/ignite-ft-zedd-worlds-2016-league-of-legends.mp3"),
        author: "Riot Games (ft. Zedd)",
        liked: false,
      },
      {
        id: 3,
        title: "Legends Never Die",
        image: require("./assets/musics/img/legendsNeverDie.jpg"),
        mp3: require("./assets/musics/legends-never-die-ft-against-the-current-worlds-2017-league-of-legends.mp3"),
        author: "Riot Games (ft. Against The Current)",
        liked: false,
      },
      {
        id: 4,
        title: "RISE",
        image: require("./assets/musics/img/rise.jpg"),
        mp3: require("./assets/musics/rise-ft-the-glitch-mob-mako-and-the-word-alive-worlds-2018-league-of-legends (1).mp3"),
        author: "Riot Games (ft. The Glitch Mob, Mako, and The Word Alive)",
        liked: false,
      },
      {
        id: 5,
        title: "True Damage",
        image: require("./assets/musics/img/truedamage_giants.jpg"),
        mp3: require("./assets/musics/true-damage-giants-ft-becky-g-keke-palmer-soyeon-duckwrth-thutmose-league-of-legends.mp3"),
        author:
          "GIANTS (ft. Becky G, Keke Palmer, SOYEON de (G)I-DLE, DUCKWRTH, Thutmose)",
        liked: false,
      },
      {
        id: 6,
        title: "Warriors",
        image: require("./assets/musics/img/warrios.jpg"),
        mp3: require("./assets/musics/warriors-ft-imagine-dragons-worlds-2014-league-of-legends.mp3"),
        author: "Riot Games (ft. Imagine Dragons)",
        liked: false,
      },
      {
        id: 7,
        title: "Get Jinxed",
        image: require("./assets/musics/img/getJinxed.jpg"),
        mp3: require("./assets/musics/get-jinxed-jinx-music-video-league-of-legends.mp3"),
        author: "Riot Games",
        liked: false,
      },
    ],
    music: new Audio(),
  }),
  methods: {
    showPlayerBig() {
      this.isPlayerBigVisible = true;
      this.showPlayer = false;
    },
    leavePlayerBig() {
      this.isPlayerBigVisible = false;
      this.showPlayer = true;
    },
    goToSongs() {
      this.isPlayerBigVisible = false;
      this.showPlayer = true;
    },
    goToPlaylist() {
      this.isPlayerBigVisible = false;
      this.showPlayer = true;
    },
    getIdMusic(music) {
      this.idMusic = music.id;
    },
    playing() {
      this.music.play();
    },
    paused() {
      this.music.pause();
    },
    currentTimeSeek(value) {
      this.currentTime = value;
      this.music.currentTime = this.currentTime;
    },
    setSongVolume(volume) {
      this.songVolume = volume;
      this.music.volume = this.songVolume;
    },
    changeSong() {
      //Reinitialisation des params des toutes les variables propres à this.music
      this.music.pause();
      this.current_time = 0;
      console.log(this.currentSong.mp3);
      this.music.src = this.currentSong.mp3;
      // this.checkLikedSong();
      this.playSong();
    },
    nextSong() {
      if (this.isShuffle == true) {
        this.shuffleId();
      } else {
        if (this.player[this.idMusic + 1]) {
          this.idMusic += 1;
        } else {
          this.idMusic = 0;
        }
      }
      //On envoie le fichier mp3 de notre tableau à l'index souhaité
      this.skipInverse = false;
      this.changeSong();
    },
    previousSong() {
      if (this.player[this.idMusic - 1]) {
        this.idMusic -= 1;
      } else {
        this.idMusic = this.player.length - 1;
      }
      //On envoie le fichier mp3 de notre tableau à l'index souhaité
      this.skipInverse = false;
      this.changeSong();
    },
    shuffleId() {
      this.idMusicTmp = this.idMusic;
      this.idMusic = this.entierAleatoire(0, this.player.length - 1);
      while (this.idMusic == this.idMusicTmp) {
        this.idMusic = this.entierAleatoire(0, this.player.length - 1);
      }
    },
    playThisMusic(music) {
      this.showPlayer = true;
      this.player = this.allSongs;
      console.log("App -> playThisMusic");
      this.idMusic = music.id;
      this.music.src = this.currentSong.mp3;
      this.playSong();
    },
    playThisMusicPlayer(music) {
      this.idMusic = music.id;
      this.music.src = this.currentSong.mp3;
      this.playSong();
    },
    playSong() {
      var playPromise = this.music.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          this.isPlaying = true;
          this.music.play();
        });
      }
    },
    handleBtnPlaying() {
      this.isPlaying = !this.isPlaying;
      if (this.isPlaying) {
        this.playSong();
      } else {
        this.music.pause();
      }
    },
    playAllSongs() {
      this.showPlayer = true;
      this.player = this.allSongs;
      this.idMusic = 0;
      this.isShuffle = false;
      this.playThisMusic(this.currentSong);
    },
    playAllSongsShuffle() {
      this.showPlayer = true;
      this.player = this.allSongs;
      this.shuffleId();
      this.isShuffle = true;
      this.playThisMusic(this.currentSong);
    },

    playThisPlaylist(value) {
      this.showPlayer = true;
      console.log("playThisPlaylist");
      this.player = this.musics.find((el) => el.playlistId === value).playlist;
      this.playThisMusicPlayer(this.currentSong);
    },
    playThisPlaylistShuffle(value) {
      this.showPlayer = true;
      console.log("playThisPlaylistShuffle");
      this.player = this.musics.find((el) => el.playlistId === value).playlist;
      this.isShuffle = true;
      this.shuffleId();
      this.playThisMusicPlayer(this.currentSong);
    },
    playThisMusicPlaylist(music, playlistId) {
      console.log("---playThisMusicPlaylist---");
      this.player = this.musics.find(
        (el) => el.playlistId === playlistId
      ).playlist;
      this.playThisMusicPlayer(music);
    },

    playerImg() {
      return "" + this.player.img;
    },
    entierAleatoire(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
  },
  computed: {
    currentSong() {
      return this.player.find((el) => el.id === this.idMusic);
    },
  },
  created() {
    if (this.$workbox) {
      this.$workbox.addEventListener("waiting", () => {
        this.showUpdateUI = true;
      });
    }
  },
  mounted() {
    this.music.addEventListener("play", () => {
      this.isPlaying = true;
      this.showPlayer = true;
    });
    this.music.addEventListener("pause", () => {
      this.isPlaying = false;
      this.showPlayer = true;
    });
    this.music.addEventListener("timeupdate", () => {
      this.duration = Math.round(this.music.duration) || 0;
      this.currentTime = this.music.currentTime;
    });
    this.music.addEventListener("durationchange", () => {
      this.music.currentTime = this.currentTime;
    });
  },
};
</script>

<style>
.Main {
  height: 100%;
}

.player {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
}

@media screen and (max-width: 500px) {
  .player {
    height: 100%;
    width: 100%;
    margin-top: 0%;
  }
}

.v-btn {
  text-decoration: none !important;
}

.btn-nav {
  text-decoration: none !important;
}
* {
  overflow: hidden;
}
.text-red {
  color: grey;
}

.nav {
  text-decoration: none !important;
  font-size: 14px;
}
.router-link-exact-active .text-red {
  color: red !important;
}
.router-link-exact-active .v-icon.v-icon {
  color: red !important;
}

.showPlayerBig-enter-active,
.showPlayerBig-leave-active {
  transition: 0.5s ease-in;
}

.showPlayerBig-leave-to {
  transform: translate(-50%, 50%);
}
.showPlayerBig-enter {
  transform: translate(-50%, 50%);
}
</style>
