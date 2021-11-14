import chai from 'chai';
const assert = chai.assert;
import Trip from '../src/Trip';
import testData from './testData';

describe('Trip', function() {
  let trip1;
  let trip2;

  beforeEach(function() {
    trip1 = new Trip(testData.testTrips[0]);
    trip2 = new Trip(testData.testTrips[1]);
  });

  it('should be a function', function() {
    assert.isFunction(Trip);
  });

  it('should be an instance of Trip', function() {
    assert.instanceOf(trip1, Trip);
  });

  it('should store the basic trip data', function() {
    assert.equal(trip1.id, 1);
    assert.equal(trip1.destinationID, 1);
    assert.equal(trip1.travelers, 1);
    assert.equal(trip1.date, '2022/09/16');
    assert.equal(trip1.duration, 8);
    assert.equal(trip1.status, 'approved');
    assert.equal(trip2.id, 2);
    assert.equal(trip2.destinationID, 2);
    assert.equal(trip2.travelers, 5);
    assert.equal(trip2.date, '2019/07/16');
    assert.equal(trip2.duration, 18);
    assert.equal(trip2.status, 'approved');
  });

  it('should figure out if the trip has already passed', function() {
    trip2.getTripTimeFrame();
    assert.equal(trip2.timeFrame, 'passed');
  });
});