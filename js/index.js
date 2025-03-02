// function formatDate(date) {
//     const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//     const day = date.getDate().toString().padStart(2, '0');
//     const month = monthNames[date.getMonth()];
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
// }

// function calculateRemainingTime(checkoutDate) {
//     const now = new Date();
//     const checkout = new Date(checkoutDate);

//     if (isNaN(checkout.getTime())) {
//         return { daysLeft: 'Invalid Date', hoursLeft: '' };  // Return error if the date is invalid
//     }

//     const timeDifference = checkout - now;
//     if (timeDifference <= 0) {
//         return { daysLeft: '0', hoursLeft: '0' }; // No time left, already passed
//     }

//     const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
//     const hoursLeft = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

//     return { daysLeft, hoursLeft };
// }




// function fetchRooms() {
//     let selectedCity = document.getElementById("cityDropdown").value;
//     let selectedHotel = document.getElementById("hotelDropdown").value;

//     fetch(API_BASE_URL, {
//         method: 'POST',
//         body: JSON.stringify({
//             action: 'getFilterRooms',
//             city: selectedCity,
//             hotel: selectedHotel
//         }),
//     })
//     .then(response => response.json())
//     .then(data => {
//         let tableBody = document.getElementById("roomTableBody");
//         tableBody.innerHTML = "";

//         if (Array.isArray(data)) {
//             data.forEach((room, index) => {
//                 const { daysLeft, hoursLeft } = calculateRemainingTime(room.checkout);
//                 const formattedCheckoutDate = formatDate(new Date(room.checkout));

//                 const statusColor = room.status === "Filled" ? "green" :
//                                     room.status === "Exit Time" ? "red" :
//                                     room.status === "Available" ? "orange" : "gray";

//                 let row = `<tr>
//                     <td class="room-name">${room.roomName}</td>
//                     <td>${room.price}</td>
//                     <td>
//                         <button 
//                             class="status-btn" 
//                             style="background-color: ${statusColor}; color: white; border: none; padding: 3px 10px; cursor: pointer;"
//                             onclick="${room.status === 'Filled' || room.status === 'Exit Time' ? 'updateStatus(\'' + room.rid + '\', \'' + room.checkout + '\')' : 'return false;'}">
//                             ${room.status}
//                         </button>
//                     </td>
//                     <td>${formattedCheckoutDate || 'N/A'}</td>
//                     <td>${daysLeft} days ${hoursLeft} hours</td>
//                     <td>
//                         <button 
//                             class="clean-btn"
//                             style="background-color: red; color: white; padding: 5px 10px; border: none; cursor: pointer;"
//                             onclick="updateCleaningStatus(${index})">
//                             Dirty
//                         </button>
//                     </td>
//                     <td>
//                         <span class="feedback-icon" onclick="openFeedbackModal(${index})">📝</span>
//                     </td>
//                 </tr>`;
//                 tableBody.innerHTML += row;
//             });
//         } else {
//             tableBody.innerHTML = `<tr><td colspan="7">No rooms available.</td></tr>`;
//         }
//     })
//     .catch(error => {
//         console.error('Error fetching rooms:', error);
//         document.getElementById("roomTableBody").innerHTML = `<tr><td colspan="7">Failed to load rooms. Please try again later.</td></tr>`;
//     });
// }

// function fetchHotels(selectedCity) {
//     fetch(API_BASE_URL, {
//         method: "POST",
//         body: JSON.stringify({ action: "common" })
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log("FETCH HOTELS API RESPONSE:", data);
//         let hotelDropdown = document.getElementById("hotelDropdown");
//         hotelDropdown.innerHTML = ""; // Clear previous options

//         // Add "All" option first
//         let allOption = document.createElement("option");
//         allOption.value = "All";
//         allOption.textContent = "All";
//         hotelDropdown.appendChild(allOption);

//         if (selectedCity !== "All" && data[selectedCity]) {
//             // Populate hotels for the selected city
//             data[selectedCity].forEach(hotel => {
//                 let option = document.createElement("option");
//                 option.value = hotel;
//                 option.textContent = hotel;
//                 hotelDropdown.appendChild(option);
//             });
//         } else {
//             // Show all hotels across all cities
//             let allHotels = new Set();
//             Object.values(data).forEach(hotels => {
//                 hotels.forEach(hotel => allHotels.add(hotel));
//             });

//             allHotels.forEach(hotel => {
//                 let option = document.createElement("option");
//                 option.value = hotel;
//                 option.textContent = hotel;
//                 hotelDropdown.appendChild(option);
//             });
//         }
//     })
//     .catch(error => console.error("Error fetching hotels:", error));
// }

// // Listen for city selection change
// document.getElementById("cityDropdown").addEventListener("change", function() {
//     fetchHotels(this.value);
// });

// // Fetch hotels on page load based on default selected city
// document.addEventListener("DOMContentLoaded", function() {
//     let defaultCity = document.getElementById("cityDropdown").value;
//     fetchHotels(defaultCity);
// });




// let selectedRoomIndex = null; // To track which room's feedback is being written

// function openFeedbackModal(index) {
//     selectedRoomIndex = index;
//     document.getElementById("feedbackModal").style.display = "block";
// }

// function closeFeedbackModal() {
//     document.getElementById("feedbackModal").style.display = "none";
//     document.getElementById("feedbackText").value = ""; // Clear input field
// }

