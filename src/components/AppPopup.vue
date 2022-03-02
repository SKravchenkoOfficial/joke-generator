<template>
	<div class="popup-background-container">
		<div class="popup-container">
			<div>You've been with us for over 25 seconds, hope you enjoy this guy's jokes</div>
			<div class="ok-button-container">
				<button @click="closePopup">Continue</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "AppPopup",
		methods: {
			closePopup: function() {
				// Fire event to the host component to close popup
				this.emitter.emit('close-popup');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.popup-background-container {
		position: fixed;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		left: 0;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: center;

		.popup-container {
			padding: 1rem;
			background: white;
			border-radius: 0.25rem;
			border: 1px solid rgb(240, 240, 240);
			box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.15);

			.ok-button-container {
				margin-top: 1rem;
				text-align: center;

				& > button {
					appearance: none;
					background-color: #2ea44f;
					border: 1px solid rgba(27, 31, 35, 0.15);
					border-radius: 6px;
					box-shadow: rgba(27, 31, 35, 0.1) 0 1px 0;
					box-sizing: border-box;
					color: #fff;
					cursor: pointer;
					display: inline-block;
					font-size: 14px;
					font-weight: 600;
					line-height: 20px;
					padding: 6px 16px;
					position: relative;
					text-align: center;
					text-decoration: none;
					user-select: none;
					-webkit-user-select: none;
					touch-action: manipulation;
					vertical-align: middle;
					white-space: nowrap;
				}
			}
		}
	}
</style>