import { Commentary } from "./commentary.model.js";

export default class CommentaryRepo {
  async create(payload) {
    return await Commentary.create(payload);
  }
  async findById(id) {
    return await Commentary.findById(id).populate("createdBy"); //createdBy query helps to get all the details
  }
  //this query helps to get all the data from the commentary records but here is a catch that
  //i have used a method called as pagination takki ek baar me sab data load na hoo
  async findAll(limit = 50, page = 1) {
    const skip = (page - 1) * limit;
    return await Commentary.find({})
      .sort({ createdAt: -1 }) //this sorting method is used for showing the lasted commentary
      .skip(skip) //it helps to skip the previous page's data
      .limit(limit); //max to max kitna data return karna hai uske liye limit use kiya hai
  }
  async findyByMatchId(matchId, limit = 50, page = 1) {
    const skip = (page - 1) * limit;
    return await Commentary.find({ matchId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("createdBy");
  }
  async deletedById(id) {
    return await Commentary.findByIdAndDelete(id);
  }
}