// function submitFeedback() {
//     const feedbackText = document.getElementById("feedbackText").value;
    
//     if (!feedbackText.trim()) {
//         alert("Please enter your feedback.");
//         return;
//     }

//     alert(`Feedback for Room ${selectedRoomIndex + 101}: \n${feedbackText}`);
    
//     closeFeedbackModal();
// }


// // Function to update room cleaning status
// function updateCleaningStatus(index) {
//     const button = document.getElementById(`clean-btn-${index}`);
    
//     if (button.textContent.trim() === "Dirty") {
//         button.textContent = "Clean";
//         button.style.backgroundColor = "green";
//     } else {
//         button.textContent = "Dirty";
//         button.style.backgroundColor = "red";
//     }
// }

// // Function to update room status
// function updateStatus(rid, checkout) {
//     fetch(API_BASE_URL, {
//         method: 'POST',
//         body: JSON.stringify({ action: 'updateCheckout',rid: rid, checkout:'',status:'Available'}),
//     })
//     .then(response => response.json())

// .then(data => {
//     if (data.status === "success") {  // ✅ FIX: Correct check
//         alert("checkout verified");
//         fetchRooms();  // ✅ Refresh room list after update
//     } else {
//         alert("Failed to update status. Server returned an error.");
//     }
// })
// .catch(error => {
//     console.error("Error updating status:", error);
//     alert("Failed to update status. Please check the console.");
// });
// }


// window.onload = fetchRooms;


function formatDate(date) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = date.getDate().toString().padStart(2, '0');
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

function calculateRemainingTime(checkoutDate) {
    const now = new Date();
    const checkout = new Date(checkoutDate);

    if (isNaN(checkout.getTime())) return { daysLeft: 'Invalid Date', hoursLeft: '' };

    const timeDifference = checkout - now;
    if (timeDifference <= 0) return { daysLeft: '0', hoursLeft: '0' };

    return {
        daysLeft: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
        hoursLeft: Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    };
}

function fetchRooms() {
    let selectedCity = document.getElementById("cityDropdown").value;
    let selectedHotel = document.getElementById("hotelDropdown").value;

    fetch(API_BASE_URL, {
        method: 'POST',
        body: JSON.stringify({
            action: 'getFilterRooms',
            city: selectedCity,
            hotel: selectedHotel
        }),
    })
    .then(response => response.json())
    .then(data => {
        let tableBody = document.getElementById("roomTableBody");
        tableBody.innerHTML = "";

        if (Array.isArray(data)) {
            data.forEach((room, index) => {
                const { daysLeft, hoursLeft } = calculateRemainingTime(room.checkout);
                const formattedCheckoutDate = formatDate(new Date(room.checkout));
                const statusColor = room.status === "Filled" ? "green" :
                                    room.status === "Exit Time" ? "red" :
                                    room.status === "Available" ? "orange" : "gray";

                let row = `<tr>
                    <td>${room.roomName}</td>
                    <td>${room.price}</td>
                    <td>
                        <button class="status-btn" data-rid="${room.rid}"
                            style="background-color: ${statusColor}; color: white; border: none; padding: 5px 10px; cursor: pointer;">
                            ${room.status}
                        </button>
                    </td>
                    <td>${formattedCheckoutDate || 'N/A'}</td>
                    <td>${daysLeft} days ${hoursLeft} hours</td>
                    <td>
                        <button class="clean-btn" data-rid="${room.rid}"
                          style="background-color: ${room.maintainance === 'Clean' ? 'green' : 'red'}; 
                          color: white; padding: 5px 10px; border: none; cursor: pointer;">
                          ${room.maintainance}
                        </button>
                    </td>
                    <td>
                        <span class="feedback-icon" data-index="${index}">📝</span>
                    </td>
                </tr>`;
                tableBody.innerHTML += row;
            });
        } else {
            tableBody.innerHTML = `<tr><td colspan="7">No rooms available.</td></tr>`;
        }
    })
    .catch(error => {
        console.error('Error fetching rooms:', error);
        document.getElementById("roomTableBody").innerHTML = `<tr><td colspan="7">Failed to load rooms.</td></tr>`;
    });
}

// Function to update room status
function updateStatus(rid) {
    fetch(API_BASE_URL, {
        method: 'POST',
        body: JSON.stringify({ action: 'updateCheckout', rid, status: 'Available' }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            alert("Checkout verified successfully!");
            fetchRooms();
        } else {
            alert("Failed to update status.");
        }
    })
    .catch(error => {
        console.error("Error updating status:", error);
        alert("Error updating status.");
    });
}

// Function to clean the room
function cleanRoom(rid) {
    fetch(API_BASE_URL, {
        method: 'POST',
        body: JSON.stringify({ action: 'clean', rid, status: 'Available' }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            alert("Room cleaned successfully!");
            fetchRooms();
        } else {
            alert("Failed to clean the room.");
        }
    })
    .catch(error => {
        console.error("Error cleaning room:", error);
        alert("Error cleaning room.");
    });
}

// Event Delegation for buttons
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("status-btn")) {
        let rid = event.target.getAttribute("data-rid");
        if (rid) updateStatus(rid);
    }
    if (event.target.classList.contains("clean-btn")) {
        let rid = event.target.getAttribute("data-rid");
        if (rid) cleanRoom(rid);
    }
});

window.onload = fetchRooms;
