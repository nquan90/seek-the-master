const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("job-search");
const locationInput = document.getElementById("location");

const resultsSection = document.getElementById("results-section");
const resultsContainer = document.getElementById("results-container");
const resultsSummary = document.getElementById("results-summary");


// ==================================================
// SEEK THE MASTER — EXPERIMENT V0.6
// ==================================================
//
// V0.6:
//
// - GA4 event tracking
// - Vertical-aware architecture begins
// - No raw free-text query is sent to analytics
// - Tracks interpreted vehicle/job information
// - Tracks supported vs unsupported searches
// - Tracks business clicks
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

    city: "surrey",

    category: "European Auto Repair",

    vertical: "automotive",

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
          "diagnostics",
          "suspension",
          "steering",
          "brakes",
          "maintenance"
        ],

        baseScore: 94,

        evidenceStrength: "High",

        evidence: [
          "Porsche-specific repair information",
          "Cayenne specifically referenced",
          "Water-pump failures specifically referenced",
          "Cooling-system repairs specifically listed",
          "Cayenne air-suspension work referenced",
          "Porsche-compatible diagnostic equipment",
          "Located in Surrey"
        ],

        why:
          "Nexus publishes unusually specific Porsche repair information. Its material identifies the Cayenne and specifically discusses cooling-system repairs, water pumps, suspension work and Porsche diagnostics.",

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

    city: "langley",

    category: "Porsche Specialist",

    vertical: "automotive",

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
          "diagnostics",
          "suspension",
          "steering"
        ],

        baseScore: 93,

        evidenceStrength: "High",

        evidence: [
          "Dedicated Porsche specialist",
          "Services Porsche models across model years",
          "Porsche-specific diagnostic equipment",
          "Engine and gearbox repair capability",
          "Suspension and steering repair capability",
          "Longstanding Lower Mainland Porsche focus"
        ],

        why:
          "Turn3 is a dedicated Porsche-focused shop rather than a general repair facility. It publishes broad Porsche repair capability including diagnostics, suspension, brakes, engines and gearboxes.",

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

    city: "surrey",

    category: "Independent Auto Repair",

    vertical: "automotive",

    profiles: {

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

        baseScore: 94,

        evidenceStrength: "High",

        evidence: [
          "Dedicated Infiniti service information",
          "G37 specifically identified",
          "Infiniti engine diagnostics",
          "Suspension and steering services",
          "Transmission repair",
          "Cooling-system service",
          "Located in Surrey"
        ],

        why:
          "Dale's publishes dedicated Infiniti service information and specifically identifies the G37. It also lists cooling-system, diagnostic, suspension, steering and transmission services.",

        source:
          "https://dalesauto.ca/infiniti-service-repair-surrey/"
      },


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

        baseScore: 84,

        evidenceStrength: "Medium-High",

        evidence: [
          "Porsche service information",
          "Cayenne identified",
          "Porsche diagnostics",
          "Suspension and steering capability",
          "General cooling-system repair capability",
          "Located in Surrey"
        ],

        why:
          "Dale's has Porsche-specific service coverage and identifies the Cayenne, while its broader published shop capabilities include cooling systems, diagnostics and suspension work.",

        source:
          "https://dalesauto.ca/"
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

    city: "langley",

    category: "Independent Auto Repair",

    vertical: "automotive",

    profiles: {

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

        baseScore: 87,

        evidenceStrength: "Medium-High",

        evidence: [
          "Infiniti service capability",
          "G-series experience",
          "Cooling-system repair",
          "Diagnostics",
          "Steering and suspension",
          "Transmission and drivetrain",
          "Located in Langley"
        ],

        why:
          "Norlang services Infiniti vehicles and publishes relevant capabilities including cooling-system repairs, diagnostics, suspension, steering and drivetrain service.",

        source:
          "https://norlangauto.ca/services/"
      },


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

        baseScore: 81,

        evidenceStrength: "Medium",

        evidence: [
          "Porsche supported through European division",
          "European repair specialization",
          "Cooling-system repairs",
          "Diagnostics",
          "Steering and suspension",
          "Transmission and drivetrain"
        ],

        why:
          "Norlang's European repair operation supports Porsche vehicles and its published capabilities include cooling-system repair, diagnostics, suspension and drivetrain service.",

        source:
          "https://norlangauto.ca/euro-fix/"
      }

    },

    website:
      "https://norlangauto.ca/"
  },


  // ==================================================
  // APPLEWOOD INFINITI
  // ==================================================

  {
    id: "applewood-infiniti",

    name: "Applewood INFINITI Langley",

    location: "Langley, BC",

    city: "langley",

    category: "Authorized Infiniti Dealer",

    vertical: "automotive",

    profiles: {

      infiniti: {

        models: [
          "q50",
          "q60",
          "qx50",
          "qx55",
          "qx60",
          "qx80"
        ],

        jobs: [
          "diagnostics",
          "maintenance",
          "brakes",
          "cooling system",
          "engine repair",
          "transmission"
        ],

        baseScore: 82,

        evidenceStrength: "Medium-High",

        evidence: [
          "Authorized Infiniti dealership",
          "Infiniti service department",
          "Infiniti-trained service capability",
          "Brand-specific diagnostic environment",
          "Located in Langley"
        ],

        why:
          "Applewood provides authorized Infiniti service and brand-specific expertise. However, our current evidence is less specific to the G37 and this exact repair than some independent-shop results.",

        source:
          "https://www.applewoodinfiniti.ca/"
      }

    },

    website:
      "https://www.applewoodinfiniti.ca/"
  },


  // ==================================================
  // WEISSACH
  // ==================================================

  {
    id: "weissach",

    name: "Weissach",

    location: "Vancouver, BC",

    city: "vancouver",

    category: "Independent Porsche Specialist",

    vertical: "automotive",

    profiles: {

      porsche: {

        models: [],

        jobs: [
          "maintenance",
          "brakes",
          "cooling system",
          "transmission",
          "diagnostics"
        ],

        baseScore: 84,

        evidenceStrength: "Medium-High",

        evidence: [
          "Independent Porsche specialist",
          "Porsche sales, parts and service history",
          "Cooling-system maintenance capability",
          "Brake service capability",
          "Transmission service capability",
          "Located in Vancouver"
        ],

        why:
          "Weissach has a long history as an independent Porsche specialist with Porsche service and parts capability. Our current evidence is strong at the brand level but less specific to this exact model and repair.",

        source:
          "https://www.weissach.com/"
      }

    },

    website:
      "https://www.weissach.com/"
  }

];


