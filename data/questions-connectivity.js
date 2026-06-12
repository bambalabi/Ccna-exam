(window.QUESTION_BANK = window.QUESTION_BANK || []).push(
  {
    id: "conn-001",
    domain: "IP Connectivity",
    type: "single",
    question: "Refer to the exhibit. A packet arrives at the router destined for 10.10.10.80. Which next hop does the router use to forward the packet?",
    exhibit: "R1# show ip route | begin Gateway\nGateway of last resort is 192.168.4.2 to network 0.0.0.0\n\n      10.0.0.0/8 is variably subnetted, 3 subnets, 3 masks\nO        10.10.10.0/26 [110/20] via 192.168.1.2, 00:12:04, GigabitEthernet0/0\nD        10.10.10.0/25 [90/130816] via 192.168.2.2, 00:44:51, GigabitEthernet0/1\nS        10.10.10.0/24 [1/0] via 192.168.3.2\nS*    0.0.0.0/0 [1/0] via 192.168.4.2",
    options: [
      "192.168.1.2",
      "192.168.2.2",
      "192.168.3.2",
      "192.168.4.2"
    ],
    answer: [1],
    explanation: "The router always selects the longest prefix that contains the destination, regardless of administrative distance. 10.10.10.0/26 covers only .0 through .63, so it does not match .80. The longest matching prefix is 10.10.10.0/25 (.0 through .127), the EIGRP route via 192.168.2.2. The static /24 and the default route also match but are less specific, and AD is only compared between routes for the identical prefix, never to choose between different prefix lengths."
  },
  {
    id: "conn-002",
    domain: "IP Connectivity",
    type: "single",
    question: "Refer to the exhibit. Which interface and next hop are used to forward a packet destined for 172.16.32.65?",
    exhibit: "R2# show ip route | begin Gateway\nGateway of last resort is 10.1.1.13 to network 0.0.0.0\n\n      172.16.0.0/16 is variably subnetted, 3 subnets, 2 masks\nO        172.16.32.0/27 [110/2] via 10.1.1.1, 00:08:11, GigabitEthernet0/0\nD        172.16.32.64/27 [90/3072] via 10.1.1.5, 01:02:33, GigabitEthernet0/1\nR        172.16.32.0/24 [120/1] via 10.1.1.9, 00:00:14, GigabitEthernet0/2\nS*    0.0.0.0/0 [1/0] via 10.1.1.13",
    options: [
      "GigabitEthernet0/0 toward 10.1.1.1",
      "GigabitEthernet0/1 toward 10.1.1.5",
      "GigabitEthernet0/2 toward 10.1.1.9",
      "The default route toward 10.1.1.13"
    ],
    answer: [1],
    explanation: "172.16.32.64/27 covers addresses .64 through .95, which includes .65, and at 27 bits it is the longest matching prefix. The OSPF route 172.16.32.0/27 covers only .0 through .31 and does not contain the destination at all, which is the trap in this question. The RIP /24 matches but is shorter, and the default route is only used when nothing else matches."
  },
  {
    id: "conn-003",
    domain: "IP Connectivity",
    type: "single",
    question: "A router learns the prefix 10.0.0.0/24 from OSPF, EIGRP, and RIP, and an administrator also configures a static route to the same prefix with no distance keyword. Which route is installed in the routing table?",
    options: [
      "The EIGRP route, because its metric is the most granular",
      "The OSPF route, because link-state protocols are preferred",
      "The static route, because its administrative distance is 1",
      "All four routes, because the router load balances between sources"
    ],
    answer: [2],
    explanation: "When multiple routing sources offer the exact same prefix, the router installs the one with the lowest administrative distance. A static route defaults to AD 1, which beats EIGRP (90), OSPF (110), and RIP (120). Metrics are never compared between different protocols because each protocol calculates them differently, and a router only load balances between equal routes from the same source."
  },
  {
    id: "conn-004",
    domain: "IP Connectivity",
    type: "multi",
    question: "Refer to the exhibit. Which two statements about this routing table entry are true? (Choose two.)",
    exhibit: "D     192.168.10.0/24 [90/2170112] via 172.16.1.2, 00:05:23, Serial0/0/0",
    options: [
      "The route was learned through EIGRP",
      "The administrative distance of the route is 2170112",
      "The metric of the route is 2170112",
      "The route was learned through OSPF"
    ],
    answer: [0, 2],
    explanation: "The code D identifies a route learned through EIGRP, which has a default administrative distance of 90. In the bracketed pair [90/2170112], the first value is the administrative distance and the second is the protocol metric. Reading the pair backwards is a classic mistake; OSPF routes would show code O and AD 110."
  },
  {
    id: "conn-005",
    domain: "IP Connectivity",
    type: "dragdrop",
    question: "Drag each routing table code on the left to the route source it identifies on the right.",
    items: ["O", "D", "S*", "C", "L"],
    targets: [
      "Route learned through OSPF",
      "Route learned through EIGRP",
      "Static route that is a candidate default",
      "Network directly connected to an interface",
      "Local host route for the router's own interface address"
    ],
    answer: [0, 1, 2, 3, 4],
    explanation: "O marks OSPF-learned routes and D marks EIGRP routes (D stands for DUAL, the EIGRP algorithm). S* is a static route flagged with an asterisk as a candidate default route. C entries are subnets directly connected to up/up interfaces, while L entries are /32 local routes representing the router's own configured interface addresses."
  },
  {
    id: "conn-006",
    domain: "IP Connectivity",
    type: "single",
    question: "Refer to the exhibit. Which command produced the gateway of last resort shown in the output?",
    exhibit: "R1# show ip route | include Gateway\nGateway of last resort is 10.1.1.1 to network 0.0.0.0",
    options: [
      "ip default-gateway 10.1.1.1",
      "ip route 0.0.0.0 0.0.0.0 10.1.1.1",
      "ip route 0.0.0.0 255.255.255.255 10.1.1.1",
      "ip default-network 0.0.0.0"
    ],
    answer: [1],
    explanation: "A static default route uses an all-zeros prefix and an all-zeros mask: ip route 0.0.0.0 0.0.0.0 followed by the next hop, which sets the gateway of last resort. The ip default-gateway command is only used by a device that has IP routing disabled, such as a Layer 2 switch. A mask of 255.255.255.255 would define a host route to the single address 0.0.0.0, not a default route."
  },
  {
    id: "conn-007",
    domain: "IP Connectivity",
    type: "single",
    question: "Refer to the exhibit. The router receives a packet destined for 10.1.1.200. How does it forward the packet?",
    exhibit: "R3# show ip route | begin Gateway\nGateway of last resort is 203.0.113.1 to network 0.0.0.0\n\n      10.0.0.0/8 is variably subnetted, 3 subnets, 3 masks\nS        10.0.0.0/8 [1/0] via 192.168.1.1\nO        10.1.0.0/16 [110/30] via 192.168.2.1, 00:31:08, GigabitEthernet0/1\nD        10.1.1.0/25 [90/156160] via 192.168.3.1, 02:11:40, GigabitEthernet0/2\nS*    0.0.0.0/0 [1/0] via 203.0.113.1",
    options: [
      "Via 192.168.3.1, using the EIGRP route",
      "Via 192.168.2.1, using the OSPF route",
      "Via 192.168.1.1, using the static route",
      "Via 203.0.113.1, using the default route"
    ],
    answer: [1],
    explanation: "The EIGRP route 10.1.1.0/25 covers only hosts .0 through .127, so it does not include .200 even though it looks like the obvious match. The longest prefix that actually contains 10.1.1.200 is 10.1.0.0/16 learned through OSPF. The static /8 also matches but is shorter, and the default route is the match of last resort. Always verify the address range of a prefix before assuming it matches."
  },
  {
    id: "conn-008",
    domain: "IP Connectivity",
    type: "single",
    question: "Two different routing protocols on the same router each offer a route to exactly the same prefix and mask. Which value does the router compare to decide which route to install?",
    options: [
      "The metric of each route",
      "The administrative distance of each source",
      "The bandwidth of each outgoing interface",
      "The age of each routing update"
    ],
    answer: [1],
    explanation: "Administrative distance ranks the trustworthiness of routing sources and is the tiebreaker when different protocols offer the identical prefix. Metrics cannot be compared across protocols because OSPF cost, EIGRP composite metric, and RIP hop count are calculated on completely different scales. Interface bandwidth influences some metrics but is not compared directly, and update age is irrelevant to route selection."
  },
  {
    id: "conn-009",
    domain: "IP Connectivity",
    type: "single",
    question: "A router learns two routes to the same prefix and mask from the same OSPF process, each through a different neighbor. Which value determines which route is installed in the routing table?",
    options: [
      "The administrative distance",
      "The router ID of the advertising neighbor",
      "The metric of each route",
      "The interface number of the outgoing interface"
    ],
    answer: [2],
    explanation: "When the routing source is the same, administrative distance is identical, so the protocol metric breaks the tie and the lower metric wins. For OSPF that metric is the cumulative cost of the outgoing interfaces along the path. If the metrics are also equal, OSPF installs both routes and load balances; neighbor router IDs and interface numbers play no role in this decision."
  },
  {
    id: "conn-010",
    domain: "IP Connectivity",
    type: "multi",
    question: "A router runs OSPF and learns two paths to 172.20.0.0/16 with the same cost through two different next hops. Which two statements describe the result? (Choose two.)",
    options: [
      "Both routes are installed in the routing table",
      "Only the route through the neighbor with the higher router ID is installed",
      "Traffic is load balanced across both paths, per destination by default",
      "OSPF suppresses one path until the other fails"
    ],
    answer: [0, 2],
    explanation: "OSPF supports equal-cost multipath and installs up to four equal-cost routes by default, so both entries appear in the routing table. CEF then load shares traffic across the paths, and the default method is per destination (per flow), which preserves packet ordering within a conversation. Neighbor router IDs do not break metric ties for route installation, and OSPF does not hold one equal-cost path in reserve."
  },
  {
    id: "conn-011",
    domain: "IP Connectivity",
    type: "single",
    question: "Refer to the exhibit. What does the value 65 in the routing table entry represent?",
    exhibit: "O     10.40.0.0/16 [110/65] via 10.1.12.2, 00:19:55, Serial0/0/1",
    options: [
      "The administrative distance of the route",
      "The sum of the OSPF costs of the outgoing interfaces along the path to the destination",
      "The number of hops to the destination network",
      "The bandwidth of the destination network in Mbps"
    ],
    answer: [1],
    explanation: "In the [110/65] pair, 110 is the administrative distance of OSPF and 65 is the OSPF metric. OSPF cost is cumulative: it is the sum of the costs of all outgoing interfaces along the path, where each interface cost defaults to reference bandwidth divided by interface bandwidth. A cost of 65 here suggests a serial link (cost 64) plus a Fast Ethernet or Gigabit segment (cost 1). OSPF does not count hops; that is RIP behavior."
  },
  {
    id: "conn-012",
    domain: "IP Connectivity",
    type: "single",
    question: "A router receives a packet whose destination address does not match any entry in the routing table, and no gateway of last resort is set. What does the router do with the packet?",
    options: [
      "It floods the packet out all interfaces except the one it arrived on",
      "It drops the packet and sends an ICMP destination unreachable message to the source",
      "It buffers the packet until a matching route is learned",
      "It forwards the packet to the lowest-numbered active interface"
    ],
    answer: [1],
    explanation: "Routers make explicit forwarding decisions; with no matching route and no default route, the packet is discarded and the router notifies the source with an ICMP destination (network) unreachable message. Flooding out all ports is switch behavior for unknown unicast frames at Layer 2, not router behavior at Layer 3. Routers never queue packets waiting for routes and never pick an arbitrary interface."
  },
  {
    id: "conn-013",
    domain: "IP Connectivity",
    type: "dragdrop",
    question: "Drag each route-selection concept on the left to its description on the right.",
    items: [
      "Longest prefix match",
      "Administrative distance",
      "Metric",
      "Gateway of last resort"
    ],
    targets: [
      "Forwarding rule that prefers the most specific route containing the destination",
      "Value that selects between different routing sources offering the identical prefix",
      "Value that selects the best path among routes from the same routing protocol",
      "Route used only when no other entry matches the destination"
    ],
    answer: [0, 1, 2, 3],
    explanation: "When forwarding a packet, the router first finds the most specific (longest) prefix that contains the destination. Administrative distance and metric are applied earlier, when routes are installed: AD chooses between different sources for the same prefix, and the metric chooses between multiple paths offered by the same protocol. The gateway of last resort is the fallback default route that matches everything not covered by a more specific entry."
  },
  {
    id: "conn-014",
    domain: "IP Connectivity",
    type: "single",
    question: "Refer to the exhibit. Out of which interface does the router forward a packet destined for 10.10.10.130?",
    exhibit: "R4# show ip route | begin Gateway\nGateway of last resort is not set\n\n      10.0.0.0/8 is variably subnetted, 3 subnets, 3 masks\nD        10.10.0.0/16 [90/2816] via 10.1.1.2, 03:40:12, GigabitEthernet0/0\nO        10.10.10.0/24 [110/20] via 10.1.2.2, 00:55:02, GigabitEthernet0/1\nS        10.10.10.128/25 [1/0] via 10.1.3.2 (GigabitEthernet0/2)\n         (next hop resolved via C 10.1.3.0/24, GigabitEthernet0/2)",
    options: [
      "GigabitEthernet0/0",
      "GigabitEthernet0/1",
      "GigabitEthernet0/2",
      "The packet is dropped because the routes overlap"
    ],
    answer: [2],
    explanation: "10.10.10.130 falls in the upper half of the /24, so it is contained in 10.10.10.128/25 (.128 through .255), which at 25 bits is the longest matching prefix and points out GigabitEthernet0/2. The OSPF /24 and EIGRP /16 also contain the address but are less specific. Overlapping prefixes are normal in routing tables; the router resolves them deterministically with longest prefix match rather than dropping traffic."
  },
  {
    id: "conn-015",
    domain: "IP Connectivity",
    type: "multi",
    question: "Which three pieces of information can be read directly from a dynamic route entry in the output of show ip route? (Choose three.)",
    options: [
      "The administrative distance of the routing source",
      "The next-hop address or outgoing interface",
      "The metric calculated by the routing protocol",
      "The MAC address of the next-hop router",
      "The hello timer of the routing protocol"
    ],
    answer: [0, 1, 2],
    explanation: "A dynamic entry such as O 10.0.0.0/24 [110/20] via 10.1.1.1, GigabitEthernet0/0 shows the source code, prefix and mask, administrative distance and metric in brackets, route age, and the next hop and exit interface. Layer 2 details like the next hop MAC address live in the ARP table, not the routing table. Protocol timers are seen with commands such as show ip ospf interface, not in show ip route."
  }
);
(window.QUESTION_BANK = window.QUESTION_BANK || []).push(
  {
    id: "conn-016",
    domain: "IP Connectivity",
    type: "single",
    question: "Refer to the exhibit. A packet arrives destined for 172.16.5.40. Which next hop does the router use?",
    exhibit: "R1# show ip route\nGateway of last resort is not set\n\nS    172.16.0.0/16 [1/0] via 10.1.1.1\nD    172.16.5.0/24 [90/130816] via 10.1.1.2\nO    172.16.5.32/28 [110/30] via 10.1.1.3\nO E2 172.16.5.32/27 [110/20] via 10.1.1.4",
    options: [
      "10.1.1.1",
      "10.1.1.2",
      "10.1.1.3",
      "10.1.1.4"
    ],
    answer: [2],
    explanation: "The router always selects the longest prefix that matches the destination, regardless of administrative distance or metric. 172.16.5.40 falls inside 172.16.5.32/28 (addresses .32 through .47), which is more specific than the /27, /24, and /16 entries that also match. The EIGRP /24 looks attractive because of its low AD of 90, but AD is only used to choose between sources for the exact same prefix, not between different prefix lengths. The /27 entry matches but is one bit less specific than the /28."
  },
  {
    id: "conn-017",
    domain: "IP Connectivity",
    type: "single",
    question: "Refer to the exhibit. How does the router forward a packet destined for 192.0.2.200?",
    exhibit: "R1# show ip route\nGateway of last resort is 203.0.113.1 to network 0.0.0.0\n\nS*   0.0.0.0/0 [1/0] via 203.0.113.1\nO    192.0.2.0/25 [110/20] via 10.2.2.2\nO    192.0.2.128/26 [110/30] via 10.2.2.3",
    options: [
      "It forwards the packet to 10.2.2.2",
      "It forwards the packet to 10.2.2.3",
      "It forwards the packet to 203.0.113.1",
      "It drops the packet because no specific route matches"
    ],
    answer: [2],
    explanation: "192.0.2.0/25 covers hosts .0 through .127 and 192.0.2.128/26 covers .128 through .191, so neither matches host .200. The only remaining match is the default route 0.0.0.0/0, so the packet is sent to the gateway of last resort at 203.0.113.1. The packet is not dropped because a default route exists. 10.2.2.3 is tempting because .200 is in the upper half of the /24, but the /26 ends at .191."
  },
  {
    id: "conn-018",
    domain: "IP Connectivity",
    type: "single",
    question: "Refer to the exhibit. Which next hop is used for a packet destined to 10.50.8.77?",
    exhibit: "R1# show ip route\nD    10.50.0.0/16 [90/2172416] via 10.0.12.2\nO    10.50.8.0/24 [110/45] via 10.0.13.3\nS    10.50.8.77/32 [1/0] via 10.0.14.4",
    options: [
      "10.0.12.2",
      "10.0.13.3",
      "10.0.14.4",
      "The router load-balances across all three next hops"
    ],
    answer: [2],
    explanation: "A /32 host route is the most specific prefix possible, so 10.50.8.77/32 wins the longest-prefix-match comparison over the /24 and /16 routes that also contain the address. Load balancing only occurs between multiple routes to the identical prefix and mask with equal preference, which is not the case here. The OSPF /24 and EIGRP /16 are valid matches but are less specific, so they are not used."
  },
  {
    id: "conn-019",
    domain: "IP Connectivity",
    type: "multi",
    question: "Refer to the exhibit. A network engineer examines this entry in the output of show ip route. Which two conclusions can the engineer draw? (Choose two.)",
    exhibit: "O E2 198.51.100.0/24 [110/20] via 10.0.0.5, 00:12:44, GigabitEthernet0/1",
    options: [
      "The route was redistributed into OSPF from another routing source",
      "The administrative distance of the route is 110",
      "The router that performed the redistribution is 10.0.0.5",
      "The metric of 20 includes the internal cost to reach the ASBR"
    ],
    answer: [0, 1],
    explanation: "The O E2 code identifies an OSPF external type 2 route, which means an ASBR redistributed it into OSPF from another source; external OSPF routes keep the standard OSPF administrative distance of 110 on Cisco routers. The address 10.0.0.5 is simply the next hop on the local segment, not necessarily the ASBR itself. By default an E2 metric stays fixed at the value set during redistribution and does not accumulate the internal cost to the ASBR, which is the behavior of E1 routes."
  },
  {
    id: "conn-020",
    domain: "IP Connectivity",
    type: "dragdrop",
    question: "Refer to the exhibit. Drag the next-hop address on the left to the destination packet on the right that the router forwards to it.",
    exhibit: "R1# show ip route\nGateway of last resort is 10.255.0.4 to network 0.0.0.0\n\nO    10.8.0.0/13 [110/50] via 10.255.0.1\nO    10.10.0.0/16 [110/40] via 10.255.0.2\nO    10.10.64.0/18 [110/30] via 10.255.0.3\nS*   0.0.0.0/0 [1/0] via 10.255.0.4",
    items: [
      "10.255.0.1",
      "10.255.0.2",
      "10.255.0.3",
      "10.255.0.4"
    ],
    targets: [
      "Packet destined to 10.10.100.5",
      "Packet destined to 10.10.10.9",
      "Packet destined to 10.12.1.1",
      "Packet destined to 172.16.1.1"
    ],
    answer: [2, 1, 0, 3],
    explanation: "Longest prefix match decides each lookup. 10.10.100.5 falls inside 10.10.64.0/18 (third octet 64-127), so it goes to 10.255.0.3. 10.10.10.9 misses the /18 (third octet below 64) but matches 10.10.0.0/16 via 10.255.0.2. 10.12.1.1 matches only 10.8.0.0/13 (10.8.0.0 through 10.15.255.255) via 10.255.0.1, and 172.16.1.1 matches nothing specific, so it uses the default route to 10.255.0.4."
  },
  {
    id: "conn-021",
    domain: "IP Connectivity",
    type: "single",
    question: "A router learns the prefix 192.168.10.0/24 from external BGP, internal EIGRP, and OSPF at the same time. Which route is installed in the routing table?",
    options: [
      "The eBGP route",
      "The EIGRP route",
      "The OSPF route",
      "The route with the lowest metric value"
    ],
    answer: [0],
    explanation: "When several sources offer the exact same prefix and mask, the router compares administrative distance: eBGP is 20, internal EIGRP is 90, and OSPF is 110, so the eBGP route wins. Metrics cannot be compared across different protocols because each protocol calculates them differently, so the lowest metric option is invalid. EIGRP is a common trap here because 90 is low, but eBGP is even lower at 20."
  },
  {
    id: "conn-022",
    domain: "IP Connectivity",
    type: "single",
    question: "A router runs EIGRP and also has the command ip route 10.7.0.0 255.255.0.0 172.16.1.9 95 configured for a prefix EIGRP already advertises. Which statement is true?",
    options: [
      "The static route is used because static routes always beat dynamic routes",
      "The EIGRP route is used, and the static route installs only if the EIGRP route is lost",
      "Both routes are installed and the router load-balances between them",
      "The static route is rejected because its administrative distance is invalid"
    ],
    answer: [1],
    explanation: "The trailing 95 raises the static route's administrative distance above internal EIGRP's 90, making it a floating static route. The router installs only the EIGRP route while it is available, and the floating static takes over as a backup if the EIGRP route disappears. Static routes win only at their default AD of 1; once the AD is manually raised above the dynamic protocol, the dynamic route is preferred. Load balancing never occurs between routes with different administrative distances."
  },
  {
    id: "conn-023",
    domain: "IP Connectivity",
    type: "single",
    question: "An administrator configures ip route 0.0.0.0 0.0.0.0 198.51.100.1 200 on a router that already learns a default route through OSPF. Which default route does the router use to forward traffic?",
    options: [
      "The static route, because static routes are always preferred",
      "The OSPF route, because its administrative distance of 110 is lower than 200",
      "Both routes, with traffic shared equally between them",
      "Neither route, because two default routes create a conflict"
    ],
    answer: [1],
    explanation: "The static default route was configured with an administrative distance of 200, which is higher than OSPF's 110, so the OSPF-learned default route remains in the routing table. The floating static becomes active only if the OSPF default disappears, making it a backup path. Static routes are preferred only at their default AD of 1, so the first option is wrong, and routers happily handle multiple candidate defaults by installing the best one rather than treating it as a conflict."
  },
  {
    id: "conn-024",
    domain: "IP Connectivity",
    type: "single",
    question: "A router has a static route to 10.0.0.0/8 via 192.168.1.2 and an OSPF-learned route to 10.1.1.0/24 via 192.168.2.2. To which next hop does the router send a packet destined for 10.1.1.99?",
    options: [
      "192.168.1.2, because the static route has a lower administrative distance",
      "192.168.2.2, because the /24 prefix is more specific than the /8",
      "192.168.1.2, because static routes always override OSPF",
      "The router alternates between both next hops"
    ],
    answer: [1],
    explanation: "Prefix length is evaluated before administrative distance: 10.1.1.0/24 matches 24 bits of the destination while 10.0.0.0/8 matches only 8, so the OSPF route via 192.168.2.2 is used. Administrative distance only breaks ties between identical prefixes from different sources, so the static route's AD of 1 is irrelevant here. No load sharing occurs because the two routes are for different prefixes."
  },
  {
    id: "conn-025",
    domain: "IP Connectivity",
    type: "multi",
    question: "Which two statements about administrative distance are true? (Choose two.)",
    options: [
      "It is compared only between routes to the exact same prefix and mask",
      "A directly connected interface has an administrative distance of 0",
      "It is carried inside routing protocol updates between routers",
      "A route with a lower metric always overrides a route with a lower administrative distance"
    ],
    answer: [0, 1],
    explanation: "Administrative distance rates the trustworthiness of a route source and is only consulted when two sources offer the identical prefix and mask; connected interfaces have the most trusted value of 0. AD is locally significant and configured per router, so it is never advertised inside protocol updates. Metric comparisons happen only within a single protocol after the AD decision, so a low metric from a less trusted source cannot override a more trusted source."
  },
  {
    id: "conn-026",
    domain: "IP Connectivity",
    type: "single",
    question: "Refer to the exhibit. How does the router forward a packet destined for 192.168.50.10?",
    exhibit: "R1# show ip route\nC    10.0.0.0/24 is directly connected, Serial0/0\nL    10.0.0.1/32 is directly connected, Serial0/0\nS    192.168.50.0/24 [1/0] via 10.0.0.2",
    options: [
      "It drops the packet because 10.0.0.2 is not a directly connected interface address",
      "It performs a second lookup to resolve 10.0.0.2 and forwards the packet out Serial0/0",
      "It floods the packet out all interfaces to locate 10.0.0.2",
      "It sends the packet to its gateway of last resort"
    ],
    answer: [1],
    explanation: "A static route configured with only a next-hop IP address triggers a recursive lookup: the router searches the table again for the next hop 10.0.0.2, finds it inside the connected network 10.0.0.0/24, and forwards the packet out Serial0/0. The next hop does not need to be the router's own address, only reachable through another route, so the packet is not dropped. Routers never flood IP packets to discover next hops, and the default route is unnecessary because a specific match exists."
  },
  {
    id: "conn-027",
    domain: "IP Connectivity",
    type: "single",
    question: "Refer to the exhibit. What does this routing table entry indicate?",
    exhibit: "O*E2 0.0.0.0/0 [110/1] via 10.0.0.9, 00:31:07, GigabitEthernet0/0",
    options: [
      "A default route configured locally with the ip route command",
      "A candidate default route learned through OSPF as an external route",
      "An OSPF inter-area summary route to network 0.0.0.0",
      "A default route learned through DHCP on GigabitEthernet0/0"
    ],
    answer: [1],
    explanation: "The O code shows the route was learned through OSPF, the asterisk marks it as a candidate default, and E2 identifies it as an external type 2 route, typically injected by another router using default-information originate. A locally configured static default would appear as S* with an administrative distance of 1, and a DHCP-learned default appears as S* with AD 254. An inter-area route would carry the O IA code rather than O E2."
  },
  {
    id: "conn-028",
    domain: "IP Connectivity",
    type: "multi",
    question: "Refer to the exhibit. To which two destination addresses does the router forward traffic using next hop 10.1.1.1? (Choose two.)",
    exhibit: "R1# show ip route\nO    172.20.0.0/22 [110/30] via 10.1.1.1\nO    172.20.4.0/24 [110/45] via 10.1.1.2\nS    172.20.0.0/16 [1/0] via 10.1.1.3",
    options: [
      "172.20.1.77",
      "172.20.4.9",
      "172.20.3.250",
      "172.20.9.1"
    ],
    answer: [0, 2],
    explanation: "172.20.0.0/22 spans 172.20.0.0 through 172.20.3.255, so both 172.20.1.77 and 172.20.3.250 select it as their longest match and use next hop 10.1.1.1. 172.20.4.9 is outside the /22 but inside 172.20.4.0/24, so it goes to 10.1.1.2. 172.20.9.1 matches only the /16 static route and is forwarded to 10.1.1.3 even though that route has the lowest administrative distance, since AD never overrides prefix length."
  },
  {
    id: "conn-029",
    domain: "IP Connectivity",
    type: "single",
    question: "Refer to the exhibit. What does the first line of the output indicate?",
    exhibit: "     172.16.0.0/16 is variably subnetted, 4 subnets, 3 masks\nC       172.16.1.0/24 is directly connected, GigabitEthernet0/0\nL       172.16.1.1/32 is directly connected, GigabitEthernet0/0\nO       172.16.2.0/25 [110/20] via 172.16.1.2\nO       172.16.2.128/26 [110/30] via 172.16.1.2",
    options: [
      "The router is performing automatic summarization of the 172.16.0.0 network",
      "It is a heading showing the classful network contains 4 child routes using 3 different masks",
      "A route to 172.16.0.0/16 is installed and usable for forwarding",
      "The 172.16.0.0 network is unreachable until all masks are equal"
    ],
    answer: [1],
    explanation: "The line is a parent heading that IOS prints above child routes belonging to the same classful network when variable-length subnet masks are in use; it summarizes that 4 subnets with 3 different masks exist below it. The parent line itself is not a forwarding entry, so packets are never matched directly against it. It says nothing about automatic summarization, and VLSM is fully supported, so reachability is not affected by the differing masks."
  },
  {
    id: "conn-030",
    domain: "IP Connectivity",
    type: "single",
    question: "What is the difference between a route marked C and a route marked L in an IPv4 routing table?",
    options: [
      "C is the subnet of a connected interface, while L is a /32 host route for the interface's own address",
      "C is a static route and L is a dynamically learned local route",
      "C routes are used for forwarding while L routes are only used by routing protocols",
      "L routes appear only when the interface is configured as a loopback"
    ],
    answer: [0],
    explanation: "When an interface is assigned an IP address, IOS installs a connected route (C) for the whole subnet and a local route (L) that is a /32 entry for the exact address configured on the interface. The local route lets the router efficiently recognize packets addressed to itself. Neither entry is static or protocol-learned, and L routes appear for every interface with an address, not just loopbacks."
  }
);

