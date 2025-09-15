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
