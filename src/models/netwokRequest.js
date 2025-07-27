class NetworkRequest {
  constructor(url, method, requestType, responseType, duration, status, errorMessage = null) {
    this.url = url;
    this.method = method;
    this.requestType = requestType;
    this.responseType = responseType;
    this.duration = duration;
    this.status = status; 
    this.errorMessage = errorMessage; 
  }
}

module.exports = NetworkRequest;
