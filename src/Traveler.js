export default class Traveler {
  constructor (dataManager, travelerData) {
    this.dataManager = dataManager;
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.type = travelerData.travelerType;
    this.trips = null;
  }

  getTravelerTrips () {
    this.trips = this.dataManager.getDataByID('allTrips', 'userID', this.id);
  }
}