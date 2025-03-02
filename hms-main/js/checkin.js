// // Set default Check-In and Check-Out times
// const today = new Date();
// const checkinDate = new Date(today);
// checkinDate.setHours(14, 0, 0, 0); // Default Check-In time: 2 PM
// const checkoutDate = new Date(today);
// checkoutDate.setDate(checkoutDate.getDate() + 1); // Default Check-Out: Next day
// checkoutDate.setHours(15, 0, 0, 0); // Default Check-Out time: 3 PM

// // Format dates as dd-MMM-YYYY
// const formatDate = (date) => {
//   const day = String(date.getDate()).padStart(2, '0');
//   const month = date.toLocaleString('default', { month: 'short' });
//   const year = date.getFullYear();
//   return `${day}-${month}-${year}`;
// };

// // Set default Check-In and Check-Out values
// document.getElementById('checkin').value = checkinDate.toISOString().split('T')[0];
// document.getElementById('checkout').value = checkoutDate.toISOString().split('T')[0];

// // Form submission with block booking validation
// document.getElementById('checkinForm').addEventListener('submit', function(event) {
//   event.preventDefault();

//   // Validate Name (at least 5 characters)
//   const name = document.getElementById('name').value;
//   if (name.length < 5) {
//     alert('Name must be at least 5 characters long.');
//     return;
//   }

//   // Validate Phone (10 digits)
//   const phone = document.getElementById('phone').value;
//   if (phone && !/^\d{10}$/.test(phone)) {
//     alert('Phone number must be 10 digits.');
//     return;
//   }

//   // Fetch existing check-ins and check for conflicts
//   // const roomNumber = document.getElementById('room').value;
//   // const checkinDate = new Date(document.getElementById('checkin').value);
//   // const checkoutDate = new Date(document.getElementById('checkout').value);

// //   fetch(API_BASE_URL)
// //     .then(response => response.json())
// //     .then(data => {
// //       const isAlreadyBooked = data.some(booking => {
// //         if (booking.room === roomNumber) {
// //           let existingCheckin = new Date(booking.checkin);
// //           let existingCheckout = new Date(booking.checkout);

// //           // Check if new booking overlaps with an existing one
// //           return checkinDate < existingCheckout && checkoutDate > existingCheckin;
// //         }
// //         return false;
// //       });

// //       if (isAlreadyBooked) {
// //         alert(`Room ${roomNumber} is already booked for the selected period.`);
// //         return;
// //       }

// //       // If no conflicts, proceed with check-in
// //       const newCheckin = {
// //         "room": roomNumber,
// //         "tenant": name,
// //         "contact": phone,
// //         "checkin": checkinDate.toISOString().split('T')[0],
// //         "checkout": checkoutDate.toISOString().split('T')[0],
// //         "price": document.getElementById('cost').value || 0
// //       };

// //       data.push(newCheckin);

// //       // Update checkin.json
// //       return fetch(API_BASE_URL, {
// //         method: 'POST', // Placeholder for API update
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(data, null, 2)
// //       });
// //     })
// //     .then(() => {
// //       alert('Check-in successful!');
// //       window.location.href = 'rooms.html';
// //     })
// //     .catch(error => console.error('Error:', error));
//  });
// //BUTTON FOR SECELCT CITY
// document.addEventListener("DOMContentLoaded", function () {
//   const CITY = ["Mecca", "Medina"]; // Loaded from constants.js
//   const cityContainer = document.getElementById("cityButtonsContainer");
//   let selectedCity = CITY[0]; // Default selected city

//   // Generate city buttons dynamically
//   CITY.forEach((city, index) => {
//       const button = document.createElement("button");
//       button.textContent = city;
//       button.classList.add("city-btn");
//       button.setAttribute("data-city", city);

//       if (index === 0) {
//           button.classList.add("active"); // Default selected
//       }

//       button.addEventListener("click", function () {
//           document.querySelectorAll(".city-btn").forEach(btn => btn.classList.remove("active"));
//           button.classList.add("active");
//           selectedCity = city; // Update selected city
//       });

//       cityContainer.appendChild(button);
//   });
// //SUBMITING CHECKIN FORM TO ADD NEW 

