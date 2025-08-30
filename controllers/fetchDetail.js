const client = require("../connectDb");

const fetchHistory = async (req, res) => {
    const sqlQuery = 'SELECT * FROM public.chat_sessions_2 ORDER BY updated_at DESC;';
  
    try {
        let result = await client.query(sqlQuery);
        result = result.rows;

        return res.json(result);

      }catch (error) {
            console.error("❌ Error fetching history:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
  
};

const fetchChatHistory = async (req, res) => {
  let sessionId = req.params.sessionId;

  // Use parameterized query to prevent SQL injection
  const sqlQuery = `SELECT * FROM public.chat_histories_2 WHERE session_id = $1 ORDER BY created_at ASC;`;

  try {
    let result = await client.query(sqlQuery, [sessionId]);

    // console.log("✅ Fetched history:", result.rows);

    // Send only rows to the frontend
    return res.json(result.rows);

  } catch (error) {
    console.error("❌ Error fetching history:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const createSession = async (req, res) => {
  const { name } = req.body ||"Unnamed Session";
  const query = 'INSERT INTO public.chat_sessions_2 (title) VALUES ($1) RETURNING session_id;';

  const sessionId = await client.query(query, [name]);

  return res.json({ sessionId: sessionId.rows[0].session_id });

}

const newChat = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { message } = req.body;

    const responseFromN8N = await fetch(process.env.N8N_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        session_id: sessionId,
      }),
    });

    const data = await responseFromN8N.json();

    // N8N returns an array: [ { output: "..." } ]
    const reply = data[0]?.output || "No response from N8N";

    // ✅ Send clean format to frontend
    return res.json({ message: reply });
  } catch (error) {
    console.error("Error in newChat:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { fetchHistory, fetchChatHistory, createSession, newChat };
