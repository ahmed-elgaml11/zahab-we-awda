import { createOne, deleteOne, getAll, getOne, updateOne } from "../utils/handlerFactory.js"

export const getAllUsers = getAll('user')

export const addUser = createOne('user')

export const getUser = getOne('user')

export const updateUser = updateOne('user')

export const deleteUser = deleteOne('user')