/**
 * Renders SVG strings to PNGs at their exact native pixel size, with a
 * transparent background, using a local Chrome/Chromium over the DevTools
 * protocol. Set CHROME_PATH if Chrome isn't in the default macOS location.
 */
import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";
export async function renderPngs(jobs /* [{svg, size, out}] */) {
  const CH = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  const port = 9800 + Math.floor(Math.random() * 150);
  const p = spawn(CH, ["--headless", `--remote-debugging-port=${port}`, "about:blank"], { stdio: "ignore" });
  p.on("error", (e) => { throw new Error(`Could not start Chrome at ${CH}. Set CHROME_PATH. (${e.message})`); });
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  let t; for (let i = 0; i < 100; i++) { try { t = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((x) => x.type === "page"); if (t) break; } catch {} await sleep(100); }
  const ws = new WebSocket(t.webSocketDebuggerUrl); await new Promise((r) => (ws.onopen = r));
  let id = 0; const pend = new Map(); ws.onmessage = (m) => { const d = JSON.parse(m.data); pend.get(d.id)?.(d.result); };
  const send = (method, params = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
  await send("Emulation.setDefaultBackgroundColorOverride", { color: { r: 0, g: 0, b: 0, a: 0 } });
  for (const { svg, size, out } of jobs) {
    await send("Emulation.setDeviceMetricsOverride", { width: size, height: size, deviceScaleFactor: 1, mobile: false });
    const html = `<html><body style="margin:0;background:transparent">${svg.replace("<svg ", `<svg style="display:block" width="${size}" height="${size}" `)}</body></html>`;
    await send("Page.navigate", { url: "data:text/html;base64," + Buffer.from(html).toString("base64") });
    await sleep(250);
    const s = await send("Page.captureScreenshot", { format: "png", clip: { x: 0, y: 0, width: size, height: size, scale: 1 } });
    writeFileSync(out, Buffer.from(s.data, "base64"));
  }
  ws.close(); p.kill();
}

if (!globalThis.WebSocket) throw new Error("Node 22+ is required (global WebSocket).");
