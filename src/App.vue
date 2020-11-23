<template>
  <v-app>
    <v-card class="player">
      <v-main class="mr-5 ml-5 Main">
        <router-view
          :musics="musics"
          :allSongs="allSongs"
          :player="player"
          :idMusic="idMusic"
          v-on:playAllSongsShuffle="playAllSongsShuffle"
          v-on:playThisPlaylist="playThisPlaylist"
          v-on:playThisPlaylistShuffle="playThisPlaylistShuffle"
          v-on:playAllSongs="playAllSongs"
          v-on:playThisMusic="playThisMusic"
        ></router-view>
      </v-main>
      <Player
        v-if="showPlayer == true"
        :player="player"
        :idMusic="idMusic"
        :isShuffle="isShuffle"
        ref="Player"
        v-on:music="sendMusic"
        @getIdMusic="getIdMusic"
      />
      <v-bottom-navigation horizontal absolute>
        <router-link to="/" class="nav mr-5">
          <v-icon color="grey" class="mt-2"
            >mdi-music-box-multiple-outline</v-icon
          >
          <p class="text-red">Songs</p>
        </router-link>

        <router-link to="/playlists" class="nav ml-5 mr-5">
          <v-icon color="grey" class="mt-2">mdi-playlist-music</v-icon>
          <p class="text-red">Playlist</p>
        </router-link>

        <router-link to="/playerSong" class="nav ml-5">
          <v-icon
            color="grey"
            color-active="red"
            class="mt-2"
            @click="unshowPlayer"
            >mdi-card-search-outline</v-icon
          >
          <p class="text-red" @click="unshowPlayer">Player</p>
        </router-link>
      </v-bottom-navigation>
    </v-card>
  </v-app>
</template>

<script>
import Player from "./components/music/Player";

export default {
  name: "App",

  components: {
    Player,
  },

  data: () => ({
    image: "",
    player: [],
    showPlayer: false,
    playerTemp: [],
    idMusic: 0,
    isShuffle: false,
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
  }),
  methods: {
    unshowPlayer() {
      this.showPlayer = false;
    },
    getIdMusic(music) {
      this.idMusic = music.id;
    },
    playThisMusic(music) {
      this.showPlayer = true;
      this.idMusic = music.id;
      this.player = this.allSongs;
      this.$refs.Player.playThisMusic(music);
    },
    playThisPlaylist(value) {
      this.showPlayer = true;
      console.log("playThisPlaylist");
      this.player = this.musics.find((el) => el.playlistId === value).playlist;
      this.idMusic = 0;
      this.$refs.Player.playAllSongs();
    },
    playThisPlaylistShuffle(value) {
      this.showPlayer = true;
      console.log("playThisPlaylistShuffle");
      this.playerTemp = this.musics.find(
        (el) => el.playlistId === value
      ).playlist;
      this.shuffle(this.playerTemp);
      this.isShuffle = true;
      this.player = [...this.playerTemp];
      this.idMusic = 0;
      this.$refs.Player.playAllSongs();
    },
    playAllSongs() {
      this.showPlayer = true;
      this.player = this.allSongs;
      this.idMusic = 0;
      this.isShuffle = false;
      this.$refs.Player.playAllSongs();
    },
    playAllSongsShuffle() {
      this.showPlayer = true;
      this.player = this.allSongs;
      this.idMusic = 0;
      this.isShuffle = true;
      this.$refs.Player.playAllSongs();
    },
    playerImg() {
      return "" + this.player.img;
    },
    showPlayerBig() {
      this.showPlayer = true;
    },
    shuffle(array) {
      array.sort(() => Math.random() - 0.5);
    },
    entierAleatoire(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    sendMusic(player, idMusic) {
      this.player = player;
      this.idMusic = idMusic;
    },
  },
  computed: {},
  created() {
    if (this.$workbox) {
      this.$workbox.addEventListener("waiting", () => {
        this.showUpdateUI = true;
      });
    }
  },
};
</script>

<style scoped>
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
</style>
