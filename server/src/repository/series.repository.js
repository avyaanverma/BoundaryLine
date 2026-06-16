import { SeriesModel } from "../model/series.model.js";

class SeriesRepository {
    constructor(){
        this.seriesModel = SeriesModel;
    }

    async findAll(){
        // What: fetch all series.
        // Why: list APIs should hide soft-deleted records by default.
        // How: query by `isDeleted:false`, sort by name, and return plain objects.
        return this.seriesModel.find({isDeleted: false}).sort({startDate: 1}).lean();
    }

    async findById(seriesId){
        // What: fetch one active series by Mongo Object Id
        // Why: services need a single source of truth before returning or mutating series.
        // How: query by `_id` and `isDeleted:false`, then return a plain object.
        return this.seriesModel.find({ _id: seriesId, isDeleted: false}).lean();
    }

    async findByNameOrShortName(name, shortName, excludedSeriesId = null){
        // What: look for an  active series with a matching name or short name.
        // Why: create/update flows must protect unique series identity before saving.
        // How: build an `$or` query and optionally exclude the current series during updates.
        const query = {
            idDeleted: false,
            $or: [{name}, {shortName}]
        }

        if(excludedSeriesId){
            query._id = {$ne: excludedSeriesId}
        }

        return this.seriesModel.find(query).sort({startDate: 1}).lean();
    }

    async create(payload){
        // What: insert a new Series document.
        // Why: repository owns database writes so service logic stays database-agnostic.
        // How: call Mongoose create, then convert the returned document to a plain object.
         const series = await this.seriesModel.create(payload);
         
         return series.toObject();
    }

    async updateById(seriesId, payload){
        // What: update an active series document.
        // Why: PATCH APIs need partial updates while preserving soft-delete rules.
        // How: find by `_id` and `isDeleted:false`, then return the updated document.
        return this.seriesModel.findByIdAndUpdate({
                _id: seriesId, isDeleted: false
            }, 
            payload,
            {new: true, runValidators: true}
        ).lean();

    }

    async softDeleteById(seriesId){
        // What: mark a tournament as deleted without removing it from MongoDB.
        // Why: soft-delete keeps audit history and avoids accidental data loss.
        // How: update `isDeleted:true` and return the affected document.
        return this.seriesModel.findByIdAndUpdate({
            _id: seriesId,
            isDeleted: false
        },{
            isDeleted: true
        },{
            new : true
        })
    }
}

export default SeriesRepository;
