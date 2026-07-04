export function validateRestaurantReview(data) {
  const errors = {};

  if (!data.orderId) {
    errors.orderId = "Order ID is required";
  }

  if (!data.rating || data.rating < 1 || data.rating > 5) {
    errors.rating = "Rating must be between 1 and 5";
  }

  if (data.review && data.review.length < 5) {
    errors.review = "Review should be at least 5 characters";
  }

  return errors;
}

export function validateDeliveryReview(data) {
  const errors = {};

  if (!data.orderId) {
    errors.orderId = "Order ID is required";
  }

  Object.entries(data.ratings || {}).forEach(([key, value]) => {
    if (!value || value < 1 || value > 5) {
      errors[key] = `${key} rating must be between 1 and 5`;
    }
  });

  if (data.review && data.review.length < 5) {
    errors.review = "Review should be at least 5 characters";
  }

  return errors;
}