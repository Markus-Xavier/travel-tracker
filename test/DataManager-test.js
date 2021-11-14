import chai from 'chai';
const assert = chai.assert;
import DataManager from '../src/DataManager';
import testData from './testData'

describe('Data Manager', function() {
  let dataManager;

  beforeEach(function() {
    dataManager = new DataManager;
  });

  it('should be a function', function() {
    assert.isFunction(DataManager);
  });

  it('should be an instance of data manager', function() {
    assert.instanceOf(dataManager, DataManager);
  });

  it('should start with no trip data', function() {
    assert.equal(dataManager.allTrips, null);
  });

  it('should set data into the correct place', function() {
    assert.equal(dataManager.allTrips, null);
    dataManager.setData('allTrips', testData.testTrips);
    assert.deepEqual(dataManager.allTrips, testData.testTrips);
  });

  it('should return specific data by ID', function() {
    dataManager.setData('allTrips', testData.testTrips);
    assert.deepEqual(dataManager.getDataByID('allTrips', 'id', 3), [testData.testTrips[2]]);
    assert.deepEqual(dataManager.getDataByID('allTrips', 'userID', 4), [testData.testTrips[3]]);
    assert.deepEqual(dataManager.getDataByID('allTrips', 'destinationID', 5), [testData.testTrips[4]]);
  });
});