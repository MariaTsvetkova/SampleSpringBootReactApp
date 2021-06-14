import http from "../http-common";

class MailDataService {
  getAll() {
    return http.get("/mails");
  }

  get(id) {
    return http.get(`/mails/${id}`);
  }

  create(data) {
    return http.post("/mails", data);
  }

  update(id, data) {
    return http.put(`/mails/${id}`, data);
  }

  delete(id) {
    return http.delete(`/mails/${id}`);
  }

  deleteAll() {
    return http.delete(`/mails`);
  }

  findByAddress(address) {
    return http.get(`/mails?address=${address}`);
  }
}

export default new MailDataService();