import SeriesRepository from "../../../repository/series.repository.js";
import NotFound from "../../../shared/error/NotFound.js";

class SeriesService {
  constructor(seriesRepository = new SeriesRepository()) {
    this.seriesRepository = seriesRepository;
  }

  async getSeries() {
    return this.seriesRepository.findAll();
  }

  async getSeriesById(seriesId) {
    const series = await this.seriesRepository.findById(seriesId);
    if (!series) {
      throw new NotFound("Series not found");
    }
    return series;
  }

  async createSeries(payload) {
    return this.seriesRepository.create(payload);
  }

  async updateSeries(seriesId, payload) {
    await this.getSeriesById(seriesId);

    const updatedSeries = await this.seriesRepository.updateById(
      seriesId,
      payload,
    );

    if (!updatedSeries) {
      throw new NotFound("Series not found");
    }

    return updatedSeries;
  }

  async deleteSeries(seriesId) {
    await this.getSeriesById(seriesId);
    const deletedSeries = await this.seriesRepository.softDeleteById(seriesId);

    if (!deletedSeries) {
      throw new NotFound("Series not found");
    }

    return deletedSeries;
  }
}

export default SeriesService;
