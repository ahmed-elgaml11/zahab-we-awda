import Country from "../models/Country.js";
export const getAll = (filter) => {
    return Country.find(filter);
}

export const createOne = async (body) => {
    return Country.create(body)
}

export const getOneById = async (id ) => {
    return Country.findById(id)
}

export const updateOne = async (id, body ) => {
    return await Country.findByIdAndUpdate(id, body, {
        new: true,
    })
}
export const deleteOne = async (id ) => {
    return await Country.findByIdAndDelete(id)
}

