function validateForm(event) {
    event.preventDefault(); // Stop form submission to allow display on page
    
    const inputs = ['star-rating', 'destination', 'title', 'description', 'photo-url', 'datestamp']; // IDs to validate
    let valid = true; // Track validation status
    let submittedData = {}; // Object to store submitted values

    for (const id of inputs) {
        const inputElement = document.getElementById(id);
        const inputValue = inputElement.value;

        switch (id) {
            // for star ratings, if there is no rating selected, display an alert. otherwise pass the selected value
            case 'star-rating': {
                const rating = document.querySelector('input[name="rating"]:checked');
                if (!rating) {
                   alert("Please select a star rating.");
                   valid = false;
                } else {
                   submittedData['Star Rating'] = rating.value;
                }
                break;
            }
            // for destination, if there is no text entered or the characters exceed 30, display an alert. otherwise pass the selected value
            case 'destination':
                if (inputValue === "") {
                    alert("Please enter a destination.");
                    valid = false;
                } else if (inputValue.length > 30) {
                    alert("Destination exceeds 30 characters!");
                    valid = false;
                } else {
                    submittedData['Destination'] = inputValue;
                }
                break;
            // for review title, if there is no text entered or the characters exceed 50, display an alert. otherwise pass the selected value
            case 'title':
                if (inputValue === "") {
                    alert("Please provide a title for your review.");
                    valid = false;
                } else if (inputValue.length > 50) {
                    alert("Title exceeds 50 characters!");
                    valid = false;
                } else {
                    submittedData['Review Title'] = inputValue;
                }
                break;
            // for description, if there is no text entered or the characters exceed 200, display an alert. otherwise pass the selected value
            case 'description':
                if (inputValue === "") {
                    alert("Please describe your travels.");
                    valid = false;
                } else if (inputValue.length > 200) {
                    alert("Description exceeds 200 characters!");
                    valid = false;
                } else {
                    submittedData['Description'] = inputValue;
                }
                break;
            // for URL, if there is no URL entered, display a message saying so. otherwise pass the selected value            
            case 'photo-url': {
                if (inputValue === "") {
                    submittedData['URL Input'] = "No URL provided";
                } 
                else {
                    submittedData['URL Input'] = inputValue;
                }
                break;
            }
            // for the date, use the built-in JS date method to log the date and time the form was submitted
            case 'datestamp': {
                const date = new Date();
                submittedData['Datestamp'] = date;
                break;
            }
            // for any case not captured, log a message to the console stating the ID didn't need to be validated
            default:
                console.log("No validation needed for " + id);
        }
    }

    // If validation passes, display submitted data
    if (valid) {
        const displayMessage = `
            <h3>Review Title: ${submittedData['Review Title']}</h3>
            <p><strong>Destination:</strong> ${submittedData['Destination']}</p>
            <p><strong>Star Rating:</strong> ${submittedData['Star Rating']}</p>
            <p><strong>Description:</strong> ${submittedData['Description']}</p>
            <p><strong>Image URL:</strong> ${submittedData['URL Input']}</p>
            <p><strong>Date:</strong> ${submittedData['Datestamp']}</p>
        `;
        document.getElementById('submitted-data').innerHTML = displayMessage;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Hook up the form handler
    const form = document.forms["review-form"];
    form.addEventListener("submit", validateForm);

    // Hook up review expansion

    // Handle expand/collapse of compact reviews
    const reviewTitles = document.querySelectorAll(".review-title");

    reviewTitles.forEach(title => {
        title.addEventListener("click", () => {
            const parent = title.parentElement;
            parent.classList.toggle("expanded");
        });
    });
});