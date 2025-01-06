// G
// CODE According to specification
function click_filter_element(event) {
  /*
    ARGUMENTS
      event: event-object created when user clicks on one of the filter elements.

    SIDE-EFFECTS
      Marks the clicked filter element as selected / unselected.
      Since a filter element will have changed after the click, the list of
      programmes must be updated.

      Attention VG
        Careful with the propagation of the click-event

    NO RETURN VALUE

  */
  
  event.target.classList.toggle("selected");
  update_programmes();
}

// G
// CODE according to specification
function create_filter_element(data) {
  /*
    ARGUMENTS
      data: object that contains the following keys:
        class (string): a class-name given to the created element
        textContent (string): the text that the element contains
        parent (reference to HTML-element): the HTML-element that is the parent of the created element

      No control of arguments.

    SIDE-EFFECTS
      1. Creates a new dom-element with the tag "li".
      2. Gives the new dom-element the class contained in data.class
      3. Appends the new dom-element to the element referenced in data.parent
      4. Sets the text content of the new dom-element to data.textContent
      5. Sets the function click_filter_element as a listener to "click" for the new dom-element

    RETURN VALUE
      Returns a reference to the new dom-element
  */

  const li = document.createElement("li");
  li.classList.add(data.class);
  data.parent.appendChild(li);
  li.textContent = data.textContent;
  li.addEventListener("click", click_filter_element);

  return li;
}

// VG
// CODE according to specification
function add_group_toggling(filter_container_dom) {
  /*
    ARGUMENT
      filter_container_dom: reference to a HTML-element that contains a set of fliter_elements
            Exempel: the <ul> that contains the filters for Language.

    SIDE EFFECTS
      The function makes sure that when the user clicks on filter_container_dom, all the
      filter_elements that it contains are selected / unselected.
      Since some filter elements will have changed after the click, the list of
      programmes must be updated.

    NO RETURN VALUE

  */
}

// VG
// CODE according to specifications
function toggle_cities(event) {
  /*

    ARGUMENTS
      This function does not take any arguments

    SIDE EFFECTS
      This function checks the state of the first city-filter-element (Madrid).
      If it is selected then it de-selects ALL city-filter-elements
      If it is de-selected then it selects ALL city-filter-elements 

    NO RETURN VALUE

  */
}

// WRITE SPECIFICATION
// ATTENTION: You need to write the specification of all three functions:
//            create_countries_cities_filters, create_country and create_city

/*
Argument:
  Does not take any argument.

Side-effects:
  Creates country list-item and the filter elements for the cities.

Return value: No return value
*/
function create_countries_cities_filters() {

  /* 
  Argument:
    Takes an object as an argument.

  Side-effects:
    Creates a filter option for the country provided as argument and then creates a filter option for all the cities within that country using the keys id and name.

  Return value:
    Does not return anything.
  */
  function create_country(country) {
    const dom = document.createElement("div");
    dom.classList.add("country");
    dom.classList.add("filter_container");
    dom.id = "country_" + country.id;
    document.querySelector("#country_filter > ul").append(dom);

    dom.innerHTML = `
      <h1>${country.name}</h1>
      <ul class="filter_list"></ul>
    `;

    const cities = array_filter(CITIES, test_function);
    function test_function(city) {
      return city.countryID === country.id;
    }

    array_each(cities, create_city);
  }

  /* 
  Argument: Takes an object as an argument

  Side effect: Creates a filter element for the city based on the keys countryID, name and id.

  Return value: No return value
  */
  function create_city(city) {
    const dom = create_filter_element({
      parent: document.querySelector(`#country_${city.countryID} > ul`),
      class: "selected",
      textContent: city.name,
    });
    dom.dataset.id = city.id;
  }

  array_each(COUNTRIES, create_country);
}


function universal_filter_creator(parent) {

  function create_filter_merge(data) {
    const dom = create_filter_element({
      parent: document.querySelector(`#${parent}_filter > ul`),
      class: "selected",
      textContent: data.name
    });
    dom.dataset.id = data.id;
  }

  let correct_array;

  if (parent === "level") correct_array = LEVELS;
  else if (parent === "subject") correct_array = SUBJECTS;
  else if (parent === "language") correct_array = LANGUAGES;

  array_each(correct_array, create_filter_merge);

}

