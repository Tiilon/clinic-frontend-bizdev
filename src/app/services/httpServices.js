import axios from "axios";

// const baseURL = "https://sparow-clinic-admin.herokuapp.com/api/"
const baseURL = "http://127.0.0.1:8000/api/"

export const authAxios = axios.create({
    baseURL:baseURL,
    timeout:5000,
    headers: {
        Authorization: localStorage.getItem("access_token")
            ? 'Bearer ' + localStorage.getItem("access_token") : null,
        'Content-Type': 'application/json',
        accept: 'application/json'
    }
})

authAxios.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		const originalRequest = error.config;

		if (typeof error.response === 'undefined') {
			alert(
				'A server/network error occurred. ' +
					'Looks like CORS might be the problem. ' +
					'Sorry about this - we will get it fixed shortly.'
			);
			return Promise.reject(error);
		}

		if (
			error.response.status === 401 &&
			originalRequest.url === baseURL + 'token/refresh/'
		) {
			window.location.href = '/login/';
			return Promise.reject(error);
		}

		if (
			error.response.data.code === 'token_not_valid' &&
			error.response.status === 401 &&
			error.response.statusText === 'Unauthorized'
		) {
			const refreshToken = localStorage.getItem('refresh_token');

			if (refreshToken) {
				const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

				// exp date in token is expressed in seconds, while now() returns milliseconds:
				const now = Math.ceil(Date.now() / 1000);
				console.log(tokenParts.exp);

				if (tokenParts.exp > now) {
					return authAxios
						.post('/token/refresh/', { refresh: refreshToken })
						.then((response) => {
							localStorage.setItem('access_token', response.data.access);
							localStorage.setItem('refresh_token', response.data.refresh);

							authAxios.defaults.headers['Authorization'] =
								'Bearer ' + response.data.access;
							originalRequest.headers['Authorization'] =
								'Bearer ' + response.data.access;

							return authAxios(originalRequest);
						})
						.catch((err) => {
							console.log(err);
						});
				} else {
					console.log('Refresh token is expired', tokenParts.exp, now);
					window.location.href = '/auth/login/';
				}
			} else {
				console.log('Refresh token not available.');
				window.location.href = '/auth/login/';
			}
		}

		// specific error handling done elsewhere
		return Promise.reject(error);
	}
);



