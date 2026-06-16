import { asyncHandler } from "../../../shared/utils/asyncHandler.js";
import ApiResponse from "../../../shared/utils/ApiResponse.js";
import SeriesService from "../../private/series/series.service.js";

class PublicSeriesController {
  constructor(seriesService = new SeriesService()) {
    this.seriesService = seriesService;
  }

  listSeries = asyncHandler(async (_req, res) => {
    const series = await this.seriesService.getSeries();

    return new ApiResponse(200, "Series fetched successfully", series).send(res);
  });

  getSeries = asyncHandler(async (req, res) => {
    const series = await this.seriesService.getSeriesById(req.validated.params.id);

    return new ApiResponse(200, "Series fetched successfully", series).send(res);
  });
}

export default PublicSeriesController;
