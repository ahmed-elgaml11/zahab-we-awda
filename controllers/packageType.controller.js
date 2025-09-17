import { createOne, deleteOne, getAll, getOne, updateOne } from "../utils/handlerFactory.js"
import { successResponse } from "../utils/responseHandler.js"
import {  getPackageTypeBySlug } from "../services/packageType.js"
import { getDistinctPackageTypeCountryIds } from "../services/package.js"
import { getCountriesInPackageType, getCountryBySlug } from "../services/country.js"
import { getAllCountryPackages } from "../services/package.js"
import Package from "../models/Package.js"
import Country from "../models/Country.js"
import PackageType from "../models/PackageType.js"

export const getAllPackageTypes = getAll('packageType')

export const addPackageType = createOne('packageType')

export const getPackageType = getOne('packageType')

export const updatePackageType = updateOne('packageType')

export const deletePackageType = deleteOne('packageType')



export const getPackageTypeCountries = async (req, res, next) => {
    const { packageTypeSlug } = req.params
    const packageType = await getPackageTypeBySlug(packageTypeSlug)
    const countryIds = await getDistinctPackageTypeCountryIds(packageType._id)
    const countries = await getCountriesInPackageType(countryIds)
    return successResponse(res, 200, 'all countires in this packageType', countries)
}


export const getCountryPackages = async (req, res, next) => {
    const { countrySlug } = req.params
    const { packageTypeSlug } = req.params
    const country = await getCountryBySlug(countrySlug)
    const packageType = await getPackageTypeBySlug(packageTypeSlug)
    const packages = await getAllCountryPackages(country._id, packageType._id)
    return successResponse(res, 200, 'all packages in this country', packages)

}


export const getPackageDetails = async (req, res, next) => {
    const { packageSlug } = req.params
    const pkg = await getPackageInfo(packageSlug)


    return successResponse(res, 200, 'all packages in this country', pkg)
}