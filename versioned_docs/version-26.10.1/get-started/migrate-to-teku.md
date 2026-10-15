---
title: Migrate to Teku
description: Migrate to Teku from a different Ethereum consensus client.
sidebar_position: 7
---

# Migrate to Teku

Migrate from a different Ethereum consensus client to Teku to contribute to [client diversity](https://clientdiversity.org/).

When migrating from a different client, consider the following:

- You can [import a slashing protection database](../reference/cli/subcommands/slashing-protection.md#import).
- You might need to update your [network ports](../how-to/find-and-connect/improve-connectivity.md).
- The way Teku handles [validator keys](../reference/cli/index.md#validator-keys) might differ from your previous client. Teku also supports [using Web3Signer](../how-to/use-external-signer/use-web3signer.md).
- You can skip the long initial sync period by using Teku's [checkpoint start](checkpoint-start.md) capability.

Find guides to switch from specific clients on the [client diversity website](https://clientdiversity.org/#switch).
