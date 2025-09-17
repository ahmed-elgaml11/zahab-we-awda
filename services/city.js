import City from "../models/City.js";

export const getAll = (filter) => {
    return City.find(filter);
}

export const createOne = async (body) => {
    return City.create(body)
}
export const getOneById = async (id ) => {
    return City.findById(id)
}

export const updateOne = async (id, body ) => {
    return await City.findByIdAndUpdate(id, body, {
        new: true,
    })
}
export const deleteOne = async (id ) => {
    return await City.findByIdAndDelete(id)
}



export const getCityBySlug = async (slug) => {
    return await City.findOne({ slug })
}
