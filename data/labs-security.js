// CLI labs: Security Fundamentals.
(window.LAB_BANK = window.LAB_BANK || []).push(
  {
    id: "ls-standard-acl",
    type: "config",
    domain: "Security Fundamentals",
    title: "Filter with a standard ACL",
    difficulty: 1,
    scenario:
      "Only the admin subnet 192.168.10.0/24 may reach the server LAN behind R1's g0/1. " +
      "Create standard ACL 10 permitting that subnet and apply it outbound on g0/1 " +
      "(the implicit deny drops everyone else). You are at R1's user EXEC prompt.",
    device: { hostname: "R1", startMode: "user" },
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
        explanation: "configure terminal enters global configuration mode, where numbered ACLs are written.",
      },
      {
        label: "ACL 10: permit the admin subnet",
        accept: ["access-list 10 per(mit) 192.168.10.0 0.0.0.255"],
        mode: "config",
        hints: [
          "Standard ACLs (1-99) match source addresses only. Wildcard for /24 is 0.0.0.255.",
          "'access-list 10 permit 192.168.10.0 0.0.0.255'.",
        ],
        explanation:
          "This single permit plus the invisible 'deny any' at the end of every ACL yields exactly the intended " +
          "policy: admin subnet in, everyone else dropped.",
      },
      {
        label: "Select the server-LAN interface g0/1",
        accept: ["int(erface) {if=GigabitEthernet0/1}"],
        mode: "config",
        setsMode: "config-if",
        hints: [
          "Standard ACLs are placed close to the DESTINATION — the interface toward the servers.",
          "'interface g0/1'.",
        ],
        explanation: "A standard ACL cannot tell destinations apart, so it is applied near the destination to avoid overblocking.",
      },
      {
        label: "Apply ACL 10 outbound",
        accept: ["ip access-group 10 out"],
        mode: "config-if",
        requiresInterface: "GigabitEthernet0/1",
        hints: [
          "Traffic flows out of g0/1 toward the servers, so the ACL is applied outbound.",
          "'ip access-group 10 out'.",
        ],
        explanation: "ip access-group binds the ACL to the interface and direction; an unapplied ACL filters nothing.",
      },
    ],
    outputs: [
      {
        cmd: "sh(ow) access-lists",
        pre: "! (no access lists configured)",
        post: "Standard IP access list 10\n    10 permit 192.168.10.0, wildcard bits 0.0.0.255 (58 matches)",
      },
      {
        cmd: "sh(ow) ip int(erface) {if=GigabitEthernet0/1}",
        pre:
          "GigabitEthernet0/1 is up, line protocol is up\n  Internet address is 172.16.5.1/24\n" +
          "  Outgoing access list is not set\n  Inbound  access list is not set",
        post:
          "GigabitEthernet0/1 is up, line protocol is up\n  Internet address is 172.16.5.1/24\n" +
          "  Outgoing access list is 10\n  Inbound  access list is not set",
      },
    ],
    completion:
      "ACL 10 now guards the server LAN: only 192.168.10.0/24 sources pass g0/1 outbound; the implicit " +
      "deny handles the rest. Verify with 'show ip interface g0/1'.",
  },
  {
    id: "ls-port-security",
    type: "config",
    domain: "Security Fundamentals",
    title: "Lock down an access port with port security",
    difficulty: 2,
    scenario:
      "SW1's Fa0/5 feeds a desk with a PC daisy-chained behind an IP phone (2 devices). " +
      "Lock the port: static access mode, port security enabled, maximum 2 MACs learned " +
      "sticky, violation mode restrict. You are at SW1's user EXEC prompt.",
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
        explanation: "Port security is configured per interface on the host-facing access port.",
      },
      {
        label: "Force static access mode",
        accept: ["sw(itchport) mode acc(ess)"],
        mode: "config-if",
        requiresInterface: "FastEthernet0/5",
        hints: [
          "Port security is REJECTED on dynamic (DTP) ports — the port must be statically access or trunk first.",
          "'switchport mode access'.",
        ],
        explanation: "A dynamic-mode port cannot run port security; forcing static access mode is the mandatory first step.",
      },
      {
        label: "Enable port security",
        accept: ["sw(itchport) port-s(ecurity)"],
        mode: "config-if",
        requiresInterface: "FastEthernet0/5",
        hints: ["The base feature switch comes before its options.", "'switchport port-security'."],
        explanation: "switchport port-security activates the feature with defaults (max 1 MAC, violation shutdown) that the next steps tune.",
      },
      {
        label: "Allow a maximum of 2 MAC addresses",
        accept: ["sw(itchport) port-s(ecurity) max(imum) 2"],
        mode: "config-if",
        requiresInterface: "FastEthernet0/5",
        group: "psopts",
        hints: ["Phone + PC = two addresses.", "'switchport port-security maximum 2'."],
        explanation: "maximum 2 accommodates the phone and the PC behind it; a third device triggers the violation action.",
      },
      {
        label: "Learn the MACs sticky",
        accept: ["sw(itchport) port-s(ecurity) mac(-address) sti(cky)", "sw(itchport) port-s(ecurity) mac-address sticky"],
        mode: "config-if",
        requiresInterface: "FastEthernet0/5",
        group: "psopts",
        hints: ["Sticky learning writes the learned MACs into the running config.", "'switchport port-security mac-address sticky'."],
        explanation: "Sticky learning converts dynamically learned MACs into config entries — save the config and they survive reloads.",
      },
      {
        label: "Set violation mode restrict",
        accept: ["sw(itchport) port-s(ecurity) vio(lation) res(trict)"],
        mode: "config-if",
        requiresInterface: "FastEthernet0/5",
        group: "psopts",
        hints: ["restrict drops offenders and logs them without killing the port.", "'switchport port-security violation restrict'."],
        explanation: "restrict silently drops frames from unknown MACs while logging and counting violations — the port itself stays up.",
      },
    ],
    outputs: [
      {
        cmd: "sh(ow) port-s(ecurity) int(erface) {if=FastEthernet0/5}",
        pre: "Port Security              : Disabled\nPort Status                : Secure-down\nViolation Mode             : Shutdown\nMaximum MAC Addresses      : 1",
        post:
          "Port Security              : Enabled\nPort Status                : Secure-up\nViolation Mode             : Restrict\n" +
          "Maximum MAC Addresses      : 2\nSticky MAC Addresses       : 2\nSecurity Violation Count   : 0",
      },
      {
        cmd: "sh(ow) port-s(ecurity) add(ress)",
        pre: "          Secure Mac Address Table\n! (no secure addresses yet)",
        post:
          "          Secure Mac Address Table\n" +
          "Vlan    Mac Address       Type                     Ports\n" +
          "----    -----------       ----                     -----\n" +
          "  10    0004.9a11.22aa    SecureSticky             Fa0/5\n" +
          "  10    0800.27cc.33bb    SecureSticky             Fa0/5",
      },
    ],
    completion:
      "Fa0/5 is locked to 2 sticky-learned MACs with restrict mode — a third device gets dropped and " +
      "logged, but the desk stays online. Verify with 'show port-security interface fa0/5'.",
  },
  {
    id: "ls-acl-misordered",
    type: "troubleshoot",
    domain: "Security Fundamentals",
    title: "ACL blocks everyone (misordered entries)",
    difficulty: 3,
    scenario:
      "Policy: only the guest subnet 192.168.20.0/24 must be blocked from web (port 80) " +
      "access; everyone else is allowed everything. Since ACL 110 was applied inbound on " +
      "R1's g0/0, ALL users lost web access. Inspect the ACL, then rebuild it correctly " +
      "(delete it and re-create: a targeted deny for the guests, then permit ip any any). " +
      "You are at R1's privileged prompt.",
    device: { hostname: "R1", startMode: "priv" },
    diagnosis: [
      { label: "Read ACL 110 top-down", cmd: "sh(ow) access-lists" },
      { label: "Confirm where the ACL is applied", cmd: "sh(ow) ip int(erface) {if=GigabitEthernet0/0}" },
    ],
    outputs: [
      {
        cmd: "sh(ow) access-lists",
        pre:
          "Extended IP access list 110\n" +
          "    10 deny tcp any any eq www (1204 matches)\n" +
          "    20 permit ip any any (5520 matches)",
        post:
          "Extended IP access list 110\n" +
          "    10 deny tcp 192.168.20.0 0.0.0.255 any eq www\n" +
          "    20 permit ip any any",
      },
      {
        cmd: "sh(ow) ip int(erface) {if=GigabitEthernet0/0}",
        pre:
          "GigabitEthernet0/0 is up, line protocol is up\n  Internet address is 192.168.1.1/24\n" +
          "  Inbound  access list is 110",
        post: null,
      },
    ],
    fix: [
      {
        id: "delete-acl",
        label: "Delete the broken ACL 110",
        accept: ["no access-list 110"],
        mode: "config",
        hints: [
          "Line 10 denies tcp ANY any eq www — it matches every user, not just the guests, and wins before line 20.",
          "Numbered ACLs are easiest to fix by deleting and rebuilding. Remove the whole list first.",
          "'no access-list 110'.",
        ],
        explanation:
          "ACLs evaluate top-down, first match wins: 'deny tcp any any eq www' catches every web flow before " +
          "the permit is ever read. Deleting the numbered list clears the way for a corrected rebuild.",
      },
      {
        id: "deny-guests",
        label: "Deny only the guest subnet's web traffic",
        accept: [
          "access-list 110 deny tcp 192.168.20.0 0.0.0.255 any eq 80",
          "access-list 110 deny tcp 192.168.20.0 0.0.0.255 any eq www",
        ],
        mode: "config",
        hints: [
          "The deny must name the guest source subnet, not 'any'.",
          "'access-list 110 deny tcp 192.168.20.0 0.0.0.255 any eq 80' (eq www also works).",
        ],
        explanation:
          "Scoping the deny to source 192.168.20.0/24 implements the actual policy: only guest web traffic " +
          "matches; all other sources fall through to the next line.",
      },
      {
        id: "permit-rest",
        label: "Permit everything else",
        accept: ["access-list 110 per(mit) ip any any"],
        mode: "config",
        hints: [
          "Without a closing permit, the invisible 'deny any' at the end drops all remaining traffic.",
          "'access-list 110 permit ip any any'.",
        ],
        explanation:
          "Every ACL ends with an implicit deny any — the explicit 'permit ip any any' restores service for " +
          "all non-guest traffic once the targeted deny has been evaluated.",
      },
    ],
    completion:
      "ACL 110 now denies web access only for 192.168.20.0/24 and permits everything else — the rest of " +
      "the company has its web access back. Re-read it with 'show access-lists'.",
  }
);
