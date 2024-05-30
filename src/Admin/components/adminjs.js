
document.addEventListener('DOMContentLoaded', function() {
    // Initialize slimScroll for sidebar menu wrapper
    var sidebarMenuWrapper = document.getElementById('sidebar__menuWrapper');
    if (sidebarMenuWrapper) {
      slimScroll(sidebarMenuWrapper, {
        height: 'calc(100vh - 86.75px)',
        railVisible: true,
        alwaysVisible: true
      });
    }
  
    // Initialize slimScroll for dropdown menu body
    var dropdownMenuBody = document.querySelector('.dropdown-menu__body');
    if (dropdownMenuBody) {
      slimScroll(dropdownMenuBody, {
        height: '270px'
      });
    }
  
    // Initialize slimScroll for modal dialog scrollable modal body
    var modalDialogScrollableBody = document.querySelector('.modal-dialog-scrollable .modal-body');
    if (modalDialogScrollableBody) {
      slimScroll(modalDialogScrollableBody, {
        height: '100%'
      });
    }
  
    // Initialize slimScroll for activity list
    var activityList = document.querySelector('.activity-list');
    if (activityList) {
      slimScroll(activityList, {
        height: '385px'
      });
    }
  
    // Initialize slimScroll for recent ticket list
    var recentTicketListBody = document.querySelector('.recent-ticket-list__body');
    if (recentTicketListBody) {
      slimScroll(recentTicketListBody, {
        height: '295px'
      });
    }
  
    // Handle input event for navbar search field
    // var navbarSearchField = document.querySelector('.navbar-search-field');
    // if (navbarSearchField) {
    //   navbarSearchField.addEventListener('input', function() {
    //     var search = this.value.toLowerCase();
    //     var searchResultPane = document.querySelector('.search-list');
    //     searchResultPane.innerHTML = '';
  
    //     if (search.length === 0) {
    //       searchResultPane.classList.add('d-none');
    //       return;
    //     }
    //     searchResultPane.classList.remove('d-none');
  
    //     // Search for matching elements
    //     var match = Array.from(document.querySelectorAll('.sidebar__menu-wrapper .nav-link')).filter(function(elem) {
    //       return elem.textContent.trim().toLowerCase().indexOf(search) >= 0;
    //     }).sort();
  
    //     // Handle search result
    //     if (match.length === 0) {
    //       searchResultPane.innerHTML = '<li class="text-muted pl-5">No search result found.</li>';
    //       return;
    //     }
  
    //     // Display search results
    //     match.forEach(function(elem) {
    //       var parent = elem.closest('.sidebar-menu-item.sidebar-dropdown').querySelector('.menu-title').textContent.trim();
    //       parent = parent ? `<small class="d-block">${parent}</small>` : '<small class="d-block">Main Menu</small>';
    //       var itemUrl = elem.getAttribute('href') || elem.dataset.defaultUrl;
    //       var itemText = elem.textContent.replace(/(\d+)/g, '').trim();
    //       searchResultPane.innerHTML += `
    //         <li>
    //           ${parent}
    //           <a href="${itemUrl}" class="fw-bold text-color--3 d-block">${itemText}</a>
    //         </li>
    //       `;
    //     });
    //   });
    // }
  });
  
  // SlimScroll function
  function slimScroll(element, options) {
    // Implement slimScroll logic here
  }
  
document.addEventListener('DOMContentLoaded', function() {

    document.querySelectorAll('.profilePicUpload').forEach(function(input) {
        input.addEventListener('change', function() {
          proPicURL(this);
        });
      });



      document.querySelectorAll('.remove-image').forEach(function(button) {
        button.addEventListener('click', function() {
          var preview = this.closest('.profilePicPreview');
          preview.style.backgroundImage = 'none';
          preview.classList.remove('has-image');
          var fileInput = this.closest('.thumb').querySelector('input[type=file]');
          fileInput.value = '';
        });
      });
      
      document.querySelectorAll('form .file-upload-field').forEach(function(input) {
        input.addEventListener('change', function() {
          var wrapper = this.parentElement.querySelector('.file-upload-wrapper');
          wrapper.setAttribute('data-text', this.value.replace(/.*(\/|\\)/, ''));
        });
      });
      


      
    // Set background image for elements with class 'bg_img'
    var imgElements = document.querySelectorAll('.bg_img');
    imgElements.forEach(function(img) {
      var bg = 'url(' + img.getAttribute('data-background') + ')';
      img.style.backgroundImage = bg;
    });
  
  
    // Handle click event for sidebar open button
    var openBtn = document.querySelector('.res-sidebar-open-btn');
    var closeBtn = document.querySelector('.res-sidebar-close-btn');
    var sidebar = document.querySelector('.sidebar');

    if (openBtn) {
      openBtn.addEventListener('click', function() {
        sidebar.classList.add('open');
      });
    }
  
    // Handle click event for sidebar close button
    if (closeBtn){
      closeBtn.addEventListener('click', function() {
        sidebar.classList.remove('open');
      });
    }
   
  });
  




