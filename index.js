"use strict";



/*

  Notice the images on the page header.

  G: The images can be hard-coded in the CSS (as background-image)
  VG: Every time the user selects / unselects one or more filter elements, the app
      shows three random images from all the possible country images.

*/



// Create Filter Elements
// create_levels_filter();
// create_subjects_filter();
// create_language_filter();
universal_filter_creator("level");
universal_filter_creator("subject");
universal_filter_creator("language");
create_countries_cities_filters();

/* // Create Filter Elements
// create_levels_filter();
// create_subjects_filter();
// create_language_filter();
create_filter_element("level", "vic")
create_filter_element("subject", "vic")
create_filter_element("language", "vic")
create_countries_cities_filters(); */

// Add Interaction of search field button
document.querySelector("#search_field button").addEventListener("click", update_programmes);

// Initialise programmes list by calling relevant function
update_programmes();


// VG
// Add Interaction of filter containers (select-deselect all filters in the container)
// Example: Click anywhere on the language-filter-container and all the language filters
// (spanska, svenska, engelska, franska) will toggle.


// VG
// Add Interaction of button toggle-all-cities

