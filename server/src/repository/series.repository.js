import { SeriesModel } from "../model/series.model.js";

export default class SeriesRepository {
  constructor() {
    this.seriesModel = SeriesModel;
  }

  async findAll() {
    // What: fetch all active series.
    // Why: list APIs should hide soft-deleted records by default.
    // How: query by isDeleted:false and sort by start date.
    return this.seriesModel
      .find({ isDeleted: false })
      .sort({ startDate: 1 })
      .lean();
  }

  async findById(seriesId) {
    // What: fetch one active series by Mongo Object Id.
    // Why: services need a single source of truth before returning or mutating series.
    // How: query by _id and isDeleted:false.
    return this.seriesModel
      .findOne({
        _id: seriesId,
        isDeleted: false,
      })
      .lean();
  }

  async findByNameOrShortName(
    name,
    shortName,
    excludedSeriesId = null,
  ) {
    // What: look for an active series with matching name or short name.
    // Why: prevent duplicate series names.
    // How: build an $or query and optionally exclude current series.

    const query = {
      isDeleted: false,
      $or: [{ name }, { shortName }],
    };

    if (excludedSeriesId) {
      query._id = { $ne: excludedSeriesId };
    }

    return this.seriesModel.findOne(query).lean();
  }

  async create(payload) {
    // What: insert a new Series document.
    // Why: repository owns database writes.
    // How: create and return plain object.

    const series = await this.seriesModel.create(payload);

    return series.toObject();
  }

  async updateById(seriesId, payload) {
    // What: update an active series.
    // Why: PATCH APIs need partial updates.
    // How: update by _id and return updated document.

    return this.seriesModel
      .findOneAndUpdate(
        {
          _id: seriesId,
          isDeleted: false,
        },
        payload,
        {
          new: true,
          runValidators: true,
        },
      )
      .lean();
  }

  async softDeleteById(seriesId) {
    // What: mark series as deleted.
    // Why: preserve audit history.
    // How: set isDeleted:true.

    return this.seriesModel
      .findOneAndUpdate(
        {
          _id: seriesId,
          isDeleted: false,
        },
        {
          isDeleted: true,
        },
        {
          new: true,
        },
      )
      .lean();
  }
}