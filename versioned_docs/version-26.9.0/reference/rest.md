---
description: Teku RESTful API
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Use the REST API

:::tip View the REST API
View the [REST API documentation] for information about the available API methods.
:::

## Enable the REST API service

Enable the REST API service from the command line by setting the [`--rest-api-enabled`](cli/index.md#rest-api-enabled) command line option to `true`.

You can also interact with APIs using Swagger UI by enabling the API documentation endpoint.

:::warning

Only trusted parties should access the REST API. Do not directly expose these APIs publicly on production nodes.

:::

Interact with Teku APIs using the web browser by setting the [`--rest-api-docs-enabled`](cli/index.md#rest-api-docs-enabled) command line option to `true`.

Access the APIs at `http:<interface>:<port>/swagger-ui` where:

- `interface` is specified using [`--rest-api-interface`](cli/index.md#rest-api-interface)
- `port` is specified using [`--rest-api-port`](cli/index.md#rest-api-port)

The default location is `http://localhost:5051/swagger-ui`.

You can also use tools such as [Postman] or [cURL] to interact with Teku APIs.

<Tabs>
  <TabItem value="cURL request" label="cURL request" default>

```bash
curl -X GET "http://localhost:5051/eth/v1/node/identity"
```

  </TabItem>
  <TabItem value="JSON Result" label="JSON Result" >

```json
{
  "data": {
    "peer_id": "16Uiu2HAkuWPWqF4W3aw9oo5Yw79v5muzBaaGTGKumuXR8qkSVq6y",
    "enr": "enr:-KG4QJ3PlL-XIRZCBq3L-uZ4wovEVEvxUMmvv75YDk9imb21clm0x3V2J5Vf9Zz3tLDpTplhG68_kzZPOxcU0ttwNDAEhGV0aDKQtTA_KgAAAAD__________4JpZIJ2NIJpcIS5a1YhiXNlY3AyNTZrMaECATVJhRqBrqyo8l6JKz6HidWL82kQcDmtKWuQZLDmZmqDdGNwgiMog3VkcILZIg",
    "p2p_addresses": [
      "/ip4/10.0.0.42/tcp/9000/p2p/16Uiu2HAkuWPWqF4W3aw9oo5Yw79v5muzBaaGTGKumuXR8qkSVq6y"
    ],
    "discovery_addresses": [
      "/ip4/10.0.0.42/udp/55586/p2p/16Uiu2HAkuWPWqF4W3aw9oo5Yw79v5muzBaaGTGKumuXR8qkSVq6y"
    ],
    "metadata": {
      "seq_number": "0",
      "attnets": "0x0000000000000000"
    }
  }
}
```

  </TabItem>
</Tabs>

### Configure the API for network interfaces and host allowlist

You can use the [`rest-api-host-allowlist`](cli/index.md#rest-api-host-allowlist) and [`rest-api-interface`](cli/index.md#rest-api-interface)
options to control which hosts and network interfaces Teku's REST API responds to.
Configure the API to listen on specific IP addresses or all interfaces with `rest-api-interface` and control
which hosts can connect using `rest-api-host-allowlist`:

| Configuration | Interface | Allowlist | Result |
|---------------|-----------|-----------|--------|
| Listen on all IP addresses and allow all hosts | `rest-api-interface="0.0.0.0"` | `rest-api-host-allowlist=["*"]` | Enables connections from any address, such as `localhost` (`127.0.0.1`) or `10.0.0.1`. |
| Listen on a specific IP address (`10.0.0.1`) and allow all hosts | `rest-api-interface="10.0.0.1"` | `rest-api-host-allowlist=["*"]` | Only the specified IP (`10.0.0.1`) can connect, and attempts from `localhost` (`127.0.0.1`) will fail. |
| Listen on all IP addresses but allow only `localhost` | `rest-api-interface="0.0.0.0"` | `rest-api-host-allowlist=["127.0.0.1"]` | Only `localhost` (`127.0.0.1`) can connect; other IP addresses (for example `10.0.0.1`) will receive a 403 error. |
| Listen on a specific IP address (`10.0.0.1`) but allow only `localhost` (`127.0.0.1`) | `rest-api-interface="10.0.0.1"` | `rest-api-host-allowlist=["127.0.0.1"]` | Neither can connect. `localhost` can't reach the server, and `10.0.0.1` is blocked. |

## Enable the validator client API

The [validator client API](../how-to/use-external-signer/manage-keys.md) allows you to call the
[key manager API endpoints](https://ethereum.github.io/keymanager-APIs/) and is enabled separately from the REST API methods.

Enable the validator client API service from the command line by including the
[`--validator-api-enabled`](cli/index.md#validator-api-enabled) command line option.

When enabling the validator client API, you must [create a keystore](../how-to/use-external-signer/manage-keys.md#create-a-keystore).
Set the keystore using [`--validator-api-keystore-file`](cli/index.md#validator-api-keystore-file) and the password file for the
keystore using [`--validator-api-keystore-password-file`](cli/index.md#validator-api-keystore-password-file).

```bash title="Example"
teku --validator-api-enabled --validator-api-keystore-file=validator_keystore.p12 --validator-api-keystore-password-file=validator_keystore_pass.txt
```

The [OpenAPI specifications](https://swagger.io/specification/) for the validator client API are available at `/swagger-docs` when
the [`--validator-api-docs-enabled`](cli/index.md#validator-api-docs-enabled) option is set to `true`.
The `/swagger-docs` endpoint defines the API if code generators are in use.

When enabling the API documentation endpoint, specify:

- `interface` using the [`--validator-api-interface`](cli/index.md#validator-api-interface) option.
- `port` using the [`--validator-api-port`](cli/index.md#validator-api-port) option.

<!-- Links -->

[REST API documentation]: https://consensys.github.io/teku/
[Postman]: https://www.postman.com/
[cURL]: https://curl.haxx.se/
