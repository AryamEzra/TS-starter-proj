// Get references to our HTML elements using the updated class names
var searchInput = document.querySelector('.search-input');
var searchIcon = document.querySelector('.search-icon');
var modeToggleButton = document.querySelector('.mode-toggle');
var notificationsIcon = document.querySelector('.notifications-icon');
var accountIcon = document.querySelector('.account-icon');
// A reusable function to safely add an event listener
function addClickListener(element, handler) {
    if (element) {
        element.addEventListener('click', handler);
    }
    else {
        console.error("Error: Element not found for adding click listener.");
    }
}
// 1. Implement Search Functionality
var handleSearch = function () {
    if (searchInput) {
        var searchTerm = searchInput.value.trim();
        if (searchTerm !== '') {
            alert("Simulated search for: \"".concat(searchTerm, "\""));
            console.log("Searching for: ".concat(searchTerm));
            // In a real app, you'd navigate or filter data here
        }
        else {
            alert('Please enter a search term.');
        }
    }
};
// Add click listener to the search icon and keydown listener to the input
addClickListener(searchIcon, handleSearch);
if (searchInput) {
    searchInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            handleSearch(event);
        }
    });
}
// 2. Implement Dark/Light Mode Toggle
var handleModeToggle = function () {
    document.body.classList.toggle('dark-mode');
    var isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    console.log("Switched to ".concat(isDarkMode ? 'Dark' : 'Light', " Mode."));
};
// Check for a saved theme preference on page load
document.addEventListener('DOMContentLoaded', function () {
    var savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
});
addClickListener(modeToggleButton, handleModeToggle);
// 3. Implement Notifications and Account Icons
var handleNotificationsClick = function () {
    alert('Notifications clicked! A popup or dropdown would appear here.');
    console.log('Notifications icon clicked.');
};
var handleAccountClick = function () {
    alert('Account clicked! A user menu or profile page would appear here.');
    console.log('Account icon clicked.');
};
addClickListener(notificationsIcon, handleNotificationsClick);
addClickListener(accountIcon, handleAccountClick);
console.log('Header functionality loaded.');
