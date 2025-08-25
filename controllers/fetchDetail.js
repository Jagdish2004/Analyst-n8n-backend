const client = require("../connectDb");

const fetchHistory = async (req, res) => {
    const sqlQuery = 'SELECT DISTINCT ON (session_id) session_id FROM public.n8n_chat_histories LIMIT 10;';
  
    try {
        let result = await client.query(sqlQuery);
        result = result.rows;
        console.log("✅ Fetched history:", result);
        return res.json(result);

      }catch (error) {
            console.error("❌ Error fetching history:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
  
};

const fetchChatHistory = async (req, res) => {
  let sessionId = req.params.sessionId;

  // Use parameterized query to prevent SQL injection
  const sqlQuery = `SELECT * FROM public.n8n_chat_histories WHERE session_id = $1 LIMIT 5;`;

  try {
    let result = await client.query(sqlQuery, [sessionId]);

    console.log("✅ Fetched history:", result.rows);

    // Send only rows to the frontend
    return res.json(result.rows);

  } catch (error) {
    console.error("❌ Error fetching history:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { fetchHistory, fetchChatHistory };
