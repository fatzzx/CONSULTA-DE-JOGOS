const normalizeUrl = (baseUrl, endpoint) => {
  const base = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return base + path;
};

const API_BASE_URL = "https://consulta-jogos-backend-hnh4.vercel.app/";

export const getToken = () => {
  return localStorage.getItem("token");
};

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const apiRequest = async (endpoint, options = {}) => {
  const url = normalizeUrl(API_BASE_URL, endpoint);
  const token = getToken();

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Erro na requisição");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const authAPI = {
  register: async (userData) => {
    return apiRequest("/api/users/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  login: async (credentials) => {
    const data = await apiRequest("/users/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    if (data.token) {
      setToken(data.token);
    }

    return data;
  },

  logout: () => {
    removeToken();
  },
};

export const gamesAPI = {
  search: async (searchParams) => {
    const { search, page = 1, size = 20 } = searchParams;
    const queryParams = new URLSearchParams({
      search,
      page: page.toString(),
      size: size.toString(),
    });

    return apiRequest(`/rawg/search?${queryParams}`);
  },

  getPrice: async (gameName) => {
    const normalizedName = gameName.replace(/:/g, "").trim();
    try {
      const url = normalizeUrl(
        API_BASE_URL,
        `/gamePrice?name=${encodeURIComponent(normalizedName)}`
      );
      const response = await fetch(url);
      const data = await response.json();
      return !data.error ? data : { isFree: true };
    } catch (error) {
      console.error("Error fetching game price:", error);
      return { isFree: true };
    }
  },
};

export const favoritesAPI = {
  getFavorites: async () => {
    return apiRequest("/favorites");
  },

  addFavorite: async (gameData) => {
    return apiRequest("/favorites", {
      method: "POST",
      body: JSON.stringify(gameData),
    });
  },

  removeFavorite: async (favoriteId) => {
    return apiRequest(`/favorites/${favoriteId}`, {
      method: "DELETE",
    });
  },
};
