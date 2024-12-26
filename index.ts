import { Socket } from "net";

const CMD_PING: string = "ping\n",
	CMD_GET: string = "get\n",
	CMD_SET: string = "set\n",
	CMD_DELETE: string = "delete\n",
	CMD_CLEAR: string = "clear\n",
	CMD_UPDATE: string = "update\n",
	CMD_EXISTS: string = "exists\n"; // this doesn't work???

export const DEFAULT_PORT: number = 7854;

export class Client {
	private host: string;
	private port: number;

	constructor(host: string, port: number) {
		this.host = host;
		this.port = port;
	}

	private do(cmd: string, ...args: any[]): Promise<string> {
		return new Promise((resolve, reject) => {
			const client = new Socket();
			let recieved = "";

			client.connect(this.port, this.host, () =>
				client.write(cmd + args.join("\n") + "\n")
			);
			client.on("data", (data) => {
				recieved += data.toString();
				recieved = recieved.replaceAll("\u0000", "").trim();
				client.end();
				resolve(recieved);
			});
			client.on("end", () => resolve(recieved));
			client.on("error", (err) => {
				console.error("Socket error: ", err);
				reject(err);
			});
		});
	}

	async ping(): Promise<void> {
		await this.do(CMD_PING);
	}

	async get(key: string): Promise<string> {
		return await this.do(CMD_GET, key);
	}

	async set(key: string, value: string): Promise<void> {
		await this.do(CMD_SET, key, value);
	}

	async delete(key: string): Promise<void> {
		await this.do(CMD_DELETE, key);
	}

	async clear(): Promise<void> {
		await this.do(CMD_CLEAR);
	}

	async update(key: string, value: string): Promise<void> {
		await this.do(CMD_UPDATE, key, value);
	}

	async exists(key: string): Promise<any> {
		return (await this.do(CMD_EXISTS, key)).startsWith("+y");
	}
}
