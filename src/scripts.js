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
const userBadgeName = document.getElementsByClassName('user-badge-name')[0];
const userBadgeAmount = document.getElementsByClassName('user-badge-amount')[0];



const apiCalls = new ApiCalls();
const dataManager = new DataManager();
let traveler = null;

const displayTravelCards = (displayData, location) => {
  location.innerHTML = '';
  if (!displayData.length) {
    console.log('dog boy');
    noTripText.hidden = false;
    return;
  }
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

const displayUserBadge = (user) => {
  userBadgeName.innerText = `Hi, ${user.name}`;
  userBadgeAmount.innerText = `Total spent on trips ${user}`
}

const dashboardButtonHandler = (event) => {
  switch (event.target.innerText) {
  case 'Past':
    displayTravelCards(traveler.filterTrips('timeFrame', 'past'), dashboardCardSection);
    break;

  case 'Upcoming':
    console.log()
    displayTravelCards(traveler.filterTrips('timeFrame', 'upcoming'), dashboardCardSection);
    break;

  case 'Pending':
    displayTravelCards(traveler.filterTrips('status', 'pending'), dashboardCardSection);
    break;
  
  default:
    break;
  }
};

const startListen = () => {
  dashboardNavButtons.addEventListener('click', dashboardButtonHandler);
};

Promise.all([apiCalls.fetchAllData('trips'), apiCalls.fetchSpecificData('travelers', 7), apiCalls.fetchAllData('destinations')])
  .then(values => {
    dataManager.setData('allTrips', values[0].trips);
    dataManager.setData('destinations', values[2].destinations);
    traveler = new Traveler(dataManager, values[1]);
    traveler.getTravelerTrips();
    startListen();
  });

