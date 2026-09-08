import { spawn } from "node:child_process";

const children = [];
let stopping = false;

const stop = code => {
  if (stopping) return;
  stopping = true;
  children.forEach(child => child.kill("SIGTERM"));
  setTimeout(() => process.exit(code), 100).unref();
};

const run = (command, args) => {
  const child = spawn(command, args, { stdio: "inherit", env: process.env });
  children.push(child);
  child.on("exit", code => {
    if (code && !stopping) {
      console.error(`${command}가 종료되었습니다. (code ${code})`);
      stop(code);
    }
  });
};

run(process.execPath, ["server.mjs"]);
run(process.execPath, ["node_modules/@stoplight/prism-cli/dist/index.js", "mock", "SKALA_학습지식공유-API.yml", "--host", "127.0.0.1", "--port", "4010"]);

process.on("SIGINT", () => stop(0));
process.on("SIGTERM", () => stop(0));
