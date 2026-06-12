(window.QUESTION_BANK = window.QUESTION_BANK || []).push(
  {
    id: "ips-001",
    domain: "IP Services",
    type: "single",
    question: "Refer to the exhibit. About 50 hosts on the 192.168.10.0/24 LAN need Internet access, but the helpdesk reports that only two users can browse at any given time and other users succeed only after long waits. Which change resolves the problem with the least configuration?",
    exhibit: "interface GigabitEthernet0/0\n ip address 192.168.10.1 255.255.255.0\n ip nat inside\n!\ninterface GigabitEthernet0/1\n ip address 203.0.113.1 255.255.255.252\n ip nat outside\n!\naccess-list 1 permit 192.168.10.0 0.0.0.255\nip nat pool INET 203.0.113.5 203.0.113.6 netmask 255.255.255.0\nip nat inside source list 1 pool INET",
    options: [
      "Add the overload keyword to the ip nat inside source list 1 pool INET command",
      "Change the wildcard mask in access-list 1 to 0.0.255.255",
      "Change the pool netmask to 255.255.255.252 to match the WAN interface",
      "Configure an ip nat outside source list command for return traffic"
    ],
    answer: [0],
    explanation: "The pool contains only two global addresses, and without the overload keyword each inside host consumes one address exclusively (one-to-one dynamic NAT), so only two hosts can be translated at a time. Adding overload enables PAT, which multiplexes many inside hosts onto the pool addresses using unique source ports. The ACL already matches the LAN, so widening the wildcard changes nothing. The pool netmask does not limit concurrent users, and ip nat outside source translates outside addresses, which is unrelated to this problem."
  },
  {
    id: "ips-002",
    domain: "IP Services",
    type: "single",
    question: "Refer to the exhibit. A user at 192.168.1.10 is browsing a web server. Which source address does the web server at 198.51.100.7 see in the packets that arrive from this user?",
    exhibit: "R1# show ip nat translations\nPro  Inside global       Inside local        Outside local       Outside global\ntcp  203.0.113.5:51122   192.168.1.10:51122  198.51.100.7:80     198.51.100.7:80",
    options: [
      "203.0.113.5",
      "192.168.1.10",
      "198.51.100.7",
      "192.168.1.1"
    ],
    answer: [0],
    explanation: "The inside global address (203.0.113.5) is the translated, routable address that represents the inside host after NAT, so it is the source address the external server receives. 192.168.1.10 is the inside local address, which exists only before translation on the internal side. 198.51.100.7 is the outside global address of the server itself, the destination of the flow, and 192.168.1.1 is not in the translation entry at all."
  },
  {
    id: "ips-003",
    domain: "IP Services",
    type: "single",
    question: "Host 10.1.1.50 on a corporate LAN is translated by an edge router to 209.165.200.230 when it communicates with server 198.51.100.10 on the Internet. In NAT terminology, what is 10.1.1.50 called?",
    options: [
      "Inside local address",
      "Inside global address",
      "Outside local address",
      "Outside global address"
    ],
    answer: [0],
    explanation: "The inside local address is the address actually configured on the internal host before translation, which is 10.1.1.50 here. The inside global address is 209.165.200.230, the public representation of that same host after NAT. Outside global (198.51.100.10) is the real address of the external server, and outside local would be how that external server appears to inside hosts, which is normally the same as outside global unless destination translation is also performed."
  },
  {
    id: "ips-004",
    domain: "IP Services",
    type: "single",
    question: "Refer to the exhibit. A static NAT entry was configured so Internet users can reach the internal web server, but connections from outside to 203.0.113.10 still fail. What must be done to make the translation work?",
    exhibit: "ip nat inside source static 192.168.1.100 203.0.113.10\n!\ninterface GigabitEthernet0/0\n ip address 192.168.1.1 255.255.255.0\n!\ninterface GigabitEthernet0/1\n ip address 203.0.113.2 255.255.255.252",
    options: [
      "Apply ip nat inside on GigabitEthernet0/0 and ip nat outside on GigabitEthernet0/1",
      "Add an access list that permits 192.168.1.100 and reference it in the NAT statement",
      "Replace the static entry with ip nat outside source static 192.168.1.100 203.0.113.10",
      "Configure a NAT pool containing 203.0.113.10 and bind it to the static entry"
    ],
    answer: [0],
    explanation: "NAT only operates on packets that cross from an interface marked ip nat inside to one marked ip nat outside (or vice versa). Neither interface in the exhibit carries a NAT role, so the translation rule is never applied. Static NAT does not use an access list or a pool; ACLs and pools belong to dynamic NAT. The ip nat outside source command translates the addresses of outside hosts, which is the wrong direction for publishing an internal server."
  },
  {
    id: "ips-005",
    domain: "IP Services",
    type: "single",
    question: "When configuring dynamic NAT with the command ip nat inside source list 10 pool PUBLIC, what does access-list 10 identify?",
    options: [
      "The inside local addresses that are permitted to be translated",
      "The inside global addresses that will be assigned from the pool",
      "The outside destinations that inside hosts are allowed to reach",
      "The traffic that must be denied and dropped by the router"
    ],
    answer: [0],
    explanation: "In dynamic NAT, the referenced ACL selects which source (inside local) addresses are eligible for translation; a permit result means translate, not forward or drop. The inside global addresses come from the NAT pool, not from the ACL. The ACL is matched against the source of inside-to-outside packets, so it does not filter destinations. Importantly, a deny in a NAT ACL only means the packet is not translated; it is still routed normally, so the ACL is not a security filter."
  },
  {
    id: "ips-006",
    domain: "IP Services",
    type: "multi",
    question: "An engineer must allow all hosts on 172.16.0.0/16 to share the single public address of interface GigabitEthernet0/1 when reaching the Internet. Which two configuration elements are required? (Choose two.)",
    options: [
      "An access list that permits the 172.16.0.0/16 source addresses",
      "The command ip nat inside source list 1 interface GigabitEthernet0/1 overload",
      "A NAT pool containing at least one public address per inside host",
      "The command ip nat outside source static for each internal host",
      "An increased DHCP lease time on the internal scope"
    ],
    answer: [0, 1],
    explanation: "Interface-based PAT needs an ACL to define which inside local addresses are translated and a single ip nat inside source list command that references the outside interface with the overload keyword. No pool is needed because the interface address itself is used, and PAT specifically avoids the one-address-per-host requirement by tracking source ports. ip nat outside source static translates outside addresses and is unrelated, and DHCP lease timers have nothing to do with NAT."
  },
  {
    id: "ips-007",
    domain: "IP Services",
    type: "single",
    question: "Refer to the exhibit. Hosts in the 192.168.20.0/24 subnet connected to GigabitEthernet0/0 cannot reach the Internet, and show ip nat translations displays no entries for them. What is the root cause?",
    exhibit: "interface GigabitEthernet0/0\n ip address 192.168.20.1 255.255.255.0\n ip nat inside\n!\ninterface Serial0/0/0\n ip address 203.0.113.1 255.255.255.0\n ip nat outside\n!\naccess-list 1 permit 192.168.10.0 0.0.0.255\nip nat pool PUBLIC 203.0.113.10 203.0.113.20 netmask 255.255.255.0\nip nat inside source list 1 pool PUBLIC overload",
    options: [
      "Access-list 1 does not match the source subnet of the hosts",
      "The overload keyword prevents the pool from being used by multiple hosts",
      "The NAT pool netmask does not match the LAN subnet mask",
      "ip nat inside is configured on the wrong interface type for PAT"
    ],
    answer: [0],
    explanation: "The ACL permits 192.168.10.0/24, but the hosts reside in 192.168.20.0/24, so their packets never match the translation rule and no entries are created. The overload keyword does the opposite of limiting hosts; it lets many hosts share pool addresses through PAT. The pool netmask describes the pool's own subnet, not the LAN, so it does not need to match the inside network. PAT works on any interface type, so the inside designation on a Gigabit interface is valid."
  },
  {
    id: "ips-008",
    domain: "IP Services",
    type: "single",
    question: "A company hosts a public web server on its internal network. Why is static NAT the appropriate choice for this server instead of dynamic NAT or PAT?",
    options: [
      "It creates a permanent one-to-one mapping so outside hosts can initiate connections to the server",
      "It conserves public addresses by letting the server share an address with other hosts",
      "It translates only TCP traffic, which is all a web server requires",
      "It automatically removes idle translations to free resources"
    ],
    answer: [0],
    explanation: "Static NAT installs a fixed one-to-one mapping that exists regardless of traffic, so connections initiated from the outside always find a valid translation pointing at the server. Dynamic NAT and PAT build translations only when an inside host initiates traffic, so an unsolicited inbound connection would have no entry to match. Address conservation describes PAT, not static NAT, which actually consumes one public address per server. Static translations are never aged out, so automatic removal of idle entries is also incorrect."
  },
  {
    id: "ips-009",
    domain: "IP Services",
    type: "single",
    question: "Refer to the exhibit. What does this entry in the NAT translation table indicate?",
    exhibit: "R1# show ip nat translations\nPro  Inside global      Inside local       Outside local      Outside global\n---  203.0.113.10       192.168.1.100      ---                ---",
    options: [
      "A static NAT mapping that exists regardless of whether any traffic is flowing",
      "A dynamic translation that is about to expire because no traffic matches it",
      "A PAT entry that is missing its port numbers because of a configuration error",
      "A failed translation caused by an access list that denies the host"
    ],
    answer: [0],
    explanation: "An entry with no protocol or outside addresses listed is the signature of a configured static mapping; it is installed in the table as soon as the command is entered and never times out. Dynamic and PAT entries appear only when traffic creates them and always include the outside addresses of the actual session, with PAT entries also showing ports. Missing ports here is normal for a static one-to-one entry, not an error, and a denied host would simply have no entry at all."
  },
  {
    id: "ips-010",
    domain: "IP Services",
    type: "multi",
    question: "Which two statements about Port Address Translation are true? (Choose two.)",
    options: [
      "Many inside hosts can be represented by a single inside global address",
      "Unique source port numbers are used to distinguish the sessions of different hosts",
      "Each inside host requires its own dedicated address from the global pool",
      "Only TCP traffic can be translated because UDP has no session state"
    ],
    answer: [0, 1],
    explanation: "PAT extends NAT by appending the Layer 4 source port to each translation, so thousands of inside hosts can share one inside global address while the router keeps their sessions separate by port number. Requiring a dedicated global address per host describes one-to-one dynamic NAT, which is exactly what PAT eliminates. PAT handles UDP and even ICMP (using query identifiers) in addition to TCP, so the TCP-only claim is false."
  },
  {
    id: "ips-011",
    domain: "IP Services",
    type: "single",
    question: "After modifying a NAT access list, an engineer notices that hosts are still being translated according to the old policy because existing entries remain in the table. Which command immediately removes all dynamic translations?",
    options: [
      "clear ip nat translation *",
      "clear ip nat statistics",
      "no ip nat inside source list 1 pool PUBLIC",
      "clear ip nat translation static"
    ],
    answer: [0],
    explanation: "Active dynamic entries persist until they time out, so policy changes do not affect established sessions; clear ip nat translation * flushes all dynamic entries at once so new traffic is evaluated against the updated configuration. clear ip nat statistics only resets hit and miss counters and leaves translations intact. Removing the NAT statement disrupts the entire NAT service rather than just clearing the table. Static translations come from configuration and cannot be cleared this way; they must be removed with the no form of the static command."
  },
  {
    id: "ips-012",
    domain: "IP Services",
    type: "single",
    question: "Refer to the exhibit. Users on the 192.168.10.0/24 LAN attached to GigabitEthernet0/0 cannot reach the Internet through this PAT configuration. What is the problem?",
    exhibit: "interface GigabitEthernet0/0\n ip address 192.168.10.1 255.255.255.0\n ip nat outside\n!\ninterface GigabitEthernet0/1\n ip address 203.0.113.2 255.255.255.252\n ip nat inside\n!\naccess-list 1 permit 192.168.10.0 0.0.0.255\nip nat inside source list 1 interface GigabitEthernet0/1 overload",
    options: [
      "The ip nat inside and ip nat outside roles are applied to the wrong interfaces",
      "The access list must reference the outside interface address instead of the LAN",
      "The overload keyword cannot be combined with an interface-based translation",
      "The WAN subnet mask of /30 does not provide enough addresses for PAT"
    ],
    answer: [0],
    explanation: "The LAN interface where private hosts reside must be ip nat inside and the WAN-facing interface must be ip nat outside; here they are reversed, so packets from the LAN never traverse an inside-to-outside path and the translation rule is never triggered. The ACL correctly identifies the inside local subnet, which is exactly what it should match. Interface overload is the standard PAT configuration, so that combination is valid, and PAT needs only the single WAN address, so a /30 is sufficient."
  },
  {
    id: "ips-013",
    domain: "IP Services",
    type: "dragdrop",
    question: "Drag each NAT address type to the description that defines it.",
    items: [
      "Inside global",
      "Outside global",
      "Inside local",
      "Outside local"
    ],
    targets: [
      "Private address configured on an internal host before translation",
      "Public address that represents an internal host to the Internet",
      "Address of an external host as it appears to hosts on the internal network",
      "Real address assigned to an external host by its owner"
    ],
    answer: [2, 0, 3, 1],
    explanation: "The inside local address is the actual, usually RFC 1918, address on the internal host, while the inside global address is its translated public representation. The outside global address is the legitimate address of the external device, and the outside local address is how that external device is seen from inside the network, which differs from outside global only when destination NAT is in use. Remembering that inside/outside indicates where the host physically sits, while local/global indicates which side of the network the address is seen from, prevents the classic inside-local versus inside-global confusion."
  },
  {
    id: "ips-014",
    domain: "IP Services",
    type: "multi",
    question: "A router performs dynamic NAT using a pool of 10 public addresses for 200 internal users, and users intermittently lose Internet access when the pool is exhausted. Which two solutions allow all 200 users to access the Internet concurrently? (Choose two.)",
    options: [
      "Add the overload keyword to the existing pool-based NAT statement",
      "Replace the pool configuration with PAT using the outside interface address",
      "Configure a separate static NAT entry for each of the 200 users",
      "Lower the NAT translation timeout so addresses return to the pool faster",
      "Expand the access list so it matches more internal subnets"
    ],
    answer: [0, 1],
    explanation: "Both solutions introduce port-based multiplexing: adding overload to the pool statement turns the 10 addresses into PAT capacity for thousands of sessions, and using the outside interface with overload accomplishes the same with a single address. Static NAT for 200 users would require 200 public addresses, which the company does not have. Lowering timeouts only recycles the same 10 addresses faster and still cannot support 200 simultaneous users. Expanding the ACL increases the number of hosts requesting translation, making the exhaustion worse."
  },
  {
    id: "ips-015",
    domain: "IP Services",
    type: "single",
    question: "Refer to the exhibit. What can be concluded about the NTP configuration of this router?",
    exhibit: "R1# show ntp status\nClock is synchronized, stratum 3, reference is 203.0.113.8\nnominal freq is 250.0000 Hz, actual freq is 249.9990 Hz, precision is 2**10\nreference time is E8D63A2B.4D2E0000 (10:15:42.301 UTC Thu Jun 11 2026)",
    options: [
      "R1 has synchronized its clock to an NTP server that operates at stratum 2",
      "R1 is acting as an authoritative stratum 3 time source using its internal clock",
      "R1 cannot provide time to clients because stratum 3 is considered unsynchronized",
      "R1 is three hops from 203.0.113.8 in the routing topology"
    ],
    answer: [0],
    explanation: "A device's stratum is one greater than that of its reference, so a synchronized stratum 3 router must be learning time from a stratum 2 server, in this case 203.0.113.8. A router serving time from its own internal clock via ntp master would show a reference of 127.127.1.1, not an external address. Only stratum 16 indicates an unsynchronized device; a stratum 3 router can absolutely serve time to downstream clients, which would then become stratum 4. NTP stratum counts time-distribution hops from the reference clock, not router hops in the IP topology."
  }
);

