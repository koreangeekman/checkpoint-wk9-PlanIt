import { dbContext } from "../db/DbContext.js";
import { BadRequest } from "../utils/Errors.js";

class SprintService {

  async getSprints(query) {
    const sprints = await dbContext.Sprints.find(query)
      .populate('creator', 'name email pictures')
      .populate('project')
    return sprints
  }

  async getSprintsByProjectId(projectId) {
    const sprints = await dbContext.Sprints.find({ projectId })
      .populate('creator', 'name email pictures')
      .populate('project')
    return sprints
  }

  async createSprint(sprintData) {
    const newSprint = await dbContext.Sprints.create(sprintData);
    await newSprint.populate('creator', 'name email pictures');
    await newSprint.populate('project');
    return newSprint
  }

  async deleteSprint(creatorId, _id) {
    const sprint = await dbContext.Sprints.findOne({ creatorId, _id });
    if (!sprint) { throw new BadRequest('Cannot find the specified sprint with your ID') }
    await sprint.delete();
    return sprint
  }

}

export const sprintService = new SprintService();