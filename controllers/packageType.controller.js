import { createOne, deleteOne, getAll, getOne, updateOne } from "../utils/handlerFactory"

export const getAllPackageTypes = getAll('packageType')

export const addPackageType = createOne('packageType')

export const getPackageType = getOne('packageType')

export const updatePackageType = updateOne('packageType')

export const deletePackageType = deleteOne('packageType')



