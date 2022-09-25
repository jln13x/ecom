const headers = {
  headers: {
    "Content-Type": "application/json",
  },
};

export type HttpError = unknown;

export const httpClient = {
  post: async (url: string, body: unknown) => {
    const response = await fetch(url, {
      ...headers,
      method: "POST",
      body: JSON.stringify(body),
      credentials: "include",
    });

    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");

    const data = isJson ? await response.json() : null;

    if (!response.ok) {
      const error = data || response.status;
      return Promise.reject(error);
    }

    return data;
  },

  get: async (url: string, body?: unknown) =>
    (
      await fetch(url, {
        ...headers,
        method: "GET",
        body: JSON.stringify(body),
        credentials: "include",
      })
    ).json(),
};
