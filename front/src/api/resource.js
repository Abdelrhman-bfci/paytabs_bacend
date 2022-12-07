import request from '../utils/request';
import store from '../store/store';

/**
 * Simple RESTful resource class
 */
class Resource {
  constructor(uri) {
    this.uri = uri;
  }

  list(query) {
    return request({
      url: `/${this.uri}`,
      method: 'post',
      params: query,
    })
  }

  get(id) {
    return request({
      url: `/${this.uri}/show/${id}`,
      method: 'get',
    });
  }

  store(resource, id) {
    return request({
      url: `/${this.uri}/save${id}`,
      method: 'put',
      data: resource
    });
  }

  delete(id) {
    return request({
      url: `/${this.uri}/delete/${id}`,
      method: 'delete'
    })
  }

}

export {Resource as default};
