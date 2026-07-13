// Study guide topics: Network Access (configure/verify/troubleshoot objectives).
(window.GUIDE_BANK = window.GUIDE_BANK || []).push(
  {
    id: "ga-vlans",
    domain: "Network Access",
    title: "VLANs and Access Ports (incl. Voice VLAN)",
    blueprint: "2.1 Configure and verify VLANs (normal range) spanning multiple switches",
    overview: [
      "A VLAN splits one physical switch into separate broadcast domains. Normal-range VLANs are 1-1005 and live in the vlan.dat file in flash; each VLAN needs a router or Layer 3 switch to talk to another VLAN.",
      "An access port belongs to exactly one data VLAN. Adding a voice VLAN lets a Cisco IP phone tag its traffic into a second VLAN on the same port while the PC behind the phone stays untagged in the data VLAN.",
    ],
    configs: [
      {
        title: "Create a VLAN and assign access ports",
        intro: "VLANs are created globally; ports are bound to them in interface mode.",
        cli: "SW1# configure terminal\nSW1(config)# vlan 10\nSW1(config-vlan)# name SALES\nSW1(config-vlan)# exit\nSW1(config)# interface range fastEthernet 0/1 - 2\nSW1(config-if-range)# switchport mode access\nSW1(config-if-range)# switchport access vlan 10\nSW1(config-if-range)# end",
        notes: [
          "Assigning a port to a VLAN that does not exist auto-creates the VLAN on most IOS versions.",
          "switchport mode access also disables DTP negotiation on the port, preventing it from ever forming a trunk.",
        ],
      },
      {
        title: "Add a voice VLAN for an IP phone",
        cli: "SW1(config)# interface fastEthernet 0/3\nSW1(config-if)# switchport mode access\nSW1(config-if)# switchport access vlan 10\nSW1(config-if)# switchport voice vlan 50",
        notes: [
          "The phone learns its voice VLAN over CDP; the port carries VLAN 10 untagged and VLAN 50 tagged.",
        ],
      },
    ],
    verify: [
      { cmd: "show vlan brief", what: "Every VLAN with name, status, and its access ports. Trunk ports intentionally do not appear in this output." },
      { cmd: "show interfaces fa0/1 switchport", what: "Administrative vs operational mode, access VLAN, and voice VLAN for a single port — the definitive per-port check." },
      { cmd: "show mac address-table vlan 10", what: "Confirms hosts are actually being learned in the VLAN you expect, proving frames arrive with the right classification." },
    ],
    troubleshooting: [
      {
        symptom: "Port's VLAN column in show interfaces status reads 'inactive'",
        causes: ["The VLAN was deleted from vlan.dat while ports were still assigned to it"],
        fix: "Re-create the VLAN with vlan <id> in global config, or move the port into an existing VLAN; traffic resumes immediately.",
      },
      {
        symptom: "Two hosts on the same switch cannot ping each other",
        causes: ["Ports are in different VLANs", "One port negotiated into trunking via DTP"],
        fix: "Compare show vlan brief and show interfaces switchport for both ports; force both to access mode in the same VLAN.",
      },
      {
        symptom: "IP phone works but the PC behind it has no connectivity (or vice versa)",
        causes: ["Voice VLAN configured but data VLAN missing/wrong", "Phone not learning voice VLAN because CDP is disabled"],
        fix: "Confirm both switchport access vlan and switchport voice vlan on the port and that CDP is enabled toward the phone.",
      },
    ],
    tips: [
      "VLAN 1 is the default for every port and cannot be deleted; the exam expects you to know user traffic should be moved off it.",
      "show vlan brief not listing a port usually means the port is a trunk — a favorite exam misdirection.",
    ],
  },
  {
    id: "ga-trunks",
    domain: "Network Access",
    title: "802.1Q Trunks and Native VLAN",
    blueprint: "2.2 Configure and verify interswitch connectivity (Trunk ports, 802.1Q, Native VLAN)",
    overview: [
      "A trunk carries multiple VLANs between switches by tagging each frame with its VLAN ID (802.1Q). Frames of the native VLAN are sent untagged, so both ends of a trunk must agree on the native VLAN or untagged traffic leaks between VLANs.",
      "DTP (Dynamic Trunking Protocol) can negotiate trunking automatically, but best practice — and most exam answers — hard-code trunk mode and disable negotiation with nonegotiate.",
    ],
    configs: [
      {
        title: "Configure a static 802.1Q trunk",
        cli: "SW1# configure terminal\nSW1(config)# interface gigabitEthernet 0/1\nSW1(config-if)# switchport trunk encapsulation dot1q\nSW1(config-if)# switchport mode trunk\nSW1(config-if)# switchport trunk native vlan 99\nSW1(config-if)# switchport trunk allowed vlan 10,20,99\nSW1(config-if)# switchport nonegotiate",
        notes: [
          "switchport trunk encapsulation dot1q is only needed on platforms that also support ISL; newer switches are 802.1Q-only.",
          "The allowed-VLAN list is pruning by configuration: VLANs not listed are dropped at the trunk. Use 'add'/'remove' keywords to edit without replacing the whole list.",
        ],
      },
      {
        title: "DTP mode combinations",
        intro: "Know which mode pairs actually form a trunk.",
        cli: "SW1(config-if)# switchport mode dynamic auto      ! trunks only if peer is desirable/trunk\nSW1(config-if)# switchport mode dynamic desirable ! actively negotiates a trunk\nSW1(config-if)# switchport mode trunk             ! permanent trunk, still sends DTP\nSW1(config-if)# switchport nonegotiate            ! stop sending DTP frames",
        notes: [
          "auto + auto never forms a trunk — both sides wait passively. This is the most-tested DTP fact.",
        ],
      },
    ],
    verify: [
      { cmd: "show interfaces trunk", what: "All trunking ports with mode, encapsulation, native VLAN and the allowed/active/forwarding VLAN lists — the single best trunk health check." },
      { cmd: "show interfaces g0/1 switchport", what: "Administrative vs operational mode and native VLAN for one port; reveals DTP results when modes are dynamic." },
      { cmd: "show dtp interface g0/1", what: "Current DTP status and negotiation activity on the port, useful when a trunk refuses to form." },
    ],
    troubleshooting: [
      {
        symptom: "CDP logs '%CDP-4-NATIVE_VLAN_MISMATCH' and VLAN-1 traffic dies across the trunk",
        causes: ["The two trunk ends are configured with different native VLANs"],
        fix: "Set switchport trunk native vlan to the same value on both ends; confirm with show interfaces trunk on each switch.",
      },
      {
        symptom: "Trunk never forms; both ports stay access",
        causes: ["Both sides in dynamic auto", "switchport nonegotiate on one side while the other relies on DTP"],
        fix: "Hard-code switchport mode trunk on both ends (with matching encapsulation on ISL-capable platforms).",
      },
      {
        symptom: "A VLAN's users cannot cross the trunk although the trunk is up",
        causes: ["VLAN missing from the allowed list", "VLAN doesn't exist on the far switch"],
        fix: "Check the 'VLANs allowed and active' section of show interfaces trunk; add the VLAN with switchport trunk allowed vlan add <id> and create it on both switches.",
      },
    ],
    tips: [
      "Remember the DTP matrix: desirable+auto = trunk, auto+auto = no trunk, trunk+auto = trunk.",
      "Native VLAN mismatch is detected by CDP — messages appear even while the trunk forwards, so read the log lines in exhibits carefully.",
    ],
  },
  {
    id: "ga-cdp-lldp",
    domain: "Network Access",
    title: "Layer 2 Discovery: CDP and LLDP",
    blueprint: "2.3 Configure and verify Layer 2 discovery protocols (Cisco Discovery Protocol and LLDP)",
    overview: [
      "CDP (Cisco proprietary) and LLDP (IEEE 802.1AB) let directly connected devices advertise identity, platform, and addresses. They are the fastest way to map an unknown topology from the CLI — many exhibit questions are solved purely from discovery output.",
      "CDP is on by default on Cisco gear; LLDP usually must be enabled. Both can be disabled globally or per interface, which is also a hardening step on ports facing untrusted devices.",
    ],
    configs: [
      {
        title: "Enable/disable CDP globally and per interface",
        cli: "R1# configure terminal\nR1(config)# cdp run                 ! global on (default)\nR1(config)# interface g0/2\nR1(config-if)# no cdp enable        ! off on this port only\nR1(config-if)# exit\nR1(config)# no cdp run              ! off for the whole device",
      },
      {
        title: "Enable LLDP (global + per-direction per interface)",
        cli: "SW1(config)# lldp run\nSW1(config)# interface g0/1\nSW1(config-if)# lldp transmit\nSW1(config-if)# lldp receive",
        notes: [
          "LLDP can transmit and receive independently per port — CDP cannot.",
          "Timers: CDP advertises every 60 s with a 180 s holdtime; LLDP every 30 s with a 120 s holdtime (defaults).",
        ],
      },
    ],
    verify: [
      { cmd: "show cdp neighbors", what: "One line per neighbor: device ID, local interface, holdtime, capability codes, platform and the neighbor's port — enough to draw the topology." },
      { cmd: "show cdp neighbors detail", what: "Adds the neighbor's management IP address and IOS version — the answer when a question asks for a remote device's address." },
      { cmd: "show lldp neighbors detail", what: "The LLDP equivalent, needed when the neighbor is non-Cisco gear or CDP is disabled." },
    ],
    troubleshooting: [
      {
        symptom: "A directly connected device does not appear in show cdp neighbors",
        causes: ["CDP disabled globally or on that interface", "Neighbor is non-Cisco (speaks only LLDP)", "Interface down"],
        fix: "Verify cdp run and per-interface cdp enable on both ends, confirm the link is up/up, and try show lldp neighbors for third-party devices.",
      },
      {
        symptom: "LLDP shows nothing although both devices support it",
        causes: ["lldp run missing (LLDP is off by default on Cisco)", "Port configured with lldp transmit/receive disabled"],
        fix: "Enable lldp run globally on both devices and confirm per-port transmit/receive; neighbors appear within one advertisement interval.",
      },
    ],
    tips: [
      "Capability codes in show cdp neighbors matter: R = router, S = switch, B = source-route bridge — exhibits use them to identify device roles.",
      "Discovery protocols reveal topology to anyone on the wire; disabling them on user-facing ports is a security best practice the exam rewards.",
    ],
  },
  {
    id: "ga-etherchannel",
    domain: "Network Access",
    title: "EtherChannel (LACP)",
    blueprint: "2.4 Configure and verify (Layer 2/Layer 3) EtherChannel (LACP)",
    overview: [
      "EtherChannel bundles up to eight physical links into one logical port-channel, so spanning tree treats them as a single interface and no link sits blocked. Traffic is distributed per flow by a hash, not per packet.",
      "LACP (IEEE 802.3ad) negotiates the bundle: active mode initiates, passive answers. Every physical member must match exactly — speed, duplex, access/trunk mode, allowed VLANs — or the port is suspended from the bundle.",
    ],
    configs: [
      {
        title: "Layer 2 LACP EtherChannel carrying a trunk",
        cli: "SW1# configure terminal\nSW1(config)# interface range gigabitEthernet 0/1 - 2\nSW1(config-if-range)# channel-group 1 mode active\nSW1(config-if-range)# exit\nSW1(config)# interface port-channel 1\nSW1(config-if)# switchport mode trunk\nSW1(config-if)# switchport trunk native vlan 99",
        notes: [
          "Configure the logical port-channel interface, not the members — settings propagate down; configuring members individually is how bundles break.",
          "LACP mode pairs: active+active or active+passive form a channel; passive+passive never does. 'on' mode skips negotiation entirely and must be 'on' both sides.",
        ],
      },
      {
        title: "Layer 3 EtherChannel (routed)",
        cli: "SW1(config)# interface port-channel 2\nSW1(config-if)# no switchport\nSW1(config-if)# ip address 10.1.1.1 255.255.255.252\nSW1(config-if)# exit\nSW1(config)# interface range gigabitEthernet 0/3 - 4\nSW1(config-if-range)# no switchport\nSW1(config-if-range)# channel-group 2 mode active",
        notes: [
          "no switchport must be applied to the members before the channel-group command, matching the routed port-channel.",
        ],
      },
    ],
    verify: [
      { cmd: "show etherchannel summary", what: "Flag-coded overview: P = bundled, SU = layer-2 in use, D = down, s = suspended. The first command for any EtherChannel question." },
      { cmd: "show etherchannel port-channel", what: "Detailed per-bundle view including the protocol (LACP/PAgP/none) and each member's state." },
      { cmd: "show interfaces port-channel 1 trunk", what: "Confirms the logical interface is trunking with the intended native and allowed VLANs." },
    ],
    troubleshooting: [
      {
        symptom: "Members show (s) suspended in show etherchannel summary",
        causes: ["Mismatched member settings: VLAN mode, allowed list, speed or duplex differs between the physical ports"],
        fix: "Make every member identical (best: default the ports, then re-apply config on the port-channel interface only) and the ports rejoin.",
      },
      {
        symptom: "Channel never forms; ports stay Individual (I)",
        causes: ["passive+passive LACP on both ends", "'on' mode one side, LACP the other"],
        fix: "Set at least one side to channel-group mode active, or 'on' on both sides — never mix negotiated and static modes.",
      },
      {
        symptom: "One switch reports err-disabled on members after a misconfig",
        causes: ["EtherChannel misconfig guard detected inconsistent bundling (often 'on' mode against a non-channel port)"],
        fix: "Correct the channel config on both switches, then shutdown / no shutdown the member ports to recover from err-disabled.",
      },
    ],
    tips: [
      "LACP = IEEE 802.3ad and active/passive; PAgP = Cisco and desirable/auto. The exam loves asking which keyword belongs to which protocol.",
      "Load balancing is per flow (hash of MACs/IPs) — a single large transfer will never exceed one member's bandwidth.",
    ],
  },
  {
    id: "ga-rstp",
    domain: "Network Access",
    title: "Rapid PVST+: Root Bridge, PortFast, BPDU Guard",
    blueprint: "2.5 Interpret basic operations and configure Rapid PVST+ Spanning Tree Protocol",
    overview: [
      "Spanning tree blocks redundant Layer 2 paths to prevent loops. Rapid PVST+ runs one RSTP instance per VLAN: switches elect a root bridge (lowest bridge ID = priority + MAC), every non-root switch picks one root port toward the root, and each segment gets one designated port; everything else discards.",
      "Edge ports to hosts should run PortFast (skip listening/learning, forward immediately) and BPDU guard (err-disable the port if a switch is ever plugged in), because a host port that receives BPDUs is either a wiring mistake or an attack.",
    ],
    configs: [
      {
        title: "Enable Rapid PVST+ and set the root bridge",
        cli: "SW1# configure terminal\nSW1(config)# spanning-tree mode rapid-pvst\nSW1(config)# spanning-tree vlan 10 root primary\n! or set an explicit priority (increments of 4096):\nSW1(config)# spanning-tree vlan 10 priority 24576",
        notes: [
          "root primary sets priority to 24576 (or 4096 below the current root if that's lower); root secondary sets 28672.",
          "Priority must be a multiple of 4096 because the low 12 bits carry the VLAN ID (extended system ID).",
        ],
      },
      {
        title: "PortFast and BPDU guard on host ports",
        cli: "SW1(config)# interface range fastEthernet 0/5 - 24\nSW1(config-if-range)# switchport mode access\nSW1(config-if-range)# spanning-tree portfast\nSW1(config-if-range)# spanning-tree bpduguard enable\n! or globally for every access/PortFast port:\nSW1(config)# spanning-tree portfast default\nSW1(config)# spanning-tree portfast bpduguard default",
        notes: [
          "Never enable PortFast on a port toward another switch — that is exactly the loop STP exists to stop.",
        ],
      },
    ],
    verify: [
      { cmd: "show spanning-tree vlan 10", what: "Root bridge ID, this switch's bridge ID, and per-port role/state (Root/Desg/Altn, FWD/BLK) — states 'This bridge is the root' when it is." },
      { cmd: "show spanning-tree summary", what: "STP mode in use plus global PortFast/BPDU-guard defaults and counts of blocking ports per VLAN." },
      { cmd: "show spanning-tree interface fa0/5 portfast", what: "Confirms PortFast is operational on a specific edge port." },
    ],
    troubleshooting: [
      {
        symptom: "The wrong switch (e.g., an access switch) is the root bridge",
        causes: ["All switches left at default priority 32768, so the lowest MAC — often the oldest switch — won the election"],
        fix: "Set spanning-tree vlan <id> root primary (and secondary on the backup distribution switch) so the intended core wins deterministically.",
      },
      {
        symptom: "A host port goes err-disabled the moment a device is connected",
        causes: ["BPDU guard triggered — the device sent BPDUs (someone plugged in a switch or a bridging NIC)"],
        fix: "Remove the offending device, then shutdown / no shutdown the port (or configure errdisable recovery cause bpduguard).",
      },
      {
        symptom: "Users report 30+ seconds of dead network whenever they reconnect",
        causes: ["PortFast missing, so the port walks through listening and learning before forwarding (legacy timers)"],
        fix: "Enable spanning-tree portfast on host-facing access ports; the port then transitions to forwarding immediately.",
      },
    ],
    tips: [
      "Bridge ID tiebreaker order: lowest priority, then lowest MAC. Root port selection: lowest root path cost, then lowest sender bridge ID, then lowest sender port ID.",
      "RSTP port states are only discarding, learning, forwarding — 'blocking' and 'listening' are legacy 802.1D terms exams use as distractors.",
    ],
  }
);
