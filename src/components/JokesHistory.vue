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

				// Time in seconds to show different labels
				const threeSeconds = 3;
				const oneMinute = 60;
				const twoMinutes = oneMinute * 2;
				const oneHour = 3600;
				const twoHours = oneHour * 2;
				const oneDay = oneHour * 24;

				// Calculating different labels based on the joke generated date
				if (difference < threeSeconds) {
					return 'Just now';
				} else if (difference < oneMinute) {
					return 'less than a minute ago'
				} else if (difference < twoMinutes) {
					return '1 minute ago';
				} else if (difference < oneHour) {
					return Math.floor(difference / oneMinute) + ' minutes ago';
				} else if (difference < twoHours) {
					return '1 hour ago';
				} else if (difference < oneDay) {
					return Math.floor(difference / oneHour) + ' hours ago';
				} else {
					return 'A long time ago';
				}
			}
		},
		mounted: function() {
			// Event handler to refresh history component when a new joke generated
			this.emitter.on('refresh-history', () => {
				this.historicalData = JSON.parse(localStorage.getItem('jokes'));
			});

			// Timer to refresh joke generated time once per second
			this.refreshTimerId = setInterval(() => {
				this.historicalData = JSON.parse(localStorage.getItem('jokes'));
			}, 1000);
		},
		beforeUnmount: function() {
			// Clear interval for component refresh
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