<template>
	<div class="app-container">
		<div>
			<AppHeader/>
		</div>
		<div>
			<JokeGenerator/>
		</div>
		<div>
			<JokesHistory/>
		</div>
		<AppPopup v-if="showPopup"/>
	</div>
</template>

<script>
	import AppHeader from "@/components/AppHeader";
	import JokeGenerator from "@/components/JokeGenerator";
	import JokesHistory from "@/components/JokesHistory";
	import AppPopup from "@/components/AppPopup";

	export default {
		name: 'App',
		data: () => {
			return {
				showPopup: false
			}
		},
		components: {
			AppHeader,
			JokeGenerator,
			JokesHistory,
			AppPopup
		},
		mounted: function() {
			setTimeout(() => {
				this.showPopup = true;
			}, 25000);

			this.emitter.on('close-popup', () => {
				this.showPopup = false;
			});
		}
	}
</script>

<style lang="scss">
	body {
		background: #fafafa;
		margin: 0;
		padding: 0;
	}

	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		color: #2c3e50;

		.app-container {
			display: flex;
			flex-direction: column;

			> div {
				min-height: 25vh;
				display: flex;
				justify-content: center;
				flex-direction: column;
				align-items: center;

				&:last-of-type {
					min-height: 50vh;
				}
			}
		}
	}
</style>