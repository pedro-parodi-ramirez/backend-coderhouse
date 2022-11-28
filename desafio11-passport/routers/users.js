import { Router } from 'express'
import DB from '../db/db.js'

const router = Router()

const verifyAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.status(401).json({ message: 'Unauthorized to zone private.' })
  }
}

router.get('/me', verifyAuth, async (req, res, next) => {
  console.log('req.session.passport', req.session.passport);
  try {
    const user = await DB.getUserByid(req.user._id)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { body } = req
    const user = await DB.createUser(body)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const { query = {} } = req
    const users = await DB.getUser(query)
    res.json(users)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { params: { id } } = req
    const user = await DB.getUserByid(id)
    if (!user) {
      return res.status(404).end()
    }
    res.json(user)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const { params: { id }, body } = req
    const { modifiedCount, matchedCount } = await DB.uploadUserById(id, body)
    if (!modifiedCount || !matchedCount) {
      return res.status(404).end()
    }
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { params: { id } } = req
    const { deletedCount } = await DB.deleteUserById(id)
    if (!deletedCount) {
      return res.status(404).end()
    }
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

export default router
