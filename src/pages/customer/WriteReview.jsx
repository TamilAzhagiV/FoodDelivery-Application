import { useParams } from "react-router-dom";

import CustomerLayout from "../../components/layout/CustomerLayout";
import RestaurantReviewForm from "../../features/review/components/RestaurantReviewForm";
import DeliveryReviewForm from "../../features/review/components/DeliveryReviewForm";

function WriteReview() {
  const { orderId } = useParams();

  return (
    <CustomerLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Write Review</h1>
        <p className="text-sm text-gray-500">
          Share your restaurant and delivery experience.
        </p>
      </div>

      <div className="space-y-6">
        <RestaurantReviewForm orderId={orderId} />
        <DeliveryReviewForm orderId={orderId} />
      </div>
    </CustomerLayout>
  );
}

export default WriteReview;