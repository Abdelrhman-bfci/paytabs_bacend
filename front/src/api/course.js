import Resource from "../api/resource";
import request from "../utils/request";
import store from "../store/store";

class Course extends Resource {
  constructor() {
    super("courses");
  }

  getCategory(){
    return request({
      url: `/categories`,
      method: 'post',
    })
  }
}

export { Course as default };
