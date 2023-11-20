export class Note {
  constructor(data) {
    this.id = data.id || data._id
    this.name = data.name
    this.description = data.description
    this.creatorId = data.creatorId
    this.creator = data.creator
  }
}
