module.exports = [
"[project]/Desktop/agent-portal-dashboard/instrumentation.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "register",
    ()=>register
]);
async function register() {
    if ("TURBOPACK compile-time truthy", 1) {
        try {
            const { main: seedDatabase } = await __turbopack_context__.A("[project]/Desktop/agent-portal-dashboard/lib/db.ts [instrumentation] (ecmascript, async loader)");
            console.log('🔧 Initializing database...');
            // Set a timeout to prevent blocking app startup
            const timeoutPromise = new Promise((_, reject)=>setTimeout(()=>reject(new Error('Database initialization timeout')), 10000));
            await Promise.race([
                seedDatabase(),
                timeoutPromise
            ]);
            console.log('✓ Database initialization complete!');
        } catch (error) {
            console.error('⚠️ Database initialization warning:', error instanceof Error ? error.message : error);
        // Don't throw - allow app to start even if seeding fails
        }
    }
}
}),
];

//# sourceMappingURL=Desktop_agent-portal-dashboard_instrumentation_ts_d5b3a98d._.js.map