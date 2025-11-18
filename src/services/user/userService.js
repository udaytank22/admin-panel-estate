import { apiGet } from "../apiclient/apiClient";
import { API_ENDPOINTS } from "../apiclient/apiEndpoints";

export const PeopleData = async () => {
  try {
    const response = await apiGet(API_ENDPOINTS.PEOPLE.PEOPLE);
    console.log('response', response);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching data:', error.message);
    } else {
      console.error('Unknown error occurred:', error);
    }
    throw error;
  }
};

