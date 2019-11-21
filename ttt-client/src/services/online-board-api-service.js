import TokenService from './token-service';
import config from '../config';

const OnlineBoardApiService = {
  createNewBoard() {
    return fetch(`${config.API_ENDPOINT}/games`, {
      method: 'POST',
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  getCurrentBoard(gameId) {
    console.log(gameId);
    // return fetch(`${config.API_ENDPOINT}/games/${gameId}`, {
    //   method: 'GET',
    //   headers: {
    //     authorization: `bearer ${TokenService.getAuthToken()}`,
    //   },
    // }).then(res =>
    //   !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    // );
  },
  postNewMove(gameId, updatedBoard) {
    return fetch(`${config.API_ENDPOINT}/games/${gameId}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        board: updatedBoard,
      }),
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
};

export default OnlineBoardApiService;
