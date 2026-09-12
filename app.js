const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("job-search");
const locationInput = document.getElementById("location");

const resultsSection = document.getElementById("results-section");
const resultsContainer = document.getElementById("results-container");
const resultsSummary = document.getElementById("results-summary");


// ==================================================
// SEEK THE MASTER — V0.7
// ==================================================
//
// Supported verticals:
//
// 1. Automotive
// 2. Home Services — Exterior Cleaning
//
// The same search box routes the request to the
// appropriate evidence database.
//
// ==================================================


// ==================================================
// AUTOMOTIVE DATABASE
// ==================================================

const automotiveBusinesses = [

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
          "Cayenne suspension work referenced",
          "Porsche-compatible diagnostic equipment",
          "Located in Surrey"
        ],

        why:
          "Nexus publishes unusually specific Porsche repair information. Its material identifies the Cayenne and discusses cooling-system repairs, water pumps, suspension work and Porsche diagnostics.",

        source:
          "https://nexusautogroup.ca/porsche-repair-service"
      }

    },

    website:
      "https://nexusautogroup.ca/"
  },


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
          "Porsche-specific repair services",
          "Porsche diagnostic equipment",
          "Engine and gearbox capability",
          "Suspension and steering capability",
          "Lower Mainland Porsche focus"
        ],

        why:
          "Turn3 is a Porsche-focused specialist rather than a generic repair shop, with broad Porsche repair, diagnostic and maintenance capability.",

        source:
          "https://turn3autosport.com/porsche-service-repair/"
      }

    },

    website:
      "https://turn3autosport.com/"
  },


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
          "Engine diagnostics",
          "Suspension and steering services",
          "Transmission repair",
          "Cooling-system service",
          "Located in Surrey"
        ],

        why:
          "Dale's publishes dedicated Infiniti service information and specifically identifies the G37, along with relevant diagnostic, cooling, suspension and drivetrain services.",

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
          "Cooling-system repair capability",
          "Located in Surrey"
        ],

        why:
          "Dale's has Porsche-specific service coverage and identifies the Cayenne, with broader diagnostic, cooling-system and suspension capabilities.",

        source:
          "https://dalesauto.ca/"
      }

    },

    website:
      "https://dalesauto.ca/"
  },


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
          "Transmission and drivetrain"
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
          "Norlang's European repair operation supports Porsche vehicles and publishes relevant cooling-system, suspension, diagnostic and drivetrain capabilities.",

        source:
          "https://norlangauto.ca/euro-fix/"
      }

    },

    website:
      "https://norlangauto.ca/"
  }

];


// ==================================================
// HOME SERVICES DATABASE
// ==================================================

