const { port, print, readline } = require("./helpers");

const { createClient } = require("@prokopschield/simple-socket-client");

async function main() {
	const [{ message }, socket] = createClient(`ws://localhost:${port}`);

	socket.on("message", print);

	for (;;) {
		await message(await readline());
	}
}

main();
