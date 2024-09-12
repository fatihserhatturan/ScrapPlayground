class NetworkRequest {
    constructor(url, method, requestType, responseType, duration) {
      this.url = url;
      this.method = method;
      this.requestType = requestType;
      this.responseType = responseType;
      this.duration = duration;
    }
  }

  module.exports = NetworkRequest;
