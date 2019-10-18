import { Howl } from "howler"
import { state, saveSettings } from "@/state.js";

export const soundChannels = {}

export const playSound = (key, channel) => {
    if (state.mute) return;
    if (!(key in sounds)) return console.error(`Sound not found: ${key}`)
    if (channel) {
        if (soundChannels[channel]) soundChannels[channel].stop() // stop previous sound in same channel
        soundChannels[channel] = sounds[key]
    }
    sounds[key].volume(state.volume)
    sounds[key].play();
}

export const playMusic = (key) => {
    if (!(key in musics)) return console.error(`Music not found: ${key}`)
    stopMusic();
    musics[key].volume(state.volume)
    musics[key].mute(state.mute)
    musics[key].play();
    soundChannels.music = musics[key]
}

export const stopSound = channel => {
    if (soundChannels[channel]) soundChannels[channel].stop()
}

export const stopMusic = () => stopSound("music")

export const updateVolume = () => {
    soundChannels.voice && soundChannels.voice.volume(state.volume / 100)
    soundChannels.music && soundChannels.music.volume(state.volume / 100)
    saveSettings();
}

export const updateMute = () => {
    soundChannels.voice && soundChannels.voice.mute(state.mute)
    soundChannels.music && soundChannels.music.mute(state.mute)
    saveSettings();
}

export const SOUNDS = {
    /*gui_card_on: 'assets/sound/gui_card_on.mp3',
    gui_card_off: 'assets/sound/gui_card_off.mp3',*/
    gui_click_button: 'assets/sound/gui_menuCliqueSurBoutonJouer_01.ogg',
    gui_click_choice: 'assets/sound/gui_cliqueSurChoix_01.ogg',
    gui_hover_button: 'assets/sound/gui_menuSurvolBoutonJouer_01.ogg',
    gui_hover_choice: 'assets/sound/gui_survolUnChoix_01.ogg',
    vox_gardien_01: 'assets/sound/vox_gardien_01.ogg',
    vox_gardien_02: 'assets/sound/vox_gardien_02.ogg',
    vox_gardien_03: 'assets/sound/vox_gardien_03.ogg',
    vox_gardien_04: 'assets/sound/vox_gardien_04.ogg',
    vox_gardien_05: 'assets/sound/vox_gardien_05.ogg',
    vox_gardien_06: 'assets/sound/vox_gardien_06.ogg',
    vox_gardien_07: 'assets/sound/vox_gardien_07.ogg'
}

export const MUSICS = {
    mus_menu: 'assets/sound/mus_menu_01.mp3',
    mus_gardien_01: 'assets/sound/mus_gardien_01.mp3',
    mus_gardien_02: 'assets/sound/mus_gardien_02.mp3',
    mus_gardien_03: 'assets/sound/mus_gardien_03.mp3',
    mus_agony: 'assets/sound/mus_agonyMaster_01.ogg',
    mus_apex: 'assets/sound/mus_apexMaster_01.ogg',
    mus_headway: 'assets/sound/mus_headwayMaster_01.ogg',
    mus_lull: 'assets/sound/mus_lullMaster_01.ogg',
    mus_primal: 'assets/sound/mus_primalMaster_01.ogg',
}

export const sounds = Object.fromEntries(Object.entries(SOUNDS).map(([key, path]) => {
    return [key, new Howl({
        src: [path],
        volume: state.volume / 100
    })];
}))

export const musics = Object.fromEntries(Object.entries(MUSICS).map(([key, path]) => {
    return [key, new Howl({
        src: [path],
        loop: true,
        volume: state.volume / 100
    })];
}))