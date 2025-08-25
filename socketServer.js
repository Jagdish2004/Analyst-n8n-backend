function socketHandler(io) {
  io.on("connection", (socket) => {
    console.log("✅ Client connected:", socket.id);

    socket.emit("message", { text: "Hello from server!", role: "system" });


    socket.on("message", async (msg) => {
      try {
        // Expect { sessionId, text, role }
        const incoming = typeof msg === 'string' ? { text: msg } : msg
        console.log(`📩 Client (${socket.id}) says:`, incoming);

        // Echo back user message to sender (already handled on client, optional)
        // socket.emit("message", incoming)

        // Default automated reply placeholder
        const automated = {
          sessionId: incoming.sessionId,
          text: `Automated reply to: ${incoming.text}`,
          role: "assistant"
        }

        // Send reply to the same client only for now
        socket.emit("message", automated)
      } catch (err) {
        console.error("Socket handler error:", err)
      }
    });

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });
}

module.exports = socketHandler;
