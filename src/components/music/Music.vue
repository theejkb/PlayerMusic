<template>
  <div>
    <transition :name="checkReduceImage()">
      <div v-if="affichage == 'small'" key="2">
        <div class="d-flex justify-start">
          <div class="mt-5 ml-2 image-small rounded-sm">
            <v-img :src="music.image" :key="music.id" max-width="100px" />
          </div>
          <div :class="displayText">
            <v-card-text class="text--primary mt-2">
              <div>
                <b>{{ this.music.title }}</b>
              </div>
              <div>{{ this.music.author }}</div>
            </v-card-text>
          </div>
        </div>
      </div>

      <div v-else>
        <v-img class="mt-5 image-music">
          <transition :name="skipInverse ? 'fade' : 'fade-inverse'">
            <v-img
              class="image rounded-xl"
              :src="music.image"
              :key="music.id"
            />
          </transition>
        </v-img>
        <div :class="displayText">
          <v-card-text class="text--primary mb-n5">
            <div>
              <b>{{ this.music.title }}</b>
            </div>
          </v-card-text>

          <v-card-subtitle>
            <div>{{ this.music.author }}</div>
          </v-card-subtitle>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Music",
  props: {
    music: {},
    skipInverse: Boolean,
    affichage: String,
  },
  data: () => ({
    displayText: "",
  }),
  methods: {
    checkReduceImage() {
      if (this.affichage == "big") {
        this.displayText = "displayText";
        return "zoomImage";
      } else {
        this.displayText = "displayTextNone";
        return "reduceImage";
      }
    },
  },
};
</script>

<style scoped>
.image {
  position: absolute;
}

.image-small {
  height: 70px !important;
  width: 100px !important;
  transition: 0.3s ease;
  border-radius: 0 !important;
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

.reduceImage-enter-active,
.reduceImage-leave-active,
.zoomImage-enter-active,
.zoomImage-leave-active {
  transition: 0.3s ease-in;
}

.reduceImage-leave-to {
  transform: translate(-35%) scale(0.2);
}
.reduceImage-enter-to {
  display: none;
}

.zoomImage-leave-to {
  transform: translate(100%) scale(3);
}
.zoomImage-enter-to {
  display: none;
}
</style>
