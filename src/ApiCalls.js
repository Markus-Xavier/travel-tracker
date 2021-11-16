export default class ApiCalls {
  constructor() {}

  fetchAllData(endPoint) {
    return fetch(`http://localhost:3001/api/v1/${endPoint}`)
      .then(result => result.json());
  }

  fetchSpecificData(endPoint, id) {
    return fetch(`http://localhost:3001/api/v1/${endPoint}/${id}`)
      .then(result => result.json());
  }

  postData(endPoint, data) {
    return fetch(`http://localhost:3001/api/v1/${endPoint}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error));
  }
}