const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("job-search");
const locationInput = document.getElementById("location");

const resultsSection = document.getElementById("results-section");
const resultsContainer = document.getElementById("results-container");
const resultsSummary = document.getElementById("results-summary");


// ==================================================
// SEEK THE MASTER — EXPERIMENT V0.4
// ==================================================
//
// Major change:
//
// A business can now have multiple vehicle-specific
// evidence profiles.
//
// Example:
//
// Dale's Auto Service
//   -> Infiniti profile
//   -> Porsche profile
//
// Evidence from one profile is NEVER automatically
// used to support another.
//
// ==================================================


// --------------------------------------------------
// BUSINESS DATABASE
// --------------------------------------------------

const businesses = [

  // ==================================================
  // NEXUS AUTO GROUP
  // ==================================================

  {
    id: "nexus-auto-group",

    name: "Nexus Auto Group",

    location: "Surrey, BC",

    category: "European Auto Repair",

    profiles: {

      porsche: {

        models: [
          "cayenne"
        ],

        jobs: [
          "water pump",
          "cooling system",
          "thermostat",
          "radiator",
          "engine repair",
          "diagnostics"
        ],

        baseScore: 97,

        evidenceStrength: "High",

        evidence: [
          "Porsche-specific repair information",
          "Cayenne specifically listed",
          "Water pumps specifically listed",
          "Cooling-system repair specifically listed",
          "Located in Surrey"
        ],

        why:
          "Nexus publishes Porsche-specific repair information, identifies the Cayenne, and specifically lists cooling-system work including water pumps, thermostats and radiators.",

        source:
          "https://nexusautogroup.ca/porsche-repair-service"
      }

    },

    website:
      "https://nexusautogroup.ca/"
  },


  // ==================================================
  // TURN3 AUTOSPORT
  // ==================================================

  {
    id: "turn3-autosport",

    name: "Turn3 Autosport",

    location: "Langley, BC",

    category: "Porsche Specialist",

    profiles: {

      porsche: {

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

        baseScore: 93,

        evidenceStrength: "High",

        evidence: [
          "Dedicated Porsche specialist",
          "Porsche-specific repair services",
          "Cayenne-related services published",
          "Porsche maintenance expertise",
          "Porsche diagnostic equipment"
        ],

        why:
          "Turn3 focuses heavily on Porsche repair and maintenance and provides Porsche-specific service capabilities rather than general European-only experience.",

        source:
          "https://turn3autosport.com/porsche-service-repair/"
      }

    },

    website:
      "https://turn3autosport.com/"
  },


  // ==================================================
  // DALE'S AUTO SERVICE
  // ==================================================

  {
    id: "dales-auto",

    name: "Dale's Auto Service",

    location: "Surrey, BC",

    category: "Independent Auto Repair",

    profiles: {

      // ----------------------------------------------
      // INFINITI PROFILE
      // ----------------------------------------------

      infiniti: {

        models: [
          "g",
          "g37",
          "q50",
          "q60",
          "qx50",
          "qx60",
          "fx35"
        ],

        jobs: [
          "diagnostics",
          "engine repair",
          "brakes",
          "suspension",
          "steering",
          "transmission",
          "maintenance",
          "cooling system"
        ],

        baseScore: 96,

        evidenceStrength: "High",

        evidence: [
          "Dedicated Infiniti service information",
          "G37 specifically identified",
          "Engine diagnostics",
          "Suspension and steering service",
          "Transmission repair",
          "Cooling-system service",
          "Located in Surrey"
        ],

        why:
          "Dale's publishes dedicated Infiniti service information and specifically identifies the G37. Its Infiniti services include diagnostics, suspension, steering, transmission and cooling-system work.",

        source:
          "https://dalesauto.ca/infiniti-service-repair-surrey/"
      },


      // ----------------------------------------------
      // PORSCHE PROFILE
      // ----------------------------------------------

      porsche: {

        models: [
          "cayenne",
          "911",
          "macan",
          "panamera",
          "cayman",
          "boxster"
        ],

        jobs: [
          "diagnostics",
          "brakes",
          "suspension",
          "steering",
          "maintenance",
          "cooling system",
          "engine repair",
          "transmission"
        ],

        baseScore: 87,

        evidenceStrength: "Medium-High",

        evidence: [
          "Dedicated Porsche service information",
          "Cayenne specifically identified",
          "Porsche diagnostics",
          "Porsche brake service",
          "General cooling-system repair capability",
          "Located in Surrey"
        ],

        why:
          "Dale's publishes Porsche-specific service information and identifies the Cayenne among the Porsche models it services. Its broader shop capabilities also include cooling-system repairs and diagnostics.",

        source:
          "https://dalesauto.ca/porsche-service-repair-vancouver/"
      }

    },

    website:
      "https://dalesauto.ca/"
  },


  // ==================================================
  // NORLANG AUTOMOTIVE
  // ==================================================

  {
    id: "norlang-auto",

    name: "Norlang Automotive",

    location: "Langley, BC",

    category: "Independent Auto Repair",

    profiles: {

      // ----------------------------------------------
      // INFINITI PROFILE
      // ----------------------------------------------

      infiniti: {

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

        baseScore: 89,

        evidenceStrength: "Medium-High",

        evidence: [
          "Infiniti listed among supported import makes",
          "G-series experience previously identified",
          "Cooling-system repair",
          "Diagnostics",
          "Steering and suspension",
          "Transmission and drivetrain",
          "Located in Langley"
        ],

        why:
          "Norlang services Infiniti vehicles and publishes relevant capabilities including cooling-system repairs, diagnostics, steering and suspension, engine repair and drivetrain service.",

        source:
          "https://norlangauto.ca/services/"
      },


      // ----------------------------------------------
      // PORSCHE PROFILE
      // ----------------------------------------------

      porsche: {

        models: [
          "cayenne"
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

        baseScore: 84,

        evidenceStrength: "Medium",

        evidence: [
          "Porsche listed among supported European makes",
          "Dedicated European repair division",
          "Cooling-system repairs",
          "Diagnostics",
          "Steering and suspension",
          "Transmission and drivetrain"
        ],

        why:
          "Norlang has a dedicated European repair division and explicitly includes Porsche among the European vehicles it services. Its published shop capabilities include cooling-system, diagnostic and drivetrain work.",

        source:
          "https://norlangauto.ca/euro-fix/"
      }

    },

    website:
      "https://norlangauto.ca/"
  }

];


// --------------------------------------------------
// UNDERSTAND SEARCH
// --------------------------------------------------

function understandSearch(query) {

  const text = query.toLowerCase();

  const search = {

    make: null,

    model: null,

    job: null,

    unsupportedMake: null

  };


  // ==================================================
  // SUPPORTED MAKES
  // ==================================================

  if (text.includes("porsche")) {

    search.make = "porsche";

  }


  if (text.includes("infiniti")) {

    search.make = "infiniti";

  }


  // ==================================================
  // MODELS CAN IMPLY MAKE
  // ==================================================

  if (text.includes("cayenne")) {

    search.make = "porsche";

    search.model = "cayenne";

  }


  if (text.includes("g37")) {

    search.make = "infiniti";

    search.model = "g37";

  }


  // ==================================================
  // OTHER PORSCHE MODELS
  // ==================================================

  if (text.includes("macan")) {

    search.make = "porsche";

    search.model = "macan";

  }


  if (text.includes("panamera")) {

    search.make = "porsche";

    search.model = "panamera";

  }


  if (text.includes("boxster")) {

    search.make = "porsche";

    search.model = "boxster";

  }


  if (text.includes("cayman")) {

    search.make = "porsche";

    search.model = "cayman";

  }


  // ==================================================
  // OTHER INFINITI MODELS
  // ==================================================

  if (text.includes("q50")) {

    search.make = "infiniti";

    search.model = "q50";

  }


  if (text.includes("q60")) {

    search.make = "infiniti";

    search.model = "q60";

  }


  if (text.includes("qx60")) {

    search.make = "infiniti";

    search.model = "qx60";

  }


  // ==================================================
  // UNSUPPORTED MAKES
  // ==================================================

  const unsupportedMakes = [

    "bmw",

    "audi",

    "mercedes",

    "mercedes-benz",

    "lexus",

    "acura",

    "honda",

    "toyota",

    "nissan",

    "ford",

    "chevrolet",

    "chevy",

    "subaru",

    "volkswagen",

    "volvo",

    "mazda",

    "hyundai",

    "kia",

    "tesla",

    "jeep",

    "dodge",

    "ram",

    "cadillac",

    "buick",

    "gmc",

    "mini",

    "jaguar",

    "land rover",

    "range rover"

  ];


  if (!search.make) {

    for (const make of unsupportedMakes) {

      if (text.includes(make)) {

        search.unsupportedMake = make;

        break;

      }

    }

  }


  // ==================================================
  // JOB / PROBLEM
  // ==================================================

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
    text.includes("losing coolant") ||
    text.includes("coolant leak")
  ) {

    search.job = "cooling system";

  }


  else if (
    text.includes("radiator") ||
    text.includes("thermostat") ||
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
    text.includes("steering")
  ) {

    search.job = "steering";

  }


  else if (
    text.includes("transmission") ||
    text.includes("gearbox")
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
    text.includes("warning light") ||
    text.includes("engine light")
  ) {

    search.job = "diagnostics";

  }


  else if (
    text.includes("engine")
  ) {

    search.job = "engine repair";

  }


  else if (
    text.includes("maintenance") ||
    text.includes("service") ||
    text.includes("oil change")
  ) {

    search.job = "maintenance";

  }


  return search;

}


