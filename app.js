const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("job-search");
const locationInput = document.getElementById("location");

const resultsSection = document.getElementById("results-section");
const resultsContainer = document.getElementById("results-container");
const resultsSummary = document.getElementById("results-summary");


// ==================================================
// SEEK THE MASTER — EXPERIMENT V0.2.1
// ==================================================
//
// Real businesses.
// Match scores are prototype scores based on the
// specificity and strength of evidence currently found.
//
// The score is NOT a customer review score.
// It represents how strongly the available evidence
// matches the specific job being searched.
//
// ==================================================


// --------------------------------------------------
// BUSINESS DATABASE
// --------------------------------------------------

const businesses = [

  // =========================
  // PORSCHE
  // =========================

  {
    id: "nexus-auto-group",
    name: "Nexus Auto Group",
    location: "Surrey, BC",
    category: "European Auto Repair",

    makes: ["porsche"],
    models: ["cayenne"],
    jobs: [
      "water pump",
      "cooling system",
      "coolant leak",
      "thermostat",
      "radiator",
      "engine repair",
      "diagnostics"
    ],

    baseMatch: 97,

    evidenceStrength: "HIGH",

    evidence: [
      "Porsche specifically listed",
      "Cayenne specifically listed",
      "Water pumps specifically listed",
      "Cooling-system repairs specifically listed",
      "Located in Surrey"
    ],

    why:
      "Very strong match. Nexus specifically publishes Porsche repair services, names the Cayenne, and lists cooling-system work including water pumps, thermostats, radiators and coolant-related repairs.",

    website:
      "https://nexusautogroup.ca/porsche-repair-service",

    source:
      "https://nexusautogroup.ca/porsche-repair-service"
  },


  {
    id: "turn3-autosport",
    name: "Turn3 Autosport",
    location: "Langley, BC",
    category: "Porsche Specialist",

    makes: ["porsche"],
    models: [
      "cayenne",
      "911",
      "macan",
      "boxster",
      "cayman"
    ],

    jobs: [
      "water pump",
      "cooling system",
      "maintenance",
      "engine repair",
      "transmission",
      "brakes",
      "diagnostics"
    ],

    baseMatch: 93,

    evidenceStrength: "HIGH",

    evidence: [
      "Dedicated Porsche specialist",
      "Services Porsche models and years",
      "Cayenne services published",
      "Water pumps discussed in Porsche maintenance material",
      "Porsche-specific diagnostic equipment"
    ],

    why:
      "Strong specialist match. Turn3 focuses heavily on Porsche service and publishes Porsche-specific repair and maintenance information.",

    website:
      "https://turn3autosport.com/porsche-service-repair/",

    source:
      "https://turn3autosport.com/porsche-service-repair/"
  },


  // =========================
  // INFINITI
  // =========================

  {
    id: "dales-auto",
    name: "Dale's Auto Service",
    location: "Surrey, BC",
    category: "Auto Repair",

    makes: ["infiniti"],
    models: [
      "g37",
      "q50",
      "qx60",
      "fx35"
    ],

    jobs: [
      "diagnostics",
      "engine",
      "brakes",
      "suspension",
      "steering",
      "transmission",
      "maintenance",
      "cooling system"
    ],

    baseMatch: 96,

    evidenceStrength: "HIGH",

    evidence: [
      "Infiniti specifically listed",
      "G37 specifically listed",
      "Engine diagnostics",
      "Suspension and steering",
      "Transmission repair",
      "Located in Surrey"
    ],

    why:
      "Very strong match for a G37 owner because Dale's explicitly identifies the Infiniti G37 among the vehicles it services and publishes Infiniti-specific repair services.",

    website:
      "https://dalesauto.ca/infiniti-service-repair-surrey/",

    source:
      "https://dalesauto.ca/infiniti-service-repair-surrey/"
  },


  {
    id: "norlang-auto",
    name: "Norlang Automotive",
    location: "Langley, BC",
    category: "Auto Repair",

    makes: ["infiniti"],
    models: [
      "g",
      "g37",
      "q50",
      "q60",
      "qx50",
      "qx60"
    ],

    jobs: [
      "diagnostics",
      "cooling system",
      "engine repair",
      "brakes",
      "suspension",
      "steering",
      "transmission",
      "maintenance"
    ],

    baseMatch: 89,

    evidenceStrength: "MEDIUM-HIGH",

    evidence: [
      "Infiniti-specific service page",
      "Infiniti G-series specifically mentioned",
      "Diagnostics",
      "Cooling-system repairs",
      "Suspension and steering",
      "Located in Langley"
    ],

    why:
      "Good match. Norlang has a dedicated Infiniti service offering and specifically mentions Infiniti G-series vehicles. Its published services also include diagnostics, cooling systems, engine repairs and suspension work.",

    website:
      "https://norlangauto.ca/infiniti-service/",

    source:
      "https://norlangauto.ca/infiniti-service/"
  }

];


