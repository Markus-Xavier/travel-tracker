export default class Trip {
  constructor(tripData, dataManager) {
    this.dataManager = dataManager;
    this.id = tripData.id;
    this.destination = this.getDestinationInfo(tripData.destinationID);
    this.travelers = tripData.travelers;
    this.date = tripData.date;
    this.duration = tripData.duration;
    this.status = tripData.status;
    this.timeFrame = this.getTripTimeFrame();
  }

  convertDates() {
    const date = new Date();
    return {
      currentDate: date.setHours(0, 0, 0, 0),
      tripDate: new Date(this.date).setHours(0, 0, 0, 0)
    }
  }

  getTripTimeFrame() {
    const convertedDates = this.convertDates();
    if (convertedDates.tripDate === convertedDates.currentDate) {
      return 'current';
    }
    if (convertedDates.tripDate <= convertedDates.currentDate) {
      return 'past';
    } else {
      return 'upcoming';
    }
  }

  getDestinationInfo(destinationID) {
    return this.dataManager.getDataByID('destinations', 'id', destinationID)[0];
  }

  calculateTripCost() {
    const totalBeforeFee = 
    (this.destination.estimatedLodgingCostPerDay * this.duration) 
    + 
    (this.destination.estimatedFlightCostPerPerson * this.travelers);
    const travelAgentFee = totalBeforeFee * 0.1;
    return totalBeforeFee + travelAgentFee;
  }
}