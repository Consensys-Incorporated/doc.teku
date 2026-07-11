---
description: Configure Teku to listen over IPv6.
sidebar_position: 3
---

# Configure IPv6

In [peer-to-peer (P2P) networking](../../concepts/p2p-networking.md), Teku listens over IPv4 by default.
You can configure it to listen over [IPv6](#listen-over-only-ipv6) or
[both (dual-stack)](#listen-over-both-ipv4-and-ipv6-dual-stack).

## Listen over only IPv6

To configure Teku to listen only on IPv6, set the
[`--p2p-interface`](../../reference/cli/index.md#p2p-interface-p2p-interfaces) CLI option to `::`.
The [`--p2p-port`](../../reference/cli/index.md#p2p-port), [`--p2p-udp-port`](../../reference/cli/index.md#p2p-udp-port),
and [`--p2p-quic-port`](../../reference/cli/index.md#p2p-quic-port) CLI options are used for the TCP
transport, discovery, and QUIC transport ports.

In single-stack mode, Teku uses port `9000` for TCP and UDP, and `9001` for QUIC (UDP) by default.

## Listen over both IPv4 and IPv6 (dual-stack)

To configure Teku to listen over both IPv4 and IPv6, also known as dual-stack support, set the
[`--p2p-interface`](../../reference/cli/index.md#p2p-interface-p2p-interfaces) CLI option to
`0.0.0.0,::` for both IPv4 and IPv6 listening addresses.
In this setup, the [`--p2p-port`](../../reference/cli/index.md#p2p-port),
[`--p2p-udp-port`](../../reference/cli/index.md#p2p-udp-port), and
[`--p2p-quic-port`](../../reference/cli/index.md#p2p-quic-port) options apply to the IPv4 address.
The [`--p2p-port-ipv6`](../../reference/cli/index.md#p2p-port-ipv6),
[`--p2p-udp-port-ipv6`](../../reference/cli/index.md#p2p-udp-port-ipv6), and
[`--p2p-quic-port-ipv6`](../../reference/cli/index.md#p2p-quic-port-ipv6) options apply to the IPv6 address.

After dual-stack support is enabled, Teku uses the following ports by default:

- On IPv4: `9000` for TCP and UDP, and `9001` for QUIC (UDP)
- On IPv6: `9090` for TCP and UDP, and `9091` for QUIC (UDP)

## Advertise only the IPv6 address

To advertise only the IPv6 public address to the network, use the
[`--p2p-advertised-ip`](../../reference/cli/index.md#p2p-advertised-ip-p2p-advertised-ips) CLI option.
This is similar to advertising an IPv4 address.

You can configure the advertised ports using the
[`--p2p-advertised-port`](../../reference/cli/index.md#p2p-advertised-port) and
[`--p2p-advertised-quic-port`](../../reference/cli/index.md#p2p-advertised-quic-port) options.

## Advertise both IPv4 and IPv6 addresses (dual-stack)

To advertise both the IPv4 and IPv6 public addresses to the network, use the
[`--p2p-advertised-ips`](../../reference/cli/index.md#p2p-advertised-ip-p2p-advertised-ips) CLI
option and provide the two addresses, separated by a comma.

You can configure the advertised ports for the IPv4 address using the
[`--p2p-advertised-port`](../../reference/cli/index.md#p2p-advertised-port) and
[`--p2p-advertised-quic-port`](../../reference/cli/index.md#p2p-advertised-quic-port) options.

You can configure the advertised port for the IPv6 address using the
[`--p2p-advertised-port-ipv6`](../../reference/cli/index.md#p2p-advertised-port-ipv6) and
[`--p2p-advertised-quic-port-ipv6`](../../reference/cli/index.md#p2p-advertised-quic-port-ipv6) options.
