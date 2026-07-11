---
title: Configure TLS
description: Configure TLS communication between Teku and Web3Signer.
sidebar_position: 4
---

# Configure TLS

You can configure TLS for communication between Teku and an external signer, for example [Web3Signer].

:::info

The [Teku and Web3Signer TLS configuration tutorial] provides instructions to create the required keystores and configuration.

:::

## Prerequisites

**Web3Signer prerequisites**:

- [Password-protected PKCS12 keystore and password file].
- [Known clients file].

**Teku prerequisites**:

- [Teku's password-protected PKCS12 or JKS keystore and password file].
- [Web3Signer's password-protected PKCS12 or JKS truststore and password file].
- ETH1 client (for example [Besu]) synced to the required network.

## Start Web3Signer

Start Web3Signer with the TLS configuration options and specify the keystore and known clients file.

```bash
web3signer \
  --key-store-path=/Users/me/keyFiles/                                          \
  --tls-keystore-file=/Users/me/certs/web3signer_keystore.p12                   \
  --tls-keystore-password-file=/Users/me/certs/web3signer_keystore_password.txt \
  --tls-known-clients-file=/Users/me/certs/knownClients.txt                     \
  eth2
```

:::note

[Slashing protection] is enabled by default when using the `eth2` Web3Signer subcommand. If using Web3Signer slashing protection, ensure you [configure your slashing protection database].

:::

## Start Teku

Start Teku with the external signer, keystore, and truststore details.
For example:

```bash
teku \
  --network=hoodi                                                                           \
  --eth1-endpoint=http://localhost:8545                                                     \
  --validators-external-signer-public-keys=0xa99a...e44c,0xb89b...4a0b                      \
  --validators-external-signer-url=https://localhost:9000                                   \
  --validators-external-signer-truststore=/Users/me/certs/web3signer_truststore.p12         \
  --validators-external-signer-truststore-password-file=/Users/me/certs/truststore_pass.txt \
  --validators-external-signer-keystore=/Users/me/certs/teku_client_keystore.p12            \
  --validators-external-signer-keystore-password-file=/Users/me/certs/teku_keystore_password.txt
```

In the command:

- Specify the network using [`--network`](../../reference/cli/index.md#network).
- Specify the JSON-RPC URL of the execution layer client using [`--eth1-endpoint`](../../reference/cli/index.md#eth1-endpoint-eth1-endpoints).
- Specify the validator's public keys using [`--validators-external-signer-public-keys`](../../reference/cli/index.md#validators-external-signer-public-keys).
- Specify the URL of the running external signer using [`--validators-external-signer-url`](../../reference/cli/index.md#validators-external-signer-url).
- Specify the truststore and password file using [`validators-external-signer-truststore`](../../reference/cli/index.md#validators-external-signer-truststore) and [`validators-external-signer-truststore-password-file`](../../reference/cli/index.md#validators-external-signer-truststore-password-file).
- Specify the keystore and password file using [`validators-external-signer-keystore`](../../reference/cli/index.md#validators-external-signer-keystore) and [`validators-external-signer-keystore-password-file`](../../reference/cli/index.md#validators-external-signer-keystore-password-file).

<!-- links -->

[Web3Signer]: https://docs.web3signer.consensys.net/en/latest/
[Teku and Web3Signer TLS configuration tutorial]: ../../tutorials/configure-external-signer-tls.md
[Password-protected PKCS12 keystore and password file]: ../../tutorials/configure-external-signer-tls.md#web3signer-keystore-and-password-file
[Known clients file]: ../../tutorials/configure-external-signer-tls.md#3-create-the-known-clients-file
[Teku's password-protected PKCS12 or JKS keystore and password file]: ../../tutorials/configure-external-signer-tls.md#teku-keystore-and-password-file
[Web3Signer's password-protected PKCS12 or JKS truststore and password file]: ../../tutorials/configure-external-signer-tls.md#2-create-the-truststore-and-password-file
[Besu]: https://besu.hyperledger.org/public-networks/get-started/install
[Slashing protection]: https://docs.web3signer.consensys.net/en/latest/concepts/slashing-protection/
[configure your slashing protection database]: https://docs.web3signer.consensys.net/en/latest/HowTo/Configure-Slashing-Protection/
