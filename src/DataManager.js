export default class DataManager {
  constructor () {
    this.allTrips = null;
  }

  setData(location, data) {
    this[location] = data;
  }

  getDataByID(location, typeOfID, IDNumber) {
    const dataSet = this[location];
    return dataSet.filter(data => data[typeOfID] === IDNumber);
  }
}