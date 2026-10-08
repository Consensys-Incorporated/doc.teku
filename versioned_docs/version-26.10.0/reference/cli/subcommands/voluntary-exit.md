---
title: voluntary-exit
sidebar_position: 7
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# `voluntary-exit`

Create and sign a [voluntary exit] for the specified validator or set of validators.
This subcommand can be run as a separate Teku process.

:::caution

To submit a voluntary exit, you must have a running beacon node with the [REST API enabled].

:::

## `beacon-node-api-endpoint`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku voluntary-exit --beacon-node-api-endpoint=<ENDPOINT>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku voluntary-exit --beacon-node-api-endpoint=http://192.138.10.12
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_BEACON_NODE_ENDPOINT=http://192.138.10.12
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
beacon-node-api-endpoint: "http://192.138.10.12"
```

  </TabItem>
</Tabs>

Endpoint of the beacon node's REST API. The default is `http://127.0.0.1:5051`.

## `config-file`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku voluntary-exit --config-file=<FILE>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku voluntary-exit --config-file=/home/me/me_node/config.yaml
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_CONFIG_FILE=/home/me/me_node/config.yaml
```

  </TabItem>
</Tabs>

Path to the YAML configuration file. The default is `none`.

## `confirmation-enabled`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku voluntary-exit --confirmation-enabled=<BOOLEAN>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku voluntary-exit --confirmation-enabled=false
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_CONFIRMATION_ENABLED=false
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
confirmation-enabled: false
```

  </TabItem>
</Tabs>

Specify whether to request confirmation when exiting a validator. The default is `true`.

:::warning

If you set `--confirmation-enabled` to `false`, exits are generated immediately without any prompt.

:::

## `epoch`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku voluntary-exit --epoch=<EPOCH>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku voluntary-exit --epoch=24500
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_EPOCH=24500
```

  </TabItem>
</Tabs>

Earliest epoch that the voluntary exit can be processed. The specified epoch can be a past epoch, or current epoch. You cannot specify a future epoch. The default is the current epoch.

:::note

If there is a high number of validators that are queued to exit, then the validator exit may be processed at a later epoch.

:::

## `include-keymanager-keys`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku voluntary-exit --include-keymanager-keys=<BOOLEAN>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku voluntary-exit --include-keymanager-keys=true
```

  </TabItem>
</Tabs>

Include validator keys managed using the [key manager APIs](../../../how-to/use-external-signer/manage-keys.md). The default is `false`.

## `network`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku voluntary-exit --network=<NETWORK>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku voluntary-exit --network=mainnet
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_NETWORK=mainnet
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
network: "mainnet"
```

  </TabItem>
</Tabs>

Predefined network configuration. There is no default value, because Teku reads the network specification from the Beacon API unless specified.

## `save-exits-path`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku voluntary-exit --save-exits-path=<PATH>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku voluntary-exit --save-exits-path=signedExitsPath
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_SAVE_EXITS_PATH=signedExitsPath
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
save-exits-path: "signedExitsPath"
```

  </TabItem>
</Tabs>

