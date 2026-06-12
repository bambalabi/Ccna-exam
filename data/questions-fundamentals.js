(window.QUESTION_BANK = window.QUESTION_BANK || []).push(
  {
    id: "nf-001",
    domain: "Network Fundamentals",
    type: "single",
    question: "Refer to the exhibit. To which subnet does this workstation belong?",
    exhibit: "C:\\> ipconfig\n\nEthernet adapter Ethernet0:\n   IPv4 Address. . . . . . . . . . . : 172.16.45.197\n   Subnet Mask . . . . . . . . . . . : 255.255.255.192\n   Default Gateway . . . . . . . . . : 172.16.45.254",
    options: [
      "172.16.45.128/26",
      "172.16.45.160/26",
      "172.16.45.192/26",
      "172.16.45.224/26"
    ],
    answer: [2],
    explanation: "A /26 mask (255.255.255.192) creates subnets in blocks of 64: .0, .64, .128, and .192. The host address .197 falls between .192 and .255, so it belongs to 172.16.45.192/26. The .128/26 subnet only covers .128 through .191, just one host below .197, which makes it the most tempting wrong answer. 172.16.45.160 and .224 are not even valid /26 boundaries within this octet pattern (.160 would be a /27 boundary, and .224 covers .224-.255 only at /27)."
  },
  {
    id: "nf-002",
    domain: "Network Fundamentals",
    type: "single",
    question: "A network engineer must size a subnet for a building that will contain up to 1900 devices. The design uses a /21 prefix. How many usable host addresses does a /21 subnet provide?",
    options: [
      "1022",
      "2046",
      "2048",
      "4094"
    ],
    answer: [1],
    explanation: "A /21 prefix leaves 32 - 21 = 11 host bits, which yields 2^11 = 2048 total addresses. Subtracting the network and broadcast addresses leaves 2046 usable hosts, enough for 1900 devices. The answer 2048 forgets to subtract the two reserved addresses, 1022 is the usable count for a /22, and 4094 is the usable count for a /20."
  },
  {
    id: "nf-003",
    domain: "Network Fundamentals",
    type: "single",
    question: "Refer to the exhibit. A user can reach other devices on the local LAN but cannot reach any remote network. What is the cause of the problem?",
    exhibit: "C:\\> ipconfig\n\nEthernet adapter Ethernet0:\n   IPv4 Address. . . . . . . . . . . : 192.168.10.77\n   Subnet Mask . . . . . . . . . . . : 255.255.255.224\n   Default Gateway . . . . . . . . . : 192.168.10.97",
    options: [
      "The IPv4 address is the broadcast address of the subnet.",
      "The default gateway is not in the same subnet as the host.",
      "The subnet mask does not match the class of the address.",
      "The default gateway address is a network address and cannot be assigned."
    ],
    answer: [1],
    explanation: "With a /27 mask, the host 192.168.10.77 belongs to subnet 192.168.10.64/27, which spans .64 through .95. The configured gateway 192.168.10.97 lies in the next subnet, 192.168.10.96/27, so the host can never ARP for it and all off-subnet traffic fails. The host address .77 is a valid host, not a broadcast (.95 is the broadcast). Classful alignment is irrelevant with classless addressing, and .97 is a usable host address in its own subnet, just not in this one."
  },
  {
    id: "nf-004",
    domain: "Network Fundamentals",
    type: "single",
    question: "An engineer must allocate a subnet from 10.80.0.0/16 for a department with 60 hosts while conserving as much address space as possible. Which prefix length should be used?",
    options: [
      "/25",
      "/26",
      "/27",
      "/28"
    ],
    answer: [1],
    explanation: "A /26 provides 2^6 - 2 = 62 usable hosts, the smallest subnet that still fits 60 devices. A /27 yields only 30 usable hosts, which is insufficient even though 2^5 = 32 might look adequate if the network and broadcast addresses are forgotten. A /25 (126 usable) works but wastes half the space, violating the conservation requirement, and a /28 supports only 14 hosts."
  },
  {
    id: "nf-005",
    domain: "Network Fundamentals",
    type: "single",
    question: "Refer to the exhibit. What is the directed broadcast address of the network configured on interface GigabitEthernet0/1?",
    exhibit: "interface GigabitEthernet0/1\n description LAN-Floor2\n ip address 10.4.16.1 255.255.252.0\n no shutdown",
    options: [
      "10.4.16.255",
      "10.4.19.255",
      "10.4.23.255",
      "10.4.31.255"
    ],
    answer: [1],
    explanation: "The mask 255.255.252.0 is a /22, which increments in blocks of 4 in the third octet: 10.4.16.0/22 covers 10.4.16.0 through 10.4.19.255, so the broadcast is 10.4.19.255. The answer 10.4.16.255 treats the network as a /24, 10.4.23.255 would be correct for a /21 (blocks of 8), and 10.4.31.255 corresponds to a /20 (blocks of 16). Recognizing the block size from the mask is the key calculation."
  },
  {
    id: "nf-006",
    domain: "Network Fundamentals",
    type: "multi",
    question: "Refer to the exhibit. Which two IP addresses can be assigned to hosts in the subnet configured on VLAN 20? (Choose two.)",
    exhibit: "interface Vlan20\n ip address 192.168.32.65 255.255.255.224\n!\nSwitch# show ip interface brief | include Vlan20\nVlan20    192.168.32.65   YES manual up    up",
    options: [
      "192.168.32.64",
      "192.168.32.79",
      "192.168.32.94",
      "192.168.32.95",
      "192.168.32.96"
    ],
    answer: [1, 2],
    explanation: "The /27 subnet 192.168.32.64 spans .64 through .95, with usable hosts .65 through .94 (the SVI already uses .65). Both .79 and .94 fall inside that usable range; .94 is the very last usable address, which often looks suspicious but is valid. The address .64 is the network address, .95 is the directed broadcast, and .96 is the network address of the next /27 subnet, so none of those can be assigned to hosts."
  },
  {
    id: "nf-007",
    domain: "Network Fundamentals",
    type: "single",
    question: "An engineer is writing an ACL that must match all hosts in the subnet 172.20.96.16/28. Which wildcard mask must be used?",
    options: [
      "0.0.0.7",
      "0.0.0.15",
      "0.0.0.31",
      "255.255.255.240"
    ],
    answer: [1],
    explanation: "A wildcard mask is the bitwise inverse of the subnet mask. A /28 equals 255.255.255.240, and 255 - 240 = 15, giving 0.0.0.15. The wildcard 0.0.0.7 inverts a /29, 0.0.0.31 inverts a /27, and 255.255.255.240 is the subnet mask itself, a classic trap because ACLs require the inverted form, not the mask."
  },
  {
    id: "nf-008",
    domain: "Network Fundamentals",
    type: "dragdrop",
    question: "Drag each prefix length to the number of usable host addresses it provides per subnet.",
    items: ["/27", "/30", "/24", "/29"],
    targets: [
      "2 usable host addresses",
      "6 usable host addresses",
      "30 usable host addresses",
      "254 usable host addresses"
    ],
    answer: [1, 3, 0, 2],
    explanation: "Usable hosts equal 2^(host bits) minus 2. A /30 leaves 2 host bits (4 - 2 = 2 usable), which is why it is the classic point-to-point mask. A /29 leaves 3 bits (8 - 2 = 6), a /27 leaves 5 bits (32 - 2 = 30), and a /24 leaves 8 bits (256 - 2 = 254). The common error is forgetting to subtract the network and broadcast addresses, which would shift every answer by two."
  },
  {
    id: "nf-009",
    domain: "Network Fundamentals",
    type: "single",
    question: "Refer to the exhibit. Which IP address can be assigned to a server on the LAN attached to GigabitEthernet0/0?",
    exhibit: "R1# show running-config interface GigabitEthernet0/0\ninterface GigabitEthernet0/0\n ip address 172.16.8.1 255.255.252.0\n duplex auto\n speed auto",
    options: [
      "172.16.7.255",
      "172.16.11.254",
      "172.16.12.1",
      "172.16.11.255"
    ],
    answer: [1],
    explanation: "The /22 network 172.16.8.0 spans 172.16.8.0 through 172.16.11.255, so usable hosts run from 172.16.8.2 (after the router at .8.1) to 172.16.11.254. The address 172.16.11.254 is the last usable host and is valid. 172.16.11.255 is the directed broadcast of this subnet, 172.16.12.1 belongs to the next /22 block, and 172.16.7.255 is the broadcast of the previous block (172.16.4.0/22)."
  },
  {
    id: "nf-010",
    domain: "Network Fundamentals",
    type: "single",
    question: "A network designer must address a serial WAN link that requires exactly two usable host addresses while wasting the fewest addresses from a traditional subnetting scheme. Which subnet mask meets the requirement?",
    options: [
      "255.255.255.248",
      "255.255.255.252",
      "255.255.255.254",
      "255.255.255.240"
    ],
    answer: [1],
    explanation: "A /30 (255.255.255.252) provides exactly two usable addresses after subtracting the network and broadcast, matching a point-to-point link perfectly. The /31 mask (255.255.255.254) supplies two total addresses with no network or broadcast and is supported by IOS for point-to-point links, but it does not satisfy the wording of two usable addresses in a traditional scheme that reserves network and broadcast. A /29 wastes four addresses and a /28 wastes twelve."
  },
  {
    id: "nf-011",
    domain: "Network Fundamentals",
    type: "single",
    question: "A Windows laptop that is set to obtain an address automatically reports the IPv4 address 169.254.32.17 with mask 255.255.0.0. What does this indicate?",
    options: [
      "The laptop received the address from a rogue DHCP server.",
      "The laptop failed to contact a DHCP server and self-assigned an APIPA address.",
      "The laptop is using a private RFC 1918 address from the local DHCP pool.",
      "The laptop has a static address configured in the 169.254.0.0/16 range."
    ],
    answer: [1],
    explanation: "169.254.0.0/16 is the link-local (APIPA) range that a Windows host self-assigns when its DHCP requests go unanswered, allowing only same-segment communication. A rogue DHCP server would hand out an address from its own configured pool, not from 169.254.0.0/16. The range is defined by RFC 3927 and is not part of the RFC 1918 private ranges (10/8, 172.16/12, 192.168/16). Because the host was configured for automatic addressing, a static assignment is ruled out by the scenario."
  },
  {
    id: "nf-012",
    domain: "Network Fundamentals",
    type: "multi",
    question: "Which three IPv4 addresses fall within the RFC 1918 private address space? (Choose three.)",
    options: [
      "10.255.255.254",
      "172.33.1.1",
      "192.168.255.1",
      "172.20.10.5",
      "192.169.1.1"
    ],
    answer: [0, 2, 3],
    explanation: "RFC 1918 reserves 10.0.0.0/8, 172.16.0.0/12 (172.16.0.0 through 172.31.255.255), and 192.168.0.0/16. The addresses 10.255.255.254, 192.168.255.1, and 172.20.10.5 all fall inside these ranges. 172.33.1.1 is just past the upper boundary of 172.31.255.255, and 192.169.1.1 is one network beyond 192.168.0.0/16; both are publicly routable addresses that exploit the off-by-one boundaries candidates commonly misremember."
  },
  {
    id: "nf-013",
    domain: "Network Fundamentals",
    type: "single",
    question: "A host is configured with the address 172.29.6.91 and mask 255.255.255.248. What is the network address of the subnet to which this host belongs?",
    options: [
      "172.29.6.80",
      "172.29.6.88",
      "172.29.6.90",
      "172.29.6.92"
    ],
    answer: [1],
    explanation: "A /29 mask creates subnets in blocks of 8: .80, .88, .96, and so on. The host .91 falls in the block .88 through .95, so the network address is 172.29.6.88. The address .80 is the previous subnet boundary, while .90 and .92 are even-numbered addresses inside the block that look like boundaries but are ordinary host addresses; only multiples of the block size 8 can start a /29 subnet."
  },
  {
    id: "nf-014",
    domain: "Network Fundamentals",
    type: "single",
    question: "Refer to the exhibit. PC1 and PC2 are connected to the same switch in the same VLAN, but PC1 cannot ping PC2. What is the cause?",
    exhibit: "PC1> ipconfig\n   IPv4 Address. . . . . . . . . . . : 10.1.1.10\n   Subnet Mask . . . . . . . . . . . : 255.255.255.128\n   Default Gateway . . . . . . . . . : 10.1.1.1\n\nPC2> ipconfig\n   IPv4 Address. . . . . . . . . . . : 10.1.1.130\n   Subnet Mask . . . . . . . . . . . : 255.255.255.128\n   Default Gateway . . . . . . . . . : 10.1.1.129",
    options: [
      "The switch has not learned the MAC address of PC2.",
      "The PCs are in different subnets, so traffic between them must be routed.",
      "PC2 is using the broadcast address of the subnet.",
      "A duplex mismatch is dropping the ICMP packets."
    ],
    answer: [1],
    explanation: "With a /25 mask, 10.1.1.0/25 covers .1 through .126 and 10.1.1.128/25 covers .129 through .254. PC1 (.10) and PC2 (.130) are therefore in different IP subnets even though they share a VLAN, so each host sends traffic for the other to its default gateway; without a router interface in both subnets the ping fails. The switch would learn both MAC addresses normally and would flood unknown destinations anyway. PC2's address .130 is a valid host, not the broadcast (.255), and a duplex mismatch would cause errors and slowness rather than a deterministic logical failure."
  },
  {
    id: "nf-015",
    domain: "Network Fundamentals",
    type: "single",
    question: "A company subnets the 172.16.0.0/16 block using a /22 prefix for every site. How many /22 subnets can be created from this block?",
    options: [
      "16",
      "32",
      "64",
      "128"
    ],
    answer: [2],
    explanation: "Going from /16 to /22 borrows 22 - 16 = 6 bits for subnetting, producing 2^6 = 64 subnets. The answer 32 results from borrowing only 5 bits (a /21 plan), and 128 from borrowing 7 bits (a /23 plan). The number of hosts per subnet (1022 for /22) is a separate calculation and does not affect the subnet count."
  }
);

