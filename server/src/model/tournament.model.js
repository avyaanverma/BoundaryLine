import mongoose, { mongo } from "mongoose";
import { format } from "../constant/format.constant";

const tournamentSchema = mongoose.Schema({
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
        enum: Object.values(TOURNAMENT_STATUS),
        default: TOURNAMENT_STATUS.UPCOMING
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
        type: mongoose.Types.Schema.ObjectId,
        ref: "User",
        required: true
    },
    updatedBy: {
        type: mongoose.Types.Schema.ObjectId,
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

export const TournamentModel = mongoose.model("Tournament", tournamentSchema);