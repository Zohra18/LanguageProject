import express from 'express'
import { articleRouter } from './resources/article'
import { userRouter } from './resources/user'


export const restRouter = express.Router()

restRouter.use('/articles', articleRouter)
restRouter.use('/users', userRouter)
