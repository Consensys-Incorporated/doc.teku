---
title: Configure Teku to use a builder network
description: Connect to a builder network to generate execution payloads.
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Configure Teku to use a builder network

You can connect to a [builder network](../../concepts/builder-network.md) to generate execution
payloads for the [consensus client](../../concepts/node-types.md#consensus-clients).

The builder recommends new blocks that are validated by the consensus client.
If the builder goes down, the local execution client proposes a block instead.

Use the following steps to configure Teku to use a builder network.

## 1. Specify the builder endpoint

Specify the builder endpoint using the [`--builder-endpoint`](../../reference/cli/index.md#builder-endpoint)
command line option.
For example:

```bash
--builder-endpoint="https://builder-relay-sepolia.flashbots.net/"
```

View the [list of relay endpoints](https://github.com/flashbots/mev-boost#usage) for available endpoints.

You can also use external software such as [MEV-Boost](https://github.com/flashbots/mev-boost) to
connect to multiple relays.
For example:

```bash
--builder-endpoint=http://127.0.0.1:18550
```

## 2. Register the validator

You must register your validator with the builder before proposing a block.
On the validator client, enable registration for all validators using the
[`--validators-builder-registration-default-enabled`](../../reference/cli/index.md#validators-builder-registration-default-enabled)
command line option.

To enable registration for specific validators only, use the
[`--validators-proposal-config`](../../reference/cli/index.md#validators-proposer-config) option and
specify the enabled validators in the `proposer_config` field of the
[proposer configuration file](use-proposer-config-file.md).

```json title="proposerConfig.json"
{
  "proposer_config": {
    "0xa057816155ad77931185101128655c0191bd0214c201ca48ed887f6c4c6adf334070efcd75140eada5ac83a92506dd7a": {
      "fee_recipient": "0x50155530FCE8a85ec7055A5F8b2bE214B3DaeFd3",
      "builder": {
        "enabled": true,
        "gas_limit": "12345654321"
      }
    }
  },
  "default_config": {
    "fee_recipient": "0x6e35733c5af9B61374A128e6F85f553aF09ff89A",
    "builder": {
      "enabled": false
    }
  }
}
```

In this example, validator `0xa057816...` is registered with the builder, but any validator using
the default configuration isn't.

## Example builder configurations

In the following example, Teku is running with the beacon node and validator client in a single process.

```bash
teku \
    --ee-endpoint="http://127.0.0.1:8551"                  \
    --ee-jwt-secret-file="/etc/jwt-secret.hex"             \
    --validators-builder-registration-default-enabled=true \
    --builder-endpoint="http://127.0.0.1:18550"            \
    --validators-proposer-default-fee-recipient="0x6e35733c5af9B61374A128e6F85f553aF09ff89A"
```

In the following example, Teku is running with the beacon node and validator client in separate processes.
The beacon node runs with no validators in a single process, and the validator client maintains keys
in a separate process.
The proposer configuration is managed using a [proposer configuration file](use-proposer-config-file.md),
and the validator client communicates with the beacon node using REST API.

<Tabs>
<TabItem value="Beacon node">

```bash
teku \
    --rest-api-enabled=true                     \
    --ee-endpoint="http://127.0.0.1:8551"       \
    --ee-jwt-secret-file="/etc/jwt-secret.hex"  \
    --builder-endpoint="http://127.0.0.1:18550" \
    --validators-proposer-default-fee-recipient="0x6e35733c5af9B61374A128e6F85f553aF09ff89A"
```

</TabItem>
<TabItem value="Validator client">

```bash
teku validator-client \
    --validators-proposer-config="/etc/teku/proposerConfig.json"
```

</TabItem>
<TabItem value="Proposer configuration">

```json title="proposerConfig.json"
{
  "proposer_config": {
    "0xa057816155ad77931185101128655c0191bd0214c201ca48ed887f6c4c6adf334070efcd75140eada5ac83a92506dd7a": {
      "fee_recipient": "0x50155530FCE8a85ec7055A5F8b2bE214B3DaeFd3"
    }
  },
  "default_config": {
    "fee_recipient": "0x6e35733c5af9B61374A128e6F85f553aF09ff89A",
    "builder": {
      "enabled": true
    }
  }
}
```

</TabItem>
</Tabs>

In the following example, a validator client is connected to a beacon node that is using the builder
flow, and all keys use a specified fee recipient from the validator client by default.
Each epoch, the validator client will register all of its keys to the specified fee recipient with
the beacon node.

<Tabs>
<TabItem value="Beacon node">

```bash
teku \
    --rest-api-enabled=true                     \
    --ee-endpoint="http://127.0.0.1:8551"       \
    --ee-jwt-secret-file="/etc/jwt-secret.hex"  \
    --builder-endpoint="http://127.0.0.1:18550" \
    --validators-proposer-default-fee-recipient="0x6e35733c5af9B61374A128e6F85f553aF09ff89A"
```

</TabItem>
<TabItem value="Validator client">

```bash
teku validator-client \
    --validators-builder-registration-default-enabled=true \
    --validators-proposer-default-fee-recipient="0x6e35733c5af9B61374A128e6F85f553aF09ff89A"
```

</TabItem>
</Tabs>
