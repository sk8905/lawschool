// lib/preact.js — single Preact + htm hub.
//
// Everything imports Preact / hooks / html from HERE so there is exactly one
// Preact instance in the app.
//
// Dependencies are VENDORED locally (see /vendor) — Preact 10.19.6 and htm
// 3.1.1, the exact pinned versions. No CDN, no build step, no network at run
// time: the app works fully offline, from a double-clicked index.html or from
// GitHub Pages, and cannot break if a CDN changes or goes away.
export { h, render, Fragment } from "../vendor/preact.module.js";
export {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  useReducer,
  useContext,
} from "../vendor/hooks.module.js";

import { h } from "../vendor/preact.module.js";
import htm from "../vendor/htm.module.js";
export const html = htm.bind(h);
