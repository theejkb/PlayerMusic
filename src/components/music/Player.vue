<template>
<div class="player-container">
    <div class="background" :style="{ backgroundImage: 'url(' + image + ')' }" />
    <v-card class="mx-auto player rounded-xl px-3" outlined>
        <Music :affichage="showPlaylist_var" :value="duration" :music="currentSong" :skipInverse="skipInverse"></Music>
        <v-card-text>
            <v-card elevation="0" class="d-flex justify-space-between">
                <span>{{ current_time }}</span>
                <span>{{ duration }}</span>
            </v-card>
            <v-slider v-model="current_time" @change="seeking(current_time)" @click="onClickValue" step="1" min="0" :max="duration" thumb-color="black" track-color="rgba(0,0,0,0.5)" color="black"></v-slider>
        </v-card-text>
        <div class="d-flex justify-space-around">
            <v-btn @click="previous" class="ml-2 mt-3" fab icon height="40px" right width="40px">
                <v-icon>mdi-skip-previous</v-icon>
            </v-btn>
            <v-card-actions>
                <v-btn @click="handleBtnPlaying()" class="ml-2 mt-3" fab icon height="40px" right width="40px">
                    <v-icon v-if="isPlaying == false">mdi-play</v-icon>
                    <v-icon v-else>mdi-pause</v-icon>
                </v-btn>
            </v-card-actions>
            <v-btn @click="next" class="ml-2 mt-3" fab icon height="40px" right width="40px">
                <v-icon>mdi-skip-next</v-icon>
            </v-btn>
        </div>
        <v-card-text>
            <v-slider v-model="volume" @input="songVolume" thumb-color="black" track-color="rgba(0,0,0,0.08)" color="black" step="0.01" min="0" max="1" append-icon="mdi-volume-high" prepend-icon="mdi-volume-low"></v-slider>
        </v-card-text>
        <div class="d-flex justify-space-around mb-5">
            <v-btn @click="showPlaylist" elevation="0" color="white">
                <v-icon>mdi-music</v-icon>
            </v-btn>
            <v-btn elevation="0" color="white">
                <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn elevation="0" color="white">
                <v-icon>mdi-shuffle</v-icon>
            </v-btn>
        </div>
    </v-card>
</div>
</template>

<script>
import Music from "./Music";

export default {
    name: "Player",
    components: {
        Music,
    },
    data: () => ({
        musics: [{
                id: 1,
                title: "The Curse of the Sad Mummy",
                image: require("../../assets/musics/img/mummy.jpg"),
                mp3: require("../../assets/musics/the-curse-of-the-sad-mummy-amumu-music-video-league-of-legends.mp3"),
                author: "Riot Games",
            },
            {
                id: 2,
                title: "POP/STARS",
                image: require("../../assets/musics/img/kda_popstars.jpg"),
                mp3: require("../../assets/musics/kda-popstars-ft-madison-beer-gi-dle-jaira-burns-music-video-league-of-legends.mp3"),
                author: "K/DA (ft. Madison Beer, (G)I-DLE, Jaira Burns)",
            },
            {
                id: 3,
                title: "Ignite - Worlds 2016",
                image: require("../../assets/musics/img/zeddIgnite.jpg"),
                mp3: require("../../assets/musics/ignite-ft-zedd-worlds-2016-league-of-legends.mp3"),
                author: "Riot Games (ft. Zedd)",
            },
            {
                id: 4,
                title: "Legends Never Die",
                image: require("../../assets/musics/img/legendsNeverDie.jpg"),
                mp3: require("../../assets/musics/legends-never-die-ft-against-the-current-worlds-2017-league-of-legends.mp3"),
                author: "Riot Games (ft. Against The Current)",
            },
            {
                id: 5,
                title: "RISE",
                image: require("../../assets/musics/img/rise.jpg"),
                mp3: require("../../assets/musics/rise-ft-the-glitch-mob-mako-and-the-word-alive-worlds-2018-league-of-legends (1).mp3"),
                author: "Riot Games (ft. The Glitch Mob, Mako, and The Word Alive)",
            },
            {
                id: 6,
                title: "True Damage",
                image: require("../../assets/musics/img/truedamage_giants.jpg"),
                mp3: require("../../assets/musics/true-damage-giants-ft-becky-g-keke-palmer-soyeon-duckwrth-thutmose-league-of-legends.mp3"),
                author: "GIANTS (ft. Becky G, Keke Palmer, SOYEON de (G)I-DLE, DUCKWRTH, Thutmose)",
            },
            {
                id: 7,
                title: "Warriors",
                image: require("../../assets/musics/img/warrios.jpg"),
                mp3: require("../../assets/musics/warriors-ft-imagine-dragons-worlds-2014-league-of-legends.mp3"),
                author: "Riot Games (ft. Imagine Dragons)",
            },
            {
                id: 8,
                title: "Get Jinxed",
                image: require("../../assets/musics/img/getJinxed.jpg"),
                mp3: require("../../assets/musics/get-jinxed-jinx-music-video-league-of-legends.mp3"),
                author: "Riot Games",
            },
        ],
        index_playing: 0,
        music: new Audio(),
        music_playing: -1,
        volume: 0.5,
        duration: 0,
        current_time: "0:" + 0,
        isPlaying: false,
        skipInverse: false,
        duration_affichage: 0,
        current_time_affichage: 0,
        current_time_tmp: 0,
        isRepeat: true,
        showPlaylists: false,
        showPlaylist_var: '',
    }),

    methods: {
        showPlaylist() {
            this.showPlaylists = !this.showPlaylists;
            if (this.showPlaylists == true){
                
                this.showPlaylist_var = 'small';
                console.log(this.showPlaylist_var);
            } else {
                this.showPlaylist_var = 'big';
                console.log(this.showPlaylist_var);
            }
            // TODO: voir la liste de lecture disponible (comme apple musique)
        },
        previous() {
            if (this.musics[this.index_playing - 1]) {
                this.index_playing -= 1;
            } else {
                this.index_playing = this.musics.length - 1;
            }
            this.skipInverse = true;
            this.music.src = this.musics[this.index_playing].mp3;
            this.playSong();
        },
        next() {
            if (this.musics[this.index_playing + 1]) {
                this.index_playing += 1;
            } else {
                this.index_playing = 0;
            }
            //On envoie le fichier mp3 de notre tableau à l'index souhaité
            this.skipInverse = false;
            this.music.src = this.musics[this.index_playing].mp3;
            this.playSong();
        },
        endMusic() {
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
        currentMusicStatus() {
            
        }
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

.v-card__actions {
    padding: 0;
}
</style>
