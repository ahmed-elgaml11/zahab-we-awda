import { createOne, deleteOne, getAll, getOne, updateOne } from "../utils/handlerFactory.js"

export const getAllCities = getAll('city')

export const addCities = createOne('city')

export const getCities = getOne('city')

export const updateCities = updateOne('city')

export const deleteCities = deleteOne('city')




