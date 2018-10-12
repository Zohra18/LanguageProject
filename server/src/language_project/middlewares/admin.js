import { ADMIN_ROLE } from '../resources/user/user.model'

export const isAdmin = (req, res, next) => {
  if (req.user.hierarchy !== ADMIN_ROLE) {
    return res.json({err: 'Unauthorized: not an Admin'})
  }
  next();
};
