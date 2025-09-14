import Airlines from "../models/Airlines.js";

export const getAll = (filter) => {
    return Airlines.find(filter);
}

export const createOne = async (body) => {
    return Airlines.create(body)
}
export const getOneById = async (id ) => {
    return Airlines.findById(id)
}

export const updateOne = async (id, body ) => {
    return await Airlines.findByIdAndUpdate(id, body, {
        new: true,
    })
}
export const deleteOne = async (id ) => {
    return await Airlines.findByIdAndDelete(id)
}

