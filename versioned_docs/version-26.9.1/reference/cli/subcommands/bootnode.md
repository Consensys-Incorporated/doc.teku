---
title: bootnode
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# `bootnode`

Run Teku in [bootnode-only](../../../how-to/find-and-connect/run-a-bootnode.md) mode.

## `network`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku bootnode --network=<NETWORK>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku bootnode --network=mainnet
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

Predefined network configuration. The default is `mainnet`.

Possible values are:

| Network    | Chain           | Type       | Description                                                           |
|------------|-----------------|------------|-----------------------------------------------------------------------|
| `mainnet`  | Consensus layer | Production | Main network                                                          |
| `hoodi`    | Consensus layer | Test       | Multi-client testnet                                                  |
| `ephemery` | Consensus layer | Test       | Multi-client testnet                                                  |
| `sepolia`  | Consensus layer | Test       | Multi-client testnet                                                  |
| `minimal`  | Consensus layer | Test       | Used for local testing and development networks                       |
| `gnosis`   | Consensus layer | Production | Network for the [Gnosis chain](https://www.gnosis.io/)                |
| `chiado`   | Consensus layer | Test       | Gnosis [testnet](https://docs.gnosischain.com/about/networks/chiado/) |
| `lukso`    | Consensus layer | Production | Network for the [Lukso chain](https://lukso.network/)                 |

## `p2p-port`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku bootnode --p2p-port=<PORT>[,<PORT>...]...
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku bootnode --p2p-port=9000
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_P2P_PORT=9000
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
p2p-port: 9000
```

  </TabItem>
</Tabs>

The P2P listening ports (UDP and TCP). The default is 9000.

## `p2p-advertised-ip`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku bootnode --p2p-advertised-ip=<IP_ADDRESS>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku bootnode --p2p-advertised-ip=192.168.1.132
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_P2P_ADVERTISED_IP=192.168.1.132
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
p2p-advertised-ip: "192.168.1.132"
```

  </TabItem>
</Tabs>

The peer-to-peer IP address(es) to advertise. The default address is `127.0.0.1`.

## `p2p-private-key-file`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku bootnode --p2p-private-key-file=<PATH_TO_FILE>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku bootnode --p2p-private-key-file=/home/me/me_node/key
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_P2P_PRIVATE_KEY_FILE=/home/me/me_node/key
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
p2p-private-key-file: "/home/me/me_node/key"
```

  </TabItem>
</Tabs>

The file containing the [node's private key](../../../concepts/p2p-networking.md#node-identity-and-private-key).

If a file doesn't exist at the specified path, Teku creates a new file and P2P private key to store inside.

:::important

Ensure you specify the complete file path, including the file name, and not only the directory location.

:::

## `config-file`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku bootnode --config-file=<FILE>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku bootnode --config-file=/home/me/me_node/config.yaml
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
teku bootnode --data-base-path=<PATH>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku bootnode --data-base-path=/home/me/me_node
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

## `log-color-enabled`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku bootnode --log-color-enabled[=<BOOLEAN>]
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku bootnode --log-color-enabled=false
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
teku bootnode --log-destination=<LOG_DESTINATION>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku bootnode --log-destination=CONSOLE
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

The default is `DEFAULT_BOTH`. When using `BOTH` or `DEFAULT_BOTH`, system updates such as blockchain events are displayed on the console, and errors and other information are logged to a file.
Specify the log file with the `--log-file` command line option.

For production systems we recommend using the `CONSOLE` or `FILE` options to ensure all log information is available in one place.

:::note

Use `DEFAULT_BOTH` when using a [custom Log4J2 configuration file](../../../how-to/monitor/configure-logging.md#advanced-custom-logging).
Any other option applies the custom logging changes on top of its default settings.

:::
