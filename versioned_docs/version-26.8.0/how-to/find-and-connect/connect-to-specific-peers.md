---
title: Connect to specific peers
description: Connect Teku to specific peers using static peers, direct peers, or the add_peer API.
sidebar_position: 4
---

# Connect to specific peers

By default, Teku uses [discovery](../../concepts/p2p-networking.md#peer-discovery-and-enr) to find and connect to peers automatically.
In some cases, you might want Teku to connect to specific peers, such as nodes you operate across different
regions.

Teku provides multiple mechanisms to connect to specific peers:

- [Static peers](#static-peers) - Peers that Teku maintains a connection to, configured at startup.
- [Direct peers](#direct-peers) - Static peers that always exchange full messages, configured reciprocally.
- [The `add_peer` API](#add-a-static-peer-at-runtime) - Add a static peer at runtime without restarting Teku.

:::info

When you specify a peer, use one of its transport
[multiaddresses](https://libp2p.io/concepts/fundamentals/addressing/) from the `p2p_addresses` field
of the [`/eth/v1/node/identity`](https://consensys.github.io/teku/#tag/Node/operation/getNetworkIdentity)
API endpoint.

:::

## Static peers

Use the [`--p2p-static-peers`](../../reference/cli/index.md#p2p-static-peers) option to specify a
comma-separated list of peer multiaddresses to maintain connections with.
Teku connects to each static peer at startup and keeps trying to reconnect if the connection drops.

```bash title="Example"
--p2p-static-peers=/ip4/192.0.2.10/tcp/9000/p2p/16Uiu2HA...aXRz,/ip4/192.0.2.11/tcp/9000/p2p/16Uiu2HA...q6f1
```

Static peers take precedence over dynamically discovered peers, so Teku connects to them even when its peer
table is full.

To load the static peer list from a URL instead of listing addresses directly, use
[`--p2p-static-peers-url`](../../reference/cli/index.md#p2p-static-peers-url).

:::note

A static peer is a one-sided declaration.
If the remote node's peer table is full, it can still reject the incoming connection.
For a reliable, persistent connection between two known nodes, use [direct peers](#direct-peers) and
configure both nodes to point to each other.

:::

## Direct peers

Use the [`--p2p-direct-peers`](../../reference/cli/index.md#p2p-direct-peers) option to specify a
comma-separated list of direct peer multiaddresses.
Direct peers are static peers that always exchange full messages, regardless of peer scoring mechanisms.

```bash title="Example"
--p2p-direct-peers=/ip4/192.0.2.10/tcp/9000/p2p/16Uiu2HA...aXRz,/ip4/192.0.2.11/tcp/9000/p2p/16Uiu2HA...q6f1
```

Direct peers must be configured reciprocally.
Each node must list the other node as a direct peer for the connection to work.
This is the recommended way to maintain a persistent connection between two nodes that you operate.

## Add a static peer at runtime

Use the [`/teku/v1/admin/add_peer`](https://consensys.github.io/teku/#tag/Teku/operation/AddPeer) API endpoint to add a
static peer at runtime, without restarting Teku.
Send a `POST` request to the endpoint with the peer's multiaddress as a JSON string in the request body.

```bash title="Example"
curl -X POST "http://127.0.0.1:5051/teku/v1/admin/add_peer" \
  -H "Content-Type: application/json" \
  -d '"/ip4/192.0.2.10/tcp/9000/p2p/16Uiu2HA...aXRz"'
```

The endpoint returns the following responses:

- `200` - The peer address is valid and Teku added it to the static peer list.
- `400` - The peer address is invalid.
- `500` - An internal error occurred, for example, the discovery network is unavailable.

The request is idempotent, so adding the same peer multiple times returns `200` each time.

:::note

A `200` response means Teku accepted the request and stored the peer as a static peer.
It does not mean the peer is connected.
Teku attempts the connection asynchronously and retries with an increasing delay if it fails.

:::

To establish a connection between two nodes dynamically, call `add_peer` on both nodes, with each node
pointing to the other node's address.
Because this is a runtime configuration, the static peer list added through the API is not persisted across
restarts.
To make the connection persistent, use [`--p2p-direct-peers`](#direct-peers) on both nodes.

## Verify a peer is connected

Use the [`/eth/v1/node/peers/{peer_id}`](https://consensys.github.io/teku/#tag/Node/operation/getPeer) API
endpoint to look up a single peer by its ID:

```bash title="Example"
curl "http://127.0.0.1:5051/eth/v1/node/peers/16Uiu2HA...aXRz"
```

If the peer is in the node's peer set, Teku returns its record, including the connection state and
direction.
If the peer is not present, Teku returns a `404` response.

To see connection attempts and retries, enable [debug logging](../../reference/cli/index.md#logging).
When Teku connects to a static peer, it logs messages such as:

```bash
Connecting to peer <PEER_ADDRESS>
Connection to peer <PEER_ID> was successful
```

If the connection fails or the peer disconnects, Teku logs the retry attempt:

```bash
Connection to <PEER_ADDRESS> failed: <ERROR>. Will retry in <N> sec
Peer <PEER_ADDRESS> disconnected. Will try to reconnect in <N> sec
```