//       // Prepare log data
//       const log = {
//         uid: Math.floor(100000 + Math.random() * 900000), // Auto-generate 6-digit uid
//         today: formatDate(new Date()),
//         rid: document.getElementById('room').value,
//         room: document.getElementById('room').value,
//         tenant: document.getElementById('name').value,
//         contact: document.getElementById('phone').value,
//         checkin: formatDate(new Date(document.getElementById('checkin').value)),
//         checkout: formatDate(new Date(document.getElementById('checkout').value)),
//         price: document.getElementById('cost').value || 0,
//         userid: 'USER123', // Replace with actual user ID if available
//         image: '',
//         hotel:document.getElementById('hotel').value,
//         city:selectedCity 
//       };

//       // Submit log data
//       fetch('https://script.google.com/macros/s/AKfycbxEOmlAzX9BPSM03rkpT8a4zY96mMaBQkpy5cDXBKQVf7oW5zFNVmaKowgER2r_2IAc5Q/exec', {
//         method: 'POST',
//         body: JSON.stringify({ action: 'addLog', ...log }),
//       })
//       .then(response => response.json())
//       .then(data => {
//         if (data.status === 'success') {
//           // Show confirmation message
//           const confirmationMessage = document.getElementById('confirmationMessage');
//           confirmationMessage.style.display = 'block';
//           setTimeout(() => {
//             confirmationMessage.style.display = 'none';
//             window.location.href = 'rooms.html';
//           }, 4000); // Hide after 4 seconds
//         }
//       })
//       .catch(error => console.error('Error:', error));
//     });


// //DROP DOWN FOR CITY HOTEL ROOM
// document.addEventListener("DOMContentLoaded", function () {
//   const cityButtons = document.querySelectorAll(".city-btn");
//   const hotelDropdown = document.getElementById("hotel");
//   const roomDropdown = document.getElementById("room");

//   let dropdownData = {};

//   // Fetch data from API using POST request
//   fetch(API_BASE_URL, {
//       method: "POST",
//       // headers: {
//       //     "Content-Type": "application/json"
//       // },
//       body: JSON.stringify({ action: "commondropdown" })
//   })
//   .then(response => response.json())
//   .then(data => {
//       dropdownData = data;
//   })
//   .catch(error => console.error("Error fetching data:", error));

//   // Function to populate hotels dropdown based on selected city
//   function populateHotels(city) {
//       hotelDropdown.innerHTML = '<option value="">Select a Hotel</option>';
//       roomDropdown.innerHTML = '<option value="">Select a Room</option>'; // Reset rooms

//       if (dropdownData[city]) {
//           Object.keys(dropdownData[city]).forEach(hotel => {
//               const option = document.createElement("option");
//               option.value = hotel;
//               option.textContent = hotel;
//               hotelDropdown.appendChild(option);
//           });
//       }
//   }

//   // Function to populate rooms dropdown based on selected hotel
//   function populateRooms(city, hotel) {
//       roomDropdown.innerHTML = '<option value="">Select a Room</option>';

//       if (dropdownData[city] && dropdownData[city][hotel]) {
//           console.log("Populating rooms for:", city, hotel, dropdownData[city][hotel]); // Debug log
//           dropdownData[city][hotel].forEach(room => {
//               const option = document.createElement("option");
//               option.value = room;
//               option.textContent = room;
//               roomDropdown.appendChild(option);
//           });
//       } else {
//           console.warn("No rooms found for:", city, hotel); // Debug warning
//       }
//   }

//   // Event listener for city selection buttons
//   cityButtons.forEach(button => {
//       button.addEventListener("click", function () {
//           const selectedCity = this.getAttribute("data-city");
          
//           cityButtons.forEach(btn => btn.classList.remove("active")); // Remove active class from all buttons
//           this.classList.add("active"); // Set the active class to the clicked button

//           // Delay execution until data is loaded
//           if (Object.keys(dropdownData).length === 0) {
//               setTimeout(() => populateHotels(selectedCity), 500);
//           } else {
//               populateHotels(selectedCity);
//           }
//       });
//   });

//   // Event listener for hotel dropdown change
//   hotelDropdown.addEventListener("change", function () {
//       const selectedCity = document.querySelector(".city-btn.active")?.getAttribute("data-city");
//       const selectedHotel = this.value;

//       if (selectedCity && selectedHotel) {
//           populateRooms(selectedCity, selectedHotel);
//       }
//   });
// });


