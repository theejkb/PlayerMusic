<template>
  <v-app>
    <v-card class="player">
      <v-main class="Main">
        <div class="mr-5 ml-5" style="padding-bottom: 140px">
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
        </div>
        <Player
          v-if="showPlayer == true"
          :currentSong="currentSong"
          :isPlaying="isPlaying"
          @nextSong="nextSong"
          @playing="playing"
          @paused="paused"
          @showPlayerBig="showPlayerBig"
        />
      </v-main>
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
          :isSongLiked="isSongLiked"
          :skipInverse="skipInverse"
          :colorSongLiked="colorSongLiked"
          @likeSong="likeSong"
          @unlikeSong="unlikeSong"
          @handleLikedSong="handleLikedSong"
          @nextSong="nextSong"
          @previousSong="previousSong"
          @playing="playing"
          @paused="paused"
          @leavePlayerBig="leavePlayerBig"
          @currentTimeSeek="currentTimeSeek"
          @setSongVolume="setSongVolume"
          @playThisMusicPlayer="playThisMusicPlayer"
          ref="PlayerBig"
        />
      </transition>
      <v-bottom-navigation
        horizontal
        absolute
        v-if="isPlayerBigVisible == false"
      >
        <router-link to="/" class="nav mr-5">
          <v-icon
            aria-label="songs"
            color="grey"
            class="mt-2"
            @click="goToSongs"
            >mdi-music-box-multiple-outline</v-icon
          >
          <p class="text-red" @click="goToSongs">Songs</p>
        </router-link>
        <router-link to="/playlists" class="nav ml-5 mr-5">
          <v-icon
            aria-label="playlist"
            color="grey"
            class="mt-2"
            @click="goToPlaylist"
            >mdi-playlist-music</v-icon
          >
          <p class="text-red" @click="goToPlaylist">Playlist</p>
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
    colorSongLiked: "",
    currentTime: 0,
    songVolume: 0.5,
    isSongLiked: false,
    skipInverse: false,
    musics: [
      {
        playlistId: 0,
        playlistName: "Liked",
        playlistImg: require("./assets/musics/img/liked.png"),
        playlist: [],
      },
      {
        playlistId: 1,
        playlistName: "League of Legends",
        playlistImg: require("./assets/musics/img/lol.png"),
        playlist: [
          {
            id: 0,
            title: "The Curse of the Sad Mummy",
            image: require("./assets/musics/img/mummy.jpg"),
            mp3: require("./assets/musics/the-curse-of-the-sad-mummy-amumu-music-video-league-of-legends.mp3"),
            author: "Riot Games",
          },
          {
            id: 1,
            title: "POP/STARS",
            image: require("./assets/musics/img/kda_popstars.jpg"),
            mp3: require("./assets/musics/kda-popstars-ft-madison-beer-gi-dle-jaira-burns-music-video-league-of-legends.mp3"),
            author: "K/DA (ft. Madison Beer, (G)I-DLE, Jaira Burns)",
          },
          {
            id: 2,
            title: "Ignite - Worlds 2016",
            image: require("./assets/musics/img/zeddIgnite.jpg"),
            mp3: require("./assets/musics/ignite-ft-zedd-worlds-2016-league-of-legends.mp3"),
            author: "Riot Games (ft. Zedd)",
          },
          {
            id: 3,
            title: "Legends Never Die",
            image: require("./assets/musics/img/legendsNeverDie.jpg"),
            mp3: require("./assets/musics/legends-never-die-ft-against-the-current-worlds-2017-league-of-legends.mp3"),
            author: "Riot Games (ft. Against The Current)",
          },
          {
            id: 4,
            title: "RISE",
            image: require("./assets/musics/img/rise.jpg"),
            mp3: require("./assets/musics/rise-ft-the-glitch-mob-mako-and-the-word-alive-worlds-2018-league-of-legends (1).mp3"),
            author: "Riot Games (ft. The Glitch Mob, Mako, and The Word Alive)",
          },
          {
            id: 5,
            title: "True Damage",
            image: require("./assets/musics/img/truedamage_giants.jpg"),
            mp3: require("./assets/musics/true-damage-giants-ft-becky-g-keke-palmer-soyeon-duckwrth-thutmose-league-of-legends.mp3"),
            author:
              "GIANTS (ft. Becky G, Keke Palmer, SOYEON de (G)I-DLE, DUCKWRTH, Thutmose)",
          },
          {
            id: 6,
            title: "Warriors",
            image: require("./assets/musics/img/warrios.jpg"),
            mp3: require("./assets/musics/warriors-ft-imagine-dragons-worlds-2014-league-of-legends.mp3"),
            author: "Riot Games (ft. Imagine Dragons)",
          },
          {
            id: 7,
            title: "Get Jinxed",
            image: require("./assets/musics/img/getJinxed.jpg"),
            mp3: require("./assets/musics/get-jinxed-jinx-music-video-league-of-legends.mp3"),
            author: "Riot Games",
          },
        ],
      },
      {
        playlistId: 2,
        playlistName: "Hip-Hop",
        playlistImg: require("./assets/musics/img/hip-hop.jpg"),
        playlist: [
          {
            id: 0,
            title: "Mask Off",
            image: require("./assets/musics/img/maskoff.jpg"),
            mp3: require("./assets/musics/future-mask-off-official-music-video.mp3"),
            author: "Future",
          },
          {
            id: 1,
            title: "SCKO MODE",
            image: require("./assets/musics/img/sickomode.jpg"),
            mp3: require("./assets/musics/travis-scott-sicko-mode-ft-drake-official-video.mp3"),
            author: "Travis Scott (Ft. Drake)",
          },
        ],
      },
      {
        playlistId: 3,
        playlistName: "Mix",
        playlistImg: require("./assets/musics/img/hip-hop.jpg"),
        playlist: [
          {
            id: 0,
            title: "Mask Off",
            image: require("./assets/musics/img/maskoff.jpg"),
            mp3: require("./assets/musics/future-mask-off-official-music-video.mp3"),
            author: "Future",
          },
          {
            id: 1,
            title: "SCKO MODE",
            image: require("./assets/musics/img/sickomode.jpg"),
            mp3: require("./assets/musics/travis-scott-sicko-mode-ft-drake-official-video.mp3"),
            author: "Travis Scott (Ft. Drake)",
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
      },
      {
        id: 1,
        title: "POP/STARS",
        image: require("./assets/musics/img/kda_popstars.jpg"),
        mp3: require("./assets/musics/kda-popstars-ft-madison-beer-gi-dle-jaira-burns-music-video-league-of-legends.mp3"),
        author: "K/DA (ft. Madison Beer, (G)I-DLE, Jaira Burns)",
      },
      {
        id: 2,
        title: "Ignite - Worlds 2016",
        image: require("./assets/musics/img/zeddIgnite.jpg"),
        mp3: require("./assets/musics/ignite-ft-zedd-worlds-2016-league-of-legends.mp3"),
        author: "Riot Games (ft. Zedd)",
      },
      {
        id: 3,
        title: "Legends Never Die",
        image: require("./assets/musics/img/legendsNeverDie.jpg"),
        mp3: require("./assets/musics/legends-never-die-ft-against-the-current-worlds-2017-league-of-legends.mp3"),
        author: "Riot Games (ft. Against The Current)",
      },
      {
        id: 4,
        title: "RISE",
        image: require("./assets/musics/img/rise.jpg"),
        mp3: require("./assets/musics/rise-ft-the-glitch-mob-mako-and-the-word-alive-worlds-2018-league-of-legends (1).mp3"),
        author: "Riot Games (ft. The Glitch Mob, Mako, and The Word Alive)",
      },
      {
        id: 5,
        title: "True Damage",
        image: require("./assets/musics/img/truedamage_giants.jpg"),
        mp3: require("./assets/musics/true-damage-giants-ft-becky-g-keke-palmer-soyeon-duckwrth-thutmose-league-of-legends.mp3"),
        author:
          "GIANTS (ft. Becky G, Keke Palmer, SOYEON de (G)I-DLE, DUCKWRTH, Thutmose)",
      },
      {
        id: 6,
        title: "Warriors",
        image: require("./assets/musics/img/warrios.jpg"),
        mp3: require("./assets/musics/warriors-ft-imagine-dragons-worlds-2014-league-of-legends.mp3"),
        author: "Riot Games (ft. Imagine Dragons)",
      },
      {
        id: 7,
        title: "Get Jinxed",
        image: require("./assets/musics/img/getJinxed.jpg"),
        mp3: require("./assets/musics/get-jinxed-jinx-music-video-league-of-legends.mp3"),
        author: "Riot Games",
      },
      {
        id: 8,
        title: "Mask Off",
        image: require("./assets/musics/img/maskoff.jpg"),
        mp3: require("./assets/musics/future-mask-off-official-music-video.mp3"),
        author: "Future",
      },
      {
        id: 9,
        title: "SCKO MODE",
        image: require("./assets/musics/img/sickomode.jpg"),
        mp3: require("./assets/musics/travis-scott-sicko-mode-ft-drake-official-video.mp3"),
        author: "Travis Scott (Ft. Drake)",
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

    handleLikedSong(song) {
      this.isSongLiked = !this.isSongLiked;
      var playlistLiked = this.musics.find((el) => el.playlistId === 0)
        .playlist;

      if (this.isSongLiked) {
        playlistLiked.push(song);
        this.isSongLiked = true;
        this.likeSong();
      } else {
        let val = playlistLiked.indexOf(this.currentSong);
        playlistLiked.splice(val, 1);
        this.isSongLiked = false;
        this.unlikeSong();
      }
    },

    changeSong() {
      this.current_time = 0;
      this.music.src = this.currentSong.mp3;
      this.checkLikedSong();
      this.playSong();
    },

    checkLikedSong() {
      var playlistLiked = this.musics.find((el) => el.playlistId === 0)
        .playlist;

      if (playlistLiked.find((el) => el.mp3 == this.currentSong.mp3)) {
        this.isSongLiked = true;
        this.likeSong();
      } else {
        this.isSongLiked = false;
        this.unlikeSong();
      }
    },
    likeSong() {
      this.colorSongLiked = "red";
    },
    unlikeSong() {
      this.colorSongLiked = "";
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
      this.skipInverse = true;
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
      this.isShuffle = true;
      this.shuffleId();
      this.playThisMusic(this.currentSong);
    },

    playThisPlaylist(value) {
      this.showPlayer = true;
      this.isShuffle = false;
      this.idMusic = 0;
      this.player = this.musics.find((el) => el.playlistId === value).playlist;
      this.playThisMusicPlayer(this.currentSong);
    },
    playThisPlaylistShuffle(value) {
      this.showPlayer = true;
      this.player = this.musics.find((el) => el.playlistId === value).playlist;
      this.isShuffle = true;
      this.shuffleId();
      this.playThisMusicPlayer(this.currentSong);
    },
    playThisMusicPlaylist(music, playlistId) {
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
    this.music.addEventListener("ended", () => {
      this.nextSong();
    });
  },
};
</script>

<style>
.Main {
  height: 100%;
}

.player {
  margin: 3% 7% 3% 7%;
  overflow: hidden;
}

@media screen and (max-width: 500px) {
  .player {
    margin: 0;
    height: 100%;
  }
}

.v-btn {
  text-decoration: none !important;
}

.btn-nav {
  text-decoration: none !important;
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
