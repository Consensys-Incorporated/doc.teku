---
title: Voluntarily exit
description: Voluntarily exit a validator from the Beacon Chain.
sidebar_position: 8
---

# Voluntarily exit a validator

A voluntary exit is when a validator chooses to stop performing its duties, and exits the Beacon Chain permanently.

To voluntarily exit, the validator must continue performing its validator duties until successfully exited to avoid penalties.

:::caution important

To voluntarily exit, you must have a running beacon node with the [REST API enabled].

:::

:::warning

A validator **cannot** rejoin the network once it voluntarily exits. You can set up a new validator with the withdrawn funds.

:::

## Initiate a voluntary exit

Use the [`voluntary-exit`](../reference/cli/subcommands/voluntary-exit.md) subcommand to initiate a voluntary exit for specified validators.

```bash title="Example"
teku voluntary-exit                                \
  --beacon-node-api-endpoint=http://127.0.0.1:5051 \
  --validator-keys=validator/keys/validator_1e9f2a.json:validator/passwords/validator_1e9f2a.txt
```

In the command:

- Specify the location of the beacon node using the
  [`--beacon-node-api-endpoint`](../reference/cli/subcommands/voluntary-exit.md#beacon-node-api-endpoint) option.
- Specify the validators to exit using the
  [`--validator-keys`](../reference/cli/subcommands/voluntary-exit.md#validator-keys) option.
- Specify the earliest epoch at which to exit using the
  [`--epoch`](../reference/cli/subcommands/voluntary-exit.md#epoch) option.
  If not specified, the default value is the current epoch.
  You cannot specify a future epoch.

If using an external signer such as [Web3Signer], then specify the external signer URL and public key of the exiting validator:

```bash title="Example"
teku voluntary-exit                                      \
  --beacon-node-api-endpoint=http://127.0.0.1:5051       \
  --validators-external-signer-url=http://localhost:9000 \
  --validators-external-signer-public-keys=1e9f2afcc0737f4502e8d4238e4fe82d45077b2a549902b61d65367acecbccba
```

Use the [`/eth/v1/beacon/pool/voluntary_exits`](https://consensys.github.io/teku/#tag/Beacon/operation/getPoolVoluntaryExits) API to check the pending exit queue.

## Create but don't submit an exit

The [`voluntary-exit`](../reference/cli/subcommands/voluntary-exit.md) subcommand accepts an option [`--save-exits-path`](../reference/cli/subcommands/voluntary-exit.md#save-exits-path),
which creates a signed exit without submitting it to the beacon node.

[`--save-exits-path`](../reference/cli/subcommands/voluntary-exit.md#save-exits-path) allows an operator to create the voluntary exits for validators, and save them for future use.
These exit messages (from the Deneb fork) will be valid for the current or any future hard fork—they do not become invalid at any point in time.

```bash title="Example"
teku voluntary-exit                                \
  --beacon-node-api-endpoint=http://127.0.0.1:5051 \
  --save-exits-path=.                              \
  --validator-keys=validator/keys/validator_1e9f2a.json:validator/passwords/validator_1e9f2a.txt
```

In the command:

- Specify the location of the beacon node using the
  [`--beacon-node-api-endpoint`](../reference/cli/subcommands/voluntary-exit.md#beacon-node-api-endpoint) option.
- Specify the validators to exit using the
  [`--validator-keys`](../reference/cli/subcommands/voluntary-exit.md#validator-keys) option.
- Specify the path at which to save the generated exit messages using the
  [`--save-exits-path`](../reference/cli/subcommands/voluntary-exit.md#save-exits-path) option.

In this example, a JSON file is written to the current folder (`.`) containing a signed exit message
for validator `1e9f2a`.
At a future time when this exit needs to be processed, you can use the beacon API to submit
this message using a POST request to `/eth/v1/beacon/voluntary_exits`.

The `--beacon-node-api-endpoint` option is required even though the voluntary exit is not being submitted, as it verifies the status of the validator, and needs network parameters to generate a valid message.

<!-- links -->

[Web3Signer]: https://docs.web3signer.consensys.net/en/latest/
[REST API enabled]: ../reference/cli/index.md#rest-api-enabled
