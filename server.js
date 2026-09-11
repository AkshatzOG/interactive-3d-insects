const http=require('http');
const fs=require('fs');
const path=require('path');
const zlib=require('zlib');
const crypto=require('crypto');
const url=require('url');
const ROOT=__dirname; const PORT=process.env.PORT||10000;
const MIME={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml','.glb':'model/gltf-binary','.ico':'image/x-icon'};
function safePath(reqUrl){let pathname=decodeURIComponent(url.parse(reqUrl).pathname||'/');if(pathname==='/'||pathname.endsWith('/'))pathname+='index.html';const p=path.normalize(path.join(ROOT,pathname));if(!p.startsWith(ROOT))return null;return p;}
function send(req,res,file){fs.stat(file,(err,st)=>{if(err||!st.isFile()){res.writeHead(404,{'Content-Type':'text/plain'});return res.end('Not found');}const ext=path.extname(file).toLowerCase();const type=MIME[ext]||'application/octet-stream';const etag='"'+crypto.createHash('sha1').update(`${file}:${st.size}:${st.mtimeMs}`).digest('hex')+'"';const headers={'Content-Type':type,'ETag':etag,'Accept-Ranges':'bytes'};
 if(ext==='.glb'||ext==='.jpg'||ext==='.jpeg'||ext==='.png')headers['Cache-Control']='public,max-age=31536000,immutable';else headers['Cache-Control']='public,max-age=3600';
 if(req.headers['if-none-match']===etag){res.writeHead(304,headers);return res.end();}
 const range=req.headers.range; if(range){const m=/bytes=(\d*)-(\d*)/.exec(range);if(m){let start=m[1]?parseInt(m[1],10):0;let end=m[2]?parseInt(m[2],10):st.size-1;if(end>=st.size)end=st.size-1;if(start>end){res.writeHead(416,{'Content-Range':`bytes */${st.size}`});return res.end();}headers['Content-Range']=`bytes ${start}-${end}/${st.size}`;headers['Content-Length']=end-start+1;res.writeHead(206,headers);return fs.createReadStream(file,{start,end}).pipe(res);}}
 headers['Content-Length']=st.size; if(['.html','.js','.css','.json','.svg'].includes(ext)){const enc=req.headers['accept-encoding']||'';const chunks=[];const input=fs.createReadStream(file);let encoder=null;if(/br/.test(enc)) {headers['Content-Encoding']='br';encoder=zlib.createBrotliCompress();} else if(/gzip/.test(enc)){headers['Content-Encoding']='gzip';encoder=zlib.createGzip();} if(encoder){delete headers['Content-Length'];res.writeHead(200,headers);input.pipe(encoder).pipe(res);}else{res.writeHead(200,headers);input.pipe(res);}} else {res.writeHead(200,headers);fs.createReadStream(file).pipe(res);}
 });}
const server=http.createServer((req,res)=>{if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405);return res.end('Method Not Allowed');}const file=safePath(req.url);if(!file){res.writeHead(400);return res.end('Bad request');}send(req,res,file);});
server.listen(PORT,()=>console.log(`INSECTA Genesis Lab running on port ${PORT}`));