// --------------------------------------------------
// UNDERSTAND SEARCH
// --------------------------------------------------

function understandSearch(query) {

  const text = query.toLowerCase();

  const search = {

    vertical: null,

    make: null,

    model: null,

    job: null,

    unsupportedMake: null

  };


  // ==================================================
  // AUTOMOTIVE DETECTION
  // ==================================================

  const automotiveTerms = [
    "car",
    "vehicle",
    "mechanic",
    "porsche",
    "infiniti",
    "g37",
    "cayenne",
    "macan",
    "panamera",
    "q50",
    "q60",
    "qx60",
    "engine",
    "brake",
    "transmission",
    "coolant",
    "radiator",
    "suspension"
  ];


  if (
    automotiveTerms.some(
      term => text.includes(term)
    )
  ) {

    search.vertical =
      "automotive";

  }


  // ==================================================
  // SUPPORTED MAKES
  // ==================================================

  if (text.includes("porsche")) {

    search.vertical = "automotive";

    search.make = "porsche";

  }


  if (text.includes("infiniti")) {

    search.vertical = "automotive";

    search.make = "infiniti";

  }


  // ==================================================
  // MODELS THAT IMPLY MAKE
  // ==================================================

  const porscheModels = [
    "cayenne",
    "macan",
    "panamera",
    "boxster",
    "cayman"
  ];


  for (const model of porscheModels) {

    if (text.includes(model)) {

      search.vertical =
        "automotive";

      search.make =
        "porsche";

      search.model =
        model;

    }

  }


  const infinitiModels = [
    "g37",
    "q50",
    "q60",
    "qx50",
    "qx55",
    "qx60",
    "qx80",
    "fx35"
  ];


  for (const model of infinitiModels) {

    if (text.includes(model)) {

      search.vertical =
        "automotive";

      search.make =
        "infiniti";

      search.model =
        model;

    }

  }


  // ==================================================
  // UNSUPPORTED AUTOMOTIVE MAKES
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

        search.vertical =
          "automotive";

        search.unsupportedMake =
          make;

        break;

      }

    }

  }


  // ==================================================
  // AUTOMOTIVE JOB / PROBLEM
  // ==================================================

  if (
    text.includes("water pump") ||
    text.includes("waterpump")
  ) {

    search.vertical =
      "automotive";

    search.job =
      "water pump";

  }


  else if (
    text.includes("overheat") ||
    text.includes("overheating") ||
    text.includes("running hot") ||
    text.includes("losing coolant") ||
    text.includes("coolant leak") ||
    text.includes("radiator") ||
    text.includes("thermostat") ||
    text.includes("coolant") ||
    text.includes("cooling")
  ) {

    search.vertical =
      "automotive";

    search.job =
      "cooling system";

  }


  else if (
    text.includes("suspension") ||
    text.includes("shock") ||
    text.includes("shocks") ||
    text.includes("strut") ||
    text.includes("struts") ||
    text.includes("air suspension")
  ) {

    search.vertical =
      "automotive";

    search.job =
      "suspension";

  }


  else if (
    text.includes("steering")
  ) {

    search.vertical =
      "automotive";

    search.job =
      "steering";

  }


  else if (
    text.includes("transmission") ||
    text.includes("gearbox")
  ) {

    search.vertical =
      "automotive";

    search.job =
      "transmission";

  }


  else if (
    text.includes("brake") ||
    text.includes("brakes")
  ) {

    search.vertical =
      "automotive";

    search.job =
      "brakes";

  }


  else if (
    text.includes("diagnostic") ||
    text.includes("check engine") ||
    text.includes("warning light") ||
    text.includes("engine light") ||
    text.includes("cel")
  ) {

    search.vertical =
      "automotive";

    search.job =
      "diagnostics";

  }


  else if (
    text.includes("engine")
  ) {

    search.vertical =
      "automotive";

    search.job =
      "engine repair";

  }


  else if (
    text.includes("oil change") ||
    text.includes("maintenance")
  ) {

    search.vertical =
      "automotive";

    search.job =
      "maintenance";

  }


  return search;

}


