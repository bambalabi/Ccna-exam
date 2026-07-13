// Study guide topics: IP Connectivity (configure/verify/troubleshoot objectives).
(window.GUIDE_BANK = window.GUIDE_BANK || []).push(
  {
    id: "gc-static-v4",
    domain: "IP Connectivity",
    title: "IPv4 Static Routing (Default, Network, Host, Floating)",
    blueprint: "3.3 Configure and verify IPv4 and IPv6 static routing",
    overview: [
      "A static route tells the router how to reach a prefix it is not connected to: ip route <network> <mask> <next-hop | exit-interface>. Static routes have administrative distance 1, so they beat every routing protocol unless you deliberately raise the distance.",
      "The important variants: a default route (0.0.0.0 0.0.0.0) matches everything not otherwise known; a host route uses mask 255.255.255.255 for one address; a floating static uses a higher administrative distance so it only enters the table when the primary route disappears.",
    ],
    configs: [
      {
        title: "Network, default and host routes",
        cli: "R1# configure terminal\nR1(config)# ip route 172.16.20.0 255.255.255.0 10.0.0.2\nR1(config)# ip route 0.0.0.0 0.0.0.0 203.0.113.1\nR1(config)# ip route 192.168.99.10 255.255.255.255 10.0.0.2",
        notes: [
          "Prefer a next-hop IP on multi-access (Ethernet) links. An exit-interface-only route on Ethernet forces the router to ARP for every destination — use it only on point-to-point links.",
          "A fully specified route (interface AND next-hop) is the safest form: ip route 172.16.20.0 255.255.255.0 g0/1 10.0.0.2.",
        ],
      },
      {
        title: "Floating static as a backup route",
        intro: "Raise the administrative distance above the primary route's AD so it stays out of the table until needed.",
        cli: "! primary route learned via OSPF (AD 110); backup via cellular next-hop:\nR1(config)# ip route 172.16.20.0 255.255.255.0 198.51.100.1 130",
        notes: [
          "AD reference values the exam expects: connected 0, static 1, eBGP 20, EIGRP 90, OSPF 110, IS-IS 115, RIP 120.",
        ],
      },
    ],
    verify: [
      { cmd: "show ip route", what: "The routing table: code S for static, S* for the default candidate; each entry shows [AD/metric] and the next hop." },
      { cmd: "show ip route 172.16.20.0", what: "Exactly which entry the router would use for that destination, including the longest-prefix match logic result." },
      { cmd: "ping 172.16.20.1 source g0/0", what: "End-to-end test from a specific interface — proves the return path exists too, which a plain ping can hide." },
    ],
    troubleshooting: [
      {
        symptom: "Configured static route does not appear in the routing table",
        causes: ["Next-hop is unreachable / exit interface is down", "A route to the same prefix with lower AD already exists"],
        fix: "Confirm the interface toward the next hop is up/up and the next hop answers ping; check show ip route <prefix> to see what beat it.",
      },
      {
        symptom: "Traffic forwards one way; replies never come back",
        causes: ["The remote router lacks a return route to the source subnet — routing must be configured in both directions"],
        fix: "Add the mirror static route (or default) on the far router; verify with traceroute from both ends.",
      },
      {
        symptom: "Floating static never takes over when the primary fails",
        causes: ["Its AD was set lower than or equal to the primary's, so it was never 'floating'", "Primary interface stays up (e.g., failure beyond the local link) so the primary route never leaves the table"],
        fix: "Set the floating AD higher than the primary's AD, and consider IP SLA tracking when the failure is not a local link-down.",
      },
    ],
    tips: [
      "Longest prefix match always wins before AD or metric is even considered — a /32 host route beats a /24, which beats a default.",
      "S* 0.0.0.0/0 in show ip route output is the signature of a configured default route; 'Gateway of last resort is set' confirms it.",
    ],
  },
  {
    id: "gc-static-v6",
    domain: "IP Connectivity",
    title: "IPv6 Static Routing",
    blueprint: "3.3 Configure and verify IPv4 and IPv6 static routing",
    overview: [
      "IPv6 static routes mirror IPv4: ipv6 route <prefix>/<length> <next-hop | exit-interface> [AD]. The default route is ::/0. ipv6 unicast-routing must be enabled or the router will not forward IPv6 at all.",
      "One IPv6-specific rule: if the next hop is a link-local address (fe80::...), the exit interface must be specified too, because link-local addresses are only unique per link.",
    ],
    configs: [
      {
        title: "IPv6 network, default, and floating static routes",
        cli: "R1# configure terminal\nR1(config)# ipv6 unicast-routing\nR1(config)# ipv6 route 2001:db8:acad:2::/64 2001:db8:acad:12::2\nR1(config)# ipv6 route ::/0 2001:db8:acad:12::2\nR1(config)# ipv6 route 2001:db8:acad:2::/64 2001:db8:acad:13::3 150",
      },
      {
        title: "Next hop as link-local (interface required)",
        cli: "R1(config)# ipv6 route 2001:db8:acad:2::/64 gigabitEthernet 0/1 fe80::2",
        notes: [
          "Omitting the interface with a link-local next hop is rejected — the router cannot tell which link fe80::2 lives on.",
        ],
      },
    ],
    verify: [
      { cmd: "show ipv6 route", what: "IPv6 routing table; S = static, with [AD/metric] shown exactly like IPv4. Look for ::/0 as the default." },
      { cmd: "show ipv6 route static", what: "Filters the table to static entries only — quick check that your route was accepted and installed." },
      { cmd: "ping 2001:db8:acad:2::1", what: "Reachability test; combine with traceroute to see where forwarding stops when it fails." },
    ],
    troubleshooting: [
      {
        symptom: "Router accepts IPv6 addresses but never forwards between interfaces",
        causes: ["ipv6 unicast-routing is missing — the box is acting as an IPv6 host, not a router"],
        fix: "Configure ipv6 unicast-routing globally; connected prefixes then appear in show ipv6 route and forwarding begins.",
      },
      {
        symptom: "Static route with a link-local next hop is rejected or traffic is dropped",
        causes: ["Exit interface omitted with an fe80:: next hop"],
        fix: "Re-enter the route as ipv6 route <prefix> <exit-interface> <link-local-next-hop> so the link is unambiguous.",
      },
    ],
    tips: [
      "::/0 is the IPv6 default route — expect it in both configuration answers and show ipv6 route exhibits.",
      "The same AD table applies to IPv6 (static 1, OSPF 110), so floating statics work identically.",
    ],
  },
  {
    id: "gc-ospf-config",
    domain: "IP Connectivity",
    title: "Single-Area OSPFv2 Configuration",
    blueprint: "3.4 Configure and verify single area OSPFv2",
    overview: [
      "OSPF is a link-state protocol: routers form neighbor adjacencies, exchange LSAs, and each computes shortest paths by interface cost (reference bandwidth / interface bandwidth). Single-area designs put every interface in area 0.",
      "The router ID is chosen at process start: explicit router-id command first, else highest loopback address, else highest physical interface address. On multi-access (Ethernet) segments, routers elect a DR and BDR — highest priority wins, tie broken by highest router ID; priority 0 means never DR.",
    ],
    configs: [
      {
        title: "Enable OSPF with network statements",
        cli: "R1# configure terminal\nR1(config)# router ospf 1\nR1(config-router)# router-id 1.1.1.1\nR1(config-router)# network 10.0.12.0 0.0.0.3 area 0\nR1(config-router)# network 192.168.10.0 0.0.0.255 area 0\nR1(config-router)# passive-interface g0/0",
        notes: [
          "network uses a wildcard mask (inverse of the subnet mask): /30 → 0.0.0.3, /24 → 0.0.0.255.",
          "passive-interface keeps advertising the LAN prefix but stops sending hellos where no neighbor exists — a hardening best practice.",
          "The process number (1) is locally significant; neighbors may use different process IDs.",
        ],
      },
      {
        title: "Interface-mode OSPF, cost and DR priority",
        cli: "R1(config)# interface g0/1\nR1(config-if)# ip ospf 1 area 0\nR1(config-if)# ip ospf cost 10\nR1(config-if)# ip ospf priority 100\nR1(config)# interface g0/2\nR1(config-if)# ip ospf network point-to-point",
        notes: [
          "ip ospf network point-to-point on Ethernet links between exactly two routers skips the DR/BDR election and speeds convergence.",
          "Changing the reference bandwidth (auto-cost reference-bandwidth 10000) must be done on every router consistently.",
        ],
      },
    ],
    verify: [
      { cmd: "show ip ospf neighbor", what: "Neighbor list with state — FULL is healthy; FULL/DR or FULL/BDR names the peer's role on the segment. 2WAY/DROTHER between two non-DR routers is normal." },
      { cmd: "show ip ospf interface g0/1", what: "The interface's area, cost, network type, hello/dead timers, priority, and who the DR/BDR are — the answer sheet for adjacency problems." },
      { cmd: "show ip route ospf", what: "Routes learned via OSPF, coded O, with [110/cost]; confirms LSAs actually turned into forwarding state." },
      { cmd: "show ip protocols", what: "The running OSPF process: router ID, networks advertised, and passive interfaces at a glance." },
    ],
    troubleshooting: [
      {
        symptom: "Expected neighbor never appears in show ip ospf neighbor",
        causes: ["Interfaces in different subnets", "Hello/dead timers mismatch", "Area number mismatch", "Interface set passive", "Authentication mismatch"],
        fix: "Compare show ip ospf interface on both ends — subnet, timers, and area must match, and the interface must not be passive.",
      },
      {
        symptom: "Neighbors stuck in EXSTART/EXCHANGE",
        causes: ["MTU mismatch between the two interfaces"],
        fix: "Set matching MTU values (or ip ospf mtu-ignore as a workaround) and the database exchange completes.",
      },
      {
        symptom: "Wrong router became DR",
        causes: ["Election is not preemptive — the first router up won and keeps the role regardless of later priorities"],
        fix: "Set ip ospf priority appropriately, then reset adjacencies (clear ip ospf process, in a maintenance window) to force a new election.",
      },
    ],
    tips: [
      "Duplicate router IDs prevent adjacency and produce %OSPF-4-DUP_RTRID_NBR log messages — a common exhibit clue.",
      "Default hello/dead timers: 10/40 s on broadcast and point-to-point networks. Mismatched timers are the #1 lab-style adjacency fault.",
    ],
  },
  {
    id: "gc-ospf-troubleshoot",
    domain: "IP Connectivity",
    title: "Troubleshooting OSPF Adjacencies",
    blueprint: "3.4 Configure and verify single area OSPFv2 (neighbor adjacencies)",
    overview: [
      "OSPF neighbor problems are diagnosed by walking the adjacency requirements: same subnet, same area, matching hello/dead timers, matching authentication, unique router IDs, matching network types, and interfaces not passive. Every stuck state points at a specific subset of these.",
      "Learn the state meanings: DOWN/INIT = hellos not seen both ways, 2WAY = bidirectional but no full exchange required (DROTHER pairs stop here by design), EXSTART/EXCHANGE = database sync in progress (stuck = MTU mismatch), FULL = converged.",
    ],
    configs: [
      {
        title: "The comparison workflow",
        intro: "Run the same two commands on both routers and diff the outputs line by line.",
        cli: "R1# show ip ospf interface g0/0\nR1# show ip ospf neighbor\nR1# show ip protocols\n! fixing the classic faults:\nR1(config)# interface g0/0\nR1(config-if)# ip ospf hello-interval 10\nR1(config-if)# ip ospf dead-interval 40\nR1(config-if)# ip ospf 1 area 0        ! move interface to the right area\nR1(config)# router ospf 1\nR1(config-router)# no passive-interface g0/0",
        notes: [
          "debug ip ospf hello (lab only) prints the exact mismatch — timer, area, or subnet — as hellos are rejected.",
        ],
      },
    ],
    verify: [
      { cmd: "show ip ospf neighbor", what: "The state column is the diagnosis: missing entry, INIT, 2WAY, or stuck EXSTART each map to different fault families." },
      { cmd: "show ip ospf interface brief", what: "Every OSPF interface with process, area, address, cost and neighbor count — instantly reveals an interface in the wrong area or with zero neighbors." },
      { cmd: "show ip ospf database", what: "LSDB contents; if a router's LSAs are absent, its adjacency never reached FULL." },
    ],
    troubleshooting: [
      {
        symptom: "Neighbor missing entirely from show ip ospf neighbor",
        causes: ["Different subnets or masks on the link", "Area mismatch", "Passive interface", "Hellos blocked by an ACL"],
        fix: "Diff show ip ospf interface on both ends; fix subnet/area/passive; check ACLs permit protocol 89 (OSPF).",
      },
      {
        symptom: "Neighbor stuck in INIT",
        causes: ["Hellos flow only one way — far side ACL, or unidirectional filtering"],
        fix: "Find what drops hellos toward the stuck side (interface ACL, firewall) and permit OSPF protocol 89 both directions.",
      },
      {
        symptom: "Neighbor flaps between EXSTART and DOWN repeatedly",
        causes: ["MTU mismatch — DBD packets from the larger-MTU side are dropped"],
        fix: "Match the MTU on both interfaces (or configure ip ospf mtu-ignore) and the exchange completes to FULL.",
      },
      {
        symptom: "Adjacency FULL but expected routes missing",
        causes: ["Interface not advertised (network statement/wildcard wrong)", "Route filtered or a better source (lower AD) already provides it"],
        fix: "Check show ip protocols for the advertised networks and show ip route <prefix> to see which source won.",
      },
    ],
    tips: [
      "2WAY between two DROTHERs is healthy, not a fault — only pairs involving the DR/BDR reach FULL on a broadcast segment.",
      "Timers and area are carried inside the hello itself, so a mismatch means the hello is discarded silently — no neighbor entry ever forms.",
    ],
  }
);
