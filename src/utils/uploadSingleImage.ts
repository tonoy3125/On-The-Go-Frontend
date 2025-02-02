import { baseUrl } from "@/redux/api/baseApi";

export const upLoadSingeImage = async (image: File, token: string) => {
  const form = new FormData();
  form.append("file", image);
  const url = baseUrl + "/post/upload-image";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: form,
  });

  const data = await res.json();
  return data as { data: string };
};
