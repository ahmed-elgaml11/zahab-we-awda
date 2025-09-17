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
import * as blogServices from '../services/blog.js'

const serviceMap = {
    hotel: hotelServices,
    city: cityServices,
    country: countryServices,
    package: packageServices,
    tour: tourServices,
    packageType: packaTypeServices,
    user: userServices,
    service: serviceServices,
    airline: airlineServices,
    blog: blogServices
}

export const checkModelId = (modelName) => async (req, res, next) => {
    const modelId = modelName + 'Id'
    const { id } = req.params;
    console.log(modelId, id)
    if (!id) {
        return errorResponse(res, 400, `${modelId} not found`)
    }
    const service = serviceMap[modelName]
    const doc = await service.getOneById(id)
    if (!doc) {
        return errorResponse(res, 400, `${modelName} not found`)
    }
    next()
}

export const checkModelSlug = (modelName) => async (req, res, next) => {
    const modelSlug = modelName + 'Slug'
    const slug = req.params[modelSlug]
    if (!slug) {
        return errorResponse(res, 400, `${modelName} slug not found`)
    }
    next()

}
