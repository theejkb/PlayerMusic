<template>
<div>
    <div v-if="affichage = 'big'">
    <v-img class="mt-5 image-music">
        <transition :name="skipInverse ? 'fade' : 'fade-inverse'">
            <v-img class="image rounded-xl" :src="music.image" :key="music.id" />
        </transition>
    </v-img>
    <v-card-text class="text--primary mb-n5">
        <div>
            <b>{{ this.music.title }}</b>
        </div>
    </v-card-text>

    <v-card-subtitle>
        <div>{{ this.music.author }}</div>
        <p>{{this.affichage}}</p>
    </v-card-subtitle>
    </div>
    <div v-else>TEST</div>
</div>
</template>

<script>
export default {
    name: "Music",
    props: {
        music: {},
        skipInverse: Boolean,
        affichage: String
    },
};
</script>

<style scoped>
.image {
    position: absolute;
}

.image-music {
    min-height: 270px;
    transition: 0.3s ease;
}

@media screen and (max-width: 400px) {
    .image-music {
        min-height: 220px;
        transition: 0.3s ease;
    }
}

@media screen and (max-width: 350px) {
    .image-music {
        min-height: 200px;
        transition: 0.3s ease;
    }
}

@media screen and (max-width: 300px) {
    .image-music {
        min-height: 150px;
        transition: 0.3s ease;
    }
}

.fade-enter-active,
.fade-leave-active,
.fade-inverse-enter-active,
.fade-inverse-leave-active {
    transition: 0.3s ease-in;
}

.fade-enter {
    transform: translate(-100%) scale(0.2);
}

.fade-leave-to {
    transform: translate(100%) scale(0.2);
    opacity: 0;
}

.fade-inverse-enter {
    transform: translate(100%) scale(0.2);
}

.fade-inverse-leave-to {
    transform: translate(-100%) scale(0.2);
    opacity: 0;
}
</style>
