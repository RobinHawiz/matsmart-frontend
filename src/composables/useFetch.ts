export async function useFetch(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw await res.json();
  }
  return res;
}

export async function useGetData<T>(url: string): Promise<T> {
  const options: RequestInit = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  const res = await useFetch(url, options);
  return (await res.json()) as T;
}

export async function usePostData<T>(url: string, payload: T): Promise<string> {
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
  const res = await useFetch(url, options);
  const location = res.headers.get("Location");
  if (location === null) {
    throw new Error("Server Error: Missing location header contents");
  }
  return new URL(location, url).href;
}

export async function useDeleteData(url: string): Promise<void> {
  const options: RequestInit = {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  await useFetch(url, options);
}

export async function usePutData<T>(url: string, payload: T): Promise<void> {
  const options: RequestInit = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify(payload),
  };
  await useFetch(url, options);
}

export async function usePatchData<T>(url: string, payload: T): Promise<void> {
  const options: RequestInit = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify(payload),
  };
  await useFetch(url, options);
}
