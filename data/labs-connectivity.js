// CLI labs: IP Connectivity.
(window.LAB_BANK = window.LAB_BANK || []).push(
  {
    id: "lc-static-routes",
    type: "config",
    domain: "IP Connectivity",
    title: "Configure a network route and a default route",
    difficulty: 1,
    scenario:
      "R1 connects to R2 over 10.0.12.0/30 (R2 is 10.0.12.2) and to the ISP at " +
      "203.0.113.1. Add a static route to the branch LAN 192.168.20.0/24 via R2, and a " +
      "default route toward the ISP for everything else. You are at R1's user EXEC prompt.",
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
        explanation: "configure terminal enters global configuration mode; static routes are global commands.",
      },
      {
        label: "Route to 192.168.20.0/24 via R2",
        accept: ["ip route 192.168.20.0 255.255.255.0 10.0.12.2"],
        mode: "config",
        group: "routes",
        hints: [
          "ip route <network> <mask> <next-hop>. The /24 mask in dotted decimal is 255.255.255.0.",
          "'ip route 192.168.20.0 255.255.255.0 10.0.12.2'.",
        ],
        explanation: "A static network route: packets for 192.168.20.0/24 are handed to next hop 10.0.12.2 with administrative distance 1.",
      },
      {
        label: "Default route toward the ISP",
        accept: ["ip route 0.0.0.0 0.0.0.0 203.0.113.1"],
        mode: "config",
        group: "routes",
        hints: [
          "The default route matches every destination: network 0.0.0.0 with mask 0.0.0.0.",
          "'ip route 0.0.0.0 0.0.0.0 203.0.113.1'.",
        ],
        explanation: "The quad-zero route is the gateway of last resort — used only when no longer prefix matches the destination.",
      },
    ],
    outputs: [
      {
        cmd: "sh(ow) ip route",
        pre:
          "Codes: L - local, C - connected, S - static, O - OSPF\n" +
          "Gateway of last resort is not set\n\n" +
          "      10.0.0.0/8 is variably subnetted, 2 subnets, 2 masks\n" +
          "C        10.0.12.0/30 is directly connected, GigabitEthernet0/1\n" +
          "L        10.0.12.1/32 is directly connected, GigabitEthernet0/1\n" +
          "      203.0.113.0/24 is variably subnetted, 2 subnets, 2 masks\n" +
          "C        203.0.113.0/30 is directly connected, GigabitEthernet0/2\n" +
          "L        203.0.113.2/32 is directly connected, GigabitEthernet0/2",
        post:
          "Codes: L - local, C - connected, S - static, O - OSPF\n" +
          "Gateway of last resort is 203.0.113.1 to network 0.0.0.0\n\n" +
          "S*    0.0.0.0/0 [1/0] via 203.0.113.1\n" +
          "      10.0.0.0/8 is variably subnetted, 2 subnets, 2 masks\n" +
          "C        10.0.12.0/30 is directly connected, GigabitEthernet0/1\n" +
          "L        10.0.12.1/32 is directly connected, GigabitEthernet0/1\n" +
          "S     192.168.20.0/24 [1/0] via 10.0.12.2\n" +
          "      203.0.113.0/24 is variably subnetted, 2 subnets, 2 masks\n" +
          "C        203.0.113.0/30 is directly connected, GigabitEthernet0/2\n" +
          "L        203.0.113.2/32 is directly connected, GigabitEthernet0/2",
      },
    ],
    completion:
      "The routing table now shows S 192.168.20.0/24 via 10.0.12.2 and S* 0.0.0.0/0 via 203.0.113.1. " +
      "Check it with 'show ip route'.",
  },
  {
    id: "lc-floating-static",
    type: "config",
    domain: "IP Connectivity",
    title: "Add a floating static backup route",
    difficulty: 2,
    scenario:
      "R1 reaches the data-center prefix 172.16.30.0/24 through R2 (10.0.12.2) as primary " +
      "path. A backup link to R3 (10.0.13.3) exists. Configure the primary static route, " +
      "then a floating static through R3 with administrative distance 150 that only takes " +
      "over if the primary is lost. You are at R1's user EXEC prompt.",
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
        explanation: "configure terminal enters global configuration mode; static routes are global commands.",
      },
      {
        label: "Primary route via R2",
        accept: ["ip route 172.16.30.0 255.255.255.0 10.0.12.2"],
        mode: "config",
        hints: ["A normal static route — default administrative distance 1.", "'ip route 172.16.30.0 255.255.255.0 10.0.12.2'."],
        explanation: "With no distance specified the static route gets AD 1, making it the preferred path while the next hop is reachable.",
      },
      {
        label: "Floating backup via R3 (AD 150)",
        accept: ["ip route 172.16.30.0 255.255.255.0 10.0.13.3 150"],
        mode: "config",
        hints: [
          "Same route, different next hop, plus a higher administrative distance at the end of the line.",
          "'ip route 172.16.30.0 255.255.255.0 10.0.13.3 150'.",
        ],
        explanation:
          "The AD 150 route 'floats' below the AD 1 primary: it is kept out of the routing table until the " +
          "primary route is withdrawn, then it takes over automatically.",
      },
    ],
    outputs: [
      {
        cmd: "sh(ow) ip route 172.16.30.0",
        pre: "% Network not in table",
        post:
          "Routing entry for 172.16.30.0/24\n" +
          "  Known via \"static\", distance 1, metric 0\n" +
          "  Routing Descriptor Blocks:\n" +
          "  * 10.0.12.2\n" +
          "      Route metric is 0, traffic share count is 1\n" +
          "! Note: the AD 150 route via 10.0.13.3 is installed only if this one is lost.",
      },
      {
        cmd: "sh(ow) run(ning-config) | i(nclude) ip route",
        pre: "! (no static routes configured yet)",
        post:
          "ip route 172.16.30.0 255.255.255.0 10.0.12.2\n" +
          "ip route 172.16.30.0 255.255.255.0 10.0.13.3 150",
      },
    ],
    completion:
      "Both routes are configured: the AD 1 primary is active and the AD 150 floating static waits in " +
      "the running-config until the primary path fails.",
  },
  {
    id: "lc-wrong-nexthop",
    type: "troubleshoot",
    domain: "IP Connectivity",
    title: "Branch LAN unreachable (wrong static next hop)",
    difficulty: 2,
    scenario:
      "Users behind R1 cannot reach the branch LAN 192.168.20.0/24. The branch router R2 " +
      "is next hop 10.0.12.2, but pings to 192.168.20.1 fail. A static route exists but " +
      "traffic is being sent to the wrong address (10.0.12.6 does not exist on this link). " +
      "Find the bad route, remove it, and replace it with the correct one. You are at R1's " +
      "privileged prompt.",
    device: { hostname: "R1", startMode: "priv" },
    diagnosis: [
      { label: "Inspect the route for 192.168.20.0", cmd: "sh(ow) ip route 192.168.20.0" },
      { label: "Check reachability of the configured next hop", cmd: "ping 10.0.12.6" },
    ],
    outputs: [
      {
        cmd: "sh(ow) ip route 192.168.20.0",
        pre:
          "Routing entry for 192.168.20.0/24\n" +
          "  Known via \"static\", distance 1, metric 0\n" +
          "  Routing Descriptor Blocks:\n" +
          "  * 10.0.12.6\n" +
          "      Route metric is 0, traffic share count is 1",
        post:
          "Routing entry for 192.168.20.0/24\n" +
          "  Known via \"static\", distance 1, metric 0\n" +
          "  Routing Descriptor Blocks:\n" +
          "  * 10.0.12.2\n" +
          "      Route metric is 0, traffic share count is 1",
      },
      {
        cmd: "ping 10.0.12.6",
        pre: "Type escape sequence to abort.\nSending 5, 100-byte ICMP Echos to 10.0.12.6, timeout is 2 seconds:\n.....\nSuccess rate is 0 percent (0/5)",
        post: null,
      },
      {
        cmd: "ping 10.0.12.2",
        pre: "Type escape sequence to abort.\nSending 5, 100-byte ICMP Echos to 10.0.12.2, timeout is 2 seconds:\n!!!!!\nSuccess rate is 100 percent (5/5), round-trip min/avg/max = 1/1/2 ms",
        post: null,
      },
      {
        cmd: "sh(ow) run(ning-config) | i(nclude) ip route",
        pre: "ip route 192.168.20.0 255.255.255.0 10.0.12.6",
        post: "ip route 192.168.20.0 255.255.255.0 10.0.12.2",
      },
    ],
    fix: [
      {
        id: "remove-bad",
        label: "Remove the incorrect route",
        accept: ["no ip route 192.168.20.0 255.255.255.0 10.0.12.6"],
        mode: "config",
        hints: [
          "'show ip route 192.168.20.0' reveals the next hop actually configured — compare it with R2's real address.",
          "Delete a static route by prefixing the exact original command with 'no'.",
          "'no ip route 192.168.20.0 255.255.255.0 10.0.12.6'.",
        ],
        explanation:
          "Static routes are removed with 'no' plus the full original statement; leaving the bad route in place " +
          "would keep traffic blackholed toward the unreachable next hop.",
      },
      {
        id: "add-good",
        label: "Add the correct route via 10.0.12.2",
        accept: ["ip route 192.168.20.0 255.255.255.0 10.0.12.2"],
        mode: "config",
        hints: [
          "The scenario gives R2's real address on the 10.0.12.0/30 link.",
          "'ip route 192.168.20.0 255.255.255.0 10.0.12.2'.",
        ],
        explanation:
          "With the next hop corrected to R2's actual interface address, forwarding to the branch LAN resumes " +
          "immediately — verify with ping and 'show ip route'.",
      },
    ],
    completion:
      "The static route now points at 10.0.12.2 and the branch LAN is reachable again. Re-run " +
      "'show ip route 192.168.20.0' and ping 10.0.12.2 to confirm.",
  },
  {
    id: "lc-ospf-config",
    type: "config",
    domain: "IP Connectivity",
    title: "Enable single-area OSPFv2 on R1",
    difficulty: 2,
    scenario:
      "Bring R1 into the single-area OSPF design: process 1, router-id 1.1.1.1, advertise " +
      "the WAN link 10.0.12.0/30 and the LAN 192.168.10.0/24 into area 0, and stop sending " +
      "hellos into the LAN on g0/0 (passive-interface). You are at R1's user EXEC prompt.",
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
        explanation: "configure terminal enters global configuration mode, from which routing processes are started.",
      },
      {
        label: "Start OSPF process 1",
        accept: ["router ospf 1"],
        mode: "config",
        setsMode: "config-router",
        hints: ["Routing protocols are configured in their own sub-mode.", "'router ospf 1'."],
        explanation: "router ospf 1 starts (or enters) OSPF process 1; the process ID is locally significant and need not match neighbors.",
      },
      {
        label: "Set router-id 1.1.1.1",
        accept: ["router-id 1.1.1.1"],
        mode: "config-router",
        hints: ["Give the process an explicit, stable identity.", "'router-id 1.1.1.1'."],
        explanation: "An explicit router-id beats loopback/interface selection and keeps the LSDB stable across reloads.",
      },
      {
        label: "Advertise 10.0.12.0/30 into area 0",
        accept: ["net(work) 10.0.12.0 0.0.0.3 area 0"],
        mode: "config-router",
        group: "networks",
        hints: [
          "network uses a WILDCARD mask — the inverse of the subnet mask. For /30 that is 0.0.0.3.",
          "'network 10.0.12.0 0.0.0.3 area 0'.",
        ],
        explanation: "The network statement enables OSPF on every interface whose address falls inside 10.0.12.0/30 and puts it in area 0.",
      },
      {
        label: "Advertise 192.168.10.0/24 into area 0",
        accept: ["net(work) 192.168.10.0 0.0.0.255 area 0"],
        mode: "config-router",
        group: "networks",
        hints: ["The /24 wildcard is 0.0.0.255.", "'network 192.168.10.0 0.0.0.255 area 0'."],
        explanation: "This enables OSPF on the LAN interface so its prefix is advertised to every router in area 0.",
      },
      {
        label: "Make the LAN interface passive",
        accept: ["pass(ive-interface) {if=GigabitEthernet0/0}"],
        mode: "config-router",
        hints: [
          "No neighbors live on the LAN — keep advertising the prefix but stop sending hellos there.",
          "'passive-interface g0/0'.",
        ],
        explanation: "passive-interface suppresses hellos on g0/0 while still advertising its subnet — a standard hardening step.",
      },
    ],
    outputs: [
      {
        cmd: "sh(ow) ip ospf nei(ghbor)",
        pre: "! (no OSPF process running yet)",
        post:
          "Neighbor ID     Pri   State           Dead Time   Address         Interface\n" +
          "2.2.2.2           1   FULL/  -        00:00:36    10.0.12.2       GigabitEthernet0/1",
      },
      {
        cmd: "sh(ow) ip protocols",
        pre: "! (no routing protocol configured)",
        post:
          "Routing Protocol is \"ospf 1\"\n" +
          "  Router ID 1.1.1.1\n" +
          "  Routing for Networks:\n" +
          "    10.0.12.0 0.0.0.3 area 0\n" +
          "    192.168.10.0 0.0.0.255 area 0\n" +
          "  Passive Interface(s):\n" +
          "    GigabitEthernet0/0",
      },
    ],
    completion:
      "OSPF process 1 is running with router-id 1.1.1.1, both prefixes are in area 0, and g0/0 is " +
      "passive. R2 (2.2.2.2) reaches FULL — check 'show ip ospf neighbor'.",
  },
  {
    id: "lc-ospf-adjacency",
    type: "troubleshoot",
    domain: "IP Connectivity",
    title: "OSPF neighbor missing (passive interface)",
    difficulty: 3,
    scenario:
      "R1 and R2 share the 10.0.12.0/30 link on g0/1 and both run OSPF process 1 in " +
      "area 0, but R1 shows no neighbor and the WAN routes are missing. R2's " +
      "configuration is confirmed correct. Investigate R1 with show commands and repair " +
      "the adjacency. You are at R1's privileged prompt.",
    device: { hostname: "R1", startMode: "priv" },
    diagnosis: [
      { label: "Check the neighbor table", cmd: "sh(ow) ip ospf nei(ghbor)" },
      { label: "Review the OSPF process settings", cmd: "sh(ow) ip protocols" },
      { label: "Inspect OSPF on the WAN interface", cmd: "sh(ow) ip ospf int(erface) {if=GigabitEthernet0/1}" },
    ],
    outputs: [
      {
        cmd: "sh(ow) ip ospf nei(ghbor)",
        pre: "! (no neighbors)",
        post:
          "Neighbor ID     Pri   State           Dead Time   Address         Interface\n" +
          "2.2.2.2           1   FULL/  -        00:00:38    10.0.12.2       GigabitEthernet0/1",
      },
      {
        cmd: "sh(ow) ip protocols",
        pre:
          "Routing Protocol is \"ospf 1\"\n" +
          "  Router ID 1.1.1.1\n" +
          "  Routing for Networks:\n" +
          "    10.0.12.0 0.0.0.3 area 0\n" +
          "    192.168.10.0 0.0.0.255 area 0\n" +
          "  Passive Interface(s):\n" +
          "    GigabitEthernet0/0\n" +
          "    GigabitEthernet0/1",
        post:
          "Routing Protocol is \"ospf 1\"\n" +
          "  Router ID 1.1.1.1\n" +
          "  Routing for Networks:\n" +
          "    10.0.12.0 0.0.0.3 area 0\n" +
          "    192.168.10.0 0.0.0.255 area 0\n" +
          "  Passive Interface(s):\n" +
          "    GigabitEthernet0/0",
      },
      {
        cmd: "sh(ow) ip ospf int(erface) {if=GigabitEthernet0/1}",
        pre:
          "GigabitEthernet0/1 is up, line protocol is up\n" +
          "  Internet Address 10.0.12.1/30, Area 0\n" +
          "  Process ID 1, Router ID 1.1.1.1, Network Type BROADCAST, Cost: 1\n" +
          "  No Hellos (Passive interface)",
        post:
          "GigabitEthernet0/1 is up, line protocol is up\n" +
          "  Internet Address 10.0.12.1/30, Area 0\n" +
          "  Process ID 1, Router ID 1.1.1.1, Network Type BROADCAST, Cost: 1\n" +
          "  Timer intervals configured, Hello 10, Dead 40, Wait 40, Retransmit 5\n" +
          "  Neighbor Count is 1, Adjacent neighbor count is 1",
      },
    ],
    fix: [
      {
        id: "unpassive",
        label: "Remove passive-interface from g0/1",
        accept: ["no pass(ive-interface) {if=GigabitEthernet0/1}"],
        mode: "config-router",
        hints: [
          "'show ip ospf interface g0/1' says 'No Hellos (Passive interface)' — hellos are suppressed on the WAN link.",
          "Someone made the WAN interface passive; undo it inside the OSPF process ('router ospf 1' first).",
          "In router config mode: 'no passive-interface g0/1'.",
        ],
        explanation:
          "A passive interface advertises its prefix but never sends hellos, so no adjacency can ever form " +
          "across it. Removing passive-interface on the WAN link lets hellos flow and the neighbors reach FULL.",
      },
    ],
    completion:
      "Hellos flow on g0/1 again and R2 (2.2.2.2) comes up to FULL. Verify with 'show ip ospf neighbor' " +
      "and check that the WAN routes reappear.",
  }
);
