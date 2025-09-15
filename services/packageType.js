import PackageType from "../models/PackageType.js";

export const getAll = (filter) => {
    return PackageType.find(filter);
}

export const createOne = async (body) => {
    return PackageType.create(body)
}
export const getOneById = async (id ) => {
    return PackageType.findById(id)
}

export const updateOne = async (id, body ) => {
    return await PackageType.findByIdAndUpdate(id, body, {
        new: true,
    })
}
export const deleteOne = async (id ) => {
    return await PackageType.findByIdAndDelete(id)
}
