import * as commentaryRepository from "./commentary.repository.js";
import { Match } from "../shared/models/reference.model.js";
import { BadRequestError, NotFoundError } from "../../shared/errors/index.js";
import { logger } from "../../shared/util/Logger.js";
import { emitToMatch } from "../../shared/socket/emitToMatch.js";
import { Commentary } from "./commentary.model.js";

class ensureLiveMatch {
  constructor() {
    this.commentaryRepository = commentaryRepository;
  }

  /**
   * Checks if match is LIVE or not validate krta hai
   * Comentary only on live or ININGS_BREAK, status me allowed hai
   */
  async ensureLiveMatch(matchId) {
    const match = await Match.findOne({
      //finds the data from the databse
      _id: matchId,
      isDeleted: flase,
    });

    if (!match) {
      //finds if the match is existed in the database or not
      logger.warn({ matchId }, "Match not FOUND during VALIDATION");
      throw new NotFoundError("Match Not Found or is Deleted");
    }
    const liveStatuses = ["LIVE", "INNINGS_BREAK"]; //Commentary is allowed on these status

    //Agar match LIVE nahi hai
    if (!liveStatuses.includes(match.status)) {
      logger.warn(
        { matchId, status: match.status },
        "Commentary modified on a non-live match",
      );
      throw new BadRequestError(
        `Match is not live(current status is:${match.status})`,
      );
    }
  }

  /**
   * thes method new commentary add karega
   * Steps:
   * 1. Match validate karega
   * 2. Payload prepare karega
   * 3. Commentary database me save karega
   * 4. and last meSocket event emit karega
   */
  async addCommentary(commentaryData, userId) {
    logger.info({ matchId: commentaryData.matchId }, "Adding commentary entry");

    await this.ensureLiveMatch(commentaryData.matchId);

    const payload = { ...commentaryData, createdBy: userId, updatedBy: userId }; //final payload prepary karege and createdBy & updatedBy add kar dega

    //repository call karne vale hai isme and Commentary will be saved in the DB
    const commentary = await this.commentaryRepository.create(payload);

    logger.info(
      {
        commentaryId: commentary._id,
      },
      "Commentary entry created sucessfully",
    );

    //the last vala socket emit live users will be updated on the realtime
    emitToMatch(
      commentary.matchId.toString(),
      "commentary.updated",
      commentary,
    );

    return commentary;
  }

  /**
   * this method will commentary delete karega
   *
   * Steps:
   * 1. Commentary exist karti hai ya nahi check
   * 2. Match validation
   * 3. Commentary delete
   * 4. Socket event emit
   * steps same hi hai bss logic thodasa diff hai
   */

  /**
   * get karenge specific match ki commentary ko
   * and it is also paginated supported limits and page like how much limit data ek page me hoga and which page
   */
  async getCommentaryByMatch(matchId, limit = 50, page = 1) {
    logger.info(
      {
        matchId,
        limit,
        page,
      },
      "Fetching commentaries by match ID",
    );

    return await this.commentaryRepository.findByMatchId(matchId, limit, page);
  }

  async deleteCommentary(id, userId) {
    logger.info(
      {
        commentaryId: id,
      },
      "Deleting comentary entry",
    );

    const comentary = await this.commentaryRepository.findById(id); //jo commentary delete karna hai vo find karega

    if (!comentary) {
      logger.warn({ commentaryId: id }, "Commentary entry not found");
      throw new NotFoundError("Commentary entry not found");
    }

    // idr thodese basic constraints hai jese ki
    // match validation, non live match pe deletetion allowed nahi
    await this.ensureLiveMatch(commentary.matchId);

    await this.commentaryRepository.deleteById(id);

    logger.info(
      {
        commentaryId: id,
      },
      "Commentary deleted Sucessfully",
    );

    // socket emit: live cliens ko delte event bhejte hai
    emitToMatch(comentary.matchId.toString(), "commentary.deleted", { id });

    return comentary;
  }
}

export default new CommentaryService();
