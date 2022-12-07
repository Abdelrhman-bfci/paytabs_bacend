import Resource from './resource';
import request from "../utils/request";

class Forms extends Resource {
  constructor() {
    super('forms');
  }

  update(resource,id) {
    return request({
      url: `/forms/update/${id}`,
      method: 'put',
      data: resource

    })
  }
  add(resource) {
    console.log(resource)
    return request({
      url: `/forms/add_form`,
      method: 'post',
      data: resource
    })
  }
  form(resource) {
    return request({
      url: `/forms`,
      method: 'post',
      params: resource,
      
    })
  }

}

export {Forms as default};
