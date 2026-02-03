# contributing

contributions are welcome. the most useful things to add:

- error codes not yet documented
- verified fixes for a specific windows/mac version
- corrections to existing cause chains
- new subsystems or error categories

---

## submitting an error code

open an issue using the **"new error code"** template. fill in whatever fields you have — partial info is fine, it can be fleshed out later.

if you want to submit a PR directly, add the entry to the `E` array in `index.html`. each entry follows this shape:

```js
{
  code: 'subsystem:N',           // exact code string shown to user
  cat:  ['auth', 'sub-xxx'],     // categories (auth/network/drm/installer/webapi + sub-*)
  sev:  'fatal|error|warn|info', // severity
  title: 'short human title',
  msg:  'exact message spotify displays',  // omit if unknown

  // cause chain — left to right, first node is root, last is the error
  chain: [
    { l: 'Node label', s: 'optional sublabel' },           // neutral
    { l: 'Fragile step', s: 'sublabel', c: 'fg' },         // fg = fragile (orange)
    { l: 'Breaking point', s: 'sublabel', c: 'cr' },       // cr = critical (red)
    { l: 'Working state', s: 'sublabel', c: 'gd' },        // gd = good (green)
  ],

  causes: [
    'first root cause',
    'second root cause',
  ],

  fixes: [
    ['step one, plain text'],
    ['step two with a', 'path\\or\\code', 'inline'],   // strings with backslashes render as <code>
  ],

  note: 'optional note with <strong>HTML allowed</strong>',  // for edge cases / bugs / context
}
```

---

## categories

| value | meaning |
|---|---|
| `auth` | login and authentication flows |
| `network` | network, proxy, firewall, AP cluster |
| `drm` | DRM, Widevine, playback engine |
| `installer` | Windows installer (NSIS) errors |
| `webapi` | Spotify Web API (developer-facing) |
| `sub-accounts` | accounts subsystem |
| `sub-auth` | auth subsystem |
| `sub-accesspoint` | accesspoint subsystem |
| `sub-session` | session subsystem |
| `sub-dlacc` | desktop_login_accounts subsystem |

---

## reporting a correction

open an issue using the **"correction"** template. include the error code and what's wrong — wrong message text, wrong cause, fix that doesn't work, etc.

---

## notes

- this is an unofficial community reference. no affiliation with spotify.
- don't include anything that identifies how specific info was obtained.
- keep the writing style terse and practical. no filler.