// // Call function to populate the dropdown when the page loads
// // document.addEventListener('DOMContentLoaded', populateRoomDropdown);

// document.addEventListener("DOMContentLoaded", function () {
//   const CITY = ["Mecca", "Medina"]; // Loaded from constants.js
//   const cityContainer = document.getElementById("cityButtonsContainer");
//   const checkinForm = document.getElementById("checkinForm");
//   const hotelDropdown = document.getElementById("hotel");
//   const roomDropdown = document.getElementById("room");
//   let dropdownData = {};
//   let selectedCity = CITY[0]; // Default selected city


//   // Set default check-in and check-out times
//   const today = new Date();
//   const checkinDate = new Date(today);
//   checkinDate.setHours(14, 0, 0, 0); // 2 PM check-in
//   const checkoutDate = new Date(today);
//   checkoutDate.setDate(checkoutDate.getDate() + 1);
//   checkoutDate.setHours(15, 0, 0, 0); // 3 PM check-out

//   // Format date function
//   const formatDate = (date) => {
//       const day = String(date.getDate()).padStart(2, '0');
//       const month = date.toLocaleString('default', { month: 'short' });
//       const year = date.getFullYear();
//       return `${day}-${month}-${year}`;
//   };

//   // Set default check-in and check-out values
//   document.getElementById('checkin').value = checkinDate.toISOString().split('T')[0];
//   document.getElementById('checkout').value = checkoutDate.toISOString().split('T')[0];

//   // Generate city buttons dynamically
//   CITY.forEach((city, index) => {
//       const button = document.createElement("button");
//       button.textContent = city;
//       button.classList.add("city-btn");
//       button.setAttribute("data-city", city);

//       if (index === 0) {
//           button.classList.add("active"); // Default selected
//       }

//       button.addEventListener("click", function () {
//           document.querySelectorAll(".city-btn").forEach(btn => btn.classList.remove("active"));
//           button.classList.add("active");
//           selectedCity = city; // Update selected city
//           populateHotels(city);
//       });

//       cityContainer.appendChild(button);
//   });

//   // Fetch dropdown data from API
//   fetch(API_BASE_URL, {
//       method: "POST",
//       body: JSON.stringify({ action: "commondropdown" })
//   })
//   .then(response => response.json())
//   .then(data => {
//       dropdownData = data;
//       populateHotels(selectedCity); // Populate dropdown with default city
//   })
//   .catch(error => console.error("Error fetching data:", error));

//   // Populate hotels dropdown based on selected city
//   function populateHotels(city) {
//       hotelDropdown.innerHTML = '<option value="">Select a Hotel</option>';
//       roomDropdown.innerHTML = '<option value="">Select a Room</option>'; // Reset rooms

//       if (dropdownData[city]) {
//           Object.keys(dropdownData[city]).forEach(hotel => {
//               const option = document.createElement("option");
//               option.value = hotel;
//               option.textContent = hotel;
//               hotelDropdown.appendChild(option);
//           });
//       }
//   }

//   // Populate rooms dropdown based on selected hotel
//   function populateRooms(city, hotel) {
//       roomDropdown.innerHTML = '<option value="">Select a Room</option>';

//       if (dropdownData[city] && dropdownData[city][hotel]) {
//           dropdownData[city][hotel].forEach(room => {
//               const option = document.createElement("option");
//               option.value = room;
//               option.textContent = room;
//               roomDropdown.appendChild(option);
//           });
//       }
//   }

//   // Event listener for hotel selection
//   hotelDropdown.addEventListener("change", function () {
//       const selectedHotel = this.value;
//       if (selectedHotel) {
//           populateRooms(selectedCity, selectedHotel);
//       }
//   });

//   // Handle form submission
//   checkinForm.addEventListener("submit", function (event) {
//       event.preventDefault(); // Prevent automatic submission

//       // Validate Name (at least 5 characters)
//       const name = document.getElementById('name').value;
//       if (name.length < 5) {
//           alert('Name must be at least 5 characters long.');
//           return;
//       }

//       // Validate Phone (10 digits)
//       const phone = document.getElementById('phone').value;
//       if (phone && !/^\d{10}$/.test(phone)) {
//           alert('Phone number must be 10 digits.');
//           return;
//       }