const homeServiceBusinesses = [

  {
    id: "all-canadian-home-services",

    name: "All Canadian Home Services",

    location: "Surrey, BC",

    city: "surrey",

    category: "Roof & Exterior Cleaning",

    vertical: "home_services",

    profile: {

      jobs: [
        "roof moss removal",
        "roof cleaning",
        "soft washing",
        "pressure washing",
        "gutter cleaning"
      ],

      surfaces: [
        "roof",
        "shingles",
        "driveway",
        "patio",
        "siding"
      ],

      baseScore: 95,

      evidenceStrength: "High",

      evidence: [
        "Roof cleaning specifically offered",
        "Moss removal specifically offered",
        "Soft-wash roof cleaning",
        "Avoids damaging high pressure on roofs",
        "Serves Surrey and nearby communities"
      ],

      why:
        "All Canadian specifically advertises roof cleaning and moss removal in Surrey and uses soft-wash methods designed for delicate roofing surfaces.",

      source:
        "https://allcanadianhs.ca/"
    },

    website:
      "https://allcanadianhs.ca/"
  },


  {
    id: "dragon-wash",

    name: "Dragon Wash",

    location: "Surrey, BC",

    city: "surrey",

    category: "Exterior Cleaning",

    vertical: "home_services",

    profile: {

      jobs: [
        "roof moss removal",
        "roof cleaning",
        "soft washing",
        "pressure washing",
        "gutter cleaning",
        "window cleaning"
      ],

      surfaces: [
        "roof",
        "shingles",
        "driveway",
        "patio",
        "deck",
        "fence"
      ],

      baseScore: 94,

      evidenceStrength: "High",

      evidence: [
        "Dedicated roof-cleaning service",
        "Moss removal specifically advertised",
        "Soft-wash roof techniques",
        "States high pressure is not used on roofs",
        "Surrey-based"
      ],

      why:
        "Dragon Wash specifically advertises roof cleaning and moss removal in Surrey and says it uses soft washing rather than high pressure on roofing materials.",

      source:
        "https://dragonwash.ca/roof-clean"
    },

    website:
      "https://dragonwash.ca/"
  },


  {
    id: "two-angels-home-services",

    name: "2 Angels Home Services",

    location: "Langley / Surrey, BC",

    city: "langley",

    category: "Exterior Home Services",

    vertical: "home_services",

    profile: {

      jobs: [
        "roof moss removal",
        "roof cleaning",
        "soft washing",
        "pressure washing",
        "gutter cleaning",
        "window cleaning"
      ],

      surfaces: [
        "roof",
        "siding",
        "driveway",
        "retaining wall"
      ],

      baseScore: 91,

      evidenceStrength: "High",

      evidence: [
        "Roof moss removal specifically listed",
        "Soft washing specifically listed",
        "Residential exterior cleaning",
        "Services both Surrey and Langley",
        "Roof moss and algae treatment"
      ],

      why:
        "2 Angels specifically lists roof moss removal and soft washing among its residential exterior-cleaning services for Surrey and Langley.",

      source:
        "https://www.2angelshomeservices.com/"
    },

    website:
      "https://www.2angelshomeservices.com/"
  },


  {
    id: "shiny-power-wash",

    name: "Shiny Power Wash",

    location: "Surrey, BC",

    city: "surrey",

    category: "Exterior Cleaning",

    vertical: "home_services",

    profile: {

      jobs: [
        "roof moss removal",
        "roof cleaning",
        "soft washing",
        "pressure washing",
        "gutter cleaning",
        "house washing"
      ],

      surfaces: [
        "roof",
        "shingles",
        "house exterior",
        "driveway",
        "concrete"
      ],

      baseScore: 90,

      evidenceStrength: "High",

      evidence: [
        "Roof cleaning and moss control specifically offered",
        "Three-year moss-free warranty advertised",
        "Soft washing capability",
        "Surrey-based",
        "Serves Lower Mainland"
      ],

      why:
        "Shiny Power Wash specifically offers roof cleaning and moss control and advertises a moss-free warranty for its roof-cleaning work.",

      source:
        "https://shinypowerwash.ca/roof-cleaning-moss-control/"
    },

    website:
      "https://shinypowerwash.ca/"
  }

];


// ==================================================
// UNDERSTAND SEARCH
// ==================================================

