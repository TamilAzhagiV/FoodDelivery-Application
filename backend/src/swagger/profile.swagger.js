/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: User Profile APIs
 */

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get Logged-in User Profile
 *     description: Returns the profile details of the authenticated user based on their role.
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile fetched successfully
 *         content:
 *           application/json:
 *             examples:
 *               Customer:
 *                 summary: Customer Profile
 *                 value:
 *                   success: true
 *                   message: Profile fetched successfully
 *                   data:
 *                     userId: "6850c1c6f3a5f5f4b6a12345"
 *                     addresses:
 *                       - label: HOME
 *                         street: Anna Nagar
 *                         city: Chennai
 *                         state: Tamil Nadu
 *                         pincode: "600040"
 *                     preferences:
 *                       vegetarian: false
 *                       favouriteCuisines:
 *                         - South Indian
 *                         - Chinese
 *
 *               DeliveryPartner:
 *                 summary: Delivery Partner Profile
 *                 value:
 *                   success: true
 *                   message: Profile fetched successfully
 *                   data:
 *                     userId: "6850c1c6f3a5f5f4b6a12345"
 *                     dateOfBirth: "2004-06-20"
 *                     emergencyContactNumber: "9876543210"
 *                     aadhaarNumber: "123412341234"
 *                     vehicleType: BIKE
 *                     vehicleNumber: TN45AB1234
 *                     vehicleModel: Honda Shine
 *                     drivingLicenseNumber: TNDL123456789
 *                     bankDetails:
 *                       accountHolderName: Surendra
 *                       accountNumber: "123456789012"
 *                       ifscCode: SBIN0001234
 *                       bankName: State Bank of India
 *                     currentLocation:
 *                       latitude: 11.0168
 *                       longitude: 76.9558
 *
 *               RestaurantOwner:
 *                 summary: Restaurant Owner Profile
 *                 value:
 *                   success: true
 *                   message: Profile fetched successfully
 *                   data:
 *                     ownerId: "6850c1c6f3a5f5f4b6a12345"
 *                     restaurantName: Surendra Foods
 *                     description: Authentic South Indian Restaurant
 *                     logo: https://example.com/logo.png
 *                     coverImage: https://example.com/cover.png
 *                     businessPhoneNumber: "9876543210"
 *                     businessEmail: surendrafoods@gmail.com
 *                     gstNumber: GST123456789
 *                     fssaiLicenseNumber: FSSAI123456789
 *                     cuisineTypes:
 *                       - South Indian
 *                       - Chinese
 *                     openingTime: "09:00"
 *                     closingTime: "22:00"
 *                     address:
 *                       street: Anna Nagar
 *                       area: West
 *                       city: Chennai
 *                       state: Tamil Nadu
 *                       pincode: "600040"
 *                       latitude: 13.0827
 *                       longitude: 80.2707
 *                     bankDetails:
 *                       accountHolderName: Surendra Foods Pvt Ltd
 *                       accountNumber: "123456789012"
 *                       ifscCode: SBIN0001234
 *                       bankName: State Bank of India
 *
 *       401:
 *         description: Unauthorized - Invalid or Missing Access Token
 *       404:
 *         description: Profile Not Found
 */

/**
 * @swagger
 * /profile:
 *   put:
 *     summary: Update Logged-in User Profile
 *     description: Updates the profile details of the authenticated user based on their role.
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           examples:
 *             Customer:
 *               summary: Customer Profile Update
 *               value:
 *                 addresses:
 *                   - label: HOME
 *                     street: Anna Nagar
 *                     city: Chennai
 *                     state: Tamil Nadu
 *                     pincode: "600040"
 *                 preferences:
 *                   vegetarian: false
 *                   favouriteCuisines:
 *                     - South Indian
 *                     - Chinese
 *
 *             DeliveryPartner:
 *               summary: Delivery Partner Profile Update
 *               value:
 *                 dateOfBirth: "2004-06-20"
 *                 emergencyContactNumber: "9876543210"
 *                 aadhaarNumber: "123412341234"
 *                 vehicleType: BIKE
 *                 vehicleNumber: TN45AB1234
 *                 vehicleModel: Honda Shine
 *                 drivingLicenseNumber: TNDL123456789
 *                 bankDetails:
 *                   accountHolderName: Surendra
 *                   accountNumber: "123456789012"
 *                   ifscCode: SBIN0001234
 *                   bankName: State Bank of India
 *                 currentLocation:
 *                   latitude: 11.0168
 *                   longitude: 76.9558
 *
 *             RestaurantOwner:
 *               summary: Restaurant Owner Profile Update
 *               value:
 *                 restaurantName: Surendra Foods
 *                 description: Authentic South Indian Restaurant
 *                 logo: https://example.com/logo.png
 *                 coverImage: https://example.com/cover.png
 *                 businessPhoneNumber: "9876543210"
 *                 businessEmail: surendrafoods@gmail.com
 *                 gstNumber: GST123456789
 *                 fssaiLicenseNumber: FSSAI123456789
 *                 cuisineTypes:
 *                   - South Indian
 *                   - Chinese
 *                 openingTime: "09:00"
 *                 closingTime: "22:00"
 *                 address:
 *                   street: Anna Nagar
 *                   area: West
 *                   city: Chennai
 *                   state: Tamil Nadu
 *                   pincode: "600040"
 *                   latitude: 13.0827
 *                   longitude: 80.2707
 *                 bankDetails:
 *                   accountHolderName: Surendra Foods Pvt Ltd
 *                   accountNumber: "123456789012"
 *                   ifscCode: SBIN0001234
 *                   bankName: State Bank of India
 *
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Profile updated successfully
 *               profileComplete: true
 *
 *       400:
 *         description: Validation Error
 *
 *       401:
 *         description: Unauthorized - Invalid or Missing Access Token
 *
 *       404:
 *         description: Profile Not Found
 */

