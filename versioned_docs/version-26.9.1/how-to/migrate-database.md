---
title: Migrate the database
description: Migrate a LevelDB database to a RocksDB database.
sidebar_position: 10
---

# Migrate the database

Teku version 26.2.0 and later use RocksDB as the default database for new installations.
Earlier Teku versions use LevelDB. LevelDB support has been deprecated and may be removed in a future release.

RocksDB databases use less memory and proves to be more stable with Teku.

:::caution

We recommend Teku nodes running in [`prune` mode] or [`minimal` mode] (default) use the [manual migration](#manual-migration),
 and Teku nodes running in [`archive` mode] use the [automatic migration](#automatic-migration) method.

:::

## Automatic migration

Teku nodes running in [archive mode] must resynchronize from genesis to migrate from LevelDB to RocksDB.
Use the [`migrate-database`](../reference/cli/subcommands/migrate-database.md) subcommand to migrate the database.
Once migration completes there will be two databases in Teku's data folder.
Manually verify that Teku starts and has the expected data before you remove old LevelDB database.

:::note

You need double the disk space of the existing Teku storage folder for the migration process. Once you are satisfied with the migration then you can delete the LevelDB to free up space.

:::

Ensure that Teku isn't running when using the [`migrate-database`](../reference/cli/subcommands/migrate-database.md) subcommand.
The duration of the migration depends on various factors, but principally on the disk speed.
Status updates display during the migration process.
To migrate the database:

1. Shut down the local Teku instance.

2. Run [`migrate-database`](../reference/cli/subcommands/migrate-database.md) to create a RocksDB database.
    Pass your [configuration file](configure/use-config-file.md) or CLI options so that Teku has the correct paths and context.

    ```bash title="Example"
    teku migrate-database --data-path /etc/teku/data/
    ```

    At a minimum, provide the [`--network`](../reference/cli/subcommands/migrate-database.md#network) and [`--data-path`](../reference/cli/subcommands/migrate-database.md#network) options.

    :::note

    If not supplied [`--network`](../reference/cli/subcommands/migrate-database.md#network) defaults to `mainnet`.

    :::

3. The migration process informs you if it succeeded, or provides context to errors. If successful, then confirm Teku functions correctly.

    ```bash title="Example"
    teku --data-path /etc/teku/data/
    ```

4. If Teku is running correctly, remove the `beacon.old` directory from the [`--data-path`](../reference/cli/subcommands/migrate-database.md#network) directory.

If migration fails, resolve any issues and retry. Contact support on the [Teku Discord channel] if you need help resolving issues.

## Manual migration

Users can manually migrate Teku nodes running a LevelDB database to a RocksDB database if the Teku node runs in [`prune` mode] or [`minimal` mode] (default).

:::caution

Teku nodes running in [archive mode] must resynchronize from genesis to migrate. Use the [automatic migration](#automatic-migration) to migrate Teku nodes running in [archive mode].

:::

To migrate a LevelDB database in [`minimal` mode] or [`prune` mode] to a RocksDB database:

1. Stop the Teku node you intend to migrate.

2. Clear the beacon database, either:
    - Restart Teku with
   [`--force-clear-db`](../reference/cli/index.md#force-clear-db)
    - Manually delete the `beacon/db` directory in your [data path](../reference/cli/index.md#data-base-path-data-path) and `beacon/db.version` file.

    :::warning

    If you manually delete, ensure not to delete the `validator` directory if one is present as this contains your slashing protection data.

    :::

3. Add the [`--checkpoint-sync-url`](../reference/cli/index.md#checkpoint-sync-url) option with link to any community state provider to Teku command line and start Teku.
 Check [Start Teku from a recent state] for more information.

Teku creates a RocksDB database, and starts from the specified recent state. Teku should be in sync and validating within minutes.

<!-- links -->

[`minimal` mode]: ../reference/cli/index.md#data-storage-mode
[`prune` mode]: ../reference/cli/index.md#data-storage-mode
[`archive` mode]: ../reference/cli/index.md#data-storage-mode
[Start Teku from a recent state]: ../get-started/checkpoint-start.md
[Teku Discord channel]: https://discord.gg/teku
