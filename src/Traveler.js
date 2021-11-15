import Trip from "./Trip";

export default class Traveler {
  constructor (dataManager, travelerData) {
    this.dataManager = dataManager;
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.type = travelerData.travelerType;
    this.trips = null;
  }

  getTravelerTrips () {
    const trips = this.dataManager.getDataByID('allTrips', 'userID', this.id);
    this.trips = trips.map(trip => new Trip(trip, this.dataManager));
  }

  filterTrips(timeFrame) {
    return this.trips.filter(trip => trip.timeFrame === timeFrame);
  }
}