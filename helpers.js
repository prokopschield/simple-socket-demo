const { execSync } = require("child_process");

execSync("yarn");

const { Lock } = require("ps-std");

const stdin_ar = [];
const stdin_L = new Lock();

process.stdin.on("data", (chunk) => {
	stdin_ar.push(String(chunk).trim());
	stdin_L.release();
});

require("dotenv").config();

module.exports = {
	async readline() {
		if (stdin_ar.length) {
			return stdin_ar.shift();
		}

		process.stdout.write("\r> ");

		await stdin_L.wait_and_lock();

		const line = stdin_ar.shift();

		return line?.trim() || module.exports.readline();
	},
	print(text) {
		process.stdout.write(`\r${text.trim()}\n> `);
	},
	port: Number(process.env.PORT) || 9999,
};
