if(!self.define){let s,e={};const a=(a,n)=>(a=new URL(a+".js",n).href,e[a]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=a,s.onload=e,document.head.appendChild(s)}else s=a,importScripts(a),e()})).then((()=>{let s=e[a];if(!s)throw new Error(`Module ${a} didn’t register its module`);return s})));self.define=(n,t)=>{const i=s||("document"in self?document.currentScript.src:"")||location.href;if(e[i])return;let c={};const r=s=>a(s,i),o={module:{uri:i},exports:c,require:r};e[i]=Promise.all(n.map((s=>o[s]||r(s)))).then((s=>(t(...s),c)))}}define(["./workbox-f1770938"],(function(s){"use strict";importScripts(),self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"/_next/static/Ty1PF4RV2G0svUTwz0RsK/_buildManifest.js",revision:"68c4c24d7afaaa7c74fcbf49651b0cf2"},{url:"/_next/static/Ty1PF4RV2G0svUTwz0RsK/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/0e5ce63c-dcb172be4f7c933b.js",revision:"Ty1PF4RV2G0svUTwz0RsK"},{url:"/_next/static/chunks/138-682a48f06a7d805f.js",revision:"Ty1PF4RV2G0svUTwz0RsK"},{url:"/_next/static/chunks/190-2303c3642a0b7df2.js",revision:"Ty1PF4RV2G0svUTwz0RsK"},{url:"/_next/static/chunks/35.03ae917f238a8966.js",revision:"03ae917f238a8966"},{url:"/_next/static/chunks/476-192915cccd1e27ac.js",revision:"Ty1PF4RV2G0svUTwz0RsK"},{url:"/_next/static/chunks/564-b49fb2954d6912ae.js",revision:"Ty1PF4RV2G0svUTwz0RsK"},{url:"/_next/static/chunks/582-d59e93c7b801b2b5.js",revision:"Ty1PF4RV2G0svUTwz0RsK"},{url:"/_next/static/chunks/648-a642d8c382da4ced.js",revision:"Ty1PF4RV2G0svUTwz0RsK"},{url:"/_next/static/chunks/748-84daa23562bc5977.js",revision:"Ty1PF4RV2G0svUTwz0RsK"},{url:"/_next/static/chunks/871-810ca9e8f94161a6.js",revision:"Ty1PF4RV2G0svUTwz0RsK"},{url:"/_next/static/chunks/873-b7a950b5153b672c.js",revision:"Ty1PF4RV2G0svUTwz0RsK"},{url:"/_next/static/chunks/991-772b80a092254c48.js",revision:"Ty1PF4RV2G0svUTwz0RsK"},{url:"/_next/static/chunks/app/_not-found/page-9f659be19f371b2b.js",revision:"Ty1PF4RV2G0svUTwz0RsK"},{url:"/_next/static/chunks/app/account/create/page-5d99ce2a05e3d451.js",revision:"Ty1PF4RV2G0svUTwz0RsK"},{url:"/_next/static/chunks/app/collections/%5Bid%5D/page-99763e70fa7ee2cc.js",revision:"Ty1PF4RV2G0svUTwz0RsK"},{url:"/_next/static/chunks/app/collections/create/page-90500cf79d675ec7.js",revision:"Ty1PF4RV2G0svUTwz0RsK"},{url:"/_next/static/chunks/app/collections/page-f3f8acd17796586e.js",revision:"Ty1PF4RV2G0svUTwz0RsK"},{url:"/_next/static/chunks/app/layout-0dbd8137f231ba4b.js",revision:"Ty1PF4RV2G0svUTwz0RsK"},{url:"/_next/static/chunks/app/login/page-19fcd6fec5f861fe.js",revision:"Ty1PF4RV2G0svUTwz0RsK"},{url:"/_next/static/chunks/app/page-6d7d2ca6c56f5e09.js",revision:"Ty1PF4RV2G0svUTwz0RsK"},{url:"/_next/static/chunks/app/payload/children/%5Bid%5D/page-6e3613cedcfbb8ff.js",revision:"Ty1PF4RV2G0svUTwz0RsK"},{url:"/_next/static/chunks/app/payload/children/page-4ba202cad68aa3d9.js",revision:"Ty1PF4RV2G0svUTwz0RsK"},{url:"/_next/static/chunks/app/payload/create/page-f236500ddaca9e54.js",revision:"Ty1PF4RV2G0svUTwz0RsK"},{url:"/_next/static/chunks/app/payload/listing/%5Bid%5D/page-2160e3507125facf.js",revision:"Ty1PF4RV2G0svUTwz0RsK"},{url:"/_next/static/chunks/fd9d1056-530ac78b2cc70eef.js",revision:"Ty1PF4RV2G0svUTwz0RsK"},{url:"/_next/static/chunks/framework-f66176bb897dc684.js",revision:"Ty1PF4RV2G0svUTwz0RsK"},{url:"/_next/static/chunks/main-8a86b5c0e33fbfc3.js",revision:"Ty1PF4RV2G0svUTwz0RsK"},{url:"/_next/static/chunks/main-app-b8676fd4e7427886.js",revision:"Ty1PF4RV2G0svUTwz0RsK"},{url:"/_next/static/chunks/pages/_app-6a626577ffa902a4.js",revision:"Ty1PF4RV2G0svUTwz0RsK"},{url:"/_next/static/chunks/pages/_error-1be831200e60c5c0.js",revision:"Ty1PF4RV2G0svUTwz0RsK"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-8dd901c20b1ab188.js",revision:"Ty1PF4RV2G0svUTwz0RsK"},{url:"/_next/static/css/be4a617989ff78bf.css",revision:"be4a617989ff78bf"},{url:"/_next/static/media/4473ecc91f70f139-s.p.woff",revision:"78e6fc13ea317b55ab0bd6dc4849c110"},{url:"/_next/static/media/463dafcda517f24f-s.p.woff",revision:"cbeb6d2d96eaa268b4b5beb0b46d9632"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),s.cleanupOutdatedCaches(),s.registerRoute("/",new s.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:s})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new s.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new s.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new s.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),s.registerRoute(/\/_next\/static.+\.js$/i,new s.CacheFirst({cacheName:"next-static-js-assets",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/image\?url=.+$/i,new s.StaleWhileRevalidate({cacheName:"next-image",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp3|wav|ogg)$/i,new s.CacheFirst({cacheName:"static-audio-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp4|webm)$/i,new s.CacheFirst({cacheName:"static-video-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:js)$/i,new s.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new s.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:css|less)$/i,new s.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new s.StaleWhileRevalidate({cacheName:"next-data",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:json|xml|csv)$/i,new s.NetworkFirst({cacheName:"static-data-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({sameOrigin:s,url:{pathname:e}})=>!(!s||e.startsWith("/api/auth/callback")||!e.startsWith("/api/"))),new s.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({request:s,url:{pathname:e},sameOrigin:a})=>"1"===s.headers.get("RSC")&&"1"===s.headers.get("Next-Router-Prefetch")&&a&&!e.startsWith("/api/")),new s.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({request:s,url:{pathname:e},sameOrigin:a})=>"1"===s.headers.get("RSC")&&a&&!e.startsWith("/api/")),new s.NetworkFirst({cacheName:"pages-rsc",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:{pathname:s},sameOrigin:e})=>e&&!s.startsWith("/api/")),new s.NetworkFirst({cacheName:"pages",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({sameOrigin:s})=>!s),new s.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
