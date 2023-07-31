import axios from "axios";

/**
 * helper function that calls our api endpoint to get user data from the database
 * @param id the user's id
 * @return the data of the user currently in the database
 */
export async function getUserData(id) {
  try {
    const base_url = import.meta.env.VITE_BASE_URL;
    const endpoint = base_url + "/user/auth/get/" + id;
    return await axios.get(endpoint); //call api at our endpoint
  } catch (error) {
    console.error(error);
    return error.response.request.status;
  }

  //getUser api endpoint:something like VITE_BASE_URL.join(/user/auth/get/${id})
}

export async function getUserDataWithName(username) {
  try {
    const base_url = import.meta.env.VITE_BASE_URL;
    const endpoint = base_url + "/user/auth/getByUsername/" + username;
    return await axios.get(endpoint); //call api at our endpoint
  } catch (error) {
    console.error(error);
    return error.response.request.status;
  }

  //getUser api endpoint:something like VITE_BASE_URL.join(/user/auth/get/${id})
}

// export async function updateUserCookie(id, updateData) {
//   try {
//     const base_url = import.meta.env.VITE_BASE_URL;
//     const endpoint = base_url + "/user/auth/update-cookies/" + id;
//     return await axios.put(endpoint, updateData); //call api at our endpoint to update the cookies
//   } catch (error) {
//     console.error(error);
//     return error.response.request.status;
//   }
// }

/**
 * helper function that calls the plaid api endpoint to get the link token
 * @param username the user's username
 * @return object containing the link_token
 */
export async function getLinkToken(username) {
  try {
    const base_url = import.meta.env.VITE_BASE_URL;
    const endpoint = base_url + "/plaid/create_link_token/" + username;
    return await axios.post(endpoint); //call plaid api
  } catch (error) {
    console.error(error);
    return error.response.request.status;
  }
}

/**
 * helper function that calls the plaid api endpoint to get the access token
 * @param publicToken the user's public token
 * @return the object containing the access token for the user's banking info
 */
export async function getAccessToken(publicToken) {
  try {
    const base_url = import.meta.env.VITE_BASE_URL;
    const endpoint = base_url + "/plaid/exchange_public_token";
    return await axios.post(endpoint, { public_token: publicToken }); //call plaid api passing in the endpoint and json data
  } catch (error) {
    console.error(error);
    return error.response.request.status;
  }
}
