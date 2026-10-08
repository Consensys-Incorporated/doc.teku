---
title: Load validators without restarting
description: Load validators without restarting Teku.
sidebar_position: 6
---

# Load validators without restarting Teku

You can load validators into a running Teku process, only if you started Teku by:

- Specifying a directory using [`--validator-keys`](../reference/cli/index.md#validator-keys), or
- Specifying a URL using [`--validators-external-signer-public-keys`](../reference/cli/index.md#validators-external-signer-public-keys).

:::caution

- If you started Teku by specifying individual validator key files or external signer public keys, then you must restart Teku.
- You must restart Teku to remove validators.

:::

**Prerequisites:**

- Add the new validators to the directory specified in [`--validator-keys`](../reference/cli/index.md#validator-keys), or ensure the URL supplied in [`--validators-external-signer-public-keys`](../reference/cli/index.md#validators-external-signer-public-keys) contains the new public keys.

To load the validators in a running Teku instance, send a `SIGHUP` signal to the Teku process.

```bash
kill -HUP <PID>
```

Where `<PID>` is the process ID of the running Teku instance.
