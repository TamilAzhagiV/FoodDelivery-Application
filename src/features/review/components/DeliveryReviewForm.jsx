import { useState } from "react";
import StarRating from "./StarRating";
import { submitDeliveryReview } from "../services/reviewService";

function DeliveryReviewForm({ orderId }) {
  const [ratings, setRatings] = useState({
    deliveryTime: 0,
    behaviour: 0,
    professionalism: 0,
    communication: 0,
    overallExperience: 0,
  });

  const [review, setReview] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function updateRating(field, value) {
    setRatings((prev) => ({
      ...prev,
      [field]: value,
    }));
  }
  
async function handleSubmit(event) {
  event.preventDefault();

  const hasEmptyRating = Object.values(ratings).some(
    (rating) => rating === 0
  );

  if (hasEmptyRating) {
    alert("Please rate all delivery categories.");
    return;
  }

  try {
    setSubmitting(true);

    await submitDeliveryReview({
      orderId,
      ratings,
      review,
    });

    alert("Delivery review submitted successfully");
  } catch (error) {
    alert(error.message);
  } finally {
    setSubmitting(false);
  }
}

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">
        Delivery Review
      </h2>

      {[
        ["deliveryTime", "Delivery Time"],
        ["behaviour", "Behaviour"],
        ["professionalism", "Professionalism"],
        ["communication", "Communication"],
        ["overallExperience", "Overall Experience"],
      ].map(([field, label]) => (
        <div key={field} className="mb-5">
          <p className="mb-2 font-medium text-gray-700">{label}</p>

          <StarRating
            value={ratings[field]}
            onChange={(value) => updateRating(field, value)}
          />
        </div>
      ))}

      <textarea
        value={review}
        onChange={(event) => setReview(event.target.value)}
        placeholder="Share your delivery experience..."
        rows="5"
        className="w-full rounded-xl border p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
      />

      <button
        type="submit"
        disabled={submitting}
        className="mt-5 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white disabled:bg-gray-300"
      >
        {submitting ? "Submitting..." : "Submit Delivery Review"}
      </button>
    </form>
  );
}

export default DeliveryReviewForm;