// --------------------------------------------------
// UNDERSTAND THE SEARCH
// --------------------------------------------------

function understandSearch(query) {

  const text = query.toLowerCase();

  const search = {
    make: null,
    model: null,
    job: null
  };


  // MAKE

  if (text.includes("porsche")) {
    search.make = "porsche";
  }

  if (text.includes("infiniti")) {
    search.make = "infiniti";
  }


  // MODEL
  // The model can imply the make.

  if (text.includes("cayenne")) {
    search.model = "cayenne";
    search.make = "porsche";
  }

  if (text.includes("g37")) {
    search.model = "g37";
    search.make = "infiniti";
  }


  // JOB / PROBLEM

  if (
    text.includes("water pump") ||
    text.includes("waterpump")
  ) {
    search.job = "water pump";
  }

  else if (
    text.includes("overheat") ||
    text.includes("overheating") ||
    text.includes("running hot") ||
    text.includes("losing coolant")
  ) {
    search.job = "cooling system";
  }

  else if (
    text.includes("coolant") ||
    text.includes("cooling")
  ) {
    search.job = "cooling system";
  }

  else if (
    text.includes("suspension") ||
    text.includes("shock") ||
    text.includes("shocks") ||
    text.includes("strut") ||
    text.includes("struts")
  ) {
    search.job = "suspension";
  }

  else if (
    text.includes("transmission")
  ) {
    search.job = "transmission";
  }

  else if (
    text.includes("brake") ||
    text.includes("brakes")
  ) {
    search.job = "brakes";
  }

  else if (
    text.includes("diagnostic") ||
    text.includes("check engine") ||
    text.includes("warning light")
  ) {
    search.job = "diagnostics";
  }

  else if (
    text.includes("engine")
  ) {
    search.job = "engine";
  }


  return search;
}


// --------------------------------------------------
// CALCULATE MATCH SCORE
// --------------------------------------------------

function calculateMatch(business, search) {

  let score = business.baseMatch;


  // If we know the make and this shop does not
  // match it, remove the shop completely.

  if (
    search.make &&
    !business.makes.includes(search.make)
  ) {
    return null;
  }


  // Reward exact model evidence.

  if (search.model) {

    if (business.models.includes(search.model)) {
      score += 2;
    }

    else if (
      search.model === "g37" &&
      business.models.includes("g")
    ) {
      score += 1;
    }

    else {
      score -= 7;
    }

  }


  // Reward exact job evidence.

  if (search.job) {

    if (business.jobs.includes(search.job)) {
      score += 1;
    }

    else {
      score -= 8;
    }

  }


  // Keep prototype scores within a reasonable range.

  score = Math.min(score, 99);
  score = Math.max(score, 55);


  return score;
}


// --------------------------------------------------
// PERFORM SEARCH
// --------------------------------------------------

