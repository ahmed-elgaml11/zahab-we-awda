import { createOne, deleteOne, getAll, getOne, updateOne } from "../utils/handlerFactory.js"

export const getAllAirlines = getAll('airline')

export const addAirline = createOne('airline')

export const getAirline = getOne('airline')

export const updateAirline = updateOne('airline')

export const deleteAirline = deleteOne('airline')