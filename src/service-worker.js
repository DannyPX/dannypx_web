/* eslint-disable no-console */
importScripts("/precache-manifest.819d51f67fda03f9f8513caa65ca9c4b.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.precaching.precacheAndRoute(self.__precacheManifest);