(window.QUESTION_BANK = window.QUESTION_BANK || []).push(
  {
    id: "ips-016",
    domain: "IP Services",
    type: "single",
    question: "Refer to the exhibit. An engineer reviews the time configuration of a router that distributes time to branch switches. What does the output indicate?",
    exhibit: "R2# show ntp status\nClock is synchronized, stratum 8, reference is 127.127.1.1\nnominal freq is 250.0000 Hz, actual freq is 250.0000 Hz, precision is 2**10",
    options: [
      "R2 is configured with ntp master and is using its internal clock as the time source",
      "R2 is synchronized to a remote loopback interface at address 127.127.1.1",
      "R2 failed to reach its configured NTP server and fell back to stratum 8",
      "R2 is unsynchronized because any stratum above 4 is invalid"
    ],
    answer: [0],
    explanation: "The reference address 127.127.1.1 is the internal pseudo-clock that IOS uses when ntp master is configured, and stratum 8 is the default stratum assigned by that command. The address is not a remote device; 127.x.x.x addresses are local to the router itself. There is no automatic fallback mechanism that changes a router's stratum when a server is unreachable; an unsynchronized router reports stratum 16. Strata 1 through 15 are all valid synchronized values, so stratum 8 does not imply a failure."
  },
  {
    id: "ips-017",
    domain: "IP Services",
    type: "single",
    question: "Refer to the exhibit. A router was configured with ntp server 203.0.113.8 an hour ago, but its clock is still wrong. What does the output reveal?",
    exhibit: "R1# show ntp associations\n  address         ref clock       st   when   poll reach  delay  offset   disp\n ~203.0.113.8     .INIT.          16      -     64     0  0.000   0.000 15937.",
    options: [
      "R1 has never received an NTP response from 203.0.113.8 and remains unsynchronized",
      "R1 is synchronized to 203.0.113.8, which is an authoritative stratum 16 source",
      "R1 polls the server too infrequently for synchronization to complete",
      "R1 rejected the server because its dispersion value is within normal limits"
    ],
    answer: [0],
    explanation: "A reach value of 0 means none of the last eight polls received a reply, and stratum 16 with a reference clock of .INIT. confirms the association has never synchronized; the cause is typically reachability, filtering of UDP port 123, or a misconfigured server address. Stratum 16 is the unsynchronized indicator, not an authoritative level, so the second option inverts the meaning. The 64-second poll interval is normal and not the limiting factor. A very high dispersion value like 15937 indicates the absence of valid samples, not a healthy measurement."
  },
  {
    id: "ips-018",
    domain: "IP Services",
    type: "multi",
    question: "Which two statements about NTP stratum values are true? (Choose two.)",
    options: [
      "A device reporting stratum 16 is considered unsynchronized",
      "The stratum number increases by one at each NTP hop away from the reference clock",
      "Stratum 0 reference clocks are queried directly by clients across the network",
      "A higher stratum number indicates a more accurate time source",
      "Stratum 1 servers obtain their time from other stratum 1 servers"
    ],
    answer: [0, 1],
    explanation: "Stratum measures distance from the authoritative reference: a stratum 1 server is directly attached to a stratum 0 reference clock such as GPS, and every device that synchronizes downstream adds one to the stratum, with 16 reserved to mean unsynchronized. Stratum 0 devices are hardware clocks, not network-reachable NTP servers, so clients cannot query them directly. Accuracy decreases, not increases, as stratum rises, and stratum 1 servers get time from their attached reference clock, not from peers at the same stratum."
  },
  {
    id: "ips-019",
    domain: "IP Services",
    type: "single",
    question: "An administrator must configure router R3 so that it synchronizes its clock to the corporate time server at 10.0.0.5 but never acts as a time source for that server. Which command accomplishes this?",
    options: [
      "ntp server 10.0.0.5",
      "ntp peer 10.0.0.5",
      "ntp master 10.0.0.5",
      "clock set 10.0.0.5"
    ],
    answer: [0],
    explanation: "The ntp server command creates a client association in which the local router synchronizes to the specified server, a strictly one-way relationship. ntp peer creates a symmetric association where either device may adjust to the other, which violates the requirement that R3 never supply time to the server. ntp master takes a stratum number, not an IP address, and would make the router an authoritative source from its internal clock. clock set manually configures the time once and provides no ongoing synchronization at all."
  },
  {
    id: "ips-020",
    domain: "IP Services",
    type: "multi",
    question: "During the initial DHCP lease process on a local subnet, which two messages does the client send as broadcasts? (Choose two.)",
    options: [
      "DHCPDISCOVER",
      "DHCPREQUEST",
      "DHCPOFFER",
      "DHCPACK"
    ],
    answer: [0, 1],
    explanation: "The client broadcasts DHCPDISCOVER because it has no address or server information yet, and it also broadcasts DHCPREQUEST so that all servers that made offers learn which one was selected and can release the others' reserved addresses. DHCPOFFER and DHCPACK are sent by the server, not the client, so they cannot be correct regardless of how they are delivered. Remembering that the client speaks first and third in the DORA exchange (Discover, Offer, Request, Ack) helps keep the directions straight."
  },
  {
    id: "ips-021",
    domain: "IP Services",
    type: "single",
    question: "A firewall sits between a branch router acting as a DHCP relay agent and the central DHCP server. Which traffic must the firewall permit so that relayed client requests reach the server?",
    options: [
      "UDP packets destined to port 67 on the server",
      "UDP packets destined to port 68 on the server",
      "TCP packets destined to port 67 on the server",
      "UDP packets destined to port 53 on the server"
    ],
    answer: [0],
    explanation: "A relay agent converts the client's broadcast into a unicast UDP packet addressed to the DHCP server's port 67, which is the server-side port for DHCP/BOOTP. Port 68 is the client-side port, used when the server or relay sends replies back toward the client, so it is the tempting near-miss here. DHCP runs over UDP, not TCP, so any TCP rule is irrelevant. UDP 53 is DNS, a different service entirely even though DHCP often distributes DNS server addresses."
  },
  {
    id: "ips-022",
    domain: "IP Services",
    type: "single",
    question: "Refer to the exhibit. Clients in the 192.168.20.0/24 subnet attached to GigabitEthernet0/0 cannot obtain addresses from the DHCP server at 10.10.10.10, which is reachable through GigabitEthernet0/1. What is the cause?",
    exhibit: "interface GigabitEthernet0/0\n description LAN - user clients\n ip address 192.168.20.1 255.255.255.0\n!\ninterface GigabitEthernet0/1\n description Link to data center\n ip address 10.0.0.1 255.255.255.252\n ip helper-address 10.10.10.10",
    options: [
      "The ip helper-address command is configured on the wrong interface",
      "The helper address should point to the client subnet instead of the server",
      "DHCP relay requires the command on both interfaces simultaneously",
      "The /30 mask on GigabitEthernet0/1 cannot carry relayed broadcasts"
    ],
    answer: [0],
    explanation: "The helper address must be configured on the interface that receives the clients' DHCPDISCOVER broadcasts, which is GigabitEthernet0/0; placed on the server-facing link it never sees the broadcasts and relays nothing. The command's argument correctly names the server, so pointing it at the client subnet would be backwards. Only the client-facing interface needs the command, and the relayed packet is a routed unicast, so the mask of the transit link is irrelevant."
  },
  {
    id: "ips-023",
    domain: "IP Services",
    type: "single",
    question: "What does a router configured with ip helper-address do when it receives a DHCPDISCOVER broadcast from a client?",
    options: [
      "It forwards the message as a unicast to the configured server and records its receiving interface address in the giaddr field",
      "It answers the client directly from a local address pool before contacting the server",
      "It floods the broadcast out all other interfaces so any DHCP server can respond",
      "It translates the client's source address with NAT before forwarding the broadcast"
    ],
    answer: [0],
    explanation: "A relay agent rewrites the broadcast into a unicast addressed to the helper address and inserts the IP address of the interface that received the request into the giaddr (gateway address) field, which the server uses to select a scope matching the client's subnet. The router does not answer from a local pool unless it is itself configured as a DHCP server, which is a separate function. Routers never flood broadcasts between subnets; that is exactly the problem relay solves. NAT is not involved in DHCP relay at all."
  },
  {
    id: "ips-024",
    domain: "IP Services",
    type: "multi",
    question: "In addition to DHCP/BOOTP, which two UDP services are forwarded by default when ip helper-address is configured on an interface? (Choose two.)",
    options: [
      "TFTP (port 69)",
      "DNS (port 53)",
      "SNMP (port 161)",
      "HTTP (port 80)",
      "Syslog (port 514)"
    ],
    answer: [0, 1],
    explanation: "By default the helper address relays eight UDP services, including TFTP (69), DNS (53), time (37), TACACS (49), NetBIOS name and datagram services (137/138), and BOOTP server and client (67/68). SNMP and syslog are UDP services but are not in the default forwarded list, making them attractive distractors. HTTP runs over TCP and broadcasts are not used for it, so it could never be relayed by this mechanism. Additional UDP ports can be added or removed with the ip forward-protocol udp command."
  },
  {
    id: "ips-025",
    domain: "IP Services",
    type: "single",
    question: "Refer to the exhibit. A user's PC can reach hosts by IP address but not by name. Which network service is the most likely cause of the failure?",
    exhibit: "C:\\> ping 198.51.100.25\nReply from 198.51.100.25: bytes=32 time=12ms TTL=54\nReply from 198.51.100.25: bytes=32 time=11ms TTL=54\n\nC:\\> ping www.example.com\nPing request could not find host www.example.com. Please check the name and try again.",
    options: [
      "DNS resolution is failing because the configured DNS server is wrong or unreachable",
      "The PC's default gateway is misconfigured, blocking off-subnet traffic",
      "DHCP failed to assign the PC an IP address from the local pool",
      "NAT on the edge router is not translating the PC's private address"
    ],
    answer: [0],
    explanation: "Successful pings to a remote IP address prove that addressing, the default gateway, routing, and NAT are all functioning; only the translation of names to addresses is broken, which is the job of DNS. A bad default gateway would make the ping to 198.51.100.25 fail too. A DHCP failure would typically leave the PC with an APIPA address and no remote connectivity at all. A NAT problem would block both tests equally because both ultimately send packets to remote destinations."
  },
  {
    id: "ips-026",
    domain: "IP Services",
    type: "single",
    question: "Refer to the exhibit. An engineer tries to ping a server by hostname from router R1 and receives this output. Which command resolves the issue?",
    exhibit: "R1# ping fileserver\nTranslating \"fileserver\"...domain server (255.255.255.255)\n% Unrecognized host or address, or protocol not running.",
    options: [
      "ip name-server 10.1.1.53",
      "no ip domain-lookup",
      "ip dhcp pool FILESERVER",
      "ip helper-address 10.1.1.53"
    ],
    answer: [0],
    explanation: "The router is attempting DNS resolution but, lacking a configured name server, it broadcasts the query to 255.255.255.255, which fails; ip name-server points the router at a real DNS server so lookups succeed. no ip domain-lookup is the classic distractor: it disables resolution entirely, which stops the broadcast attempts but makes pinging by name permanently impossible. A DHCP pool hands out addresses to clients and does not give the router resolution capability. ip helper-address relays client broadcasts on an interface and does not configure the router's own DNS client."
  },
  {
    id: "ips-027",
    domain: "IP Services",
    type: "dragdrop",
    question: "Drag each DHCP message to its position in the initial lease negotiation between a client and a server.",
    items: [
      "DHCPREQUEST",
      "DHCPACK",
      "DHCPDISCOVER",
      "DHCPOFFER"
    ],
    targets: [
      "Step 1: The client broadcasts to locate available DHCP servers",
      "Step 2: A server proposes an address lease and options to the client",
      "Step 3: The client broadcasts its acceptance of one server's proposal",
      "Step 4: The server confirms the lease and finalizes the configuration"
    ],
    answer: [2, 3, 0, 1],
    explanation: "The DORA sequence is Discover, Offer, Request, Acknowledgment. The client opens with a broadcast DHCPDISCOVER, servers respond with DHCPOFFER, the client broadcasts a DHCPREQUEST naming the chosen server so the others can withdraw their offers, and the selected server completes the exchange with DHCPACK. A common mistake is placing Request before Offer; the client cannot request a specific lease until a server has offered one."
  },
  {
    id: "ips-028",
    domain: "IP Services",
    type: "single",
    question: "A security team requires that network monitoring traffic be both authenticated and encrypted between the management station and managed routers. Which SNMP configuration meets the requirement?",
    options: [
      "SNMPv3 with the authPriv security level",
      "SNMPv2c with a complex read-only community string",
      "SNMPv3 with the noAuthNoPriv security level",
      "SNMPv2c with separate read-only and read-write community strings"
    ],
    answer: [0],
    explanation: "Only SNMPv3 provides per-user security, and only its authPriv level applies both authentication (HMAC with MD5 or SHA) and privacy (encryption with DES or AES). SNMPv2c community strings travel in cleartext no matter how complex they are, so they provide neither authentication integrity nor confidentiality. SNMPv3 noAuthNoPriv disables both protections and is essentially equivalent to community-based access. Splitting RO and RW communities limits what a captured string can do but still encrypts nothing."
  },
  {
    id: "ips-029",
    domain: "IP Services",
    type: "single",
    question: "What is the key difference between an SNMP trap and an SNMP inform sent from an agent to a manager?",
    options: [
      "An inform is acknowledged by the manager and retransmitted if no acknowledgment arrives, while a trap is unacknowledged",
      "A trap uses TCP for reliability, while an inform uses connectionless UDP",
      "An inform can only be generated when the manager polls the agent first",
      "A trap is supported only in SNMPv3, while informs exist in all versions"
    ],
    answer: [0],
    explanation: "Both traps and informs are unsolicited notifications from agent to manager, but the manager returns an acknowledgment for an inform, and the agent retransmits informs that go unacknowledged, making them more reliable at the cost of memory and bandwidth. Both message types ride over UDP (port 162 on the manager); neither uses TCP. Informs are unsolicited just like traps, so no polling is required to trigger them. Traps have existed since SNMPv1, while informs were introduced with SNMPv2, so the version claim is reversed."
  },
  {
    id: "ips-030",
    domain: "IP Services",
    type: "single",
    question: "Within the SNMP framework, what is the Management Information Base (MIB)?",
    options: [
      "A hierarchical database of variables on the managed device, each identified by an object ID, that the agent exposes to managers",
      "The software process on the management station that polls devices for statistics",
      "The shared password that authenticates managers to SNMPv2c agents",
      "A log file on the manager that stores every trap received from agents"
    ],
    answer: [0],
    explanation: "The MIB is the structured, tree-organized collection of manageable objects (interface counters, CPU load, and so on), where each variable is addressed by a numeric object identifier (OID); managers issue Get and Set operations against these OIDs. The polling software on the management station is the SNMP manager (NMS), not the MIB. The shared password in community-based SNMP is the community string. Received traps may be logged by an NMS, but that storage is an application feature, not the MIB."
  }
);
