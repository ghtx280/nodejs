console.clear();const http=require("http"),fs=require("fs");let db,req,res;fs.existsSync(`${__dirname}/data`)||fs.mkdirSync(`${__dirname}/data`);const host="http://localhost:3000",er={body:"err: body only object format",post:"err: only POST requests for set",file:"err: this file does not exist",url:"err: invalid url"};function getPath(e){return`${__dirname}/data/${e}.json`}async function getBody(e){const t=e.headers["content-type"];let r=await new Promise((t=>{let r="";e.on("data",(e=>r+=e+"")),e.on("end",(()=>t(r)))}));if(r){if("application/json"===t)return JSON.parse(r);if("application/x-www-form-urlencoded"===t){console.log(t);const e={};return r.split("&").forEach((t=>{const[r,s]=t.split("=");e[r]=decodeURIComponent(s.replace(/\+/g," "))})),console.log(e),e}}}const func={create:({file:e})=>fs.existsSync(getPath(e))?`"${e}" already exists`:(fs.writeFileSync(getPath(e),JSON.stringify([])),`"${e}" was created successfully`),get({params:e,paramsRaw:t}){if(!t)return JSON.stringify(db);for(const[t,r]of e)if(console.log([t,r]),"f:"==t[0]){t.split(":")[1]}return""},set:({req:e,body:t,file:r})=>"POST"!==e.method?er.post:(db.push(t),fs.writeFileSync(getPath(r),JSON.stringify(db)),"ok"),upd(){},del(){}},server=http.createServer((async(e,t)=>{t.setHeader("Content-Type","application/json");try{if("/favicon.ico"==e.url)return void t.end("");let r,{pathname:s,searchParams:n,search:o}=new URL(host+e.url),[a,i]=s.split("/").filter((e=>e));try{"create"!==i&&(db=JSON.parse(fs.readFileSync(getPath(a),"utf8")))}catch(e){return t.statusCode=400,a?t.end(er.file):t.end(er.url)}try{r=await getBody(e)}catch(e){return t.statusCode=400,t.end(er.body)}t.end(JSON.stringify(func[i]?.({req:e,res:t,file:a,params:n,paramsRaw:o,body:r})||er.url))}catch(e){t.statusCode=400,t.end("something went wrong"),console.log(e)}}));server.listen(3e3,(()=>console.log(host)));
