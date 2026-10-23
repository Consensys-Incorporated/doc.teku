---
title: Configure builders for the Glamsterdam upgrade
description: Configure Teku to request builder bids after the Glamsterdam upgrade.
sidebar_position: 3
---

# Configure builders for the Glamsterdam upgrade

The Glamsterdam upgrade (the [Gloas fork](https://github.com/ethereum/builder-specs/tree/main/specs/gloas))
enshrines proposer-builder separation (ePBS).
Builders send bids directly to proposers or over p2p, and the protocol enforces the winning bid.
Your validator client requests bids from builders, so you no longer need MEV-Boost.

## 1. Remove MEV-Boost after the upgrade

After your network activates Glamsterdam:

- Stop MEV-Boost.
- Remove [`--builder-endpoint`](../../reference/cli/index.md#builder-endpoint) and
  [`--validators-builder-registration-default-enabled`](../../reference/cli/index.md#validators-builder-registration-default-enabled).

Teku stops sending validator registrations from Glamsterdam.

## 2. Set the builder options

Set the following options on your validator client.
If you run validators in the beacon node, set them on the beacon node.

| Option | Default | Description |
| --- | --- | --- |
| [`--builder-urls`](../../reference/cli/index.md#builder-urls) | None | Builders to request bids from. |
| [`--builder-min-bid`](../../reference/cli/index.md#builder-min-bid) | `0` | Minimum payment, in Gwei, for bids from your builders. |
| [`--builder-boost-factor`](../../reference/cli/index.md#builder-boost-factor) | `100` | Percentage applied to your builders' bids when compared with the local payload. |
| [`--builder-max-execution-payment`](../../reference/cli/index.md#builder-max-execution-payment) | `0` | Maximum off-chain execution payment, in Gwei, that counts towards a bid. |
| [`--p2p-builder-min-bid`](../../reference/cli/index.md#p2p-builder-min-bid) | `0` | Minimum payment, in Gwei, for bids received over p2p. |
| [`--p2p-builder-boost-factor`](../../reference/cli/index.md#p2p-builder-boost-factor) | `100` | Percentage applied to p2p bids when compared with the local payload. |

For example:

```bash
--builder-urls=https://builder.example.com \
--builder-min-bid=1000000000 \
--builder-boost-factor=90 \
--p2p-builder-boost-factor=80 \
--builder-max-execution-payment=500000000
```

:::tip

To always build blocks locally, set both `--builder-boost-factor` and `--p2p-builder-boost-factor`
to `0`.

:::

## 3. Configure builders per validator (optional)

Use a [proposer configuration file](use-proposer-config-file.md) to override the builder options for
specific validators.
Add the following attributes to `builder`, in `default_config` or in a `proposer_config` entry:

- `enabled` - Requests bids from builders. The default is `true` from Glamsterdam.
- `min_bid`, `builder_boost_factor` - Override both the `--builder-*` and `--p2p-builder-*` options.
- `builders` - The builders to request bids from.
  Replaces `--builder-urls`.
  Set to `[]` to use no builders.

Each `builders` entry has the following attributes:

- `url` - (required) The builder URL.
- `auth_data` - Hex data sent in the request authentication.
  The default is the builder host name.
- `builder_pubkeys` - Builder public keys to accept bids from.
  The default accepts any builder.
- `min_bid`, `builder_boost_factor`, `max_execution_payment` - Override the values for this builder.

You can list the same URL more than once with a different `auth_data`.

```json title="proposer-config.json"
{
  "proposer_config": {
    "0xa057816155ad77931185101128655c0191bd0214c201ca48ed887f6c4c6adf334070efcd75140eada5ac83a92506dd7a": {
      "fee_recipient": "0x50155530FCE8a85ec7055A5F8b2bE214B3DaeFd3",
      "builder": {
        "min_bid": "1000000000",
        "builders": [
          {
            "url": "https://builder-two.example.com",
            "builder_boost_factor": "110",
            "max_execution_payment": "250000000"
          },
          { "url": "https://builder-three.example.com", "auth_data": "0x1234567890abcdef" }
        ]
      }
    },
    "0xa99a76ed7796f7be22d5b7e85deeb7c5677e88e511e0b337618f8c4eb61349b4bf2d153f649f7b53359fe8b94a38e44c": {
      "builder": { "enabled": false }
    }
  },
  "default_config": {
    "fee_recipient": "0x6e35733c5af9B61374A128e6F85f553aF09ff89A",
    "builder": { "enabled": true }
  }
}
```

In this example:

- `0xa0578...` requests bids from `builder-two` and `builder-three` with a minimum bid of 1 ETH.
- `0xa99a7...` doesn't request bids from builders.
- All other validators use the command line options.

Teku applies values in the following order: the validator's `proposer_config` entry, the
[Keymanager API](#manage-builders-with-the-keymanager-api), `default_config`, and then the command
line options.

## 4. Check your configuration before the upgrade

The proposer configuration file works before and after Glamsterdam.
Teku ignores `min_bid`, `builder_boost_factor`, and `builders` until the upgrade, so you can add
them now.

Before the upgrade:

- Remove `"enabled": false` from `default_config` if your validators should use builders.
  From Glamsterdam, `enabled` means requesting bids instead of registering with MEV-Boost.
- Set `builder_boost_factor` to `0` for a validator that must always build locally.
  `"enabled": false` doesn't stop p2p bids.

## Manage builders with the Keymanager API

Use the `builder_config` endpoints of the [Keymanager API](../../reference/rest.md) to change a
validator's builders at runtime:

- `GET /eth/v1/validator/{pubkey}/builder_config` - Get the configuration in use.
- `POST /eth/v1/validator/{pubkey}/builder_config` - Replace the configuration.
- `DELETE /eth/v1/validator/{pubkey}/builder_config` - Remove the configuration.

Teku rejects changes for a validator whose `proposer_config` entry sets `min_bid`,
`builder_boost_factor`, or `builders`.
