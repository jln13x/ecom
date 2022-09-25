import { httpClient, HttpError } from "@/lib/http-client";
import { useMutation } from "@tanstack/react-query";
import { ContactFormInput } from "./schema";

export const useContact = () => {
  return useMutation<unknown, HttpError, ContactFormInput>((data) =>
    httpClient.post("/api/contact", data),
  );
};
