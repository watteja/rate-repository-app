import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStorage {
  constructor(namespace = "auth") {
    this.namespace = namespace;
  }

  // Get the access token from the storage
  getAccessToken() {
    return AsyncStorage.getItem(`${this.namespace}:accessToken`);
  }

  // Add the access token to the storage
  setAccessToken(accessToken) {
    AsyncStorage.setItem(`${this.namespace}:accessToken`, accessToken);
  }

  // Remove the access token from the storage
  removeAccessToken() {
    AsyncStorage.removeItem(`${this.namespace}:accessToken`);
  }
}

export default AuthStorage;
