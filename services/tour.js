import Tours from "../models/Tours.js";

export const getAll = (filter) => {
    return Tours.find(filter);
}

export const createOne = async (body) => {
    return Tours.create(body)
}
export const getOneById = async (id ) => {
    return Tours.findById(id)
}

export const updateOne = async (id, body ) => {
    return await Tours.findByIdAndUpdate(id, body, {
        new: true,
    })
}
export const deleteOne = async (id ) => {
    return await Tours.findByIdAndDelete(id)
}
