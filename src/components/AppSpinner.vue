<template>
	<div class="spinner-container">
		<div class="lds-dual-ring"></div>
	</div>
</template>

<script>
	export default {
		name: "AppSpinner"
	}
</script>

<style lang="scss" scoped>
	.spinner-container {
		background: rgba(0, 0, 0, 0.25);
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.lds-dual-ring {
		display: inline-block;
		width: 80px;
		height: 80px;
	}

	.lds-dual-ring:after {
		content: " ";
		display: block;
		width: 64px;
		height: 64px;
		margin: 8px;
		border-radius: 50%;
		border: 6px solid #fff;
		border-color: #fff transparent #fff transparent;
		animation: lds-dual-ring 1.2s linear infinite;
	}

	@keyframes lds-dual-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

</style>