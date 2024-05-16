document.addEventListener("DOMContentLoaded", function () {
    // Get all navigation links
    var navLinks = document.querySelectorAll(".navigation a");

    // Add click event listeners to each navigation link
    navLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            // Prevent default link behavior
            event.preventDefault();

            // Remove the "active" class from all navigation links
            navLinks.forEach(function (navLink) {
                navLink.classList.remove("active");
            });

            // Add the "active" class to the clicked navigation link
            link.classList.add("active");
        });
    });
});


document.addEventListener("DOMContentLoaded", function() {
    var mobileMoneyRadio = document.getElementById("pm-momo");
    var bankTransferRadio = document.getElementById("pm-bank");
    var mobileMoneyDiv = document.getElementById("mobile-money");
    var bankAccountDiv = document.getElementById("bank-account");

    mobileMoneyRadio.addEventListener("change", function() {
        if (mobileMoneyRadio.checked) {
            mobileMoneyDiv.removeAttribute("hidden");
            bankAccountDiv.setAttribute("hidden", "true");
        }
    });

    bankTransferRadio.addEventListener("change", function() {
        if (bankTransferRadio.checked) {
            bankAccountDiv.removeAttribute("hidden");
            mobileMoneyDiv.setAttribute("hidden", "true");
        }
    });
});




var currentStage = 1;
var totalStages = 7;

function nextStage() {
    changeStage(1);
}

function previousStage() {
    changeStage(-1);
}

function changeStage(direction) {
    // Hide current form stage
    var currentFormStage = document.getElementById('stage' + currentStage);
    if (currentFormStage) {
        currentFormStage.classList.remove('visible');
    }

    // Calculate the next stage index
    var nextStageIndex = currentStage + direction;
    if (nextStageIndex < 1) {
        nextStageIndex = totalStages;
    } else if (nextStageIndex > totalStages) {
        nextStageIndex = 1;
    }

    // Update currentStage
    currentStage = nextStageIndex;

    // Show the next form stage
    var nextFormStage = document.getElementById('stage' + currentStage);
    if (nextFormStage) {
        nextFormStage.classList.add('visible');
    }
}



function loadLink(url, navId) {
    // Update the active state of the navigation link
    var navLinks = document.querySelectorAll(".navigation a");
    navLinks.forEach(function (link) {
        link.classList.remove("active");
    });
    var activeNav = document.getElementById(navId);
    if (activeNav) {
        activeNav.classList.add("active");
    }
    // Redirect to the specified URL
    window.location.href = url;
}

function showDropdown(method) {
    // Hide all dropdowns
    document.querySelectorAll('.select-wallet').forEach(dropdown => {
        dropdown.style.display = 'none';
    });

    // Show the dropdown corresponding to the selected payment method
    document.getElementById(method + 'Dropdown').style.display = 'block';
}