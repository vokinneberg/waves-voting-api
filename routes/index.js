import projects from './projects';
import files from './files';

export default (router) => {
  projects(router);
  files(router);
};
