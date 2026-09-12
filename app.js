const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("job-search");
const locationInput = document.getElementById("location");

const resultsSection = document.getElementById("results-section");
const resultsContainer = document.getElementById("results-container");
const resultsSummary = document.getElementById("results-summary");


// ==================================================
// SEEK THE MASTER — V0.9
// ==================================================
//
// New in V0.9:
//
// - Per-result feedback controls
// - 👍 Good match
// - 👎 Bad match
// - GA4 feedback events
// - Prevents repeat feedback on the same result
//   during the current browser session
//
// ==================================================


// --------------------------------------------------
// LOAD DATA
// --------------------------------------------------

const automotiveBusinesses =
  window.AUTOMOTIVE_BUSINESSES || [];

const homeServiceBusinesses =
  window.HOME_SERVICE_BUSINESSES || [];


// ==================================================
// UNDERSTAND SEARCH
// ==================================================

function understandSearch(query) {

  const text = query.toLowerCase();

  const search = {
    vertical: null,
    make: null,
    model: null,
    job: null,
    surface: null,
    unsupportedMake: null
  };


  // ==================================================
  // HOME SERVICES
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
      term => text.includes(term)
    )
  ) {

    search.vertical =
      "home_services";

  }


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
  // AUTOMOTIVE
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
        term => text.includes(term)
      )
    ) {

      search.vertical =
        "automotive";

    }

  }


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


  if (search.surface) {

    if (
      profile.surfaces.includes(
        search.surface
      )
    ) {

      score += 3;

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
// SEARCH
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


  if (
    understood.unsupportedMake
  ) {

    resultsSummary.textContent =
      "No evidence-backed matches yet";


    resultsContainer.innerHTML = `

      <div class="result-card">

        <h3>
          We're not ready to recommend
          ${understood.unsupportedMake.toUpperCase()}
          shops yet.
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


    showResults();

    return;

  }


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
            Include the make and model if you know it.
          </p>

        </div>

      </div>

    `;


    showResults();

    return;

  }


  if (
    !understood.vertical
  ) {

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
          </p>

        </div>

      </div>

    `;


    trackEvent(
      "stm_unsupported_vertical"
    );


    showResults();

    return;

  }


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


        <div
          class="result-feedback"
          style="
            margin-top:20px;
            padding-top:16px;
            border-top:1px solid #deded8;
          "
        >

          <div
            style="
              font-size:13px;
              font-weight:700;
              margin-bottom:10px;
            "
          >
            Was this a good match?
          </div>


          <button
            class="feedback-button feedback-positive"
            data-business-id="${result.id}"
            data-business-name="${result.name}"
            data-rank="${index + 1}"
            style="
              border:1px solid #deded8;
              background:white;
              border-radius:8px;
              padding:8px 12px;
              cursor:pointer;
              margin-right:6px;
            "
          >
            👍 Good match
          </button>


          <button
            class="feedback-button feedback-negative"
            data-business-id="${result.id}"
            data-business-name="${result.name}"
            data-rank="${index + 1}"
            style="
              border:1px solid #deded8;
              background:white;
              border-radius:8px;
              padding:8px 12px;
              cursor:pointer;
            "
          >
            👎 Bad match
          </button>


          <span
            class="feedback-message"
            style="
              display:none;
              margin-left:10px;
              font-size:12px;
              color:#686868;
            "
          >
            Thanks for the feedback.
          </span>

        </div>

      `;


      resultsContainer.appendChild(
        card
      );

    });


  attachResultTracking(
    understood
  );


  attachFeedbackTracking(
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
// FEEDBACK TRACKING
// ==================================================

function attachFeedbackTracking(
  understood
) {

  document
    .querySelectorAll(
      ".result-card"
    )
    .forEach(
      card => {

        const positiveButton =
          card.querySelector(
            ".feedback-positive"
          );


        const negativeButton =
          card.querySelector(
            ".feedback-negative"
          );


        const message =
          card.querySelector(
            ".feedback-message"
          );


        if (
          !positiveButton ||
          !negativeButton
        ) {

          return;

        }


        const businessId =
          positiveButton.dataset.businessId;


        const storageKey =
          `stm_feedback_${businessId}`;


        if (
          sessionStorage.getItem(
            storageKey
          )
        ) {

          positiveButton.disabled =
            true;

          negativeButton.disabled =
            true;

          if (message) {

            message.style.display =
              "inline";

          }

        }


        positiveButton.addEventListener(
          "click",
          () => {

            submitFeedback(
              "positive",
              positiveButton,
              negativeButton,
              message,
              understood
            );

          }
        );


        negativeButton.addEventListener(
          "click",
          () => {

            submitFeedback(
              "negative",
              positiveButton,
              negativeButton,
              message,
              understood
            );

          }
        );

      }
    );

}


function submitFeedback(
  type,
  positiveButton,
  negativeButton,
  message,
  understood
) {

  const businessId =
    positiveButton.dataset.businessId;


  const businessName =
    positiveButton.dataset.businessName;


  const resultRank =
    Number(
      positiveButton.dataset.rank
    );


  const storageKey =
    `stm_feedback_${businessId}`;


  if (
    sessionStorage.getItem(
      storageKey
    )
  ) {

    return;

  }


  sessionStorage.setItem(
    storageKey,
    type
  );


  positiveButton.disabled =
    true;

  negativeButton.disabled =
    true;


  positiveButton.style.opacity =
    "0.55";

  negativeButton.style.opacity =
    "0.55";


  if (message) {

    message.style.display =
      "inline";

  }


  trackEvent(
    type === "positive"
      ? "stm_result_positive"
      : "stm_result_negative",
    {

      business_id:
        businessId,

      business_name:
        businessName,

      result_rank:
        resultRank,

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
        "not_applicable"

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
