import projects from './projects';
import auth from './auth';

export default adminRouter => {
  auth(adminRouter);
  projects(adminRouter);
};
