const STORAGE_KEY = "customerAddresses";
const SELECTED_ADDRESS_KEY = "selectedCustomerAddress";

function getStoredAddresses() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveAddresses(addresses) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(addresses));
}

export function getAddresses() {
  return getStoredAddresses();
}

export function addAddress(addressData) {
  const addresses = getStoredAddresses();

  const newAddress = {
    id: Date.now().toString(),
    ...addressData,
  };

  const updatedAddresses = [...addresses, newAddress];
  saveAddresses(updatedAddresses);

  return newAddress;
}

export function updateAddress(addressId, addressData) {
  const addresses = getStoredAddresses();

  const updatedAddresses = addresses.map((address) =>
    address.id === addressId ? { ...address, ...addressData } : address
  );

  saveAddresses(updatedAddresses);

  return updatedAddresses;
}

export function deleteAddress(addressId) {
  const addresses = getStoredAddresses();

  const updatedAddresses = addresses.filter(
    (address) => address.id !== addressId
  );

  saveAddresses(updatedAddresses);

  const selectedAddress = getSelectedAddress();

  if (selectedAddress?.id === addressId) {
    localStorage.removeItem(SELECTED_ADDRESS_KEY);
  }

  return updatedAddresses;
}

export function selectAddress(address) {
  localStorage.setItem(SELECTED_ADDRESS_KEY, JSON.stringify(address));
}

export function getSelectedAddress() {
  return JSON.parse(localStorage.getItem(SELECTED_ADDRESS_KEY));
}