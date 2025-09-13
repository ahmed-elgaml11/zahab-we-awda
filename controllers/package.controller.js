import { createOne, deleteOne, getAll, getOne, updateOne } from "../utils/handlerFactory"

export const getAllPackages = getAll('package')

export const addPackage = createOne('package')

export const getPackage = getOne('package')

export const updatePackage = updateOne('package')

export const deletePackage = deleteOne('package')