// --------------------------------------------------
// GET CORRECT BUSINESS PROFILE
// --------------------------------------------------

function getBusinessProfile(
  business,
  make
) {

  if (!make) {

    return null;

  }


  if (!business.profiles[make]) {

    return null;

  }


  return business.profiles[make];

}


// --------------------------------------------------
// SCORE PROFILE
// --------------------------------------------------

function calculateScore(
  business,
  profile,
  search
) {

  let score =
    profile.baseScore;


  // ==================================================
  // MODEL
  // ==================================================

  if (search.model) {

    if (
      profile.models.includes(
        search.model
      )
    ) {

      score += 3;

    }


    else if (
      search.model === "g37" &&
      profile.models.includes("g")
    ) {

      score += 1;

    }


    else {

      score -= 8;

    }

  }


  // ==================================================
  // JOB
  // ==================================================

  if (search.job) {

    if (
      profile.jobs.includes(
        search.job
      )
    ) {

      score += 3;

    }

    else {

      score -= 12;

    }

  }


  return score;

}


// --------------------------------------------------
// MATCH LABEL
// --------------------------------------------------

function getMatchLabel(score) {

  if (score >= 96) {

    return "Excellent match";

  }


  if (score >= 88) {

    return "Strong match";

  }


  if (score >= 78) {

    return "Possible match";

  }


  return "Limited evidence";

}


