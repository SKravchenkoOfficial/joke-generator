<template>
	<div class="joke-generator-container">
		<div class="joke-container">
			<div class="joke-value" v-if="currentJoke">
				<div class="joke-content">
					<img :src="currentJoke.icon_url"/>
					<span>
						{{ currentJoke.value }}
					</span>
				</div>
				<div class="joke-meta-container">
					<i class="joke-meta-value">
						© Chuck Norris at {{ convertedJokeGeneratedDate }}
					</i>
				</div>
			</div>
		</div>
		<div class="button-container">
			<button class="generate-joke" @click="generateJoke">Generate</button>
		</div>
	</div>
	<AppSpinner v-if="showSpinner"/>
</template>

<script>
	import DataProvider from "@/js/DataProvider";
	import AppSpinner from "@/components/AppSpinner";

	export default {
		name: "JokeGenerator",
		data: () => {
			return {
				currentJoke: null,
				showSpinner: false
			}
		},
		components: {
			AppSpinner
		},
		computed: {
			convertedJokeGeneratedDate: function() {
				if (this.currentJoke.generated_at) {
					const date = this.currentJoke.generated_at;

					const getFullNumber = (number) => {
						return ('0' + number).slice(-2);
					}

					return getFullNumber(date.getDate()) + '.' + getFullNumber(date.getMonth()) + '.'
						+ getFullNumber(date.getFullYear()) + ' ' + getFullNumber(date.getHours()) + ':'
						+ getFullNumber(date.getMinutes());
				}

				return null;
			}
		},
		methods: {
			generateJoke: async function() {
				this.showSpinner = true;

				try {
					this.currentJoke = await DataProvider.getJoke();
					this.currentJoke.generated_at = new Date();

					let savedJokes = JSON.parse(localStorage.getItem('jokes')) || [];
					savedJokes = [
						this.currentJoke
					].concat(savedJokes);
					localStorage.setItem('jokes', JSON.stringify(savedJokes));

					this.emitter.emit('refresh-history');
				} catch (e) {
					console.error(e);
				}

				this.showSpinner = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.joke-generator-container {
		display: flex;
		flex-direction: column;
		align-content: center;
		justify-content: center;

		.button-container {
			text-align: center;
			margin-top: 2rem;

			button.generate-joke {
				align-items: center;
				appearance: none;
				background-color: #FCFCFD;
				border-radius: 4px;
				border-width: 0;
				box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #d6d6e7 0 -3px 0 inset;
				box-sizing: border-box;
				color: #36395A;
				cursor: pointer;
				display: inline-flex;
				height: 48px;
				justify-content: center;
				line-height: 1;
				list-style: none;
				overflow: hidden;
				padding-left: 16px;
				padding-right: 16px;
				position: relative;
				text-align: left;
				text-decoration: none;
				transition: box-shadow .15s,transform .15s;
				user-select: none;
				touch-action: manipulation;
				white-space: nowrap;
				will-change: box-shadow, transform;
				text-transform: uppercase;

				&:hover {
					box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #d6d6e7 0 -3px 0 inset;
					transform: translateY(-2px);
				}
			}
		}

		.joke-container {
			.joke-value {
				.joke-content {
					display: flex;
					align-items: center;

					img {
						height: 60px;
					}

					span {
						padding-left: 1rem;
						max-width: 300px;
					}
				}

				.joke-meta-container {
					text-align: right;

					.joke-meta-value {
						font-size: 0.8rem;
						opacity: 0.5;
					}
				}
			}
		}
	}
</style>