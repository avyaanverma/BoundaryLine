/**
 * Commentary metadata definition
 */
export const CommentaryFields = {
  id: "String",
  matchId: "ObjectId",
  over: "Number",
  ball: "Number",
  text: "String",
  type: "String (NORMAL | FOUR | SIX | WICKET | MILESTONE)",
  createdBy: "ObjectId",
  updatedBy: "ObjectId",
  createdAt: "Date",
  updatedAt: "Date"
};
