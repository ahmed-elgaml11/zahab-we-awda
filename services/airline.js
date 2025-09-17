import Airline from "../models/Airline.js";

export const getAll = (filter) => {
    return Airline.find(filter);
}

export const createOne = async (body) => {
    return Airline.create(body)
}
export const getOneById = async (id ) => {
    return Airline.findById(id)
}

export const updateOne = async (id, body ) => {
    return await Airline.findByIdAndUpdate(id, body, {
        new: true,
    })
}
export const deleteOne = async (id ) => {
    return await Airline.findByIdAndDelete(id)
}

export const getAirLineBySlug = async (slug) => {
    return await Airline.findOne({ slug })
}