//       // Prepare log data
//       const log = {
//           uid: Math.floor(100000 + Math.random() * 900000), // Auto-generate 6-digit uid
//           today: formatDate(new Date()),
//           rid: document.getElementById('room').value,
//           room: document.getElementById('room').value,
//           tenant: name,
//           contact: phone,
//           checkin: formatDate(new Date(document.getElementById('checkin').value)),
//           checkout: formatDate(new Date(document.getElementById('checkout').value)),
//           price: document.getElementById('cost').value || 0,
//           userid: 'USER123', // Replace with actual user ID if available
//           image: '',
//           hotel: document.getElementById('hotel').value,
//           city: selectedCity
//       };

//       // Submit log data
//       fetch('https://script.google.com/macros/s/AKfycbxEOmlAzX9BPSM03rkpT8a4zY96mMaBQkpy5cDXBKQVf7oW5zFNVmaKowgER2r_2IAc5Q/exec', {
//           method: 'POST',
//           body: JSON.stringify({ action: 'addLog', ...log }),
//       })
//       .then(response => response.json())
//       .then(data => {
//           if (data.status === 'success') {
//               // Show confirmation message
//               const confirmationMessage = document.getElementById('confirmationMessage');
//               confirmationMessage.style.display = 'block';
//               setTimeout(() => {
//                   confirmationMessage.style.display = 'none';
//                   window.location.href = 'rooms.html';
//               }, 4000);
//           }
//       })
//       .catch(error => console.error('Error:', error));
//   });
// });
document.addEventListener("DOMContentLoaded", function () {
  const CITY = ["Madinah", "Mecca"];
  const cityContainer = document.getElementById("cityButtonsContainer");
  const checkinForm = document.getElementById("checkinForm");
  const hotelDropdown = document.getElementById("hotel");
  const roomDropdown = document.getElementById("room");
  let dropdownData = {};
  let selectedCity = CITY[0];

  function formatDateTime(date, hours, minutes) {
      date.setHours(hours, minutes, 0, 0);
      return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();
  }

  const today = new Date();
  const checkinDate = new Date(today);
  checkinDate.setHours(15, 0, 0, 0); // 3 PM Local Time

  const checkoutDate = new Date(today);
  checkoutDate.setDate(checkoutDate.getDate() + 1);
  checkoutDate.setHours(13, 0, 0, 0); // 1 PM Local Time

  document.getElementById("checkin").value = checkinDate.toISOString().split("T")[0];
  document.getElementById("checkout").value = checkoutDate.toISOString().split("T")[0];

  CITY.forEach((city, index) => {
      const button = document.createElement("button");
      button.textContent = city;
      button.classList.add("city-btn");
      button.setAttribute("data-city", city);

      if (index === 0) {
          button.classList.add("active");
      }

      button.addEventListener("click", function () {
          document.querySelectorAll(".city-btn").forEach(btn => btn.classList.remove("active"));
          button.classList.add("active");
          selectedCity = city;
          populateHotels(city);
      });

      cityContainer.appendChild(button);
  });

  fetch(API_BASE_URL, {
      method: "POST",
      body: JSON.stringify({ action: "commondropdown" })
  })
  .then(response => response.json())
  .then(data => {
      dropdownData = data;
      populateHotels(selectedCity);
  })
  .catch(error => console.error("Error fetching data:", error));

  function populateHotels(city) {
      hotelDropdown.innerHTML = '<option value="">Select a Hotel</option>';
      roomDropdown.innerHTML = '<option value="">Select a Room</option>';

      if (dropdownData[city]) {
          Object.keys(dropdownData[city]).forEach(hotel => {
              const option = document.createElement("option");
              option.value = hotel;
              option.textContent = hotel;
              hotelDropdown.appendChild(option);
          });
      }
  }

  function populateRooms(city, hotel) {
      roomDropdown.innerHTML = '<option value="">Select a Room</option>';
      if (dropdownData[city] && dropdownData[city][hotel]) {
          dropdownData[city][hotel].forEach(room => {
              const option = document.createElement("option");
              option.value = room;
              option.textContent = room;
              roomDropdown.appendChild(option);
          });
      }
  }

  hotelDropdown.addEventListener("change", function () {
      const selectedHotel = this.value;
      if (selectedHotel) {
          populateRooms(selectedCity, selectedHotel);
      }
  });

  document.getElementById("checkinForm").addEventListener("submit", async function (event) {
      event.preventDefault();

      const city = selectedCity || document.querySelector(".city-btn.active")?.getAttribute("data-city");
      const hotel = document.getElementById("hotel").value;
      const room = document.getElementById("room").value;

      if (!city || !hotel || !room) {
          alert("Please select city, hotel, and room before submitting.");
          return;
      }

      const checkin = new Date(document.getElementById("checkin").value);
      checkin.setHours(15, 0, 0, 0);

      const checkout = new Date(document.getElementById("checkout").value);
      checkout.setHours(13, 0, 0, 0);

      console.log("Check-in (Local):", checkin);
      console.log("Check-in (ISO):", checkin.toISOString());
      console.log("Checkout (Local):", checkout);
      console.log("Checkout (ISO):", checkout.toISOString());

      const log = {
          uid: Math.floor(100000 + Math.random() * 900000),
          today: new Date().toISOString().split("T")[0],
          rid: `${city}-${hotel}-${room}`,
          room: room,
          tenant: document.getElementById("name").value,
          contact: document.getElementById("phone").value,
          checkin: formatDateTime(checkin, 15, 0),
          checkout: formatDateTime(checkout, 13, 0),
          price: document.getElementById("cost").value || 0,
          userid: "USER123",
          image: "kkkimage",
          hotel: hotel,
          city: city,
          active: "Active"
      };

      console.log("Submitting Log:", log);

      try {
          const response = await fetch(API_BASE_URL, {
              method: "POST",
              body: JSON.stringify({ action: "addLog", ...log })
          });

          const data = await response.json();

          if (data.status === "success") {
              document.getElementById("confirmationMessage").style.display = "block";
              setTimeout(() => {
                  document.getElementById("confirmationMessage").style.display = "none";
              }, 4000);
              document.getElementById("checkinForm").reset();
          } else if (data.status === "error") {
              alert(data.message);
          } else {
              console.error("API Error:", data);
              alert("Failed to submit. Please try again.");
          }
      } catch (error) {
          console.error("Fetch Error:", error);
          alert("Error submitting check-in. Please check your internet connection.");
      }
  });
});

