import { errorResponse } from "./responseHandler"
import Hotel from "../models/Hotel"

export const checkHotelId = async(req, res, next) => {
    const { hotelId } = req.params
    if(!hotelId){
        return errorResponse(res, 400, 'hotelId not found')
    }
    const hotel = await Hotel.findById(hotelId)
    if(!hotel){
        return errorResponse(res, 400, 'hotel not found')
    }
    next()
}
    


export const checkCityId = async(req, res, next) => {
    const { hotelId } = req.params
    if(!hotelId){
        return errorResponse(res, 400, 'cityId not found')
    }
    const hotel = await Hotel.findById(hotelId)
    if(!hotel){
        return errorResponse(res, 400, 'hotel not found')
    }
    next()    
}