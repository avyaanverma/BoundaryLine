import mongoose from "mongoose";
import { FORMAT } from "../constant/format.constant.js";
import { SERIES_STATUS } from "../constant/series.constant.js";

const seriesSchema = mongoose.Schema({
    name: {type: String, required: true, trim: true},
    format: {
        type: String,
        enum: Object.values(FORMAT), 
        default: FORMAT.FIVER
    },
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    status: {
        type: String,
        enum: Object.values(SERIES_STATUS),
        default: SERIES_STATUS.UPCOMING
    },
    teams:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team"
        }
    ],
    winnerTeam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        default: null
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{
    timestamps: true
});

seriesSchema.path("teams").validate(
    function(teams){
        return teams.length >= 2;
    },
    "Series must have atleast 2 teams"
)

export const SeriesModel = mongoose.models.Series || mongoose.model("Series", seriesSchema);
