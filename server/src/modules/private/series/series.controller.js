import { asyncHandler } from "../../../shared/utils/asyncHandler.js";
import ApiResponse from "../../../shared/utils/ApiResponse.js";
import SeriesService from "./series.service.js";

class SeriesController {
  constructor(seriesService = new SeriesService()) {
    this.seriesService = seriesService;
  }

  createSeries = asyncHandler(async (req, res) => {
    const series = await this.seriesService.createSeries(req.validated.body);

    return new ApiResponse(201, "Series created successfully", series).send(
      res,
    );
  });

  updateSeries = asyncHandler(async (req, res) => {
    const series = await this.seriesService.updateSeries(
      req.validated.params.id,
      req.validated.body,
    );

    return new ApiResponse(200, "Series updated successfully", series).send(
      res,
    );
  });

  deleteSeries = asyncHandler(async (req, res) => {
    const series = await this.seriesService.deleteSeries(
      req.validated.params.id,
    );

    return new ApiResponse(200, "Series deleted successfully", series).send(
      res,
    );
  });
}

export default SeriesController;
