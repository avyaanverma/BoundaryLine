/**
 * Commentary DTO
 *
 * Database ka raw object
 * clean format me convert karega
 */
export default class CommentaryDTO {
  constructor(commentary) {
    // Mongo _id ko id bana diya
    this.id = commentary._id;

    // Required fields
    this.matchId = commentary.matchId;

    this.over = commentary.over;

    this.ball = commentary.ball;

    this.text = commentary.text;

    this.type = commentary.type;

    // User info
    this.createdBy = commentary.createdBy;

    // Dates
    this.createdAt = commentary.createdAt;
  }
}
