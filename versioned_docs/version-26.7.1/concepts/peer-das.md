---
description: Learn about the PeerDAS upgrade and its implications for node operators.
sidebar_position: 4
---

# PeerDAS

Peer Data Availability Sampling (PeerDAS), specified by [EIP-7594](https://eips.ethereum.org/EIPS/eip-7594), is the main  
feature of the next Ethereum upgrade, Fusaka.

PeerDAS introduces enhanced capacity extension over [proto-danksharding](proto-danksharding.md).
The goal of this enhancement is to significantly increase the average number of blobs in every slot while keeping moderate  
network and storage requirements for most node operators.

This is achieved using multiple techniques:

- **1D blob extension** - PeerDAS applies one-dimensional erasure coding extension to each blob, so its size doubles.
  The extended blob can be split into 128 parts such that you can reconstruct the original blob from any 64 parts.

- **Column splitting** - In danksharding, the base data unit is the blob.
  Each node is required to download all blobs referenced in the block to verify its availability.
  In PeerDAS, extended blobs are rows which stack one below another and are split into columns, creating DataColumnSidecars.
  This is the base data unit in PeerDAS and consists of 1/128th of each extended blob from the block, with additional  
  data like proofs and block header.

- **Data availability sampling** - The last major change is easing node operator requirements for data availability checks.
  By splitting blobs data into columns, so that every single node operator is required to get pieces of each blob, it's  
  impossible to lose any whole blob; either all blobs are available or none are.
  Security research has proven that it's enough to download 1/8 of the data (1/16 of the extended data) to prove data  
  availability or confirm its non-availability.

Decreasing the size of required download, store, and share data by 8 for most nodes compared to danksharding
makes it possible to schedule a target number of blobs increase of almost 5x compared to the danksharding launch,
with potential room to increase it by another 4x in the future.
This change significantly increases the blob capacity of the Ethereum network and TPS of Layer 2.
Moreover, [EIP-7892: Blob Parameters Only Hardforks](https://eips.ethereum.org/EIPS/eip-7892) allows for changing maximum  
number of blobs and blob target without a hard fork,
making future blob capacity changes easier.

## Expected implications for node operators

Proto-danksharding was launched with increased network requirements over the previous fork and additional storage required  
for the data layer of about 50 GB for 3 blobs,
which was later increased to about 100 GB for 6 blobs in the Pectra fork.

With PeerDAS, consensus layer clients will use network and storage space for sidecar data according to their roles:

- **Full nodes** - These are nodes without any validators.
  Their requirements are to store 4 data columns in custody (which is permanent storage for a moving window of about 18  
  recent days) and sample another 4. This means the data is downloaded, data availability is checked, but nothing is stored.
  4 columns with a scheduled 14-blob target (which could be increased in the future) will occupy about 16 GB of space, which  
  means significantly less storage consumption by non-validator nodes.

- **Validator nodes** - Requirements for validator nodes are to custody at least 8 columns, with the number calculated based  
  on the effective balance of active validators, adding a requirement of 1 extra column per every 32 ETH.
  Therefore, 1 validator requires 8 columns, 8 validators require 8 columns, 20 validators require 20 columns, with a maximum of  
  128 columns for 128 validators or 4096 ETH in consolidated validators. For 1-8 validators and 14 blobs, a node will  
  take 32 GB of space, which is still less than current requirements. But nodes with a lot of validators will basically  
  become supernodes.

- **Supernodes** - These are either nodes running in altruistic mode or those operated by big validator operators with  
  4096 or more ETH staked.
  This type of node stores and shares all columns data.
  An operator can enable this mode using the [`--p2p-subscribe-all-custody-subnets-enabled`](../reference/cli/index.md#p2p-subscribe-all-custody-subnets-enabled) command line option;
  big operators run in this mode as a protocol requirement.
  Storage consumption is increased, taking about 500 GB with 14 blobs of data layer space compared to 100 GB in Pectra.

  :::warning important

  If a node operator needs complete blob data through the REST API (for example, the `getBlobs` endpoint),
  they must either run in supernode mode or enable
  [`--rest-api-getblobs-sidecars-download-enabled`](../reference/cli/index.md#rest-api-getblobs-sidecars-download-enabled),
  which allows Teku to retrieve required sidecars on demand from the P2P network.
  Other types of nodes store only partial blob data.
  
  :::

All node space requirements are subject to change proportionally to the target number of blobs, which is currently scheduled  
to be 14 starting from January 7, 2026 (about 1 month after the Fusaka fork).
Further target changes may be applied later and do not require a hard fork, but require node operators to upgrade their  
clients in a timely manner.
