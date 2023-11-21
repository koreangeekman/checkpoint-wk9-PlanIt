import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { sprintService } from "../services/SprintService.js";

export class SprintController extends BaseController {
  constructor() {
    super('api/sprints')
    this.router
      .get('', this.getSprints)
      // 🔽 AUTHENTICATION REQUIRED BELOW 🔽
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createSprint)
      .delete('/:sprintId', this.deleteSprint)
    // .put('/:sprintId', this.updateSprint)
  }

  async getSprints(req, res, nxt) {
    try {
      const sprints = await sprintService.getSprints(req.query);
      res.send(sprints);
    }
    catch (error) { nxt(error) }
  }

  // SECTION 🔽 REQUIRES AUTHENTICATION 🔽

  async createSprint(req, res, nxt) {
    try {
      req.body.creatorId = req.userInfo.id;
      const newSprint = await sprintService.createSprint(req.body);
      res.send(newSprint);
    }
    catch (error) { nxt(error) }
  }

  async deleteSprint(req, res, nxt) {
    try {
      const deleted = await sprintService.deleteSprint(req.userInfo.id, req.params.sprintId);
      res.send(deleted);
    }
    catch (error) { nxt(error) }
  }

  // async updateSprint(req, res, nxt) {
  //   try {
  //     const updatedSprint = await sprintService.updateSprint(req.userInfo.id, req.params.sprintId, req.body);
  //     res.send(updatedSprint);
  //   }
  //   catch (error) { nxt(error) }
  // }

}