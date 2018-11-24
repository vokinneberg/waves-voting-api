import auth from './auth';
import projects from './projects';

export default (router) => {
  auth(router);
  projects(router);
};
