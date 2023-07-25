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
