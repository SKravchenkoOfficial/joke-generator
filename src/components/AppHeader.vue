<template>
	<header class="app-header">
		<div class="title-container">
			<h1 class="title">
				Joke Generator
			</h1>
			<i>inspired by
				<a href="https://en.wikipedia.org/wiki/Chuck_Norris" title="Who is it?" target="_blank">Chuck Norris</a>
			</i>
		</div>
	</header>
</template>

<script>
	export default {
		name: "AppHeader"
	}
</script>

<style lang="scss" scoped>
	header.app-header {
		text-align: center;
		display: flex;
		justify-content: center;

		.title-container {
			text-align: right;
		}

		h1 {
			font-size: 1.5rem;
			text-transform: uppercase;
			margin-bottom: 0;

			&.title {
				margin: 0 1rem;
			}
		}

		i {
			font-size: 0.8rem;
			position: relative;
			top: -0.5rem
		}
	}
</style>