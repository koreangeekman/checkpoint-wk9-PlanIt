import { dbContext } from "../db/DbContext.js";
import { BadRequest } from "../utils/Errors.js";

class ProjectService {

  async getProjects(query) {
    const project = await dbContext.Projects.find(query)
      .populate('creator', 'name email picture');
    // .populate('members', 'name picture');
    return project
  }

  async getProjectsByAccountId(creatorId) {
    const project = await dbContext.Projects.find({ creatorId });
    // .populate('members', 'name picture');
    return project
  }

  async getProjectById(projectId) {
    const project = await dbContext.Projects.findById(projectId);
    await project.populate('creator', 'name email picture');
    return project
  }

  async createProject(projectData) {
    const newProject = await dbContext.Projects.create(projectData);
    await newProject.populate('creator', 'name email picture');
    return newProject
  }

  async updateProject(creatorId, _id, projData) {
    const project = await dbContext.Projects.findOne({ creatorId, _id });
    if (!project) { throw new BadRequest('Cannot find the project with your ID') }
    project.name = projData.name || project.name;
    project.description = projData.description || project.description;
    await project.save();
    return project
  }

  async deleteProject(creatorId, _id) {
    const project = await dbContext.Projects.findOne({ creatorId, _id });
    if (!project) { throw new BadRequest('Cannot find the project with your ID') }
    await project.delete();
    return project
  }


}

export const projectService = new ProjectService();