// --------------------------------------------------
// FRIENDLY MAKE NAME
// --------------------------------------------------

function formatMakeName(make) {

  if (!make) {

    return "";

  }


  const names = {

    bmw: "BMW",

    gmc: "GMC",

    ram: "RAM",

    mini: "MINI",

    "mercedes-benz":
      "Mercedes-Benz"

  };


  if (names[make]) {

    return names[make];

  }


  return (
    make.charAt(0).toUpperCase() +
    make.slice(1)
  );

}


// --------------------------------------------------
// FORMAT SEARCH INTERPRETATION
// --------------------------------------------------

function formatUnderstood(
  search,
  location
) {

  const items = [];


  if (search.make) {

    items.push(
      formatMakeName(
        search.make
      )
    );

  }


  if (search.model) {

    items.push(
      search.model.toUpperCase()
    );

  }


  if (search.job) {

    items.push(
      search.job
        .charAt(0)
        .toUpperCase() +
      search.job.slice(1)
    );

  }


  if (location) {

    items.push(location);

  }


  if (items.length === 0) {

    return (
      "We couldn't confidently identify the vehicle or job."
    );

  }


  return items.join(" · ");

}


// --------------------------------------------------
// SEARCH
// --------------------------------------------------

function performSearch() {

  const query =
    searchInput.value.trim();


  const location =
    locationInput.value.trim();


  if (!query) {

    searchInput.focus();

    return;

  }


  const understood =
    understandSearch(query);


  let results = [];


  // ==================================================
  // SUPPORTED MAKE
  // ==================================================

  if (understood.make) {

    businesses.forEach(
      business => {

        const profile =
          getBusinessProfile(
            business,
            understood.make
          );


        if (!profile) {

          return;

        }


        const score =
          calculateScore(
            business,
            profile,
            understood
          );


        results.push({

          id:
            business.id,

          name:
            business.name,

          location:
            business.location,

          category:
            business.category,

          website:
            business.website,

          profile,

          score,

          matchLabel:
            getMatchLabel(score)

        });

      }
    );


    results.sort(
      (a, b) =>
        b.score - a.score
    );

  }


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

      make:
        understood.make,

      model:
        understood.model,

      job:
        understood.job,

      unsupportedMake:
        understood.unsupportedMake

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


  // ==================================================
  // UNSUPPORTED MAKE
  // ==================================================

  if (
    understood.unsupportedMake &&
    !understood.make
  ) {

    const makeName =
      formatMakeName(
        understood.unsupportedMake
      );


    resultsSummary.textContent =
      "No evidence-backed matches yet";


    resultsContainer.innerHTML = `

      <div class="result-card">

        <div
          style="
            font-size:12px;
            color:#686868;
            text-transform:uppercase;
            letter-spacing:1px;
            font-weight:700;
            margin-bottom:6px;
          "
        >

          We understood

        </div>


        <div
          style="
            font-size:18px;
            font-weight:700;
          "
        >

          ${makeName}

          ${
            understood.job

              ? ` · ${
                  understood.job
                    .charAt(0)
                    .toUpperCase() +
                  understood.job.slice(1)
                }`

              : ""
          }

          ${
            location

              ? ` · ${location}`

              : ""
          }

        </div>

      </div>


      <div class="result-card">

        <h3>

          We're not ready to recommend a
          ${makeName} shop yet.

        </h3>


        <div class="why">

          <strong>

            We don't want to guess.

          </strong>


          <p>

            Seek The Master has not yet
            researched enough ${makeName}
            businesses to confidently
            recommend one for this job.

          </p>

        </div>

      </div>

    `;


    showResults();

    return;

  }


  // ==================================================
  // NO VEHICLE IDENTIFIED
  // ==================================================

  if (!understood.make) {

    resultsSummary.textContent =
      "We need more information";


    resultsContainer.innerHTML = `

      <div class="result-card">

        <h3>

          What vehicle is this for?

        </h3>


        <div class="why">

          <strong>

            We could identify the job,
            but not the vehicle.

          </strong>


          <p>

            Include the make and model
            if you know it.

            For example:
            "My 2011 Infiniti G37 is
            overheating."

          </p>

        </div>

      </div>

    `;


    showResults();

    return;

  }


  // ==================================================
  // WHAT WE UNDERSTOOD
  // ==================================================

  const understoodText =
    formatUnderstood(
      understood,
      location
    );


  resultsContainer.innerHTML = `

    <div class="result-card">

      <div
        style="
          font-size:12px;
          color:#686868;
          text-transform:uppercase;
          letter-spacing:1px;
          font-weight:700;
          margin-bottom:6px;
        "
      >

        We understood

      </div>


      <div
        style="
          font-size:18px;
          font-weight:700;
        "
      >

        ${understoodText}

      </div>

    </div>

  `;


  // ==================================================
  // NO RESULTS
  // ==================================================

  if (results.length === 0) {

    resultsSummary.textContent =
      "No evidence-backed matches yet";


    resultsContainer.innerHTML += `

      <div class="result-card">

        <h3>

          We don't have enough
          evidence yet.

        </h3>


        <div class="why">

          <strong>

            We found the vehicle,
            but don't yet have a
            researched business profile.

          </strong>


          <p>

            Seek The Master only
            recommends businesses when
            there is enough evidence
            to support the match.

          </p>

        </div>

      </div>

    `;


    showResults();

    return;

  }


  resultsSummary.textContent =
    `${results.length} evidence-backed matches${
      location
        ? ` near ${location}`
        : ""
    }`;


  // ==================================================
  // RESULT CARDS
  // ==================================================

  results.forEach(
    result => {

      const profile =
        result.profile;


      const card =
        document.createElement(
          "div"
        );


      card.className =
        "result-card";


      card.innerHTML = `

        <div class="result-top">

          <div>

            <h3>

              ${result.name}

            </h3>


            <div class="business-location">

              ${result.location}

              ·

              ${result.category}

            </div>

          </div>


          <div class="match-score">

            <div
              style="
                font-size:18px;
                font-weight:800;
              "
            >

              ${result.matchLabel}

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

            ${profile.why}

          </p>

        </div>


        <div
          style="
            margin-top:20px;
            font-size:13px;
            font-weight:700;
          "
        >

          Evidence we found

        </div>


        <div class="evidence">

          ${profile.evidence
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

            ${profile.evidenceStrength}

          </strong>

        </div>


        <div class="result-actions">

          <a
            href="${result.website}"
            target="_blank"
            rel="noopener noreferrer"
            onclick="
              trackBusinessClick(
                '${result.name}'
              )
            "
          >

            Visit business

          </a>


          <a
            href="${profile.source}"
            target="_blank"
            rel="noopener noreferrer"
            style="margin-left:8px;"
          >

            See evidence

          </a>

        </div>

      `;


      resultsContainer.appendChild(
        card
      );

    });


  showResults();

}


// --------------------------------------------------
// SHOW RESULTS
// --------------------------------------------------

function showResults() {

  resultsSection.classList.remove(
    "hidden"
  );


  resultsSection.scrollIntoView({

    behavior: "smooth"

  });

}


// --------------------------------------------------
// EXAMPLE BUTTONS
// --------------------------------------------------

document
  .querySelectorAll(
    ".example-button"
  )
  .forEach(
    button => {

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

    }
  );


// --------------------------------------------------
// SEARCH BUTTON
// --------------------------------------------------

searchButton.addEventListener(

  "click",

  performSearch

);


// --------------------------------------------------
// ENTER TO SEARCH
// --------------------------------------------------

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
// ANALYTICS PLACEHOLDER
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

      business:
        businessName

    }

  );

}


// --------------------------------------------------
// RESTORE LAST SEARCH
// --------------------------------------------------

const savedSearch =
  localStorage.getItem(
    "lastSearch"
  );


if (savedSearch) {

  try {

    const previous =
      JSON.parse(
        savedSearch
      );


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
