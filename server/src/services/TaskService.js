import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { logger } from "../utils/Logger.js";

async function _sanitizeBody(body) {
  const updateable = {
    name: body.name,
    weight: body.weight,
    isComplete: body.isComplete,
    sprintId: body.sprintId,
    projectId: body.projectId,
  }
  return updateable
}
class TaskService {

  async getTasks(query) {
    const tasks = await dbContext.Tasks.find(query)
      .populate('creator', 'name picture')
      .populate('project')
      .populate('sprint');
    return tasks
  }

  async getTasksByProjectId(projectId) {
    const tasks = await dbContext.Tasks.find({ projectId })
      .populate('creator', 'name picture')
      .populate('project')
      .populate('sprint');
    return tasks
  }

  async createTask(taskData) {
    const newTask = await dbContext.Tasks.create(taskData);
    await newTask.populate('creator', 'name picture');
    await newTask.populate('project');
    await newTask.populate('sprint');
    return newTask
  }

  async deleteTask(creatorId, _id) {
    const task = await dbContext.Tasks.findOne({ creatorId, _id });
    if (!task) { throw new BadRequest('Cannot find the specified task with your ID') }
    await task.delete();
    return task
  }

  async updateTask(creatorId, _id, taskUpdates) {
    // const updates = _sanitizeBody(taskUpdates);
    const updated = await dbContext.Tasks.findOne(
      { creatorId, _id }
      // { $set: updates },
      // { runValidators: true, new: true }
    )
    updated.name = taskUpdates.name || updated.name
    updated.weight = taskUpdates.weight || updated.weight
    updated.isComplete = taskUpdates.isComplete || updated.isComplete
    updated.sprintId = taskUpdates.sprintId || updated.sprintId
    updated.projectId = taskUpdates.projectId || updated.projectId
    await updated.save()
    // if (!updated) { throw new BadRequest('Cannot find the specified task with your ID') }
    return updated
  }

}

export const taskService = new TaskService();