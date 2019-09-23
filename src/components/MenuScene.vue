<template>
  <div id="info-son" v-if="!isMusicActivated">
    <p>
      <img src="assets/icons/PICTO_SON.png" alt="Son" class="icon" />
      L'expérience sonore est vivement conseillée
    </p>
    <p
      class="button"
      @click="play"
      :class="{ disabled: !loaded }"
    >{{loaded ? "Jouer": "Chargement "+loadingPc+"%"}}</p>
  </div>
  <div id="menu-scene" v-else>
    <img class="logo-myriagon" src="assets/MYRIAGON_LOGO.png" alt="Myriagon" />
    <img class="logo-alpha" src="assets/ALPHA_TITRE.png" alt="Alpha" />
    <p class="start button" @click="startGame">Commencer le jeu</p>
    <p
      class="credits"
    >Visuels: Arthur Lemaître | Développement: Sylvain Pollet-Villard | Son et concept: Myriagon</p>
  </div>
</template>

<script>
import { playMusic, stopMusic } from "@/audio";
import { preloadGame } from "@/preloader";

export default {
  name: "MenuScene",
  data() {
    return {
      isMusicActivated: false,
      loaded: false,
      loadingPc: 0
    };
  },

  mounted() {
    preloadGame(this.onProgress).then(() => {
      this.loaded = true;
    });
  },

  methods: {
    startGame() {
      stopMusic();
      this.$emit("play");
    },
    play() {
      if (this.isMusicActivated || !this.loaded) return;
      this.isMusicActivated = true;
      playMusic("mus_menu");
    },
    onProgress(pc) {
      this.loadingPc = Math.round(pc);
    }
  }
};
</script>

<style scoped lang="postcss">
#menu-scene {
  position: fixed;
  top: 15vh;
  left: 0;
  right: 0;
  bottom: 15vh;
  text-align: center;
  animation: fadein 2s linear;

  img,
  p {
    display: block;
    margin: auto;
  }

  .logo-myriagon {
    margin: 5vh auto;
    height: 10vh;
  }

  .logo-alpha {
    margin: 5vh auto;
    height: 20vh;
  }

  .start {
    font-size: 5vh;
    padding: 0.25em 0.5em;
    margin: 2vh auto 8vh;
    display: inline-block;
    transition: box-shadow 300ms;
    opacity: 0;
    animation: blink 1s alternate ease-in-out infinite;
    animation-delay: 3000ms;
    cursor: pointer;
    background: rgba(0, 0, 0, 0);
  }

  p.credits {
    font-size: 2em;
  }
}

.button {
  display: inline-block;
  margin: auto;
  padding: 0.5em 1em;
  cursor: pointer;
  background: rgba(128, 128, 128, 0.15);

  &.disabled {
    background: rgba(32, 32, 32, 0.25);
  }

  &:not(.disabled):hover {
    animation: none;
    background: rgba(128, 128, 128, 0.25);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
    opacity: 1;
  }
}

#info-son {
  background: black;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  font-size: 2.5vh;
  text-align: center;
  align-content: center;
  display: grid;

  p {
    padding: 0.5em;
    margin: auto;
  }

  img.icon {
    display: inline-block;
    vertical-align: middle;
    margin: 0 0.5em 0.15em 0;
    animation: tada 2s ease-in-out infinite;
  }
}

@keyframes blink {
  0% {
    opacity: 0.2;
  }
  100% {
    opacity: 0.9;
  }
}

@keyframes tada {
  from {
    transform: scale3d(1, 1, 1);
  }

  5%,
  10% {
    transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
  }

  15%,
  25%,
  35%,
  45% {
    transform: scale3d(1.3, 1.3, 1.3) rotate3d(0, 0, 1, 3deg);
  }

  20%,
  30%,
  40% {
    transform: scale3d(1.3, 1.3, 1.3) rotate3d(0, 0, 1, -3deg);
  }

  50% {
    transform: scale3d(1, 1, 1);
  }
}

@keyframes fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>