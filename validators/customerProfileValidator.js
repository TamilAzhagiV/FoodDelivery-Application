const validateCustomerProfile=(profile)=>{
    if(!profile.addresses||profile.addresses.length===0){
        throw new Error("At least one address is required");
    }
};