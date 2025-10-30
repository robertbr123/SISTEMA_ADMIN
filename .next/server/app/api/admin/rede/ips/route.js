"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/admin/rede/ips/route";
exports.ids = ["app/api/admin/rede/ips/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Frede%2Fips%2Froute&page=%2Fapi%2Fadmin%2Frede%2Fips%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Frede%2Fips%2Froute.ts&appDir=C%3A%5CUsers%5Contec%5CVideos%5CSISTEMA%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Contec%5CVideos%5CSISTEMA&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Frede%2Fips%2Froute&page=%2Fapi%2Fadmin%2Frede%2Fips%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Frede%2Fips%2Froute.ts&appDir=C%3A%5CUsers%5Contec%5CVideos%5CSISTEMA%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Contec%5CVideos%5CSISTEMA&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_ontec_Videos_SISTEMA_src_app_api_admin_rede_ips_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/admin/rede/ips/route.ts */ \"(rsc)/./src/app/api/admin/rede/ips/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/admin/rede/ips/route\",\n        pathname: \"/api/admin/rede/ips\",\n        filename: \"route\",\n        bundlePath: \"app/api/admin/rede/ips/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\ontec\\\\Videos\\\\SISTEMA\\\\src\\\\app\\\\api\\\\admin\\\\rede\\\\ips\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_ontec_Videos_SISTEMA_src_app_api_admin_rede_ips_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/admin/rede/ips/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhZG1pbiUyRnJlZGUlMkZpcHMlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmFkbWluJTJGcmVkZSUyRmlwcyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmFkbWluJTJGcmVkZSUyRmlwcyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNvbnRlYyU1Q1ZpZGVvcyU1Q1NJU1RFTUElNUNzcmMlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q29udGVjJTVDVmlkZW9zJTVDU0lTVEVNQSZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDNEI7QUFDekc7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zaXN0ZW1hLWFzc2luYXR1cmFzLz81ZTA3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXG9udGVjXFxcXFZpZGVvc1xcXFxTSVNURU1BXFxcXHNyY1xcXFxhcHBcXFxcYXBpXFxcXGFkbWluXFxcXHJlZGVcXFxcaXBzXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hZG1pbi9yZWRlL2lwcy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2FkbWluL3JlZGUvaXBzXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9hZG1pbi9yZWRlL2lwcy9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXG9udGVjXFxcXFZpZGVvc1xcXFxTSVNURU1BXFxcXHNyY1xcXFxhcHBcXFxcYXBpXFxcXGFkbWluXFxcXHJlZGVcXFxcaXBzXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9hZG1pbi9yZWRlL2lwcy9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Frede%2Fips%2Froute&page=%2Fapi%2Fadmin%2Frede%2Fips%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Frede%2Fips%2Froute.ts&appDir=C%3A%5CUsers%5Contec%5CVideos%5CSISTEMA%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Contec%5CVideos%5CSISTEMA&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/admin/rede/ips/route.ts":
/*!*********************************************!*\
  !*** ./src/app/api/admin/rede/ips/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./src/lib/auth.ts\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./src/lib/prisma.ts\");\n\n\n\n\nasync function GET(req) {\n    const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n    if (!session || session.user.role !== \"admin\") return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        error: \"Unauthorized\"\n    }, {\n        status: 401\n    });\n    const { searchParams } = new URL(req.url);\n    const q = (searchParams.get(\"q\") || \"\").trim();\n    const subnetId = searchParams.get(\"subnetId\") || \"\";\n    const deviceId = searchParams.get(\"deviceId\") || \"\";\n    // Ensure dynamic columns exist (SQLite): pppName may be added at runtime by sync route\n    try {\n        await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.$executeRawUnsafe('ALTER TABLE \"NetworkIP\" ADD COLUMN \"pppName\" TEXT');\n    } catch (e) {\n    // ignore if column already exists\n    }\n    // Use raw SQL to include columns not present in Prisma schema (pppName)\n    let where = \"1=1\";\n    const params = [];\n    if (q) {\n        where += ' AND (address LIKE ? OR ifnull(fqdn, \"\") LIKE ? OR ifnull(purpose, \"\") LIKE ? OR ifnull(pppName, \"\") LIKE ? OR ifnull(mac, \"\") LIKE ? OR ifnull(interface, \"\") LIKE ?)';\n        const pattern = `%${q}%`;\n        params.push(pattern, pattern, pattern, pattern, pattern, pattern);\n    }\n    if (subnetId) {\n        where += \" AND subnetId = ?\";\n        params.push(subnetId);\n    }\n    if (deviceId) {\n        where += ' AND ifnull(deviceId, \"\") = ?';\n        params.push(deviceId);\n    }\n    const sql = `SELECT id, address, subnetId, status, deviceId, interface, fqdn, purpose, mac, tags, notes, lastSeen, pppName FROM \"NetworkIP\" WHERE ${where} ORDER BY address ASC`;\n    const rows = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.$queryRawUnsafe(sql, ...params);\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(rows);\n}\nasync function POST(req) {\n    const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n    if (!session || session.user.role !== \"admin\") return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        error: \"Unauthorized\"\n    }, {\n        status: 401\n    });\n    const body = await req.json().catch(()=>({}));\n    const data = {\n        address: body.address,\n        subnetId: body.subnetId,\n        status: body.status || \"AVAILABLE\",\n        deviceId: body.deviceId || null,\n        interface: body.interface || null,\n        fqdn: body.fqdn || null,\n        purpose: body.purpose || null,\n        mac: body.mac || null,\n        tags: body.tags || null,\n        notes: body.notes || null\n    };\n    if (!data.address || !data.subnetId) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        error: \"address and subnetId required\"\n    }, {\n        status: 400\n    });\n    const created = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.networkIP.create({\n        data\n    });\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(created);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9hZG1pbi9yZWRlL2lwcy9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQXVEO0FBQ1g7QUFDSjtBQUNIO0FBRTlCLGVBQWVJLElBQUlDLEdBQWdCO0lBQ3hDLE1BQU1DLFVBQVUsTUFBTUwsMkRBQWdCQSxDQUFDQyxrREFBV0E7SUFDbEQsSUFBSSxDQUFDSSxXQUFXQSxRQUFRQyxJQUFJLENBQUNDLElBQUksS0FBSyxTQUFTLE9BQU9SLHFEQUFZQSxDQUFDUyxJQUFJLENBQUM7UUFBRUMsT0FBTztJQUFlLEdBQUc7UUFBRUMsUUFBUTtJQUFJO0lBQ2pILE1BQU0sRUFBRUMsWUFBWSxFQUFFLEdBQUcsSUFBSUMsSUFBSVIsSUFBSVMsR0FBRztJQUN4QyxNQUFNQyxJQUFJLENBQUNILGFBQWFJLEdBQUcsQ0FBQyxRQUFRLEVBQUMsRUFBR0MsSUFBSTtJQUM1QyxNQUFNQyxXQUFXTixhQUFhSSxHQUFHLENBQUMsZUFBZTtJQUNqRCxNQUFNRyxXQUFXUCxhQUFhSSxHQUFHLENBQUMsZUFBZTtJQUVqRCx1RkFBdUY7SUFDdkYsSUFBSTtRQUNGLE1BQU0sZ0RBQWdCSSxpQkFBaUIsQ0FBQztJQUMxQyxFQUFFLE9BQU9DLEdBQUc7SUFDVixrQ0FBa0M7SUFDcEM7SUFFQSx3RUFBd0U7SUFDeEUsSUFBSUMsUUFBUTtJQUNaLE1BQU1DLFNBQWdCLEVBQUU7SUFDeEIsSUFBSVIsR0FBRztRQUNMTyxTQUFTO1FBQ1QsTUFBTUUsVUFBVSxDQUFDLENBQUMsRUFBRVQsRUFBRSxDQUFDLENBQUM7UUFDeEJRLE9BQU9FLElBQUksQ0FBQ0QsU0FBU0EsU0FBU0EsU0FBU0EsU0FBU0EsU0FBU0E7SUFDM0Q7SUFDQSxJQUFJTixVQUFVO1FBQUVJLFNBQVM7UUFBcUJDLE9BQU9FLElBQUksQ0FBQ1A7SUFBVTtJQUNwRSxJQUFJQyxVQUFVO1FBQUVHLFNBQVM7UUFBaUNDLE9BQU9FLElBQUksQ0FBQ047SUFBVTtJQUVoRixNQUFNTyxNQUFNLENBQUMscUlBQXFJLEVBQUVKLE1BQU0scUJBQXFCLENBQUM7SUFDaEwsTUFBTUssT0FBTyxNQUFNLGdEQUFnQkMsZUFBZSxDQUFDRixRQUFRSDtJQUMzRCxPQUFPdkIscURBQVlBLENBQUNTLElBQUksQ0FBQ2tCO0FBQzNCO0FBRU8sZUFBZUUsS0FBS3hCLEdBQWdCO0lBQ3pDLE1BQU1DLFVBQVUsTUFBTUwsMkRBQWdCQSxDQUFDQyxrREFBV0E7SUFDbEQsSUFBSSxDQUFDSSxXQUFXQSxRQUFRQyxJQUFJLENBQUNDLElBQUksS0FBSyxTQUFTLE9BQU9SLHFEQUFZQSxDQUFDUyxJQUFJLENBQUM7UUFBRUMsT0FBTztJQUFlLEdBQUc7UUFBRUMsUUFBUTtJQUFJO0lBQ2pILE1BQU1tQixPQUFPLE1BQU16QixJQUFJSSxJQUFJLEdBQUdzQixLQUFLLENBQUMsSUFBTyxFQUFDO0lBQzVDLE1BQU1DLE9BQU87UUFDWEMsU0FBU0gsS0FBS0csT0FBTztRQUNyQmYsVUFBVVksS0FBS1osUUFBUTtRQUN2QlAsUUFBUW1CLEtBQUtuQixNQUFNLElBQUk7UUFDdkJRLFVBQVVXLEtBQUtYLFFBQVEsSUFBSTtRQUMzQmUsV0FBV0osS0FBS0ksU0FBUyxJQUFJO1FBQzdCQyxNQUFNTCxLQUFLSyxJQUFJLElBQUk7UUFDbkJDLFNBQVNOLEtBQUtNLE9BQU8sSUFBSTtRQUN6QkMsS0FBS1AsS0FBS08sR0FBRyxJQUFJO1FBQ2pCQyxNQUFNUixLQUFLUSxJQUFJLElBQUk7UUFDbkJDLE9BQU9ULEtBQUtTLEtBQUssSUFBSTtJQUN2QjtJQUNBLElBQUksQ0FBQ1AsS0FBS0MsT0FBTyxJQUFJLENBQUNELEtBQUtkLFFBQVEsRUFBRSxPQUFPbEIscURBQVlBLENBQUNTLElBQUksQ0FBQztRQUFFQyxPQUFPO0lBQWdDLEdBQUc7UUFBRUMsUUFBUTtJQUFJO0lBQ3hILE1BQU02QixVQUFVLE1BQU0sZ0RBQWdCQyxTQUFTLENBQUNDLE1BQU0sQ0FBQztRQUFFVjtJQUFLO0lBQzlELE9BQU9oQyxxREFBWUEsQ0FBQ1MsSUFBSSxDQUFDK0I7QUFDM0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zaXN0ZW1hLWFzc2luYXR1cmFzLy4vc3JjL2FwcC9hcGkvYWRtaW4vcmVkZS9pcHMvcm91dGUudHM/OWNlZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInXHJcbmltcG9ydCB7IGdldFNlcnZlclNlc3Npb24gfSBmcm9tICduZXh0LWF1dGgnXHJcbmltcG9ydCB7IGF1dGhPcHRpb25zIH0gZnJvbSAnQC9saWIvYXV0aCdcclxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSAnQC9saWIvcHJpc21hJ1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVChyZXE6IE5leHRSZXF1ZXN0KSB7XHJcbiAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlcnZlclNlc3Npb24oYXV0aE9wdGlvbnMpXHJcbiAgaWYgKCFzZXNzaW9uIHx8IHNlc3Npb24udXNlci5yb2xlICE9PSAnYWRtaW4nKSByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ1VuYXV0aG9yaXplZCcgfSwgeyBzdGF0dXM6IDQwMSB9KVxyXG4gIGNvbnN0IHsgc2VhcmNoUGFyYW1zIH0gPSBuZXcgVVJMKHJlcS51cmwpXHJcbiAgY29uc3QgcSA9IChzZWFyY2hQYXJhbXMuZ2V0KCdxJykgfHwgJycpLnRyaW0oKVxyXG4gIGNvbnN0IHN1Ym5ldElkID0gc2VhcmNoUGFyYW1zLmdldCgnc3VibmV0SWQnKSB8fCAnJ1xyXG4gIGNvbnN0IGRldmljZUlkID0gc2VhcmNoUGFyYW1zLmdldCgnZGV2aWNlSWQnKSB8fCAnJ1xyXG5cclxuICAvLyBFbnN1cmUgZHluYW1pYyBjb2x1bW5zIGV4aXN0IChTUUxpdGUpOiBwcHBOYW1lIG1heSBiZSBhZGRlZCBhdCBydW50aW1lIGJ5IHN5bmMgcm91dGVcclxuICB0cnkge1xyXG4gICAgYXdhaXQgKHByaXNtYSBhcyBhbnkpLiRleGVjdXRlUmF3VW5zYWZlKCdBTFRFUiBUQUJMRSBcIk5ldHdvcmtJUFwiIEFERCBDT0xVTU4gXCJwcHBOYW1lXCIgVEVYVCcpXHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgLy8gaWdub3JlIGlmIGNvbHVtbiBhbHJlYWR5IGV4aXN0c1xyXG4gIH1cclxuXHJcbiAgLy8gVXNlIHJhdyBTUUwgdG8gaW5jbHVkZSBjb2x1bW5zIG5vdCBwcmVzZW50IGluIFByaXNtYSBzY2hlbWEgKHBwcE5hbWUpXHJcbiAgbGV0IHdoZXJlID0gJzE9MSdcclxuICBjb25zdCBwYXJhbXM6IGFueVtdID0gW11cclxuICBpZiAocSkge1xyXG4gICAgd2hlcmUgKz0gJyBBTkQgKGFkZHJlc3MgTElLRSA/IE9SIGlmbnVsbChmcWRuLCBcIlwiKSBMSUtFID8gT1IgaWZudWxsKHB1cnBvc2UsIFwiXCIpIExJS0UgPyBPUiBpZm51bGwocHBwTmFtZSwgXCJcIikgTElLRSA/IE9SIGlmbnVsbChtYWMsIFwiXCIpIExJS0UgPyBPUiBpZm51bGwoaW50ZXJmYWNlLCBcIlwiKSBMSUtFID8pJ1xyXG4gICAgY29uc3QgcGF0dGVybiA9IGAlJHtxfSVgXHJcbiAgICBwYXJhbXMucHVzaChwYXR0ZXJuLCBwYXR0ZXJuLCBwYXR0ZXJuLCBwYXR0ZXJuLCBwYXR0ZXJuLCBwYXR0ZXJuKVxyXG4gIH1cclxuICBpZiAoc3VibmV0SWQpIHsgd2hlcmUgKz0gJyBBTkQgc3VibmV0SWQgPSA/JzsgcGFyYW1zLnB1c2goc3VibmV0SWQpIH1cclxuICBpZiAoZGV2aWNlSWQpIHsgd2hlcmUgKz0gJyBBTkQgaWZudWxsKGRldmljZUlkLCBcIlwiKSA9ID8nOyBwYXJhbXMucHVzaChkZXZpY2VJZCkgfVxyXG5cclxuICBjb25zdCBzcWwgPSBgU0VMRUNUIGlkLCBhZGRyZXNzLCBzdWJuZXRJZCwgc3RhdHVzLCBkZXZpY2VJZCwgaW50ZXJmYWNlLCBmcWRuLCBwdXJwb3NlLCBtYWMsIHRhZ3MsIG5vdGVzLCBsYXN0U2VlbiwgcHBwTmFtZSBGUk9NIFwiTmV0d29ya0lQXCIgV0hFUkUgJHt3aGVyZX0gT1JERVIgQlkgYWRkcmVzcyBBU0NgXHJcbiAgY29uc3Qgcm93cyA9IGF3YWl0IChwcmlzbWEgYXMgYW55KS4kcXVlcnlSYXdVbnNhZmUoc3FsLCAuLi5wYXJhbXMpXHJcbiAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHJvd3MpXHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcTogTmV4dFJlcXVlc3QpIHtcclxuICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2VydmVyU2Vzc2lvbihhdXRoT3B0aW9ucylcclxuICBpZiAoIXNlc3Npb24gfHwgc2Vzc2lvbi51c2VyLnJvbGUgIT09ICdhZG1pbicpIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnVW5hdXRob3JpemVkJyB9LCB7IHN0YXR1czogNDAxIH0pXHJcbiAgY29uc3QgYm9keSA9IGF3YWl0IHJlcS5qc29uKCkuY2F0Y2goKCkgPT4gKHt9KSlcclxuICBjb25zdCBkYXRhID0ge1xyXG4gICAgYWRkcmVzczogYm9keS5hZGRyZXNzLFxyXG4gICAgc3VibmV0SWQ6IGJvZHkuc3VibmV0SWQsXHJcbiAgICBzdGF0dXM6IGJvZHkuc3RhdHVzIHx8ICdBVkFJTEFCTEUnLFxyXG4gICAgZGV2aWNlSWQ6IGJvZHkuZGV2aWNlSWQgfHwgbnVsbCxcclxuICAgIGludGVyZmFjZTogYm9keS5pbnRlcmZhY2UgfHwgbnVsbCxcclxuICAgIGZxZG46IGJvZHkuZnFkbiB8fCBudWxsLFxyXG4gICAgcHVycG9zZTogYm9keS5wdXJwb3NlIHx8IG51bGwsXHJcbiAgICBtYWM6IGJvZHkubWFjIHx8IG51bGwsXHJcbiAgICB0YWdzOiBib2R5LnRhZ3MgfHwgbnVsbCxcclxuICAgIG5vdGVzOiBib2R5Lm5vdGVzIHx8IG51bGwsXHJcbiAgfVxyXG4gIGlmICghZGF0YS5hZGRyZXNzIHx8ICFkYXRhLnN1Ym5ldElkKSByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ2FkZHJlc3MgYW5kIHN1Ym5ldElkIHJlcXVpcmVkJyB9LCB7IHN0YXR1czogNDAwIH0pXHJcbiAgY29uc3QgY3JlYXRlZCA9IGF3YWl0IChwcmlzbWEgYXMgYW55KS5uZXR3b3JrSVAuY3JlYXRlKHsgZGF0YSB9KVxyXG4gIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihjcmVhdGVkKVxyXG59XHJcbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJnZXRTZXJ2ZXJTZXNzaW9uIiwiYXV0aE9wdGlvbnMiLCJwcmlzbWEiLCJHRVQiLCJyZXEiLCJzZXNzaW9uIiwidXNlciIsInJvbGUiLCJqc29uIiwiZXJyb3IiLCJzdGF0dXMiLCJzZWFyY2hQYXJhbXMiLCJVUkwiLCJ1cmwiLCJxIiwiZ2V0IiwidHJpbSIsInN1Ym5ldElkIiwiZGV2aWNlSWQiLCIkZXhlY3V0ZVJhd1Vuc2FmZSIsImUiLCJ3aGVyZSIsInBhcmFtcyIsInBhdHRlcm4iLCJwdXNoIiwic3FsIiwicm93cyIsIiRxdWVyeVJhd1Vuc2FmZSIsIlBPU1QiLCJib2R5IiwiY2F0Y2giLCJkYXRhIiwiYWRkcmVzcyIsImludGVyZmFjZSIsImZxZG4iLCJwdXJwb3NlIiwibWFjIiwidGFncyIsIm5vdGVzIiwiY3JlYXRlZCIsIm5ldHdvcmtJUCIsImNyZWF0ZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/admin/rede/ips/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/auth.ts":
/*!*************************!*\
  !*** ./src/lib/auth.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var _next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @next-auth/prisma-adapter */ \"(rsc)/./node_modules/@next-auth/prisma-adapter/dist/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./src/lib/prisma.ts\");\n\n\n\n\nconst authOptions = {\n    adapter: (0,_next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_1__.PrismaAdapter)(_lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma),\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            name: \"credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) {\n                    return null;\n                }\n                const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.user.findUnique({\n                    where: {\n                        email: credentials.email\n                    }\n                });\n                if (!user) {\n                    return null;\n                }\n                const isPasswordValid = await bcryptjs__WEBPACK_IMPORTED_MODULE_2___default().compare(credentials.password, user.password);\n                if (!isPasswordValid) {\n                    return null;\n                }\n                return {\n                    id: user.id,\n                    email: user.email,\n                    name: user.name,\n                    role: user.role\n                };\n            }\n        })\n    ],\n    session: {\n        strategy: \"jwt\"\n    },\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.role = user.role;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (token) {\n                session.user.id = token.sub;\n                session.user.role = token.role;\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/login\"\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL2F1dGgudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ2lFO0FBQ1I7QUFDNUI7QUFDUTtBQXdCOUIsTUFBTUksY0FBK0I7SUFDMUNDLFNBQVNKLHdFQUFhQSxDQUFDRSwrQ0FBTUE7SUFDN0JHLFdBQVc7UUFDVE4sMkVBQW1CQSxDQUFDO1lBQ2xCTyxNQUFNO1lBQ05DLGFBQWE7Z0JBQ1hDLE9BQU87b0JBQUVDLE9BQU87b0JBQVNDLE1BQU07Z0JBQVE7Z0JBQ3ZDQyxVQUFVO29CQUFFRixPQUFPO29CQUFZQyxNQUFNO2dCQUFXO1lBQ2xEO1lBQ0EsTUFBTUUsV0FBVUwsV0FBVztnQkFDekIsSUFBSSxDQUFDQSxhQUFhQyxTQUFTLENBQUNELGFBQWFJLFVBQVU7b0JBQ2pELE9BQU87Z0JBQ1Q7Z0JBRUEsTUFBTUUsT0FBTyxNQUFNWCwrQ0FBTUEsQ0FBQ1csSUFBSSxDQUFDQyxVQUFVLENBQUM7b0JBQ3hDQyxPQUFPO3dCQUFFUCxPQUFPRCxZQUFZQyxLQUFLO29CQUFDO2dCQUNwQztnQkFFQSxJQUFJLENBQUNLLE1BQU07b0JBQ1QsT0FBTztnQkFDVDtnQkFFQSxNQUFNRyxrQkFBa0IsTUFBTWYsdURBQWMsQ0FBQ00sWUFBWUksUUFBUSxFQUFFRSxLQUFLRixRQUFRO2dCQUVoRixJQUFJLENBQUNLLGlCQUFpQjtvQkFDcEIsT0FBTztnQkFDVDtnQkFFQSxPQUFPO29CQUNMRSxJQUFJTCxLQUFLSyxFQUFFO29CQUNYVixPQUFPSyxLQUFLTCxLQUFLO29CQUNqQkYsTUFBTU8sS0FBS1AsSUFBSTtvQkFDZmEsTUFBTSxLQUFjQSxJQUFJO2dCQUMxQjtZQUNGO1FBQ0Y7S0FDRDtJQUNEQyxTQUFTO1FBQ1BDLFVBQVU7SUFDWjtJQUNBQyxXQUFXO1FBQ1QsTUFBTUMsS0FBSSxFQUFFQyxLQUFLLEVBQUVYLElBQUksRUFBTztZQUM1QixJQUFJQSxNQUFNO2dCQUNSVyxNQUFNTCxJQUFJLEdBQUdOLEtBQUtNLElBQUk7WUFDeEI7WUFDQSxPQUFPSztRQUNUO1FBQ0EsTUFBTUosU0FBUSxFQUFFQSxPQUFPLEVBQUVJLEtBQUssRUFBTztZQUNuQyxJQUFJQSxPQUFPO2dCQUNUSixRQUFRUCxJQUFJLENBQUNLLEVBQUUsR0FBR00sTUFBTUMsR0FBRztnQkFDM0JMLFFBQVFQLElBQUksQ0FBQ00sSUFBSSxHQUFHSyxNQUFNTCxJQUFJO1lBQ2hDO1lBQ0EsT0FBT0M7UUFDVDtJQUNGO0lBQ0FNLE9BQU87UUFDTEMsUUFBUTtJQUNWO0FBQ0YsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3Npc3RlbWEtYXNzaW5hdHVyYXMvLi9zcmMvbGliL2F1dGgudHM/NjY5MiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0QXV0aE9wdGlvbnMsIERlZmF1bHRTZXNzaW9uIH0gZnJvbSAnbmV4dC1hdXRoJ1xyXG5pbXBvcnQgQ3JlZGVudGlhbHNQcm92aWRlciBmcm9tICduZXh0LWF1dGgvcHJvdmlkZXJzL2NyZWRlbnRpYWxzJ1xyXG5pbXBvcnQgeyBQcmlzbWFBZGFwdGVyIH0gZnJvbSAnQG5leHQtYXV0aC9wcmlzbWEtYWRhcHRlcidcclxuaW1wb3J0IGJjcnlwdCBmcm9tICdiY3J5cHRqcydcclxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSAnQC9saWIvcHJpc21hJ1xyXG5cclxuZGVjbGFyZSBtb2R1bGUgJ25leHQtYXV0aCcge1xyXG4gIGludGVyZmFjZSBTZXNzaW9uIHtcclxuICAgIHVzZXI6IHtcclxuICAgICAgaWQ6IHN0cmluZ1xyXG4gICAgICByb2xlOiBzdHJpbmdcclxuICAgIH0gJiBEZWZhdWx0U2Vzc2lvblsndXNlciddXHJcbiAgfVxyXG59XHJcblxyXG5kZWNsYXJlIG1vZHVsZSAnbmV4dC1hdXRoL2p3dCcge1xyXG4gIGludGVyZmFjZSBKV1Qge1xyXG4gICAgcm9sZTogc3RyaW5nXHJcbiAgfVxyXG59XHJcblxyXG5pbnRlcmZhY2UgVXNlcldpdGhSb2xlIHtcclxuICBpZDogc3RyaW5nXHJcbiAgZW1haWw6IHN0cmluZ1xyXG4gIG5hbWU6IHN0cmluZ1xyXG4gIHJvbGU6IHN0cmluZ1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgYXV0aE9wdGlvbnM6IE5leHRBdXRoT3B0aW9ucyA9IHtcclxuICBhZGFwdGVyOiBQcmlzbWFBZGFwdGVyKHByaXNtYSksXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBDcmVkZW50aWFsc1Byb3ZpZGVyKHtcclxuICAgICAgbmFtZTogJ2NyZWRlbnRpYWxzJyxcclxuICAgICAgY3JlZGVudGlhbHM6IHtcclxuICAgICAgICBlbWFpbDogeyBsYWJlbDogJ0VtYWlsJywgdHlwZTogJ2VtYWlsJyB9LFxyXG4gICAgICAgIHBhc3N3b3JkOiB7IGxhYmVsOiAnUGFzc3dvcmQnLCB0eXBlOiAncGFzc3dvcmQnIH1cclxuICAgICAgfSxcclxuICAgICAgYXN5bmMgYXV0aG9yaXplKGNyZWRlbnRpYWxzKSB7XHJcbiAgICAgICAgaWYgKCFjcmVkZW50aWFscz8uZW1haWwgfHwgIWNyZWRlbnRpYWxzPy5wYXNzd29yZCkge1xyXG4gICAgICAgICAgcmV0dXJuIG51bGxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcclxuICAgICAgICAgIHdoZXJlOiB7IGVtYWlsOiBjcmVkZW50aWFscy5lbWFpbCB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgaWYgKCF1c2VyKSB7XHJcbiAgICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgaXNQYXNzd29yZFZhbGlkID0gYXdhaXQgYmNyeXB0LmNvbXBhcmUoY3JlZGVudGlhbHMucGFzc3dvcmQsIHVzZXIucGFzc3dvcmQpXHJcblxyXG4gICAgICAgIGlmICghaXNQYXNzd29yZFZhbGlkKSB7XHJcbiAgICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGlkOiB1c2VyLmlkLFxyXG4gICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXHJcbiAgICAgICAgICBuYW1lOiB1c2VyLm5hbWUsXHJcbiAgICAgICAgICByb2xlOiAodXNlciBhcyBhbnkpLnJvbGUsXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIF0sXHJcbiAgc2Vzc2lvbjoge1xyXG4gICAgc3RyYXRlZ3k6ICdqd3QnIGFzIGNvbnN0XHJcbiAgfSxcclxuICBjYWxsYmFja3M6IHtcclxuICAgIGFzeW5jIGp3dCh7IHRva2VuLCB1c2VyIH06IGFueSkge1xyXG4gICAgICBpZiAodXNlcikge1xyXG4gICAgICAgIHRva2VuLnJvbGUgPSB1c2VyLnJvbGVcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdG9rZW5cclxuICAgIH0sXHJcbiAgICBhc3luYyBzZXNzaW9uKHsgc2Vzc2lvbiwgdG9rZW4gfTogYW55KSB7XHJcbiAgICAgIGlmICh0b2tlbikge1xyXG4gICAgICAgIHNlc3Npb24udXNlci5pZCA9IHRva2VuLnN1YiFcclxuICAgICAgICBzZXNzaW9uLnVzZXIucm9sZSA9IHRva2VuLnJvbGVcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gc2Vzc2lvblxyXG4gICAgfVxyXG4gIH0sXHJcbiAgcGFnZXM6IHtcclxuICAgIHNpZ25JbjogJy9sb2dpbicsXHJcbiAgfSxcclxufSJdLCJuYW1lcyI6WyJDcmVkZW50aWFsc1Byb3ZpZGVyIiwiUHJpc21hQWRhcHRlciIsImJjcnlwdCIsInByaXNtYSIsImF1dGhPcHRpb25zIiwiYWRhcHRlciIsInByb3ZpZGVycyIsIm5hbWUiLCJjcmVkZW50aWFscyIsImVtYWlsIiwibGFiZWwiLCJ0eXBlIiwicGFzc3dvcmQiLCJhdXRob3JpemUiLCJ1c2VyIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwiaXNQYXNzd29yZFZhbGlkIiwiY29tcGFyZSIsImlkIiwicm9sZSIsInNlc3Npb24iLCJzdHJhdGVneSIsImNhbGxiYWNrcyIsImp3dCIsInRva2VuIiwic3ViIiwicGFnZXMiLCJzaWduSW4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/prisma.ts":
/*!***************************!*\
  !*** ./src/lib/prisma.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nif (true) globalForPrisma.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL3ByaXNtYS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBNkM7QUFFN0MsTUFBTUMsa0JBQWtCQztBQUlqQixNQUFNQyxTQUFTRixnQkFBZ0JFLE1BQU0sSUFBSSxJQUFJSCx3REFBWUEsR0FBRTtBQUVsRSxJQUFJSSxJQUF5QixFQUFjSCxnQkFBZ0JFLE1BQU0sR0FBR0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zaXN0ZW1hLWFzc2luYXR1cmFzLy4vc3JjL2xpYi9wcmlzbWEudHM/MDFkNyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCdcclxuXHJcbmNvbnN0IGdsb2JhbEZvclByaXNtYSA9IGdsb2JhbFRoaXMgYXMgdW5rbm93biBhcyB7XHJcbiAgcHJpc21hOiBQcmlzbWFDbGllbnQgfCB1bmRlZmluZWRcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHByaXNtYSA9IGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPz8gbmV3IFByaXNtYUNsaWVudCgpXHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgZ2xvYmFsRm9yUHJpc21hLnByaXNtYSA9IHByaXNtYSJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJnbG9iYWxGb3JQcmlzbWEiLCJnbG9iYWxUaGlzIiwicHJpc21hIiwicHJvY2VzcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/prisma.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/@next-auth","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/cookie","vendor-chunks/@panva","vendor-chunks/oidc-token-hash"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Frede%2Fips%2Froute&page=%2Fapi%2Fadmin%2Frede%2Fips%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Frede%2Fips%2Froute.ts&appDir=C%3A%5CUsers%5Contec%5CVideos%5CSISTEMA%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Contec%5CVideos%5CSISTEMA&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();