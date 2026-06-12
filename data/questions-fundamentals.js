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
