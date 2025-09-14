import User from "../models/User.js";

export const getAll = (filter) => {
    return User.find(filter);
}

export const createOne = async (body) => {
    return User.create(body)
}
export const getOneById = async (id ) => {
    return User.findById(id)
}

export const updateOne = async (id, body ) => {
    return await User.findByIdAndUpdate(id, body, {
        new: true,
    })
}
export const deleteOne = async (id ) => {
    return await User.findByIdAndDelete(id)
}

