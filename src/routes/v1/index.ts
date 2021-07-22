import express from "express";
import config from "@/config/config";
import authRoute from "./auth.route";
import userRoute from "./user.route";
import docsRoute from "./docs.route";

const router = express.Router();

// Root Route
// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.get("/", (req, res, next) => {
  res.json({
    message: "Pong!",
  });
});

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: "/docs",
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === "development") {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
