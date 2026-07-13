// CLI labs: Network Access.
(window.LAB_BANK = window.LAB_BANK || []).push(
  {
    id: "la-vlan-basic",
    type: "config",
    domain: "Network Access",
    title: "Create VLAN 10 and assign access ports",
    difficulty: 1,
    scenario:
      "SW1 is a brand-new access switch. Create VLAN 10 named SALES and configure " +
      "FastEthernet0/1 and 0/2 as access ports in VLAN 10. You are logged into SW1 " +
      "at the user EXEC prompt. Verify your work with 'show vlan brief' when done.",
    device: { hostname: "SW1", startMode: "user" },
    steps: [
      {
        label: "Enter privileged EXEC mode",
        accept: ["en(able)"],
        mode: "user",
        setsMode: "priv",
        hints: ["The user EXEC prompt (>) only allows monitoring commands. Move up one level first."],
        explanation: "enable moves from user EXEC (>) to privileged EXEC (#), where configuration modes become reachable.",
      },
      {
        label: "Enter global configuration mode",
        accept: ["conf(igure) t(erminal)"],
        mode: "priv",
        setsMode: "config",
        response: "Enter configuration commands, one per line.  End with CNTL/Z.",
        hints: ["Configuration changes require global configuration mode.", "The command is 'configure terminal' — 'conf t' works too."],
        explanation: "configure terminal (conf t) enters global configuration mode, the gateway to all device configuration.",
      },
      {
        label: "Create VLAN 10",
        accept: ["vlan 10"],
        mode: "config",
        setsMode: "config-vlan",
        hints: ["Create the VLAN first, from global configuration mode.", "The command is simply 'vlan 10'."],
        explanation: "'vlan 10' creates VLAN 10 in vlan.dat if it does not exist and drops into VLAN configuration mode.",
      },
      {
        label: "Name the VLAN SALES",
        accept: ["name SALES"],
        mode: "config-vlan",
        hints: ["Give the VLAN its name while you are in VLAN configuration mode.", "The command is 'name SALES'."],
        explanation: "VLAN names make 'show vlan brief' readable for humans; they have no effect on forwarding.",
      },
      {
        label: "Select ports Fa0/1 - 0/2 (interface range)",
        accept: [
          "int(erface) r(ange) {if=FastEthernet0/1} - 2",
          "int(erface) r(ange) fa0/1-2",
          "int(erface) r(ange) fastethernet0/1-2",
        ],
        mode: ["config", "config-vlan"],
        setsMode: "config-if-range",
        hints: [
          "'interface range' lets you configure both ports at once. Interface commands work directly from VLAN config mode too.",
          "Try 'interface range fastEthernet 0/1 - 2'.",
        ],
        explanation: "interface range fa0/1 - 2 applies all subsequent interface commands to both ports simultaneously.",
      },
      {
        label: "Make the ports static access ports",
        accept: ["sw(itchport) mode acc(ess)"],
        mode: "config-if-range",
        group: "swport",
        hints: ["Force the ports to be access ports so they never negotiate a trunk.", "The command is 'switchport mode access'."],
        explanation: "Statically setting access mode disables DTP negotiation, a hardening best practice for host-facing ports.",
      },
      {
        label: "Assign the ports to VLAN 10",
        accept: ["sw(itchport) acc(ess) vlan 10"],
        mode: "config-if-range",
        group: "swport",
        hints: ["Now bind the ports to the VLAN you created.", "The command is 'switchport access vlan 10'."],
        explanation: "switchport access vlan 10 sets the data VLAN these access ports carry untagged.",
      },
    ],
    outputs: [
      {
        cmd: "sh(ow) vlan br(ief)",
        pre:
          "VLAN Name                             Status    Ports\n" +
          "---- -------------------------------- --------- -------------------------------\n" +
          "1    default                          active    Fa0/1, Fa0/2, Fa0/3, Fa0/4\n" +
          "1002 fddi-default                     act/unsup\n" +
          "1003 token-ring-default               act/unsup\n" +
          "1004 fddinet-default                  act/unsup\n" +
          "1005 trnet-default                    act/unsup",
        post:
          "VLAN Name                             Status    Ports\n" +
          "---- -------------------------------- --------- -------------------------------\n" +
          "1    default                          active    Fa0/3, Fa0/4\n" +
          "10   SALES                            active    Fa0/1, Fa0/2\n" +
          "1002 fddi-default                     act/unsup\n" +
          "1003 token-ring-default               act/unsup\n" +
          "1004 fddinet-default                  act/unsup\n" +
          "1005 trnet-default                    act/unsup",
      },
      {
        cmd: "sh(ow) run(ning-config)",
        pre: "Building configuration...\n\n! (output abbreviated in this lab — use 'show vlan brief' to check your work)",
        post: null,
      },
    ],
    completion:
      "VLAN 10 (SALES) is active and Fa0/1-2 are access ports inside it. " +
      "Run 'show vlan brief' from privileged EXEC ('end' first, or 'do show vlan brief') to see the result.",
  },
  {
    id: "la-native-mismatch",
    type: "troubleshoot",
    domain: "Network Access",
    title: "Native VLAN mismatch on a trunk",
    difficulty: 2,
    scenario:
      "SW1 connects to SW2 over an 802.1Q trunk on Gi0/1. CDP is logging native VLAN " +
      "mismatch errors and untagged traffic is being dropped between the switches. " +
      "SW2 is correctly configured with native VLAN 99. Diagnose SW1 with show commands, " +
      "then fix its trunk so the native VLANs match. You are at SW1's privileged prompt.",
    device: { hostname: "SW1", startMode: "priv" },
    diagnosis: [
      { label: "Check the trunk's native VLAN", cmd: "sh(ow) int(erfaces) trunk" },
      { label: "Inspect Gi0/1 switchport details", cmd: "sh(ow) int(erfaces) {if=GigabitEthernet0/1} sw(itchport)" },
    ],
    outputs: [
      {
        cmd: "sh(ow) int(erfaces) trunk",
        pre:
          "Port        Mode         Encapsulation  Status        Native vlan\n" +
          "Gi0/1       on           802.1q         trunking      1\n" +
          "\n" +
          "Port        Vlans allowed on trunk\n" +
          "Gi0/1       1-4094",
        post:
          "Port        Mode         Encapsulation  Status        Native vlan\n" +
          "Gi0/1       on           802.1q         trunking      99\n" +
          "\n" +
          "Port        Vlans allowed on trunk\n" +
          "Gi0/1       1-4094",
      },
      {
        cmd: "sh(ow) int(erfaces) {if=GigabitEthernet0/1} sw(itchport)",
        pre:
          "Name: Gi0/1\n" +
          "Switchport: Enabled\n" +
          "Administrative Mode: trunk\n" +
          "Operational Mode: trunk\n" +
          "Administrative Trunking Encapsulation: dot1q\n" +
          "Trunking Native Mode VLAN: 1 (default)\n" +
          "Trunking VLANs Enabled: ALL",
        post:
          "Name: Gi0/1\n" +
          "Switchport: Enabled\n" +
          "Administrative Mode: trunk\n" +
          "Operational Mode: trunk\n" +
          "Administrative Trunking Encapsulation: dot1q\n" +
          "Trunking Native Mode VLAN: 99 (VLAN0099)\n" +
          "Trunking VLANs Enabled: ALL",
      },
      {
        cmd: "sh(ow) cdp nei(ghbors)",
        pre:
          "Capability Codes: R - Router, T - Trans Bridge, B - Source Route Bridge\n" +
          "                  S - Switch, H - Host, I - IGMP, r - Repeater\n" +
          "\n" +
          "Device ID    Local Intrfce   Holdtme   Capability   Platform   Port ID\n" +
          "SW2          Gig 0/1         155       S I          WS-C2960   Gig 0/1",
        post: null,
      },
    ],
    fix: [
      {
        id: "native99",
        label: "Set native VLAN 99 on Gi0/1",
        accept: ["sw(itchport) trunk nat(ive) vlan 99"],
        mode: "config-if",
        requiresInterface: "GigabitEthernet0/1",
        hints: [
          "Compare SW1's native VLAN in 'show interfaces trunk' with what the scenario says SW2 uses.",
          "Enter interface Gi0/1 in configuration mode, then change the trunk's native VLAN.",
          "On Gi0/1: 'switchport trunk native vlan 99'.",
        ],
        explanation:
          "802.1Q sends native-VLAN frames untagged, so both trunk ends must agree on the native VLAN; " +
          "otherwise untagged frames leak between VLANs and CDP logs a mismatch.",
      },
    ],
    completion:
      "Native VLANs now match (99 on both ends) and the CDP mismatch errors stop. " +
      "Re-run 'show interfaces trunk' to confirm the change.",
  },
  {
    id: "la-trunk-config",
    type: "config",
    domain: "Network Access",
    title: "Configure an 802.1Q trunk to SW2",
    difficulty: 2,
    scenario:
      "SW1's Gi0/1 connects to SW2 and must become a static 802.1Q trunk. Use native " +
      "VLAN 99 and allow only VLANs 10, 20 and 99 across the trunk (enter them as " +
      "10,20,99). You are at SW1's user EXEC prompt.",
    device: { hostname: "SW1", startMode: "user" },
    steps: [
      {
        label: "Enter privileged EXEC mode",
        accept: ["en(able)"],
        mode: "user",
        setsMode: "priv",
        hints: ["Move up from user EXEC first."],
        explanation: "enable moves from user EXEC (>) to privileged EXEC (#), where configuration modes become reachable.",
      },
      {
        label: "Enter global configuration mode",
        accept: ["conf(igure) t(erminal)"],
        mode: "priv",
        setsMode: "config",
        response: "Enter configuration commands, one per line.  End with CNTL/Z.",
        hints: ["'configure terminal' — or just 'conf t'."],
        explanation: "configure terminal enters global configuration mode, required before any interface changes.",
      },
      {
        label: "Select interface Gi0/1",
        accept: ["int(erface) {if=GigabitEthernet0/1}"],
        mode: "config",
        setsMode: "config-if",
        hints: ["Trunk settings are per-interface. Enter Gi0/1.", "'interface gigabitEthernet 0/1' (or 'int gi0/1')."],
        explanation: "Interface configuration mode scopes the following switchport commands to Gi0/1 only.",
      },
      {
        label: "Force the port into trunk mode",
        accept: ["sw(itchport) mode tr(unk)"],
        mode: "config-if",
        requiresInterface: "GigabitEthernet0/1",
        hints: ["Hard-code trunking instead of relying on DTP negotiation.", "'switchport mode trunk'."],
        explanation: "switchport mode trunk makes the port a permanent trunk regardless of what the far side negotiates.",
      },
      {
        label: "Set native VLAN 99",
        accept: ["sw(itchport) tr(unk) nat(ive) vlan 99"],
        mode: "config-if",
        requiresInterface: "GigabitEthernet0/1",
        group: "trunkopts",
        hints: ["The native VLAN carries untagged frames — both ends must agree.", "'switchport trunk native vlan 99'."],
        explanation: "802.1Q sends native-VLAN frames untagged; setting 99 on both ends prevents VLAN leaking and CDP mismatch errors.",
      },
      {
        label: "Allow only VLANs 10, 20 and 99",
        accept: ["sw(itchport) tr(unk) all(owed) vlan 10,20,99"],
        mode: "config-if",
        requiresInterface: "GigabitEthernet0/1",
        group: "trunkopts",
        hints: ["Prune the trunk down to just the VLANs that need to cross it.", "'switchport trunk allowed vlan 10,20,99' (no spaces in the list)."],
        explanation: "Restricting the allowed VLAN list limits broadcast radiation and the blast radius of any VLAN-based attack.",
      },
    ],
    outputs: [
      {
        cmd: "sh(ow) int(erfaces) trunk",
        pre: "! No trunking interfaces found — Gi0/1 is still an access port.",
        post:
          "Port        Mode         Encapsulation  Status        Native vlan\n" +
          "Gi0/1       on           802.1q         trunking      99\n" +
          "\n" +
          "Port        Vlans allowed on trunk\n" +
          "Gi0/1       10,20,99",
      },
      {
        cmd: "sh(ow) int(erfaces) {if=GigabitEthernet0/1} sw(itchport)",
        pre:
          "Name: Gi0/1\nSwitchport: Enabled\nAdministrative Mode: dynamic auto\nOperational Mode: static access\n" +
          "Trunking Native Mode VLAN: 1 (default)",
        post:
          "Name: Gi0/1\nSwitchport: Enabled\nAdministrative Mode: trunk\nOperational Mode: trunk\n" +
          "Trunking Native Mode VLAN: 99 (VLAN0099)",
      },
    ],
    completion:
      "Gi0/1 is now a static 802.1Q trunk with native VLAN 99 carrying only VLANs 10, 20 and 99. " +
      "Check it with 'show interfaces trunk'.",
  },
  {
    id: "la-etherchannel",
    type: "config",
    domain: "Network Access",
    title: "Bundle Gi0/1-2 into a LACP EtherChannel",
    difficulty: 2,
    scenario:
      "SW1 has two parallel links to SW2 on Gi0/1 and Gi0/2, and STP is blocking one of " +
      "them. Bundle both ports into port-channel 1 using LACP active mode, then make the " +
      "logical port-channel interface a trunk. You are at SW1's user EXEC prompt.",
    device: { hostname: "SW1", startMode: "user" },
    steps: [
      {
        label: "Enter privileged EXEC mode",
        accept: ["en(able)"],
        mode: "user",
        setsMode: "priv",
        hints: ["Move up from user EXEC first."],
        explanation: "enable moves from user EXEC (>) to privileged EXEC (#), where configuration modes become reachable.",
      },
      {
        label: "Enter global configuration mode",
        accept: ["conf(igure) t(erminal)"],
        mode: "priv",
        setsMode: "config",
        response: "Enter configuration commands, one per line.  End with CNTL/Z.",
        hints: ["'configure terminal' — or just 'conf t'."],
        explanation: "configure terminal enters global configuration mode, required before any interface changes.",
      },
      {
        label: "Select both uplinks (interface range)",
        accept: [
          "int(erface) r(ange) {if=GigabitEthernet0/1} - 2",
          "int(erface) r(ange) gi0/1-2",
          "int(erface) r(ange) gigabitethernet0/1-2",
        ],
        mode: "config",
        setsMode: "config-if-range",
        hints: ["Both members must be configured identically — use an interface range.", "'interface range gigabitEthernet 0/1 - 2'."],
        explanation: "Configuring both members in one range guarantees identical settings, the #1 requirement for a stable bundle.",
      },
      {
        label: "Add the ports to channel-group 1 (LACP active)",
        accept: ["channel-group 1 mode act(ive)"],
        mode: "config-if-range",
        response: "Creating a port-channel interface Port-channel 1",
        hints: ["LACP's initiating mode is 'active' (passive only answers).", "'channel-group 1 mode active'."],
        explanation: "channel-group 1 mode active creates Port-channel1 and negotiates the bundle via LACP; active+active or active+passive both form it.",
      },
      {
        label: "Select the logical Port-channel 1 interface",
        accept: ["int(erface) {if=Port-channel1}", "int(erface) port-channel 1"],
        mode: ["config", "config-if-range"],
        setsMode: "config-if",
        hints: ["Trunk settings belong on the logical interface, not the members.", "'interface port-channel 1'."],
        explanation: "Settings applied to the port-channel interface propagate to every member, keeping the bundle consistent.",
      },
      {
        label: "Make the bundle a trunk",
        accept: ["sw(itchport) mode tr(unk)"],
        mode: "config-if",
        requiresInterface: "Port-channel1",
        hints: ["Same command as any physical trunk port.", "'switchport mode trunk'."],
        explanation: "The trunk is configured once on Port-channel1 and inherited by Gi0/1 and Gi0/2 — never configure members individually.",
      },
    ],
    outputs: [
      {
        cmd: "sh(ow) etherchannel sum(mary)",
        pre:
          "Flags:  D - down        P - bundled in port-channel\n" +
          "        I - stand-alone s - suspended\n" +
          "        U - in use      S - Layer2\n\n" +
          "Number of channel-groups in use: 0\n" +
          "Group  Port-channel  Protocol    Ports\n" +
          "------+-------------+-----------+------------------",
        post:
          "Flags:  D - down        P - bundled in port-channel\n" +
          "        I - stand-alone s - suspended\n" +
          "        U - in use      S - Layer2\n\n" +
          "Number of channel-groups in use: 1\n" +
          "Group  Port-channel  Protocol    Ports\n" +
          "------+-------------+-----------+------------------\n" +
          "1      Po1(SU)         LACP      Gi0/1(P) Gi0/2(P)",
      },
      {
        cmd: "sh(ow) spanning-tree",
        pre: "VLAN0001\n  ...\n  Gi0/1  Desg FWD 4    128.25   P2p\n  Gi0/2  Altn BLK 4    128.26   P2p",
        post: "VLAN0001\n  ...\n  Po1    Desg FWD 3    128.65   P2p",
      },
    ],
    completion:
      "Po1 shows (SU) with both members flagged (P) — the bundle is up, and spanning tree now sees " +
      "one logical link so nothing is blocked. Verify with 'show etherchannel summary'.",
  },
  {
    id: "la-portfast-bpduguard",
    type: "config",
    domain: "Network Access",
    title: "Protect a host port with PortFast and BPDU guard",
    difficulty: 1,
    scenario:
      "Users on SW1 Fa0/5 complain about 30-second delays getting network access after " +
      "plugging in. Make Fa0/5 a static access port, enable PortFast so it forwards " +
      "immediately, and arm BPDU guard so any rogue switch shuts the port down. You are " +
      "at SW1's user EXEC prompt.",
    device: { hostname: "SW1", startMode: "user" },
    steps: [
      {
        label: "Enter privileged EXEC mode",
        accept: ["en(able)"],
        mode: "user",
        setsMode: "priv",
        hints: ["Move up from user EXEC first."],
        explanation: "enable moves from user EXEC (>) to privileged EXEC (#), where configuration modes become reachable.",
      },
      {
        label: "Enter global configuration mode",
        accept: ["conf(igure) t(erminal)"],
        mode: "priv",
        setsMode: "config",
        response: "Enter configuration commands, one per line.  End with CNTL/Z.",
        hints: ["'configure terminal' — or just 'conf t'."],
        explanation: "configure terminal enters global configuration mode, required before any interface changes.",
      },
      {
        label: "Select interface Fa0/5",
        accept: ["int(erface) {if=FastEthernet0/5}"],
        mode: "config",
        setsMode: "config-if",
        hints: ["'interface fastEthernet 0/5' (or 'int fa0/5')."],
        explanation: "Interface configuration mode scopes the PortFast and BPDU guard commands to this host port.",
      },
      {
        label: "Make it a static access port",
        accept: ["sw(itchport) mode acc(ess)"],
        mode: "config-if",
        requiresInterface: "FastEthernet0/5",
        hints: ["Host ports should never negotiate trunking.", "'switchport mode access'."],
        explanation: "A static access port disables DTP; PortFast is intended only for such host-facing edge ports.",
      },
      {
        label: "Enable PortFast",
        accept: ["sp(anning-tree) portf(ast)"],
        mode: "config-if",
        requiresInterface: "FastEthernet0/5",
        group: "stp",
        response:
          "%Warning: portfast should only be enabled on ports connected to a single\n" +
          " host. Connecting hubs, concentrators, switches, bridges, etc... to this\n" +
          " interface when portfast is enabled, can cause temporary bridging loops.",
        hints: ["Skip listening/learning so the port forwards immediately.", "'spanning-tree portfast'."],
        explanation: "PortFast moves an edge port straight to forwarding, eliminating the 30-second STP wait after link-up.",
      },
      {
        label: "Enable BPDU guard",
        accept: ["sp(anning-tree) bpduguard en(able)"],
        mode: "config-if",
        requiresInterface: "FastEthernet0/5",
        group: "stp",
        hints: ["If a BPDU ever arrives on this port, err-disable it.", "'spanning-tree bpduguard enable'."],
        explanation: "BPDU guard err-disables the port the instant a switch BPDU arrives, protecting the STP topology from rogue devices.",
      },
    ],
    outputs: [
      {
        cmd: "sh(ow) sp(anning-tree) int(erface) {if=FastEthernet0/5} portf(ast)",
        pre: "FastEthernet0/5   disabled",
        post: "FastEthernet0/5   enabled",
      },
      {
        cmd: "sh(ow) sp(anning-tree) sum(mary)",
        pre:
          "Switch is in rapid-pvst mode\nRoot bridge for: none\nPortfast Default             is disabled\n" +
          "PortFast BPDU Guard Default  is disabled",
        post:
          "Switch is in rapid-pvst mode\nRoot bridge for: none\nPortfast Default             is disabled\n" +
          "PortFast BPDU Guard Default  is disabled\n! Fa0/5: portfast + bpduguard enabled per-interface",
      },
    ],
    completion:
      "Fa0/5 now forwards the moment a host connects, and any device that sends BPDUs gets the port " +
      "err-disabled. Verify with 'show spanning-tree interface fa0/5 portfast'.",
  },
  {
    id: "la-inactive-vlan",
    type: "troubleshoot",
    domain: "Network Access",
    title: "Port dead after VLAN cleanup (inactive VLAN)",
    difficulty: 2,
    scenario:
      "After a VLAN cleanup on SW1, the user on Fa0/10 lost all connectivity. The port " +
      "is up but carries no traffic. Fa0/10 should be in VLAN 30 (ENGINEERING). " +
      "Investigate with show commands and restore service. You are at SW1's privileged prompt.",
    device: { hostname: "SW1", startMode: "priv" },
    diagnosis: [
      { label: "Check Fa0/10's status and VLAN", cmd: "sh(ow) int(erfaces) {if=FastEthernet0/10} status" },
      { label: "List the VLANs that exist", cmd: "sh(ow) vlan br(ief)" },
    ],
    outputs: [
      {
        cmd: "sh(ow) int(erfaces) {if=FastEthernet0/10} status",
        pre:
          "Port      Name               Status       Vlan       Duplex  Speed Type\n" +
          "Fa0/10    ENG-PC             inactive     30         a-full  a-100 10/100BaseTX",
        post:
          "Port      Name               Status       Vlan       Duplex  Speed Type\n" +
          "Fa0/10    ENG-PC             connected    30         a-full  a-100 10/100BaseTX",
      },
      {
        cmd: "sh(ow) vlan br(ief)",
        pre:
          "VLAN Name                             Status    Ports\n" +
          "---- -------------------------------- --------- -------------------------------\n" +
          "1    default                          active    Fa0/1, Fa0/2, Fa0/3, Fa0/4\n" +
          "10   SALES                            active    Fa0/5, Fa0/6",
        post:
          "VLAN Name                             Status    Ports\n" +
          "---- -------------------------------- --------- -------------------------------\n" +
          "1    default                          active    Fa0/1, Fa0/2, Fa0/3, Fa0/4\n" +
          "10   SALES                            active    Fa0/5, Fa0/6\n" +
          "30   VLAN0030                         active    Fa0/10",
      },
    ],
    fix: [
      {
        id: "recreate-vlan30",
        label: "Re-create VLAN 30",
        accept: ["vlan 30"],
        mode: "config",
        setsMode: "config-vlan",
        hints: [
          "'show interfaces status' says Fa0/10's VLAN is 'inactive' — the assigned VLAN no longer exists.",
          "The cleanup deleted VLAN 30 while ports were still assigned to it. Re-create it in global config.",
          "In global configuration mode: 'vlan 30'.",
        ],
        explanation:
          "Deleting a VLAN does not reassign its ports — they keep pointing at the now-missing VLAN and go " +
          "inactive. Re-creating the VLAN instantly restores every port still assigned to it.",
      },
    ],
    completion:
      "VLAN 30 exists again and Fa0/10 switched from 'inactive' to 'connected' — the user is back online. " +
      "Confirm with 'show interfaces fa0/10 status'.",
  }
);
