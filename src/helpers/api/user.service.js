import api from './api';

class UserService {
  getPublicContent() {
    return api.get('/auth/user');
  }

  getUserBoard() {
    return api.get('/auth/user');
  }

  getModeratorBoard() {
    return api.get('/test/mod');
  }

  getAdminBoard() {
    return api.get('/test/admin');
  }
}

export default new UserService();
