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
    console.log(error);
  }

  //getUser api endpoint:something like VITE_BASE_URL.join(/user/auth/get/${id})
}
