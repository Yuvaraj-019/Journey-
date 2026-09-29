import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { NotFound } from "@/components/not-found";
import { Preloader } from "@/components/motion/preloader";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { Cursor } from "@/components/motion/cursor";
import { PageTransition } from "@/components/motion/page-transition";
import { MotionDirector } from "@/components/motion/director";
import { JourneyRail } from "@/components/motion/journey-rail";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { NetlifyIdentity } from "@/components/motion/netlify-identity";
import { Toaster } from "sonner";
import appCss from "../styles.css?url";

const APP_NAME = "NORTHLINE";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: APP_NAME },
      {
        name: "description",
        content: "NORTHLINE — a personal field journal. Places walked, photographs, film.",
      },
      { name: "theme-color", content: "#0c0c0b" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
    scripts: [{ src: "https://identity.netlify.com/v1/netlify-identity-widget.js" }],
  }),
  notFoundComponent: NotFound,
  component: RootLayout,
});

function RootLayout() {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="bg-bg text-fg">
        <PreviewHostBridge />
        <Preloader />
        <PageTransition />
        <SmoothScroll />
        <MotionDirector />
        <Cursor />
        <ScrollProgress />
        <JourneyRail />
        <NetlifyIdentity />
        <div className="grain" aria-hidden />
        <AuthProvider>
          <SiteHeader />
          <Outlet />
          <SiteFooter />
        </AuthProvider>
        <Toaster
          theme="dark"
          toastOptions={{
            style: {
              background: "#141412",
              border: "1px solid #2c2b26",
              color: "#ebe6dc",
            },
          }}
        />
        <Scripts />
      </body>
    </html>
  );
}
