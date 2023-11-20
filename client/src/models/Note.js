export class Note {
  constructor(data) {
    this.id = data.id || data._id
    this.body = data.body
    this.taskId = data.taskId
    this.task = data.task
    this.projectId = data.projectId
    this.project = data.project
    this.creatorId = data.creatorId
    this.creator = data.creator
  }
}
