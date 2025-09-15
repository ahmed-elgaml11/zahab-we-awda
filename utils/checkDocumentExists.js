import { errorResponse } from "./responseHandler.js"

import * as hotelServices from '../services/hotel.js'
import * as countryServices from '../services/country.js'
import * as cityServices from '../services/city.js'
import * as tourServices from '../services/tour.js'
import * as packageServices from '../services/package.js'
import * as packaTypeServices from '../services/packageType.js'
import * as serviceServices from '../services/service.js'
import * as airlineServices from '../services/airline.js'
import * as userServices from '../services/user.js'

const serviceMap = {
    hotel: hotelServices,
    city: cityServices,
    country: countryServices,
    package: packageServices,
    tour: tourServices,
    packageType: packaTypeServices,
    user: userServices,
    service: serviceServices,
    airline: airlineServices
}

export const checkModelId = (model) => async(req, res, next) => {
    const modelId = model + 'Id'
    const id = req.params[paramName];

     if(!id){
        return errorResponse(res, 400, `${modelId} not found`)
    }
    const service = serviceMap[model]
    const model = await service.getOneById(id)
    if(!model){
        return errorResponse(res, 400, `${model} not found`)
    }
    next()
}
