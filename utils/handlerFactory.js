import * as hotelServices from '../services/hotel.js'
import * as countryServices from '../services/country.js'
import * as cityServices from '../services/city.js'
import * as tourServices from '../services/tour.js'
import * as packageServices from '../services/package.js'
import * as packaTypeServices from '../services/packageType.js'
import * as serviceServices from '../services/service.js'
import * as airlineServices from '../services/airline.js'
import * as userServices from '../services/user.js'

import { AppError } from './appError.js'
import { APIFeatures } from './queryFeatures.js'



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


export const getAll = (model) =>
    async (req, res, next) => {
        const service = serviceMap[model]
        let filter = {}
        // if (req.params.tourId) filter = { tour: req.params.tourId }

        const features = new APIFeatures(service.getAll(filter), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate()

        // const docs = await features.query.explain()
        const docs = await features.query

        res.status(200).json({
            status: 'success',
            results: docs.length,
            data: {
                data: docs
            }
        })
    }

export const createOne = (model) =>
    async (req, res, next) => {
        const service = serviceMap[model]
        const newDoc = await service.createOne(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                data: newDoc
            }
        })
    }

export const getOne = (model) =>
    async (req, res, next) => {
        const { id } = req.params
        const service = serviceMap[model]
        const doc = await service.getOneById(id);
        if (!doc) {
            throw new AppError('No Document found with that ID', 404);
        }
        res.status(200).json({
            status: 'success',
            data: {
                data: doc
            }
        })
    }


export const updateOne = (model) =>
    async (req, res, next) => {
        const { id } = req.params
        const service = serviceMap[model]
        const updateDoc = await service.updateOne(id, req.body);
        if (!updateDoc) {
            throw new AppError('No Document found with that ID', 404);
        }
        res.status(200).json({
            status: 'success',
            data: {
                data: updateDoc
            }
        })


    }


export const deleteOne = (model) =>
    async (req, res, next) => {
        const { id } = req.params
        const service = serviceMap[model]
        const deletedDoc = await service.deleteOne(id);
        if (!deletedDoc) {
            throw new AppError('No Document found with that ID', 404);
        }
        res.status(204).json({
            status: 'success',
            data: {
            }
        });

    }