# v1.3.4 (Thu Dec 23 2021)

#### 🐛 Bug Fix

- Fixed broken docs link in README [#72](https://github.com/magiclabs/magic-admin-js/pull/72) ([@lukecarr](https://github.com/lukecarr) [@smithki](https://github.com/smithki))

#### 🔩 Dependency Updates

- Bump path-parse from 1.0.6 to 1.0.7 [#63](https://github.com/magiclabs/magic-admin-js/pull/63) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@smithki](https://github.com/smithki))
- Bump glob-parent from 5.1.0 to 5.1.2 [#61](https://github.com/magiclabs/magic-admin-js/pull/61) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@smithki](https://github.com/smithki))
- Bump normalize-url from 4.5.0 to 4.5.1 [#60](https://github.com/magiclabs/magic-admin-js/pull/60) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@smithki](https://github.com/smithki))
- Bump hosted-git-info from 2.8.7 to 2.8.9 [#59](https://github.com/magiclabs/magic-admin-js/pull/59) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@smithki](https://github.com/smithki))
- Bump lodash from 4.17.19 to 4.17.21 [#58](https://github.com/magiclabs/magic-admin-js/pull/58) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@smithki](https://github.com/smithki))
- Bump gitlog from 4.0.3 to 4.0.4 [#57](https://github.com/magiclabs/magic-admin-js/pull/57) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@smithki](https://github.com/smithki))
- Bump y18n from 4.0.0 to 4.0.1 [#56](https://github.com/magiclabs/magic-admin-js/pull/56) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@smithki](https://github.com/smithki))
- Bump elliptic from 6.5.3 to 6.5.4 [#53](https://github.com/magiclabs/magic-admin-js/pull/53) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@smithki](https://github.com/smithki))
- Bump ini from 1.3.5 to 1.3.8 [#51](https://github.com/magiclabs/magic-admin-js/pull/51) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@smithki](https://github.com/smithki))

#### Authors: 3

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Ian K Smith ([@smithki](https://github.com/smithki))
- Luke Carr ([@lukecarr](https://github.com/lukecarr))

---

# v1.3.3 (Thu Dec 23 2021)

#### 🐛 Bug Fix

- getMetadata calls now return phone number [#74](https://github.com/magiclabs/magic-admin-js/pull/74) ([@hcote](https://github.com/hcote))

#### Authors: 1

- Hunter Cote ([@hcote](https://github.com/hcote))

---

# v1.3.2 (Fri Nov 12 2021)

#### 🐛 Bug Fix

- allow getMetadata calls to return social provider [#71](https://github.com/magiclabs/magic-admin-js/pull/71) ([@hcote](https://github.com/hcote))

#### Authors: 1

- Hunter Cote ([@hcote](https://github.com/hcote))

---

# v1.3.1 (Tue Oct 05 2021)

#### 🐛 Bug Fix

- fix: prevent URI encoding [#69](https://github.com/magiclabs/magic-admin-js/pull/69) ([@chiefGui](https://github.com/chiefGui))

#### 🏠 Internal

- Cleanup internal scripts [#47](https://github.com/magiclabs/magic-admin-js/pull/47) ([@smithki](https://github.com/smithki))

#### Authors: 2

- Guilherme Oderdenge ([@chiefGui](https://github.com/chiefGui))
- Ian K Smith ([@smithki](https://github.com/smithki))

---

# v1.3.0 (Tue Nov 17 2020)

#### 🚀 Enhancement

- Add continuous delivery via 'auto' package [#46](https://github.com/magiclabs/magic-admin-js/pull/46) ([@smithki](https://github.com/smithki))

#### 🐛 Bug Fix

- Update validate function to support attachment feature [#15](https://github.com/magiclabs/magic-admin-js/pull/15) ([@smithki](https://github.com/smithki))
- Fix misspelling of 'argumenet' [#43](https://github.com/magiclabs/magic-admin-js/pull/43) ([@brianrlewis](https://github.com/brianrlewis))
- Add 'UtilsModule' & 'parseAuthorizationHeader' helper [#39](https://github.com/magiclabs/magic-admin-js/pull/39) ([@smithki](https://github.com/smithki))
- Remove vulnerability badge [#38](https://github.com/magiclabs/magic-admin-js/pull/38) ([@FYJen](https://github.com/FYJen))
- Add vulnerabilities and circleci badges [#35](https://github.com/magiclabs/magic-admin-js/pull/35) ([@FYJen](https://github.com/FYJen))
- Add issue templates and contributing guide [#26](https://github.com/magiclabs/magic-admin-js/pull/26) ([@smithki](https://github.com/smithki))
- Encode query URI components and implement logout v2 [#22](https://github.com/magiclabs/magic-admin-js/pull/22) ([@smithki](https://github.com/smithki))
- Add 'getUserBy*' methods and generalize REST API services [#18](https://github.com/magiclabs/magic-admin-js/pull/18) ([@smithki](https://github.com/smithki))
- Validate `nbf` field [#40](https://github.com/magiclabs/magic-admin-js/pull/40) ([@smithki](https://github.com/smithki))
- fix name of logout request body [#14](https://github.com/magiclabs/magic-admin-js/pull/14) ([@Dizigen](https://github.com/Dizigen))
- Add logoutByIssuer method [#13](https://github.com/magiclabs/magic-admin-js/pull/13) ([@smithki](https://github.com/smithki))
- Remove middlewares [#12](https://github.com/magiclabs/magic-admin-js/pull/12) ([@smithki](https://github.com/smithki))
- Add new header + fix decode type signature [#11](https://github.com/magiclabs/magic-admin-js/pull/11) ([@smithki](https://github.com/smithki))
- Remove default exports [#10](https://github.com/magiclabs/magic-admin-js/pull/10) ([@smithki](https://github.com/smithki))
- Add CircleCI config [#8](https://github.com/magiclabs/magic-admin-js/pull/8) ([@smithki](https://github.com/smithki))
- Add unit tests [#7](https://github.com/magiclabs/magic-admin-js/pull/7) ([@smithki](https://github.com/smithki))

#### ⚠️ Pushed to `master`

- v0.1.0-beta.8 ([@smithki](https://github.com/smithki))
- 1.2.2 ([@smithki](https://github.com/smithki))
- Rename variable for clarity ([@smithki](https://github.com/smithki))
- Fix logical error related to 'nbf' check ([@smithki](https://github.com/smithki))
- 1.2.1 ([@smithki](https://github.com/smithki))
- Add 'files' field to 'package.json' ([@smithki](https://github.com/smithki))
- 1.2.0 ([@smithki](https://github.com/smithki))
- Fix broken CircleCI badge ([@smithki](https://github.com/smithki))
- 1.1.0 ([@smithki](https://github.com/smithki))
- Update CONTRIBUTING.md ([@smithki](https://github.com/smithki))
- Update README.md ([@smithki](https://github.com/smithki))
- Update issue templates ([@smithki](https://github.com/smithki))
- v1.0.0 ([@smithki](https://github.com/smithki))
- v0.1.0-beta.10 ([@smithki](https://github.com/smithki))
- v0.1.0-beta.9 ([@smithki](https://github.com/smithki))
- Update CHANGELOG ([@smithki](https://github.com/smithki))
- v0.1.0-beta.7 ([@smithki](https://github.com/smithki))
- Remove console statement ([@smithki](https://github.com/smithki))
- Fix bug in 'isDIDTClaim' ([@smithki](https://github.com/smithki))
- v0.1.0-beta.6 ([@smithki](https://github.com/smithki))
- 0.1.0-beta.5 ([@Dizigen](https://github.com/Dizigen))
- Update TypeScript to 3.8.3 ([@smithki](https://github.com/smithki))
- Remove node E2E ([@smithki](https://github.com/smithki))
- v0.1.0-beta.4 ([@smithki](https://github.com/smithki))
- Update README ([@smithki](https://github.com/smithki))
- Fix test ([@smithki](https://github.com/smithki))
- v0.1.0-beta.3 ([@smithki](https://github.com/smithki))
- v0.1.0-beta.2 ([@smithki](https://github.com/smithki))
- v0.1.0-beta.0 ([@smithki](https://github.com/smithki))
- Add boilerplate code ([@smithki](https://github.com/smithki))
- Initial commit ([@FYJen](https://github.com/FYJen))

#### 🔩 Dependency Updates

- Bump lodash from 4.17.15 to 4.17.19 [#41](https://github.com/magiclabs/magic-admin-js/pull/41) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump elliptic from 6.5.2 to 6.5.3 [#42](https://github.com/magiclabs/magic-admin-js/pull/42) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump node-fetch from 2.6.0 to 2.6.1 [#45](https://github.com/magiclabs/magic-admin-js/pull/45) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump acorn from 7.1.0 to 7.1.1 [#36](https://github.com/magiclabs/magic-admin-js/pull/36) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@smithki](https://github.com/smithki))

#### Authors: 5

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Arthur Jen ([@FYJen](https://github.com/FYJen))
- Brian Lewis ([@brianrlewis](https://github.com/brianrlewis))
- David He ([@Dizigen](https://github.com/Dizigen))
- Ian K Smith ([@smithki](https://github.com/smithki))

---

## Upcoming Changes

#### Fixed

- ...

#### Changed

- ...

#### Added

- ...

## `1.2.2` - 06/11/2020

#### Fixed

- Fixed a logical error that would incorrectly parse the `nbf` field.

## `1.2.1` - 06/11/2020

#### Changed

- Added `"files"` field to `package.json` to make the NPM package less cumbersome.

## `1.2.0` - 06/11/2020

#### Added

- Enforce the `nbf` field for DID Tokens parsed via `TokenModule.validate`.

## `1.1.0` - 05/25/2020

#### Added

- Introduced `UtilsModule` along with a `parseAuthorizationHeader` helper method.

## `1.0.0` - 04/09/2020

This is the first release our changelog records. Future updates will be logged in the following format:

#### Fixed

- Bug fixes and patches will be described here.

#### Changed

- Changes (breaking or otherwise) to current APIs will be described here.

#### Added

- New features or APIs will be described here.
