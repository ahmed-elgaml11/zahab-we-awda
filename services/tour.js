import Tour from "../models/Tour.js";

export const getAll = (filter) => {
    return Tour.find(filter);
}

export const createOne = async (body) => {
    return Tour.create(body)
}
export const getOneById = async (id ) => {
    return Tour.findById(id)
}

export const updateOne = async (id, body ) => {
    return await Tour.findByIdAndUpdate(id, body, {
        new: true,
    })
}
export const deleteOne = async (id ) => {
    return await Tour.findByIdAndDelete(id)
}
