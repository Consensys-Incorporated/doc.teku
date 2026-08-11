---
title: Weak subjectivity
description: Learn about the weak subjectivity period.
sidebar_position: 8
---

# Weak subjectivity

The weak subjectivity period refers to how far behind the chain head a node can be before 1/3 of
validators may have exited since the node was last in sync.

For example, if 1/3 of validators withdraw their stake and continue signing blocks and attestations,
they can form a chain which conflicts with the finalized state.
If your node is far enough behind the chain head not to be aware that they've withdrawn their funds,
these validators can act dishonestly and continue feeding you blocks to lead you down the wrong chain.

:::note
If a node is aware that a validator has withdrawn its funds, the node will reject the validator's attestations.
:::

At a high-level, the weak subjectivity period is the period of time that a node can be behind the
chain and trust that it is following the correct chain.
In practice, the weak subjectivity mechanism tells Teku if the latest checkpoint is too old to
continue syncing from it (either when starting a new node or after your node has been offline for a while).

## Safely sync your node

Teku provides three methods to safely sync a node that is new to the network or has been offline for an extended period.

1. Use [`--checkpoint-sync-url`](../reference/cli/index.md#checkpoint-sync-url) to supply a URL of a
    checkpoint state endpoint from which to sync.
2. Use [`--initial-state`](../reference/cli/index.md#initial-state) to supply an SSZ encoded state
    file from which to sync.

We recommend using `--checkpoint-sync-url` on Mainnet.

:::tip
Use the [`/eth/v2/debug/beacon/states/<state_id>`](https://consensys.github.io/teku/#tag/Debug/operation/getStateV2)
API on an updated node to download a recent finalized state as an SSZ encoded state file.
:::

Another option is to [reconstruct historical states](../how-to/reconstruct-historical-states.md).
This allows the creation of a full archive node, ensuring that once the node is
up-to-date, the concerns associated with weak subjectivity are cleared.

## Sync outside the weak subjectivity period

Originally, Teku's default behavior was to sync from any point in the chain without the weak
subjectivity check, including syncing all the way from the genesis of the chain.
However, this is considered unsafe.

If you want to allow Teku to sync outside the weak subjectivity period, you can use the
[`--ignore-weak-subjectivity-period-enabled`](../reference/cli/index.md#ignore-weak-subjectivity-period-enabled)
CLI option.

## Learn more

See the following resources to learn more about weak subjectivity:

- [Ethereum weak subjectivity documentation](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/weak-subjectivity/)
- [Proof of Stake: How I Learned to Love Weak Subjectivity](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity)
- [Exploring Ethereum 2: Weak Subjectivity Period](https://www.symphonious.net/2019/11/27/exploring-ethereum-2-weak-subjectivity-period/)