(window.QUESTION_BANK = window.QUESTION_BANK || []).push(
  {
    id: "conn-031",
    domain: "IP Connectivity",
    type: "single",
    question: "Refer to the exhibit. The OSPF adjacency between R1 and R2 never reaches FULL. What is the most likely cause?",
    exhibit: "R1# show ip ospf neighbor\nNeighbor ID     Pri   State           Dead Time   Address         Interface\n10.2.2.2          1   EXSTART/BDR     00:00:35    192.168.12.2    GigabitEthernet0/0\n\nR1# show interfaces Gi0/0 | include MTU\n  MTU 1500 bytes, BW 1000000 Kbit/sec\n\nR2# show interfaces Gi0/1 | include MTU\n  MTU 1600 bytes, BW 1000000 Kbit/sec",
    options: [
      "The interface MTU values do not match, so database description packets are rejected",
      "The hello and dead timers are mismatched between the two routers",
      "The two interfaces are configured in different OSPF areas",
      "OSPF authentication is failing between the neighbors"
    ],
    answer: [0],
    explanation: "An adjacency stuck in EXSTART or EXCHANGE is the classic symptom of an MTU mismatch: the routers begin master/slave negotiation but the database description packets carry the interface MTU, and the router with the smaller MTU rejects DBDs from the larger one. Mismatched timers, area numbers, or authentication would prevent the neighbor from ever appearing in the table at all, so the routers would not reach EXSTART in the first place."
  },
  {
    id: "conn-032",
    domain: "IP Connectivity",
    type: "single",
    question: "Refer to the exhibit. R1 and R2 are directly connected, but neither router lists the other in show ip ospf neighbor. What must be changed to form the adjacency?",
    exhibit: "R1# show ip ospf interface Gi0/0 | include Timer\n  Timer intervals configured, Hello 10, Dead 40, Wait 40, Retransmit 5\n\nR2# show ip ospf interface Gi0/1 | include Timer\n  Timer intervals configured, Hello 30, Dead 120, Wait 120, Retransmit 5",
    options: [
      "Configure matching hello and dead intervals on both interfaces",
      "Configure the same OSPF process ID on both routers",
      "Increase the MTU on R2 to match R1",
      "Configure identical router IDs on both routers"
    ],
    answer: [0],
    explanation: "OSPF hellos carry the hello and dead intervals, and a receiving router discards hellos whose timers do not match its own interface values, so the neighbor never appears. The process ID is locally significant and never has to match. An MTU mismatch would allow the neighbor to appear but stall in EXSTART, and router IDs must actually be unique, not identical."
  },
  {
    id: "conn-033",
    domain: "IP Connectivity",
    type: "multi",
    question: "Which three parameters must match between two routers on a broadcast network for an OSPF adjacency to form? (Choose three.)",
    options: [
      "Area ID",
      "Hello and dead intervals",
      "Subnet and subnet mask",
      "OSPF process ID",
      "Interface priority"
    ],
    answer: [0, 1, 2],
    explanation: "On a multiaccess segment, the hello packet checks require the area ID, the hello and dead timers, and the IP subnet including the mask to match, along with authentication and stub flags. The process ID is only locally significant, so it can differ freely between routers. Interface priority does not need to match; it merely influences which router becomes DR."
  },
  {
    id: "conn-034",
    domain: "IP Connectivity",
    type: "single",
    question: "Refer to the exhibit. OSPF adjacencies in the network keep flapping and routes appear and disappear. What is the cause?",
    exhibit: "R3#\n%OSPF-4-DUP_RTRID_NBR: OSPF detected duplicate router-id 10.0.0.1 from 192.168.34.4 on interface GigabitEthernet0/2\n%OSPF-4-DUP_RTRID_NBR: OSPF detected duplicate router-id 10.0.0.1 from 192.168.34.4 on interface GigabitEthernet0/2",
    options: [
      "Two routers in the area are using the same OSPF router ID",
      "Two interfaces on R3 are assigned the same IP address",
      "The neighbor at 192.168.34.4 has an MTU mismatch with R3",
      "R3 has two network statements that overlap the same interface"
    ],
    answer: [0],
    explanation: "The DUP_RTRID_NBR message indicates that another router is advertising the same router ID 10.0.0.1 that a router in the area already uses, which corrupts the link-state database and causes constant LSA churn and flapping adjacencies. The fix is to assign a unique router ID and restart the OSPF process. Duplicate interface addresses or overlapping network statements produce different errors, and an MTU mismatch stalls adjacencies in EXSTART rather than flapping them."
  },
  {
    id: "conn-035",
    domain: "IP Connectivity",
    type: "single",
    question: "Refer to the exhibit. Which router ID does the OSPF process use after the router reloads?",
    exhibit: "router ospf 1\n router-id 1.1.1.1\n!\ninterface Loopback0\n ip address 10.255.255.254 255.255.255.255\n!\ninterface Loopback1\n ip address 172.16.255.1 255.255.255.255\n!\ninterface GigabitEthernet0/0\n ip address 192.168.100.1 255.255.255.0",
    options: [
      "1.1.1.1",
      "10.255.255.254",
      "172.16.255.1",
      "192.168.100.1"
    ],
    answer: [0],
    explanation: "An explicitly configured router-id command always takes precedence over any interface address, so OSPF uses 1.1.1.1. Only if no router-id is configured does the process fall back to the highest IP address on an up loopback interface (which would be 172.16.255.1, not 10.255.255.254, because 172 is numerically higher), and only without loopbacks would it use the highest active physical interface address."
  },
  {
    id: "conn-036",
    domain: "IP Connectivity",
    type: "single",
    question: "Refer to the exhibit. All four routers on the same Ethernet segment are powered on at the same time with OSPF enabled. Which router becomes the DR?",
    exhibit: "R1: router ID 10.0.0.1, ip ospf priority 1\nR2: router ID 10.0.0.4, ip ospf priority 1\nR3: router ID 10.0.0.3, ip ospf priority 2\nR4: router ID 10.0.0.2, ip ospf priority 0",
    options: [
      "R3",
      "R2",
      "R1",
      "R4"
    ],
    answer: [0],
    explanation: "The DR election is won by the router with the highest interface priority, and R3's priority of 2 beats the default of 1 on R1 and R2, so R3 becomes DR regardless of router ID. The router ID is only the tiebreaker when priorities are equal, which would have favored R2. R4 has priority 0 and is therefore excluded from the election entirely."
  },
  {
    id: "conn-037",
    domain: "IP Connectivity",
    type: "single",
    question: "An engineer configures ip ospf priority 0 on a router's interface that connects to a multiaccess segment. What is the effect?",
    options: [
      "The router can never become the DR or BDR on that segment",
      "The router always wins the DR election on that segment",
      "OSPF is disabled on the interface and no hellos are sent",
      "The interface cost is set to its minimum value"
    ],
    answer: [0],
    explanation: "A priority of 0 removes the router from DR and BDR elections on that segment, so it remains a DROTHER permanently while still forming adjacencies and exchanging routes. It does not disable OSPF or stop hello packets, which is what passive-interface does. Priority is unrelated to interface cost, which is derived from bandwidth or set with ip ospf cost."
  },
  {
    id: "conn-038",
    domain: "IP Connectivity",
    type: "multi",
    question: "Which two statements about OSPF DR and BDR behavior on an Ethernet segment are true? (Choose two.)",
    options: [
      "A new router with a higher priority does not take over the DR role from the existing DR",
      "When the DR fails, the BDR becomes the DR and a new BDR is elected",
      "The DR election restarts whenever any new router joins the segment",
      "A router with priority 255 is excluded from the election"
    ],
    answer: [0, 1],
    explanation: "The DR election is not preemptive: once a DR is established, a newly arriving router with a better priority or router ID waits and does not displace it. If the DR fails, the BDR is promoted to DR and the remaining routers elect a new BDR. New routers joining do not trigger a re-election, and priority 0, not 255, is the value that excludes a router; 255 is actually the strongest possible priority."
  },
  {
    id: "conn-039",
    domain: "IP Connectivity",
    type: "single",
    question: "An administrator configures passive-interface GigabitEthernet0/1 under the OSPF process. What is the result on that interface?",
    options: [
      "OSPF stops sending hellos on the interface, but its subnet is still advertised to other neighbors",
      "The interface subnet is removed from all OSPF advertisements",
      "OSPF continues forming adjacencies but stops advertising the subnet",
      "The interface is administratively shut down by the routing process"
    ],
    answer: [0],
    explanation: "A passive interface suppresses the sending of hello packets, so no adjacency can form out of that interface, but the connected subnet remains in the OSPF database and is still advertised to neighbors reached through other interfaces. This is typically used on LAN segments with only end hosts. It does not withdraw the prefix, keep adjacencies alive, or change the administrative state of the interface."
  },
  {
    id: "conn-040",
    domain: "IP Connectivity",
    type: "single",
    question: "Refer to the exhibit. R1 should form an OSPF adjacency with a router attached to Gi0/1, but the neighbor table is empty. Based on the output, what is the problem?",
    exhibit: "R1# show ip protocols | section ospf\nRouting Protocol is \"ospf 1\"\n  Router ID 10.1.1.1\n  Number of areas in this router is 1. 1 normal 0 stub 0 nssa\n  Routing for Networks:\n    10.10.0.0 0.0.255.255 area 0\n  Passive Interface(s):\n    GigabitEthernet0/1\n  Routing Information Sources:\n    Gateway         Distance      Last Update\n  Distance: (default is 110)",
    options: [
      "Gi0/1 is configured as a passive interface, so R1 sends no hellos on it",
      "The network statement does not include the Gi0/1 subnet",
      "The administrative distance of 110 prevents the adjacency",
      "The router ID 10.1.1.1 conflicts with the neighbor"
    ],
    answer: [0],
    explanation: "The show ip protocols output lists GigabitEthernet0/1 under Passive Interface(s), which means OSPF never transmits hello packets on it and therefore can never discover a neighbor there. The network 10.10.0.0 0.0.255.255 statement is present, so interface enablement is not the issue shown. Administrative distance affects route preference, not adjacency formation, and nothing in the output indicates a duplicate router ID."
  },
  {
    id: "conn-041",
    domain: "IP Connectivity",
    type: "single",
    question: "A router connects the OSPF domain to an ISP using a static default route. The engineer configures default-information originate under the OSPF process, but internal routers never receive a default route. What should be verified first?",
    options: [
      "That the static default route is present in the routing table, or add the always keyword",
      "That all internal routers are configured with default-information originate as well",
      "That the OSPF process ID matches on every router in the area",
      "That the edge router's router ID is the highest in the area"
    ],
    answer: [0],
    explanation: "Without the always keyword, default-information originate advertises a default route only while the originating router itself has a default route in its routing table, so a missing or failed static default stops the advertisement. Adding always forces the advertisement unconditionally. The command is needed only on the edge router, process IDs never need to match, and the router ID has no bearing on default route origination."
  },
  {
    id: "conn-042",
    domain: "IP Connectivity",
    type: "single",
    question: "A router has both Gigabit Ethernet and Ten Gigabit Ethernet uplinks running OSPF with default settings, and both interfaces show an OSPF cost of 1. Which command makes OSPF distinguish between the two link speeds?",
    options: [
      "auto-cost reference-bandwidth 10000 under the OSPF process on all routers",
      "ip ospf priority 10 on the Ten Gigabit interface",
      "bandwidth 10000000 on the Gigabit interface",
      "ip ospf network point-to-point on both interfaces"
    ],
    answer: [0],
    explanation: "With the default reference bandwidth of 100 Mbps, every interface of 100 Mbps or faster computes a cost of 1, so Gigabit and Ten Gigabit links look identical to SPF. Raising the reference bandwidth to 10000 (10 Gbps) on every router in the domain yields cost 10 for Gigabit and cost 1 for Ten Gigabit. Priority only affects DR elections, increasing the bandwidth value on the slower link would make the problem worse, and the network type does not change cost."
  },
  {
    id: "conn-043",
    domain: "IP Connectivity",
    type: "single",
    question: "Refer to the exhibit. What does the state in this output indicate about R5 on the segment?",
    exhibit: "R5# show ip ospf interface GigabitEthernet0/0\nGigabitEthernet0/0 is up, line protocol is up\n  Internet Address 10.20.30.5/24, Area 0, Attached via Network Statement\n  Process ID 1, Router ID 10.5.5.5, Network Type BROADCAST, Cost: 10\n  Transmit Delay is 1 sec, State DROTHER, Priority 1\n  Designated Router (ID) 10.9.9.9, Interface address 10.20.30.9\n  Backup Designated router (ID) 10.7.7.7, Interface address 10.20.30.7",
    options: [
      "R5 is neither the DR nor the BDR and forms full adjacencies only with the DR and BDR",
      "R5 failed to form any OSPF adjacency on the segment",
      "R5 is the backup designated router for the segment",
      "R5 cannot participate in OSPF because its priority is too low"
    ],
    answer: [0],
    explanation: "State DROTHER means the router lost the DR and BDR elections on this broadcast segment; it still participates fully in OSPF but builds FULL adjacencies only with the DR and BDR, remaining in 2WAY state with other DROTHERs. The output explicitly shows other routers holding the DR and BDR roles. Priority 1 is the default and allows participation in future elections, and DROTHER is a normal state, not a failure."
  },
  {
    id: "conn-044",
    domain: "IP Connectivity",
    type: "single",
    question: "Two routers are connected over the same Ethernet segment. One interface is configured with ip ospf network broadcast and the other with ip ospf network non-broadcast, and no other OSPF changes were made. Why does the adjacency fail to form?",
    options: [
      "The default hello and dead intervals differ between the two network types, so hellos are rejected",
      "Non-broadcast interfaces cannot run OSPF on Ethernet media",
      "The broadcast side automatically sets its priority to 0",
      "The non-broadcast side uses a different OSPF protocol number"
    ],
    answer: [0],
    explanation: "The broadcast network type uses 10-second hellos with a 40-second dead time, while non-broadcast defaults to 30 and 120 seconds; because timers are carried in hello packets and must match, each side discards the other's hellos and no neighbor relationship forms. Ethernet can run the non-broadcast type if neighbors are statically defined and timers align. Network type does not alter priority or the IP protocol number 89."
  },
  {
    id: "conn-045",
    domain: "IP Connectivity",
    type: "dragdrop",
    question: "Drag each OSPF neighbor state on the left to the description on the right.",
    items: [
      "Down",
      "Init",
      "2-Way",
      "ExStart",
      "Full"
    ],
    targets: [
      "The router sees its own router ID listed in the neighbor's hello packet",
      "Master and slave roles are negotiated before database exchange",
      "No hello has been received from the neighbor",
      "Link-state databases are fully synchronized between the neighbors",
      "A hello was received from the neighbor, but it does not yet list this router's ID"
    ],
    answer: [2, 3, 0, 4, 1],
    explanation: "Down means no hellos have arrived, and Init means a hello arrived that does not yet contain the local router ID. 2-Way confirms bidirectional communication because the router sees itself in the neighbor's hello, and on multiaccess networks DROTHER pairs stop here. ExStart negotiates the master and slave roles for database description exchange, and Full indicates complete LSDB synchronization."
  }
);

