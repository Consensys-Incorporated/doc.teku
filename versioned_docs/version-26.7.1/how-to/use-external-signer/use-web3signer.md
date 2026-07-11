---
title: Use Web3Signer
description: Use the Web3Signer external signing client.
sidebar_position: 1
---

# Use Web3Signer

Teku supports the [Web3Signer] external signing client.

**Prerequisites**:

- Web3Signer installed and running
- [Signing key configuration files]

## Start Teku

Start Teku and specify the external signer options.
For example:

```bash
teku \
  --network=hoodi                                                      \
  --eth1-endpoint=http://localhost:8545                                \
  --validators-external-signer-public-keys=0xa99a...e44c,0xb89b...4a0b \
  --validators-external-signer-url=http://localhost:9000
```

The command line specifies the following:

- The network using [`--network`](../../reference/cli/index.md#network).
- The JSON-RPC URL of the execution layer client using [`--eth1-endpoint`](../../reference/cli/index.md#eth1-endpoint-eth1-endpoints).
- The validator public keys for which Web3Signer signs attestations and blocks using
  [`--validators-external-signer-public-keys`](../../reference/cli/index.md#validators-external-signer-public-keys).
- The URL of the Web3Signer client using [`--validators-external-signer-url`](../../reference/cli/index.md#validators-external-signer-url).

:::note

You need a [signing key configuration file] for each public key specified using [`--validators-external-signer-public-keys`](../../reference/cli/index.md#validators-external-signer-public-keys).

:::

<!--links-->

[Web3Signer]: https://docs.web3signer.consensys.net/
[Signing key configuration files]: https://docs.web3signer.consensys.net/HowTo/Use-Signing-Keys/
[signing key configuration file]: https://docs.web3signer.consensys.net/en/latest/HowTo/Use-Signing-Keys/
