---
title: Use a configuration file
description: Specify options in the Teku configuration file.
sidebar_position: 1
---

# Use the Teku configuration file

To specify command line options in a file, use a YAML configuration file.

To specify the configuration file, use the [`--config-file`](../../reference/cli/index.md#config-file) option.

To override an option specified in the configuration file, either specify the same option on the command line or as an [environment variable](../../reference/cli/index.md#specify-options).
For options specified in more than one place, the order of precedence is command line, environment variable, configuration file.

## YAML specification

The configuration file must be a valid YAML file composed of key/value pairs. Each key is the corresponding command line option name without the leading dashes (`--`).

Values must conform to YAML specifications for strings, numbers, arrays, and booleans. Specific differences between the command line and the YAML file format are:

- Comma-separated lists on the command line are string arrays in the YAML file.
- Enclose all string values (including but not limited to file paths, hexadecimal numbers, URLs) in quotes.

:::tip

The [command line reference](../../reference/cli/index.md) includes configuration file examples for each option.

:::

```yaml title="Sample YAML configuration file"
# network
network: "hoodi"

# p2p
p2p-enabled: true
p2p-port: 9000

# validators
validator-keys: "/Users/me/node/hoodi/validator/keys:/Users/me/node/hoodi/validator/passwords"
validators-graffiti: "Teku validator"

# Eth 1
eth1-endpoint: "http://localhost:8545"

# metrics
metrics-enabled: true
metrics-categories: ["BEACON", "LIBP2P", "NETWORK"]

# database
data-path: "/Users/me/tekudata"
data-storage-mode: "archive"

# rest api
rest-api-port: 5051
rest-api-docs-enabled: true
rest-api-enabled: true

# logging
log-include-validator-duties-enabled: true
```