//  // Get the documentElement (<html>) to display the page in fullscreen
// let elem = document.documentElement;

// // Event listener for sidebar dropdown menu
// document.querySelectorAll('.sidebar-dropdown > a').forEach(function(link) {
//   link.addEventListener('click', function() {
//     let submenu = this.parentElement.querySelector('.sidebar-submenu');
//     if (submenu) {
//       if (submenu.style.display === 'block') {
//         this.querySelector('.side-menu__sub-icon').classList.remove('transform', 'rotate-180');
//         this.classList.remove('side-menu--open');
//         submenu.style.display = 'none';
//         submenu.classList.remove('sidebar-submenu__open');
//       } else {
//         this.querySelector('.side-menu__sub-icon').classList.add('transform', 'rotate-180');
//         this.classList.add('side-menu--open');
//         submenu.style.display = 'block';
//         submenu.classList.add('sidebar-submenu__open');
//       }
//     }
//   });
// });

// // Initialize select-2
// document.querySelectorAll('.select2-basic').forEach(function(select) {
//   // Initialize select2-basic
// });

// document.querySelectorAll('.select2-multi-select').forEach(function(select) {
//   // Initialize select2-multi-select
// });

// document.querySelectorAll('.select2-auto-tokenize').forEach(function(select) {
//   // Initialize select2-auto-tokenize
//   select.select2({
//     tags: true,
//     tokenSeparators: [',']
//   });
// });

// // Function to handle profile picture URL
function proPicURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      var preview = input.closest('.thumb').querySelector('.profilePicPreview');
      preview.style.backgroundImage = 'url(' + e.target.result + ')';
      preview.classList.add('has-image');
      preview.style.display = 'none';
      preview.style.display = 'block';
    }
    reader.readAsDataURL(input.files[0]);
  }
}






// // Select all input, select, and textarea elements
// var inputElements = document.querySelectorAll('input, select, textarea');

// // Loop through each input element
// inputElements.forEach(function(element) {
//   // Check conditions and manipulate DOM
//   if (!element.classList.contains('profilePicUpload') && (!element.id) && element.type !== 'hidden') {
//     var label = element.closest('.form-group').querySelector('label');
//     if (label) {
//       label.setAttribute('for', element.name);
//     }
//     element.id = element.name;
//   }
// });



// // Add 'required' class to labels of required inputs
// var requiredElements = document.querySelectorAll('input[required], select[required], textarea[required]');
// requiredElements.forEach(function(element) {
//   var label = element.closest('.form-group').querySelector('label');
//   if (label) {
//     label.classList.add('required');
//   }
// });

// // Custom Data Table
// var customDataTable = document.querySelector('.custom-data-table');
// if (customDataTable) {
//   customDataTable.closest('.card').querySelector('.card-body').style.paddingTop = '0px';
//   var trElements = customDataTable.querySelectorAll('tbody tr');
//   document.addEventListener('input', function(event) {
//     if (event.target.getAttribute('name') === 'search_table') {
//       var search = event.target.value.toUpperCase();
//       var match = Array.from(trElements).filter(function(elem) {
//         return elem.textContent.trim().toUpperCase().indexOf(search) >= 0 ? elem : null;
//       }).sort();
//       var tableContent = customDataTable.querySelector('tbody');
//       if (match.length === 0) {
//         tableContent.innerHTML = '<tr><td colspan="100%" class="text-center">Data Not Found</td></tr>';
//       } else {
//         tableContent.innerHTML = '';
//         match.forEach(function(row) {
//           tableContent.appendChild(row);
//         });
//       }
//     }
//   });
// }

// // Add class to pagination container
// var paginationNav = document.querySelector('.pagination').closest('nav');
// if (paginationNav) {
//   paginationNav.classList.add('d-flex', 'justify-content-end');
// }

