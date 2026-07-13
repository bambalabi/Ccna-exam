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
  }
);
