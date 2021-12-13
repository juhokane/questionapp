import { Pool, config } from "../deps.js";
config({ export: true });

console.log(config());

const CONCURRENT_CONNECTIONS = 2;
const connectionPool = new Pool({
  hostname: "ella.db.elephantsql.com",
  database: Deno.env.get('DATABASE'),
  user: Deno.env.get('DATABASE'),
  password: Deno.env.get('PASSWORD'),
  port: 5432,
}, CONCURRENT_CONNECTIONS);

const executeQuery = async (query, ...args) => {
  const response = {};
  let client;

  try {
    client = await connectionPool.connect();
    const result = await client.queryObject(query, ...args);
    if (result.rows) {
      response.rows = result.rows;
    }
  } catch (e) {
    console.log(e);
    response.error = e;
  } finally {
    try {
      await client.release();
    } catch (e) {
      console.log(e);
    }
  }

  return response;
};

export { executeQuery };