// // Event listener for show filter button
// var showFilterBtn = document.querySelector('.showFilterBtn');
// if (showFilterBtn) {
//   showFilterBtn.addEventListener('click', function() {
//     var filterCard = document.querySelector('.responsive-filter-card');
//     if (filterCard) {
//       filterCard.style.display = filterCard.style.display === 'none' ? 'block' : 'none';
//     }
//   });
// }

// Event listener for short codes
document.addEventListener('click', function(event) {
  if (event.target.classList.contains('short-codes')) {
    var text = event.target.textContent;
    var vInput = document.createElement("input");
    vInput.value = text;
    document.body.appendChild(vInput);
    vInput.select();
    document.execCommand("copy");
    document.body.removeChild(vInput);
    event.target.classList.add('copied');
    setTimeout(function() {
      event.target.classList.remove('copied');
    }, 1000);
  }
});



// // Adding data-label attribute to table cells based on table headers
// document.querySelectorAll('table').forEach(function(table) {
//     var heading = table.querySelectorAll('thead tr th');
//     table.querySelectorAll('tbody tr').forEach(function(row) {
//       Array.from(row.querySelectorAll('td')).forEach(function(column, i) {
//         column.setAttribute('data-label', heading[i].innerText);
//       });
//     });
//   });
  
//   var len = 0;
//   var clickLink = 0;
//   var search = null;
//   var process = false;
  
//   // Handling keyboard input on search input
//   document.getElementById('searchInput').addEventListener('keydown', function(e) {
//     var length = document.querySelectorAll('.search-list li').length;
    
//     if (search !== this.value && process) {
//       len = 0;
//       clickLink = 0;
//       document.querySelectorAll('.search-list li')[len].querySelector('a').focus();
//       document.getElementById('searchInput').focus();
//     }
    
//     // Down arrow key
//     if (e.keyCode === 40 && length) {
//       process = true;
//       if (len < clickLink && clickLink < length) {
//         len += 2;
//       }
//       document.querySelectorAll('.search-list li.bg--dark').forEach(function(item) {
//         item.classList.remove('bg--dark');
//       });
//       document.querySelectorAll('.search-list li a.text--white').forEach(function(item) {
//         item.classList.remove('text--white');
//       });
//       document.querySelectorAll('.search-list li')[len].querySelector('a').focus();
//       document.querySelectorAll('.search-list li')[len].classList.add('bg--dark');
//       document.getElementById('searchInput').focus();
//       clickLink = len;
//       if (!document.querySelectorAll(`.search-list li:eq(${clickLink}) a`).length) {
//         document.querySelectorAll(`.search-list li:eq(${len})`).classList.add('text--white');
//       }
//       len += 1;
//       if (length === Math.abs(clickLink)) {
//         len = 0;
//       }
//     }
    
//     // Up arrow key
//     else if (e.keyCode === 38 && length) {
//       process = true;
//       if (len > clickLink && len !== 0) {
//         len -= 2;
//       }
//       document.querySelectorAll('.search-list li.bg--dark').forEach(function(item) {
//         item.classList.remove('bg--dark');
//       });
//       document.querySelectorAll('.search-list li a.text--white').forEach(function(item) {
//         item.classList.remove('text--white');
//       });
//       document.querySelectorAll('.search-list li')[len].querySelector('a').focus();
//       document.querySelectorAll('.search-list li')[len].classList.add('bg--dark');
//       document.getElementById('searchInput').focus();
//       clickLink = len;
//       if (!document.querySelectorAll(`.search-list li:eq(${clickLink}) a`).length) {
//         document.querySelectorAll(`.search-list li:eq(${len})`).classList.add('text--white');
//       }
//       len -= 1;
//       if (length === Math.abs(clickLink)) {
//         len = 0;
//       }
//     }
    
//     // Enter key
//     else if (e.keyCode === 13) {
//       e.preventDefault();
//       if (document.querySelectorAll(`.search-list li:eq(${clickLink}) a`).length && process) {
//         document.querySelectorAll(`.search-list li:eq(${clickLink}) a`)[0].click();
//       }
//     }
    
//     // Backspace key
//     else if (e.keyCode === 8) {
//       len = 0;
//       clickLink = 0;
//       document.querySelectorAll('.search-list li')[len].querySelector('a').focus();
//       document.getElementById('searchInput').focus();
//     }
    
//     search = this.value;
//   });
  