---
title: Manage validator signing keys
description: Manage validator keys using the key manager API endpoints.
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Manage validator signing keys

You can manage the signing keys of validators using the
[key manager API endpoints](https://ethereum.github.io/keymanager-APIs/).
You can list keys, import keystores, and delete keys with the API.

## Enable validator client API

To use the key manager API endpoints,
[enable the validator client API](../../reference/rest.md#enable-the-validator-client-api)
using the [`--validator-api-enabled`](../../reference/cli/index.md#validator-api-enabled)
option.
You must also [create a keystore](#create-a-keystore) to enable access.

### Create a keystore

When enabling the validator client API, you must create a keystore.

1. Use a tool such as
    [keytool](https://docs.oracle.com/javase/6/docs/technotes/tools/solaris/keytool.html)
    or [openSSL](https://www.openssl.org/) to generate a keystore.
    Note that the `CN` value must be set to the domain name or IP used to access
    the validator API.
    Keytool sets this based on the answer to `What is your first and last name?`.

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

    ```bash
    keytool -genkeypair -keystore <keystore> -storetype PKCS12 -storepass <password>
    ```

  </TabItem>
  <TabItem value="Example" label="Example" default>

    ```bash
    keytool -genkeypair -keystore validator_keystore.p12 -storetype PKCS12 -storepass changeit
    ```

  </TabItem>
</Tabs>

2. Create a plain text file (for example, `validator_keystore_pass.txt`) that
    stores the password you defined in the keystore.

3. Start Teku using
    [`--validator-api-keystore-file`](../../reference/cli/index.md#validator-api-keystore-file)
    to define the keystore file and
    [`--validator-api-keystore-password-file`](../../reference/cli/index.md#validator-api-keystore-password-file)
    to define the password file.

    ```bash title="Example"
    teku --validator-api-enabled --validator-api-keystore-file=validator_keystore.p12 --validator-api-keystore-password-file=validator_keystore_pass.txt
    ```

:::caution

Don't store your validator keys and
[withdrawal keys](../../concepts/withdrawals.md#withdrawal-keys) in the same
location.

:::

#### Support multiple domains and IPs

When the key manager API is accessible using different domain names or IP
addresses, each domain or IP must be listed in the SSL certificate to be
accepted as valid.
Multiple addresses can be specified when using openSSL to generate the certificate.

1. Create a file named `openssl.cnf` containing the configuration required for
    the certificate.

    ```ini title="openssl.cnf"
    [req]
    distinguished_name = req_distinguished_name
    x509_extensions = v3_req
    prompt = no

    [req_distinguished_name]
    countryName = US
    stateOrProvinceName = CA
    localityName = San Francisco
    organizationName = My Organization Name
    organizationalUnitName = My Department Name

    [v3_req]
    subjectKeyIdentifier = hash
    authorityKeyIdentifier = keyid,issuer
    basicConstraints = CA:TRUE
    subjectAltName = @alt_names

    [alt_names]
    DNS.1 = mydomain.com
    DNS.2 = localhost
    IP.1 = 127.0.0.1
    IP.2 = 10.0.0.6
    ```

    You should adjust the `req_distinguished_name` and `alt_names` sections to
    match your needs.

2. Create a plain text file (for example, `validator_keystore_pass.txt`) that
    stores the password you defined in the keystore.

3. Generate an x509 certificate from the configuration and convert it to PKCS12
    format:

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

    ```bash
    openssl req -x509 -nodes -days <expiry> -newkey rsa:2048 -config openssl.cnf | openssl pkcs12 -export -out <keystore> -passout file:<password-file>
    ```

  </TabItem>
  <TabItem value="Example" label="Example">

    ```bash
    openssl req -x509 -nodes -days 3650 -newkey rsa:2048 -config openssl.cnf | openssl pkcs12 -export -out validator_keystore.p12 -passout file:validator_keystore_pass.txt
    ```

  </TabItem>
</Tabs>

### Authentication

Authentication verifies user access to requested validator client methods.

Upon startup of the validator client, Teku creates an API token at the path
`/opt/teku/data/validator/key-manager`.
When calling an endpoint that requires authorization, you must send the
generated token in the `Authorization` request header field with the `Bearer`
authentication scheme.

```bash title="Example"
curl -H "Authorization: Bearer <TOKEN>" -X GET https://localhost:5052/eth/v1/keystores
```
