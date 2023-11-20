export class Account {
  constructor(data) {
    this.id = data.id
    this.email = data.email
    this.name = data.name
    this.picture = data.picture
    this.github = data.github
    this.linkedin = data.linkedin
    this.resume = data.resume
    this.website = data.website
    this.bio = data.bio
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
  }
}