(window.QUESTION_BANK = window.QUESTION_BANK || []).push(
  {
    id: "nf-016",
    domain: "Network Fundamentals",
    type: "single",
    question: "A host is configured with the IP address 10.55.66.77 and the subnet mask 255.255.248.0. To which network address does the host belong?",
    options: [
      "10.55.56.0",
      "10.55.64.0",
      "10.55.66.0",
      "10.55.72.0"
    ],
    answer: [1],
    explanation: "A 255.255.248.0 mask is a /21, which increments in blocks of 8 in the third octet (0, 8, 16, ... 64, 72). The octet value 66 falls inside the block that starts at 64, so the network address is 10.55.64.0. The value 10.55.66.0 assumes a /24 boundary, 10.55.72.0 is the next /21 subnet, and 10.55.56.0 is the previous one."
  },
  {
    id: "nf-017",
    domain: "Network Fundamentals",
    type: "single",
    question: "Refer to the exhibit. What is the first usable host address in the subnet configured on GigabitEthernet0/1?",
    exhibit: "Router# show running-config interface GigabitEthernet0/1\ninterface GigabitEthernet0/1\n ip address 172.18.111.200 255.255.255.192\n no shutdown",
    options: [
      "172.18.111.193",
      "172.18.111.192",
      "172.18.111.129",
      "172.18.111.201"
    ],
    answer: [0],
    explanation: "A /26 mask creates blocks of 64: .0, .64, .128, and .192. The address .200 falls in the 172.18.111.192/26 subnet, so the first usable host is 172.18.111.193. The address .192 is the subnet (network) address itself and cannot be assigned, .129 is the first host of the previous /26 block, and .201 is simply the next address after the router interface, not the first in the subnet."
  },
  {
    id: "nf-018",
    domain: "Network Fundamentals",
    type: "single",
    question: "A point-of-sale VLAN must support 27 devices plus a default gateway. Which prefix length creates the smallest subnet that meets the requirement?",
    options: [
      "/28",
      "/27",
      "/26",
      "/25"
    ],
    answer: [1],
    explanation: "The VLAN needs 28 usable addresses (27 devices plus the gateway). A /27 provides 2^5 - 2 = 30 usable hosts, which is the smallest subnet that fits. A /28 provides only 14 usable hosts, which is insufficient. A /26 (62 hosts) and /25 (126 hosts) both work but waste address space, so they are not the smallest valid choice."
  },
  {
    id: "nf-019",
    domain: "Network Fundamentals",
    type: "multi",
    question: "Which two addresses can be assigned to hosts in the subnet 192.168.12.64/26? (Choose two.)",
    options: [
      "192.168.12.64",
      "192.168.12.95",
      "192.168.12.126",
      "192.168.12.127",
      "192.168.12.128"
    ],
    answer: [1, 2],
    explanation: "The subnet 192.168.12.64/26 spans 192.168.12.64 through 192.168.12.127, with usable hosts from .65 to .126. Both .95 and .126 fall inside that usable range. The address .64 is the network address, .127 is the directed broadcast, and .128 is the network address of the next /26 subnet."
  },
  {
    id: "nf-020",
    domain: "Network Fundamentals",
    type: "single",
    question: "Refer to the exhibit. R1 and R2 are connected by a direct serial link, but R1 cannot ping R2. What is the cause of the problem?",
    exhibit: "R1# show ip interface brief | include Serial\nSerial0/0/0      10.1.1.5      YES manual up      up\n\nR2# show ip interface brief | include Serial\nSerial0/0/0      10.1.1.2      YES manual up      up\n\n! Both routers use mask 255.255.255.252 on Serial0/0/0",
    options: [
      "The two interfaces are in different /30 subnets",
      "10.1.1.5 is the broadcast address of the subnet",
      "10.1.1.2 is the network address of the subnet",
      "The serial keepalive timers are mismatched"
    ],
    answer: [0],
    explanation: "With a /30 mask, the subnets increment by 4: 10.1.1.0/30 covers .0-.3 and 10.1.1.4/30 covers .4-.7. R1 (.5) is in 10.1.1.4/30 while R2 (.2) is in 10.1.1.0/30, so they cannot communicate even though the link is up/up. The address .5 is a valid host in its block (the broadcast is .7), and .2 is a valid host in its block (the network address is .0). Keepalive mismatches would affect the line protocol state, which shows up."
  },
  {
    id: "nf-021",
    domain: "Network Fundamentals",
    type: "single",
    question: "An engineer must configure an ACL entry that matches all addresses in the network 10.20.8.0 255.255.252.0. Which wildcard mask must be used?",
    options: [
      "0.0.3.255",
      "0.0.4.255",
      "0.0.7.255",
      "0.0.252.255"
    ],
    answer: [0],
    explanation: "The wildcard mask is the bitwise inverse of the subnet mask: 255.255.252.0 inverts to 0.0.3.255, which matches the third-octet range 8 through 11. The mask 0.0.7.255 corresponds to a /21 and would match too many addresses, 0.0.4.255 is not a contiguous wildcard for this block, and 0.0.252.255 incorrectly copies the subnet mask octet instead of inverting it."
  },
  {
    id: "nf-022",
    domain: "Network Fundamentals",
    type: "single",
    question: "How many usable host addresses are available in a subnet with the prefix length /21?",
    options: [
      "2048",
      "2046",
      "1022",
      "4094"
    ],
    answer: [1],
    explanation: "A /21 leaves 32 - 21 = 11 host bits, giving 2^11 = 2048 total addresses. Subtracting the network and broadcast addresses leaves 2046 usable hosts. The value 2048 forgets to subtract those two reserved addresses, 1022 corresponds to a /22, and 4094 corresponds to a /20."
  },
  {
    id: "nf-023",
    domain: "Network Fundamentals",
    type: "single",
    question: "Refer to the exhibit. An engineer must create one additional subnet for a VLAN that requires 25 hosts while conserving as much address space as possible. Which subnet should be used?",
    exhibit: "R1# show ip route connected\nC    192.168.10.0/25 is directly connected, GigabitEthernet0/0\nC    192.168.10.128/26 is directly connected, GigabitEthernet0/1",
    options: [
      "192.168.10.192/27",
      "192.168.10.160/27",
      "192.168.10.192/26",
      "192.168.10.224/27"
    ],
    answer: [0],
    explanation: "The /25 consumes .0-.127 and the /26 consumes .128-.191, so the next free address is .192. A /27 provides 30 usable hosts, which satisfies 25 hosts with minimal waste, making 192.168.10.192/27 correct. The subnet 192.168.10.160/27 overlaps the existing 192.168.10.128/26, a /26 at .192 wastes space unnecessarily, and starting at .224 skips a usable block, fragmenting the address plan."
  },
  {
    id: "nf-024",
    domain: "Network Fundamentals",
    type: "single",
    question: "What is the last usable host address in the subnet 10.200.16.0/22?",
    options: [
      "10.200.16.254",
      "10.200.19.254",
      "10.200.19.255",
      "10.200.23.254"
    ],
    answer: [1],
    explanation: "A /22 spans four third-octet values, so 10.200.16.0/22 covers 10.200.16.0 through 10.200.19.255. The broadcast address is 10.200.19.255, making 10.200.19.254 the last usable host. The address 10.200.16.254 incorrectly assumes a /24 boundary, and 10.200.23.254 would be correct for a /21, which spans eight third-octet values."
  },
  {
    id: "nf-025",
    domain: "Network Fundamentals",
    type: "single",
    question: "A network design requires each branch subnet to support up to 500 hosts while creating as many subnets as possible from 172.22.0.0/16. Which subnet mask should be applied?",
    options: [
      "255.255.255.0",
      "255.255.254.0",
      "255.255.252.0",
      "255.255.128.0"
    ],
    answer: [1],
    explanation: "A 255.255.254.0 (/23) mask provides 2^9 - 2 = 510 usable hosts, the smallest subnet that fits 500 hosts and therefore the one that yields the most subnets from the /16. A /24 provides only 254 hosts, which is too few. A /22 supports 1022 hosts but halves the number of available subnets, and /17 (255.255.128.0) wastes an enormous amount of space."
  },
  {
    id: "nf-026",
    domain: "Network Fundamentals",
    type: "multi",
    question: "Which two statements about the subnet 172.16.32.0 255.255.224.0 are true? (Choose two.)",
    options: [
      "The directed broadcast address is 172.16.63.255",
      "The subnet provides 8190 usable host addresses",
      "The directed broadcast address is 172.16.39.255",
      "The subnet provides 4094 usable host addresses"
    ],
    answer: [0, 1],
    explanation: "The mask 255.255.224.0 is a /19, which spans 32 third-octet values, so 172.16.32.0/19 runs from 172.16.32.0 to 172.16.63.255, making 172.16.63.255 the broadcast address. With 13 host bits, the subnet supports 2^13 - 2 = 8190 hosts. The broadcast 172.16.39.255 would apply to a /21, and 4094 hosts corresponds to a /20."
  },
  {
    id: "nf-027",
    domain: "Network Fundamentals",
    type: "single",
    question: "A junior engineer questions whether the address 172.31.14.255 with mask 255.255.252.0 can be assigned to a server. Which statement is correct?",
    options: [
      "It is a valid host address because the subnet broadcast address is 172.31.15.255",
      "It is the directed broadcast address of the subnet and cannot be assigned",
      "It is the network address of the subnet and cannot be assigned",
      "Any IPv4 address ending in 255 is reserved and cannot be assigned to a host"
    ],
    answer: [0],
    explanation: "With a /22 mask, the subnet containing this address is 172.31.12.0/22, which spans 172.31.12.0 through 172.31.15.255. The broadcast address is 172.31.15.255, so 172.31.14.255 is an ordinary usable host address. An address ending in 255 is only a broadcast when the mask is /24 or longer; with shorter masks it can be a normal host, which is why the other options are wrong."
  },
  {
    id: "nf-028",
    domain: "Network Fundamentals",
    type: "single",
    question: "An administrator subnets 192.168.100.0/24 using the mask 255.255.255.248 for every subnet. How many subnets are created, and how many usable hosts does each support?",
    options: [
      "32 subnets with 6 usable hosts each",
      "32 subnets with 8 usable hosts each",
      "16 subnets with 14 usable hosts each",
      "8 subnets with 30 usable hosts each"
    ],
    answer: [0],
    explanation: "Moving from /24 to /29 borrows 5 bits, creating 2^5 = 32 subnets. Each /29 has 3 host bits, so 2^3 - 2 = 6 usable hosts after subtracting the network and broadcast addresses. The answer with 8 hosts forgets to subtract the two reserved addresses, while 16/14 and 8/30 correspond to /28 and /27 plans respectively."
  },
  {
    id: "nf-029",
    domain: "Network Fundamentals",
    type: "dragdrop",
    question: "Drag each subnet mask to its matching prefix length.",
    items: [
      "255.255.248.0",
      "255.255.255.224",
      "255.255.255.252",
      "255.255.252.0",
      "255.255.255.248"
    ],
    targets: [
      "/21",
      "/22",
      "/27",
      "/29",
      "/30"
    ],
    answer: [0, 3, 1, 4, 2],
    explanation: "Counting contiguous 1 bits gives each prefix: 255.255.248.0 has 21 ones (/21), 255.255.252.0 has 22 (/22), 255.255.255.224 has 27 (/27), 255.255.255.248 has 29 (/29), and 255.255.255.252 has 30 (/30). The third-octet masks 248 and 252 are easy to confuse with their fourth-octet counterparts, which differ by exactly 8 bits of prefix length."
  },
  {
    id: "nf-030",
    domain: "Network Fundamentals",
    type: "single",
    question: "Hosts 10.1.1.20 and 10.1.1.60 must reside in the same subnet. Which subnet is the smallest one that contains both addresses?",
    options: [
      "10.1.1.0/27",
      "10.1.1.0/26",
      "10.1.1.0/28",
      "10.1.1.0/25"
    ],
    answer: [1],
    explanation: "A /26 block starting at .0 covers addresses .0 through .63, which includes both .20 and .60. A /27 splits that range into .0-.31 and .32-.63, placing the two hosts in different subnets, and a /28 separates them even further. A /25 (.0-.127) also contains both hosts but is larger than necessary, so it is not the smallest valid subnet."
  }
);

