import Resource from "../api/resource";
import request from "../utils/request";

class Group extends Resource {
  constructor() {
    super("group");
  }

  list() {
    return request({
      url: `/groups/my_groups`,
      method: "post"
    });
  }

  add(resource) {
    return request({
      url: `/groups/add_group`,
      method: "post",
      data: resource
    });
  }

  get(id) {
    return request({
      url: `/groups/course_groups/${id}`,
      method: "get"
    });
  }

  addStudent(id, status, resource) {
    console.log(resource);
    return request({
      url: `/groups/add/${id}/${status}`,
      method: "post",
      data: resource
    });
  }

  authGroups(query) {
    return request({
      url: `/groups/student_groups`,
      method: "post",
      params: query
    });
  }

  update(resource, id) {
    return request({
      url: `/groups/edit/${id}`,
      method: "put",
      data: resource
    });
  }

  delete(id) {
    return request({
      url: `/groups/delete/${id}`,
      method: "delete"
    });
  }

  get_group_students(id, query) {
    return request({
      url: `groups/group/students/${id}`,
      method: "post",
      params: query
    });
  }
score(data){
  return request({
    url: `answers/countSorted`,
    method: "post",
     data: data

  });

}
questions(){
  return request({
    url: `allquestions`,
    method: "GET",
    // data: data

  });

}
usersCount(){
  return request({
    url: `usersCount`,
    method: "GET",
    // data: data

  });

}
studentscore(id){
  return request({
    url: `answers/score/${id}`,
    method: "GET"
  });

}
confirmScore(data) {
  console.log(data)
  return request({
    url: `/confirm/score`,
    method: "post",
    data: data
  });
}
sendReport(data) {
  console.log(data)
  return request({
    url: `/report`,
    method: "post",
    data: data
  });
}
getAnswers(data) {
  console.log(data)
  return request({
    url: `/getAnswers`,
    method: "post",
    data: data
  });
}

totalAnswers(){
  return request({
    url: `answers/totalAnswers`,
    method: "post"
  });

}
  get_group_info(id) {
    return request({
      url: `groups/show/${id}`,
      method: "GET"
    });
  }

  getStudentScore(data){

    return request({
      url: `/answers/studentScore`,
      method: "post",
      data: data
    });

  }
}

export { Group as default };
