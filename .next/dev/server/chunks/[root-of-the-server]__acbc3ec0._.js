module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/pg [external] (pg, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("pg");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/Desktop/agent-portal-dashboard/lib/controllers/workspaceController.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "getAllWorkspaces",
    ()=>getAllWorkspaces,
    "updateWorkspaceAgentStatus",
    ()=>updateWorkspaceAgentStatus,
    "updateWorkspaceStatus",
    ()=>updateWorkspaceStatus
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/pg [external] (pg, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
// Database connection
const pool = new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__["Pool"]({
    user: process.env.PG_USER || "postgres",
    host: process.env.PG_HOST || "localhost",
    database: process.env.PG_DATABASE || "agent-portal",
    password: process.env.PG_PASSWORD || "postgres12345",
    port: Number(process.env.PG_PORT) || 5432
});
// Map actions to status
const statusMap = {
    login: "active",
    logout: "suspended"
};
// Map actions to agent_status
const agentStatusMap = {
    ready: "READY",
    pause: "PAUSE",
    "in-call": "IN-CALL"
};
async function getAllWorkspaces() {
    try {
        const result = await pool.query("SELECT id, agent_name as agent, status, agent_status as \"agentStatus\" FROM workspaces ORDER BY created_at DESC");
        console.log("Fetched workspaces:", result.rows);
        return {
            success: true,
            data: result.rows
        };
    } catch (error) {
        console.error("Error fetching workspaces:", error);
        return {
            success: false,
            error: "Failed to fetch workspaces"
        };
    }
}
async function updateWorkspaceStatus(workspaceId, action) {
    try {
        if (!statusMap[action]) {
            return {
                success: false,
                error: "Invalid action"
            };
        }
        const newStatus = statusMap[action];
        const autoAgentStatus = action === "login" ? "READY" : "PAUSE";
        console.log(`Updating workspace ${workspaceId} status to ${newStatus} and agent_status to ${autoAgentStatus}`);
        const result = await pool.query("UPDATE workspaces SET status = $1, agent_status = $2 WHERE id = $3 RETURNING *", [
            newStatus,
            autoAgentStatus,
            workspaceId
        ]);
        if (result.rowCount === 0) {
            return {
                success: false,
                error: "Workspace not found"
            };
        }
        return {
            success: true,
            message: "Workspace updated successfully",
            data: result.rows[0]
        };
    } catch (error) {
        console.error("Error updating workspace status:", error);
        return {
            success: false,
            error: "Failed to update workspace"
        };
    }
}
async function updateWorkspaceAgentStatus(workspaceId, action) {
    try {
        if (!agentStatusMap[action]) {
            return {
                success: false,
                error: "Invalid action"
            };
        }
        // Check if user is logged in before allowing agent_status change
        const workspace = await pool.query("SELECT status FROM workspaces WHERE id = $1", [
            workspaceId
        ]);
        if (workspace.rowCount === 0) {
            return {
                success: false,
                error: "Workspace not found"
            };
        }
        const currentStatus = workspace.rows[0].status;
        // Only allow agent_status change if status is "active" (logged in)
        if (currentStatus !== "active") {
            return {
                success: false,
                error: "Cannot change agent status when user is not logged in"
            };
        }
        const newAgentStatus = agentStatusMap[action];
        console.log(`Updating workspace ${workspaceId} agent_status to ${newAgentStatus}`);
        const result = await pool.query("UPDATE workspaces SET agent_status = $1 WHERE id = $2 RETURNING *", [
            newAgentStatus,
            workspaceId
        ]);
        if (result.rowCount === 0) {
            return {
                success: false,
                error: "Workspace not found"
            };
        }
        console.log("Updated workspace:", result.rows[0]);
        return {
            success: true,
            message: "Agent status updated successfully",
            data: result.rows[0]
        };
    } catch (error) {
        console.error("Error updating workspace agent status:", error);
        return {
            success: false,
            error: "Failed to update workspace"
        };
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/Desktop/agent-portal-dashboard/app/api/workspaces/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$agent$2d$portal$2d$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/agent-portal-dashboard/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$agent$2d$portal$2d$dashboard$2f$lib$2f$controllers$2f$workspaceController$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/agent-portal-dashboard/lib/controllers/workspaceController.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$agent$2d$portal$2d$dashboard$2f$lib$2f$controllers$2f$workspaceController$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$agent$2d$portal$2d$dashboard$2f$lib$2f$controllers$2f$workspaceController$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
async function GET(request) {
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$agent$2d$portal$2d$dashboard$2f$lib$2f$controllers$2f$workspaceController$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAllWorkspaces"])();
    if (!result.success) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$agent$2d$portal$2d$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: result.error
        }, {
            status: 500
        });
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$agent$2d$portal$2d$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        workspaces: result.data
    });
}
async function POST(request) {
    try {
        const { workspaceId, action } = await request.json();
        if (!workspaceId || !action) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$agent$2d$portal$2d$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Missing workspaceId or action"
            }, {
                status: 400
            });
        }
        // Handle login/logout actions
        if (action === "login" || action === "logout") {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$agent$2d$portal$2d$dashboard$2f$lib$2f$controllers$2f$workspaceController$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateWorkspaceStatus"])(workspaceId, action);
            if (!result.success) {
                const statusCode = result.error === "Workspace not found" ? 404 : 400;
                return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$agent$2d$portal$2d$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: result.error
                }, {
                    status: statusCode
                });
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$agent$2d$portal$2d$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: result.message,
                workspace: result.data
            });
        } else if (action === "ready" || action === "pause" || action === "in-call") {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$agent$2d$portal$2d$dashboard$2f$lib$2f$controllers$2f$workspaceController$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateWorkspaceAgentStatus"])(workspaceId, action);
            if (!result.success) {
                const statusCode = result.error === "Workspace not found" ? 404 : 400;
                return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$agent$2d$portal$2d$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: result.error
                }, {
                    status: statusCode
                });
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$agent$2d$portal$2d$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: result.message,
                workspace: result.data
            });
        } else {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$agent$2d$portal$2d$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Invalid action"
            }, {
                status: 400
            });
        }
    } catch (error) {
        console.error("Error processing request:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$agent$2d$portal$2d$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to process request"
        }, {
            status: 500
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__acbc3ec0._.js.map