function performSearch() {

  const query = searchInput.value.trim();
  const location = locationInput.value.trim();

  if (!query) {
    searchInput.focus();
    return;
  }


  const understood = understandSearch(query);


  let results = businesses
    .map(business => {

      const score = calculateMatch(
        business,
        understood
      );

      if (score === null) {
        return null;
      }

      return {
        ...business,
        match: score
      };

    })
    .filter(Boolean)
    .sort((a, b) => b.match - a.match);


  displayResults(
    results,
    location,
    understood
  );


  localStorage.setItem(
    "lastSearch",
    JSON.stringify({
      query,
      location
    })
  );


  trackEvent(
    "search",
    {
      query,
      location,
      make: understood.make,
      model: understood.model,
      job: understood.job
    }
  );

}


// --------------------------------------------------
// DISPLAY RESULTS
// --------------------------------------------------

function displayResults(
  results,
  location,
  understood
) {

  resultsContainer.innerHTML = "";


  if (results.length === 0) {

    resultsSummary.textContent =
      "No evidence-backed matches yet";

    resultsContainer.innerHTML = `

      <div class="result-card">

        <h3>
          We don't have enough evidence yet.
        </h3>

        <div class="why">

          <strong>
            This search is outside our current test database.
          </strong>

          <p>
            Seek The Master is currently running a small
            experiment. We only want to recommend businesses
            when we have enough evidence to support the match.
          </p>

        </div>

      </div>

    `;

    resultsSection.classList.remove("hidden");

    resultsSection.scrollIntoView({
      behavior: "smooth"
    });

    return;
  }


  resultsSummary.textContent =
    `${results.length} evidence-backed matches${
      location
        ? ` near ${location}`
        : ""
    }`;


  results.forEach(business => {

    const card = document.createElement("div");

    card.className = "result-card";


    card.innerHTML = `

      <div class="result-top">

        <div>

          <h3>
            ${business.name}
          </h3>

          <div class="business-location">
            ${business.location}
            ·
            ${business.category}
          </div>

        </div>


        <div class="match-score">

          <div class="match-number">
            ${business.match}%
          </div>

          <div class="match-label">
            Job Match
          </div>

        </div>

      </div>


      <div class="why">

        <strong>
          Why this matches your job
        </strong>

        <p>
          ${business.why}
        </p>

      </div>


      <div class="evidence">

        ${business.evidence
          .map(
            item =>
              `<span class="evidence-tag">
                ✓ ${item}
              </span>`
          )
          .join("")}

      </div>


      <div
        style="
          margin-top:18px;
          font-size:12px;
          color:#686868;
        "
      >

        Evidence strength:
        <strong>
          ${business.evidenceStrength}
        </strong>

      </div>


      <div class="result-actions">

        <a
          href="${business.website}"
          target="_blank"
          rel="noopener noreferrer"
          onclick="trackBusinessClick('${business.name}')"
        >
          Visit business
        </a>


        <a
          href="${business.source}"
          target="_blank"
          rel="noopener noreferrer"
          style="margin-left:8px;"
        >
          See evidence
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
// EXAMPLE BUTTONS
// --------------------------------------------------

document
  .querySelectorAll(".example-button")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        searchInput.value =
          button.dataset.search;

        if (!locationInput.value) {
          locationInput.value =
            "Surrey, BC";
        }

        performSearch();

      }
    );

  });


// --------------------------------------------------
// SEARCH BUTTON
// --------------------------------------------------

searchButton.addEventListener(
  "click",
  performSearch
);


// Enter performs search.
// Shift + Enter creates a new line.

searchInput.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {

      event.preventDefault();

      performSearch();

    }

  }
);


// --------------------------------------------------
// ANALYTICS
// --------------------------------------------------

function trackEvent(
  eventName,
  eventData
) {

  console.log(
    "Seek The Master Event:",
    eventName,
    eventData
  );

}


function trackBusinessClick(
  businessName
) {

  trackEvent(
    "business_click",
    {
      business: businessName
    }
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
