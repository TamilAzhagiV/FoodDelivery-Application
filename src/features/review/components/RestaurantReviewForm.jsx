import { useState } from "react";
import StarRating from "./StarRating";
import { submitRestaurantReview } from "../services/reviewService";

function RestaurantReviewForm({ orderId }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
        if (rating === 0) {
        alert("Please select a rating.");
        return;
}
      setSubmitting(true);

      await submitRestaurantReview({
        orderId,
        rating,
        review,
      });

      alert("Restaurant review submitted successfully");
    } catch (error) {
      alert(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">
        Restaurant Review
      </h2>

      <p className="mb-2 font-medium text-gray-700">Food Rating</p>
      <StarRating value={rating} onChange={setRating} />

      <textarea
        value={review}
        onChange={(event) => setReview(event.target.value)}
        placeholder="Share your food experience..."
        rows="5"
        className="mt-5 w-full rounded-xl border p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
      />

      <button
        type="submit"
        disabled={submitting}
        className="mt-5 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white disabled:bg-gray-300"
      >
        {submitting ? "Submitting..." : "Submit Restaurant Review"}
      </button>
    </form>
  );
}

export default RestaurantReviewForm;