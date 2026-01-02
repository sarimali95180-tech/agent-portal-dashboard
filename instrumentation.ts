export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    try {
      const { main: seedDatabase } = await import('./lib/db');
      console.log('🔧 Initializing database...');
      
      // Set a timeout to prevent blocking app startup
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Database initialization timeout')), 10000)
      );
      
      await Promise.race([seedDatabase(), timeoutPromise]);
      console.log('✓ Database initialization complete!');
    } catch (error) {
      console.error('⚠️ Database initialization warning:', error instanceof Error ? error.message : error);
      // Don't throw - allow app to start even if seeding fails
    }
  }
}
