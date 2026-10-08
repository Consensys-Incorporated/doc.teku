---
title: validator-client, vc
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# `validator-client`, `vc`

Run a validator client that connects to a remote beacon node.

## `beacon-node-api-endpoint`, `beacon-node-api-endpoints`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku vc --beacon-node-api-endpoint=<ENDPOINT>[,<ENDPOINT>...]...
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku vc --beacon-node-api-endpoint=http://192.138.10.12:5051,http://192.140.11.44:5051
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_BEACON_NODE_API_ENDPOINT=http://192.138.10.12,http://192.140.11.44:5051
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
beacon-node-api-endpoint: ["http://192.138.10.12","http://192.140.11.44:5051"]
```

  </TabItem>
</Tabs>

Endpoint of the beacon node's REST API. You can configure multiple beacon nodes by providing a comma-separated list of beacon node API endpoints.

If multiple beacon node endpoints are configured, the first one is used as primary and others as failovers.

:::note

This option cannot be used with the [sentry beacon nodes early access feature](../../../how-to/use-sentry-nodes.md).

:::

The default is `http://127.0.0.1:5051`.

## `beacon-node-ssz-blocks-enabled`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku vc --beacon-node-ssz-blocks-enabled=<BOOLEAN>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku vc --beacon-node-ssz-blocks-enabled=false
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_BEACON_NODE_SSZ_BLOCKS_ENABLED=false
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
beacon-node-ssz-blocks-enabled: false
```

  </TabItem>
</Tabs>

Enable or disable the use of SSZ encoding for API requests to the beacon node to create blocks. The default is `true`.

## `config-file`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku vc --config-file=<FILE>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku vc --config-file=/home/me/me_node/config.yaml
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_CONFIG_FILE=/home/me/me_node/config.yaml
```

  </TabItem>
</Tabs>

Path to the YAML configuration file. The default is `none`.

## `data-base-path`, `data-path`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku vc --data-base-path=<PATH>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku vc --data-base-path=/home/me/me_node
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_DATA_BASE_PATH=/home/me/me_node
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
data-base-path: "/home/me/me_node"
```

  </TabItem>
</Tabs>

Path to the Teku base directory for storage. The default directory is OS-dependent:

- macOS: `~/Library/teku`
- Unix/Linux: `$XDG_DATA_HOME/teku` if `$XDG_DATA_HOME` is set; otherwise `~/.local/share/teku`

The default Docker image location is `/root/.local/share/teku`.

## `data-validator-path`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku vc --data-validator-path=<PATH>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku vc --data-validator-path=/home/me/me_validator
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_DATA_VALIDATOR_PATH=/home/me/me_validator
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
data-validator-path: "/home/me/me_validator"
```

  </TabItem>
</Tabs>

