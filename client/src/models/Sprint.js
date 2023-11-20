export class Sprint {
  constructor(data) {
    this.id = data.id || data._id
    this.name = data.name
    this.isOpen = data.isOpen
    this.startDate = data.startDate
    this.endDate = data.endDate
    this.projectId = data.projectId
    this.project = data.project
    this.creatorId = data.creatorId
    this.creator = data.creator
  }
}
