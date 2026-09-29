import { create } from "zustand";
import { persist } from "zustand/middleware";
import { uid } from "./utils";

export type ContactMessage = {
  id: string;
  name: string;
  intent: string;
  detail: string;
  reach: string;
  at: string;
};

type FieldState = {
  messages: ContactMessage[];
  addMessage: (input: Omit<ContactMessage, "id" | "at">) => void;
};

export const useFieldStore = create<FieldState>()(
  persist(
    (set, get) => ({
      messages: [],
      addMessage: (input) =>
        set({
          messages: [
            {
              ...input,
              id: uid("msg"),
              at: new Date().toISOString(),
            },
            ...get().messages,
          ],
        }),
    }),
    { name: "northline-field-log" },
  ),
);