Path to the validator client data. The default is `<data-base-path>/validator` where `<data-base-path>` is specified using [`--data-base-path`](#data-base-path-data-path).

## `log-color-enabled`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku vc --log-color-enabled[=<BOOLEAN>]
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku vc --log-color-enabled=false
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_LOG_COLOR_ENABLED=false
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
log-color-enabled: false
```

  </TabItem>
</Tabs>

Specify whether status and event log messages include a console color display code. The default is `true`.

## `log-destination`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku vc --log-destination=<LOG_DESTINATION>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku vc --log-destination=CONSOLE
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_LOG_DESTINATION=CONSOLE
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
log-destination: "CONSOLE"
```

  </TabItem>
</Tabs>

Specify where to output log information. Valid options are:

- `BOTH`
- `CONSOLE`
- `DEFAULT_BOTH`
- `FILE`

The default is `DEFAULT_BOTH`. When using `BOTH` or `DEFAULT_BOTH`, system updates such as blockchain events
are displayed on the console, and errors and other information are logged to a file. Specify the log file
with the [`--log-file`](#log-file) command-line option.

For production systems we recommend using the `CONSOLE` or `FILE` options to ensure all log information is available in one place.

:::note

Use `DEFAULT_BOTH` when using a
[custom Log4J2 configuration file](../../../how-to/monitor/configure-logging.md#advanced-custom-logging). Any
other option applies the custom logging changes on top of its default settings.

:::

## `log-file`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku vc --log-file=<FILENAME>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku vc --log-file=teku_2020-01-01.log
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_LOG_FILE=teku_2020-01-01.log
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
log-file: "teku_2020-01-01.log"
```

  </TabItem>
</Tabs>

Relative or absolute location, and filename of the log file.

The default directory is OS-dependent:

- macOS: `~/Library/teku/logs`
- Unix/Linux: `$XDG_DATA_HOME/teku/logs` if `$XDG_DATA_HOME` is set; otherwise `~/.local/share/teku/logs`

The default Docker image location is `/root/.local/share/teku/logs`.

## `log-file-name-pattern`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku vc --log-file-name-pattern=<REGEX>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku vc --log-file-name-pattern=tekuL_%d{yyyy-MM-dd}.log
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_LOG_FILE_NAME_PATTERN=tekuL_%d{yyyy-MM-dd}.log
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
log-file-name-pattern: "tekuL_%d{yyyy-MM-dd}.log"
```

  </TabItem>
</Tabs>

Filename pattern to apply when creating log files. The default pattern is `teku_%d{yyyy-MM-dd}.log`

## `log-include-events-enabled`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku vc --log-include-events-enabled[=<BOOLEAN>]
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku vc --log-include-events-enabled=false
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_LOG_INCLUDE_EVENTS_ENABLED=false
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
log-include-events-enabled: false
```

  </TabItem>
</Tabs>

Specify whether to log frequent update events. For example every slot event with validators and attestations. The default is `true`.

## `log-include-validator-duties-enabled`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku vc --log-include-validator-duties-enabled[=<BOOLEAN>]
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku vc --log-include-validator-duties-enabled=true
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_LOG_INCLUDE_VALIDATOR_DUTIES_ENABLED=true
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
log-include-validator-duties-enabled: true
```

  </TabItem>
</Tabs>

Specify whether to log details of validator event duties. The default is `true`.

:::note

Logs could become noisy when running many validators.

:::

## `metrics-categories`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku vc --metrics-categories=<CATEGORY>[,<CATEGORY>...]...
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku vc --metrics-categories=BEACON,JVM,PROCESS
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_METRICS_CATEGORIES=BEACON,JVM,PROCESS
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
metrics-categories: ["BEACON", "JVM", "PROCESS"]
```

  </TabItem>
</Tabs>

Categories for which to track metrics. Options are `JVM`, `PROCESS`, `BEACON`, `DISCOVERY`, `EVENTBUS`, `EXECUTOR`,
`LIBP2P`, `NETWORK`, `STORAGE`, `STORAGE_HOT_DB`, `STORAGE_FINALIZED_DB`, `VALIDATOR`,
`VALIDATOR_PERFORMANCE`, `VALIDATOR_DUTY`.

When `metrics-categories` is used, only the categories specified in this option are enabled (all other categories are disabled).

## `metrics-enabled`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku vc --metrics-enabled[=<BOOLEAN>]
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku vc --metrics-enabled=true
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_METRICS_ENABLED=true
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
metrics-enabled: true
```

  </TabItem>
</Tabs>

Set to `true` to enable the metrics exporter. The default is `false`.

## `metrics-host-allowlist`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku vc --metrics-host-allowlist=<hostname>[,<hostname>...]... or "*"
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku vc --metrics-host-allowlist=medomain.com,meotherdomain.com
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_METRICS_HOST_ALLOWLIST=medomain.com,meotherdomain.com
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
metrics-host-allowlist: ["medomain.com", "meotherdomain.com"]
```

  </TabItem>
</Tabs>

A comma-separated list of hostnames to allow access to the [Teku metrics]. By default, Teku accepts access from `localhost` and `127.0.0.1`.

:::tip

To allow all hostnames, use `"*"`. We don't recommend allowing all hostnames for production environments.

:::

## `metrics-interface`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku vc --metrics-interface=<HOST>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku vc --metrics-interface=192.168.10.101
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_METRICS_INTERFACE=192.168.10.101
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
metrics-interface: "192.168.10.101"
```

  </TabItem>
</Tabs>

Host on which Prometheus accesses Teku metrics. The default is `127.0.0.1`.

## `metrics-port`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku vc --metrics-port=<PORT>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku vc --metrics-port=6174
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_METRICS_PORT=6174
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
metrics-port: 6174
```

  </TabItem>
</Tabs>

Specifies the port (TCP) on which [Prometheus](https://prometheus.io/) accesses Teku metrics. The default is `8008`.

## `network`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku vc --network=<NETWORK>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku vc --network=auto
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_NETWORK=auto
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
network: "auto"
```

  </TabItem>
</Tabs>

Predefined network configuration. The default is `mainnet`.

Use `auto` to fetch the network configuration from the beacon node endpoint directly.

## `validator-keys`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku vc --validator-keys=<KEY_DIR>:<PASS_DIR> | <KEY_FILE>:<PASS_FILE>[,<KEY_DIR>:<PASS_DIR> | <KEY_FILE>:<PASS_FILE>...]...
```

  </TabItem>
  <TabItem value="Example for directory" label="Example for directory" >

```bash
teku vc --validator-keys=/home/validator/keys:home/validator/passwords
```

  </TabItem>
  <TabItem value="Example for file" label="Example for file" >

```bash
teku vc --validator-keys=/home/validator/keys/validator_217179e.json:/home/validator/passwords/validator_217179e.txt
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

Directory or file to load the encrypted keystore files and associated password files from. Keystore files
must use the `.json` file extension, and password files must use the `.txt` file extension.

When specifying directories, Teku expects to find identically named keystore and password files. For
example `validator_217179e.json` and `validator_217179e.txt`.

When specifying file names, Teku expects that the files exist.

## `validators-early-attestations-enabled`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku vc --validators-early-attestations-enabled[=<BOOLEAN>]
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku vc --validators-early-attestations-enabled=false
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_VALIDATORS_EARLY_ATTESTATIONS_ENABLED=false
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
validators-early-attestations-enabled: false
```

  </TabItem>
</Tabs>

Specify whether to use Teku's built-in early attestation production, which creates an attestation once a block is
received. The default is `true`.

Set this option to `false` if running a validator client connected to a load balanced beacon node
(including most hosted beacon nodes such as [Infura]), and validator effectiveness is poor.

:::note

Delaying attestation production increases the chances of generating a correct attestation when using a load
balanced beacon node, but it increases the risk of inclusion delays.

:::

## `validators-external-signer-keystore`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku vc --validators-external-signer-keystore=<FILE>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku vc --validators-external-signer-keystore=teku_client_keystore.p12
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
teku vc --validators-external-signer-keystore-password-file=<FILE>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku vc --validators-external-signer-keystore-password-file=keystore_pass.txt
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
teku vc --validators-external-signer-public-keys=<KEY>[,<KEY>...]
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku vc --validators-external-signer-public-keys=0xa99a...e44c,0xb89b...4a0b
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

List or URL of validator public keys used by an external signer (for example, [Web3Signer]).

Use the URL to load the public keys from a remote service. For example:

```bash
--validators-external-signer-public-keys=http://localhost:9900/api/v1/eth2/publicKeys
```

Use the value `external-signer` to load all public keys managed by the external signer. Teku automatically
queries the external signer's [public keys endpoint](https://consensys.github.io/web3signer/#tag/Public-Key).

```bash
--validators-external-signer-public-keys=external-signer
```

## `validators-external-signer-slashing-protection-enabled`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku vc --validators-external-signer-slashing-protection-enabled[=<BOOLEAN>]
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku vc --validators-external-signer-slashing-protection-enabled=false
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_VALIDATORS_EXTERNAL_SIGNER_SLASHING_PROTECTION_ENABLED=false
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
validators-external-signer-slashing-protection-enabled: false
```

  </TabItem>
</Tabs>

Specify whether to use Teku's built-in [slashing protection] when using an external signer such as [Web3Signer]. The default is `true`.

Set this option to `false` if using the slashing protection implemented by an external signer.

:::warning

Ensure the external signer has slashing protection enabled before disabling Teku slashing protection, otherwise
a validator may get slashed.

:::

Built-in slashing protection can only be disabled for validators using external signers. Validators using
Teku to sign blocks and attestations always uses its built-in slashing protection.

## `validators-external-signer-timeout`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku vc --validators-external-signer-timeout=<INTEGER>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku vc --validators-external-signer-timeout=2000
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
teku vc --validators-external-signer-truststore=<FILE>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku vc --validators-external-signer-truststore=websigner_truststore.p12
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

PKCS12 or JKS keystore used to trust external signer's self-signed certificate or CA certificate which
signs the external signer's certificate.

## `validators-external-signer-truststore-password-file`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku vc --validators-external-signer-truststore-password-file=<FILE>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku vc --validators-external-signer-truststore-password-file=truststore_pass.txt
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

Password file used to decrypt the [keystore](#validators-external-signer-truststore).

## `validators-external-signer-url`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku vc --validators-external-signer-url=<URL>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku vc --validators-external-signer-url=http://localhost:9000
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

URL on which the external signer (for example, Web3Signer) is running.

## `validators-graffiti`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku vc --validators-graffiti=<STRING>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku vc --validators-graffiti="Teku validator"
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_VALIDATORS_GRAFFITI="Teku validator"
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
validators-graffiti: "Teku validator"
```

  </TabItem>
</Tabs>

Graffiti to add when creating a block. Gets converted to bytes and padded to Bytes32.

The same graffiti is used for all validators started with this beacon node.

## `validators-graffiti-file`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku vc --validators-graffiti-file=<FILE>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku vc --validators-graffiti-file=/Users/me/mynode/graffiti.txt
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_VALIDATORS_GRAFFITI_FILE=/Users/me/mynode/graffiti.txt
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
validators-graffiti-file: "/Users/me/mynode/graffiti.txt"
```

  </TabItem>
</Tabs>

File containing the validator graffiti to add when creating a block. The file content is converted to `bytes`
and padded to `Bytes32`. The same graffiti is used for all validators started with this beacon node.

You can overwrite the file while Teku is running to update the graffiti.

This option takes precedence over [`--validators-graffiti`](#validators-graffiti).

## `validators-keystore-locking-enabled`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku vc --validators-keystore-locking-enabled=<BOOLEAN>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku vc --validators-keystore-locking-enabled=true
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_VALIDATORS_KEYSTORE_LOCKING_ENABLED=true
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
validators-keystore-locking-enabled: true
```

  </TabItem>
</Tabs>

Locks the keystore files listed in [`--validator-keys`](#validator-keys). The default is `true`.

Attempts to lock all keystores in a directory if a directory is specified in [`--validator-keys`](#validator-keys).

## `validators-performance-tracking-mode`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku vc --validators-performance-tracking-mode=<STRING>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku vc --validators-performance-tracking-mode=LOGGING
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_VALIDATORS_PERFORMANCE_TRACKING_MODE=LOGGING
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
validators-performance-tracking-mode: LOGGING
```

  </TabItem>
</Tabs>

Set the validator performance tracking strategy. Valid options are `LOGGING`, `METRICS`, `ALL`, and `NONE`. The default is `ALL`.

When `LOGGING` is enabled, attestation and block performance is reported as log messages. When `METRICS` is
enabled, attestation and block performance is reported using [metrics] in the [`VALIDATOR_PERFORMANCE`](#metrics-categories) metrics category.

<!-- links -->

[Web3Signer]: https://docs.web3signer.consensys.net/en/latest/
[slashing protection]: ../../../concepts/slashing-protection.md
[metrics]: ../../../how-to/monitor/use-metrics.md
