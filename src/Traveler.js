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

  filterTrips(tripProperty, filterCriteria) {
    return this.trips.filter(trip => trip[tripProperty] === filterCriteria);
  }

  getYearlySpent() {
    const date = new Date();
    return this.trips.reduce((total, trip) => {
      const splitDate = trip.date.split(`/`);
      if (splitDate.indexOf(date.getFullYear().toString())) {
        return total + trip.calculateTripCost();
      }
      return total;
    }, 0);
  }
}