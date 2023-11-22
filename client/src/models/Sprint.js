export class Sprint {
  constructor(data) {
    this.id = data.id || data._id
    this.name = data.name
    this.isOpen = data.isOpen
    this.weight = data.weight || 0
    this.startDate = new Date(data.startDate)
    this.endDate = new Date(data.endDate)
    this.projectId = data.projectId
    this.project = data.project
    this.creatorId = data.creatorId
    this.creator = data.creator
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
  }
}