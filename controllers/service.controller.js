import { createOne, deleteOne, getAll, getOne, updateOne } from "../utils/handlerFactory.js"

export const getAllAirlines = getAll('service')

export const addService = createOne('service')

export const getService = getOne('service')

export const updateService = updateOne('service')

export const deleteService = deleteOne('service')