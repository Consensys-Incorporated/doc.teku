---
title: Manage memory
description: Manage Teku's JVM memory usage.
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Manage memory

Manage Teku's Java Virtual Machine (JVM) memory usage by setting a maximum heap size using the `JAVA_OPTS` environment variable.

We recommend setting the maximum heap size to 8GB or more.

Set the heap size using the environment variable, or using the command line when starting Teku.

<Tabs>
  <TabItem value="Environment variable" label="Environment variable" default>

```bash
export JAVA_OPTS=-Xmx8g
```

  </TabItem>
  <TabItem value="Command line" label="Command line" >

```bash
JAVA_OPTS=-Xmx8g ./teku [options]
```

  </TabItem>
</Tabs>

:::note

The node uses more RAM to perform better if it’s available, especially during periods of non-finalization.

:::

## Manage the heap dump

If an out of memory error occurs, the heap dump file is placed in the directory that Teku runs from.
The heap dump file can be 1-2 GB in size.
To specify the directory to place the file, set the `-XX:HeapDumpPath` Java option to the required path.

<Tabs>
  <TabItem value="Environment variable" label="Environment variable" default>

```bash
export TEKU_OPTS="-XX:HeapDumpPath=/home/me/me_node/dumps"
```

  </TabItem>
  <TabItem value="Command line" label="Command line" >

```bash
TEKU_OPTS="-XX:HeapDumpPath=/home/me/me_node/dumps" ./teku [options]
```

  </TabItem>
</Tabs>

To disable the heap dump file generation, set the `-XX:-HeapDumpOnOutOfMemoryError` Java option.

<Tabs>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
export TEKU_OPTS="-XX:-HeapDumpOnOutOfMemoryError"
```

  </TabItem>
  <TabItem value="Command line" label="Command line" >

```bash
TEKU_OPTS="-XX:-HeapDumpOnOutOfMemoryError" ./teku [options]
```

  </TabItem>
</Tabs>
