/**
 * Score DTO
 * Database ka raw object
 * clean response format me convert karega
 */
export default class ScoreDTO {
  constructor(score) {
    this.id = score._id;// Mongo _id ko id bana diya
    this.matchId = score.matchId;// Required fields
    this.innings = score.innings;
    this.battingTeam = score.battingTeam;
    this.score = score.score;
    this.wickets = score.wickets;
    this.overs = score.overs;
    this.runRate = score.runRate;
    this.target = score.target;
    this.createdBy = score.createdBy;// User info
    this.updatedBy = score.updatedBy;
    this.createdAt = score.createdAt;
    this.updatedAt = score.updatedAt;
  }
}
