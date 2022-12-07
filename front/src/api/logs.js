import Resource from '../api/resource';
import request from "../utils/request";

class Logs extends Resource {
  constructor() {
    super('log');
  }
  logs(resource) {
    return request({
      url: `/logs`,
      method: 'post',
      params: resource,
      
    })
  }

  get(id) {
    return request({
      url: '/logs/' + id,
      method: 'get',
    });
  }

}

export {Logs as default};
