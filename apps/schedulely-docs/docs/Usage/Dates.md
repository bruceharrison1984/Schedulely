---
title: ⏲ DateTime
description: DateTime implementations
---

Dates are currently handled in ISO format, using date-fns to help when dealing with them. Internally, all strings are converted into native Date objects. The long-term plan
is to switch over to `Temporal` once it starts appearing in browsers. The current `Temporal` polyfills are incomplete and suffer from issues such as slow processing, or only
supporting the latest versions of node.

## Timezones

Timezones are somewhat supported now, but more testing needs to be done. Currently, any dates passed in will be parsed in to the local timezone. This should work fine
for SPAs, but SSR apps will potentially have problems with date-drift due to differential timezones. Please submit any issues regarding this.
