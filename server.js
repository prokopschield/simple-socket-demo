const { port, print, readline } = require("./helpers");

const { Server } = require("@prokopschield/simple-socket-server");

async function main() {
	const server = new Server(
		{
			// options go here
		},
		{
			message({ id }, _state, text) {
				const formatted = `${id}: ${text}`;

				server.emit("message", formatted);

				print(formatted);
			},
		}
	);

	server.listen(port);

	for (;;) {
		const formatted = `Server: ${await readline()}`;

		server.emit("message", formatted);

		print(formatted);
	}
}

main();
