// Study guide topics: Network Fundamentals (configure/verify/troubleshoot objectives).
(window.GUIDE_BANK = window.GUIDE_BANK || []).push(
  {
    id: "gf-ipv4-config",
    domain: "Network Fundamentals",
    title: "IPv4 Addressing and Subnetting on IOS",
    blueprint: "1.6 Configure and verify IPv4 addressing and subnetting",
    overview: [
      "Every routed interface needs a unique IPv4 address and subnet mask that place it in the correct subnet. The mask defines which bits identify the network; hosts in the same subnet must agree on it or connectivity breaks in confusing, one-directional ways.",
      "On a Layer 2 switch the management address goes on an SVI (interface Vlan1 or a dedicated management VLAN), plus a default gateway so the switch can be reached from other subnets. Routers put addresses directly on routed interfaces, which also must be enabled with no shutdown.",
    ],
    configs: [
      {
        title: "Address a router interface",
        intro: "Router interfaces are administratively down by default: address it, then bring it up.",
        cli: "R1# configure terminal\nR1(config)# interface gigabitEthernet 0/0\nR1(config-if)# ip address 192.168.10.1 255.255.255.0\nR1(config-if)# description LAN-USERS\nR1(config-if)# no shutdown\nR1(config-if)# end",
        notes: [
          "The mask is typed in dotted-decimal on IOS (255.255.255.0), even though documentation usually writes /24.",
          "A router will reject an address whose host bits are all 0 or all 1 for the given mask (subnet or broadcast address).",
        ],
      },
      {
        title: "Management address on a Layer 2 switch (SVI + gateway)",
        cli: "SW1# configure terminal\nSW1(config)# interface vlan 1\nSW1(config-if)# ip address 192.168.10.2 255.255.255.0\nSW1(config-if)# no shutdown\nSW1(config-if)# exit\nSW1(config)# ip default-gateway 192.168.10.1",
        notes: [
          "The SVI comes up only when the VLAN exists and at least one port in that VLAN is up.",
          "ip default-gateway is used because a Layer 2 switch does not route; without it the switch answers only hosts in its own subnet.",
        ],
      },
    ],
    verify: [
      { cmd: "show ip interface brief", what: "One line per interface: address, administrative status (up/administratively down) and line protocol. The fastest first check for any addressing problem." },
      { cmd: "show interfaces g0/0", what: "Full detail for one interface: address/mask, MTU, duplex/speed, and input/output error counters." },
      { cmd: "show ip route connected", what: "Confirms the subnet the router derived from the address+mask actually made it into the routing table (interface must be up/up)." },
    ],
    troubleshooting: [
      {
        symptom: "Interface shows 'administratively down'",
        causes: ["Interface was never enabled (routers default to shutdown)"],
        fix: "Enter the interface and issue no shutdown; confirm with show ip interface brief that status changes to up.",
      },
      {
        symptom: "Two hosts in the 'same' subnet cannot reach each other, or reachability works one way only",
        causes: ["Mismatched subnet masks on the hosts or the gateway", "One address is actually in a different subnet than intended"],
        fix: "Work out each host's subnet from its own address+mask; correct the mask or re-address the host so both compute the same network.",
      },
      {
        symptom: "Router refuses the address: 'Bad mask' or overlap error",
        causes: ["Address is the subnet or broadcast address for that mask", "Another interface already covers the same subnet"],
        fix: "Pick a usable host address inside the range, or re-plan the subnets so no two interfaces overlap.",
      },
    ],
    tips: [
      "Memorize the /25-/30 mask values and their usable-host counts; subnetting questions are pure speed on exam day.",
      "A /31 (255.255.255.254) is valid on point-to-point router links and a /32 identifies a single host (loopbacks).",
    ],
  },
  {
    id: "gf-ipv6-config",
    domain: "Network Fundamentals",
    title: "IPv6 Addressing (GUA, Link-Local, EUI-64)",
    blueprint: "1.8 Configure and verify IPv6 addressing and prefix",
    overview: [
      "IPv6 interfaces always have a link-local address (FE80::/10) used for next-hop and neighbor communication on the local segment, and usually one or more global unicast addresses (GUA, currently allocated from 2000::/3) for end-to-end reachability.",
      "Addresses can be typed in full, generated from the prefix with EUI-64 (which embeds the interface MAC, split by FFFE with the 7th bit flipped), or learned automatically via SLAAC. Routers must also have IPv6 routing enabled globally before they forward IPv6 packets.",
    ],
    configs: [
      {
        title: "Enable IPv6 routing and address an interface statically",
        cli: "R1# configure terminal\nR1(config)# ipv6 unicast-routing\nR1(config)# interface gigabitEthernet 0/0\nR1(config-if)# ipv6 address 2001:db8:acad:1::1/64\nR1(config-if)# no shutdown",
        notes: [
          "Without ipv6 unicast-routing the router will hold addresses but will not route IPv6 or send router advertisements.",
          "Prefix length is written with slash notation directly in the command — there are no dotted masks in IPv6.",
        ],
      },
      {
        title: "EUI-64 and manual link-local",
        intro: "EUI-64 builds the host half from the MAC; a memorable manual link-local makes neighbor tables readable.",
        cli: "R1(config)# interface gigabitEthernet 0/1\nR1(config-if)# ipv6 address 2001:db8:acad:2::/64 eui-64\nR1(config-if)# ipv6 address fe80::1 link-local\nR1(config-if)# no shutdown",
        notes: [
          "EUI-64: MAC is split in half, FFFE inserted in the middle, and the universal/local (7th) bit of the first byte is inverted.",
          "Link-local addresses only need to be unique per link, so fe80::1 can be reused on every interface of the same router.",
        ],
      },
    ],
    verify: [
      { cmd: "show ipv6 interface brief", what: "Lists every interface with its link-local and global addresses plus up/down state — the IPv6 counterpart of show ip interface brief." },
      { cmd: "show ipv6 interface g0/0", what: "Full detail: all addresses, joined multicast groups (FF02::1, solicited-node), and whether the interface participates in routing." },
      { cmd: "show ipv6 route connected", what: "Confirms the /64 prefix was installed as a connected route once the interface is up/up." },
    ],
    troubleshooting: [
      {
        symptom: "Hosts get no IPv6 connectivity through the router even though addresses look right",
        causes: ["ipv6 unicast-routing missing, so the router neither forwards IPv6 nor advertises the prefix"],
        fix: "Add ipv6 unicast-routing in global configuration; verify hosts start receiving router advertisements and default routes.",
      },
      {
        symptom: "Ping to a global address fails but ping to the link-local address works",
        causes: ["Wrong prefix/prefix-length on one side", "Missing route back to the source subnet"],
        fix: "Compare show ipv6 interface brief on both ends and check the routing table on each device for the destination and return prefixes.",
      },
      {
        symptom: "EUI-64 address is not what was expected from the MAC",
        causes: ["Forgetting that the 7th bit of the first byte is flipped when the MAC is expanded"],
        fix: "Recompute: split the MAC, insert FFFE, then invert bit 7 of the first byte (e.g. MAC starting 00 becomes 02).",
      },
    ],
    tips: [
      "Know the multicast groups by heart: FF02::1 all nodes, FF02::2 all routers, FF02::5/FF02::6 OSPFv3.",
      "A ping to a link-local address on a multi-interface device requires specifying the exit interface, because FE80::/10 is ambiguous.",
    ],
  },
  {
    id: "gf-interface-issues",
    domain: "Network Fundamentals",
    title: "Interface and Cable Issues (Speed, Duplex, Errors)",
    blueprint: "1.4 Identify interface and cable issues (collisions, errors, mismatch duplex, and/or speed)",
    overview: [
      "Modern Ethernet autonegotiates speed and duplex. When one side is hard-coded and the other left to autonegotiate, negotiation fails and the autonegotiating side falls back to half duplex — creating a duplex mismatch that passes small pings but collapses under load.",
      "The interface error counters tell the story: late collisions are the classic duplex-mismatch signature, CRC/input errors point at bad cabling or noise, and runts/giants indicate malformed frames from a faulty NIC or driver.",
    ],
    configs: [
      {
        title: "Hard-set or restore autonegotiation",
        intro: "Both link partners must match: either both auto, or both hard-coded to the same values.",
        cli: "SW1# configure terminal\nSW1(config)# interface fastEthernet 0/5\nSW1(config-if)# speed 100\nSW1(config-if)# duplex full\nSW1(config-if)# exit\n! ...or return the port to autonegotiation:\nSW1(config)# interface fastEthernet 0/5\nSW1(config-if)# speed auto\nSW1(config-if)# duplex auto",
        notes: [
          "Best practice today: leave both ends on auto. Hard-code both ends identically only when a device negotiates badly.",
          "Clearing counters (clear counters fa0/5) after a fix makes it obvious whether errors are still incrementing.",
        ],
      },
    ],
    verify: [
      { cmd: "show interfaces fa0/5", what: "Shows negotiated speed/duplex (a-full vs full = auto vs forced) and every error counter: collisions, late collisions, CRC, input errors, runts, giants." },
      { cmd: "show interfaces fa0/5 status", what: "Compact one-liner per port: connected/notconnect/err-disabled, VLAN, duplex and speed — quick way to spot a-half fallbacks." },
      { cmd: "show interfaces counters errors", what: "Error counters for every port in one table; ideal for finding which port on a busy switch is taking CRC or collision hits." },
    ],
    troubleshooting: [
      {
        symptom: "Link is up but throughput is terrible; late collisions increment steadily",
        causes: ["Duplex mismatch: one side full, other side half (often auto fallback against a hard-coded peer)"],
        fix: "Set both ends to auto/auto or hard-code both to the same speed and duplex, then clear counters and confirm late collisions stop.",
      },
      {
        symptom: "CRC and input errors increase on an otherwise healthy port",
        causes: ["Damaged or too-long cable", "EMI near the cable run", "Failing transceiver or NIC"],
        fix: "Replace the patch cable, verify the run is within 100 m for copper, reseat/replace the SFP, and re-test while watching the counters.",
      },
      {
        symptom: "Port shows notconnect although a cable is plugged in",
        causes: ["Wrong cable pinout for legacy gear without auto-MDIX", "Dead port or unpowered peer device"],
        fix: "Try a known-good cable and port; on old equipment match straight-through vs crossover to the device types, or enable mdix auto.",
      },
    ],
    tips: [
      "Late collisions = duplex mismatch (or a cable beyond spec) — regular collisions alone on half duplex are normal.",
      "'a-full / a-100' in show interfaces status means the value was autonegotiated; 'full / 100' without the a- means it was forced.",
    ],
  },
  {
    id: "gf-client-ip",
    domain: "Network Fundamentals",
    title: "Verifying IP Parameters on Client Operating Systems",
    blueprint: "1.10 Verify IP parameters for Client OS (Windows, Mac OS, Linux)",
    overview: [
      "Troubleshooting from the client side means confirming four things: the address and mask, the default gateway, the DNS servers, and whether those values were learned via DHCP or set manually. Each major OS exposes them with different commands.",
      "The classic failure signatures: an address in 169.254.0.0/16 (APIPA) means the DHCP request went unanswered; a missing or wrong default gateway breaks all off-subnet traffic while local traffic still works; wrong DNS resolves nothing by name while pings to raw addresses succeed.",
    ],
    configs: [
      {
        title: "The verification commands per OS",
        intro: "These display commands are what the exam expects you to read and interpret.",
        cli: "C:\\> ipconfig /all          (Windows: address, mask, gateway, DNS, DHCP server, lease)\nC:\\> ipconfig /release\nC:\\> ipconfig /renew         (Windows: force a new DHCP lease)\n\n$ ip address show            (Linux: addresses and masks per interface)\n$ ip route show              (Linux: default gateway = the 'default via' line)\n$ cat /etc/resolv.conf       (Linux: DNS servers)\n\n% ifconfig                   (macOS: addresses per interface)\n% netstat -nr                (macOS: routing table incl. default gateway)\n% networksetup -getdnsservers Wi-Fi   (macOS: DNS servers)",
        notes: [
          "On Windows, plain ipconfig omits DNS and DHCP details — /all is the flag that shows everything.",
          "nslookup (all platforms) tests DNS specifically, separating name-resolution failures from routing failures.",
        ],
      },
    ],
    verify: [
      { cmd: "show ip dhcp binding", what: "On the IOS DHCP server: which MAC received which address — cross-check against what the client believes it has." },
      { cmd: "show ip arp", what: "On the default gateway: confirms the router actually resolved the client's MAC, proving L2 reachability between gateway and client." },
    ],
    troubleshooting: [
      {
        symptom: "Client address is 169.254.x.x and nothing is reachable",
        causes: ["No DHCP server answered: server down, scope exhausted, or missing ip helper-address on the client's gateway"],
        fix: "Check the DHCP server and its scope, add/correct ip helper-address on the SVI or router interface, then renew the lease on the client.",
      },
      {
        symptom: "Client reaches its own subnet but nothing beyond it",
        causes: ["Default gateway missing, mistyped, or pointing to an address not in the client's subnet"],
        fix: "Correct the gateway to the router's address inside the same subnet (statically or in the DHCP pool's default-router statement).",
      },
      {
        symptom: "Ping to 8.8.8.8 works but browsing by name fails",
        causes: ["Wrong or unreachable DNS server configured on the client"],
        fix: "Point the client (or the DHCP pool's dns-server option) at a working resolver and verify with nslookup.",
      },
    ],
    tips: [
      "Learn to read ipconfig /all output quickly — exhibit questions love hiding a wrong mask or gateway in it.",
      "APIPA (169.254.0.0/16) always means 'DHCP failed', never a routing problem.",
    ],
  }
);