// G / VG (see details in specification)
// CODE according to specifications
function create_programme(programme) {
  /*

    ARGUMENT
      programme (object): One of the objects from PROGRAMMES

    SIDE-EFFECTS
      This function creates the HTML-element that contains all the information
      about one programme, as seen in the video / image.
      
      VG: The background image is a random image from among the images of the city
          in which the programme is (via the university)
      G:  No background image required.


      VG: The "see more" interaction must be included.
      G:  The "see more" element is not required. And that information needs not be in place.

    NO RETURN VALUE

  */

  const parent = document.querySelector("#programmes > ul");

  const container = document.createElement("div");
  container.className = "programme";
  parent.appendChild(container);

  //Language
  function match_languageId(language) {
    return language.id === programme.languageID;
  }
  programme_language = array_find(LANGUAGES, match_languageId).name;

  //University
  function match_university(city) {
    return city.id === programme.universityID;
  }
  programme_university = array_find(UNIVERSITIES, match_university).name;

  //Levels
  function match_levelsId(level) {
    return level.id === programme.levelID;
  }
  programme_level = array_find(LEVELS, match_levelsId).name;

  //Subject
  function match_subject(subject) {
    return subject.id === programme.subjectID;
  }
  programme_subject = array_find(SUBJECTS, match_subject).name;

  //Programmes
  function match_programmesID (programme) {
    return programme.id === programme.id;
  }
  programme_programme = array_find(PROGRAMMES,match_programmesID).name;

  container.innerHTML = `
      <div>
        <p>${programme_university}</p>
        <p>${programme_language}</p>
        <p>${programme_level}</p>
        <p>${programme_subject}</p>
        <p>${programme_programme}</p>
      </div>
    `;
}

// G
// CODE according to the specification
function update_programmes() {
  /*
      NO ARGUMENTS

      SIDE EFFECTS
        This function updates the programmes shown on the page according to
        the current filter status (which filter elements are selected / unselected).
        It uses the function read_filters to know which programmes need to be included.

        VG: The top images (header) need to be updated here

      NO RETURN VALUE

  */
      filteredProgrammes = read_filters(); //Deklarerar en variabel som innehåller en array som read_filters har returnerat
      const programmesContainer = document.getElementById("programmes"); //hämtar 
      const emptyPrograms = programmesContainer.querySelector("p");
      const programmesUl = programmesContainer.querySelector("ul");  
      
      programmesUl.innerHTML = "";
      
      if (filteredProgrammes.length !== 0) {
        emptyPrograms.style.display = "none";
        array_each(filteredProgrammes, create_programme); // Array_each skickar varje element i arrayen som argument för funktionen man skickar med. I vårt fall är funktionen "create_programme"!
      } else {
        emptyPrograms.style.display = "block";
      }
}

// G
// WRITE SPECIFICATION
// You must understand how this function works. There will be questions about it
// in the code review (kodredovisning)

// Optional VG: Which parts of the function's code could be abstracted?
// Implement it

  /* 
  Argument: No arguments 

  Side effect: Gets selected filters from the DOM and filters the list of programmes based on city, level, language, subject, and search input

  Return value: Returns a list of programmes that match the selected filters and search input

  */

function read_filters() {
  const city_selected_dom = document.querySelectorAll(
    "#country_filter li.selected"
  );

  const city_id_selected = [];
  function callback_add_cityID(dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    city_id_selected.push(id_as_integer);
  }
  array_each(city_selected_dom, callback_add_cityID);

  const universities = [];
  for (let i = 0; i < city_id_selected.length; i++) {
    const city_id = city_id_selected[i];
    for (let ii = 0; ii < UNIVERSITIES.length; ii++) {
      const university = UNIVERSITIES[ii];
      if (university.cityID === city_id) {
        universities.push(university);
      }
    }
  }

  let programmes = [];
  function callback_add_programmes(university) {
    const university_id = university.id;
    for (let i = 0; i < PROGRAMMES.length; i++) {
      const programme = PROGRAMMES[i];
      if (programme.universityID === university_id) {
        programmes.push(programme);
      }
    }
  }
  array_each(universities, callback_add_programmes);

  const level_selected_dom = document.querySelectorAll(
    "#level_filter li.selected"
  );
  const level_id_selected = [];
  function callback_add_levelID(dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    level_id_selected.push(id_as_integer);
  }
  array_each(level_selected_dom, callback_add_levelID);

  function test_function_level(programme) {
    return level_id_selected.includes(programme.levelID);
  }
  programmes = array_filter(programmes, test_function_level);

  const language_selected_dom = document.querySelectorAll(
    "#language_filter li.selected"
  );
  const language_id_selected = [];
  function callback_add_languageID(dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    language_id_selected.push(id_as_integer);
  }
  array_each(language_selected_dom, callback_add_languageID);

  function test_function_language(programme) {
    return language_id_selected.includes(programme.languageID);
  }
  programmes = array_filter(programmes, test_function_language);

  const subject_selected_dom = document.querySelectorAll(
    "#subject_filter li.selected"
  );
  const subject_id_selected = [];
  function callback_add_subjectID(dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    subject_id_selected.push(id_as_integer);
  }
  array_each(subject_selected_dom, callback_add_subjectID);

  function test_function_subject(programme) {
    return subject_id_selected.includes(programme.subjectID);
  }
  programmes = array_filter(programmes, test_function_subject);

  const search_string = document.querySelector("#search_field input").value;
  if (search_string !== "") {
    function test_function(programme) {
      return programme.name.includes(search_string);
    }
    programmes = array_filter(programmes, test_function);
  }

  return programmes;
}
