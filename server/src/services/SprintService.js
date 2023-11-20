import { dbContext } from "../db/DbContext.js";
import { BadRequest } from "../utils/Errors.js";

class SprintService {

  async getSprintsByProjectId(projectId) {
    const sprints = await dbContext.Sprints.find({ projectId })
      .populate('creator', 'name email pictures')
      .populate('project')
    return sprints
  }

  async createSprintWithProjectId(sprintData) {
    const newSprint = await dbContext.Sprints.create(sprintData);
    await newSprint.populate('creator', 'name email pictures');
    await newSprint.populate('project');
    return newSprint
  }

  async deleteSprintWithProjectId(creatorId, projectId, _id) {
    const sprint = await dbContext.Sprints.findOne({ creatorId, projectId, _id });
    if (!sprint) { throw new BadRequest('Cannot find the specified sprint with your ID') }
    await sprint.delete();
    return sprint
  }

}

export const sprintService = new SprintService();