import ApiCalls from './ApiCalls';
import DataManager from './DataManager';
import Traveler from './Traveler';


// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import Trip from './Trip';

const dashboardNavButtons = document.getElementsByClassName('dashboard-buttons')[0];
const dashboardCardSection = document.getElementById('dashboard-card-section');
const tripBookCardSection = document.getElementById('trip-book-card-section');
const noTripText = document.querySelector('.dashboard-cards span');
const userBadgeName = document.getElementsByClassName('user-badge-name')[0];
const userBadgeAmount = document.getElementsByClassName('user-badge-amount')[0];
const destinationSelect = document.querySelector('[name="destinations"]');
const tripSelectionForm = document.querySelector('[name="trip-selection"]');

//form selectors
const tripSelectDate = document.getElementById('trip-selection-date');
const tripSelectDuration = document.getElementById('trip-selection-duration');
const tripSelectTravelers = document.getElementById('trip-selection-travelers');

const apiCalls = new ApiCalls();
const dataManager = new DataManager();
let traveler = null;
let pendingTripData = null;

const createDropdownSelectors = () => {
  dataManager.getDestinationInfo().forEach(info => {
    destinationSelect.innerHTML += `<option value="${info.id}">${info.name}</option>`
  });
};

const formatDate = (date) => {
  const formattedDate = date.replaceAll('-', '/');
  return formattedDate;
};

const handleTripSelection = (event) => {
  event.preventDefault();
  pendingTripData = {
    id: dataManager.allTrips.length + 1,
    userID: traveler.id,
    destinationID: parseInt(destinationSelect.value),
    travelers: tripSelectTravelers.value,
    date: formatDate(tripSelectDate.value),
    duration: tripSelectDuration.value,
    status: 'pending', 
    suggestedActivities: []
  };
  displayBookingCard(pendingTripData, tripBookCardSection);
};

const displayTripSelectionForm = (isDisplayed) => {
  tripSelectionForm.hidden = !isDisplayed;
}

const displayCardView = (isDisplayed) => {
  if (!isDisplayed) {
    dashboardCardSection.innerHTML = '';
  }
}

const displayTravelCards = (displayData, location) => {
  location.innerHTML = '';
  if (!displayData.length) {
    console.log('dog boy');
    noTripText.hidden = false;
    return;
  }
  displayData.forEach(data => {
    location.innerHTML += `
    <div class="card" value="${data.id}">
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

const displayBookingCard = (displayData, location) => {
  const trip = new Trip(displayData, dataManager);
  location.innerHTML = '';
  location.innerHTML = `
  <div class="card" value="${trip.id}">
  <div class="d-flex">
    <img src="${trip.destination.image}">
    <div class="d-flex flex-column justify-content-space-between">
      <div>${trip.destination.destination}</div>
      <div>$${trip.calculateTripCost()}</div>
    </div>
  </div>
  <div class="d-flex flex-column justify-content-space-between">
    <div>${trip.duration} days</div>
    <div>${trip.travelers} travelers</div>
  </div>
  <div class="d-flex flex-column justify-content-space-between">
    <div>${trip.date}</div>
    <div>
      <button>BOOK</button>
      <button>CANCEL</button>
    </div>
  </div>
</div>`
}

const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const displayUserBadge = (user) => {
  userBadgeName.innerText = `Hi, ${user.name}`;
  userBadgeAmount.innerText = `Spent this year $${formatNumber(user.getYearlySpent())}`;
}

const dashboardButtonHandler = (event) => {
  switch (event.target.innerText) {
  case 'Past':
    displayTripSelectionForm(false)
    displayTravelCards(traveler.filterTrips('timeFrame', 'past'), dashboardCardSection);
    break;

  case 'Upcoming':
    displayTripSelectionForm(false)
    displayTravelCards(traveler.filterTrips('timeFrame', 'upcoming'), dashboardCardSection);
    break;

  case 'Pending':
    displayTripSelectionForm(false);
    displayTravelCards(traveler.filterTrips('status', 'pending'), dashboardCardSection);
    break;
  
  case 'Add A Trip':
    displayCardView(false);
    displayTripSelectionForm(true); 
    break;

  default:
    break;
  }
};

const startListen = () => {
  dashboardNavButtons.addEventListener('click', dashboardButtonHandler);
  tripSelectionForm.addEventListener('submit', handleTripSelection);
  tripBookCardSection.addEventListener('click', (event) => {
    console.log(event.target.innerText);
    switch (event.target.innerText) {
    case 'BOOK':
      apiCalls.postData('trips', pendingTripData);
      break;
    
    case 'CANCEL':
      tripBookCardSection.innerHTML = '';
      break;

    default:
      break;
    }
  });
};

Promise.all([apiCalls.fetchAllData('trips'), apiCalls.fetchSpecificData('travelers', 7), apiCalls.fetchAllData('destinations')])
  .then(values => {
    dataManager.setData('allTrips', values[0].trips);
    dataManager.setData('destinations', values[2].destinations);
    createDropdownSelectors();
    traveler = new Traveler(dataManager, values[1]);
    traveler.getTravelerTrips();
    displayUserBadge(traveler);
    startListen();
  });

