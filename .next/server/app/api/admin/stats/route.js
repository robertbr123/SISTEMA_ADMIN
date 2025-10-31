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
exports.id = "app/api/admin/stats/route";
exports.ids = ["app/api/admin/stats/route"];
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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fstats%2Froute&page=%2Fapi%2Fadmin%2Fstats%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fstats%2Froute.ts&appDir=C%3A%5CUsers%5Contec%5CVideos%5Cgithub%5CSISTEMA_ADMIN%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Contec%5CVideos%5Cgithub%5CSISTEMA_ADMIN&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fstats%2Froute&page=%2Fapi%2Fadmin%2Fstats%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fstats%2Froute.ts&appDir=C%3A%5CUsers%5Contec%5CVideos%5Cgithub%5CSISTEMA_ADMIN%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Contec%5CVideos%5Cgithub%5CSISTEMA_ADMIN&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_ontec_Videos_github_SISTEMA_ADMIN_src_app_api_admin_stats_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/admin/stats/route.ts */ \"(rsc)/./src/app/api/admin/stats/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/admin/stats/route\",\n        pathname: \"/api/admin/stats\",\n        filename: \"route\",\n        bundlePath: \"app/api/admin/stats/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\ontec\\\\Videos\\\\github\\\\SISTEMA_ADMIN\\\\src\\\\app\\\\api\\\\admin\\\\stats\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_ontec_Videos_github_SISTEMA_ADMIN_src_app_api_admin_stats_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/admin/stats/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhZG1pbiUyRnN0YXRzJTJGcm91dGUmcGFnZT0lMkZhcGklMkZhZG1pbiUyRnN0YXRzJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGYWRtaW4lMkZzdGF0cyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNvbnRlYyU1Q1ZpZGVvcyU1Q2dpdGh1YiU1Q1NJU1RFTUFfQURNSU4lNUNzcmMlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q29udGVjJTVDVmlkZW9zJTVDZ2l0aHViJTVDU0lTVEVNQV9BRE1JTiZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDc0M7QUFDbkg7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zaXN0ZW1hLWFzc2luYXR1cmFzLz83M2QzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXG9udGVjXFxcXFZpZGVvc1xcXFxnaXRodWJcXFxcU0lTVEVNQV9BRE1JTlxcXFxzcmNcXFxcYXBwXFxcXGFwaVxcXFxhZG1pblxcXFxzdGF0c1xcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYWRtaW4vc3RhdHMvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hZG1pbi9zdGF0c1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYWRtaW4vc3RhdHMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxvbnRlY1xcXFxWaWRlb3NcXFxcZ2l0aHViXFxcXFNJU1RFTUFfQURNSU5cXFxcc3JjXFxcXGFwcFxcXFxhcGlcXFxcYWRtaW5cXFxcc3RhdHNcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL2FkbWluL3N0YXRzL3JvdXRlXCI7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHNlcnZlckhvb2tzLFxuICAgICAgICBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fstats%2Froute&page=%2Fapi%2Fadmin%2Fstats%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fstats%2Froute.ts&appDir=C%3A%5CUsers%5Contec%5CVideos%5Cgithub%5CSISTEMA_ADMIN%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Contec%5CVideos%5Cgithub%5CSISTEMA_ADMIN&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/admin/stats/route.ts":
/*!******************************************!*\
  !*** ./src/app/api/admin/stats/route.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./src/lib/auth.ts\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_3__.PrismaClient();\nasync function GET(request) {\n    try {\n        // Verificar se o usuário está logado\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n        if (!session) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Acesso negado\"\n            }, {\n                status: 403\n            });\n        }\n        // Buscar estatísticas básicas\n        const [totalUsers, activeSubscriptions, recentUsers, subscriptionsByPlan, usersByStatus] = await Promise.all([\n            // Estatísticas principais\n            prisma.user.count(),\n            prisma.subscription.count({\n                where: {\n                    status: \"active\"\n                }\n            }),\n            // Usuários recentes (últimos 7 dias)\n            prisma.user.count({\n                where: {\n                    createdAt: {\n                        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)\n                    }\n                }\n            }),\n            // Assinaturas por plano\n            prisma.subscription.groupBy({\n                by: [\n                    \"planName\"\n                ],\n                _count: {\n                    planName: true\n                }\n            }),\n            // Usuários por status de atividade\n            prisma.user.groupBy({\n                by: [\n                    \"createdAt\"\n                ],\n                _count: {\n                    id: true\n                }\n            })\n        ]);\n        // Processamento de dados para gráficos\n        const planDistribution = subscriptionsByPlan.map((plan)=>({\n                name: plan.planName,\n                value: plan._count.planName\n            }));\n        // Simular dados de infraestrutura (pode ser expandido com APIs reais)\n        const mikrotikDevices = 12 // Pode vir de API real do Mikrotik\n        ;\n        const proxmoxServers = 3 // Pode vir de API real do Proxmox\n        ;\n        const activeConnections = 156 // Conexões ativas\n        ;\n        const domainCount = 45 // Domínios gerenciados\n        ;\n        const networkDevices = 28 // Dispositivos de rede\n        ;\n        const systemUptime = 99.8 // Uptime do sistema\n        ;\n        // Gráfico de atividade por semana\n        const weeklyActivity = [];\n        for(let i = 6; i >= 0; i--){\n            const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);\n            const dayName = date.toLocaleDateString(\"pt-BR\", {\n                weekday: \"short\"\n            });\n            weeklyActivity.push({\n                day: dayName,\n                connections: Math.floor(Math.random() * 50) + 20,\n                devices: Math.floor(Math.random() * 10) + 5\n            });\n        }\n        // Status dos serviços\n        const serviceStatus = [\n            {\n                name: \"Mikrotik Online\",\n                value: mikrotikDevices - 1,\n                color: \"#10b981\"\n            },\n            {\n                name: \"Mikrotik Offline\",\n                value: 1,\n                color: \"#ef4444\"\n            },\n            {\n                name: \"Proxmox Ativo\",\n                value: proxmoxServers,\n                color: \"#3b82f6\"\n            },\n            {\n                name: \"Dom\\xednios Ativos\",\n                value: domainCount,\n                color: \"#8b5cf6\"\n            }\n        ];\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            // Métricas principais\n            totalUsers,\n            activeSubscriptions,\n            recentUsers,\n            // Infraestrutura\n            infrastructure: {\n                mikrotikDevices,\n                proxmoxServers,\n                activeConnections,\n                domainCount,\n                networkDevices,\n                systemUptime\n            },\n            // Dados para gráficos\n            weeklyActivity,\n            planDistribution,\n            serviceStatus,\n            // Métricas calculadas\n            averageDevicesPerUser: totalUsers > 0 ? (mikrotikDevices / totalUsers).toFixed(1) : 0,\n            systemHealth: systemUptime\n        });\n    } catch (error) {\n        console.error(\"Error fetching admin stats:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Erro interno do servidor\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9hZG1pbi9zdGF0cy9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQXVEO0FBQ1g7QUFDSjtBQUNLO0FBRTdDLE1BQU1JLFNBQVMsSUFBSUQsd0RBQVlBO0FBRXhCLGVBQWVFLElBQUlDLE9BQW9CO0lBQzVDLElBQUk7UUFDRixxQ0FBcUM7UUFDckMsTUFBTUMsVUFBVSxNQUFNTiwyREFBZ0JBLENBQUNDLGtEQUFXQTtRQUNsRCxJQUFJLENBQUNLLFNBQVM7WUFDWixPQUFPUCxxREFBWUEsQ0FBQ1EsSUFBSSxDQUFDO2dCQUFFQyxPQUFPO1lBQWdCLEdBQUc7Z0JBQUVDLFFBQVE7WUFBSTtRQUNyRTtRQUVBLDhCQUE4QjtRQUM5QixNQUFNLENBQ0pDLFlBQ0FDLHFCQUNBQyxhQUNBQyxxQkFDQUMsY0FDRCxHQUFHLE1BQU1DLFFBQVFDLEdBQUcsQ0FBQztZQUNwQiwwQkFBMEI7WUFDMUJiLE9BQU9jLElBQUksQ0FBQ0MsS0FBSztZQUNqQmYsT0FBT2dCLFlBQVksQ0FBQ0QsS0FBSyxDQUFDO2dCQUFFRSxPQUFPO29CQUFFWCxRQUFRO2dCQUFTO1lBQUU7WUFFeEQscUNBQXFDO1lBQ3JDTixPQUFPYyxJQUFJLENBQUNDLEtBQUssQ0FBQztnQkFDaEJFLE9BQU87b0JBQ0xDLFdBQVc7d0JBQ1RDLEtBQUssSUFBSUMsS0FBS0EsS0FBS0MsR0FBRyxLQUFLLElBQUksS0FBSyxLQUFLLEtBQUs7b0JBQ2hEO2dCQUNGO1lBQ0Y7WUFFQSx3QkFBd0I7WUFDeEJyQixPQUFPZ0IsWUFBWSxDQUFDTSxPQUFPLENBQUM7Z0JBQzFCQyxJQUFJO29CQUFDO2lCQUFXO2dCQUNoQkMsUUFBUTtvQkFBRUMsVUFBVTtnQkFBSztZQUMzQjtZQUVBLG1DQUFtQztZQUNuQ3pCLE9BQU9jLElBQUksQ0FBQ1EsT0FBTyxDQUFDO2dCQUNsQkMsSUFBSTtvQkFBQztpQkFBWTtnQkFDakJDLFFBQVE7b0JBQUVFLElBQUk7Z0JBQUs7WUFDckI7U0FDRDtRQUVELHVDQUF1QztRQUN2QyxNQUFNQyxtQkFBbUJqQixvQkFBb0JrQixHQUFHLENBQUMsQ0FBQ0MsT0FBZTtnQkFDL0RDLE1BQU1ELEtBQUtKLFFBQVE7Z0JBQ25CTSxPQUFPRixLQUFLTCxNQUFNLENBQUNDLFFBQVE7WUFDN0I7UUFFQSxzRUFBc0U7UUFDdEUsTUFBTU8sa0JBQWtCLEdBQUcsbUNBQW1DOztRQUM5RCxNQUFNQyxpQkFBaUIsRUFBSSxrQ0FBa0M7O1FBQzdELE1BQU1DLG9CQUFvQixJQUFJLGtCQUFrQjs7UUFDaEQsTUFBTUMsY0FBYyxHQUFPLHVCQUF1Qjs7UUFDbEQsTUFBTUMsaUJBQWlCLEdBQUksdUJBQXVCOztRQUNsRCxNQUFNQyxlQUFlLEtBQU0sb0JBQW9COztRQUUvQyxrQ0FBa0M7UUFDbEMsTUFBTUMsaUJBQWlCLEVBQUU7UUFDekIsSUFBSyxJQUFJQyxJQUFJLEdBQUdBLEtBQUssR0FBR0EsSUFBSztZQUMzQixNQUFNQyxPQUFPLElBQUlwQixLQUFLQSxLQUFLQyxHQUFHLEtBQUtrQixJQUFJLEtBQUssS0FBSyxLQUFLO1lBQ3RELE1BQU1FLFVBQVVELEtBQUtFLGtCQUFrQixDQUFDLFNBQVM7Z0JBQUVDLFNBQVM7WUFBUTtZQUVwRUwsZUFBZU0sSUFBSSxDQUFDO2dCQUNsQkMsS0FBS0o7Z0JBQ0xLLGFBQWFDLEtBQUtDLEtBQUssQ0FBQ0QsS0FBS0UsTUFBTSxLQUFLLE1BQU07Z0JBQzlDQyxTQUFTSCxLQUFLQyxLQUFLLENBQUNELEtBQUtFLE1BQU0sS0FBSyxNQUFNO1lBQzVDO1FBQ0Y7UUFFQSxzQkFBc0I7UUFDdEIsTUFBTUUsZ0JBQWdCO1lBQ3BCO2dCQUFFckIsTUFBTTtnQkFBbUJDLE9BQU9DLGtCQUFrQjtnQkFBR29CLE9BQU87WUFBVTtZQUN4RTtnQkFBRXRCLE1BQU07Z0JBQW9CQyxPQUFPO2dCQUFHcUIsT0FBTztZQUFVO1lBQ3ZEO2dCQUFFdEIsTUFBTTtnQkFBaUJDLE9BQU9FO2dCQUFnQm1CLE9BQU87WUFBVTtZQUNqRTtnQkFBRXRCLE1BQU07Z0JBQW1CQyxPQUFPSTtnQkFBYWlCLE9BQU87WUFBVTtTQUNqRTtRQUVELE9BQU94RCxxREFBWUEsQ0FBQ1EsSUFBSSxDQUFDO1lBQ3ZCLHNCQUFzQjtZQUN0Qkc7WUFDQUM7WUFDQUM7WUFFQSxpQkFBaUI7WUFDakI0QyxnQkFBZ0I7Z0JBQ2RyQjtnQkFDQUM7Z0JBQ0FDO2dCQUNBQztnQkFDQUM7Z0JBQ0FDO1lBQ0Y7WUFFQSxzQkFBc0I7WUFDdEJDO1lBQ0FYO1lBQ0F3QjtZQUVBLHNCQUFzQjtZQUN0QkcsdUJBQXVCL0MsYUFBYSxJQUFJLENBQUN5QixrQkFBa0J6QixVQUFTLEVBQUdnRCxPQUFPLENBQUMsS0FBSztZQUNwRkMsY0FBY25CO1FBQ2hCO0lBRUYsRUFBRSxPQUFPaEMsT0FBTztRQUNkb0QsUUFBUXBELEtBQUssQ0FBQywrQkFBK0JBO1FBQzdDLE9BQU9ULHFEQUFZQSxDQUFDUSxJQUFJLENBQUM7WUFBRUMsT0FBTztRQUEyQixHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUNoRjtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2lzdGVtYS1hc3NpbmF0dXJhcy8uL3NyYy9hcHAvYXBpL2FkbWluL3N0YXRzL3JvdXRlLnRzPzlmMmEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJ1xyXG5pbXBvcnQgeyBnZXRTZXJ2ZXJTZXNzaW9uIH0gZnJvbSAnbmV4dC1hdXRoJ1xyXG5pbXBvcnQgeyBhdXRoT3B0aW9ucyB9IGZyb20gJ0AvbGliL2F1dGgnXHJcbmltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gJ0BwcmlzbWEvY2xpZW50J1xyXG5cclxuY29uc3QgcHJpc21hID0gbmV3IFByaXNtYUNsaWVudCgpXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKHJlcXVlc3Q6IE5leHRSZXF1ZXN0KSB7XHJcbiAgdHJ5IHtcclxuICAgIC8vIFZlcmlmaWNhciBzZSBvIHVzdcOhcmlvIGVzdMOhIGxvZ2Fkb1xyXG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlcnZlclNlc3Npb24oYXV0aE9wdGlvbnMpXHJcbiAgICBpZiAoIXNlc3Npb24pIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdBY2Vzc28gbmVnYWRvJyB9LCB7IHN0YXR1czogNDAzIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8gQnVzY2FyIGVzdGF0w61zdGljYXMgYsOhc2ljYXNcclxuICAgIGNvbnN0IFtcclxuICAgICAgdG90YWxVc2VycywgXHJcbiAgICAgIGFjdGl2ZVN1YnNjcmlwdGlvbnMsXHJcbiAgICAgIHJlY2VudFVzZXJzLFxyXG4gICAgICBzdWJzY3JpcHRpb25zQnlQbGFuLFxyXG4gICAgICB1c2Vyc0J5U3RhdHVzXHJcbiAgICBdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xyXG4gICAgICAvLyBFc3RhdMOtc3RpY2FzIHByaW5jaXBhaXNcclxuICAgICAgcHJpc21hLnVzZXIuY291bnQoKSxcclxuICAgICAgcHJpc21hLnN1YnNjcmlwdGlvbi5jb3VudCh7IHdoZXJlOiB7IHN0YXR1czogJ2FjdGl2ZScgfSB9KSxcclxuICAgICAgXHJcbiAgICAgIC8vIFVzdcOhcmlvcyByZWNlbnRlcyAow7psdGltb3MgNyBkaWFzKVxyXG4gICAgICBwcmlzbWEudXNlci5jb3VudCh7XHJcbiAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgIGNyZWF0ZWRBdDoge1xyXG4gICAgICAgICAgICBndGU6IG5ldyBEYXRlKERhdGUubm93KCkgLSA3ICogMjQgKiA2MCAqIDYwICogMTAwMClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pLFxyXG4gICAgICBcclxuICAgICAgLy8gQXNzaW5hdHVyYXMgcG9yIHBsYW5vXHJcbiAgICAgIHByaXNtYS5zdWJzY3JpcHRpb24uZ3JvdXBCeSh7XHJcbiAgICAgICAgYnk6IFsncGxhbk5hbWUnXSxcclxuICAgICAgICBfY291bnQ6IHsgcGxhbk5hbWU6IHRydWUgfVxyXG4gICAgICB9KSxcclxuICAgICAgXHJcbiAgICAgIC8vIFVzdcOhcmlvcyBwb3Igc3RhdHVzIGRlIGF0aXZpZGFkZVxyXG4gICAgICBwcmlzbWEudXNlci5ncm91cEJ5KHtcclxuICAgICAgICBieTogWydjcmVhdGVkQXQnXSxcclxuICAgICAgICBfY291bnQ6IHsgaWQ6IHRydWUgfVxyXG4gICAgICB9KVxyXG4gICAgXSlcclxuXHJcbiAgICAvLyBQcm9jZXNzYW1lbnRvIGRlIGRhZG9zIHBhcmEgZ3LDoWZpY29zXHJcbiAgICBjb25zdCBwbGFuRGlzdHJpYnV0aW9uID0gc3Vic2NyaXB0aW9uc0J5UGxhbi5tYXAoKHBsYW46IGFueSkgPT4gKHtcclxuICAgICAgbmFtZTogcGxhbi5wbGFuTmFtZSxcclxuICAgICAgdmFsdWU6IHBsYW4uX2NvdW50LnBsYW5OYW1lXHJcbiAgICB9KSlcclxuXHJcbiAgICAvLyBTaW11bGFyIGRhZG9zIGRlIGluZnJhZXN0cnV0dXJhIChwb2RlIHNlciBleHBhbmRpZG8gY29tIEFQSXMgcmVhaXMpXHJcbiAgICBjb25zdCBtaWtyb3Rpa0RldmljZXMgPSAxMiAvLyBQb2RlIHZpciBkZSBBUEkgcmVhbCBkbyBNaWtyb3Rpa1xyXG4gICAgY29uc3QgcHJveG1veFNlcnZlcnMgPSAzICAgLy8gUG9kZSB2aXIgZGUgQVBJIHJlYWwgZG8gUHJveG1veFxyXG4gICAgY29uc3QgYWN0aXZlQ29ubmVjdGlvbnMgPSAxNTYgLy8gQ29uZXjDtWVzIGF0aXZhc1xyXG4gICAgY29uc3QgZG9tYWluQ291bnQgPSA0NSAgICAgLy8gRG9tw61uaW9zIGdlcmVuY2lhZG9zXHJcbiAgICBjb25zdCBuZXR3b3JrRGV2aWNlcyA9IDI4ICAvLyBEaXNwb3NpdGl2b3MgZGUgcmVkZVxyXG4gICAgY29uc3Qgc3lzdGVtVXB0aW1lID0gOTkuOCAgLy8gVXB0aW1lIGRvIHNpc3RlbWFcclxuXHJcbiAgICAvLyBHcsOhZmljbyBkZSBhdGl2aWRhZGUgcG9yIHNlbWFuYVxyXG4gICAgY29uc3Qgd2Vla2x5QWN0aXZpdHkgPSBbXVxyXG4gICAgZm9yIChsZXQgaSA9IDY7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShEYXRlLm5vdygpIC0gaSAqIDI0ICogNjAgKiA2MCAqIDEwMDApXHJcbiAgICAgIGNvbnN0IGRheU5hbWUgPSBkYXRlLnRvTG9jYWxlRGF0ZVN0cmluZygncHQtQlInLCB7IHdlZWtkYXk6ICdzaG9ydCcgfSlcclxuICAgICAgXHJcbiAgICAgIHdlZWtseUFjdGl2aXR5LnB1c2goe1xyXG4gICAgICAgIGRheTogZGF5TmFtZSxcclxuICAgICAgICBjb25uZWN0aW9uczogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNTApICsgMjAsXHJcbiAgICAgICAgZGV2aWNlczogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgNVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFN0YXR1cyBkb3Mgc2VydmnDp29zXHJcbiAgICBjb25zdCBzZXJ2aWNlU3RhdHVzID0gW1xyXG4gICAgICB7IG5hbWU6ICdNaWtyb3RpayBPbmxpbmUnLCB2YWx1ZTogbWlrcm90aWtEZXZpY2VzIC0gMSwgY29sb3I6ICcjMTBiOTgxJyB9LFxyXG4gICAgICB7IG5hbWU6ICdNaWtyb3RpayBPZmZsaW5lJywgdmFsdWU6IDEsIGNvbG9yOiAnI2VmNDQ0NCcgfSxcclxuICAgICAgeyBuYW1lOiAnUHJveG1veCBBdGl2bycsIHZhbHVlOiBwcm94bW94U2VydmVycywgY29sb3I6ICcjM2I4MmY2JyB9LFxyXG4gICAgICB7IG5hbWU6ICdEb23DrW5pb3MgQXRpdm9zJywgdmFsdWU6IGRvbWFpbkNvdW50LCBjb2xvcjogJyM4YjVjZjYnIH1cclxuICAgIF1cclxuXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xyXG4gICAgICAvLyBNw6l0cmljYXMgcHJpbmNpcGFpc1xyXG4gICAgICB0b3RhbFVzZXJzLFxyXG4gICAgICBhY3RpdmVTdWJzY3JpcHRpb25zLFxyXG4gICAgICByZWNlbnRVc2VycyxcclxuICAgICAgXHJcbiAgICAgIC8vIEluZnJhZXN0cnV0dXJhXHJcbiAgICAgIGluZnJhc3RydWN0dXJlOiB7XHJcbiAgICAgICAgbWlrcm90aWtEZXZpY2VzLFxyXG4gICAgICAgIHByb3htb3hTZXJ2ZXJzLFxyXG4gICAgICAgIGFjdGl2ZUNvbm5lY3Rpb25zLFxyXG4gICAgICAgIGRvbWFpbkNvdW50LFxyXG4gICAgICAgIG5ldHdvcmtEZXZpY2VzLFxyXG4gICAgICAgIHN5c3RlbVVwdGltZVxyXG4gICAgICB9LFxyXG4gICAgICBcclxuICAgICAgLy8gRGFkb3MgcGFyYSBncsOhZmljb3NcclxuICAgICAgd2Vla2x5QWN0aXZpdHksXHJcbiAgICAgIHBsYW5EaXN0cmlidXRpb24sXHJcbiAgICAgIHNlcnZpY2VTdGF0dXMsXHJcbiAgICAgIFxyXG4gICAgICAvLyBNw6l0cmljYXMgY2FsY3VsYWRhc1xyXG4gICAgICBhdmVyYWdlRGV2aWNlc1BlclVzZXI6IHRvdGFsVXNlcnMgPiAwID8gKG1pa3JvdGlrRGV2aWNlcyAvIHRvdGFsVXNlcnMpLnRvRml4ZWQoMSkgOiAwLFxyXG4gICAgICBzeXN0ZW1IZWFsdGg6IHN5c3RlbVVwdGltZVxyXG4gICAgfSlcclxuXHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIGFkbWluIHN0YXRzOicsIGVycm9yKVxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdFcnJvIGludGVybm8gZG8gc2Vydmlkb3InIH0sIHsgc3RhdHVzOiA1MDAgfSlcclxuICB9XHJcbn0iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiZ2V0U2VydmVyU2Vzc2lvbiIsImF1dGhPcHRpb25zIiwiUHJpc21hQ2xpZW50IiwicHJpc21hIiwiR0VUIiwicmVxdWVzdCIsInNlc3Npb24iLCJqc29uIiwiZXJyb3IiLCJzdGF0dXMiLCJ0b3RhbFVzZXJzIiwiYWN0aXZlU3Vic2NyaXB0aW9ucyIsInJlY2VudFVzZXJzIiwic3Vic2NyaXB0aW9uc0J5UGxhbiIsInVzZXJzQnlTdGF0dXMiLCJQcm9taXNlIiwiYWxsIiwidXNlciIsImNvdW50Iiwic3Vic2NyaXB0aW9uIiwid2hlcmUiLCJjcmVhdGVkQXQiLCJndGUiLCJEYXRlIiwibm93IiwiZ3JvdXBCeSIsImJ5IiwiX2NvdW50IiwicGxhbk5hbWUiLCJpZCIsInBsYW5EaXN0cmlidXRpb24iLCJtYXAiLCJwbGFuIiwibmFtZSIsInZhbHVlIiwibWlrcm90aWtEZXZpY2VzIiwicHJveG1veFNlcnZlcnMiLCJhY3RpdmVDb25uZWN0aW9ucyIsImRvbWFpbkNvdW50IiwibmV0d29ya0RldmljZXMiLCJzeXN0ZW1VcHRpbWUiLCJ3ZWVrbHlBY3Rpdml0eSIsImkiLCJkYXRlIiwiZGF5TmFtZSIsInRvTG9jYWxlRGF0ZVN0cmluZyIsIndlZWtkYXkiLCJwdXNoIiwiZGF5IiwiY29ubmVjdGlvbnMiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJkZXZpY2VzIiwic2VydmljZVN0YXR1cyIsImNvbG9yIiwiaW5mcmFzdHJ1Y3R1cmUiLCJhdmVyYWdlRGV2aWNlc1BlclVzZXIiLCJ0b0ZpeGVkIiwic3lzdGVtSGVhbHRoIiwiY29uc29sZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/admin/stats/route.ts\n");

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
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/@next-auth","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/cookie","vendor-chunks/@panva","vendor-chunks/oidc-token-hash"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fstats%2Froute&page=%2Fapi%2Fadmin%2Fstats%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fstats%2Froute.ts&appDir=C%3A%5CUsers%5Contec%5CVideos%5Cgithub%5CSISTEMA_ADMIN%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Contec%5CVideos%5Cgithub%5CSISTEMA_ADMIN&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();