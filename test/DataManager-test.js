import chai from 'chai';
import DataManager from '../src/DataManager';
const assert = chai.assert;

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
});