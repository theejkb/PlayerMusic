<template>
<v-app>
    <!--  <v-app-bar app color="primary" dark>
        <div class="d-flex align-center">
            <v-img alt="Vuetify Logo" class="shrink mr-2" contain src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition" width="40" />

            <v-img alt="Vuetify Name" class="shrink mt-1 hidden-sm-and-down" contain min-width="100" src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png" width="100" />
        </div>

        <v-spacer></v-spacer>

        <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text>
            <span class="mr-2">Latest Release</span>
            <v-icon>mdi-open-in-new</v-icon>
        </v-btn>
    </v-app-bar> -->

    <v-main>
        <Player />
    </v-main>
    <v-bottom-navigation
    color="primary"
    horizontal
  >
    <v-btn>
      <span>Songs</span>

      <v-icon>mdi-music-note</v-icon>
    </v-btn>

    <v-btn>
      <span>Playlist</span>

      <v-icon>mdi-playlist-play</v-icon>
    </v-btn>

    <v-btn>
      <span>Search</span>

      <v-icon>mdi-search</v-icon>
    </v-btn>
  </v-bottom-navigation>
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
        //
    }),
};
</script>
