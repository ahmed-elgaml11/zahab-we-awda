import { errorResponse } from "./responseHandler.js"
import Hotel from "../models/Hotel.js"
import Country from "../models/Country.js"

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
    const { cityId } = req.params
    if(!cityId){
        return errorResponse(res, 400, 'cityId not found')
    }
    const city = await city.findById(cityId)
    if(!city){
        return errorResponse(res, 400, 'city not found')
    }
    next()    
}





export const checkCountryId = async(req, res, next) => {
    const { countryId } = req.params
    if(!countryId){
        return errorResponse(res, 400, 'countryId not found')
    }
    const country = await Country.findById(countryId)
    if(!country){
        return errorResponse(res, 400, 'country not found')
    }
    next()    
}