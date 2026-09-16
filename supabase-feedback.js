const SUPABASE_URL =
  "https://gwbjsvcswupgvnhhbplc.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_tih-qHzs27vVtKnvJC_syw_e5R-_F_5";


async function saveFeedbackToSupabase(data) {

  try {

    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/feedback`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          "apikey":
            SUPABASE_KEY,

          "Authorization":
            `Bearer ${SUPABASE_KEY}`,

          "Prefer":
            "return=minimal"
        },

        body:
          JSON.stringify(data)
      }
    );


    if (!response.ok) {

      const errorText =
        await response.text();

      console.error(
        "Supabase feedback error:",
        errorText
      );

      return false;
    }


    console.log(
      "Feedback saved to Supabase."
    );

    return true;

  }

  catch (error) {

    console.error(
      "Could not save feedback:",
      error
    );

    return false;

  }

}


// ==================================================
// POSITIVE FEEDBACK
// ==================================================

document.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest(
        ".feedback-positive"
      );


    if (!button) {
      return;
    }


    saveFeedbackToSupabase({

      business_id:
        button.dataset.businessId,

      business_name:
        button.dataset.businessName,

      result_rank:
        Number(
          button.dataset.rank
        ),

      feedback_type:
        "positive",

      page_path:
        window.location.pathname

    });

  }
);


// ==================================================
// NEGATIVE FEEDBACK
// ==================================================

document.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest(
        ".submit-negative-feedback"
      );


    if (!button) {
      return;
    }


    const container =
      button.closest(
        ".result-feedback"
      );


    if (!container) {
      return;
    }


    const reason =
      container
        .querySelector(
          ".feedback-reason"
        )
        ?.value || null;


    const comment =
      container
        .querySelector(
          ".feedback-comment"
        )
        ?.value
        ?.trim() || null;


    if (!reason) {
      return;
    }


    saveFeedbackToSupabase({

      business_id:
        button.dataset.businessId,

      business_name:
        button.dataset.businessName,

      result_rank:
        Number(
          button.dataset.rank
        ),

      feedback_type:
        "negative",

      feedback_reason:
        reason,

      comment:
        comment
          ? comment.substring(0, 500)
          : null,

      page_path:
        window.location.pathname

    });

  }
);
