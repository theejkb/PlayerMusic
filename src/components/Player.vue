<template>
<div>  
    <Player :musics="playlists"></Player>
</div>
</template>

<script>
import Player from './music/Player';


export default {
    name: "Player",
    components: {
      Player,
    },
    props:{
        playlists: [],
    },
    data: function () {
       return {

       }
    },
    methods: {
        
    },
    watch: {
       
    },
};
</script>
<style>

</style>