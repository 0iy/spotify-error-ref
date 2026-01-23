# spotify error reference

[![Author](https://img.shields.io/badge/author-0iy-red.svg)](https://github.com/0iy)
[![Visitors](https://visitor-badge.laobi.icu/badge?page_id=0iy.spotify-error-ref)](https://github.com/0iy/spotify-error-ref)
[![Stars](https://img.shields.io/github/stars/0iy/spotify-error-ref.svg?style=flat)](https://github.com/0iy/spotify-error-ref)
[![License](https://img.shields.io/github/license/0iy/spotify-error-ref.svg)](LICENSE)

community reference for spotify desktop client error codes. documents the cause chain, trigger condition, and resolution steps for each known error.

**[→ open the reference](https://0iy.github.io/spotify-error-ref)**

---

## what's in here

40+ error codes across every subsystem of the spotify desktop client, including:

- `auth:N` — authentication and login failures
- `accounts:N` — account validation, region, subscription errors
- `accesspoint:N` — AP cluster connection errors (the persistent socket spotify maintains)
- `session:N` — post-login session errors
- `desktop_login_accounts:N` — browser OAuth flow errors
- EME / Widevine DRM errors — why chrome and spotify fail while firefox works
- installer errors (18, 24, 30)
- web API errors (developer-facing)

each entry includes:
- the exact message spotify shows the user
- a cause chain showing which component broke and where
- specific resolution steps

## usage

open `index.html` locally, or use the live github pages site.

no build step. no dependencies. single file.

## contributing

contributions welcome — especially corrections, missing error codes, or fixes verified on specific OS versions.

see [CONTRIBUTING.md](CONTRIBUTING.md) for how to add or correct entries.

## license

mit
