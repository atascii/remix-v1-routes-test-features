/** @type {import('@remix-run/dev').AppConfig} */

const {
  createRoutesFromFolders
} = require("@remix-run/v1-route-convention");

module.exports = {
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
  serverModuleFormat: "cjs",
  future: {
    v2_dev: false,
    v2_errorBoundary: false,
    v2_headers: false,
    v2_meta: true,
    v2_normalizeFormMethod: false,
    v2_routeConvention: false,
  },
  routes(defineRoutes) {
    return createRoutesFromFolders(defineRoutes);
  }
};
