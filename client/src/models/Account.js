export class Account {
  constructor(data) {
    this.id = data.id
    this.email = data.email
    this.name = data.name
    this.picture = data.picture
    this.github = data.github
    this.linkedin = data.linkedin
    this.website = data.website
    this.bio = data.bio
    this.title = data.title
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
  }
}
