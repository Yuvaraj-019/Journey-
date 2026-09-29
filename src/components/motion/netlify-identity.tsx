import { useEffect } from "react";

type Identity = {
  on: (event: string, cb: (user?: unknown) => void) => void;
};

export function NetlifyIdentity() {
  useEffect(() => {
    let tries = 0;
    const bind = () => {
      const ni = (window as Window & { netlifyIdentity?: Identity }).netlifyIdentity;
      if (!ni) return false;
      ni.on("init", (user) => {
        if (!user) {
          ni.on("login", () => {
            document.location.href = "/admin/";
          });
        }
      });
      return true;
    };
    if (bind()) return;
    const id = window.setInterval(() => {
      tries += 1;
      if (bind() || tries > 40) window.clearInterval(id);
    }, 250);
    return () => window.clearInterval(id);
  }, []);
  return null;
}
