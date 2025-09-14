import { createOne, deleteOne, getAll, getOne, updateOne } from "../utils/handlerFactory.js"

export const getAllCountries = getAll('country')

export const addCountry = createOne('country')

export const getCountry = getOne('country')

export const updateCountry = updateOne('country')

export const deleteCountry = deleteOne('country')