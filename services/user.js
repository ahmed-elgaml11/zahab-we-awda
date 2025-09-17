import User from "../models/User.js";
import { successResponse } from "../utils/responseHandler.js";
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

export const findUser = async (email) => {
    return await User.findOne({ email }).select("+password");
}





export const sendTokenResponse = (res, message, user ) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() +  12 * 60 * 60 * 1000), // 12 hours
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  };

  res.cookie('jwt', token, options)
  return successResponse(res, 200, message, { ...user.toJSON(), token })
  
};



export const allowedData = (body, allowdFields) => {
    const allowed = {}
    Object.keys(body).forEach(field => {
        if(allowdFields.includes(field)){
            allowed[field] = body[field]
        }
    })
    return allowed

}


export const updateData = async (id, body) => {
    const user = await User.findOneAndUpdate({ _id: id }, body, {
        new: true,
    });
    return user     
}


export const deActivateTheUser = async (id) => {
    const user = await User.findByIdAndUpdate(id, { isActive: false }, { new: true })
    return user
}