function understandSearch(query) {

  const text =
    query.toLowerCase();


  const search = {

    vertical: null,

    make: null,

    model: null,

    job: null,

    surface: null,

    unsupportedMake: null

  };


  // ==================================================
  // HOME SERVICES DETECTION
  // ==================================================

  const homeTerms = [

    "roof",
    "moss",
    "gutter",
    "driveway",
    "pressure wash",
    "pressure washing",
    "power wash",
    "soft wash",
    "soft washing",
    "siding",
    "patio",
    "deck",
    "house wash",
    "house washing"

  ];


  if (
    homeTerms.some(
      term =>
        text.includes(term)
    )
  ) {

    search.vertical =
      "home_services";

  }


  // ==================================================
  // HOME SERVICE JOB
  // ==================================================

  if (
    search.vertical ===
    "home_services"
  ) {

    if (
      text.includes("moss") &&
      text.includes("roof")
    ) {

      search.job =
        "roof moss removal";

      search.surface =
        "roof";

    }


    else if (
      text.includes("roof")
    ) {

      search.job =
        "roof cleaning";

      search.surface =
        "roof";

    }


    else if (
      text.includes("gutter")
    ) {

      search.job =
        "gutter cleaning";

      search.surface =
        "gutter";

    }


    else if (
      text.includes("pressure wash") ||
      text.includes("pressure washing") ||
      text.includes("power wash")
    ) {

      search.job =
        "pressure washing";

    }


    else if (
      text.includes("soft wash")
    ) {

      search.job =
        "soft washing";

    }


    if (
      text.includes("driveway")
    ) {

      search.surface =
        "driveway";

    }


    else if (
      text.includes("siding")
    ) {

      search.surface =
        "siding";

    }


    else if (
      text.includes("patio")
    ) {

      search.surface =
        "patio";

    }


    else if (
      text.includes("deck")
    ) {

      search.surface =
        "deck";

    }

  }


  // ==================================================
  // AUTOMOTIVE DETECTION
  //
  // Only run if we have not already clearly
  // identified a home-service search.
  // ==================================================

  if (
    search.vertical !==
    "home_services"
  ) {

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
      "suspension",
      "water pump"

    ];


    if (
      automotiveTerms.some(
        term =>
          text.includes(term)
      )
    ) {

      search.vertical =
        "automotive";

    }

  }


  // ==================================================
  // AUTOMOTIVE — SUPPORTED MAKES
  // ==================================================

  if (
    search.vertical ===
    "automotive"
  ) {

    if (
      text.includes("porsche")
    ) {

      search.make =
        "porsche";

    }


    if (
      text.includes("infiniti")
    ) {

      search.make =
        "infiniti";

    }


    // Porsche models

    const porscheModels = [

      "cayenne",
      "macan",
      "panamera",
      "boxster",
      "cayman"

    ];


    for (
      const model
      of porscheModels
    ) {

      if (
        text.includes(model)
      ) {

        search.make =
          "porsche";

        search.model =
          model;

      }

    }


    // Infiniti models

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


    for (
      const model
      of infinitiModels
    ) {

      if (
        text.includes(model)
      ) {

        search.make =
          "infiniti";

        search.model =
          model;

      }

    }


    // Unsupported makes

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

      for (
        const make
        of unsupportedMakes
      ) {

        if (
          text.includes(make)
        ) {

          search.unsupportedMake =
            make;

          break;

        }

      }

    }


    // Automotive job

    if (
      text.includes("water pump") ||
      text.includes("waterpump")
    ) {

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

      search.job =
        "cooling system";

    }


    else if (
      text.includes("suspension") ||
      text.includes("shock") ||
      text.includes("strut") ||
      text.includes("air suspension")
    ) {

      search.job =
        "suspension";

    }


    else if (
      text.includes("steering")
    ) {

      search.job =
        "steering";

    }


    else if (
      text.includes("transmission") ||
      text.includes("gearbox")
    ) {

      search.job =
        "transmission";

    }


    else if (
      text.includes("brake")
    ) {

      search.job =
        "brakes";

    }


    else if (
      text.includes("check engine") ||
      text.includes("diagnostic") ||
      text.includes("warning light") ||
      text.includes("cel")
    ) {

      search.job =
        "diagnostics";

    }


    else if (
      text.includes("engine")
    ) {

      search.job =
        "engine repair";

    }

  }


  return search;

}


// ==================================================
// LOCATION SCORE
// ==================================================

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
      business.city ===
      "langley"
    )
    ||
    (
      text.includes("langley") &&
      business.city ===
      "surrey"
    )
  ) {

    return 1;

  }


  return 0;

}


// ==================================================
// AUTOMOTIVE SCORING
// ==================================================

function scoreAutomotive(
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


// ==================================================
// HOME SERVICES SCORING
// ==================================================

function scoreHomeService(
  business,
  profile,
  search,
  location
) {

  let score =
    profile.baseScore;


  // Exact job evidence

  if (search.job) {

    if (
      profile.jobs.includes(
        search.job
      )
    ) {

      score += 6;

    }

    else {

      score -= 10;

    }

  }


  // Relevant surface evidence

  if (search.surface) {

    if (
      profile.surfaces.includes(
        search.surface
      )
    ) {

      score += 3;

    }

  }


  // Location

  score +=
    calculateLocationScore(
      business,
      location
    );


  return score;

}


// ==================================================
// MATCH LABEL
// ==================================================

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


// ==================================================
// ANALYTICS
// ==================================================

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
    typeof window.gtag ===
    "function"
  ) {

    window.gtag(
      "event",
      eventName,
      eventData
    );

  }

}


