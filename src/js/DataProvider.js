const DataProvider = {
	getJoke: () => {
		return new Promise((resolve, reject) => {
			fetch('https://api.chucknorris.io/jokes/random')
				.then(response => {
					response.json().then(response => {
						resolve(response);
					});
				})
				.catch(e => {
					reject(e);
				});
		});
	}
};

export default DataProvider;