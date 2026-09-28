---
title: Use a proposer configuration file
description: Define complex fee recipients in a proposer configuration file.
sidebar_position: 2
---

# Use a proposer configuration file

You can define complex fee recipient and [builder network](builder-network.md) configurations for multiple validators using a proposer configuration file.
Specify the proposer configuration file using the [`--validators-proposer-config`](../../reference/cli/index.md#validators-proposer-config) command line option.

:::note

To define a single default fee recipient for all validator keys, use the [`--validators-proposer-default-fee-recipient`](../../reference/cli/index.md#validators-proposer-default-fee-recipient) option instead.

:::

## Proposer configuration file attributes

The proposer configuration file is a JSON file that specifies:

- `default_config` - (required) A default proposer configuration containing all default values to be applied to every validator. These values can be overridden for specific validators in `proposer_config`.
- `proposer_config` - (optional) A proposer configuration for multiple validator public keys.

Attributes for each proposer configuration are:

- `fee_recipient` - (optional in `proposer_config` but required in `default_config`) The fee recipient to use when proposing blocks.
- `builder` - (optional) The [builder network configuration](builder-network.md), which includes the following attributes:
  - `enabled` - (optional in `proposer_config` but required in `default_config`) Indicates whether to use the [builder endpoint](../../reference/cli/index.md#builder-endpoint) when proposing blocks.
     The default is `false`.
  - `gas_limit` - (optional) Gas limit for the builder. The default is `36000000`.
  - `registration_overrides` - (optional) Dedicated overrides to use during the registration process.
     Useful for distributed validator technology (DVT) and secret shared validator (SSV) technology.
     The override is specified using the following attributes:
    - `timestamp` - (optional) Timestamp to be used (instead of the current time) in the validator registration message.
    - `public_key` - (optional in `proposer_config` but forbidden in `default_config`) Public key to be used (instead of the validator's public key) in the validator registration message.

Each attribute value, for a given validator key, is determined using the following priority:

1. Specific configuration in `proposer_config`
2. Default configuration in `default_config`
3. Default CLI argument (applicable only to `builder.enabled`)
4. Default value (applicable only to `builder.enabled`)

```json title="Example configuration file"
{
  "proposer_config": {
    "0xa057816155ad77931185101128655c0191bd0214c201ca48ed887f6c4c6adf334070efcd75140eada5ac83a92506dd7a": {
      "fee_recipient": "0x50155530FCE8a85ec7055A5F8b2bE214B3DaeFd3",
      "builder": {
        "enabled": true,
        "gas_limit": "35000000"
      }
    },
    "0xa99a76ed7796f7be22d5b7e85deeb7c5677e88e511e0b337618f8c4eb61349b4bf2d153f649f7b53359fe8b94a38e44c": {
      "builder": {
        "enabled": true
      }
    }
  },
  "default_config": {
    "fee_recipient": "0x6e35733c5af9B61374A128e6F85f553aF09ff89A",
    "builder": {
      "enabled": false,
      "gas_limit": "25000000"
    }
  }
}
```

In this example, validator `0xa0578...` is configured as:

```json
"fee_recipient": "0x50155530FCE8a85ec7055A5F8b2bE214B3DaeFd3",
"builder": {
  "enabled": true,
  "gas_limit": "35000000"
}
```

Validator `0xa99a7...` is configured as:

```json
"fee_recipient": "0x6e35733c5af9B61374A128e6F85f553aF09ff89A",
"builder": {
  "enabled": true,
  "gas_limit": "25000000"
}
```

All other validators are configured as:

```json
"fee_recipient": "0x6e35733c5af9B61374A128e6F85f553aF09ff89A",
"builder": {
  "enabled": false,
  "gas_limit": "25000000"
}
```

## Example configuration file and CLI argument

The following is an example proposer configuration in conjunction with a CLI argument.

```json
{
  "proposer_config": {
    "0xa057816155ad77931185101128655c0191bd0214c201ca48ed887f6c4c6adf334070efcd75140eada5ac83a92506dd7a": {
      "fee_recipient": "0x50155530FCE8a85ec7055A5F8b2bE214B3DaeFd3",
      "builder": {
        "gas_limit": "35000000"
      }
    },
    "0xa99a76ed7796f7be22d5b7e85deeb7c5677e88e511e0b337618f8c4eb61349b4bf2d153f649f7b53359fe8b94a38e44c": {
      "builder": {
        "enabled": false
      }
    }
  },
  "default_config": {
    "fee_recipient": "0x6e35733c5af9B61374A128e6F85f553aF09ff89A"
  }
}
```

If [`--validators-builder-registration-default-enabled`](../../reference/cli/index.md#validators-builder-registration-default-enabled) is set to `true`:

- Validator `0xa0578...` is configured as:

  ```json
  "fee_recipient": "0x50155530FCE8a85ec7055A5F8b2bE214B3DaeFd3",
  "builder": {
    "enabled": true,
    "gas_limit": "35000000"
  }
  ```

- Validator `0xa99a7...` is configured as:

  ```json
  "fee_recipient": "0x6e35733c5af9B61374A128e6F85f553aF09ff89A"
  "builder": {
    "enabled": false,
    "gas_limit": "30000000"
  }
  ```

- All other validators are configured as:

  ```json
  "fee_recipient": "0x6e35733c5af9B61374A128e6F85f553aF09ff89A",
  "builder": {
    "enabled": true,
    "gas_limit": "30000000"
  }
  ```

If [`--validators-builder-registration-default-enabled`](../../reference/cli/index.md#validators-builder-registration-default-enabled) isn't specified (or set to `false`):

- Validator `0xa0578...` is configured as:

  ```json
  "fee_recipient": "0x50155530FCE8a85ec7055A5F8b2bE214B3DaeFd3",
  "builder": {
    "enabled": false,
    "gas_limit": "35000000"
  }
  ```

- Validator `0xa99a7...` is configured as:

  ```json
  "fee_recipient": "0x6e35733c5af9B61374A128e6F85f553aF09ff89A",
  "builder": {
    "enabled": false,
    "gas_limit": "30000000"
  }
  ```

- All other validators are configured as:

  ```json
  "fee_recipient": "0x6e35733c5af9B61374A128e6F85f553aF09ff89A",
  "builder": {
    "enabled": false,
    "gas_limit": "30000000"
  }
  ```

## Example configuration file using DVT and SSV

The following is a proposer configuration example using distributed validator technology (DVT) and secret shared validator (SSV) technology.

```json
{
  "proposer_config": {
    "0xa057816155ad77931185101128655c0191bd0214c201ca48ed887f6c4c6adf334070efcd75140eada5ac83a92506dd7a": {
      "builder": {
        "registration_overrides": {
          "public_key": "0xaef9162ee6f29ee82fbfe387756d84f9ac472eb8709217aaf28f5ef0ea273f6210e531496470b30d2b7747216e3672d5"
        }
      }
    },
    "0xa99a76ed7796f7be22d5b7e85deeb7c5677e88e511e0b337618f8c4eb61349b4bf2d153f649f7b53359fe8b94a38e44c": {
      "builder": {
        "registration_overrides": {
          "public_key": "0xb53d21a4cfd562c469cc81514d4ce5a6b577d8403d32a394dc265dd190b47fa9f829fdd7963afdf972e5e77854051f6f"
        }
      }
    }
  },
  "default_config": {
    "fee_recipient": "0x6e35733c5af9B61374A128e6F85f553aF09ff89A",
    "builder": {
      "enabled": true,
      "registration_overrides": {
        "timestamp": "1669285248"
      }
    }
  }
}
```

In this example, the builder is enabled by default, with `timestamp` registration override.
Each validator has its own `public_key` override.
All validators use the same `0x6e35733c5af9B61374A128e6F85f553aF09ff89A` as `fee_recipient`.
