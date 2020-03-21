<template>
    <div class="inline-flex justify-between">
        <div>
            <button class="p-3" @click.prevent="toggle">
                <i v-if="isPlaying" class="far fa-pause-circle"></i>
                <i v-else class="far fa-play-circle"></i>
            </button>
            <audio ref="audioElement" :src="track.stream_link" type="audio/mp3" preload="auto" crossorigin="anonymous" />
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            track: {
                type: Object,
                required: true,
            }
        },

        data() {
            return {
                isPlaying: false
            }
        },

        methods: {
            play() {
                this.$refs.audioElement.play();
                this.isPlaying = true;
            },

            pause() {
                this.$refs.audioElement.pause();
                this.isPlaying = false;
            },

            toggle() {
                return this.isPlaying ? this.pause() : this.play();
            }
        }
    }
</script>