const client = require("../connectDb");

const fetchHistory = async (req, res) => {
    const sqlQuery = 'SELECT  session_id, title FROM public.chat_sessions_2 LIMIT 10;';
  
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
  const sqlQuery = `SELECT * FROM public.chat_histories_2 WHERE session_id = $1 LIMIT 5;`;

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
  const { sessionId } = req.params;
  // console.log("new chat called");
//i will letter going to wite logic
  return res.json({ message: "hello from serer" });
}

module.exports = { fetchHistory, fetchChatHistory, createSession, newChat };
