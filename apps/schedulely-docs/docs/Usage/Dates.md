---
title: ⏲ DateTime
description: DateTime implementations
---

Dates are currently handled in the **default JS string ISO format**. Internally, all strings are converted into back into native JS Date objects. The long-term plan
is to switch over to `Temporal` once it starts appearing in browsers with some degree of frequency.

The current `Temporal` polyfills are incomplete and suffer from issues such as extremely slow processing, huge package size, or only supporting the latest versions of node.

## Timezones

Timezones are somewhat supported now, but more testing needs to be done. Currently, any dates passed in will be parsed in to the local timezone of the browser.
This should work fine for SPAs, but SSR apps will potentially have problems with date-drift due to differential timezones.

Please submit any issues regarding this.