// document.addEventListener("DOMContentLoaded", function () {
//   const CITY = ["Madinah", "Mecca"];
//   const cityContainer = document.getElementById("cityButtonsContainer");
//   const checkinForm = document.getElementById("checkinForm");
//   const hotelDropdown = document.getElementById("hotel");
//   const roomDropdown = document.getElementById("room");
//   let dropdownData = {};
//   let selectedCity = CITY[0];

// // Function to set check-in and check-out times properly
// function formatDateTime(date, hours, minutes) {
//   date.setHours(hours, minutes, 0, 0);
//   return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();
// }

// // Set check-in (3 PM) and check-out (1 PM)
// const today = new Date();
// const checkinDate = formatDateTime(new Date(today), 15, 0); // 3 PM local time
// const checkoutDate = formatDateTime(new Date(today.setDate(today.getDate() + 1)), 13, 0); // 1 PM local time

// // Set default form values
// document.getElementById("checkin").value = checkinDate.split("T")[0];
// document.getElementById("checkout").value = checkoutDate.split("T")[0];

// document.getElementById("checkinForm").addEventListener("submit", async function (event) {
//   event.preventDefault();

//   const checkin = new Date(document.getElementById("checkin").value);
//   checkin.setHours(15, 0, 0, 0); // 3 PM local

//   const checkout = new Date(document.getElementById("checkout").value);
//   checkout.setHours(13, 0, 0, 0); // 1 PM local

//   const log = {
//       checkin: formatDateTime(checkin),
//       checkout: formatDateTime(checkout),
//   };

//   console.log("Submitting Log:", log);
// });


//   CITY.forEach((city, index) => {
//       const button = document.createElement("button");
//       button.textContent = city;
//       button.classList.add("city-btn");
//       button.setAttribute("data-city", city);

//       if (index === 0) {
//           button.classList.add("active");
//       }

//       button.addEventListener("click", function () {
//           document.querySelectorAll(".city-btn").forEach(btn => btn.classList.remove("active"));
//           button.classList.add("active");
//           selectedCity = city;
//           console.log("Selected City Updated:", selectedCity);
//           populateHotels(city);
//       });

//       cityContainer.appendChild(button);
//   });

