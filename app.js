const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("job-search");
const locationInput = document.getElementById("location");

const resultsSection = document.getElementById("results-section");
const resultsContainer = document.getElementById("results-container");
const resultsSummary = document.getElementById("results-summary");


// --------------------------------------------------
// DEMO DATA
// --------------------------------------------------
//
// These are fictional businesses for the prototype.
// We will replace this with real businesses + evidence
// once we build the actual research/database system.
//

const demoBusinesses = [
  {
    name: "North Shore European Auto",
    location: "Surrey, BC",
    category: "Automotive",
    match: 96,
    tags: [
      "Porsche",
      "Cayenne",
      "958",
      "4.8L V8",
      "Cooling systems",
      "Water pump"
    ],
    why:
      "Strong match because the business specializes in European vehicles and has specific experience with Porsche Cayenne cooling-system repairs.",
    website: "#"
  },

  {
    name: "Fraser Valley Performance",
    location: "Langley, BC",
    category: "Automotive",
    match: 88,
    tags: [
      "Porsche",
      "European vehicles",
      "Engine repair"
    ],
    why:
      "Good overall match for Porsche mechanical work, although the available evidence is less specific to the Cayenne 958 water pump.",
    website: "#"
  },

  {
    name: "West Coast Auto Specialists",
    location: "Surrey, BC",
    category: "Automotive",
    match: 79,
    tags: [
      "European vehicles",
      "Cooling systems",
      "Mechanical repair"
    ],
    why:
      "The shop performs cooling-system and mechanical repairs, but there is less evidence of Porsche Cayenne-specific experience.",
    website: "#"
  }
];


const demoRoofBusinesses = [
  {
    name: "Fraser Valley Roof Care",
    location: "Surrey, BC",
    category: "Home Services",
    match: 94,
    tags: [
      "Roof cleaning",
      "Moss removal",
      "Soft washing",
      "Residential roofs"
    ],
    why:
      "Strong match because roof cleaning and moss removal are specifically listed among the company's services.",
    website: "#"
  },

  {
    name: "Pacific Exterior Cleaning",
    location: "Langley, BC",
    category: "Home Services",
    match: 86,
    tags: [
      "Pressure washing",
      "Roof cleaning",
      "Exterior cleaning"
    ],
    why:
      "Good match because the business works on exterior surfaces and roofs, including roof cleaning.",
    website: "#"
  },

  {
    name: "Lower Mainland Pressure Washing",
    location: "Surrey, BC",
    category: "Home Services",
    match: 72,
    tags: [
      "Pressure washing",
      "Exterior cleaning"
    ],
    why:
      "The company performs pressure washing, but there is less specific evidence that roof moss removal is a core service.",
    website: "#"
  }
];


// --------------------------------------------------
// SEARCH
// --------------------------------------------------

function performSearch() {

  const query = searchInput.value.trim();
  const location = locationInput.value.trim();

  if (!query) {
    searchInput.focus();
    return;
  }

  const lowerQuery = query.toLowerCase();

  let results;

  if (
    lowerQuery.includes("porsche") ||
    lowerQuery.includes("cayenne") ||
    lowerQuery.includes("water pump")
  ) {
    results = demoBusinesses;
  }

  else if (
    lowerQuery.includes("roof") ||
    lowerQuery.includes("moss") ||
    lowerQuery.includes("pressure wash")
  ) {
    results = demoRoofBusinesses;
  }

  else {
    results = demoBusinesses;
  }

  displayResults(results, location);

  // Save the latest search locally.
  localStorage.setItem(
    "lastSearch",
    JSON.stringify({
      query,
      location
    })
  );

  // Analytics hook.
  // Later this will send the search to Google Analytics.
  console.log("Search performed:", {
    query,
    location
  });
}


// --------------------------------------------------
// DISPLAY RESULTS
// --------------------------------------------------

function displayResults(results, location) {

  resultsContainer.innerHTML = "";

  resultsSummary.textContent =
    `${results.length} potential matches${location ? ` near ${location}` : ""}`;

  results.forEach((business) => {

    const card = document.createElement("div");

    card.className = "result-card";

    card.innerHTML = `
      <div class="result-top">

        <div>
          <h3>${business.name}</h3>

          <div class="business-location">
            ${business.location} · ${business.category}
          </div>
        </div>

        <div class="match-score">
          <div class="match-number">
            ${business.match}%
          </div>

          <div class="match-label">
            Match
          </div>
        </div>

      </div>

      <div class="why">

        <strong>Why we recommend this business</strong>

        <p>
          ${business.why}
        </p>

      </div>

      <div class="evidence">

        ${business.tags
          .map(tag => `<span class="evidence-tag">✓ ${tag}</span>`)
          .join("")}

      </div>

      <div class="result-actions">

        <a
          href="${business.website}"
          onclick="trackBusinessClick('${business.name}')"
        >
          View business
        </a>

      </div>
    `;

    resultsContainer.appendChild(card);
  });


  resultsSection.classList.remove("hidden");

  resultsSection.scrollIntoView({
    behavior: "smooth"
  });
}


// --------------------------------------------------
// EXAMPLE SEARCH BUTTONS
// --------------------------------------------------

document.querySelectorAll(".example-button").forEach(button => {

  button.addEventListener("click", () => {

    searchInput.value =
      button.dataset.search;

    if (!locationInput.value) {
      locationInput.value = "Surrey, BC";
    }

    performSearch();

  });

});


// --------------------------------------------------
// SEARCH BUTTON
// --------------------------------------------------

searchButton.addEventListener(
  "click",
  performSearch
);


// Allow Enter to search.
// Shift + Enter still creates a new line.

searchInput.addEventListener("keydown", event => {

  if (
    event.key === "Enter" &&
    !event.shiftKey
  ) {

    event.preventDefault();

    performSearch();

  }

});


// --------------------------------------------------
// BUSINESS CLICK TRACKING
// --------------------------------------------------

function trackBusinessClick(businessName) {

  console.log(
    "Business clicked:",
    businessName
  );

}


// --------------------------------------------------
// RESTORE LAST SEARCH
// --------------------------------------------------

const savedSearch =
  localStorage.getItem("lastSearch");

if (savedSearch) {

  try {

    const previous =
      JSON.parse(savedSearch);

    searchInput.value =
      previous.query || "";

    locationInput.value =
      previous.location || "";

  }

  catch (error) {

    console.log(
      "Could not restore previous search."
    );

  }

}
