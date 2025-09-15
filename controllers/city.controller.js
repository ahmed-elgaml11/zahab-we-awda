import { createOne, deleteOne, getAll, getOne, updateOne } from "../utils/handlerFactory.js"

export const getAllCities = getAll('city')

export const addCity = createOne('city')

export const getCity = getOne('city')

export const updateCity = updateOne('city')

export const deleteCity = deleteOne('city')



