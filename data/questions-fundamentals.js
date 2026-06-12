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
(window.QUESTION_BANK = window.QUESTION_BANK || []).push(
  {
    id: "nf-046",
    domain: "Network Fundamentals",
    type: "multi",
    question: "Which two capabilities distinguish a next-generation firewall from a traditional stateful firewall? (Choose two.)",
    options: [
      "Application-layer (Layer 7) inspection that identifies traffic regardless of port",
      "Integrated intrusion prevention that blocks traffic matching attack signatures",
      "Stateful tracking of TCP sessions in a connection table",
      "Packet filtering based on source and destination IP addresses"
    ],
    answer: [0, 1],
    explanation: "An NGFW adds application visibility and control (identifying applications even when they use nonstandard ports) and an integrated IPS engine on top of classic firewall functions. Stateful session tracking and IP-based packet filtering are not differentiators because traditional stateful firewalls already perform both of those functions."
  },
  {
    id: "nf-047",
    domain: "Network Fundamentals",
    type: "single",
    question: "A campus deploys 200 lightweight access points. Which function does the wireless LAN controller provide in this design?",
    options: [
      "It centrally manages AP configuration, security policies, and RF channel/power assignments through CAPWAP tunnels",
      "It converts the lightweight APs to autonomous mode so each AP can be managed individually",
      "It provides PoE power to each access point over the CAPWAP tunnel",
      "It replaces the need for a DHCP server by assigning addresses to all wireless clients"
    ],
    answer: [0],
    explanation: "Lightweight APs build CAPWAP tunnels to the WLC, which centralizes configuration, security policy, client authentication handling, and dynamic RF management for all APs. The WLC does not convert APs to autonomous mode; that is the opposite of the lightweight model. PoE is delivered by the access switch over the physical cable, not over CAPWAP, and DHCP services are provided by a DHCP server, not inherently by the controller."
  },
  {
    id: "nf-048",
    domain: "Network Fundamentals",
    type: "multi",
    question: "Which two functions does Cisco Catalyst Center (formerly DNA Center) provide in an enterprise network? (Choose two.)",
    options: [
      "Centralized automation and intent-based provisioning of network device configurations",
      "Assurance analytics that use telemetry from devices to identify network health issues",
      "Termination of CAPWAP tunnels from lightweight access points",
      "Acting as the default gateway for campus VLANs"
    ],
    answer: [0, 1],
    explanation: "Catalyst Center is a controller and analytics platform: it automates device provisioning based on expressed intent and provides Assurance, which analyzes streaming telemetry to surface client, device, and application issues. CAPWAP tunnels terminate on a wireless LAN controller, not on Catalyst Center, and default gateway services are provided by routers or Layer 3 switches in the data path."
  },
  {
    id: "nf-049",
    domain: "Network Fundamentals",
    type: "single",
    question: "An engineer must enable routing between VLAN 10 and VLAN 20 in a wiring closet without installing a separate router. Which device capability satisfies the requirement?",
    options: [
      "A Layer 3 switch configured with switched virtual interfaces for each VLAN",
      "A Layer 2 switch with both VLANs allowed on a trunk port",
      "A Layer 2 switch with the two VLANs merged into a single VLAN",
      "A wireless LAN controller bridging the two VLANs"
    ],
    answer: [0],
    explanation: "A Layer 3 switch can route between VLANs internally using SVIs (interface vlan 10, interface vlan 20), eliminating the need for an external router. A Layer 2 switch only forwards frames within VLANs; trunking carries multiple VLANs but performs no routing between them. Merging the VLANs removes the segmentation rather than routing between the existing VLANs, and a WLC is not an inter-VLAN routing device for wired closets."
  },
  {
    id: "nf-050",
    domain: "Network Fundamentals",
    type: "single",
    question: "A new access point requires 25 W of power and must be powered over its Ethernet cable from the access switch. Which standard must the switch port support?",
    options: [
      "802.3at (PoE+), which delivers up to 30 W at the PSE",
      "802.3af (PoE), which delivers up to 15.4 W at the PSE",
      "802.1Q, which delivers power over the trunk VLAN",
      "802.3ab, which delivers power over 1000BASE-T links"
    ],
    answer: [0],
    explanation: "802.3at (PoE+) supplies up to 30 W from the power sourcing equipment, which covers the 25 W requirement. 802.3af is limited to 15.4 W at the PSE (about 12.95 W at the device), which is insufficient. 802.1Q is the VLAN tagging standard and 802.3ab defines 1000BASE-T signaling; neither defines power delivery."
  },
  {
    id: "nf-051",
    domain: "Network Fundamentals",
    type: "dragdrop",
    question: "Drag each network device to the function it performs.",
    items: [
      "IPS",
      "wireless LAN controller",
      "router",
      "Layer 2 switch",
      "next-generation firewall"
    ],
    targets: [
      "Makes forwarding decisions based on destination IP addresses between networks",
      "Forwards frames within a LAN based on destination MAC addresses",
      "Enforces security policy with application-level (Layer 7) traffic inspection",
      "Centrally manages configuration and RF settings for lightweight APs",
      "Sits inline, matches traffic against attack signatures, and drops malicious packets"
    ],
    answer: [2, 3, 4, 1, 0],
    explanation: "Routers route packets between networks using destination IP addresses, while Layer 2 switches forward frames inside a LAN using MAC addresses. An NGFW enforces policy with deep, application-aware inspection, a WLC centrally manages lightweight APs over CAPWAP, and an IPS sits inline to drop traffic that matches known attack signatures. Confusing the NGFW and IPS is common; the IPS is focused on signature-based threat blocking, while the NGFW is the broader policy enforcement point."
  },
  {
    id: "nf-052",
    domain: "Network Fundamentals",
    type: "single",
    question: "Refer to the exhibit. A data center uses the architecture shown. To which switches do the servers connect?",
    exhibit: "        Spine1        Spine2\n        /  |  \\       /  |  \\\n       /   |   \\     /   |   \\\n   Leaf1  Leaf2  Leaf3  (each leaf connects\n                         to every spine)",
    options: [
      "Only to the leaf switches",
      "Only to the spine switches",
      "To both the spine and leaf switches for redundancy",
      "Directly to the core layer above the spines"
    ],
    answer: [0],
    explanation: "In a spine-leaf fabric, endpoints such as servers attach only to leaf switches; the spine layer interconnects the leaves and carries no host connections. Attaching servers to spines would break the uniform any-leaf-to-any-leaf forwarding model that gives the design its predictable latency. There is no separate core layer above the spines in a standard two-tier spine-leaf fabric."
  },
  {
    id: "nf-053",
    domain: "Network Fundamentals",
    type: "single",
    question: "Refer to the exhibit. A small campus is built as shown, with the access switches dual-homed to a pair of switches that also terminate the WAN router. Which network design does this represent?",
    exhibit: "            WAN Router\n                |\n        +-------+-------+\n        |               |\n     SwitchA --------- SwitchB   (combined core/distribution)\n      |   \\            /   |\n      |    \\          /    |\n   Access1   \\      /    Access2\n              Access3",
    options: [
      "Two-tier collapsed core",
      "Three-tier hierarchical design",
      "Spine-leaf fabric",
      "Full mesh WAN topology"
    ],
    answer: [0],
    explanation: "When the core and distribution functions are combined into a single switch pair that aggregates the access layer and connects to the WAN, the design is a two-tier or collapsed core architecture, common in small and midsize campuses. A three-tier design would have separate distribution and core layers. It is not spine-leaf because the access switches do not each connect to every upstream switch in a uniform fabric role, and the diagram shows a LAN hierarchy, not a WAN mesh."
  },
  {
    id: "nf-054",
    domain: "Network Fundamentals",
    type: "multi",
    question: "Which two statements about a spine-leaf architecture are true? (Choose two.)",
    options: [
      "Every leaf switch connects to every spine switch",
      "Traffic between any two leaf switches crosses a single spine, giving predictable latency",
      "Spine switches are interconnected with high-speed links to each other",
      "End hosts attach to the spine layer for the shortest path"
    ],
    answer: [0, 1],
    explanation: "The defining rules of spine-leaf are that each leaf uplinks to every spine and that any leaf-to-leaf path is exactly leaf-spine-leaf, which makes east-west latency consistent. Spines do not connect to each other in a standard fabric, because all forwarding flows through leaf-spine paths. Hosts never attach to spines; they attach only to leaf switches."
  },
  {
    id: "nf-055",
    domain: "Network Fundamentals",
    type: "single",
    question: "Which characteristic describes a typical SOHO network deployment?",
    options: [
      "A single integrated device provides routing, switching, wireless access, and basic firewall functions",
      "Separate dedicated appliances are used for routing, security, and wireless control",
      "A spine-leaf fabric interconnects redundant access switches",
      "Dual WAN routers run first-hop redundancy protocols for gateway failover"
    ],
    answer: [0],
    explanation: "Small office/home office networks usually rely on one multifunction device that combines router, switch, access point, and firewall/NAT functions to minimize cost and complexity. Dedicated appliances per function, spine-leaf fabrics, and redundant gateway designs with FHRPs are characteristics of enterprise and data center networks, not SOHO environments."
  },
  {
    id: "nf-056",
    domain: "Network Fundamentals",
    type: "single",
    question: "A company connects six branch routers in a full mesh WAN so that every router has a direct link to every other router. How many point-to-point links are required?",
    options: [
      "6",
      "12",
      "15",
      "30"
    ],
    answer: [2],
    explanation: "A full mesh of n nodes requires n(n-1)/2 links, so six routers need 6 x 5 / 2 = 15 links. The value 30 results from forgetting to divide by two (counting each link twice), 12 would be a partial mesh count, and 6 corresponds to a ring or hub-and-spoke style topology rather than a full mesh."
  },
  {
    id: "nf-057",
    domain: "Network Fundamentals",
    type: "dragdrop",
    question: "Drag each network layer or role to its primary function.",
    items: [
      "core layer",
      "leaf switch",
      "access layer",
      "spine switch",
      "distribution layer"
    ],
    targets: [
      "Connects end devices and supplies PoE to phones and APs",
      "Aggregates access switches and enforces routing and policy boundaries",
      "Provides a fast, resilient backbone between distribution blocks",
      "Connects servers and uplinks to every switch in the fabric backbone",
      "Forms the data center backbone that interconnects all leaf switches"
    ],
    answer: [2, 4, 0, 1, 3],
    explanation: "In the campus hierarchy, the access layer terminates endpoints and provides PoE, the distribution layer aggregates access switches and applies policy, and the core provides fast transport between distribution blocks. In the data center, leaf switches connect servers and uplink to all spines, while spine switches form the backbone interconnecting the leaves. Mixing up distribution and core is common; remember the core is kept simple and fast while policy lives at distribution."
  },
  {
    id: "nf-058",
    domain: "Network Fundamentals",
    type: "single",
    question: "A company decommissions its on-premises email servers and subscribes to Microsoft 365 so that employees access mail through a provider-hosted application. Which cloud service model is the company consuming?",
    options: [
      "SaaS",
      "IaaS",
      "PaaS",
      "Private cloud"
    ],
    answer: [0],
    explanation: "With Software as a Service, the provider hosts and operates the complete application, and the customer simply consumes it, which matches subscribing to hosted email. IaaS would give the company raw compute, storage, and networking on which it would still install and run its own mail servers, and PaaS provides a development platform for building applications. Private cloud describes who owns the infrastructure, not the service model being consumed here."
  },
  {
    id: "nf-059",
    domain: "Network Fundamentals",
    type: "multi",
    question: "Which two are essential characteristics of cloud computing as defined by NIST? (Choose two.)",
    options: [
      "On-demand self-service provisioning of resources",
      "Rapid elasticity that scales resources up and down with demand",
      "Dedicated physical hardware assigned permanently to each customer",
      "A requirement that all workloads run in a public provider's facility"
    ],
    answer: [0, 1],
    explanation: "NIST's essential cloud characteristics include on-demand self-service, rapid elasticity, broad network access, resource pooling, and measured service. Resource pooling means hardware is shared among tenants, so permanently dedicated physical hardware is the opposite of the model. Cloud also does not require a public provider; private and hybrid clouds are valid deployment models."
  },
  {
    id: "nf-060",
    domain: "Network Fundamentals",
    type: "single",
    question: "Refer to the exhibit. A company builds its WAN as shown. Which statement about this topology is true?",
    exhibit: "            HQ Router\n           /    |    \\\n          /     |     \\\n     Branch1 Branch2 Branch3\n  (no links exist between branch sites)",
    options: [
      "It is a hub-and-spoke topology, and traffic between branches must transit the HQ router",
      "It is a full mesh topology that provides a direct path between all sites",
      "It is a hub-and-spoke topology, and branches communicate directly with each other",
      "It is a partial mesh topology with redundant paths from each branch"
    ],
    answer: [0],
    explanation: "With every branch connected only to HQ, the design is hub-and-spoke, so any branch-to-branch traffic must hairpin through the hub, adding latency and making HQ a single point of failure. A full mesh would require direct links between all sites, and a partial mesh would add at least some branch-to-branch links. The option claiming branches communicate directly contradicts the topology, since no spoke-to-spoke links exist."
  }
);
(window.QUESTION_BANK = window.QUESTION_BANK || []).push(
  {
    id: "nf-061",
    domain: "Network Fundamentals",
    type: "single",
    question: "An engineer must connect two campus buildings that are 10 km apart with a 1 Gbps fiber link. Which media and transceiver combination is appropriate?",
    options: [
      "Single-mode fiber with 1000BASE-LX/LH SFPs",
      "Multimode fiber with 1000BASE-SX SFPs",
      "Cat6a UTP with 1000BASE-T SFPs",
      "Multimode fiber with 1000BASE-T SFPs"
    ],
    answer: [0],
    explanation: "At 10 km, only single-mode fiber works; 1000BASE-LX/LH optics over SMF support distances up to 10 km. 1000BASE-SX over multimode fiber is limited to roughly 550 m, far short of the requirement. Copper UTP of any category is limited to 100 m, and 1000BASE-T transceivers terminate copper, not multimode fiber."
  },
  {
    id: "nf-062",
    domain: "Network Fundamentals",
    type: "single",
    question: "A workstation requires a 10 Gbps copper connection over a 90 m horizontal cable run. Which cable category is the minimum that supports this requirement?",
    options: [
      "Cat6a",
      "Cat6",
      "Cat5e",
      "Cat3"
    ],
    answer: [0],
    explanation: "Cat6a supports 10GBASE-T at the full 100 m channel length, so it covers a 90 m run. Cat6 is the tempting distractor, but it supports 10GBASE-T only to about 37-55 m depending on alien crosstalk conditions, which fails at 90 m. Cat5e tops out at 1 Gbps (and 2.5/5GBASE-T in some cases), and Cat3 is limited to 10 Mbps Ethernet and voice."
  },
  {
    id: "nf-063",
    domain: "Network Fundamentals",
    type: "multi",
    question: "A switch interface reports a steadily increasing number of late collisions. Which two conditions can cause this counter to increment? (Choose two.)",
    options: [
      "A duplex mismatch between the two ends of the link",
      "A cable segment that exceeds the maximum allowed length",
      "A speed mismatch that prevents the link from negotiating",
      "Excessive broadcast traffic in the VLAN"
    ],
    answer: [0, 1],
    explanation: "Late collisions occur after the first 64 bytes of a frame have been transmitted, which legitimately happens only when a duplex mismatch makes one side transmit while the other believes it owns the wire, or when the physical segment is so long that the collision signal arrives too late. A speed mismatch on hard-coded ports prevents the link from coming up at all rather than causing late collisions, and broadcast traffic is valid traffic that does not create collisions on a properly operating link."
  },
  {
    id: "nf-064",
    domain: "Network Fundamentals",
    type: "single",
    question: "Refer to the exhibit. Users on this port report intermittent slowness. What is the most likely cause of the output shown?",
    exhibit: "Switch# show interfaces FastEthernet0/4\nFastEthernet0/4 is up, line protocol is up\n  Full-duplex, 100Mb/s, media type is 10/100BaseTX\n  5 minute input rate 184000 bits/sec, 41 packets/sec\n     7421 input errors, 6918 CRC, 0 frame, 0 overrun, 0 ignored\n     503 runts, 0 giants, 0 throttles\n     0 output errors, 0 collisions, 0 late collisions",
    options: [
      "The remote end of the link is operating in half-duplex (duplex mismatch)",
      "The interface is administratively shut down",
      "The port has negotiated the wrong speed and the link is down",
      "Spanning tree has placed the port in a blocking state"
    ],
    answer: [0],
    explanation: "A full-duplex port facing a half-duplex peer receives frames that the peer truncated when it detected what it believed were collisions, which appears on the full-duplex side as incrementing CRC errors and runts while its own collision counters stay at zero. The interface is clearly up/up, so it is neither shut down nor failed speed negotiation. A blocking spanning-tree state would stop user traffic entirely rather than corrupt frames."
  },
  {
    id: "nf-065",
    domain: "Network Fundamentals",
    type: "single",
    question: "Refer to the exhibit. Both ends of this link are confirmed to be hard-coded to full duplex and 1000 Mbps. What is the most likely cause of the errors?",
    exhibit: "Switch# show interfaces GigabitEthernet0/2\nGigabitEthernet0/2 is up, line protocol is up\n  Full-duplex, 1000Mb/s, link type is force-up\n     12904 input errors, 12877 CRC, 0 frame\n     0 runts, 0 giants\n     0 output errors, 0 collisions, 0 late collisions",
    options: [
      "A damaged cable or electromagnetic interference is corrupting frames in transit",
      "A duplex mismatch is causing the far end to abort transmissions",
      "The MAC address table has overflowed",
      "The interface MTU is set lower than the frame size"
    ],
    answer: [0],
    explanation: "When CRC and input errors increment on a link verified to match in speed and duplex, the frames are being corrupted on the wire, which points to a faulty cable, bad connector, marginal transceiver, or EMI near the cable path. A duplex mismatch is ruled out because both sides are hard-coded full duplex and no runts or collisions appear. MAC table overflow causes flooding, not CRC errors, and an MTU problem would show giants or drops rather than failed checksums."
  },
  {
    id: "nf-066",
    domain: "Network Fundamentals",
    type: "single",
    question: "An engineer connects two older switches together with a copper patch cable, but neither switch supports auto-MDIX and the link stays down. Which cable resolves the problem?",
    options: [
      "A crossover cable that swaps the transmit and receive pairs",
      "A straight-through cable wired identically on both ends",
      "A rollover cable wired in reverse pin order",
      "A coaxial cable with BNC connectors"
    ],
    answer: [0],
    explanation: "Like devices such as two switches transmit on the same pins, so without auto-MDIX a crossover cable is required to connect transmit pins on one side to receive pins on the other. A straight-through cable is used between unlike devices, such as a switch and a host or router. A rollover cable is for console access to the RJ-45 console port, and coaxial cable is not used for switch-to-switch Ethernet uplinks."
  },
  {
    id: "nf-067",
    domain: "Network Fundamentals",
    type: "dragdrop",
    question: "Drag each interface error counter to the condition it indicates.",
    items: [
      "late collisions",
      "CRC errors",
      "runts",
      "giants"
    ],
    targets: [
      "Frames received that are smaller than 64 bytes",
      "Frames received that exceed the maximum allowed size",
      "Frames received that failed the frame check sequence",
      "Collisions detected after the first 64 bytes of a frame were sent"
    ],
    answer: [2, 3, 1, 0],
    explanation: "Runts are frames under the 64-byte Ethernet minimum, often fragments produced by collisions, while giants exceed the maximum frame size, frequently due to an MTU mismatch. CRC errors mean the frame check sequence failed, indicating corruption from bad cabling, EMI, or duplex problems. Late collisions occur after the 64-byte slot time has passed and point to duplex mismatches or cable runs that are too long."
  },
  {
    id: "nf-068",
    domain: "Network Fundamentals",
    type: "single",
    question: "Refer to the exhibit. The switch receives a frame on Gi0/1 in VLAN 10 destined to MAC address 0050.7966.cc0a. What does the switch do with the frame?",
    exhibit: "Switch# show mac address-table dynamic\n          Mac Address Table\n-------------------------------------------\nVlan    Mac Address       Type        Ports\n----    -----------       --------    -----\n  10    0050.7966.aa01    DYNAMIC     Gi0/1\n  10    0050.7966.bb02    DYNAMIC     Gi0/2\n  20    0050.7966.cc0a    DYNAMIC     Gi0/5",
    options: [
      "It floods the frame out all VLAN 10 ports except Gi0/1",
      "It forwards the frame out Gi0/5 where the MAC address is learned",
      "It drops the frame because the destination is in a different VLAN",
      "It sends the frame to the default gateway for routing"
    ],
    answer: [0],
    explanation: "MAC address table lookups are performed per VLAN, and 0050.7966.cc0a is learned only in VLAN 20, so for a VLAN 10 frame the destination is an unknown unicast. A switch floods unknown unicast frames out every port in the same VLAN except the ingress port. It does not forward out Gi0/5 because that entry belongs to VLAN 20, it does not silently drop unknown unicasts, and a Layer 2 switch does not redirect frames to a gateway."
  },
  {
    id: "nf-069",
    domain: "Network Fundamentals",
    type: "single",
    question: "How does a switch populate its MAC address table?",
    options: [
      "It records the source MAC address of each received frame along with the ingress port and VLAN",
      "It records the destination MAC address of each received frame along with the egress port",
      "It queries each connected host with an ARP request during boot",
      "It downloads the table from the neighboring switches using CDP"
    ],
    answer: [0],
    explanation: "Switches learn by examining the source MAC address of incoming frames and binding it to the receiving port and VLAN; destinations are then looked up against these learned entries. Recording destination addresses is backwards, since the destination tells the switch where to send, not where a host lives. ARP is used by hosts and routers to resolve IP-to-MAC mappings, not by switches to build their tables, and CDP shares device information, not MAC address tables."
  },
  {
    id: "nf-070",
    domain: "Network Fundamentals",
    type: "multi",
    question: "A switch receives a frame on port Gi0/3 with destination MAC FFFF.FFFF.FFFF and an unknown source MAC. Which two actions does the switch take? (Choose two.)",
    options: [
      "It forwards the frame out all ports in the same VLAN except Gi0/3",
      "It adds the frame's source MAC address to the MAC address table for Gi0/3",
      "It drops the frame because the destination address is invalid",
      "It forwards the frame out all ports in every VLAN"
    ],
    answer: [0, 1],
    explanation: "A destination of FFFF.FFFF.FFFF is the broadcast address, which the switch floods to every port in the same VLAN except the one on which it arrived; simultaneously, it learns the unknown source MAC against the ingress port. Broadcasts are valid Layer 2 traffic and are never dropped for being broadcast. Flooding never crosses VLAN boundaries, since each VLAN is a separate broadcast domain."
  },
  {
    id: "nf-071",
    domain: "Network Fundamentals",
    type: "single",
    question: "Refer to the exhibit. Gi0/9 connects to a server NIC that is hard-coded to 100 Mbps full duplex, and the cable has tested good. Why does the link fail to come up?",
    exhibit: "Switch# show running-config interface GigabitEthernet0/9\ninterface GigabitEthernet0/9\n speed 1000\n duplex full\n!\nSwitch# show interfaces GigabitEthernet0/9 status\nPort      Name   Status       Vlan  Duplex  Speed Type\nGi0/9            notconnect   30    full    1000  10/100/1000BaseTX",
    options: [
      "The switch port and the server NIC are hard-coded to different speeds, so the link cannot establish",
      "A duplex mismatch is causing late collisions that keep the port down",
      "The cable is a straight-through type when a crossover is required",
      "VLAN 30 has not been created on the switch"
    ],
    answer: [0],
    explanation: "With autonegotiation disabled on both ends, the speeds must match exactly; a port forced to 1000 Mbps cannot synchronize with a NIC forced to 100 Mbps, so the link never comes up and shows notconnect. A duplex mismatch produces an up/up link with errors, not a down link. The cable has tested good and modern gigabit ports support auto-MDIX, and a missing VLAN affects forwarding, not physical link establishment."
  },
  {
    id: "nf-072",
    domain: "Network Fundamentals",
    type: "single",
    question: "A host has been silent on the network for several minutes, and its dynamic entry has disappeared from the switch MAC address table. What is the default aging time that caused the entry to be removed?",
    options: [
      "300 seconds",
      "30 seconds",
      "3600 seconds",
      "Dynamic entries never age out until the port goes down"
    ],
    answer: [0],
    explanation: "Cisco switches age out dynamic MAC entries after 300 seconds (5 minutes) without receiving a frame from that source address. After removal, frames destined to that MAC are flooded as unknown unicast until the host transmits again and is relearned. The 30-second value is closer to spanning-tree timers, 3600 seconds is not a default, and only static entries persist regardless of activity."
  },
  {
    id: "nf-073",
    domain: "Network Fundamentals",
    type: "dragdrop",
    question: "Drag each cable or media type to the scenario where it is the appropriate choice.",
    items: [
      "rollover cable",
      "multimode fiber",
      "coaxial cable",
      "single-mode fiber",
      "Cat6a UTP"
    ],
    targets: [
      "A 40 km metro link between two data centers",
      "A 400 m link between two buildings on the same campus",
      "A 10 Gbps link to a desktop located 80 m from the closet",
      "Console access to the RJ-45 console port of a router",
      "The drop from a cable modem to the provider's plant"
    ],
    answer: [3, 1, 4, 0, 2],
    explanation: "Single-mode fiber with long-reach optics is the only option for a 40 km span, while multimode fiber economically covers campus distances up to a few hundred meters. Cat6a UTP carries 10GBASE-T to 100 m for desktop drops, a rollover cable is purpose-built for RJ-45 console access, and coaxial cable connects cable modems to the DOCSIS provider network. Swapping SMF and MMF is the classic error; MMF cannot reach 40 km."
  },
  {
    id: "nf-074",
    domain: "Network Fundamentals",
    type: "single",
    question: "An engineer needs a cost-effective transceiver for a 1 Gbps link over existing multimode fiber between two switches 300 m apart. Which SFP should be used?",
    options: [
      "1000BASE-SX",
      "1000BASE-ZX",
      "1000BASE-T",
      "100BASE-FX"
    ],
    answer: [0],
    explanation: "1000BASE-SX is the short-reach gigabit optic designed for multimode fiber and covers up to roughly 550 m, making it the economical fit for a 300 m MMF run. 1000BASE-ZX is a long-haul single-mode optic reaching about 70 km and would be wasted here besides being mismatched to MMF. 1000BASE-T is a copper transceiver limited to 100 m of UTP, and 100BASE-FX only provides 100 Mbps, failing the gigabit requirement."
  },
  {
    id: "nf-075",
    domain: "Network Fundamentals",
    type: "multi",
    question: "Which two advantages does fiber-optic cabling provide over copper UTP cabling? (Choose two.)",
    options: [
      "Immunity to electromagnetic interference",
      "Support for much longer distances between devices",
      "Lower cost of termination tools and connectors",
      "The ability to deliver PoE to attached devices"
    ],
    answer: [0, 1],
    explanation: "Fiber transmits light rather than electrical signals, so it is immune to EMI and crosstalk, and it spans distances from hundreds of meters on multimode to tens of kilometers on single-mode, far beyond copper's 100 m limit. Fiber termination is actually more expensive and skill-intensive than copper, and PoE requires electrical conductors, so power delivery is an advantage of copper, not fiber."
  }
);
(window.QUESTION_BANK = window.QUESTION_BANK || []).push(
  {
    id: "nf-076",
    domain: "Network Fundamentals",
    type: "single",
    question: "Refer to the exhibit. A host with IP address 10.40.17.130 sends traffic toward the router. Which interface's directly connected subnet contains this host?",
    exhibit: "R1# show ip interface brief | exclude unassigned\nInterface              IP-Address      OK? Method Status   Protocol\nGigabitEthernet0/0     10.40.12.1      YES manual up       up    (/22)\nGigabitEthernet0/1     10.40.16.1      YES manual up       up    (/23)\nGigabitEthernet0/2     10.40.18.1      YES manual up       up    (/24)",
    options: [
      "GigabitEthernet0/1",
      "GigabitEthernet0/0",
      "GigabitEthernet0/2",
      "None of the connected subnets contains the host"
    ],
    answer: [0],
    explanation: "Gi0/1 is 10.40.16.0/23, which spans 10.40.16.0 through 10.40.17.255, so 10.40.17.130 falls inside it. Gi0/0 is 10.40.12.0/22, covering only 10.40.12.0 through 10.40.15.255, and Gi0/2 is 10.40.18.0/24, covering 10.40.18.0 through 10.40.18.255. The trap is assuming the /23 covers only the 10.40.16.x third octet; a /23 includes two consecutive third-octet values."
  },
  {
    id: "nf-077",
    domain: "Network Fundamentals",
    type: "single",
    question: "Refer to the exhibit. An engineer must allocate the lowest-numbered available subnet from 192.168.40.0/24 for a new VLAN that requires 10 hosts. Which subnet should be assigned?",
    exhibit: "Current allocations from 192.168.40.0/24:\n  192.168.40.0/26    - Data VLAN (in use)\n  192.168.40.64/27   - Voice VLAN (in use)\n  192.168.40.96/28   - Printers   (in use)\n  remaining space    - unallocated",
    options: [
      "192.168.40.112/28",
      "192.168.40.96/28",
      "192.168.40.112/29",
      "192.168.40.128/28"
    ],
    answer: [0],
    explanation: "Ten hosts require 14 usable addresses, which means a /28 (a /29 provides only 6 usable addresses and is too small). The existing allocations consume addresses up through 192.168.40.111, so the lowest available block on a valid /28 boundary is 192.168.40.112/28. 192.168.40.96/28 is already assigned to printers, and 192.168.40.128/28 is free but is not the lowest-numbered available subnet."
  },
  {
    id: "nf-078",
    domain: "Network Fundamentals",
    type: "dragdrop",
    question: "A network is being designed with VLSM. Drag each prefix length to the requirement it satisfies most efficiently.",
    items: [
      "/27",
      "/30",
      "/25",
      "/28",
      "/26"
    ],
    targets: [
      "Department subnet with 100 hosts",
      "Department subnet with 50 hosts",
      "Voice VLAN with 20 phones",
      "Management network with 10 devices",
      "Point-to-point WAN link between two routers"
    ],
    answer: [2, 4, 0, 3, 1],
    explanation: "A /25 provides 126 usable addresses for 100 hosts, a /26 provides 62 for 50 hosts, a /27 provides 30 for 20 phones, a /28 provides 14 for 10 devices, and a /30 provides exactly the 2 addresses needed for a point-to-point link. Each smaller requirement must use the next longer prefix that still fits; choosing one size larger than necessary wastes address space, which defeats the purpose of VLSM."
  },
  {
    id: "nf-079",
    domain: "Network Fundamentals",
    type: "single",
    question: "Refer to the exhibit. Which range of source addresses does this access list entry match?",
    exhibit: "R2# show running-config | include access-list 25\naccess-list 25 permit 172.16.50.32 0.0.0.31",
    options: [
      "172.16.50.32 through 172.16.50.63",
      "172.16.50.32 through 172.16.50.47",
      "172.16.50.0 through 172.16.50.31",
      "172.16.50.32 through 172.16.50.95"
    ],
    answer: [0],
    explanation: "The wildcard 0.0.0.31 ignores the low-order 5 bits, matching a block of 32 addresses beginning at the listed address, so the range is 172.16.50.32 through 172.16.50.63. The range ending at .47 would correspond to wildcard 0.0.0.15, the range starting at .0 ignores the base address given in the entry, and a 64-address span ending at .95 would require wildcard 0.0.0.63."
  },
  {
    id: "nf-080",
    domain: "Network Fundamentals",
    type: "single",
    question: "How many usable host addresses are available in a subnet that uses the mask 255.255.254.0?",
    options: [
      "510",
      "254",
      "512",
      "1022"
    ],
    answer: [0],
    explanation: "255.255.254.0 is a /23, leaving 9 host bits: 2^9 = 512 total addresses, minus the network and broadcast addresses leaves 510 usable. The value 512 forgets to subtract those two reserved addresses, 254 corresponds to a /24, and 1022 corresponds to a /22. Counting host bits carefully and always subtracting two is the key step."
  },
  {
    id: "nf-081",
    domain: "Network Fundamentals",
    type: "multi",
    question: "Refer to the exhibit. Which two addresses can be assigned to hosts in the subnet configured on interface Vlan30? (Choose two.)",
    exhibit: "Switch# show running-config interface Vlan30\ninterface Vlan30\n ip address 172.25.12.1 255.255.254.0\nend",
    options: [
      "172.25.12.255",
      "172.25.13.254",
      "172.25.13.255",
      "172.25.14.1",
      "172.25.12.0"
    ],
    answer: [0, 1],
    explanation: "The subnet 172.25.12.0/23 spans 172.25.12.0 through 172.25.13.255, with usable hosts from 172.25.12.1 to 172.25.13.254. That makes 172.25.12.255 a perfectly valid host address in a /23 (it only looks like a broadcast if you assume /24) and 172.25.13.254 the last usable host. 172.25.13.255 is the actual broadcast address, 172.25.12.0 is the network address, and 172.25.14.1 lies in the next subnet."
  },
  {
    id: "nf-082",
    domain: "Network Fundamentals",
    type: "single",
    question: "Refer to the exhibit. Based on the workstation's IP configuration, what is the broadcast address of the subnet to which it belongs?",
    exhibit: "C:\\> ipconfig\n\nEthernet adapter Ethernet0:\n   IPv4 Address. . . . . . . . . . . : 192.168.10.77\n   Subnet Mask . . . . . . . . . . . : 255.255.255.192\n   Default Gateway . . . . . . . . . : 192.168.10.65",
    options: [
      "192.168.10.127",
      "192.168.10.255",
      "192.168.10.95",
      "192.168.10.126"
    ],
    answer: [0],
    explanation: "The /26 mask creates blocks of 64: .0, .64, .128, .192. The address 192.168.10.77 falls in the 192.168.10.64/26 subnet, whose broadcast is 192.168.10.127. The address 192.168.10.255 would be the broadcast only if the mask were /24, .95 is the broadcast of a /27 block starting at .64, and .126 is the last usable host of the /26 rather than its broadcast."
  },
  {
    id: "nf-083",
    domain: "Network Fundamentals",
    type: "single",
    question: "A subnet must support 120 hosts plus a default gateway. Which prefix length creates the smallest subnet that meets the requirement?",
    options: [
      "/25",
      "/26",
      "/24",
      "/23"
    ],
    answer: [0],
    explanation: "The requirement is 121 addresses in total, and a /25 provides 126 usable hosts, which fits with minimal waste. A /26 provides only 62 usable addresses and is too small. A /24 (254 usable) and a /23 (510 usable) both work but waste large amounts of space, so they are not the smallest valid subnet."
  },
  {
    id: "nf-084",
    domain: "Network Fundamentals",
    type: "single",
    question: "Refer to the exhibit. What is the last usable host address in the subnet configured on interface GigabitEthernet0/3?",
    exhibit: "R4# show running-config interface GigabitEthernet0/3\ninterface GigabitEthernet0/3\n ip address 172.22.64.1 255.255.224.0\nend",
    options: [
      "172.22.95.254",
      "172.22.95.255",
      "172.22.71.254",
      "172.22.64.254"
    ],
    answer: [0],
    explanation: "255.255.224.0 is a /19, creating blocks of 32 in the third octet, so the subnet is 172.22.64.0 through 172.22.95.255. The broadcast is 172.22.95.255, making 172.22.95.254 the last usable host. 172.22.71.254 results from misreading the mask as /21, and 172.22.64.254 results from treating it as /24."
  },
  {
    id: "nf-085",
    domain: "Network Fundamentals",
    type: "multi",
    question: "Refer to the exhibit. Which three statements about the subnet configured on GigabitEthernet0/1 are true? (Choose three.)",
    exhibit: "R1# show running-config interface GigabitEthernet0/1\ninterface GigabitEthernet0/1\n ip address 192.168.1.99 255.255.255.248\nend",
    options: [
      "The network address is 192.168.1.96",
      "The broadcast address is 192.168.1.103",
      "The subnet provides 6 usable host addresses",
      "The broadcast address is 192.168.1.111",
      "The subnet provides 14 usable host addresses"
    ],
    answer: [0, 1, 2],
    explanation: "The /29 mask creates blocks of 8, so 192.168.1.99 falls in 192.168.1.96/29, which runs from .96 (network) to .103 (broadcast) with usable hosts .97 through .102, that is, 6 usable addresses. The broadcast .111 and the count of 14 usable hosts would both be correct only for a /28 mask (255.255.255.240), which is the classic misreading of 255.255.255.248."
  },
  {
    id: "nf-086",
    domain: "Network Fundamentals",
    type: "single",
    question: "An administrator subdivides the block 10.128.32.0/22 entirely into /28 subnets for small point-of-sale segments. How many /28 subnets are created?",
    options: [
      "64",
      "32",
      "16",
      "128"
    ],
    answer: [0],
    explanation: "Going from a /22 to a /28 borrows 6 additional subnet bits, and 2^6 = 64 subnets. Answers of 16 and 32 correspond to borrowing only 4 or 5 bits, and 128 corresponds to borrowing 7 bits (a /29). The calculation is simply 2 raised to the difference between the new and original prefix lengths."
  },
  {
    id: "nf-087",
    domain: "Network Fundamentals",
    type: "single",
    question: "A router must advertise a single summary that covers the networks 172.16.20.0/24, 172.16.21.0/24, 172.16.22.0/24, and 172.16.23.0/24 and nothing more. Which summary address is correct?",
    options: [
      "172.16.20.0/22",
      "172.16.16.0/21",
      "172.16.20.0/23",
      "172.16.20.0/21"
    ],
    answer: [0],
    explanation: "The four /24 networks share their first 22 bits, and 20 is divisible by 4, so 172.16.20.0/22 is a valid block boundary that covers exactly 172.16.20.0 through 172.16.23.255. 172.16.16.0/21 also covers them but additionally includes 172.16.16.0 through 172.16.19.255, violating the requirement to cover nothing more. 172.16.20.0/23 covers only the 20.x and 21.x networks, and 172.16.20.0/21 is not a valid /21 boundary because 20 is not a multiple of 8."
  },
  {
    id: "nf-088",
    domain: "Network Fundamentals",
    type: "single",
    question: "Refer to the exhibit. A Linux administrator checks a server's addressing. What is the network address of the subnet to which the server belongs?",
    exhibit: "admin@srv01:~$ ip addr show eth0\n2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq state UP\n    link/ether 00:50:56:9a:12:bc brd ff:ff:ff:ff:ff:ff\n    inet 172.19.4.77/22 brd 172.19.7.255 scope global eth0",
    options: [
      "172.19.4.0",
      "172.19.0.0",
      "172.19.6.0",
      "172.19.4.64"
    ],
    answer: [0],
    explanation: "A /22 creates blocks of 4 in the third octet (0, 4, 8, ...), and 172.19.4.77 falls in the block beginning at 172.19.4.0, which is confirmed by the displayed broadcast of 172.19.7.255. 172.19.0.0 would be the answer only for a /22 block starting at 0 or a shorter prefix like /16, 172.19.6.0 is an address inside the subnet rather than its network ID, and 172.19.4.64 mixes in fourth-octet math that does not apply to a /22."
  },
  {
    id: "nf-089",
    domain: "Network Fundamentals",
    type: "single",
    question: "An engineer allocates VLSM subnets sequentially from 192.168.8.0/24, starting at the lowest address, for requirements of 60 hosts, 28 hosts, and 12 hosts in that order. Which subnet is assigned to the 12-host requirement?",
    options: [
      "192.168.8.96/28",
      "192.168.8.64/28",
      "192.168.8.112/28",
      "192.168.8.96/27"
    ],
    answer: [0],
    explanation: "The 60-host subnet needs a /26 and takes 192.168.8.0-63; the 28-host subnet needs a /27 (30 usable) and takes 192.168.8.64-95; the 12-host subnet needs a /28 (14 usable) and therefore begins at the next boundary, 192.168.8.96/28. 192.168.8.64/28 would overlap the voice allocation, 192.168.8.112/28 skips an available block, and a /27 at .96 wastes space since 14 usable addresses are sufficient."
  },
  {
    id: "nf-090",
    domain: "Network Fundamentals",
    type: "multi",
    question: "Which two subnet masks provide at least 300 usable host addresses per subnet? (Choose two.)",
    options: [
      "255.255.254.0",
      "255.255.252.0",
      "255.255.255.0",
      "255.255.255.128"
    ],
    answer: [0, 1],
    explanation: "255.255.254.0 (/23) yields 510 usable hosts and 255.255.252.0 (/22) yields 1022, both satisfying the 300-host requirement. 255.255.255.0 (/24) provides only 254 usable addresses, which falls just short and is the tempting near miss, and 255.255.255.128 (/25) provides only 126."
  }
);
(window.QUESTION_BANK = window.QUESTION_BANK || []).push(
  {
    id: "nf-091",
    domain: "Network Fundamentals",
    type: "single",
    question: "An organization receives the IPv6 allocation 2001:db8:4a00::/48 and assigns a standard /64 to every LAN segment. How many /64 subnets does the allocation provide?",
    options: [
      "65536",
      "256",
      "4096",
      "16777216"
    ],
    answer: [0],
    explanation: "Between a /48 and a /64 there are 16 subnet bits, providing 2^16 = 65536 subnets. The value 256 corresponds to only 8 subnet bits (a /56 allocation), 4096 corresponds to 12 bits (a /52), and 16777216 corresponds to 24 bits. With IPv6 the host portion of a standard LAN is always the final 64 bits, so the subnetting happens entirely between the global routing prefix and the interface ID."
  },
  {
    id: "nf-092",
    domain: "Network Fundamentals",
    type: "single",
    question: "An IPv6 host must learn the MAC address of another host on the same LAN before sending it traffic. Which mechanism does the host use?",
    options: [
      "It sends an ICMPv6 Neighbor Solicitation to the target's solicited-node multicast address",
      "It broadcasts an ARP request containing the target's IPv6 address",
      "It sends an ICMPv6 Router Solicitation to the all-routers multicast address",
      "It floods an ICMPv6 Echo Request to FF02::1 and waits for the reply"
    ],
    answer: [0],
    explanation: "IPv6 replaces ARP with Neighbor Discovery: the host sends a Neighbor Solicitation (ICMPv6 type 135) to the target's solicited-node multicast group, and the target answers with a Neighbor Advertisement containing its MAC address. ARP is an IPv4-only protocol, and IPv6 has no broadcast at all. Router Solicitations discover routers rather than host MAC addresses, and pinging the all-nodes group is not an address resolution mechanism."
  },
  {
    id: "nf-093",
    domain: "Network Fundamentals",
    type: "multi",
    question: "Which two statements about IPv6 anycast addresses are true? (Choose two.)",
    options: [
      "The same anycast address is assigned to multiple devices",
      "A packet sent to an anycast address is delivered to the topologically nearest device that holds it",
      "A packet sent to an anycast address is delivered to all devices that hold it",
      "Anycast addresses are allocated from the dedicated FF00::/8 range"
    ],
    answer: [0, 1],
    explanation: "Anycast intentionally configures one address on multiple devices, and the routing infrastructure delivers each packet to the nearest instance, which is useful for services like DNS. Delivery to all members describes multicast, not anycast, which is why that distractor is wrong. Anycast addresses come from the regular unicast address space and are syntactically indistinguishable from unicast; FF00::/8 is reserved exclusively for multicast."
  },
  {
    id: "nf-094",
    domain: "Network Fundamentals",
    type: "single",
    question: "Refer to the exhibit. An engineer reviews the multicast groups joined by GigabitEthernet0/0. Why has the interface joined the group FF02::2?",
    exhibit: "R1# show ipv6 interface GigabitEthernet0/0\nGigabitEthernet0/0 is up, line protocol is up\n  IPv6 is enabled, link-local address is FE80::1\n  Global unicast address(es):\n    2001:DB8:12::1, subnet is 2001:DB8:12::/64\n  Joined group address(es):\n    FF02::1\n    FF02::2\n    FF02::1:FF00:1",
    options: [
      "The device is operating as an IPv6 router, and all IPv6 routers join the all-routers group",
      "Every IPv6-enabled interface automatically joins FF02::2",
      "The interface joined FF02::2 to support duplicate address detection",
      "FF02::2 is the solicited-node group derived from the global address"
    ],
    answer: [0],
    explanation: "FF02::2 is the all-routers link-local multicast group, joined only by interfaces on devices functioning as IPv6 routers so they can receive Router Solicitations. All IPv6 interfaces join the all-nodes group FF02::1, but FF02::2 is specific to routers, so the second option is wrong. Duplicate address detection and address resolution use the solicited-node group, which here is FF02::1:FF00:1, not FF02::2."
  },
  {
    id: "nf-095",
    domain: "Network Fundamentals",
    type: "single",
    question: "A host uses SLAAC to obtain its IPv6 global unicast address. How is the address formed?",
    options: [
      "The host combines the prefix advertised in a Router Advertisement with an interface ID it generates itself",
      "The host requests a complete 128-bit address from a DHCPv6 server",
      "The host copies the full address of the default router and changes the last four digits",
      "The host derives the entire address from its MAC address alone"
    ],
    answer: [0],
    explanation: "With stateless address autoconfiguration, the router advertises a /64 prefix in its Router Advertisement, and the host appends a self-generated 64-bit interface ID (EUI-64 based or random) to form its address. Obtaining a full leased address from a server describes stateful DHCPv6, not SLAAC. The MAC address can contribute only the interface ID half, never the prefix, and hosts do not derive addresses by modifying the router's address."
  },
  {
    id: "nf-096",
    domain: "Network Fundamentals",
    type: "single",
    question: "In the IPv6 multicast address FF02::1, what does the value 2 in the fourth hex digit indicate?",
    options: [
      "The scope of the group is limited to the local link",
      "The group contains exactly two members",
      "The address is the second multicast group ever allocated",
      "The scope of the group is organization-wide"
    ],
    answer: [0],
    explanation: "In an IPv6 multicast address the fourth hex digit encodes the scope, and the value 2 means link-local, so FF02::1 packets never leave the local segment. A value of 8 would indicate organization-local scope and 5 indicates site-local scope. The digit has nothing to do with the number of group members or with any allocation order."
  },
  {
    id: "nf-097",
    domain: "Network Fundamentals",
    type: "single",
    question: "In a typical IPv6 global unicast address such as 2001:db8:aaaa:0001::10/64, which portion identifies the individual host on its subnet?",
    options: [
      "The low-order 64 bits (the interface ID)",
      "The first 48 bits (the global routing prefix)",
      "Bits 49 through 64 (the subnet ID)",
      "The first 3 bits (the 2000::/3 allocation)"
    ],
    answer: [0],
    explanation: "A standard global unicast address splits into a 48-bit global routing prefix assigned by the provider, a 16-bit subnet ID chosen by the organization, and a 64-bit interface ID that uniquely identifies the host on its subnet. The global routing prefix and subnet ID together locate the subnet, not the host. The leading 2000::/3 bits merely mark the address as global unicast space."
  },
  {
    id: "nf-098",
    domain: "Network Fundamentals",
    type: "multi",
    question: "Refer to the exhibit. Which two statements about this interface configuration are true? (Choose two.)",
    exhibit: "R3# show running-config interface GigabitEthernet0/1\ninterface GigabitEthernet0/1\n ip address 192.168.30.1 255.255.255.0\n ipv6 address 2001:DB8:30::1/64\nend",
    options: [
      "The interface is running dual-stack, processing IPv4 and IPv6 simultaneously",
      "IPv4 hosts and IPv6 hosts on this LAN can each use the router as their gateway for their respective protocol",
      "The IPv6 address is tunneled inside IPv4 packets on this interface",
      "NAT64 is required for the two protocols to coexist on the interface"
    ],
    answer: [0, 1],
    explanation: "Configuring both an IPv4 and an IPv6 address on the same interface is dual-stack operation: the two protocol stacks run independently and in parallel, and clients of each protocol use the corresponding gateway address. No tunneling occurs because each protocol is forwarded natively. NAT64 is a translation mechanism for IPv6-only hosts reaching IPv4-only services and is not needed simply to run both protocols side by side."
  },
  {
    id: "nf-099",
    domain: "Network Fundamentals",
    type: "single",
    question: "An IPv6 host performs duplicate address detection before assigning a new address to its interface. Which source address does the host use in the Neighbor Solicitation it sends?",
    options: [
      "The unspecified address ::",
      "The loopback address ::1",
      "Its existing link-local address FE80::/10",
      "The solicited-node multicast address of the tentative address"
    ],
    answer: [0],
    explanation: "During DAD the tentative address cannot yet be used, so the Neighbor Solicitation is sourced from the unspecified address :: while being sent to the solicited-node multicast group of the tentative address. The loopback ::1 never appears on the wire. The link-local address itself must also pass DAD before use, so it cannot serve as the source when it is the address being tested, and the solicited-node multicast address is the destination of the probe, not its source."
  },
  {
    id: "nf-100",
    domain: "Network Fundamentals",
    type: "dragdrop",
    question: "Drag each transport protocol and port to the application service that uses it by default.",
    items: [
      "UDP 69",
      "TCP 25",
      "TCP 22",
      "UDP 53",
      "TCP 443"
    ],
    targets: [
      "SSH remote login",
      "DNS name query from a client",
      "HTTPS web browsing",
      "TFTP file transfer",
      "SMTP mail delivery between servers"
    ],
    answer: [2, 3, 4, 0, 1],
    explanation: "SSH uses TCP 22, standard DNS client queries use UDP 53, HTTPS uses TCP 443, TFTP uses UDP 69, and SMTP server-to-server delivery uses TCP 25. The classic confusions are TFTP (UDP 69) versus FTP (TCP 20/21) and remembering that simple DNS lookups ride UDP even though DNS can also use TCP for zone transfers and large responses."
  },
  {
    id: "nf-101",
    domain: "Network Fundamentals",
    type: "single",
    question: "A real-time voice application is being designed. Why is UDP preferred over TCP as the transport protocol for the voice media stream?",
    options: [
      "UDP avoids retransmission and connection overhead, so late packets are not retransmitted at the cost of added delay",
      "UDP guarantees in-order delivery with lower overhead than TCP",
      "UDP provides built-in encryption that protects the voice payload",
      "UDP performs faster three-way handshakes than TCP"
    ],
    answer: [0],
    explanation: "Voice tolerates occasional packet loss but not delay; UDP's connectionless, no-retransmission behavior means a lost voice sample is simply skipped instead of retransmitted late, when it would be useless. UDP provides no ordering or delivery guarantees, so the second option is false. UDP includes no encryption (that is added by protocols such as SRTP), and UDP has no handshake at all, which is precisely why it starts faster."
  },
  {
    id: "nf-102",
    domain: "Network Fundamentals",
    type: "multi",
    question: "Which three characteristics describe TCP? (Choose three.)",
    options: [
      "It establishes sessions with a three-way handshake before data transfer",
      "It uses sequence numbers to reorder segments that arrive out of order",
      "It provides flow control through an advertised receive window",
      "It delivers data with best-effort, connectionless service",
      "It adds less header overhead than UDP"
    ],
    answer: [0, 1, 2],
    explanation: "TCP is connection-oriented: it opens sessions with a SYN, SYN-ACK, ACK handshake, sequences every byte so the receiver can reorder and detect loss, and throttles the sender through the advertised window for flow control. Best-effort connectionless delivery describes UDP and IP, not TCP. TCP's header is at least 20 bytes versus UDP's 8, so TCP has more overhead, not less."
  },
  {
    id: "nf-103",
    domain: "Network Fundamentals",
    type: "single",
    question: "During a large file transfer, a receiving host becomes overwhelmed and needs the sender to slow down. Which TCP mechanism accomplishes this?",
    options: [
      "The receiver advertises a smaller window size in its acknowledgments",
      "The receiver sends an ICMP source quench message to the sender",
      "The receiver resets the session with a FIN segment until its buffers drain",
      "The receiver renegotiates the maximum segment size mid-session"
    ],
    answer: [0],
    explanation: "TCP flow control works through the sliding window: each ACK carries the receiver's current buffer availability, and shrinking the advertised window forces the sender to pause or slow transmission. ICMP source quench is obsolete and was never a TCP mechanism. A FIN closes the session gracefully rather than pausing it, and the MSS is exchanged only during connection establishment, not renegotiated to manage congestion."
  },
  {
    id: "nf-104",
    domain: "Network Fundamentals",
    type: "single",
    question: "Refer to the exhibit. A user can ping 8.8.8.8 successfully but cannot browse to any website by name. Based on the output, what is the cause?",
    exhibit: "C:\\> ipconfig /all\n\nEthernet adapter Ethernet0:\n   IPv4 Address. . . . . . . . . . . : 10.1.50.25\n   Subnet Mask . . . . . . . . . . . : 255.255.255.0\n   Default Gateway . . . . . . . . . : 10.1.50.1\n   DHCP Server . . . . . . . . . . . : 10.1.50.1\n   DNS Servers . . . . . . . . . . . : 169.254.10.5",
    options: [
      "The configured DNS server address is invalid, so name resolution fails",
      "The default gateway is in a different subnet than the host",
      "The host has an APIPA address and cannot reach the Internet",
      "The subnet mask is too small for the network"
    ],
    answer: [0],
    explanation: "Successful pings to 8.8.8.8 prove that IP addressing, the gateway, and Internet routing all work, so the failure is name resolution: the DNS server is set to 169.254.10.5, a link-local APIPA address that is not a reachable DNS server. The gateway 10.1.50.1 is inside the host's 10.1.50.0/24 subnet, the host's own address is a valid DHCP-assigned address rather than APIPA, and the /24 mask is consistent with the rest of the configuration."
  },
  {
    id: "nf-105",
    domain: "Network Fundamentals",
    type: "single",
    question: "Refer to the exhibit. An engineer checks the routing configuration of a Linux server. Which address is the server's default gateway?",
    exhibit: "admin@srv02:~$ ip route\ndefault via 192.168.20.254 dev eth0 proto static\n192.168.20.0/24 dev eth0 proto kernel scope link src 192.168.20.31",
    options: [
      "192.168.20.254",
      "192.168.20.31",
      "192.168.20.0",
      "192.168.20.1"
    ],
    answer: [0],
    explanation: "The line beginning with \"default via\" identifies the gateway used for all destinations not matched by a more specific route, which is 192.168.20.254. The address 192.168.20.31 is the server's own source address shown on the connected route, 192.168.20.0 is the network address of the local subnet, and 192.168.20.1 appears nowhere in the output even though it is a common gateway convention."
  }
);
