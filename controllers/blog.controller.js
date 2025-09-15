import { createOne, deleteOne, getAll, getOne, updateOne } from "../utils/handlerFactory.js"

export const getAllBlogs = getAll('blog')

export const addBlog = createOne('blog')

export const getBlog = getOne('blog')

export const updateBlog = updateOne('blog')

export const deleteBlog = deleteOne('blog')