(window.QUESTION_BANK = window.QUESTION_BANK || []).push(
  {
    id: "conn-046",
    domain: "IP Connectivity",
    type: "single",
    question: "Refer to the exhibit. R1 and R2 share the 10.12.0.0/30 link but never become OSPF neighbors. What is the cause?",
    exhibit: "R1# show ip ospf interface brief\nInterface    PID   Area            IP Address/Mask    Cost  State Nbrs F/C\nGi0/0        1     0               10.12.0.1/30       1     DR    0/0\n\nR2# show ip ospf interface brief\nInterface    PID   Area            IP Address/Mask    Cost  State Nbrs F/C\nGi0/1        1     1               10.12.0.2/30       1     DR    0/0",
    options: [
      "The two interfaces are assigned to different OSPF areas",
      "Both routers have elected themselves DR, which is not allowed",
      "The OSPF cost of 1 is too low for the adjacency to form",
      "The /30 mask does not leave enough addresses for OSPF"
    ],
    answer: [0],
    explanation: "The hello packet carries the area ID, and R1 advertises area 0 while R2 advertises area 1 on the shared link, so each router discards the other's hellos and no neighbor relationship can begin. Both routers showing DR is simply the result of each electing itself in the absence of any neighbor, a symptom rather than the cause. Cost never influences adjacency formation, and a /30 provides exactly the two host addresses needed."
  },
  {
    id: "conn-047",
    domain: "IP Connectivity",
    type: "single",
    question: "Two routers connect over an Ethernet link. R1 is addressed 192.168.1.1/24 and R2 is addressed 192.168.1.2/25, and both run OSPF area 0 on the link with default timers. What happens to the adjacency?",
    options: [
      "No adjacency forms because the subnet masks in the hellos do not match",
      "The adjacency forms but flaps every dead interval",
      "The adjacency reaches FULL because both addresses are in the same subnet",
      "The adjacency stops at EXSTART because of the mask difference"
    ],
    answer: [0],
    explanation: "On broadcast and non-broadcast network types, OSPF hellos include the network mask, and a receiving router rejects hellos whose mask differs from its own interface mask, so the neighbor never even appears in the table. The addresses overlapping numerically does not help because the mask check fails first. EXSTART problems are characteristic of MTU mismatches, not mask mismatches, and there is no adjacency to flap."
  },
  {
    id: "conn-048",
    domain: "IP Connectivity",
    type: "multi",
    question: "An OSPF neighbor remains stuck in the INIT state. Which two issues can cause this condition? (Choose two.)",
    options: [
      "An inbound ACL on the neighbor is blocking OSPF hello packets",
      "The neighbor receives this router's hellos, but its own hellos are not arriving back with the local router ID listed",
      "The interface MTU values are mismatched",
      "The OSPF process IDs are different on the two routers"
    ],
    answer: [0, 1],
    explanation: "INIT means the local router receives hellos that do not list its own router ID, which indicates the neighbor is not seeing the local router's hellos; common causes are an ACL filtering hellos toward the neighbor or any other unidirectional communication problem. An MTU mismatch lets the relationship progress to EXSTART before stalling, so it produces a different symptom. The process ID is locally significant and never affects adjacency formation."
  },
  {
    id: "conn-049",
    domain: "IP Connectivity",
    type: "single",
    question: "Refer to the exhibit. A junior engineer is worried that the neighbor 10.4.4.4 never reaches FULL state. What should the senior engineer explain?",
    exhibit: "R2# show ip ospf neighbor\nNeighbor ID     Pri   State           Dead Time   Address         Interface\n10.1.1.1          1   FULL/DR         00:00:31    10.0.5.1        GigabitEthernet0/0\n10.3.3.3          1   FULL/BDR        00:00:34    10.0.5.3        GigabitEthernet0/0\n10.4.4.4          1   2WAY/DROTHER    00:00:38    10.0.5.4        GigabitEthernet0/0",
    options: [
      "2WAY/DROTHER is normal between two non-DR routers on a broadcast segment",
      "The MTU between R2 and 10.4.4.4 must be corrected",
      "The dead timer for 10.4.4.4 is about to expire and drop the adjacency",
      "Router 10.4.4.4 has authentication configured incorrectly"
    ],
    answer: [0],
    explanation: "On a multiaccess network, routers that are neither DR nor BDR form FULL adjacencies only with the DR and BDR and intentionally remain in 2WAY state with each other, so this output shows healthy operation. The dead time counting down and resetting with each hello is normal behavior, not an impending failure. MTU or authentication problems would prevent the neighbor from appearing or stall it in EXSTART, not hold it at a stable 2WAY."
  },
  {
    id: "conn-050",
    domain: "IP Connectivity",
    type: "single",
    question: "Refer to the exhibit. R1 stops forming an adjacency with R2 immediately after R2 is reconfigured. What is the problem?",
    exhibit: "R1# show run interface Gi0/0 | include ospf\n ip ospf authentication message-digest\n ip ospf message-digest-key 1 md5 SECRET99\n\nR2# show run interface Gi0/1 | include ospf\n ip ospf authentication\n ip ospf authentication-key SECRET99",
    options: [
      "R1 uses MD5 authentication while R2 uses plain-text authentication",
      "The authentication keys do not match between the routers",
      "R2 is missing a message-digest-key key number",
      "Authentication cannot be configured at the interface level"
    ],
    answer: [0],
    explanation: "R1 is configured for message-digest (MD5) authentication, but R2 enables simple plain-text authentication, and the authentication type itself must match before keys are even compared, so the hellos are rejected. The key strings happen to be identical, which makes a key mismatch a tempting but wrong answer. Interface-level authentication configuration is fully supported, and R2 does not need a message-digest key while it is set to plain text; it needs its type changed."
  },
  {
    id: "conn-051",
    domain: "IP Connectivity",
    type: "single",
    question: "An interface is configured with the address 10.64.17.1 255.255.255.252. Which network command enables OSPF area 0 on exactly that interface and no others?",
    options: [
      "network 10.64.17.0 0.0.0.3 area 0",
      "network 10.64.17.0 255.255.255.252 area 0",
      "network 10.64.17.1 0.0.0.3 area 0",
      "network 10.0.0.0 0.255.255.255 area 0"
    ],
    answer: [0],
    explanation: "The OSPF network statement uses a wildcard mask, which is the inverse of the subnet mask, so a /30 subnet requires 0.0.0.3 with the subnet address 10.64.17.0. Using the subnet mask format 255.255.255.252 is invalid syntax for this command. The form with 10.64.17.1 and 0.0.0.3 would actually still match because IOS applies the wildcard to the address, but the conventional precise statement uses the network address; more importantly, network 10.0.0.0 0.255.255.255 would enable OSPF on every 10.x interface, not just this one."
  },
  {
    id: "conn-052",
    domain: "IP Connectivity",
    type: "single",
    question: "An engineer wants to enable OSPF process 10 in area 0 directly on interface GigabitEthernet0/2 without using a network statement. Which configuration accomplishes this?",
    options: [
      "interface Gi0/2 followed by ip ospf 10 area 0",
      "interface Gi0/2 followed by router ospf 10 area 0",
      "router ospf 10 followed by interface Gi0/2 area 0",
      "interface Gi0/2 followed by ospf enable area 0"
    ],
    answer: [0],
    explanation: "Modern IOS supports enabling OSPF per interface with the command ip ospf process-id area area-id entered in interface configuration mode, which avoids wildcard-mask network statements entirely. The router ospf command is a global command that enters the routing process and cannot be typed under an interface. The other two command forms do not exist in IOS syntax."
  },
  {
    id: "conn-053",
    domain: "IP Connectivity",
    type: "multi",
    question: "Which two statements about OSPF router ID selection on a Cisco router are true? (Choose two.)",
    options: [
      "A router-id configured under the OSPF process overrides any interface-based selection",
      "If no router ID is configured, the highest IP address among up loopback interfaces is chosen before any physical interface",
      "The router ID changes automatically as soon as a higher loopback address is added",
      "The router ID must be an address that is reachable in the routing table"
    ],
    answer: [0, 1],
    explanation: "The selection order is: explicitly configured router-id first, then the highest IP address on an up loopback, then the highest address on an up physical interface. Once the process has chosen a router ID it keeps it until the process is restarted or cleared, so adding a new higher loopback later has no immediate effect. The router ID is just a 32-bit identifier and does not need to be a reachable or even assigned IP address."
  },
  {
    id: "conn-054",
    domain: "IP Connectivity",
    type: "dragdrop",
    question: "Drag each OSPF configuration command on the left to the function it performs on the right.",
    items: [
      "router-id 2.2.2.2",
      "passive-interface Gi0/3",
      "default-information originate",
      "auto-cost reference-bandwidth 100000",
      "ip ospf priority 0"
    ],
    targets: [
      "Advertises an existing default route into the OSPF domain",
      "Prevents the router from ever becoming DR or BDR on a segment",
      "Statically defines the 32-bit identifier used by the OSPF process",
      "Changes the bandwidth value used to calculate interface cost",
      "Stops hello packets on an interface while still advertising its subnet"
    ],
    answer: [2, 4, 0, 3, 1],
    explanation: "The router-id command fixes the process identifier, while passive-interface suppresses hellos on a segment but keeps advertising its prefix. default-information originate injects a default route into OSPF when the router already has one, auto-cost reference-bandwidth adjusts the numerator of the cost formula so fast links are differentiated, and ip ospf priority 0 makes the interface ineligible for DR or BDR election."
  },
  {
    id: "conn-055",
    domain: "IP Connectivity",
    type: "single",
    question: "Refer to the exhibit. Which conclusion can be drawn from this output?",
    exhibit: "R7# show ip protocols\n*** IP Routing is NSF aware ***\nRouting Protocol is \"ospf 100\"\n  Outgoing update filter list for all interfaces is not set\n  Incoming update filter list for all interfaces is not set\n  Router ID 172.16.7.7\n  Number of areas in this router is 2. 2 normal 0 stub 0 nssa\n  Maximum path: 4\n  Routing for Networks:\n    172.16.0.0 0.0.255.255 area 0\n    10.7.0.0 0.0.0.255 area 7\n  Routing Information Sources:\n    Gateway         Distance      Last Update\n    172.16.1.1           110      00:02:11\n  Distance: (default is 110)",
    options: [
      "R7 can install up to four equal-cost OSPF paths to the same destination",
      "R7 is configured as a stub router in area 7",
      "R7 filters incoming OSPF updates from 172.16.1.1",
      "R7 load balances across unequal-cost paths by default"
    ],
    answer: [0],
    explanation: "Maximum path: 4 indicates that up to four equal-cost routes for the same prefix can be installed in the routing table for load sharing. The area summary explicitly shows two normal areas and zero stub areas, so R7 is not in a stub area. Both update filter lists are shown as not set, and OSPF on IOS supports only equal-cost load balancing, never unequal-cost, which is an EIGRP capability."
  },
  {
    id: "conn-056",
    domain: "IP Connectivity",
    type: "single",
    question: "How does OSPF compute the metric for a route to a remote network?",
    options: [
      "It sums the costs of the outgoing interfaces along the path toward the destination",
      "It counts the number of routers between the source and the destination",
      "It uses the lowest bandwidth and the cumulative delay along the path",
      "It sums the costs of the incoming interfaces along the path from the destination"
    ],
    answer: [0],
    explanation: "OSPF cost is accumulated by adding the cost of each outgoing (egress) interface in the direction of forwarding along the path; each interface cost defaults to reference bandwidth divided by interface bandwidth. Hop count is the RIP metric, and bandwidth combined with delay is the EIGRP composite metric. Costs are associated with exit interfaces, not the inbound interfaces traffic arrives on."
  },
  {
    id: "conn-057",
    domain: "IP Connectivity",
    type: "single",
    question: "Refer to the exhibit. All routers use the default OSPF reference bandwidth. Which path does R1 use to reach the 10.99.0.0/24 LAN behind R4?",
    exhibit: "Topology:\nR1 --Gi (1000 Mbps)--> R2 --Fa (100 Mbps)--> R4\nR1 --Fa (100 Mbps)--> R3 --Gi (1000 Mbps)--> R4\n10.99.0.0/24 connects to R4 via a Gigabit interface (cost 1)\nDefault reference bandwidth: 100 Mbps",
    options: [
      "Both paths, because each has a total cost of 3",
      "Through R2 only, because the first hop is Gigabit",
      "Through R3 only, because the link to R4 is Gigabit",
      "Through R2 only, because Fast Ethernet to R4 is the shorter exit"
    ],
    answer: [0],
    explanation: "With the default 100 Mbps reference bandwidth, both Gigabit and Fast Ethernet interfaces have a cost of 1, so each path totals 1 plus 1 plus 1 equals 3 including the LAN interface on R4. Equal total costs mean OSPF installs both routes and load balances between them. The answers preferring one path assume Gigabit links cost less, which would only be true after raising the reference bandwidth on all routers."
  },
  {
    id: "conn-058",
    domain: "IP Connectivity",
    type: "single",
    question: "An engineer must force OSPF on R1 to prefer one specific exit interface without affecting how other protocols or other routers see the link. Which method is best?",
    options: [
      "Configure ip ospf cost on the relevant R1 interfaces",
      "Change the bandwidth value on the R1 interfaces",
      "Lower the OSPF administrative distance on R1",
      "Increase the reference bandwidth on R1 only"
    ],
    answer: [0],
    explanation: "The ip ospf cost command directly sets the OSPF cost of an interface and influences only the OSPF SPF calculation on that router, making it the most surgical tool. Changing the interface bandwidth value also alters EIGRP metrics and QoS calculations, producing side effects. Administrative distance compares different routing sources rather than paths within OSPF, and changing the reference bandwidth on only one router creates inconsistent costs across the domain, which Cisco warns against."
  },
  {
    id: "conn-059",
    domain: "IP Connectivity",
    type: "multi",
    question: "An OSPF adjacency cycles between EXSTART and EXCHANGE and never stabilizes. Which two conditions cause this behavior? (Choose two.)",
    options: [
      "The interface MTU values differ between the two neighbors",
      "Both routers are using the same OSPF router ID",
      "The hello intervals are mismatched between the two neighbors",
      "One side has a passive interface configured"
    ],
    answer: [0, 1],
    explanation: "EXSTART begins master/slave negotiation, which relies on comparing router IDs and exchanging database description packets; duplicate router IDs break the negotiation and mismatched MTUs cause DBD packets to be discarded, so both faults leave the adjacency looping at this stage. Mismatched hello timers cause hellos to be rejected outright, so the neighbor never appears in the table at all. A passive interface sends no hellos, which also prevents the relationship from ever starting."
  },
  {
    id: "conn-060",
    domain: "IP Connectivity",
    type: "single",
    question: "What are the default OSPF hello and dead intervals on an Ethernet interface?",
    options: [
      "Hello 10 seconds, dead 40 seconds",
      "Hello 30 seconds, dead 120 seconds",
      "Hello 5 seconds, dead 20 seconds",
      "Hello 10 seconds, dead 30 seconds"
    ],
    answer: [0],
    explanation: "Ethernet interfaces default to the broadcast network type, which uses a 10-second hello interval and a dead interval of four times the hello, or 40 seconds. The 30 and 120 second pair belongs to non-broadcast and point-to-multipoint network types. The dead interval is always derived as four times the hello by default, so 10 and 30 is not a valid default combination."
  }
);

