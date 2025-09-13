import { createOne, deleteOne, getAll, getOne, updateOne } from "../utils/handlerFactory"

export const getAllHotels = getAll('hotel')

export const addHotel = createOne('hotel')

export const getHotel = getOne('hotel')

export const updateHotel = updateOne('hotel')

export const deleteHotel = deleteOne('hotel')



