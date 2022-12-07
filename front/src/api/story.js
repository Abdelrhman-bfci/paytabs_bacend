import Resource from '../api/resource';
import request from "../utils/request";

class Story extends Resource {
  constructor() {
    super('stories');
  }

}

export {Story as default};
