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
exports.id = "app/api/admin/users/route";
exports.ids = ["app/api/admin/users/route"];
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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fusers%2Froute&page=%2Fapi%2Fadmin%2Fusers%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fusers%2Froute.ts&appDir=C%3A%5CUsers%5Contec%5CVideos%5Cgithub%5CSISTEMA_ADMIN%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Contec%5CVideos%5Cgithub%5CSISTEMA_ADMIN&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fusers%2Froute&page=%2Fapi%2Fadmin%2Fusers%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fusers%2Froute.ts&appDir=C%3A%5CUsers%5Contec%5CVideos%5Cgithub%5CSISTEMA_ADMIN%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Contec%5CVideos%5Cgithub%5CSISTEMA_ADMIN&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_ontec_Videos_github_SISTEMA_ADMIN_src_app_api_admin_users_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/admin/users/route.ts */ \"(rsc)/./src/app/api/admin/users/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/admin/users/route\",\n        pathname: \"/api/admin/users\",\n        filename: \"route\",\n        bundlePath: \"app/api/admin/users/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\ontec\\\\Videos\\\\github\\\\SISTEMA_ADMIN\\\\src\\\\app\\\\api\\\\admin\\\\users\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_ontec_Videos_github_SISTEMA_ADMIN_src_app_api_admin_users_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/admin/users/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhZG1pbiUyRnVzZXJzJTJGcm91dGUmcGFnZT0lMkZhcGklMkZhZG1pbiUyRnVzZXJzJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGYWRtaW4lMkZ1c2VycyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNvbnRlYyU1Q1ZpZGVvcyU1Q2dpdGh1YiU1Q1NJU1RFTUFfQURNSU4lNUNzcmMlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q29udGVjJTVDVmlkZW9zJTVDZ2l0aHViJTVDU0lTVEVNQV9BRE1JTiZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDc0M7QUFDbkg7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zaXN0ZW1hLWFzc2luYXR1cmFzLz8zNjZhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXG9udGVjXFxcXFZpZGVvc1xcXFxnaXRodWJcXFxcU0lTVEVNQV9BRE1JTlxcXFxzcmNcXFxcYXBwXFxcXGFwaVxcXFxhZG1pblxcXFx1c2Vyc1xcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYWRtaW4vdXNlcnMvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hZG1pbi91c2Vyc1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYWRtaW4vdXNlcnMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxvbnRlY1xcXFxWaWRlb3NcXFxcZ2l0aHViXFxcXFNJU1RFTUFfQURNSU5cXFxcc3JjXFxcXGFwcFxcXFxhcGlcXFxcYWRtaW5cXFxcdXNlcnNcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL2FkbWluL3VzZXJzL3JvdXRlXCI7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHNlcnZlckhvb2tzLFxuICAgICAgICBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fusers%2Froute&page=%2Fapi%2Fadmin%2Fusers%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fusers%2Froute.ts&appDir=C%3A%5CUsers%5Contec%5CVideos%5Cgithub%5CSISTEMA_ADMIN%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Contec%5CVideos%5Cgithub%5CSISTEMA_ADMIN&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/admin/users/route.ts":
/*!******************************************!*\
  !*** ./src/app/api/admin/users/route.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./src/lib/auth.ts\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_3__.PrismaClient();\nasync function GET(request) {\n    try {\n        // Verificar se o usuário está logado\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n        if (!session || session.user?.role !== \"admin\") {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Acesso negado\"\n            }, {\n                status: 403\n            });\n        }\n        // Buscar todos os usuários com suas subscriptions\n        const users = await prisma.user.findMany({\n            include: {\n                subscriptions: {\n                    select: {\n                        id: true,\n                        planName: true,\n                        price: true,\n                        status: true\n                    }\n                }\n            },\n            orderBy: {\n                createdAt: \"desc\"\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(users);\n    } catch (error) {\n        console.error(\"Error fetching users:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Erro interno do servidor\"\n        }, {\n            status: 500\n        });\n    }\n}\nasync function POST(request) {\n    try {\n        // Verificar se o usuário está logado\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n        if (!session || session.user?.role !== \"admin\") {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Acesso negado\"\n            }, {\n                status: 403\n            });\n        }\n        const { name, email, password, phone, address, city, state, zipCode, role } = await request.json();\n        // Validar campos obrigatórios\n        if (!name || !email || !password) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Nome, email e senha s\\xe3o obrigat\\xf3rios\"\n            }, {\n                status: 400\n            });\n        }\n        // Verificar se o email já existe\n        const existingUser = await prisma.user.findUnique({\n            where: {\n                email\n            }\n        });\n        if (existingUser) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Email j\\xe1 cadastrado\"\n            }, {\n                status: 400\n            });\n        }\n        // Hash da senha\n        const hashedPassword = await bcryptjs__WEBPACK_IMPORTED_MODULE_4___default().hash(password, 10);\n        // Criar usuário\n        const user = await prisma.user.create({\n            data: {\n                name,\n                email,\n                password: hashedPassword,\n                phone,\n                address,\n                city,\n                state,\n                zipCode,\n                ...role === \"admin\" || role === \"user\" ? {\n                    role\n                } : {}\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: \"Usu\\xe1rio criado com sucesso\",\n            user: {\n                id: user.id,\n                name: user.name,\n                email: user.email\n            }\n        });\n    } catch (error) {\n        console.error(\"Error creating user:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Erro interno do servidor\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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STtnQkFDZkMsT0FBT2xCLEtBQUtrQixLQUFLO1lBQ25CO1FBQ0Y7SUFFRixFQUFFLE9BQU9mLE9BQU87UUFDZFksUUFBUVosS0FBSyxDQUFDLHdCQUF3QkE7UUFDdEMsT0FBT1oscURBQVlBLENBQUNXLElBQUksQ0FBQztZQUFFQyxPQUFPO1FBQTJCLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQ2hGO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zaXN0ZW1hLWFzc2luYXR1cmFzLy4vc3JjL2FwcC9hcGkvYWRtaW4vdXNlcnMvcm91dGUudHM/NjBkYyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInXHJcbmltcG9ydCB7IGdldFNlcnZlclNlc3Npb24gfSBmcm9tICduZXh0LWF1dGgnXHJcbmltcG9ydCB7IGF1dGhPcHRpb25zIH0gZnJvbSAnQC9saWIvYXV0aCdcclxuaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSAnQHByaXNtYS9jbGllbnQnXHJcbmltcG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0anMnXHJcblxyXG5jb25zdCBwcmlzbWEgPSBuZXcgUHJpc21hQ2xpZW50KClcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQocmVxdWVzdDogTmV4dFJlcXVlc3QpIHtcclxuICB0cnkge1xyXG4gICAgLy8gVmVyaWZpY2FyIHNlIG8gdXN1w6FyaW8gZXN0w6EgbG9nYWRvXHJcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2VydmVyU2Vzc2lvbihhdXRoT3B0aW9ucylcclxuICAgIGlmICghc2Vzc2lvbiB8fCAoc2Vzc2lvbi51c2VyIGFzIGFueSk/LnJvbGUgIT09ICdhZG1pbicpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdBY2Vzc28gbmVnYWRvJyB9LCB7IHN0YXR1czogNDAzIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8gQnVzY2FyIHRvZG9zIG9zIHVzdcOhcmlvcyBjb20gc3VhcyBzdWJzY3JpcHRpb25zXHJcbiAgICBjb25zdCB1c2VycyA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRNYW55KHtcclxuICAgICAgaW5jbHVkZToge1xyXG4gICAgICAgIHN1YnNjcmlwdGlvbnM6IHtcclxuICAgICAgICAgIHNlbGVjdDoge1xyXG4gICAgICAgICAgICBpZDogdHJ1ZSxcclxuICAgICAgICAgICAgcGxhbk5hbWU6IHRydWUsXHJcbiAgICAgICAgICAgIHByaWNlOiB0cnVlLFxyXG4gICAgICAgICAgICBzdGF0dXM6IHRydWVcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIG9yZGVyQnk6IHtcclxuICAgICAgICBjcmVhdGVkQXQ6ICdkZXNjJ1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih1c2VycylcclxuXHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIHVzZXJzOicsIGVycm9yKVxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdFcnJvIGludGVybm8gZG8gc2Vydmlkb3InIH0sIHsgc3RhdHVzOiA1MDAgfSlcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcXVlc3Q6IE5leHRSZXF1ZXN0KSB7XHJcbiAgdHJ5IHtcclxuICAgIC8vIFZlcmlmaWNhciBzZSBvIHVzdcOhcmlvIGVzdMOhIGxvZ2Fkb1xyXG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlcnZlclNlc3Npb24oYXV0aE9wdGlvbnMpXHJcbiAgICBpZiAoIXNlc3Npb24gfHwgKHNlc3Npb24udXNlciBhcyBhbnkpPy5yb2xlICE9PSAnYWRtaW4nKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnQWNlc3NvIG5lZ2FkbycgfSwgeyBzdGF0dXM6IDQwMyB9KVxyXG4gICAgfVxyXG5cclxuICBjb25zdCB7IG5hbWUsIGVtYWlsLCBwYXNzd29yZCwgcGhvbmUsIGFkZHJlc3MsIGNpdHksIHN0YXRlLCB6aXBDb2RlLCByb2xlIH0gPSBhd2FpdCByZXF1ZXN0Lmpzb24oKVxyXG5cclxuICAgIC8vIFZhbGlkYXIgY2FtcG9zIG9icmlnYXTDs3Jpb3NcclxuICAgIGlmICghbmFtZSB8fCAhZW1haWwgfHwgIXBhc3N3b3JkKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnTm9tZSwgZW1haWwgZSBzZW5oYSBzw6NvIG9icmlnYXTDs3Jpb3MnIH0sIHsgc3RhdHVzOiA0MDAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyBWZXJpZmljYXIgc2UgbyBlbWFpbCBqw6EgZXhpc3RlXHJcbiAgICBjb25zdCBleGlzdGluZ1VzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcclxuICAgICAgd2hlcmU6IHsgZW1haWwgfVxyXG4gICAgfSlcclxuXHJcbiAgICBpZiAoZXhpc3RpbmdVc2VyKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnRW1haWwgasOhIGNhZGFzdHJhZG8nIH0sIHsgc3RhdHVzOiA0MDAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyBIYXNoIGRhIHNlbmhhXHJcbiAgICBjb25zdCBoYXNoZWRQYXNzd29yZCA9IGF3YWl0IGJjcnlwdC5oYXNoKHBhc3N3b3JkLCAxMClcclxuXHJcbiAgICAvLyBDcmlhciB1c3XDoXJpb1xyXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmNyZWF0ZSh7XHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBuYW1lLFxyXG4gICAgICAgIGVtYWlsLFxyXG4gICAgICAgIHBhc3N3b3JkOiBoYXNoZWRQYXNzd29yZCxcclxuICAgICAgICBwaG9uZSxcclxuICAgICAgICBhZGRyZXNzLFxyXG4gICAgICAgIGNpdHksXHJcbiAgICAgICAgc3RhdGUsXHJcbiAgICAgICAgemlwQ29kZSxcclxuICAgICAgICAuLi4ocm9sZSA9PT0gJ2FkbWluJyB8fCByb2xlID09PSAndXNlcicgPyB7IHJvbGUgfSA6IHt9KVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7XHJcbiAgICAgIG1lc3NhZ2U6ICdVc3XDoXJpbyBjcmlhZG8gY29tIHN1Y2Vzc28nLFxyXG4gICAgICB1c2VyOiB7XHJcbiAgICAgICAgaWQ6IHVzZXIuaWQsXHJcbiAgICAgICAgbmFtZTogdXNlci5uYW1lLFxyXG4gICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsXHJcbiAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBjcmVhdGluZyB1c2VyOicsIGVycm9yKVxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdFcnJvIGludGVybm8gZG8gc2Vydmlkb3InIH0sIHsgc3RhdHVzOiA1MDAgfSlcclxuICB9XHJcbn0iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiZ2V0U2VydmVyU2Vzc2lvbiIsImF1dGhPcHRpb25zIiwiUHJpc21hQ2xpZW50IiwiYmNyeXB0IiwicHJpc21hIiwiR0VUIiwicmVxdWVzdCIsInNlc3Npb24iLCJ1c2VyIiwicm9sZSIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsInVzZXJzIiwiZmluZE1hbnkiLCJpbmNsdWRlIiwic3Vic2NyaXB0aW9ucyIsInNlbGVjdCIsImlkIiwicGxhbk5hbWUiLCJwcmljZSIsIm9yZGVyQnkiLCJjcmVhdGVkQXQiLCJjb25zb2xlIiwiUE9TVCIsIm5hbWUiLCJlbWFpbCIsInBhc3N3b3JkIiwicGhvbmUiLCJhZGRyZXNzIiwiY2l0eSIsInN0YXRlIiwiemlwQ29kZSIsImV4aXN0aW5nVXNlciIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsImhhc2hlZFBhc3N3b3JkIiwiaGFzaCIsImNyZWF0ZSIsImRhdGEiLCJtZXNzYWdlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/admin/users/route.ts\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/@next-auth","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/cookie","vendor-chunks/@panva","vendor-chunks/oidc-token-hash"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fusers%2Froute&page=%2Fapi%2Fadmin%2Fusers%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fusers%2Froute.ts&appDir=C%3A%5CUsers%5Contec%5CVideos%5Cgithub%5CSISTEMA_ADMIN%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Contec%5CVideos%5Cgithub%5CSISTEMA_ADMIN&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();