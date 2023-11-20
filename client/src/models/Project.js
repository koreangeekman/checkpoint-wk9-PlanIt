export class Note {
  constructor(data) {
    this.id = data.id || data._id
    this.name = data.name
    this.description = data.description
    this.creatorId = data.creatorId
    this.creator = data.creator
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
  }
}