// --------------------------------------------------
// GET BUSINESS PROFILE
// --------------------------------------------------

function getBusinessProfile(
  business,
  make
) {

  if (!make) {

    return null;

  }


  return business.profiles[make] || null;

}


// --------------------------------------------------
// LOCATION SCORE
// --------------------------------------------------

function calculateLocationScore(
  business,
  location
) {

  if (!location) {

    return 0;

  }


  const text =
    location.toLowerCase();


  if (
    text.includes(
      business.city
    )
  ) {

    return 4;

  }


  if (
    (
      text.includes("surrey") &&
      business.city === "langley"
    ) ||

    (
      text.includes("langley") &&
      business.city === "surrey"
    )
  ) {

    return 1;

  }


  return 0;

}


// --------------------------------------------------
// SCORE PROFILE
// --------------------------------------------------

function calculateScore(
  business,
  profile,
  search,
  location
) {

  let score =
    profile.baseScore;


  if (search.model) {

    if (
      profile.models.includes(
        search.model
      )
    ) {

      score += 5;

    }

    else if (
      search.model === "g37" &&
      profile.models.includes("g")
    ) {

      score += 2;

    }

    else {

      score -= 6;

    }

  }


  if (search.job) {

    if (
      profile.jobs.includes(
        search.job
      )
    ) {

      score += 5;

    }

    else {

      score -= 12;

    }

  }


  score +=
    calculateLocationScore(
      business,
      location
    );


  return score;

}


// --------------------------------------------------
// MATCH LABEL
// --------------------------------------------------

function getMatchLabel(score) {

  if (score >= 100) {

    return "Excellent match";

  }


  if (score >= 90) {

    return "Strong match";

  }


  if (score >= 80) {

    return "Possible match";

  }


  return "Limited evidence";

}


// --------------------------------------------------
// FORMAT MAKE
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
// FORMAT SEARCH
// --------------------------------------------------

function formatUnderstood(
  search,
  location
) {

  const items = [];


  if (search.vertical) {

    items.push(
      search.vertical.charAt(0).toUpperCase() +
      search.vertical.slice(1)
    );

  }


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
      search.job.charAt(0).toUpperCase() +
      search.job.slice(1)
    );

  }


  if (location) {

    items.push(location);

  }


  return items.length
    ? items.join(" · ")
    : "We couldn't confidently identify the job.";

}


// --------------------------------------------------
// ANALYTICS
// --------------------------------------------------

function trackEvent(
  eventName,
  eventData = {}
) {

  console.log(
    "Seek The Master Event:",
    eventName,
    eventData
  );


  if (
    typeof window.gtag === "function"
  ) {

    window.gtag(
      "event",
      eventName,
      eventData
    );

  }

}


