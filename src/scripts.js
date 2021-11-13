import ApiCalls from './ApiCalls';


// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

const apiCalls = new ApiCalls();

apiCalls.fetchAllData('travelers')
  .then(response => console.log(response));

apiCalls.fetchSpecificData('travelers', 1)
  .then(response => console.log(response));

