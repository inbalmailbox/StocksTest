// src/stores/UserStore.ts
import { makeAutoObservable } from 'mobx';

class UserStore {
  username = "inbal"; // Default username, can be dynamically set

  constructor() {
    makeAutoObservable(this);
  }

  setUsername(newUsername: string) {
    this.username = newUsername;
  }
}

const userStore = new UserStore();
export default userStore;
