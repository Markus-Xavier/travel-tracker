import chai from 'chai';
const assert = chai.assert;
import testData from './testData';
import DataManager from '../src/DataManager';
import Traveler from '../src/Traveler';
import Trip from '../src/Trip';

describe('Traveler', function() {
  let dataManager;
  let traveler1;
  let traveler2;
  let trip1;
  let trip2;
  let trip3; 
  let trip4;
  let trip5;



  beforeEach(function() {
    dataManager = new DataManager();
    dataManager.setData('allTrips', testData.testTrips);
    dataManager.setData('destinations', testData.testDestinations);
    traveler1 = new Traveler(dataManager, testData.testTravelers[0]);
    traveler2 = new Traveler(dataManager, testData.testTravelers[1]);
    trip1 = new Trip(testData.testTrips[0], dataManager);
    trip2 = new Trip(testData.testTrips[1], dataManager);
    trip3 = new Trip(testData.testTrips[2], dataManager);
    trip4 = new Trip(testData.testTrips[3], dataManager);
    trip5 = new Trip(testData.testTrips[4], dataManager);
  });

  it('should be a function', function() {
    assert.isFunction(Traveler);
  });

  it('should be instance of Traveler', function() {
    assert.instanceOf(traveler1, Traveler);
  });

  it('should have reference to a data manager', function() {
    assert.deepEqual(traveler1.dataManager, dataManager);
  });

  it('should store traveler data', function() {
    assert.equal(traveler1.id, 1);
    assert.equal(traveler1.name, 'Ham Leadbeater');
    assert.equal(traveler1.type, 'relaxer');
    assert.equal(traveler2.id, 2);
    assert.equal(traveler2.name, 'Rachael Vaughten');
    assert.equal(traveler2.type, 'thrill-seeker');
  });

  it('should store all of its trips', function() {
    traveler1.getTravelerTrips();
    assert.deepEqual(traveler1.trips, [trip1, trip3, trip5]);
    traveler2.getTravelerTrips();
    assert.deepEqual(traveler2.trips, [trip2, trip4]);
  });

  it('should filter out all of its past trips', function() {
    traveler1.getTravelerTrips();
    traveler2.getTravelerTrips();
    assert.deepEqual(traveler1.filterTrips('timeFrame', 'past'), [trip3]);
    assert.deepEqual(traveler2.filterTrips('timeFrame', 'past'), [trip2]);
  });

  it('should filter out all of its upcoming trips', function() {
    traveler1.getTravelerTrips();
    traveler2.getTravelerTrips();
    assert.deepEqual(traveler1.filterTrips('timeFrame', 'upcoming'), [trip1, trip5]);
    assert.deepEqual(traveler2.filterTrips('timeFrame', 'upcoming'), [trip4]);
  });

  it('should filter out pending trips', function() {
    traveler1.getTravelerTrips();
    traveler2.getTravelerTrips();
    assert.deepEqual(traveler1.filterTrips('status', 'pending'), [trip5]);
  });

  it('should get the total amount of money that has been spent on trips this year', function() {
    traveler2.getTravelerTrips();
    assert.equal(traveler2.getYearlySpent(), 1485);
  });
});