//   // Fetch dropdown data from API
//   fetch(API_BASE_URL, {
//       method: "POST",
//       body: JSON.stringify({ action: "commondropdown" })
//   })
//   .then(response => response.json())
//   .then(data => {
//       dropdownData = data;
//       populateHotels(selectedCity);
//   })
//   .catch(error => console.error("Error fetching data:", error));

//   function populateHotels(city) {
//       hotelDropdown.innerHTML = '<option value="">Select a Hotel</option>';
//       roomDropdown.innerHTML = '<option value="">Select a Room</option>';

//       if (dropdownData[city]) {
//           Object.keys(dropdownData[city]).forEach(hotel => {
//               const option = document.createElement("option");
//               option.value = hotel;
//               option.textContent = hotel;
//               hotelDropdown.appendChild(option);
//           });
//       }
//   }

//   function populateRooms(city, hotel) {
//       roomDropdown.innerHTML = '<option value="">Select a Room</option>';
//       if (dropdownData[city] && dropdownData[city][hotel]) {
//           dropdownData[city][hotel].forEach(room => {
//               const option = document.createElement("option");
//               option.value = room;
//               option.textContent = room;
//               roomDropdown.appendChild(option);
//           });
//       }
//   }

//   hotelDropdown.addEventListener("change", function () {
//       const selectedHotel = this.value;
//       if (selectedHotel) {
//           populateRooms(selectedCity, selectedHotel);
//       }
//   });

//   document.getElementById("checkinForm").addEventListener("submit", async function (event) {
//       event.preventDefault();

//       const city = selectedCity || document.querySelector(".city-btn.active")?.getAttribute("data-city");
//       const hotel = document.getElementById("hotel").value;
//       const room = document.getElementById("room").value;

//       if (!city || !hotel || !room) {
//           alert("Please select city, hotel, and room before submitting.");
//           return;
//       }

//       const checkin = new Date(document.getElementById("checkin").value);
//       checkin.setHours(15, 0, 0, 0); // 3 PM Check-in

//       const checkout = new Date(document.getElementById("checkout").value);
//       checkout.setHours(13, 0, 0, 0); // 1 PM Check-out

//       const log = {
//           uid: Math.floor(100000 + Math.random() * 900000),
//           today: new Date().toISOString().split("T")[0],
//           rid: `${city}-${hotel}-${room}`,
//           room: room,
//           tenant: document.getElementById("name").value,
//           contact: document.getElementById("phone").value,
//           checkin: checkin.toISOString(),
//           checkout: checkout.toISOString(),
//           price: document.getElementById("cost").value || 0,
//           userid: "USER123",
//           image: "kkkimage",
//           hotel: hotel,
//           city: city,
//           active: "Active"
//       };

//       console.log("Submitting Log:", log);

//       try {
//           const response = await fetch(API_BASE_URL, {
//               method: "POST",
//               body: JSON.stringify({ action: "addLog", ...log })
//           });

//           const data = await response.json();

//           if (data.status === "success") {
//               document.getElementById("confirmationMessage").style.display = "block";

//               setTimeout(() => {
//                   document.getElementById("confirmationMessage").style.display = "none";
//               }, 4000);

//               // Reset the form
//               document.getElementById("checkinForm").reset();
//           } else if (data.status === "error") {
//               alert(data.message);
//           } else {
//               console.error("API Error:", data);
//               alert("Failed to submit. Please try again.");
//           }
//       } catch (error) {
//           console.error("Fetch Error:", error);
//           alert("Error submitting check-in. Please check your internet connection.");
//       }
//   });
// });

// document.addEventListener("DOMContentLoaded", function () {
//   const CITY = ["Madinah", "Mecca"]; // Loaded from constants.js
//   const cityContainer = document.getElementById("cityButtonsContainer");
//   const checkinForm = document.getElementById("checkinForm");
//   const hotelDropdown = document.getElementById("hotel");
//   const roomDropdown = document.getElementById("room");
//   let dropdownData = {};
//   let selectedCity = CITY[0]; // Default selected city

//   // Set default check-in and check-out values
//   document.getElementById('checkin').value = new Date().toISOString().split('T')[0];
//   document.getElementById('checkout').value = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];

