export default class ApiCalls {
  constructor() {}

  fetchAllData(location) {
    return fetch(`http://localhost:3001/api/v1/${location}`)
      .then(result => result.json());
  }

  fetchSpecificData(location, id) {
    return fetch(`http://localhost:3001/api/v1/${location}/${id}`)
      .then(result => result.json());
  }
}