import { Pool, Client } from "pg";

// Environment variables
const DB_USER = process.env.PG_USER || "postgres";
const DB_PASSWORD = process.env.PG_PASSWORD || "postgres12345";
const DB_HOST = process.env.PG_HOST || "localhost";
const DB_PORT = Number(process.env.PG_PORT) || 5432;
const DB_NAME = process.env.PG_DATABASE || "agent-portal";

// Function to create database if it doesn't exist
async function ensureDatabase() {
  // Connect to default 'postgres' database first
  const client = new Client({
    user: DB_USER,
    host: DB_HOST,
    database: "postgres",
    password: DB_PASSWORD,
    port: DB_PORT,
  });

  try {
    await client.connect();
    console.log("Connected to PostgreSQL server...");

    // Check if the database exists
    const res = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [DB_NAME]
    );

    if (res.rowCount === 0) {
      console.log(`Database "${DB_NAME}" does not exist. Creating...`);
      await client.query(`CREATE DATABASE ${DB_NAME}`);
      console.log(`Database "${DB_NAME}" created successfully.`);
    } else {
      console.log(`Database "${DB_NAME}" already exists.`);
    }
  } catch (err) {
    console.error("Error checking/creating database:", err);
  } finally {
    await client.end();
  }
}

// Function to create table if it doesn't exist and seed initial data
async function ensureTable() {
  const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: DB_PORT,
  });

  try {
    await pool.connect();
    console.log(`Connected to database "${DB_NAME}"...`);

    // Check if table exists
    const tableRes = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'workspaces'
      )
    `);

    if (!tableRes.rows[0].exists) {
      console.log("Table 'workspaces' does not exist. Creating...");
      await pool.query(`
        CREATE TABLE workspaces (
          id VARCHAR(50) PRIMARY KEY,
          agent_name VARCHAR(100) NOT NULL,
          status VARCHAR(20) NOT NULL DEFAULT 'active',
          agent_status VARCHAR(20) DEFAULT 'offline',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log("Table 'workspaces' created successfully.");

      // Seed initial data
      const initialData = [
        { id: "ws_1", agent_name: "Abdul basitt Ali", status: "active", agent_status: "online" },
        { id: "ws_2", agent_name: "112222", status: "active", agent_status: "busy" },
        { id: "ws_3", agent_name: "Innovatech Solutions", status: "suspended", agent_status: "offline" },
      ];

      for (const ws of initialData) {
        await pool.query(
          "INSERT INTO workspaces (id, agent_name, status, agent_status) VALUES ($1, $2, $3, $4)",
          [ws.id, ws.agent_name, ws.status, ws.agent_status]
        );
      }
      console.log("Initial data seeded successfully.");
    } else {
      console.log("Table 'workspaces' already exists.");
      // Check if agent_status column exists, if not add it
      const columnRes = await pool.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.columns 
          WHERE table_schema = 'public' AND table_name = 'workspaces' AND column_name = 'agent_status'
        )
      `);
      
      if (!columnRes.rows[0].exists) {
        console.log("Adding 'agent_status' column to 'workspaces' table...");
        await pool.query(`
          ALTER TABLE workspaces ADD COLUMN agent_status VARCHAR(20) DEFAULT 'offline'
        `);
        console.log("'agent_status' column added successfully.");
      }
    }
  } catch (err) {
    console.error("Error checking/creating table or seeding data:", err);
  } finally {
    await pool.end();
  }
}

// Main function
export async function main() {
  await ensureDatabase();
  await ensureTable();
  console.log("Database setup complete!");
}
