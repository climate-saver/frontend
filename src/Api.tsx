import EventEmitter from 'events';

const API_BASE_URL = 'http://localhost:1338';

export class API extends EventEmitter {
  static async sendMessage(message: string) {
    // TODO actually send a message:
    return API._post('/user', {message});
  }

  static _get(path: string) {
    return API._fetch(path, {method: 'GET'});
  }

  static _post(path: string, body?: any) {
    return API._fetch(path, {method: 'POST', body});
  }

  static _put(path: string, body?: any) {
    return API._fetch(path, {method: 'PUT', body});
  }

  static _delete(path: string) {
    return API._fetch(path, {method: 'DELETE'});
  }
  /**
   * Makes an API request.
   * On success, resolves to the parsed JSON body.
   * On request error or http error, rejects with the error message.
   */
  static async _fetch(path: string, options: any = {}) {
    options.headers = options.headers || {};
    // Explicitly setting Content-Type for multipart form data will cause the browser to skip
    // setting boundary values.
    let isFormData = options.body instanceof FormData;
    if (options.body && !options.headers['Content-Type'] && !isFormData) {
      options.headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(options.body);
    }
    // API requests are cross-domain requests done with CORS.
    options.credentials = 'include';
    options.mode = 'cors';
    let response = await fetch(API_BASE_URL + path, options);
    if (response.status === 204) {
      return null;
    } else if (response.status >= 200 && response.status < 300) {
      // All non-empty successful responses are assumed to return JSON.
      return response.json();
    } else {
      // TODO throw error:
      // let bodyText = await response.text();
      // throw new Error(JSON.stringify(response), bodyText);
    }
  }
}
