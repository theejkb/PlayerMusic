<template>
  <v-app>
    <v-main> 
      <div class="ml-5 mr-5">     
          <router-view :playlists="musics"></router-view>
          </div>
    </v-main>
    <v-bottom-navigation horizontal>
        <router-link to="/songs" class="nav mr-5">
          <v-icon color="grey" class="mt-2">mdi-music-box-multiple-outline</v-icon>
          <p class="text-red">Songs</p>
        </router-link>

        <router-link to="/playlists" class="nav ml-5 mr-5">
          <v-icon color="grey" class="mt-2">mdi-playlist-music</v-icon>
          <p class="text-red">Playlist</p>
        </router-link>

      
        <router-link to="/player" class="nav ml-5">
          <v-icon color="grey" color-active="red" class="mt-2">mdi-card-search-outline</v-icon>
          <p class="text-red">Player</p>
        </router-link>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    image: '',
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
            liked: false
          },
          {
            id: 1,
            title: "POP/STARS",
            image: require("./assets/musics/img/kda_popstars.jpg"),
            mp3: require("./assets/musics/kda-popstars-ft-madison-beer-gi-dle-jaira-burns-music-video-league-of-legends.mp3"),
            author: "K/DA (ft. Madison Beer, (G)I-DLE, Jaira Burns)",
            liked: false
          },
          {
            id: 2,
            title: "Ignite - Worlds 2016",
            image: require("./assets/musics/img/zeddIgnite.jpg"),
            mp3: require("./assets/musics/ignite-ft-zedd-worlds-2016-league-of-legends.mp3"),
            author: "Riot Games (ft. Zedd)",
            liked: false
          },
          {
            id: 3,
            title: "Legends Never Die",
            image: require("./assets/musics/img/legendsNeverDie.jpg"),
            mp3: require("./assets/musics/legends-never-die-ft-against-the-current-worlds-2017-league-of-legends.mp3"),
            author: "Riot Games (ft. Against The Current)",
            liked: false
          },
          {
            id: 4,
            title: "RISE",
            image: require("./assets/musics/img/rise.jpg"),
            mp3: require("./assets/musics/rise-ft-the-glitch-mob-mako-and-the-word-alive-worlds-2018-league-of-legends (1).mp3"),
            author: "Riot Games (ft. The Glitch Mob, Mako, and The Word Alive)",
            liked: false
          },
          {
            id: 5,
            title: "True Damage",
            image: require("./assets/musics/img/truedamage_giants.jpg"),
            mp3: require("./assets/musics/true-damage-giants-ft-becky-g-keke-palmer-soyeon-duckwrth-thutmose-league-of-legends.mp3"),
            author:
              "GIANTS (ft. Becky G, Keke Palmer, SOYEON de (G)I-DLE, DUCKWRTH, Thutmose)",
            liked: false
          },
          {
            id: 6,
            title: "Warriors",
            image: require("./assets/musics/img/warrios.jpg"),
            mp3: require("./assets/musics/warriors-ft-imagine-dragons-worlds-2014-league-of-legends.mp3"),
            author: "Riot Games (ft. Imagine Dragons)",
            liked: false
          },
          {
            id: 7,
            title: "Get Jinxed",
            image: require("./assets/musics/img/getJinxed.jpg"),
            mp3: require("./assets/musics/get-jinxed-jinx-music-video-league-of-legends.mp3"),
            author: "Riot Games",
            liked: false
          }
        ]
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
            liked: false
          },         
        ]
      }
    ]
  })
};
</script>

<style scoped>
.v-btn {
  text-decoration: none !important;
}
.router-link-active {
  color: red;
}
.btn-nav{
  text-decoration: none !important;
}
*{
  overflow: hidden;
}
.text-red{
  color: grey;
}

.nav{
   text-decoration: none !important;
   font-size: 14px;
}
.router-link-active .text-red{
  color: red !important;
}
.router-link-active .v-icon.v-icon{
  color: red !important;
}
</style>
