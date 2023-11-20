
export class Task {
  constructor(data) {
    this.id = data.id || data._id
    this.name = data.name
    this.weight = data.weight
    this.isComplete = data.isComplete
    this.completedOn = new Date(data.completedOn)
    this.sprintId = data.sprintId
    this.sprint = data.sprint
    this.projectId = data.projectId
    this.project = data.project
    this.creatorId = data.creatorId
    this.creator = data.creator
  }
}