(window.QUESTION_BANK = window.QUESTION_BANK || []).push(
  {
    id: "conn-061",
    domain: "IP Connectivity",
    type: "single",
    question: "Refer to the exhibit. Internal router R9 shows this route. Which configuration on the edge router produced it?",
    exhibit: "R9# show ip route | include 0.0.0.0/0\nO*E2  0.0.0.0/0 [110/1] via 10.0.12.1, 00:14:02, GigabitEthernet0/0",
    options: [
      "default-information originate under the OSPF process on the edge router",
      "ip route 0.0.0.0 0.0.0.0 10.0.12.1 configured on R9 itself",
      "redistribute static subnets under the OSPF process on R9",
      "ip default-gateway 10.0.12.1 on the edge router"
    ],
    answer: [0],
    explanation: "The code O*E2 identifies a default route learned through OSPF as an external type 2 route, which is exactly how default-information originate on an ASBR injects a default into the domain. A locally configured static default would appear as S* with an administrative distance of 1, not 110. Redistribution on R9 would not create a route R9 learns via a neighbor, and ip default-gateway only applies to devices with IP routing disabled."
  },
  {
    id: "conn-062",
    domain: "IP Connectivity",
    type: "single",
    question: "Two routers are connected by a direct fiber link whose interfaces are configured with ip ospf network point-to-point. How does OSPF behave on this link?",
    options: [
      "No DR or BDR is elected, and the routers form a full adjacency directly with each other",
      "A DR is elected but no BDR, to conserve resources",
      "The routers remain in 2WAY state because there is no DR",
      "Hellos are sent every 30 seconds by default on this network type"
    ],
    answer: [0],
    explanation: "The point-to-point network type skips the DR and BDR election entirely because only two routers can exist on the link, and they proceed straight to a FULL adjacency with each other. There is never a DR-only arrangement, and 2WAY as a final state occurs only between DROTHER routers on multiaccess segments. Point-to-point uses the same 10-second hello and 40-second dead timers as broadcast, not 30 seconds."
  },
  {
    id: "conn-063",
    domain: "IP Connectivity",
    type: "dragdrop",
    question: "Drag each OSPF fault on the left to the symptom it produces on the right.",
    items: [
      "MTU mismatch",
      "Hello timer mismatch",
      "Duplicate router ID on two routers",
      "Passive interface toward the neighbor"
    ],
    targets: [
      "Adjacencies flap and LSAs churn throughout the area",
      "The neighbor relationship stalls during database description exchange",
      "The router sends no hello packets at all on the segment",
      "Hellos arrive but are discarded because a field does not match"
    ],
    answer: [2, 0, 3, 1],
    explanation: "Duplicate router IDs corrupt the link-state database and cause continuous LSA origination and flapping across the area. An MTU mismatch lets the neighbors reach EXSTART but the database description packets are rejected, stalling the exchange. A passive interface suppresses all outgoing hellos, while a hello timer mismatch means hellos are received but fail the parameter check and are dropped."
  },
  {
    id: "conn-064",
    domain: "IP Connectivity",
    type: "multi",
    question: "Routers R1 through R4 boot simultaneously on a new Ethernet segment running OSPF. Which two values determine the outcome of the DR election? (Choose two.)",
    options: [
      "The OSPF interface priority, where the highest value wins",
      "The OSPF router ID, used as the tiebreaker when priorities are equal",
      "The interface IP address, where the lowest value wins",
      "The OSPF process ID, where the lowest value wins"
    ],
    answer: [0, 1],
    explanation: "The DR election compares interface priority first, with the highest priority winning, and breaks ties using the highest OSPF router ID. The interface IP address only influences the election indirectly when it is the source of the router ID, and even then the highest rather than the lowest address would matter. The process ID is locally significant and plays no role in any OSPF election."
  },
  {
    id: "conn-065",
    domain: "IP Connectivity",
    type: "single",
    question: "Refer to the exhibit. Based on the output, why has R6 not elected a DR on this interface?",
    exhibit: "R6# show ip ospf interface Serial0/0/0\nSerial0/0/0 is up, line protocol is up\n  Internet Address 10.45.0.6/30, Area 0, Attached via Network Statement\n  Process ID 1, Router ID 10.6.6.6, Network Type POINT_TO_POINT, Cost: 64\n  Transmit Delay is 1 sec, State POINT_TO_POINT\n  Timer intervals configured, Hello 10, Dead 40, Wait 40, Retransmit 5\n  Neighbor Count is 1, Adjacent neighbor count is 1",
    options: [
      "The point-to-point network type does not use a DR or BDR",
      "The election has not finished because the wait timer is still running",
      "The serial interface priority is set to 0",
      "The neighbor count of 1 is below the minimum required for an election"
    ],
    answer: [0],
    explanation: "The output shows Network Type POINT_TO_POINT, and this network type never elects a DR or BDR because exactly two routers share the link and form a direct full adjacency, confirmed by the adjacent neighbor count of 1. The wait timer applies to multiaccess elections, which do not occur here. No priority value is involved, and there is no minimum neighbor count for DR elections on types that use them."
  },
  {
    id: "conn-066",
    domain: "IP Connectivity",
    type: "single",
    question: "An engineer configures ip route 10.50.0.0 255.255.0.0 GigabitEthernet0/0 on a router whose Gi0/0 connects to a multiaccess Ethernet segment. Why is this configuration discouraged?",
    options: [
      "The router must rely on proxy ARP and ARPs for every destination, inflating the ARP table",
      "Static routes that use an exit interface are never installed in the routing table",
      "The administrative distance becomes 10 instead of 1",
      "The route works only if the next-hop router runs OSPF"
    ],
    answer: [0],
    explanation: "Pointing a static route at an Ethernet exit interface makes the router treat every destination in 10.50.0.0/16 as directly connected, so it sends an ARP request for each destination address and depends on the next-hop router performing proxy ARP, which bloats the ARP table and breaks entirely if proxy ARP is disabled. The route is installed normally with administrative distance 1, the same as any static route. No dynamic protocol is required on the next hop."
  },
  {
    id: "conn-067",
    domain: "IP Connectivity",
    type: "single",
    question: "Which static route configuration is called a fully specified static route, and when is it recommended?",
    options: [
      "ip route 172.30.1.0 255.255.255.0 GigabitEthernet0/1 192.168.5.2, recommended when the exit interface is multiaccess",
      "ip route 172.30.1.0 255.255.255.0 192.168.5.2, recommended for point-to-point links",
      "ip route 172.30.1.0 255.255.255.0 GigabitEthernet0/1, recommended when proxy ARP is enabled",
      "ip route 0.0.0.0 0.0.0.0 192.168.5.2 250, recommended as a backup default"
    ],
    answer: [0],
    explanation: "A fully specified static route lists both the exit interface and the next-hop IP address, which avoids both the recursive lookup of a next-hop-only route and the proxy ARP dependence of an interface-only route, making it the best practice on multiaccess Ethernet links. A route with only a next hop is a recursive static route, an interface-only route is a directly attached static route, and a high-AD default is a floating static, none of which match the fully specified definition."
  },
  {
    id: "conn-068",
    domain: "IP Connectivity",
    type: "single",
    question: "Refer to the exhibit. Hosts on the 192.168.40.0/26 LAN behind R2 must be reachable from R1. Which command on R1 provides reachability using the most specific correct route?",
    exhibit: "Topology:\nR1 Gi0/0 (10.0.0.1/30) <---> Gi0/0 (10.0.0.2/30) R2\nR2 Gi0/1: 192.168.40.1/26 connects to the LAN",
    options: [
      "ip route 192.168.40.0 255.255.255.192 10.0.0.2",
      "ip route 192.168.40.0 255.255.255.0 10.0.0.1",
      "ip route 192.168.40.0 0.0.0.63 10.0.0.2",
      "ip route 192.168.40.0 255.255.255.192 192.168.40.1"
    ],
    answer: [0],
    explanation: "The LAN is a /26, which corresponds to the subnet mask 255.255.255.192, and the next hop from R1's perspective is R2's directly connected address 10.0.0.2. The /24 option uses the wrong mask and the wrong next hop, since 10.0.0.1 is R1's own interface. Wildcard masks like 0.0.0.63 belong in OSPF network statements and ACLs, not in static routes, and 192.168.40.1 is not reachable as a next hop until the route itself exists."
  },
  {
    id: "conn-069",
    domain: "IP Connectivity",
    type: "single",
    question: "A router learns 0.0.0.0/0 from OSPF over its primary link. An engineer must add a backup default route through a DSL line that is used only if the OSPF default disappears. Which command is correct?",
    options: [
      "ip route 0.0.0.0 0.0.0.0 203.0.113.9 130",
      "ip route 0.0.0.0 0.0.0.0 203.0.113.9 90",
      "ip route 0.0.0.0 0.0.0.0 203.0.113.9",
      "ip route 0.0.0.0 0.0.0.0 203.0.113.9 110"
    ],
    answer: [0],
    explanation: "A floating static route must carry an administrative distance higher than that of the protocol it backs up, and since OSPF uses 110, a value such as 130 keeps the static route out of the table while the OSPF default is alive. With AD 90 or the default of 1, the static route would always beat OSPF and the DSL line would carry all traffic immediately. An AD of exactly 110 creates an ambiguous tie with OSPF rather than a clean backup."
  },
  {
    id: "conn-070",
    domain: "IP Connectivity",
    type: "single",
    question: "Refer to the exhibit. The engineer configured a floating static route to 172.31.0.0/16, but it does not appear in the routing table. What explains this?",
    exhibit: "R4# show running-config | include ip route\nip route 172.31.0.0 255.255.0.0 10.8.8.2 150\n\nR4# show ip route | include 172.31\nD     172.31.0.0/16 [90/307200] via 10.9.9.2, 01:22:47, GigabitEthernet0/1",
    options: [
      "The EIGRP route has a lower administrative distance, so the floating static stays inactive as designed",
      "The static route was rejected because 150 is not a valid distance value",
      "The next hop 10.8.8.2 must be unreachable",
      "Floating static routes appear only in show ip route static"
    ],
    answer: [0],
    explanation: "The static route was deliberately given an administrative distance of 150, which is worse than the EIGRP internal distance of 90, so as long as EIGRP supplies the prefix the floating static remains out of the table and serves purely as a standby path. That is correct behavior, not a fault. Distances from 1 to 255 are valid, nothing in the output indicates the next hop is down, and show ip route static would also show nothing because the route is not installed."
  },
  {
    id: "conn-071",
    domain: "IP Connectivity",
    type: "single",
    question: "Which command configures a static route on R1 to the remote network 2001:db8:cafe:2::/64 through a neighbor whose global address is 2001:db8:cafe:12::2?",
    options: [
      "ipv6 route 2001:db8:cafe:2::/64 2001:db8:cafe:12::2",
      "ip route 2001:db8:cafe:2::/64 2001:db8:cafe:12::2",
      "ipv6 route 2001:db8:cafe:2::/64 2001:db8:cafe:2::1",
      "ipv6 route 2001:db8:cafe:12::/64 2001:db8:cafe:2::2"
    ],
    answer: [0],
    explanation: "IPv6 static routes use the ipv6 route command followed by the destination prefix and the next-hop address, and the next hop must be the neighbor's address on the shared link, 2001:db8:cafe:12::2. The ip route command is for IPv4 only and rejects IPv6 syntax. Using an address inside the destination network as the next hop is circular, and the last option reverses the destination and transit prefixes."
  },
  {
    id: "conn-072",
    domain: "IP Connectivity",
    type: "single",
    question: "Which command configures an IPv6 default static route through next hop 2001:db8:1::1?",
    options: [
      "ipv6 route ::/0 2001:db8:1::1",
      "ipv6 route 0.0.0.0/0 2001:db8:1::1",
      "ipv6 route ::/128 2001:db8:1::1",
      "ipv6 default-gateway 2001:db8:1::1"
    ],
    answer: [0],
    explanation: "The IPv6 default route is written ::/0, the all-zeros prefix with a zero-length mask, which matches every destination just as 0.0.0.0/0 does in IPv4. The dotted-decimal notation 0.0.0.0/0 is IPv4 syntax and is invalid in the ipv6 route command. A /128 prefix is a host route to one specific address, the opposite of a default, and ipv6 default-gateway is not a valid IOS routing command."
  },
  {
    id: "conn-073",
    domain: "IP Connectivity",
    type: "single",
    question: "An engineer wants to use the neighbor's link-local address FE80::2 as the next hop of an IPv6 static route. What additional element does the command require?",
    options: [
      "The exit interface must be specified along with the link-local next hop",
      "The link-local address must first be redistributed into the IGP",
      "A /128 host route to FE80::2 must exist in the routing table",
      "Nothing; the command is identical to using a global next hop"
    ],
    answer: [0],
    explanation: "Link-local addresses are valid only on their own link and the same FE80::/10 addresses can exist on many interfaces, so the router cannot resolve which interface to use; the static route must therefore name the exit interface as well, for example ipv6 route 2001:db8:9::/64 GigabitEthernet0/0 FE80::2. Link-local addresses are never advertised or redistributed by routing protocols, and no host route can make them globally resolvable. Omitting the interface causes the command to be rejected."
  },
  {
    id: "conn-074",
    domain: "IP Connectivity",
    type: "multi",
    question: "Which two statements about the command ip route 0.0.0.0 0.0.0.0 198.51.100.1 are true? (Choose two.)",
    options: [
      "It matches any destination that has no longer prefix match in the routing table",
      "It sets the gateway of last resort on the router",
      "It overrides all dynamically learned routes because its distance is 1",
      "It is automatically advertised to OSPF neighbors without further configuration"
    ],
    answer: [0, 1],
    explanation: "A quad-zero static route matches every destination but, because its prefix length is 0, it is only used when no more specific route exists, and installing it sets the gateway of last resort. It does not override dynamic routes for specific prefixes, since longest prefix match is evaluated before administrative distance ever matters. OSPF advertises a default only when default-information originate is configured, so the route is not propagated automatically."
  },
  {
    id: "conn-075",
    domain: "IP Connectivity",
    type: "dragdrop",
    question: "Drag each static route command on the left to the route type it creates on the right.",
    items: [
      "ip route 0.0.0.0 0.0.0.0 10.1.1.2",
      "ip route 10.99.5.7 255.255.255.255 10.1.1.2",
      "ip route 172.18.0.0 255.255.0.0 10.1.1.2 180",
      "ip route 172.18.0.0 255.255.0.0 GigabitEthernet0/0 10.1.1.2"
    ],
    targets: [
      "Floating static route that backs up a dynamic protocol",
      "Fully specified static route with interface and next hop",
      "Default static route matching all destinations",
      "Host route to a single IP address"
    ],
    answer: [2, 3, 0, 1],
    explanation: "The quad-zero route is a default static route that matches any destination lacking a more specific entry. A /32 mask of 255.255.255.255 defines a host route for exactly one address. Appending the administrative distance 180 creates a floating static that stays dormant while a better source such as OSPF or EIGRP provides the prefix, and specifying both the exit interface and the next hop produces a fully specified static route."
  }
);

