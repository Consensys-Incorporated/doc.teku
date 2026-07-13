---
title: Run Teku from Docker
description: Run Teku using the official Docker image.
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Run Teku from a Docker image

Use the Teku Docker image to run a node without installing Teku.

**Prerequisites**:

- [Docker](https://docs.docker.com/install/)

## Run Teku Docker image

Display the Teku command line help using the Docker image

```bash
docker run consensys/teku:latest --help
```

You can specify [Teku environment variables](../../reference/cli/index.md#specify-options) with the docker image instead of the command line options.

```bash title="Example using Environment variables and CLI options"
docker run -d                             \
  -p 9000:9000/tcp                        \
  -p 9000:9000/udp                        \
  -p 9001:9001/udp                        \
  -p 5051:5051                            \
  -e TEKU_REST_API_ENABLED=true           \
  -e TEKU_P2P_PORT=9000                   \
  --mount type=bind,source=/Users/user1/teku/,target=/var/lib/teku consensys/teku:latest \
  --network=hoodi                         \
  --eth1-endpoint=http://102.10.10.1:8545 \
  --validator-keys=/var/lib/teku/validator/keys:/var/lib/teku/validator/passwords \
  --data-path=/var/lib/teku               \
  --log-destination=CONSOLE
```

:::tip

- If running Docker in the background, set [`--log-destination`](../../reference/cli/index.md#log-destination) to `console` to send all logs to the console and appear in Docker's log output.
- Set [`--data-path`](../../reference/cli/index.md#data-base-path-data-path) to a mount point to ensure Teku data is not lost in the Docker filesystem.
- [Set the Docker user to the UID of the normal user](#allow-multiple-users-to-run-the-docker-image) to ensure read/write access to the required files.

:::

## Allow multiple users to run the Docker image

If using a local volume to mount data, ensure the permissions on the directory allow other users and groups to read/write.

Use the Docker [`--user`](https://docs.docker.com/engine/reference/commandline/run/) option to run the container for the specified user.
Use the UID because the username may not exist inside the docker container.

```bash title="Example"
docker run                                \
  -p 9000:9000/tcp                        \
  -p 9000:9000/udp                        \
  -p 9001:9001/udp                        \
  --user 1001:1001                        \
  --mount type=bind,source=/Users/user1/teku/,target=/var/lib/teku consensys/teku:latest \
  --data-base-path=/var/lib/teku          \
  --network=hoodi                         \
  --eth1-endpoint=http://102.10.10.1:8545 \
  --validator-keys=/var/lib/teku/validator/keys:/var/lib/teku/validator/passwords
```

## Exposing ports

Expose ports for P2P peer discovery, metrics, and REST APIs. Expose the default ports or the ports specified using:

- [`--metrics-port`](../../reference/cli/index.md#metrics-port)
- [`--p2p-port`](../../reference/cli/index.md#p2p-port)
- [`--p2p-quic-port`](../../reference/cli/index.md#p2p-quic-port)
- [`--p2p-advertised-port`](../../reference/cli/index.md#p2p-advertised-port)
- [`--p2p-advertised-quic-port`](../../reference/cli/index.md#p2p-advertised-quic-port)
- [`--rest-api-port`](../../reference/cli/index.md#rest-api-port).

Teku uses the [QUIC transport](../../concepts/p2p-networking.md) on `9001/udp` by default, so expose this port in addition to the TCP transport and discovery ports.

To run Teku exposing local ports for access:

```bash
docker run                                      \
  -p <localportP2P>:30303/tcp                   \
  -p <localportP2P>:30303/udp                   \
  -p <localportREST>:5051 consensys/teku:latest \
  --network=<NETWORK>                           \
  --data-base-path=<DATA_DIR>                   \
  --eth1-endpoint=<URL>                         \
  --validator-keys=<KEY_DIR>:<PASS_DIR>         \
  --rest-api-enabled=true
```

```bash title="Example"
docker run                                \
  -p 30303:30303/tcp                      \
  -p 30303:30303/udp                      \
  -p 5051:5051                            \
  --mount type=bind,source=/Users/user1/teku/,target=/var/lib/teku consensys/teku:latest \
  --network=hoodi                         \
  --data-base-path=/var/lib/teku          \
  --eth1-endpoint=http://102.10.10.1:8545 \
  --validator-keys=/var/lib/teku/validator/keys:/var/lib/teku/validator/passwords \
  --rest-api-enabled=true
```

## Run Teku using Docker Compose

**Prerequisites**:

- [Docker Compose](https://docs.docker.com/compose/)

The following `docker-compose.yml` file starts a [Besu] and Teku node.

:::note

The example assumes the validators specified in [`--validator-keys`](../../reference/cli/index.md#validator-keys) have already been registered in the deposit contract.

:::

Run `docker-compose up` in the directory containing the `docker-compose.yml` file to start the container.

<Tabs>
  <TabItem value="Hoodi" label="Hoodi" default>

```yaml
---
version: "3.4"
services:
  besu_node:
    image: hyperledger/besu:latest
    command:
      [
        "--network=hoodi",
        "--data-path=/var/lib/besu/data",
        "--host-allowlist=*",
        "--sync-mode=FAST",
        "--rpc-http-enabled",
        "--rpc-http-cors-origins=*",
        "--rpc-http-api=ETH,NET,CLIQUE,DEBUG,MINER,NET,PERM,ADMIN,EEA,TXPOOL,PRIV,WEB3",
        "--engine-jwt-secret=/var/lib/besu/data/token.txt",
        "--engine-host-allowlist=*",
        "--engine-rpc-enabled=true",
      ]
    volumes:
      - ./besu:/var/lib/besu/data
    ports:
      # Map the p2p port(30303), RPC HTTP port(8545), and engine port (8551)
      - "8545:8545"
      - "8551:8551"
      - "30303:30303/tcp"
      - "30303:30303/udp"

  teku_node:
    environment:
      - "JAVA_OPTS=-Xmx4g"
    image: consensys/teku:latest
    command:
      [
        "--network=hoodi",
        "--data-base-path=/var/lib/teku/data",
        "--validators-proposer-default-fee-recipient=YOUR_WALLET",
        "--ee-endpoint=http://besu_node:8551",
        "--ee-jwt-secret-file=/var/lib/teku/data/token.txt",
        "--validator-keys=/var/lib/teku/data/validator/keys:/var/lib/teku/data/validator/passwords",
        "--p2p-port=9000",
        "--rest-api-enabled=true",
        "--rest-api-docs-enabled=true",
      ]
    depends_on:
      - besu_node
    volumes:
      - ./teku:/var/lib/teku/data
    ports:
      # Map the TCP transport and discovery port(9000), QUIC transport port(9001), and REST API port(5051)
      - "9000:9000/tcp"
      - "9000:9000/udp"
      - "9001:9001/udp"
      - "5051:5051"
```

  </TabItem>

  <TabItem value="Ephemery" label="Ephemery">

```yaml
---
version: "3.4"
services:
  besu_node:
    image: hyperledger/besu:latest
    command:
      [
        "--network=ephemery",
        "--data-path=/var/lib/besu/data",
        "--host-allowlist=*",
        "--sync-mode=FAST",
        "--rpc-http-enabled",
        "--rpc-http-cors-origins=*",
        "--rpc-http-api=ETH,NET,CLIQUE,DEBUG,MINER,NET,PERM,ADMIN,EEA,TXPOOL,PRIV,WEB3",
        "--engine-jwt-secret=/var/lib/besu/data/token.txt",
        "--engine-host-allowlist=*",
        "--engine-rpc-enabled=true",
      ]
    volumes:
      - ./besu:/var/lib/besu/data
    ports:
      # Map the p2p port(30303), RPC HTTP port(8545), and engine port (8551)
      - "8545:8545"
      - "8551:8551"
      - "30303:30303/tcp"
      - "30303:30303/udp"

  teku_node:
    environment:
      - "JAVA_OPTS=-Xmx4g"
    image: consensys/teku:latest
    command:
      [
        "--network=ephemery",
        "--data-base-path=/var/lib/teku/data",
        "--validators-proposer-default-fee-recipient=YOUR_WALLET",
        "--ee-endpoint=http://besu_node:8551",
        "--ee-jwt-secret-file=/var/lib/teku/data/token.txt",
        "--validator-keys=/var/lib/teku/data/validator/keys:/var/lib/teku/data/validator/passwords",
        "--p2p-port=9000",
        "--rest-api-enabled=true",
        "--rest-api-docs-enabled=true",
      ]
    depends_on:
      - besu_node
    volumes:
      - ./teku:/var/lib/teku/data
    ports:
      # Map the TCP transport and discovery port(9000), QUIC transport port(9001), and REST API port(5051)
      - "9000:9000/tcp"
      - "9000:9000/udp"
      - "9001:9001/udp"
      - "5051:5051"
```

  </TabItem>

  <TabItem value="Mainnet" label="Mainnet" >

```yaml
---
version: "3.4"
services:
  besu_node:
    image: hyperledger/besu:latest
    command:
      [
        "--data-path=/var/lib/besu/data",
        "--host-allowlist=*",
        "--rpc-http-enabled",
        "--rpc-http-cors-origins=*",
        "--rpc-http-api=ETH,NET,CLIQUE,DEBUG,MINER,NET,PERM,ADMIN,EEA,TXPOOL,PRIV,WEB3",
        "--engine-jwt-secret=/var/lib/besu/data/token.txt",
        "--engine-host-allowlist=*",
        "--engine-rpc-enabled=true",
      ]
    volumes:
      - ./besu:/var/lib/besu/data
    ports:
      # Map the p2p port(30303), RPC HTTP port(8545), and engine port (8551)
      - "8545:8545"
      - "8551:8551"
      - "30303:30303/tcp"
      - "30303:30303/udp"

  teku_node:
    environment:
      - "JAVA_OPTS=-Xmx4g"
    image: consensys/teku:latest
    command:
      [
        "--data-base-path=/var/lib/teku/data",
        "--validators-proposer-default-fee-recipient=YOUR_WALLET",
        "--ee-endpoint=http://besu_node:8551",
        "--ee-jwt-secret-file=/var/lib/teku/data/token.txt",
        "--validator-keys=/var/lib/teku/data/validator/keys:/var/lib/teku/data/validator/passwords",
        "--p2p-port=9000",
        "--rest-api-enabled=true",
        "--rest-api-docs-enabled=true",
      ]
    depends_on:
      - besu_node
    volumes:
      - ./teku:/var/lib/teku/data
    ports:
      # Map the TCP transport and discovery port(9000), QUIC transport port(9001), and REST API port(5051)
      - "9000:9000/tcp"
      - "9000:9000/udp"
      - "9001:9001/udp"
      - "5051:5051"
```

  </TabItem>
</Tabs>

<!-- Links -->

[Besu]: https://besu.hyperledger.org/en/stable/
