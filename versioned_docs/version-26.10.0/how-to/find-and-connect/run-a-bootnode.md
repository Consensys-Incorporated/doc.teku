---
description: Run Teku as a bootnode.
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Run Teku as a bootnode

## What is a bootnode?

When a new node joins the Ethereum network, it must connect to other nodes in the same network. This
process is referred to as peering.

Ethereum uses the Discovery protocol to find new peers. The process starts with a small set of nodes, known
as bootnodes, that are hard coded into Ethereum clients. The Discovery protocol allows nodes to locate and
exchange information about active peers, enabling them to dynamically join the network without needing a
full list of known nodes.

You can specify additional bootnodes using the [`--p2p-discovery-bootnodes`](../../reference/cli/index.md#p2p-discovery-bootnodes) option.

:::note
Any Teku instance running as a beacon node already participates in the Discovery protocol and can serve
as a bootnode.
:::

Most users don’t need to run a bootnode. This mode is primarily useful for client teams, infrastructure
providers, or others who want to contribute to the health and connectivity of the Ethereum network.
Running a bootnode helps new nodes discover peers more reliably, but doesn't provide direct benefits to the operator.

## Run Teku in bootnode-only mode

You can run Teku in bootnode-only mode when you don't want to operate a full beacon node.
When running in bootnode-only mode, Teku will only enable its Discovery service.

In this mode, Teku only runs its Discovery service and doesn't:

- Synchronize with the chain
- Validate or produce blocks
- Respond to Beacon API queries.

To run Teku in bootnode-only mode, start Teku with the [`bootnode`](../../reference/cli/subcommands/bootnode.md) subcommand:

```bash
teku bootnode <extra_options>
```

Here is an example of common options used for a mainnet bootnode:

```bash
teku bootnode \
  --network="mainnet" \
  --p2p-port=9000 \
  --p2p-advertised-ip=116.250.191.71 \
  --p2p-private-key-file=/opt/data/node-key.txt
```

This example configures a bootnode for Ethereum mainnet. It sets:

- The network to `mainnet`
- The external communication port using [`--p2p-port`](../../reference/cli/index.md#p2p-port)
- The public IP address using [`--p2p-advertised-ip`](../../reference/cli/index.md#p2p-advertised-ip-p2p-advertised-ips)
- A persistent private key file using [`--p2p-private-key-file`](../../reference/cli/index.md#p2p-private-key-file)

Using a persistent private key ensures the bootnode has a stable Ethereum Node Record (ENR), which others
can use to connect reliably.
