import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // Replace with your actual backend API URL

export const whitelistAccount = async (senderAddress, account) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/whitelistAccount`, {
      senderAddress,
      account,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const unwhitelistAccount = async (senderAddress, account) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/unwhitelistAccount`, {
      senderAddress,
      account,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const getWhitelistedAccounts = async () => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/getWhitelistedAccounts`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const distributeToWhitelist = async (senderAddress, amount) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/distributeToWhitelist`, {
      senderAddress,
      amount,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const lockTransfer = async (senderAddress) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/lockTransfer`, {
      senderAddress,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const unlockTransfer = async (senderAddress) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/unlockTransfer`, {
      senderAddress,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
