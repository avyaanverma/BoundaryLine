export default class ScoreDTO {
  constructor(score) {
    this.id = score._id;
    this.matchId = score.matchId;
    this.innings = score.innings;
    this.battingTeam = score.battingTeam;
    this.score = score.score;
    this.wickets = score.wickets;
    this.overs = score.overs;
    this.runRate = score.runRate;
    this.target = score.target;
    this.createdBy = score.createdBy;
    this.updatedBy = score.updatedBy;
    this.createdAt = score.createdAt;
    this.updatedAt = score.updatedAt;
  }
}
