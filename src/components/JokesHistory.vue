<template>
	<div class="jokes-history-container" v-if="historicalData && historicalData.length">
		<h1>Jokes History</h1>
		<div v-for="joke in historicalData" :key="joke.id" class="joke-container">
			<div class="joke-value">
				{{ joke.value }}
			</div>
			<div class="joke-meta-container">
				<i>
					{{ getTimeDifference(joke.generated_at) }}
				</i>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "JokesHistory",
		data: () => {
			return {
				historicalData: JSON.parse(localStorage.getItem('jokes')) || [],
				refreshTimerId: null
			}
		},
		methods: {
			getTimeDifference: (date) => {
				const difference = (new Date() - new Date(date)) / 1000;

				if (difference < 3) {
					return 'Just now';
				} else if (difference < 60) {
					return 'less than a minute ago'
				} else if (difference < 120) {
					return '1 minute ago';
				} else if (difference < 3600) {
					return Math.floor(difference / 60) + ' minutes ago';
				} else if (difference < 7200) {
					return '1 hour ago';
				} else if (difference < 86400) {
					return Math.floor(difference / 3600) + ' hours ago';
				} else {
					return 'long time ago';
				}
			}
		},
		mounted: function() {
			this.emitter.on('refresh-history', () => {
				this.historicalData = JSON.parse(localStorage.getItem('jokes'));
			});

			this.refreshTimerId = setInterval(() => {
				this.historicalData = JSON.parse(localStorage.getItem('jokes'));
			}, 1000);
		},
		beforeUnmount: function() {
			if (this.refreshTimerId) {
				clearInterval(this.refreshTimerId);

				this.refreshTimerId = null;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.jokes-history-container {
		max-width: 50%;
		padding-bottom: 1rem;

		h1 {
			text-align: center;
			text-transform: uppercase;
		}

		.joke-container {
			.joke-meta-container {
				text-align: right;
				font-size: 0.8rem;
				opacity: 0.5;
			}

			&:not(:last-of-type) {
				margin-bottom: 1.25rem;
			}
		}
	}
</style>