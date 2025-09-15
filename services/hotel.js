import Hotel from "../models/Hotel.js";
export const getAll = (filter) => {
    return Hotel.find(filter);
}

export const createOne = async (body) => {
    return Hotel.create(body)
}

export const getOneById = async (id ) => {
    return Hotel.findById(id)
}

export const updateOne = async (id, body ) => {
    return await Hotel.findByIdAndUpdate(id, body, {
        new: true,
    })
}
export const deleteOne = async (id ) => {
    return await Hotel.findByIdAndDelete(id)
}

