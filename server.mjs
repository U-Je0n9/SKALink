import { createServer, request as httpRequest } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const port = Number(process.env.PORT || 4173);
const root = process.cwd();
const mime = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".yml": "application/yaml; charset=utf-8", ".yaml": "application/yaml; charset=utf-8", ".svg": "image/svg+xml", ".png":"image/png" };

createServer(async (req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, `http://${req.headers.host}`).pathname);
  if(pathname.startsWith("/api/")){
    const prismPath=req.url.replace(/^\/api/,"");
    const proxy=httpRequest({hostname:"127.0.0.1",port:4010,path:prismPath,method:req.method,headers:{...req.headers,host:"127.0.0.1:4010"}},upstream=>{
      res.writeHead(upstream.statusCode||502,upstream.headers);
      upstream.pipe(res);
    });
    proxy.on("error",()=>{res.writeHead(503,{"Content-Type":"application/json; charset=utf-8"}).end(JSON.stringify({code:"MOCK_SERVER_UNAVAILABLE",message:"OAS 목 서버가 준비되지 않았습니다."}));});
    req.pipe(proxy);
    return;
  }
  if(pathname==="/swagger"){res.writeHead(302,{Location:"/swagger.html"}).end();return;}
  const requested = pathname === "/" ? "/index.html" : pathname;
  const assetPath=requested.startsWith("/swagger-assets/")?requested.replace("/swagger-assets/","/node_modules/swagger-ui-dist/"):requested;
  const file = normalize(join(root, assetPath));
  if (!file.startsWith(root)) { res.writeHead(403).end("Forbidden"); return; }
  try {
    const body = await readFile(file);
    res.writeHead(200, { "Content-Type": mime[extname(file)] || "application/octet-stream" });
    res.end(body);
  } catch {
    try {
      const body = await readFile(join(root, "index.html"));
      res.writeHead(200, { "Content-Type": mime[".html"] });
      res.end(body);
    } catch { res.writeHead(404).end("Not found"); }
  }
}).listen(port, () => {
  console.log(`SKALA 지식공유: http://localhost:${port}`);
  console.log(`Swagger UI: http://localhost:${port}/swagger`);
  console.log(`OAS Mock API: http://localhost:${port}/api`);
});
