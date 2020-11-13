<template>
<div>  
    <h1>PLAYER</h1>
    <Player :musics="playlists"/>
</div>
</template>

<script>
import Player from './music/Player';


export default {
    name: "PlayerMain",
    components: {
      Player,
    },
    props:{
        playlists: {},
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