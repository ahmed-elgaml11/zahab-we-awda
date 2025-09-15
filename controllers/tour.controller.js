import { createOne, deleteOne, getAll, getOne, updateOne } from "../utils/handlerFactory.js"

export const getAllTours = getAll('tour')

export const addTour = createOne('tour')

export const getTour = getOne('tour')

export const updateTour = updateOne('tour')

export const deleteTour = deleteOne('tour')