import { apiGet, apiPost, apiPut } from "../apiclient/apiClient";
import { API_ENDPOINTS } from "../apiclient/apiEndpoints";

export const Announcement = async (page = 1) => {
  try {
    const response = await apiGet(
      `${API_ENDPOINTS.ANOUNCEMETS.ANOUNCEMETS}?response_format=standard`,
    );
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

export const UpdateAnnouncement = async (announcementId, data) => {
  try {
    const response = await apiPut(
      `${API_ENDPOINTS.ANOUNCEMETS.ANOUNCEMETS}${announcementId}/`,
      data,
    );

    const status = response.status || 200;

    if (status >= 200 && status < 300) {
      return { success: true, message: response.message, status };
    } else if (status >= 400 && status < 500) {
      return { success: false, message: response.message, status };
    } else if (status >= 500) {
      return { success: false, message: response.message, status };
    } else {
      return { success: false, message: 'Unexpected response', status };
    }
  } catch (error) {
    if (error instanceof Error)
      console.error('Error in adding amenities:', error.message);
    // Return a default status for network/error
    return {
      success: false,
      message: 'Network error. Try again later.',
      status: 0,
    };
  }
};


export const AddAnnouncementData = async (data) => {
  console.log('api call')
  console.log('data api', data)
  try {
    const response = await apiPost(API_ENDPOINTS.ANOUNCEMETS.ANOUNCEMETS, data);

    const status = response.status || 200;

    if (status >= 200 && status < 300) {
      return { success: true, message: response.message, status };
    } else if (status >= 400 && status < 500) {
      return { success: false, message: response.message, status };
    } else if (status >= 500) {
      return { success: false, message: response.message, status };
    } else {
      return { success: false, message: 'Unexpected response', status };
    }
  } catch (error) {
    if (error instanceof Error)
      console.error('Error in adding amenities:', error.message);
    return {
      success: false,
      message: 'Network error. Try again later.',
      status: 0,
    };
  }
};
