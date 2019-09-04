import projects from './projects';
import auth from './auth';
import transactions from './transactions';

export default adminRouter => {
  auth(adminRouter);
  projects(adminRouter);
  transactions(adminRouter);
};
