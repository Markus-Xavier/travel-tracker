export default class Trip {
  constructor(tripData) {
    this.id = tripData.id;
    this.destinationID = tripData.destinationID;
    this.travelers = tripData.travelers;
    this.date = tripData.date;
    this.duration = tripData.duration;
    this.status = tripData.status;
    this.timeFrame = '';
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
    if (convertedDates.tripDate <= convertedDates.currentDate) {
      this.timeFrame = 'passed';
    } else {
      this.timeFrame = 'upcoming';
    }
  }
}