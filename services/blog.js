import Blog from "../models/Blog.js";

export const getAll = (filter) => {
    return Blog.find(filter);
}

export const createOne = async (body) => {
    return Blog.create(body)
}
export const getOneById = async (id ) => {
    return Blog.findById(id)
}

export const updateOne = async (id, body ) => {
    return await Blog.findByIdAndUpdate(id, body, {
        new: true,
    })
}
export const deleteOne = async (id ) => {
    return await Blog.findByIdAndDelete(id)
}

export const getBlogBySlug = async (slug) => {
    return await Blog.findOne({ slug })
}
