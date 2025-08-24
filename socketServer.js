function socketHandler(io) {
  io.on("connection", (socket) => {
    console.log("✅ Client connected:", socket.id);

    socket.emit("message", "Hello from server!");


    socket.on("message", (msg) => {
      console.log(`📩 Client (${socket.id}) says:`, msg);
      socket.emit("message", `Server received: ${msg}`);
    });

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });
}

module.exports = socketHandler;
