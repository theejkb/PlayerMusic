<template>
<div>
    <transition class="fade">
        <v-img class="white--text align-end" height="200px" :src="this.music.image" />
    </transition>

    <v-card-subtitle class="pb-0">
        <div>{{ this.music.author }}</div>
    </v-card-subtitle>

    <v-card-text class="text--primary">
        <div>{{ this.music.title }}</div>
    </v-card-text>
</div>
</template>

<script>
export default {
    name: "Music",
    props: {
        music: {},
    },
};
</script>