(window.QUESTION_BANK = window.QUESTION_BANK || []).push(
  {
    id: "conn-076",
    domain: "IP Connectivity",
    type: "single",
    question: "Refer to the exhibit. Users behind R1 cannot reach the 10.77.4.0/24 server network behind R3. R2 sits between them at 10.0.12.2. What is wrong on R1?",
    exhibit: "R1# show running-config | include ip route\nip route 10.77.4.0 255.255.255.0 10.0.13.3\n\nR1# show ip interface brief\nInterface              IP-Address      OK? Method Status                Protocol\nGigabitEthernet0/0     10.0.12.1       YES manual up                    up\nGigabitEthernet0/1     unassigned      YES unset  administratively down down",
    options: [
      "The static route points to a next hop that is not on any connected subnet, so the route is not installed",
      "The mask 255.255.255.0 is too specific for a remote network",
      "Static routes cannot be used when more than one router separates the networks",
      "The route must reference Gi0/1 as the exit interface"
    ],
    answer: [0],
    explanation: "A recursive static route is installed only if the next hop can be resolved through another routing table entry; 10.0.13.3 is not in R1's connected subnet 10.0.12.0/30 and R1 has no other route to it, so the static route never makes it into the table. The correct next hop is R2's address 10.0.12.2, and R2 in turn needs a route onward, which is normal multi-hop static routing. The /24 mask itself is perfectly valid, and Gi0/1 is shut down so it cannot be the answer."
  },
  {
    id: "conn-077",
    domain: "IP Connectivity",
    type: "single",
    question: "A network engineer must steer traffic for a single monitoring server at 10.200.1.10 through a dedicated firewall at 192.168.99.2, while all other traffic follows the dynamic routing table. Which command achieves this?",
    options: [
      "ip route 10.200.1.10 255.255.255.255 192.168.99.2",
      "ip route 10.200.1.0 255.255.255.0 192.168.99.2",
      "ip route 10.200.1.10 0.0.0.0 192.168.99.2",
      "ip route 192.168.99.2 255.255.255.255 10.200.1.10"
    ],
    answer: [0],
    explanation: "A host route uses the 255.255.255.255 mask to match exactly one address, and because /32 is the longest possible prefix it always wins over any dynamic route for the surrounding subnet. The /24 version would divert the entire subnet rather than the single server. The mask 0.0.0.0 would make the route match everything like a default route, and the final option reverses the destination and next hop."
  },
  {
    id: "conn-078",
    domain: "IP Connectivity",
    type: "single",
    question: "A router has the route ip route 172.22.0.0 255.255.0.0 10.1.1.2 configured, and 10.1.1.2 is reachable through OSPF rather than a connected interface. How does the router forward a packet to 172.22.5.5?",
    options: [
      "It performs a recursive lookup, resolving 10.1.1.2 to the OSPF route's exit interface and next hop",
      "It drops the packet because the next hop is not directly connected",
      "It sends the packet out of every OSPF-enabled interface",
      "It replaces the static route with the OSPF route automatically"
    ],
    answer: [0],
    explanation: "A next-hop static route triggers a recursive lookup: the router looks up 10.1.1.2 in the routing table, finds the OSPF route covering it, and uses that route's outgoing interface and next hop to forward the packet. The next hop of a static route does not have to be directly connected as long as it is resolvable. Packets are never flooded out of all interfaces by unicast routing, and the static route remains valid alongside the OSPF route that resolves it."
  },
  {
    id: "conn-079",
    domain: "IP Connectivity",
    type: "single",
    question: "Refer to the exhibit. How is the static route in this configuration line classified?",
    exhibit: "ip route 10.40.40.0 255.255.255.0 GigabitEthernet0/2 172.16.31.2",
    options: [
      "A fully specified static route",
      "A directly attached static route",
      "A recursive static route",
      "A floating static route"
    ],
    answer: [0],
    explanation: "Because the command lists both the exit interface GigabitEthernet0/2 and the next-hop address 172.16.31.2, it is a fully specified static route; the router forwards out the named interface and resolves the layer 2 address from the given next hop without recursion. A directly attached static route names only the interface, and a recursive static route names only the next hop. No administrative distance is appended, so it is not a floating static route."
  },
  {
    id: "conn-080",
    domain: "IP Connectivity",
    type: "multi",
    question: "In which two situations is static routing a better choice than a dynamic routing protocol? (Choose two.)",
    options: [
      "A stub network that has exactly one path to the rest of the network",
      "A small site where the administrator wants no routing protocol overhead on a low-bandwidth WAN link",
      "A large enterprise where links and topology change frequently",
      "A network that requires automatic rerouting around failures"
    ],
    answer: [0, 1],
    explanation: "A stub network with a single exit point gains nothing from a routing protocol, since one static or default route describes all reachability, and static routes consume no link bandwidth or CPU for updates, which suits constrained WAN circuits. Networks with frequent topology change or a requirement for automatic failover are exactly where dynamic protocols excel, because static routes must be reconfigured manually and cannot react to failures on their own."
  },
  {
    id: "conn-081",
    domain: "IP Connectivity",
    type: "single",
    question: "A static route configured with a next-hop address suddenly disappears from the routing table even though the configuration is unchanged. What most likely happened?",
    options: [
      "The interface or route used to resolve the next hop went down, so the static route was withdrawn",
      "Static routes age out after their holddown timer expires",
      "A routing protocol with a higher administrative distance replaced it",
      "The router removed it because it was not saved to startup-config"
    ],
    answer: [0],
    explanation: "IOS keeps a static route in the table only while its next hop remains resolvable; if the connected interface toward the next hop fails or the resolving route disappears, the static route is withdrawn until reachability returns. Static routes have no aging or holddown timers. A protocol with a higher administrative distance can never displace a static route at distance 1, and the running configuration governs the table regardless of whether it was saved."
  },
  {
    id: "conn-082",
    domain: "IP Connectivity",
    type: "single",
    question: "Refer to the exhibit. What does the asterisk in this routing table entry signify?",
    exhibit: "R8# show ip route static\nGateway of last resort is 198.51.100.1 to network 0.0.0.0\n\nS*    0.0.0.0/0 [1/0] via 198.51.100.1",
    options: [
      "The route is a candidate default route",
      "The route is currently inactive",
      "The route was learned from an external protocol",
      "The route is load balanced across multiple next hops"
    ],
    answer: [0],
    explanation: "The asterisk marks a candidate default route, meaning this entry is eligible to serve as the gateway of last resort, which the first line of the output confirms is active toward 198.51.100.1. Inactive routes simply do not appear in the routing table at all. External origin is indicated by codes such as E2 on OSPF routes or the EX flag on EIGRP routes, and load balancing is shown by multiple via lines under one prefix, not by an asterisk."
  },
  {
    id: "conn-083",
    domain: "IP Connectivity",
    type: "single",
    question: "A site has a primary MPLS link running EIGRP and a backup VPN tunnel. The engineer configures ipv6 route 2001:db8:100::/48 2001:db8:ffff::2 95. What is the purpose of the value 95?",
    options: [
      "It makes the static route less preferred than EIGRP internal routes so it acts as a backup",
      "It sets the metric that EIGRP uses when redistributing the route",
      "It limits the route to 95 seconds of validity after the primary fails",
      "It makes the static route more preferred than EIGRP so the tunnel becomes primary"
    ],
    answer: [0],
    explanation: "The trailing 95 is the administrative distance of the IPv6 static route, and because it is higher than the EIGRP internal distance of 90, the static route floats below the EIGRP path and is installed only if the EIGRP route is lost. It is not a metric or a timer of any kind. Had the engineer wanted the tunnel to be primary, the default static distance of 1 or any value below 90 would have been used instead."
  },
  {
    id: "conn-084",
    domain: "IP Connectivity",
    type: "dragdrop",
    question: "Drag each route source on the left to its default administrative distance on the right.",
    items: [
      "Connected interface",
      "Static route",
      "External BGP",
      "EIGRP internal",
      "OSPF",
      "RIP"
    ],
    targets: [
      "110",
      "20",
      "0",
      "120",
      "1",
      "90"
    ],
    answer: [4, 2, 0, 5, 1, 3],
    explanation: "Cisco default administrative distances rank trustworthiness: connected interfaces are 0, static routes are 1, external BGP is 20, internal EIGRP is 90, OSPF is 110, and RIP is 120. Lower values win when different sources offer the same prefix and mask. These defaults explain why a static route beats any IGP and why EIGRP beats OSPF when both learn the identical network."
  },
  {
    id: "conn-085",
    domain: "IP Connectivity",
    type: "single",
    question: "On which device is the command ip default-gateway required for reaching remote management networks?",
    options: [
      "A Layer 2 switch with ip routing disabled",
      "A router that already has dynamic routing configured",
      "A Layer 3 switch performing inter-VLAN routing",
      "Any device that needs a gateway of last resort"
    ],
    answer: [0],
    explanation: "ip default-gateway applies only when IP routing is disabled, which is the normal state of a Layer 2 switch; it tells the management plane where to send traffic destined off the local subnet. A router or a Layer 3 switch with ip routing enabled ignores this command and must use a default route such as ip route 0.0.0.0 0.0.0.0 instead. It is therefore not a universal way to set a gateway of last resort."
  },
  {
    id: "conn-086",
    domain: "IP Connectivity",
    type: "single",
    question: "Refer to the exhibit. From R1, pings to the 10.30.0.0/24 LAN on R3 fail, yet R1's routing is verified as correct and R2 forwards the packets to R3. The exhibit shows R3's table. Why do the pings fail?",
    exhibit: "R3# show ip route | begin Gateway\nGateway of last resort is not set\n\n      10.0.0.0/8 is variably subnetted, 3 subnets, 2 masks\nC        10.23.0.0/30 is directly connected, GigabitEthernet0/0\nL        10.23.0.2/32 is directly connected, GigabitEthernet0/0\nC        10.30.0.0/24 is directly connected, GigabitEthernet0/1\n\nPing source on R1: 10.10.0.1",
    options: [
      "R3 has no route back to the 10.10.0.0 source network, so the echo replies are dropped",
      "R3's LAN interface is down, so the destination is unreachable",
      "The 10.23.0.0/30 link cannot carry ICMP traffic",
      "R3 needs a host route to 10.30.0.0 before it can answer pings"
    ],
    answer: [0],
    explanation: "The echo requests reach R3, but R3's table contains only its two connected networks and no entry covering the 10.10.0.0 source, so the echo replies have no route back and are discarded; two-way reachability always requires a return route. The LAN 10.30.0.0/24 shows as directly connected, so the interface is up. Nothing about a /30 restricts ICMP, and a router never needs a host route for a network that is directly attached."
  },
  {
    id: "conn-087",
    domain: "IP Connectivity",
    type: "multi",
    question: "Which two characteristics apply to a static route configured with only an exit interface on a point-to-point serial link, such as ip route 10.60.0.0 255.255.0.0 Serial0/0/1? (Choose two.)",
    options: [
      "The destination network appears in the routing table as if it were directly connected to Serial0/0/1",
      "No recursive lookup is needed when forwarding packets that match the route",
      "The route remains in the table even if Serial0/0/1 goes down",
      "The router must ARP for each destination address in 10.60.0.0/16"
    ],
    answer: [0, 1],
    explanation: "A directly attached static route installs the prefix as reachable via the named interface, listed like a connected network, and the router forwards matching packets straight out of that interface without resolving any next-hop address. On a point-to-point serial link there is only one possible far end, so no ARP is involved; the ARP concern applies to multiaccess Ethernet interfaces. The route is withdrawn immediately if the exit interface goes down, so it does not remain in the table."
  },
  {
    id: "conn-088",
    domain: "IP Connectivity",
    type: "single",
    question: "Two routers run HSRP version 1 with group number 12 on VLAN 10. Which virtual MAC address does the active router use to answer ARP requests for the virtual IP?",
    options: [
      "0000.0c07.ac0c",
      "0000.0c07.ac12",
      "0000.0c9f.f00c",
      "0005.73a0.000c"
    ],
    answer: [0],
    explanation: "HSRP version 1 builds the virtual MAC as 0000.0c07.acXX, where XX is the group number written in hexadecimal, and group 12 decimal converts to 0c hex, giving 0000.0c07.ac0c. The address ending in ac12 wrongly inserts the decimal group number without conversion. The 0000.0c9f.fXXX format belongs to HSRP version 2, and 0005.73a0.xxxx is the HSRPv2 IPv6 virtual MAC range."
  },
  {
    id: "conn-089",
    domain: "IP Connectivity",
    type: "single",
    question: "Refer to the exhibit. Which statement explains why R2 is the active router even though R1 has the higher priority?",
    exhibit: "R1# show standby brief\n                     P indicates configured to preempt.\nInterface   Grp  Pri P State   Active          Standby         Virtual IP\nGi0/0       5    150   Standby 10.1.1.2        local           10.1.1.254\n\nR2# show standby brief\nInterface   Grp  Pri P State   Active          Standby         Virtual IP\nGi0/0       5    100   Active  local           10.1.1.1        10.1.1.254",
    options: [
      "R1 is not configured to preempt, so it cannot take the active role from R2",
      "R2 has a lower priority, and lower priority wins in HSRP",
      "The group numbers are mismatched between the routers",
      "R1's interface is in the down state"
    ],
    answer: [0],
    explanation: "HSRP does not preempt by default: R2 became active first, likely while R1 was booting, and R1 with priority 150 cannot reclaim the role because the P flag is absent from its output, showing preempt is not configured. Adding standby 5 preempt on R1 fixes it. Higher priority, not lower, wins HSRP elections, both outputs show group 5 with the same virtual IP, and R1 is clearly up since it holds the standby role."
  },
  {
    id: "conn-090",
    domain: "IP Connectivity",
    type: "multi",
    question: "Which two statements describe default HSRP behavior on Cisco routers? (Choose two.)",
    options: [
      "The default priority is 100, and the router with the highest priority becomes active",
      "If priorities are equal, the router with the highest interface IP address becomes active",
      "Preemption is enabled by default so a recovered router resumes the active role",
      "The standby router answers ARP requests for the virtual IP address"
    ],
    answer: [0, 1],
    explanation: "HSRP routers default to priority 100, the highest priority wins the active role, and the highest configured interface IP address breaks a tie. Preemption is disabled by default, so a router returning to service waits as standby even with a better priority, which is why the preempt option exists. Only the active router answers ARP for the virtual IP using the virtual MAC; the standby stays silent until it takes over."
  }
);
