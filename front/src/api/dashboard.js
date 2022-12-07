import Resource from "./resource";
import request from "../utils/request";

class Dashboard extends Resource {
  constructor() {
    super("dashboard");
  }

  counts() {
    return request({
      url: `/dashboard/counts`,
      method: "post"
    });
  }

  groups_data() {
    return request({
      url: `dashboard/evaluations/groups/count`,
      method: "post"
    });
  }

  evaluation_data() {
    return request({
      url: `dashboard/evaluations/month/count`,
      method: "post"
    });
  }

  logs_data() {
    return request({
      url: `/dashboard/logs/count`,
      method: "post"
    });
  }
}

export { Dashboard as default };
