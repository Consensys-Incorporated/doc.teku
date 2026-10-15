---
title: Builder network and MEV-Boost
description: Learn about external builders and MEV-Boost.
sidebar_position: 2
---

# Builder network and MEV-Boost

[Consensus clients](./node-types.md#consensus-clients) are responsible for proposing
blocks containing an execution payload obtained from their local
[execution clients](./node-types.md#execution-clients) via the Engine API.

A consensus client can optionally configure an external builder and delegate the
execution payload construction to it, instead of using the execution client.

## MEV-Boost

The most common builder deployment is to run a specialized external software
such as [MEV-Boost](https://github.com/flashbots/mev-boost).
MEV-Boost works by requesting a payload proposal from several entities (called 
relays), and selecting the best bid in order to improve validator rewards and
increase the maximal extractable value (MEV).

Teku allows you to
[configure the beacon node to use a builder network](../how-to/configure/builder-network.md)
to generate execution payloads.
In case of failures or non-timely responses, Teku falls back to the payload
produced by the local execution client specified using
[`--ee-endpoint`](../reference/cli/index.md#ee-endpoint).
