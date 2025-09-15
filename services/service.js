import Services from "../models/Services.js";

export const getAll = (filter) => {
    return Services.find(filter);
}

export const createOne = async (body) => {
    return Services.create(body)
}
export const getOneById = async (id ) => {
    return Services.findById(id)
}

export const updateOne = async (id, body ) => {
    return await Services.findByIdAndUpdate(id, body, {
        new: true,
    })
}
export const deleteOne = async (id ) => {
    return await Services.findByIdAndDelete(id)
}
