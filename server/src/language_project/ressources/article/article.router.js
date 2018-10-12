import express from 'express'
import passport from 'passport'
import articleController from './article.controller'
import { isAdmin } from '../../middlewares/admin'

export const articleRouter = express.Router()

// ADMIN_ROLE :
const adminOnly = [passport.authenticate('jwt', {session:false}), isAdmin]

articleRouter.route('/')
  .post(adminOnly, articleController.create)
  .get(articleController.articleList)
articleRouter.route('/:id')
  .get(articleController.oneArticle)
  .delete(adminOnly, articleController.delete)
  .put(adminOnly, articleController.update)
