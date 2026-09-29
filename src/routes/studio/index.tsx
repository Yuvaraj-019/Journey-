import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/studio/")({
  component: function StudioRedirect() {
    return <Navigate to="/admin" search={{ edit: undefined }} />;
  },
});
