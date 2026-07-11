---
title: Peer-to-peer networking
description: Learn how Teku connects to the consensus-layer P2P network using the TCP and QUIC transports, peer discovery, ports, IPv6, advertised addresses, and multiaddresses.
sidebar_position: 7
---

# Peer-to-peer networking

Teku connects to the consensus-layer peer-to-peer (P2P) network using two transports to exchange data
and a discovery protocol to find peers.
This page explains how the transports, discovery, ports, and address configuration fit together.

:::note
If you encounter peering issues, see the [network troubleshooting guide](../how-to/troubleshoot/network.md#resolve-peering-issues).
:::

## Transports

Teku supports two P2P transports, both enabled by default:

- **TCP** - The original libp2p transport.
- **QUIC** - A transport that runs over UDP.

When QUIC is enabled, Teku advertises both its TCP and QUIC addresses to the network, and remote
peers can connect over either transport.
When Teku dials a peer, it uses QUIC if both the local node and the peer support it, and otherwise
falls back to TCP.

## Peer discovery and ENR

Teku uses [discovery v5](https://github.com/ethereum/devp2p/tree/master/discv5) over UDP to find
peers on the network.
Discovery starts from a set of [bootnodes](../how-to/find-and-connect/run-a-bootnode.md) and lets nodes
locate each other dynamically.

Teku identifies itself on the discovery network using an
[Ethereum Node Record (ENR)](https://eips.ethereum.org/EIPS/eip-778), which advertises the node's IP
address and ports.
The UDP discovery address is used only to find peers; it is not a connectable transport address.

:::note
Instead of relying on automatic discovery, you can also
[connect Teku to specific peers](../how-to/find-and-connect/connect-to-specific-peers.md), such as nodes
you operate, using static or direct peers.
:::

## Node identity and private key

The P2P private key identifies the beacon node on the network and secures the communication channel
between nodes.
Teku generates a key automatically on first startup, or you can supply your own using the
[`--p2p-private-key-file`](../reference/cli/index.md#p2p-private-key-file) option.

Using a persistent private key file gives the node a stable ENR, which is useful for
[bootnodes](../how-to/find-and-connect/run-a-bootnode.md) and other nodes that you want peers to
reconnect to reliably.

## P2P port options

Teku exposes a listening port and an advertised port for each transport and for peer discovery:

| Purpose | Protocol | Listening option | Advertised option |
| --- | --- | --- | --- |
| TCP transport | TCP | [`--p2p-port`](../reference/cli/index.md#p2p-port) | [`--p2p-advertised-port`](../reference/cli/index.md#p2p-advertised-port) |
| Peer discovery | UDP | [`--p2p-udp-port`](../reference/cli/index.md#p2p-udp-port) | [`--p2p-advertised-udp-port`](../reference/cli/index.md#p2p-advertised-udp-port) |
| QUIC transport | UDP | [`--p2p-quic-port`](../reference/cli/index.md#p2p-quic-port) | [`--p2p-advertised-quic-port`](../reference/cli/index.md#p2p-advertised-quic-port) |

Each option has an `-ipv6` counterpart (for example,
[`--p2p-quic-port-ipv6`](../reference/cli/index.md#p2p-quic-port-ipv6) and
[`--p2p-advertised-quic-port-ipv6`](../reference/cli/index.md#p2p-advertised-quic-port-ipv6)) that
adds a second address family for dual-stack operation.
The listening mode (IPv4, IPv6, or dual-stack) depends on how you combine these options with the
[`--p2p-interface`](../reference/cli/index.md#p2p-interface-p2p-interfaces) option.
By default, Teku listens over IPv4.
For IPv6 or dual-stack, see [Configure IPv6](../how-to/find-and-connect/configure-ipv6.md).

The address Teku advertises to peers can differ from the address it listens on, which matters when
the node is behind a NAT or router.
Teku autodetects the advertised address by default; you can configure it with
[`--p2p-advertised-ip`](../reference/cli/index.md#p2p-advertised-ip-p2p-advertised-ips).
You can also [specify NAT methods](../how-to/find-and-connect/specify-nat.md).

## Multiaddresses

Teku identifies peers using [multiaddresses](https://libp2p.io/concepts/fundamentals/addressing/).
A multiaddress includes the transport and port, so the TCP and QUIC addresses for the same node
differ:

- TCP - `/ip4/<ip>/tcp/9000/p2p/<peer_id>`
- QUIC - `/ip4/<ip>/udp/9001/quic-v1/p2p/<peer_id>`

The `p2p_addresses` field returned by the
[`/eth/v1/node/identity`](https://consensys.github.io/teku/#tag/Node/operation/getNetworkIdentity)
API endpoint lists the TCP and QUIC transport addresses.
The `discovery_addresses` field lists the UDP discovery address.
