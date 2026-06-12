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