(window.QUESTION_BANK = window.QUESTION_BANK || []).push(
  {
    id: "nf-031",
    domain: "Network Fundamentals",
    type: "multi",
    question: "A network uses the mask 255.255.255.224 throughout the 10.10.10.0/24 range. Which three addresses are valid subnet (network) addresses? (Choose three.)",
    options: [
      "10.10.10.64",
      "10.10.10.96",
      "10.10.10.80",
      "10.10.10.160",
      "10.10.10.200"
    ],
    answer: [0, 1, 3],
    explanation: "A /27 mask creates subnets on multiples of 32: .0, .32, .64, .96, .128, .160, .192, and .224. The addresses .64, .96, and .160 fall exactly on those boundaries. The address .80 sits inside the 10.10.10.64/27 subnet and .200 sits inside 10.10.10.192/27, so both are host addresses rather than subnet addresses."
  },
  {
    id: "nf-032",
    domain: "Network Fundamentals",
    type: "single",
    question: "A company must divide the network 192.168.50.0/24 into at least 6 subnets, each supporting a minimum of 25 hosts. Which prefix length satisfies both requirements?",
    options: [
      "/26",
      "/27",
      "/28",
      "/29"
    ],
    answer: [1],
    explanation: "A /27 creates 8 subnets from a /24 (meeting the 6-subnet requirement) and provides 30 usable hosts each (meeting the 25-host requirement). A /26 yields only 4 subnets, which is too few. A /28 creates 16 subnets but supports only 14 hosts each, and a /29 supports just 6 hosts, so neither meets the host requirement."
  },
  {
    id: "nf-033",
    domain: "Network Fundamentals",
    type: "single",
    question: "Refer to the exhibit. Which range of destination addresses does this ACL entry match?",
    exhibit: "access-list 110 permit tcp any 192.168.1.48 0.0.0.7 eq 443",
    options: [
      "192.168.1.48 through 192.168.1.55",
      "192.168.1.48 through 192.168.1.63",
      "192.168.1.49 through 192.168.1.54",
      "192.168.1.40 through 192.168.1.47"
    ],
    answer: [0],
    explanation: "The wildcard 0.0.0.7 ignores the last 3 bits, matching a block of 8 addresses starting at the configured base, so 192.168.1.48 through 192.168.1.55 are matched. The range ending at .63 would require wildcard 0.0.0.15, the range .49-.54 incorrectly excludes the block edges (ACL wildcards match all addresses in the block, including network and broadcast values), and .40-.47 is the previous block of 8."
  },
  {
    id: "nf-034",
    domain: "Network Fundamentals",
    type: "single",
    question: "An ISP allocates the block 203.0.113.0/24 for point-to-point customer links, each addressed as a /30. How many /30 subnets can be created from the block?",
    options: [
      "62",
      "64",
      "128",
      "32"
    ],
    answer: [1],
    explanation: "Going from /24 to /30 borrows 6 bits, producing 2^6 = 64 subnets, each containing 4 addresses with 2 usable hosts. The answer 62 wrongly subtracts two as if subnets were host addresses, 128 corresponds to /31 subnetting, and 32 corresponds to /29 subnetting."
  },
  {
    id: "nf-035",
    domain: "Network Fundamentals",
    type: "single",
    question: "Refer to the exhibit. Which destination IP address is matched by the static route shown?",
    exhibit: "R1# show ip route static\nS     172.25.40.0/21 [1/0] via 10.0.0.2",
    options: [
      "172.25.47.254",
      "172.25.48.1",
      "172.25.39.255",
      "172.25.55.1"
    ],
    answer: [0],
    explanation: "The route 172.25.40.0/21 covers third-octet values 40 through 47, so it matches 172.25.40.0 through 172.25.47.255, which includes 172.25.47.254. The address 172.25.48.1 belongs to the next /21 block, 172.25.39.255 is the last address of the previous block, and 172.25.55.1 would only match if the prefix were /20 or shorter."
  },
  {
    id: "nf-036",
    domain: "Network Fundamentals",
    type: "multi",
    question: "An administrator divides 10.10.0.0/16 into /22 subnets. Which two are valid subnet IDs from this plan? (Choose two.)",
    options: [
      "10.10.8.0",
      "10.10.10.0",
      "10.10.20.0",
      "10.10.6.0"
    ],
    answer: [0, 2],
    explanation: "A /22 increments the third octet in steps of 4, so valid subnet IDs occur at multiples of 4: 0, 4, 8, 12, 16, 20, and so on. Both 10.10.8.0 and 10.10.20.0 fall on those boundaries. The values 10 and 6 are not multiples of 4; 10.10.10.0 lies inside 10.10.8.0/22 and 10.10.6.0 lies inside 10.10.4.0/22."
  },
  {
    id: "nf-037",
    domain: "Network Fundamentals",
    type: "single",
    question: "Refer to the exhibit. Why does the router reject the new address on GigabitEthernet0/1?",
    exhibit: "R1# show ip interface brief | include Gigabit\nGigabitEthernet0/0   10.6.4.1     YES manual up    up\nGigabitEthernet0/1   unassigned   YES unset  up    up\n\nR1(config)# interface GigabitEthernet0/1\nR1(config-if)# ip address 10.6.4.193 255.255.255.192\n% 10.6.4.192 overlaps with GigabitEthernet0/0\n\n! GigabitEthernet0/0 is configured with mask 255.255.254.0",
    options: [
      "The /23 on GigabitEthernet0/0 already includes the entire 10.6.4.192/26 range",
      "10.6.4.193 is the network address of the new subnet",
      "Two interfaces on a router can never use addresses from the same major network",
      "The new mask must match the mask used on GigabitEthernet0/0 exactly"
    ],
    answer: [0],
    explanation: "GigabitEthernet0/0 uses 10.6.4.1/23, which spans 10.6.4.0 through 10.6.5.255 and therefore already contains the proposed 10.6.4.192/26 block. IOS rejects any connected subnet that overlaps another interface. The address .193 is a valid host within a /26, different subnets of the same major network are perfectly legal on different interfaces, and there is no requirement for masks to match between interfaces."
  },
  {
    id: "nf-038",
    domain: "Network Fundamentals",
    type: "single",
    question: "Which representation of the IPv6 address 2001:0db8:0000:0000:0000:00a4:0000:0017 is both valid and maximally compressed?",
    options: [
      "2001:db8::a4:0:17",
      "2001:db8::a4::17",
      "2001:db8:0:0:0:a4::17",
      "2001:db8::a4:17"
    ],
    answer: [0],
    explanation: "The longest run of all-zero groups (three groups) is replaced by ::, and leading zeros in each group are removed, producing 2001:db8::a4:0:17. The form with two :: symbols is invalid because the address length would be ambiguous. Using :: for the single zero group after a4 instead of the longer run is not maximal compression, and 2001:db8::a4:17 deletes a zero group entirely, changing the address."
  },
  {
    id: "nf-039",
    domain: "Network Fundamentals",
    type: "single",
    question: "Refer to the exhibit. The interface is configured for EUI-64 addressing. Which IPv6 address does the router generate on GigabitEthernet0/0?",
    exhibit: "R1# show interfaces GigabitEthernet0/0 | include bia\n  Hardware is iGbE, address is 001a.2b3c.4d5e (bia 001a.2b3c.4d5e)\n\ninterface GigabitEthernet0/0\n ipv6 address 2001:DB8:AA:1::/64 eui-64",
    options: [
      "2001:DB8:AA:1:21A:2BFF:FE3C:4D5E",
      "2001:DB8:AA:1:1A:2BFF:FE3C:4D5E",
      "2001:DB8:AA:1:21A:2BFE:FF3C:4D5E",
      "2001:DB8:AA:1:FFFE:1A:2B3C:4D5E"
    ],
    answer: [0],
    explanation: "EUI-64 splits the MAC 001a.2b3c.4d5e in half, inserts FFFE in the middle (001a:2bFF:FE3c:4d5e), and inverts the seventh bit of the first byte, changing 00 to 02. This yields the interface ID 021a:2bff:fe3c:4d5e, written 21A:2BFF:FE3C:4D5E without leading zeros. The second option skips the bit flip, the third inserts FEFF instead of FFFE, and the fourth places FFFE at the front instead of the middle."
  },
  {
    id: "nf-040",
    domain: "Network Fundamentals",
    type: "single",
    question: "A host is assigned the IPv6 address 2001:db8:1:1:aabb:ccdd:1234:5678. Which solicited-node multicast address does the host join for this address?",
    options: [
      "FF02::1:FF34:5678",
      "FF02::FF34:5678",
      "FF02::1:FF12:3456",
      "FF05::1:FF34:5678"
    ],
    answer: [0],
    explanation: "The solicited-node multicast address is formed by appending the last 24 bits of the unicast address to the prefix FF02::1:FF00:0/104, giving FF02::1:FF34:5678. The option missing the 1: portion does not use the correct /104 prefix, FF02::1:FF12:3456 takes bits from the wrong end of the address, and FF05 is a site-local multicast scope rather than the required link-local scope."
  },
  {
    id: "nf-041",
    domain: "Network Fundamentals",
    type: "single",
    question: "Which IPv6 address is a valid link-local address that a host could assign to its interface automatically?",
    options: [
      "FE80::1AB3:4CD9",
      "FEC0::1AB3:4CD9",
      "FF02::1AB3:4CD9",
      "2001:DB8::1AB3:4CD9"
    ],
    answer: [0],
    explanation: "Link-local addresses come from FE80::/10, so FE80::1AB3:4CD9 is valid and is generated automatically on every IPv6-enabled interface. FEC0::/10 is the deprecated site-local range, FF02:: addresses are link-local multicast destinations and cannot be assigned as interface unicast addresses, and 2001:DB8::/32 is the documentation range within global unicast space."
  },
  {
    id: "nf-042",
    domain: "Network Fundamentals",
    type: "multi",
    question: "Which two statements about IPv6 link-local addresses are true? (Choose two.)",
    options: [
      "One is required on every IPv6-enabled interface",
      "Packets sourced from them are never forwarded by routers to other links",
      "They must be globally unique across the entire network",
      "They are assigned by a DHCPv6 server by default"
    ],
    answer: [0, 1],
    explanation: "Every IPv6 interface must have a link-local address from FE80::/10, and these addresses are valid only on the local segment, so routers never forward traffic using them beyond the link. They only need to be unique on their own link, not globally, and they are self-generated (via EUI-64 or a random ID) rather than assigned by DHCPv6."
  },
  {
    id: "nf-043",
    domain: "Network Fundamentals",
    type: "single",
    question: "A company wants internal-only IPv6 addressing that is routable inside the organization but not on the public internet, similar to RFC 1918 in IPv4. Which address should be used?",
    options: [
      "FD6A:8089:1234::1",
      "FE80::1234:1",
      "2001:DB8:1234::1",
      "FF05::1234:1"
    ],
    answer: [0],
    explanation: "Unique local addresses (ULAs) occupy FC00::/7, and in practice addresses are generated under FD00::/8 with a random global ID, so FD6A:8089:1234::1 fits the requirement. FE80:: addresses are link-local and cannot be routed between internal subnets, 2001:DB8::/32 is the documentation prefix within global unicast space, and FF05:: is a multicast scope, not unicast addressing."
  },
  {
    id: "nf-044",
    domain: "Network Fundamentals",
    type: "single",
    question: "A host must discover its default gateway by sending a Router Solicitation. To which IPv6 multicast group does it send the message so that only routers process it?",
    options: [
      "FF02::2",
      "FF02::1",
      "FF02::5",
      "FF02::A"
    ],
    answer: [0],
    explanation: "All IPv6 routers on a link join the all-routers multicast group FF02::2, which is where hosts send Router Solicitations. FF02::1 is the all-nodes group, which every IPv6 device joins, so using it would deliver the message to all hosts rather than only routers. FF02::5 is used by OSPFv3 routers and FF02::A by EIGRP, both for routing protocol traffic rather than neighbor discovery."
  },
  {
    id: "nf-045",
    domain: "Network Fundamentals",
    type: "dragdrop",
    question: "Drag each IPv6 prefix to the address type it identifies.",
    items: [
      "2000::/3",
      "FC00::/7",
      "FE80::/10",
      "FF00::/8",
      "::1/128"
    ],
    targets: [
      "Link-local unicast",
      "Global unicast",
      "Multicast",
      "Unique local unicast",
      "Loopback"
    ],
    answer: [2, 0, 3, 1, 4],
    explanation: "FE80::/10 defines link-local unicast addresses required on every interface, 2000::/3 is the current global unicast allocation, FF00::/8 covers all multicast addresses, FC00::/7 defines unique local (private) unicast space, and ::1/128 is the loopback address equivalent to 127.0.0.1 in IPv4. Confusing FE80 with FC00 is common because both are non-global unicast ranges."
  }
);
