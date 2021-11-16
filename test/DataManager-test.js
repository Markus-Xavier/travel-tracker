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
    dataManager.setData('dogBoy', 'I am a dog');
    assert.equal(dataManager.dogBoy, 'I am a dog');
  });

  it('should return specific data by ID', function() {
    dataManager.setData('allTrips', testData.testTrips);
    assert.deepEqual(dataManager.getDataByID('allTrips', 'id', 1), [testData.testTrips[0]]);
    assert.deepEqual(dataManager.getDataByID('allTrips', 'userID', 1), [testData.testTrips[0], testData.testTrips[2], testData.testTrips[4]]);
    assert.deepEqual(dataManager.getDataByID('allTrips', 'destinationID', 5), [testData.testTrips[4]]);
  });
  
  it('should return a list of all destination names', function() {
    dataManager.setData('destinations', testData.testDestinations);
    assert.deepEqual(dataManager.getDestinationInfo(), [{
      name: 'Lima, Peru',
      id: 1
    }, 
    {
      name: 'Stockholm, Sweden',
      id: 2
    },
    {
      name: 'Sydney, Austrailia',
      id: 3
    },
    {
      name: 'Cartagena, Colombia',
      id: 4
    }, 
    {
      name: 'Madrid, Spain',
      id: 5
    }]);
  });
});