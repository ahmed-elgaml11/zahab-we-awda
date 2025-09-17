import Package from "../models/Package.js";

export const getAll = (filter) => {
    return Package.find(filter);
}

export const createOne = async (body) => {
    return Package.create(body)
}
export const getOneById = async (id ) => {
    return Package.findById(id)
}

export const updateOne = async (id, body ) => {
    return await Package.findByIdAndUpdate(id, body, {
        new: true,
    })
}
export const deleteOne = async (id ) => {
    return await Package.findByIdAndDelete(id)
}

export const getPackageBySlug = async (slug) => {
    return await Package.findOne({ slug })
}


export const getDistinctPackageTypeCountryIds = async (packageTypeId) => {
    return await Package.distinct('country',  { packageType: packageTypeId })
}


export const getAllCountryPackages = async (countryId, packageTypeId) => {
    return await Package.find({country: countryId, packageType: packageTypeId}).select(' descText slug imageCover name price rate header ')
}

export const getPackageInfo = async (packageSlug) => {
    return await Package.findOne({ slug: packageSlug })
        .populate({
            path: 'country',
            populate: {
                path: 'cities',
                select: 'name imageCover description descText'
            },
            select: 'cities' 
        })
        .select('imageCover images name description itinerary includes excludes country');    
}