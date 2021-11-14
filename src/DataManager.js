export default class DataManager {
  constructor () {
    this.allTrips = null;
  }

  setData(dataSet, data) {
    this[dataSet] = data;
  }

  getDataByID(dataSet, typeOfID, IDNumber) {
    return this[dataSet].filter(data => data[typeOfID] === IDNumber);
  }
}