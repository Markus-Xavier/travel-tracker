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

  getDestinationInfo() {
    return this.destinations.reduce((list, destination) => {
      list.push({
        name: destination.destination,
        id: destination.id
      });
      return list;
    }, []);
  }

}