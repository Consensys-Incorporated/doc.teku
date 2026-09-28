---
title: Reconstruct historical states
description: Reconstruct historical states on an archive node.
sidebar_position: 9
---

# Reconstruct historical states

An archive node can reconstruct historical states from genesis up to the current
checkpoint, running during startup.
This allows you to create a full archive node while also using checkpoint sync.
Generating states this way is faster as many validations can be safely skipped.
It also avoids [weak subjectivity concerns](../concepts/weak-subjectivity.md).

## Configuration

To configure Teku to reconstruct historical states, set
[`--reconstruct-historic-states`](../reference/cli/index.md#reconstruct-historic-states)
to `true` and
[`--data-storage-mode`](../reference/cli/index.md#data-storage-mode) to
`"archive"`.

You can also set [`--genesis-state`](../reference/cli/index.md#genesis-state).
Otherwise, network defaults are used (such as Mainnet defaults).
