import ApiCalls from './ApiCalls';
import DataManager from './DataManager';
import Traveler from './Traveler';


// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

const dashboardNavButtons = document.getElementsByClassName('dashboard-buttons')[0];
const dashboardCardSection = document.getElementsByClassName('dashboard-cards')[0];
const noTripText = document.querySelector('.dashboard-cards span');



const apiCalls = new ApiCalls();
const dataManager = new DataManager();
let traveler = null;

const displayTravelCards = (displayData, location) => {
  location.innerHTML = '';
  displayData.forEach(data => {
    location.innerHTML += `
    <div class="card">
    <div class="d-flex">
      <img src="${data.destination.image}">
      <div class="d-flex flex-column justify-content-space-between">
        <div>${data.destination.destination}</div>
        <div>$${data.calculateTripCost()}</div>
      </div>
    </div>
    <div>${data.duration} days</div>
    <div>${data.date}</div>
    </div>`
  });
}

const dashboardButtonHandler = (event) => {
  switch (event.target.innerText) {
  case 'Past':
    displayTravelCards(traveler.filterTrips('past'), dashboardCardSection);
    break;

  default:
    break;
  }
};

const startListen = () => {
  dashboardNavButtons.addEventListener('click', dashboardButtonHandler);
}

Promise.all([apiCalls.fetchAllData('trips'), apiCalls.fetchSpecificData('travelers', 43), apiCalls.fetchAllData('destinations')])
  .then(values => {
    dataManager.setData('allTrips', values[0].trips);
    dataManager.setData('destinations', values[2].destinations);
    traveler = new Traveler(dataManager, values[1]);
    traveler.getTravelerTrips();
    startListen();
  });

// apiCalls.fetchAllData('trips')
//   .then(response => {
//     dataManager.setData('allTrips', response);
//   });



// apiCalls.fetchSpecificData('travelers', 1)
//   .then(response => console.log(response));

