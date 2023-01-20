const koa = require("koa");
const app = new koa();
const logger = require("koa-logger");

const PORT = process.env.PORT || 5000;

const cors = require("cors");

// Middleware
app.use(
	logger((str, args) => {
		// Default log is process.stdout (console.log function)
		// Redirect koa logger to other pipelines
		console.log(str, args);
	})
);

app.listen(PORT);