// --------------------------------------------------
// PERFORM SEARCH
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


  if (
    understood.vertical === "automotive" &&
    understood.make
  ) {

    businesses.forEach(
      business => {

        if (
          business.vertical !==
          "automotive"
        ) {

          return;

        }


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
            understood,
            location
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


  // ==================================================
  // ANALYTICS — SEARCH
  // ==================================================

  trackEvent(
    "stm_search",
    {

      vertical:
        understood.vertical || "unknown",

      vehicle_make:
        understood.make || "unknown",

      vehicle_model:
        understood.model || "unknown",

      job_type:
        understood.job || "unknown",

      search_location:
        location
          ? location.toLowerCase().substring(0, 50)
          : "not_provided",

      supported:
        understood.make
          ? "yes"
          : "no",

      result_count:
        results.length

    }
  );


  if (
    understood.unsupportedMake
  ) {

    trackEvent(
      "stm_unsupported_vehicle",
      {

        vehicle_make:
          understood.unsupportedMake,

        job_type:
          understood.job || "unknown"

      }
    );

  }


  if (
    understood.make &&
    results.length === 0
  ) {

    trackEvent(
      "stm_no_match",
      {

        vertical:
          understood.vertical || "unknown",

        vehicle_make:
          understood.make,

        vehicle_model:
          understood.model || "unknown",

        job_type:
          understood.job || "unknown"

      }
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
          Automotive · ${makeName}

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
  // UNKNOWN / FUTURE VERTICAL
  // ==================================================

  if (!understood.vertical) {

    resultsSummary.textContent =
      "We're still learning this type of job";


    resultsContainer.innerHTML = `

      <div class="result-card">

        <h3>
          We don't support this search yet.
        </h3>

        <div class="why">

          <strong>
            But this is useful feedback.
          </strong>

          <p>
            Seek The Master is currently testing
            automotive matching first.

            Home services and other industries
            will use the same search experience
            as we add their evidence profiles.
          </p>

        </div>

      </div>

    `;


    trackEvent(
      "stm_unsupported_vertical",
      {
        vertical:
          "unknown"
      }
    );


    showResults();

    return;

  }


  // ==================================================
  // AUTOMOTIVE — MAKE NOT PROVIDED
  // ==================================================

  if (
    understood.vertical === "automotive" &&
    !understood.make
  ) {

    resultsSummary.textContent =
      "We need more information";


    resultsContainer.innerHTML = `

      <div class="result-card">

        <h3>
          What vehicle is this for?
        </h3>

        <div class="why">

          <strong>
            We identified an automotive job,
            but not the vehicle.
          </strong>

          <p>
            Include the make and model if you
            know it.

            For example:
            "My 2011 Infiniti G37 is overheating."
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


  if (results.length === 0) {

    resultsSummary.textContent =
      "No evidence-backed matches yet";


    resultsContainer.innerHTML += `

      <div class="result-card">

        <h3>
          We don't have enough evidence yet.
        </h3>

        <div class="why">

          <strong>
            We understood the search,
            but don't yet have researched
            business profiles for it.
          </strong>

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
  // RESULTS
  // ==================================================

  results.forEach(
    (result, index) => {

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
            data-business-id="${result.id}"
            data-business-name="${result.name}"
            data-rank="${index + 1}"
            class="business-link"
          >
            Visit business
          </a>


          <a
            href="${profile.source}"
            target="_blank"
            rel="noopener noreferrer"
            data-business-id="${result.id}"
            data-business-name="${result.name}"
            data-rank="${index + 1}"
            class="evidence-link"
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


  attachResultTracking(
    understood
  );


  showResults();

}


// --------------------------------------------------
// RESULT CLICK TRACKING
// --------------------------------------------------

function attachResultTracking(
  understood
) {

  document
    .querySelectorAll(
      ".business-link"
    )
    .forEach(
      link => {

        link.addEventListener(
          "click",
          () => {

            trackEvent(
              "stm_business_click",
              {

                business_id:
                  link.dataset.businessId,

                business_name:
                  link.dataset.businessName,

                result_rank:
                  Number(
                    link.dataset.rank
                  ),

                vertical:
                  understood.vertical || "unknown",

                vehicle_make:
                  understood.make || "unknown",

                vehicle_model:
                  understood.model || "unknown",

                job_type:
                  understood.job || "unknown"

              }
            );

          }
        );

      }
    );


  document
    .querySelectorAll(
      ".evidence-link"
    )
    .forEach(
      link => {

        link.addEventListener(
          "click",
          () => {

            trackEvent(
              "stm_evidence_click",
              {

                business_id:
                  link.dataset.businessId,

                business_name:
                  link.dataset.businessName,

                result_rank:
                  Number(
                    link.dataset.rank
                  ),

                vertical:
                  understood.vertical || "unknown",

                vehicle_make:
                  understood.make || "unknown",

                vehicle_model:
                  understood.model || "unknown",

                job_type:
                  understood.job || "unknown"

              }
            );

          }
        );

      }
    );

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
