import chai from 'chai';
const assert = chai.assert;
import testData from './testData';
import DataManager from '../src/DataManager';
import Traveler from '../src/Traveler';

describe('Traveler', function() {
  let dataManager;
  let traveler1;
  let traveler2;



  beforeEach(function() {
    dataManager = new DataManager();
    dataManager.setData('allTrips', testData.testTrips);
    traveler1 = new Traveler(dataManager, testData.testTravelers[0]);
    traveler2 = new Traveler(dataManager, testData.testTravelers[1]);
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
    assert.deepEqual(traveler1.trips, [testData.testTrips[0]]);
    traveler2.getTravelerTrips();
    assert.deepEqual(traveler2.trips, [testData.testTrips[1]]);
  });
});