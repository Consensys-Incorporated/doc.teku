---
title: Subcommands
description: Teku subcommands overview
sidebar_position: 1
---

# Teku subcommands

This reference describes the syntax of the Teku subcommands.

To start a Teku node using subcommands, run:

```bash
teku [OPTIONS] [SUBCOMMANDS] [SUBCOMMAND OPTIONS]
```

You can also supply the subcommand options using [environment variables or a configuration file](../index.md#specify-options).

The available subcommands are:

- [`admin`](admin.md)
- [`migrate-database`](migrate-database.md)
- [`bootnode`](bootnode.md)
- [`slashing-protection`](slashing-protection.md)
- [`validator-client`](validator-client.md)
- [`voluntary-exit`](voluntary-exit.md)
- [Development and testing subcommands](development.md)

## Using autocomplete

If using Bash or Z shell, you can enable autocomplete support by navigating to the `build` folder and running:

```bash
source teku.autocomplete.sh
```

Autocomplete allows you to view subcommand suggestions by pressing the Tab key twice.

```bash
teku Tab+Tab
```
