import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/log")({
  component: function LogRedirect() {
    return <Navigate to="/admin" search={{ edit: undefined }} />;
  },
  validateSearch: (search: Record<string, unknown>) => ({
    slug: typeof search.slug === "string" ? search.slug : undefined,
  }),
});
