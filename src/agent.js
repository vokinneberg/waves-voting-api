import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'http://localhost/api';

const responseBody = res => res.body;

let token = null;
const tokenPlugin = (req) => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
};

const requests = {
  del: url => superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url => superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) => superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) => superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
};

const Projects = {
  create: project => requests.post('/projects', { project }),
  delete: id => requests.del(`/projects/${id}`),
  get: id => requests.get(`/projects/${id}`),
  all: () => requests.get('/projects'),
};

export default {
  Projects,
  setToken: (_token) => { token = _token; },
};
