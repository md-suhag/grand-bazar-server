const app = require("./app");
const connectDB = require("./config/db");
const http = require("http");

const port = process.env.PORT || 5000;

connectDB();
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});

//unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`shutting down the server for ${err.message}`);
  console.log(`shutting down the server for unhandle promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});

// Handling uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server for  handling uncaught exception`);
  process.exit(1);
});
