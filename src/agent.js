import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'http://localhost/api';

const responseBody = res => res.body;

let token = 'dfsdfdshkdshk05439hfksdhf0243u90rujowo';
const tokenPlugin = (req) => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
};

const allowOriginPlugin = (req) => {
  req.set('Access-Control-Allow-Origin', '*');
};

const loggingPlugin = (req) => {
  console.info(`Request:${JSON.stringify(req)}`);
};

const requests = {
  del: url => superagent
    .del(`${API_ROOT}${url}`)
    .use(tokenPlugin)
    .use(loggingPlugin)
    .use(allowOriginPlugin)
    .then(responseBody),
  get: url => superagent
    .get(`${API_ROOT}${url}`)
    .use(tokenPlugin)
    .use(loggingPlugin)
    .use(allowOriginPlugin)
    .then(responseBody),
  put: (url, body) => superagent
    .put(`${API_ROOT}${url}`, body)
    .use(tokenPlugin)
    .use(loggingPlugin)
    .use(allowOriginPlugin)
    .then(responseBody),
  post: (url, body) => superagent
    .post(`${API_ROOT}${url}`, body)
    .use(tokenPlugin)
    .use(loggingPlugin)
    .use(allowOriginPlugin)
    .then(responseBody),
};

const Projects = {
  create: project => requests.post('/projects', project),
  delete: id => requests.del(`/projects/${id}`),
  get: id => requests.get(`/projects/${id}`),
  all: () => requests.get('/projects'),
};

const Users = {
  create: user => requests.post('/users', user),
  delete: wavesAddress => requests.del(`/users/${wavesAddress}`),
  get: wavesAddress => requests.get(`/users/${wavesAddress}`),
  all: () => requests.get('/users'),
};

export default {
  Projects,
  Users,
  setToken: (_token) => { token = _token; },
};