//   // Generate city buttons dynamically
//   CITY.forEach((city, index) => {
//       const button = document.createElement("button");
//       button.textContent = city;
//       button.classList.add("city-btn");
//       button.setAttribute("data-city", city);
      
//       if (index === 0) {
//           button.classList.add("active"); // Default selected
//       }

//       button.addEventListener("click", function () {
//           document.querySelectorAll(".city-btn").forEach(btn => btn.classList.remove("active"));
//           button.classList.add("active");
//           selectedCity = city; // Update selected city
//           console.log("Selected City Updated:", selectedCity); // Debugging
//           populateHotels(city);
//       });
      
//       cityContainer.appendChild(button);
//   });

//   // Fetch dropdown data from API
//   fetch(API_BASE_URL, {
//       method: "POST",
//       body: JSON.stringify({ action: "commondropdown" })
//   })
//   .then(response => response.json())
//   .then(data => {
//       dropdownData = data;
//       populateHotels(selectedCity); // Populate dropdown with default city
//   })
//   .catch(error => console.error("Error fetching data:", error));
  

//   // Populate hotels dropdown
//   function populateHotels(city) {
//       hotelDropdown.innerHTML = '<option value="">Select a Hotel</option>';
//       roomDropdown.innerHTML = '<option value="">Select a Room</option>'; // Reset rooms

//       if (dropdownData[city]) {
//           Object.keys(dropdownData[city]).forEach(hotel => {
//               const option = document.createElement("option");
//               option.value = hotel;
//               option.textContent = hotel;
//               hotelDropdown.appendChild(option);
//           });
//       }
//   }

//   // Populate rooms dropdown
//   function populateRooms(city, hotel) {
//       roomDropdown.innerHTML = '<option value="">Select a Room</option>';
//       if (dropdownData[city] && dropdownData[city][hotel]) {
//           dropdownData[city][hotel].forEach(room => {
//               const option = document.createElement("option");
//               option.value = room;
//               option.textContent = room;
//               roomDropdown.appendChild(option);
//           });
//       }
//   }

//   hotelDropdown.addEventListener("change", function () {
//       const selectedHotel = this.value;
//       if (selectedHotel) {
//           populateRooms(selectedCity, selectedHotel);
//       }
//   });


// document.getElementById("checkinForm").addEventListener("submit", async function (event) {
//   event.preventDefault(); // Prevent automatic submission

//   // Fetch values properly
//   const city = selectedCity || document.querySelector(".city-btn.active")?.getAttribute("data-city");
//   const hotel = document.getElementById("hotel").value;
//   const room = document.getElementById("room").value;

//   // Ensure all values are available
//   if (!city || !hotel || !room) {
//       console.error("Error: Missing city, hotel, or room value.");
//       alert("Please select city, hotel, and room before submitting.");
//       return;
//   }

//   // Construct the log object
//   const log = {
//       uid: Math.floor(100000 + Math.random() * 900000), // Auto-generate 6-digit UID
//       today: new Date().toISOString().split("T")[0],
//       rid: `${city}-${hotel}-${room}`, // Construct rid
//       room: room,
//       tenant: document.getElementById("name").value,
//       contact: document.getElementById("phone").value,
//       checkin: document.getElementById("checkin").value,
//       checkout: document.getElementById("checkout").value,
//       price: document.getElementById("cost").value || 0,
//       userid: "USER123",
//       image: "kkkimage",
//       hotel: hotel,
//       city: city,
//       active:"Active"
//   };

//   console.log("Submitting Log:", log); // Debugging

//   try {
//       const response = await fetch(API_BASE_URL,
//           {
//               method: "POST",
//               body: JSON.stringify({ action: "addLog", ...log })
//           }
//       );

//       const data = await response.json();

//       if (data.status === "success") {
//           document.getElementById("confirmationMessage").style.display = "block";

//           setTimeout(() => {
//               document.getElementById("confirmationMessage").style.display = "none";
//           }, 4000);
//           alert(document.getElementById("s").value)


//           // Reset the form for the next entry
//           document.getElementById("checkinForm").reset();
//       } else if(data.status === "error"){
//         alert(data.message);
//       }
//       else {
//           console.error("API Error:", data);
//           alert("Failed to submit. Please try again.");
//       }
//   } catch (error) {
//       console.error("Fetch Error:", error);
//       alert("Error submitting check-in. Please check your internet connection.");
//   }
// });
// });