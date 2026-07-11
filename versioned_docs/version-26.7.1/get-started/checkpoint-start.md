---
title: Start Teku from a recent state
description: Start Teku from a recent finalized state using checkpoint sync.
sidebar_position: 5
---

# Start Teku from a recent state

To get Teku up and running in only a few minutes, start Teku from a recent finalized checkpoint
state rather than syncing from genesis.
Using a checkpoint state enables Teku to sync within the
[weak subjectivity](../concepts/weak-subjectivity.md) period.

When starting from a recent checkpoint, Teku downloads historic chain data in the background.

:::tip
You need access to a beacon node with [REST API enabled] (for example, Teku) to download the
finalized checkpoint state file.

Alternatively, you can use a checkpoint state endpoint from
[this community-maintained list of checkpoint state endpoints](https://eth-clients.github.io/checkpoint-sync-endpoints/).
:::

The following command downloads a recent finalized checkpoint state from a beacon node, and starts Teku:

```bash
teku --eth1-endpoint=http://localhost:8545 \
--validator-keys=/Users/me/mainnet/validator/keys:/Users/me/mainnet/validator/passwords \
--checkpoint-sync-url=https://beaconstate.ethstaker.cc
```

The command uses the [`--checkpoint-sync-url`](../reference/cli/index.md#checkpoint-sync-url) option
to download the finalized checkpoint state.
When using this option, you must clear your existing beacon node database so Teku can download the
new, finalized state. Either start Teku with
[`--force-clear-db`](../reference/cli/index.md#force-clear-db) to clear the database on startup, or
manually delete the beacon database (for example `<data-path>/beacon/db`).

:::note

You can also download a finalized checkpoint state file, and specify the location using the
[`--initial-state`](../reference/cli/index.md#initial-state) option.
To download the file and name it `state.ssz` run:

```bash
curl -o state.ssz -H 'Accept: application/octet-stream' http://other-node:5051/eth/v2/debug/beacon/states/finalized
```

And to start Teku, run:

```bash
teku --eth1-endpoint=http://localhost:8545 \
--validator-keys=/Users/me/mainnet/validator/keys:/Users/me/mainnet/validator/passwords \
--initial-state=state.ssz
```

Another option is to use [`--initial-state`](../reference/cli/index.md#initial-state) with the URL
of the state you want to use:

```bash
teku --eth1-endpoint=http://localhost:8545 \
--validator-keys=/Users/me/mainnet/validator/keys:/Users/me/mainnet/validator/passwords \
--initial-state=http://other-node:5051/eth/v2/debug/beacon/states/finalized
```

:::

<!--links-->

[REST API enabled]: ../reference/cli/index.md#rest-api-enabled
