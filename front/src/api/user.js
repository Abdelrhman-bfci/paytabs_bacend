import Resource from "../api/resource";
import request from "../utils/request";
import store from "../store/store";

class User extends Resource {
  constructor() {
    super("users");
  }

  store(resource, id) {
    return request({
      url: `/users/save/${id}`,
      method: "post",
      headers: { "Content-Type": "multipart/form-data" },
      data: resource,
      onUploadProgress: function(progressEvent) {
        store.commit(
          "SET_UPLOAD_PROGRESS",
          parseInt(
            Math.round((progressEvent.loaded / progressEvent.total) * 100)
          )
        );
      }.bind(store)
    });
  }

  // edit child
  edit_child(query, id) {
    return request({
      url: `/users/edit/child/${id}`,
      method: "put",
      data: query
    });
  }

  teachers(query) {
    return request({
      url: `/teachers`,
      method: "post",
      params: query
    });
  }

  send_mail(query) {
    return request({
      url: `/users/send_mail`,
      method: "post",
      params: query
    });
  }

  activeTeachers(query) {
    return request({
      url: `/teachers/active`,
      method: "post",
      params: query
    });
  }

  active(id) {
    return request({
      url: `/teachers/active/${id}`,
      method: "post"
    });
  }

  pre_exam(id) {
    return request({
      url: `/check/exam/${id}`,
      method: "get"
    });
  }
  authTeachers(query) {
    return request({
      url: `/auth/teachers`,
      method: "post",
      params: query
    });
  }

  authStudent(query) {
    return request({
      url: `/auth/student`,
      method: "post",
      params: query
    });
  }

  add(id, status) {
    return request({
      url: `/users/add/${id}/${status}`,
      method: "post"
    });
  }

  // for messages
  notifications() {
    return request({
      url: `/users/notifications`,
      method: "post"
    });
  }

  courseRequest() {
    return request({
      url: `/users/courses/requests`,
      method: "post"
    });
  }

  changeStudentStatus(query) {
    return request({
      url: `/users/change/student/status`,
      method: "post",
      params: query
    });
  }

  changeCourseStatus(query) {
    return request({
      url: `/users/change/course/status`,
      method: "post",
      params: query
    });
  }

  studentRequest() {
    return request({
      url: `/users/student/requests`,
      method: "post"
    });
  }

  groupsUsers(data) {
    return request({
      url: `/groups/mygroupsusers`,
      method: "post",
      data
    });
  }

  GroupsRequests() {
    return request({
      url: `/users/groups/requests`,
      method: "post"
    });
  }

  changeGroupStatus(id, query) {
    return request({
      url: `/users/change/group/status/${id}`,
      method: "post",
      params: query
    });
  }

  changeStudentGroupStatus(query) {
    return request({
      url: `/users/change/student_group`,
      method: "post",
      params: query
    });
  }

  forgotPassword(query) {
    return request({
      url: `/users/forgot/password`,
      method: "post",
      params: query
    });
  }

  resetPassword(query) {
    return request({
      url: `/users/reset/password`,
      method: "post",
      params: query
    });
  }

  addChild(query) {
    return request({
      url: `/users/add/child`,
      method: "post",
      headers: { "Content-Type": "multipart/form-data" },
      data: query,
      onUploadProgress: function(progressEvent) {
        store.commit(
          "SET_UPLOAD_PROGRESS",
          parseInt(
            Math.round((progressEvent.loaded / progressEvent.total) * 100)
          )
        );
      }.bind(store)
    });
  }

  export(query) {
    console.log(query);
    return request({
      url: `/users/export`,
      method: "get",
      responseType: "blob",
      params: query
    });
  }

  export_cert(userId, groupId) {
    return request({
      url: `/users/export/certificate/${userId}/${groupId}`,
      method: "get",
      responseType: "blob"
      // params: query
    });
  }
}

export { User as default };