Path at which to save the generated exit messages.
This option [creates but doesn't submit an exit](../../../how-to/voluntarily-exit.md#create-but-dont-submit-an-exit).
It doesn't validate the exit epoch, and doesn't publish the exit messages.

## `validator-keys`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku voluntary-exit --validator-keys=<KEY_DIR>:<PASS_DIR> | <KEY_FILE>:<PASS_FILE>[,<KEY_DIR>:<PASS_DIR> | <KEY_FILE>:<PASS_FILE>...]...
```

  </TabItem>
  <TabItem value="Example for directory" label="Example for directory" >

```bash
teku voluntary-exit --validator-keys=/home/validator/keys:home/validator/passwords
```

  </TabItem>
  <TabItem value="Example for file" label="Example for file" >

```bash
teku voluntary-exit --validator-keys=/home/validator/keys/validator_217179e.json:/home/validator/passwords/validator_217179e.txt
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_VALIDATOR_KEYS=/home/validator/keys:home/validator/passwords
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
validator-keys: "/home/validator/keys:home/validator/passwords"
```

  </TabItem>
</Tabs>

Directory or file to load the encrypted keystores and passwords of the validators that you wish to exit.
Keystore files must use the `.json` file extension, and password files must use the `.txt` file extension.

When specifying directories, Teku expects to find identically named keystore and password files. For example `validator_217179e.json` and `validator_217179e.txt`.

When specifying file names, Teku expects that the files exist.

## `validator-public-keys`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku voluntary-exit --validator-public-keys=<PUBKEY>[,<PUBKEY>...]...
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku voluntary-exit --validator-public-keys=0xc7931ac6937f6c776d8dfe84918f7b26d986f2e45af5869085839b8817db2705,0x179a0e2768621eede9ce961cf8ee4f0ece5be9a1795c294269b69b85c765f3cc
```

  </TabItem>
</Tabs>

Restrict the exit command to a specified list of public keys. When the parameter is not used, all keys will be exited.

## `validators-external-signer-keystore`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku voluntary-exit --validators-external-signer-keystore=<FILE>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku voluntary-exit --validators-external-signer-keystore=teku_client_keystore.p12
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_VALIDATORS_EXTERNAL_KEYSTORE=teku_client_keystore.p12
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
validators-external-signer-keystore: "teku_client_keystore.p12"
```

  </TabItem>
</Tabs>

The keystore that Teku presents to the external signer for TLS authentication. Teku can use PKCS12 or JKS keystore types.

Use the PKCS12 keystore type if connecting to Web3Signer.

## `validators-external-signer-keystore-password-file`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku voluntary-exit --validators-external-signer-keystore-password-file=<FILE>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku voluntary-exit --validators-external-signer-keystore-password-file=keystore_pass.txt
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_VALIDATORS_EXTERNAL_KEYSTORE_PASSWORD_FILE=keystore_pass.txt
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
validators-external-signer-keystore-password-file: "keystore_pass.txt"
```

  </TabItem>
</Tabs>

Password file used to decrypt the keystore.

## `validators-external-signer-public-keys`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku voluntary-exit --validators-external-signer-public-keys=<KEY>[,<KEY>...]
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku voluntary-exit --validators-external-signer-public-keys=0xa99a...e44c,0xb89b...4a0b
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_VALIDATORS_EXTERNAL_SIGNER_PUBLIC_KEYS=0xa99a...e44c,0xb89b...4a0b
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
validators-external-signer-public-keys: ["0xa99a...e44c","0xb89b...4a0b"]
```

  </TabItem>
</Tabs>

List of public keys of validators that you wish to voluntarily exit when using an external signer (for example, [Web3Signer]).

Use the URL to load the public keys from a remote service. For example:

```bash
teku voluntary-exit --validators-external-signer-public-keys=http://localhost:9900/api/v1/eth2/publicKeys
```

Use the value `external-signer` to load all public keys managed by the external signer. Teku automatically queries the external signer's [public keys endpoint](https://consensys.github.io/web3signer/#tag/Public-Key).

```bash
teku voluntary-exit --validators-external-signer-public-keys=external-signer
```

## `validators-external-signer-timeout`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku voluntary-exit --validators-external-signer-timeout=<INTEGER>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku voluntary-exit --validators-external-signer-timeout=2000
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_VALIDATORS_EXTERNAL_SIGNER_TIMEOUT=2000
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
validators-external-signer-timeout: 2000
```

  </TabItem>
</Tabs>

Timeout in milliseconds for requests to the external signer. The default is 5000.

## `validators-external-signer-truststore`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku voluntary-exit --validators-external-signer-truststore=<FILE>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku voluntary-exit --validators-external-signer-truststore=websigner_truststore.p12
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_VALIDATORS_EXTERNAL_TRUSTSTORE=websigner_truststore.p12
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
validators-external-signer-truststore: "websigner_truststore.p12"
```

  </TabItem>
</Tabs>

PKCS12 or JKS keystore used to trust external signer's self-signed certificate or CA certificate which signs the external signer's certificate.

## `validators-external-signer-truststore-password-file`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku voluntary-exit --validators-external-signer-truststore-password-file=<FILE>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku voluntary-exit --validators-external-signer-truststore-password-file=truststore_pass.txt
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_VALIDATORS_EXTERNAL_TRUSTSTORE_PASSWORD_FILE=truststore_pass.txt
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
validators-external-signer-truststore-password-file: "truststore_pass.txt"
```

  </TabItem>
</Tabs>

Password file used to decrypt the keystore.

## `validators-external-signer-url`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku voluntary-exit --validators-external-signer-url=<URL>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku voluntary-exit --validators-external-signer-url=http://localhost:9000
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_VALIDATORS_EXTERNAL_SIGNER_URL=http://localhost:9000
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
validators-external-signer-url: "http://localhost:9000"
```

  </TabItem>
</Tabs>

URL of the external signer (for example, [Web3Signer]).

<!-- links -->

[Web3Signer]: https://docs.web3signer.consensys.net/en/latest/
[REST API enabled]: ../index.md#rest-api-enabled
[voluntary exit]: ../../../how-to/voluntarily-exit.md