// ==================================================
// PERFORM SEARCH
// ==================================================

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
  // AUTOMOTIVE
  // ==================================================

  if (
    understood.vertical ===
    "automotive" &&
    understood.make
  ) {

    automotiveBusinesses.forEach(
      business => {

        const profile =
          business.profiles[
            understood.make
          ];


        if (!profile) {

          return;

        }


        const score =
          scoreAutomotive(
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

  }


  // ==================================================
  // HOME SERVICES
  // ==================================================

  if (
    understood.vertical ===
    "home_services"
  ) {

    homeServiceBusinesses.forEach(
      business => {

        const profile =
          business.profile;


        const score =
          scoreHomeService(
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

  }


  results.sort(
    (a, b) =>
      b.score - a.score
  );


  // ==================================================
  // ANALYTICS — SEARCH
  // ==================================================

  trackEvent(
    "stm_search",
    {

      vertical:
        understood.vertical ||
        "unknown",

      vehicle_make:
        understood.make ||
        "not_applicable",

      vehicle_model:
        understood.model ||
        "not_applicable",

      job_type:
        understood.job ||
        "unknown",

      surface:
        understood.surface ||
        "not_applicable",

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
          understood.job ||
          "unknown"

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


// ==================================================
// FORMAT INTERPRETATION
// ==================================================

function formatUnderstood(
  search,
  location
) {

  const items = [];


  if (
    search.vertical ===
    "automotive"
  ) {

    items.push(
      "Automotive"
    );


    if (search.make) {

      items.push(
        search.make
          .charAt(0)
          .toUpperCase() +
        search.make.slice(1)
      );

    }


    if (search.model) {

      items.push(
        search.model.toUpperCase()
      );

    }

  }


  if (
    search.vertical ===
    "home_services"
  ) {

    items.push(
      "Home Services"
    );


    if (search.surface) {

      items.push(
        search.surface
          .charAt(0)
          .toUpperCase() +
        search.surface.slice(1)
      );

    }

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


  return items.join(
    " · "
  );

}


// ==================================================
// DISPLAY RESULTS
// ==================================================

function displayResults(
  results,
  location,
  understood
) {

  resultsContainer.innerHTML =
    "";


  // ==================================================
  // UNSUPPORTED AUTOMOTIVE MAKE
  // ==================================================

  if (
    understood.unsupportedMake
  ) {

    const make =
      understood.unsupportedMake;


    resultsSummary.textContent =
      "No evidence-backed matches yet";


    resultsContainer.innerHTML = `

      <div class="result-card">

        <h3>
          We're not ready to recommend
          ${make.toUpperCase()} shops yet.
        </h3>

        <div class="why">

          <strong>
            We don't want to guess.
          </strong>

          <p>
            We identified this as an automotive
            search, but haven't researched enough
            businesses for this vehicle make yet.
          </p>

        </div>

      </div>

    `;


    showResults();

    return;

  }


  // ==================================================
  // AUTOMOTIVE BUT NO MAKE
  // ==================================================

  if (
    understood.vertical ===
    "automotive" &&
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
  // UNKNOWN VERTICAL
  // ==================================================

  if (!understood.vertical) {

    resultsSummary.textContent =
      "We're still learning this type of job";


    resultsContainer.innerHTML = `

      <div class="result-card">

        <h3>
          We don't support this type of search yet.
        </h3>

        <div class="why">

          <strong>
            This is useful feedback.
          </strong>

          <p>
            Seek The Master currently supports
            automotive repair and selected
            home-service searches.

            More industries will be added as we
            build evidence-backed business profiles.
          </p>

        </div>

      </div>

    `;


    trackEvent(
      "stm_unsupported_vertical",
      {}
    );


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


  if (
    results.length === 0
  ) {

    resultsSummary.textContent =
      "No evidence-backed matches yet";


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


// ==================================================
// RESULT CLICK TRACKING
// ==================================================

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
                  understood.vertical,

                job_type:
                  understood.job ||
                  "unknown"

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
                  understood.vertical,

                job_type:
                  understood.job ||
                  "unknown"

              }
            );

          }
        );

      }
    );

}


// ==================================================
// SHOW RESULTS
// ==================================================

function showResults() {

  resultsSection.classList.remove(
    "hidden"
  );


  resultsSection.scrollIntoView({

    behavior:
      "smooth"

  });

}


// ==================================================
// EXAMPLE BUTTONS
// ==================================================

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


          if (
            !locationInput.value
          ) {

            locationInput.value =
              "Surrey, BC";

          }


          performSearch();

        }
      );

    }
  );


// ==================================================
// SEARCH BUTTON
// ==================================================

searchButton.addEventListener(

  "click",

  performSearch

);


// ==================================================
// ENTER TO SEARCH
// ==================================================

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


// ==================================================
// RESTORE LAST SEARCH
// ==================================================

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
