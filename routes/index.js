import projects from './projects';
import files from './files';
import votes from './votes';

export default (router) => {
  projects(router);
  files(router);
  votes(router);
};
