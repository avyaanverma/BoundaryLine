import mongoose from "mongoose";
import { FORMAT } from "../constant/format.constant.js";
import { TOURNAMENT_STATUS } from "../constant/tournament.constant.js";

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


export const TournamentModel = mongoose.models.Tournament || mongoose.model("Tournament", tournamentSchema);
