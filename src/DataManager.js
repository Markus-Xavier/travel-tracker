export default class DataManager {
  constructor () {
    this.allTrips = null;
    this.destinations = null;
  }

  setData(dataSet, data) {
    this[dataSet] = data;
  }

  getDataByID(dataSet, typeOfID, IDNumber) {
    return this[dataSet].filter(data => data[typeOfID] === IDNumber);
  }

  getDestinationNames() {
    return this.destinations.map(destination => destination.destination);
  }
}