---
title: Start Teku
description: Run Teku as a beacon node and/or validator.
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Start Teku

You can run Teku as a beacon node and validator in a single process, or as separate processes.

We recommend you run the beacon node and validator as a [single process] if they are to run on the same machine.

:::note

By default, Teku connects to `mainnet`. Use the [`--network`](../reference/cli/index.md#network) command line option to specify an alternate network.

:::

## Prerequisites

- [Teku installed](install/install-binaries.md).
- [An execution client synced](connect/mainnet.md#3-start-the-execution-client).
- [Validator keystores and password files](connect/mainnet.md#2-generate-validator-keys).

## Start the clients in a single process

Start the beacon node and validator as a single process by specifying the validator options using the [`teku`](../reference/cli/index.md#options) command.

```bash title="Example"
teku \
  --ee-endpoint=http://localhost:8551                       \
  --ee-jwt-secret-file=jwtsecret.hex                        \
  --metrics-enabled=true                                    \
  --rest-api-enabled=true                                   \
  --checkpoint-sync-url=https://beaconstate.ethstaker.cc    \
  --validators-proposer-default-fee-recipient=0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73 \
  --validator-keys=validator/keys/validator_888eef.json:validator/passwords/validator_888eef.txt
```

Use the [`--validator-keys`](../reference/cli/index.md#validator-keys) option to specify the directories or files to load the encrypted keystore file(s) and associated password file(s) from.

## Run the clients separately

Validators must connect to a beacon node to publish attestations or propose blocks. The beacon node requires internet access, but the connected validators can run on machines without internet access.

### Start the beacon node

Run Teku as a beacon node.

```bash title="Example"
teku \
    --ee-endpoint=http://localhost:8551                    \
    --ee-jwt-secret-file=jwtsecret.hex                     \
    --metrics-enabled=true                                 \
    --rest-api-enabled=true                                \
    --checkpoint-sync-url=https://beaconstate.ethstaker.cc \
```

Specify [`--rest-api-enabled`](../reference/cli/index.md#rest-api-enabled) to allow validators to connect to the beacon node.

:::caution

Don't pass the validator keys as a command line option to both the beacon node and validator client. This can cause a [slashable offense].

:::

By default, [validator clients] can connect to the beacon node at `http://127.0.0.1:5051`.
Use the [`--rest-api-interface`](../reference/cli/index.md#rest-api-interface) and [`--rest-api-port`](../reference/cli/index.md#rest-api-port) options to update the address.

You can specify [`--rest-api-host-allowlist`](../reference/cli/index.md#rest-api-host-allowlist) to allow access to the REST API from specific hostnames.

### Start the validator

To run a validator, connect to a [running beacon node].

Use the [`validator-client`](../reference/cli/subcommands/validator-client.md) or
[`vc`](../reference/cli/subcommands/validator-client.md) subcommand to run a Teku as a validator.

```title="Example"
teku validator-client \
    --beacon-node-api-endpoint=http://192.10.10.101:5051,http://192.140.110.44:5051 \
    --validator-keys=validator/keys:validator/passwords
```

:::warning

Ensure that the validator keys are only provided to the validator. Don't pass the validator keys as command line options to both the beacon node and validator client. This can cause a [slashable offense].

:::

Specify one or more beacon nodes using the [`--beacon-node-api-endpoint`](../reference/cli/subcommands/validator-client.md#beacon-node-api-endpoint-beacon-node-api-endpoints) option.

:::info

You can supply multiple beacon node endpoints to the validator. The first one is used as the primary node, and others as failovers.

:::

## Confirm Teku is running

Use the [`/liveness`](https://consensys.github.io/teku/#tag/Teku/operation/GetLiveness) endpoint to check whether the node is up.

The endpoint returns the status `200 OK` if the node is up or syncing.

<Tabs>
  <TabItem value="curl HTTP request" label="curl HTTP request" default>

```bash
curl -I -X GET "http://192.10.10.101:5051/teku/v1/admin/liveness"
```

  </TabItem>
  <TabItem value="Result" label="Result" >

```bash
HTTP/1.1 200 OK
Date: Fri, 05 Feb 2021 03:58:30 GMT
Server: Javalin
Content-Type: application/json
Cache-Control: max-age=0
Content-Length: 0
```

  </TabItem>
</Tabs>

## Exit codes

### Exit code 1

This code indicates a scenario where Teku has exited with a fatal error; however, restarting Teku without changes is a logical step in correcting it.
This code represents the error is related to something external to Teku.

Example: If the beacon chain controller has issues starting P2P services on a particular port, the system will exit with a fatal error code of 1. This could correct itself with a restart.

Example 2: If the migrate database command does not successfully migrate the database, Teku will exit with a code 1 fatal error. Restarting the system could correct this.

### Exit code 2

This code indicates a scenario where Teku has exited with a fatal error. Restarting Teku will not correct this.

Note that most user configuration errors fall into this category.

Example: If you specify an invalid database version in the migrate database command, Teku will exit with a code 2 fatal error.
To correct this, make the appropriate changes to the setup and then restart Teku.

### Usages

The exit codes for Teku are important to understand so that you know how to approach a restart and mitigate the issue.

The **service unit configuration** file is an example of how status codes can be used.
`RestartPreventExitStatus=` and `RestartForceExitStatus=` can be used to automatically restart Teku or stop it in case of failure.

The following is an example of a [`systemd.service`](https://www.freedesktop.org/software/systemd/man/latest/systemd.service.html) file:

```text
RestartForceExitStatus=1
RestartPreventExitStatus=2
```

<!-- links -->

[validator clients]: #start-the-validator
[running beacon node]: #start-the-beacon-node
[slashable offense]: ../concepts/slashing-protection.md
[single process]: #start-the-clients-in-a-single-process
