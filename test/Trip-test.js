import chai from 'chai';
import DataManager from '../src/DataManager';
const assert = chai.assert;
import Trip from '../src/Trip';
import testData from './testData';

describe('Trip', function() {
  let dataManager;
  let trip1;
  let trip2;

  beforeEach(function() {
    dataManager = new DataManager();
    dataManager.setData('destinations', testData.testDestinations);
    trip1 = new Trip(testData.testTrips[0], dataManager);
    trip2 = new Trip(testData.testTrips[1], dataManager);
  });

  it('should be a function', function() {
    assert.isFunction(Trip);
  });

  it('should be an instance of Trip', function() {
    assert.instanceOf(trip1, Trip);
  });

  it('should store the basic trip data', function() {
    assert.equal(trip1.id, 1);
    assert.equal(trip1.travelers, 1);
    assert.equal(trip1.date, '2022/09/16');
    assert.equal(trip1.duration, 8);
    assert.equal(trip1.status, 'approved');
    assert.equal(trip2.id, 2);
    assert.equal(trip2.travelers, 5);
    assert.equal(trip2.date, '2019/07/16');
    assert.equal(trip2.duration, 18);
    assert.equal(trip2.status, 'approved');
  });

  it('should figure out if the trip has already past', function() {
    trip2.getTripTimeFrame();
    assert.equal(trip2.timeFrame, 'past');
  });

  it('should get the destination information', function() {
    assert.deepEqual(trip1.destination, testData.testDestinations[0]);
    assert.deepEqual(trip2.destination, testData.testDestinations[1]);
  });

  it('should calculate how much a trip costs', function() {
    assert.equal(trip1.calculateTripCost(), 1056);
    assert.equal(trip2.calculateTripCost(), 6270);
  });
});