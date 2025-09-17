import Service from "../models/Service.js";

export const getAll = (filter) => {
    return Service.find(filter);
}

export const createOne = async (body) => {
    return Service.create(body)
}
export const getOneById = async (id ) => {
    return Service.findById(id)
}

export const updateOne = async (id, body ) => {
    return await Service.findByIdAndUpdate(id, body, {
        new: true,
    })
}
export const deleteOne = async (id ) => {
    return await Service.findByIdAndDelete(id)
}


export const getServiceBySlug = async (slug) => {
    return await Service.findOne({ slug })
}
