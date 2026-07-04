const API_BASE_URL = "http://192.168.1.22:3000/admin";

function getToken() {
  return localStorage.getItem("accessToken");
}

async function parseResponse(response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export async function getAllDeliveryApprovals() {
  const response = await fetch(`${API_BASE_URL}/delivery-partners`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return parseResponse(response);
}

export async function approveDeliveryPartner(deliveryPartnerId) {
  const response = await fetch(
    `${API_BASE_URL}/delivery-partners/${deliveryPartnerId}/approve`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return parseResponse(response);
}

export async function rejectDeliveryPartner(deliveryPartnerId, rejectionReason) {
  const response = await fetch(
    `${API_BASE_URL}/delivery-partners/${deliveryPartnerId}/reject`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ rejectionReason }),
    }
  );

  return parseResponse(response);
}