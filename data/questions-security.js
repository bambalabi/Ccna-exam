(window.QUESTION_BANK = window.QUESTION_BANK || []).push(
  {
    id: "sec-001",
    domain: "Security Fundamentals",
    type: "single",
    question: "A security analyst discovers that a public-facing web server is running an outdated version of Apache that contains a known remote code execution flaw. No attack against the server has occurred yet. Which term best describes this finding?",
    options: [
      "A vulnerability",
      "A threat",
      "An exploit",
      "A mitigation technique"
    ],
    answer: [0],
    explanation: "A vulnerability is a weakness in a system, such as unpatched software, that could potentially be taken advantage of. A threat is a potential danger that might act on the vulnerability (for example, an attacker or malware), and an exploit is the actual tool or technique used to take advantage of the vulnerability. A mitigation technique is a countermeasure, such as installing the patch. Because nothing has acted on the weakness yet, the unpatched flaw itself is a vulnerability."
  },
  {
    id: "sec-002",
    domain: "Security Fundamentals",
    type: "single",
    question: "An attacker downloads a publicly available script that takes advantage of a documented buffer overflow in a router's firmware to obtain shell access. Which term describes the script itself?",
    options: [
      "An exploit",
      "A vulnerability",
      "A threat actor",
      "A risk assessment"
    ],
    answer: [0],
    explanation: "An exploit is the specific mechanism, code, or technique used to take advantage of a vulnerability. The buffer overflow in the firmware is the vulnerability, and the attacker is the threat actor. The script is what actually leverages the weakness, which makes it an exploit. A risk assessment is an administrative process for evaluating exposure and is unrelated to the script."
  },
  {
    id: "sec-003",
    domain: "Security Fundamentals",
    type: "single",
    question: "Employees in a company's finance department receive emails that appear to come from their CFO. Each message addresses the recipient by name, references a real internal project, and asks the user to open an attached invoice. Which type of attack is being carried out?",
    options: [
      "Spear phishing",
      "Phishing",
      "Whaling",
      "Vishing"
    ],
    answer: [0],
    explanation: "Spear phishing is a phishing attack customized for a specific group or individual, using personal or organizational details to appear legitimate. Generic phishing is sent in bulk without personalization, so the targeted nature of these emails rules it out. Whaling is a phishing attack that targets the executives themselves, but here the executives are being impersonated while ordinary finance staff are the victims. Vishing uses voice calls rather than email."
  },
  {
    id: "sec-004",
    domain: "Security Fundamentals",
    type: "single",
    question: "An attacker connected to an office LAN sends forged gratuitous ARP messages so that hosts send traffic destined for the default gateway to the attacker's MAC address. The attacker silently forwards the traffic to the real gateway after inspecting it. Which type of attack is this?",
    options: [
      "Man-in-the-middle attack",
      "MAC address flooding attack",
      "DHCP starvation attack",
      "Reflection attack"
    ],
    answer: [0],
    explanation: "By poisoning ARP caches, the attacker inserts itself into the traffic path between hosts and the gateway, intercepting and relaying frames; this is a classic man-in-the-middle attack using ARP spoofing. MAC flooding overflows the switch CAM table to force frame flooding, which is a different technique. DHCP starvation exhausts a DHCP scope with bogus requests, and a reflection attack bounces traffic off third-party servers toward a victim; neither places the attacker in the middle of a conversation."
  },
  {
    id: "sec-005",
    domain: "Security Fundamentals",
    type: "dragdrop",
    question: "Drag each attack type on the left to its matching description on the right.",
    items: ["Whaling", "Vishing", "Watering hole", "Smishing"],
    targets: [
      "Telephone calls used to trick users into revealing credentials or sensitive data",
      "Fraudulent SMS text messages containing malicious links or requests",
      "A phishing campaign aimed specifically at senior executives",
      "Compromising a legitimate website that a target group is known to visit"
    ],
    answer: [1, 3, 0, 2],
    explanation: "Vishing (voice phishing) uses phone calls, while smishing uses SMS text messages as the delivery channel. Whaling is phishing that targets high-value individuals such as C-level executives. A watering hole attack does not contact victims directly; instead, the attacker infects a website the victims regularly visit and waits for them to browse to it."
  },
  {
    id: "sec-006",
    domain: "Security Fundamentals",
    type: "single",
    question: "Hundreds of compromised hosts send small DNS queries to open resolvers using a spoofed source IP address, causing the resolvers to send much larger responses that overwhelm the spoofed victim. Which type of attack is described?",
    options: [
      "A reflection and amplification DDoS attack",
      "A TCP SYN flood DoS attack",
      "A man-in-the-middle attack",
      "An ARP spoofing attack"
    ],
    answer: [0],
    explanation: "The attack reflects traffic off third-party DNS servers by spoofing the victim's address as the source, and it amplifies the volume because DNS responses are larger than the queries. The distributed botnet origin makes it a DDoS. A SYN flood exhausts a target's TCP connection resources with half-open connections rather than using third-party reflectors. Man-in-the-middle and ARP spoofing attacks intercept traffic instead of denying service."
  },
  {
    id: "sec-007",
    domain: "Security Fundamentals",
    type: "multi",
    question: "Which two attacks are categorized as social engineering? (Choose two.)",
    options: [
      "Pretexting, where an attacker poses as a help desk technician on a phone call to obtain a password",
      "Tailgating through a badge-controlled door directly behind an authorized employee",
      "Exploiting a SQL injection flaw in a public web form",
      "Flooding a switch CAM table with frames that have random source MAC addresses"
    ],
    answer: [0, 1],
    explanation: "Social engineering manipulates people rather than technology. Pretexting uses an invented scenario to trick a person into revealing information, and tailgating exploits human courtesy to bypass physical access control; both rely on deceiving humans. SQL injection is a technical exploitation of an application vulnerability, and CAM table flooding is a technical Layer 2 attack against a switch, so neither is social engineering."
  },
  {
    id: "sec-008",
    domain: "Security Fundamentals",
    type: "single",
    question: "After learning of a critical flaw in its VPN appliance, a company installs the vendor patch and adds an ACL that restricts management access to the appliance. Which term describes these actions?",
    options: [
      "Mitigation techniques",
      "Exploits",
      "Vulnerabilities",
      "Threat vectors"
    ],
    answer: [0],
    explanation: "A mitigation technique is any countermeasure that reduces the likelihood or impact of a vulnerability being exploited, such as patching software or restricting access with ACLs. The flaw itself is the vulnerability, and an exploit would be the code or method used to attack it. A threat vector is the path an attacker uses to reach a target, not the defensive action taken against it."
  },
  {
    id: "sec-009",
    domain: "Security Fundamentals",
    type: "single",
    question: "A piece of malware propagates automatically from host to host across the network by exploiting a vulnerable file-sharing service, without requiring any user interaction or a host file to attach to. Which type of malware is this?",
    options: [
      "A worm",
      "A virus",
      "A trojan horse",
      "Ransomware"
    ],
    answer: [0],
    explanation: "A worm is self-replicating malware that spreads across networks on its own by exploiting vulnerabilities, with no user action required. A virus must attach itself to a host file or program and generally relies on a user to execute it. A trojan horse disguises itself as legitimate software to trick a user into installing it. Ransomware describes the payload behavior of encrypting data for extortion, not the self-propagating spread described here."
  },
  {
    id: "sec-010",
    domain: "Security Fundamentals",
    type: "multi",
    question: "Which two statements about denial-of-service attacks are true? (Choose two.)",
    options: [
      "A DDoS attack uses many distributed sources, often a botnet, to overwhelm a target simultaneously",
      "A TCP SYN flood exhausts the target's connection resources by initiating handshakes that are never completed",
      "A DoS attack always requires malware to be installed on the victim system",
      "The primary goal of a DDoS attack is to exfiltrate confidential data from the target"
    ],
    answer: [0, 1],
    explanation: "DDoS attacks are distributed by definition, typically launched from botnets so the combined traffic overwhelms the victim, and a SYN flood works by leaving many half-open TCP connections that consume the target's resources. DoS attacks target availability from the outside, so no malware needs to run on the victim itself. Their goal is to disrupt service, not to steal data; data exfiltration is a different attack objective."
  },
  {
    id: "sec-011",
    domain: "Security Fundamentals",
    type: "single",
    question: "A company periodically sends simulated phishing emails to all employees. Users who click the embedded link are shown a warning page with tips for recognizing fraudulent messages. Which security program element does this describe?",
    options: [
      "A user awareness program",
      "A formal user training program",
      "A penetration test of the email infrastructure",
      "A vulnerability assessment"
    ],
    answer: [0],
    explanation: "User awareness programs keep security in employees' minds through informal, ongoing efforts such as simulated phishing campaigns, posters, and reminders. Formal user training consists of structured, often mandatory courses with defined curricula, which is not what is described. A penetration test evaluates technical defenses rather than user behavior, and a vulnerability assessment scans systems for weaknesses; neither involves educating users through simulations."
  },
  {
    id: "sec-012",
    domain: "Security Fundamentals",
    type: "single",
    question: "A company installs badge readers, a mantrap vestibule, and locked equipment racks at the entrance to its data center. Which security program element is being implemented?",
    options: [
      "Physical access control",
      "User awareness",
      "Network access control with 802.1X",
      "AAA-based device administration"
    ],
    answer: [0],
    explanation: "Badge readers, mantraps, locks, and similar measures restrict which people can physically reach equipment, which is the definition of physical access control. User awareness addresses employee behavior through education, not physical barriers. 802.1X network access control and AAA device administration are logical controls that restrict network or CLI access and do nothing to stop someone from physically entering the room."
  },
  {
    id: "sec-013",
    domain: "Security Fundamentals",
    type: "dragdrop",
    question: "Drag each security program element on the left to its matching description on the right.",
    items: ["Physical access control", "User awareness", "Acceptable use policy", "User training"],
    targets: [
      "Simulated phishing campaigns and posters that keep security in employees' minds",
      "Mandatory classroom or online courses covering corporate security policies",
      "Badge readers and locked racks that restrict entry to network equipment",
      "A signed document defining how employees may use company systems"
    ],
    answer: [1, 3, 0, 2],
    explanation: "User awareness uses informal, ongoing reminders such as phishing simulations, while user training delivers formal, structured instruction on policies and procedures. Physical access control covers badges, locks, and barriers that protect equipment from unauthorized physical contact. An acceptable use policy is an administrative document that users sign to acknowledge the rules for using corporate systems."
  },
  {
    id: "sec-014",
    domain: "Security Fundamentals",
    type: "multi",
    question: "Which two measures are examples of physical access control? (Choose two.)",
    options: [
      "Biometric door locks on the network equipment closet",
      "Video surveillance cameras monitoring the server room entrance",
      "Enabling service password-encryption on all routers",
      "Configuring login banners on the vty lines of switches"
    ],
    answer: [0, 1],
    explanation: "Physical access control protects equipment and facilities from unauthorized physical entry; biometric locks restrict who can open the door, and surveillance cameras deter and detect physical intrusion. The service password-encryption command obscures passwords in a device configuration file, which is a logical device-hardening measure. Login banners present legal notices to users connecting to the CLI and likewise control logical, not physical, access."
  },
  {
    id: "sec-015",
    domain: "Security Fundamentals",
    type: "single",
    question: "A network engineer configures both the enable password and the enable secret commands on a router. Which statement is true?",
    options: [
      "The enable secret is stored as an MD5 hash and is the password used when both are configured",
      "The enable password is encrypted with MD5 by default",
      "The enable secret is encrypted only if service password-encryption is also configured",
      "The enable password takes precedence because it appears first in the configuration"
    ],
    answer: [0],
    explanation: "The enable secret command stores the password as an MD5 hash (type 5) by default and always overrides the enable password when both exist. The enable password is stored in plaintext unless service password-encryption is applied, and even then it only receives weak, reversible type 7 encoding. The enable secret is hashed automatically without requiring service password-encryption, and precedence is determined by command type, not configuration order."
  }
);
(window.QUESTION_BANK = window.QUESTION_BANK || []).push(
  {
    id: "sec-016",
    domain: "Security Fundamentals",
    type: "single",
    question: "Refer to the exhibit. The ACL is applied as shown. Which source IP address is permitted to send traffic out of interface GigabitEthernet0/1?",
    exhibit: "R1(config)# access-list 10 deny 172.16.4.0 0.0.3.255\nR1(config)# access-list 10 permit 172.16.0.0 0.0.15.255\nR1(config)# interface GigabitEthernet0/1\nR1(config-if)# ip access-group 10 out",
    options: [
      "172.16.5.10",
      "172.16.8.20",
      "172.16.16.1",
      "172.16.6.250"
    ],
    answer: [1],
    explanation: "The wildcard 0.0.3.255 makes the deny statement match sources 172.16.4.0 through 172.16.7.255, so 172.16.5.10 and 172.16.6.250 are denied by the first line. The permit statement with wildcard 0.0.15.255 matches 172.16.0.0 through 172.16.15.255, which includes 172.16.8.20, so it is permitted. 172.16.16.1 falls outside the permit range and is dropped by the implicit deny at the end of every ACL."
  },
  {
    id: "sec-017",
    domain: "Security Fundamentals",
    type: "single",
    question: "Refer to the exhibit. Host 10.1.1.50 initiates an HTTPS session to server 192.168.10.5. The ACL is applied inbound on the router interface facing the 10.1.1.0/24 LAN. What does the router do with the traffic?",
    exhibit: "ip access-list extended WEB\n permit tcp 10.1.1.0 0.0.0.255 any eq 443\n deny ip 10.1.1.0 0.0.0.255 192.168.10.0 0.0.0.255\n permit ip 10.1.1.0 0.0.0.255 any",
    options: [
      "It permits the traffic because the first statement matches before the deny is evaluated",
      "It denies the traffic because the deny statement is more specific",
      "It denies the traffic because deny statements are always processed first",
      "It permits the traffic because the final permit statement overrides the deny"
    ],
    answer: [0],
    explanation: "ACLs are processed sequentially from the top, and the first matching statement is applied with no further evaluation. The HTTPS packet from 10.1.1.50 to 192.168.10.5 with destination port 443 matches the first permit statement, so it is forwarded and the deny on line two is never consulted. IOS does not prioritize more specific statements or deny statements; only statement order matters, and later statements cannot override an earlier match."
  },
  {
    id: "sec-018",
    domain: "Security Fundamentals",
    type: "single",
    question: "A network engineer must create a standard ACL entry that matches all hosts in the 192.168.1.64/27 subnet and no others. Which command accomplishes this task?",
    options: [
      "access-list 20 permit 192.168.1.64 0.0.0.31",
      "access-list 20 permit 192.168.1.64 0.0.0.32",
      "access-list 20 permit 192.168.1.64 255.255.255.224",
      "access-list 20 permit 192.168.1.64 0.0.0.63"
    ],
    answer: [0],
    explanation: "A /27 subnet contains 32 addresses, and the wildcard mask is calculated by subtracting the subnet mask from 255.255.255.255, giving 0.0.0.31. This matches exactly 192.168.1.64 through 192.168.1.95. The wildcard 0.0.0.63 would also match 192.168.1.96 through 192.168.1.127, which is too broad. 255.255.255.224 is the subnet mask itself, not a wildcard, and 0.0.0.32 is not a valid contiguous wildcard for this block."
  },
  {
    id: "sec-019",
    domain: "Security Fundamentals",
    type: "single",
    question: "According to Cisco best practice, why should a standard ACL be placed as close to the destination as possible?",
    options: [
      "Standard ACLs filter only on source address, so placing them near the source could block traffic to destinations that should remain reachable",
      "Standard ACLs consume more CPU resources than extended ACLs and must be offloaded to the destination router",
      "Standard ACLs can only be applied in the outbound direction, which exists only on destination-facing interfaces",
      "Standard ACLs filter only on destination address, so they have no effect until the packet nears the destination"
    ],
    answer: [0],
    explanation: "A standard ACL matches only the source IP address of a packet. If it is applied near the source, it blocks that source from reaching every destination beyond the interface, which is usually more than intended. Placing it near the destination limits the filtering to the specific destination network. Standard ACLs can be applied inbound or outbound, they filter on source rather than destination, and CPU consumption is not the reason for the placement rule."
  },
  {
    id: "sec-020",
    domain: "Security Fundamentals",
    type: "single",
    question: "Refer to the exhibit. The ACL is applied inbound on the router interface facing the Internet. An administrator on the Internet side attempts to ping server 10.10.10.5. What is the result?",
    exhibit: "access-list 110 permit tcp any host 10.10.10.5 eq 22\naccess-list 110 permit tcp any host 10.10.10.5 eq 80\ninterface Serial0/0/0\n ip access-group 110 in",
    options: [
      "The ping is dropped by the implicit deny at the end of the ACL",
      "The ping succeeds because ICMP is not filtered by extended ACLs",
      "The ping succeeds because no explicit deny statement exists in the ACL",
      "The ping is dropped because ICMP traffic requires an explicit permit icmp statement in every ACL by default"
    ],
    answer: [0],
    explanation: "Every IOS ACL ends with an invisible implicit deny any statement. The ACL permits only TCP traffic to ports 22 and 80 on the server, so an ICMP echo request matches neither permit line and is silently dropped by the implicit deny. The absence of an explicit deny does not mean traffic is allowed, and extended ACLs absolutely can filter ICMP. The fourth option is wrong because ICMP is dropped by the implicit deny, not by a special ICMP rule."
  },
  {
    id: "sec-021",
    domain: "Security Fundamentals",
    type: "multi",
    question: "Refer to the exhibit. The ACL is applied inbound on the LAN interface for the 10.2.2.0/24 subnet. Which two packets are permitted? (Choose two.)",
    exhibit: "ip access-list extended BRANCH\n deny tcp 10.2.2.0 0.0.0.255 any eq 23\n permit udp any any eq 53\n permit tcp 10.2.2.0 0.0.0.255 host 203.0.113.10 eq 25",
    options: [
      "A Telnet session from 10.2.2.5 to 198.51.100.7",
      "A DNS query over UDP from 10.2.2.9 to 8.8.8.8",
      "An SMTP connection from 10.2.2.7 to 203.0.113.10",
      "An HTTP request from 10.2.2.8 to 198.51.100.20"
    ],
    answer: [1, 2],
    explanation: "The DNS query matches the permit udp any any eq 53 statement, and the SMTP connection to 203.0.113.10 on TCP port 25 matches the third statement, so both are forwarded. The Telnet session is explicitly denied by the first line, which matches destination port 23. The HTTP request matches no permit statement and is discarded by the implicit deny that terminates every ACL."
  },
  {
    id: "sec-022",
    domain: "Security Fundamentals",
    type: "single",
    question: "An engineer must configure a numbered standard ACL but the range 1 through 99 is fully used on the router. Which ACL number can the engineer use instead?",
    options: [
      "1350",
      "150",
      "2400",
      "199"
    ],
    answer: [0],
    explanation: "Standard ACLs use the numbered ranges 1 through 99 and the expanded range 1300 through 1999, so 1350 creates a standard ACL. The numbers 150 and 199 fall in the extended ACL range of 100 through 199, and 2400 falls in the expanded extended range of 2000 through 2699. Choosing a number from the wrong range changes the ACL type and the fields it can match."
  },
  {
    id: "sec-023",
    domain: "Security Fundamentals",
    type: "single",
    question: "A network engineer must use a standard ACL on router R1 to prevent only host 192.168.1.10 from reaching server 10.0.0.5. The server resides on the LAN connected to R1 interface GigabitEthernet0/1, and the host enters R1 through GigabitEthernet0/0. Where should the ACL be applied?",
    options: [
      "Outbound on GigabitEthernet0/1",
      "Inbound on GigabitEthernet0/0",
      "Outbound on GigabitEthernet0/0",
      "Inbound on GigabitEthernet0/1"
    ],
    answer: [0],
    explanation: "Because a standard ACL filters only on source address, applying it inbound on Gi0/0 would block 192.168.1.10 from reaching every destination through R1, not just the server. Applying it outbound on Gi0/1, the interface closest to the destination LAN, restricts the filtering to traffic heading toward the server's network while leaving other destinations reachable. Outbound on Gi0/0 and inbound on Gi0/1 are the wrong directions for traffic flowing from the host to the server."
  },
  {
    id: "sec-024",
    domain: "Security Fundamentals",
    type: "single",
    question: "Refer to the exhibit. An engineer must allow SSH from the 192.168.50.0/24 network to server 10.5.5.5 without removing the existing protection. Which configuration accomplishes this?",
    exhibit: "ip access-list extended SERVER-PROTECT\n 10 permit tcp any host 10.5.5.5 eq 443\n 20 deny ip any host 10.5.5.5",
    options: [
      "ip access-list extended SERVER-PROTECT\n 15 permit tcp 192.168.50.0 0.0.0.255 host 10.5.5.5 eq 22",
      "ip access-list extended SERVER-PROTECT\n 30 permit tcp 192.168.50.0 0.0.0.255 host 10.5.5.5 eq 22",
      "access-list 100 permit tcp 192.168.50.0 0.0.0.255 host 10.5.5.5 eq 22",
      "ip access-list extended SERVER-PROTECT\n 5 deny tcp 192.168.50.0 0.0.0.255 host 10.5.5.5 eq 22"
    ],
    answer: [0],
    explanation: "Named ACLs support sequence numbers, so inserting the permit statement at sequence 15 places it before the deny at sequence 20, allowing SSH to be matched first. Adding the statement at sequence 30 puts it after the deny, so SSH traffic would already be dropped before reaching it. Creating access-list 100 builds a separate ACL that is not applied to the interface, and a deny statement at sequence 5 would block SSH rather than permit it."
  },
  {
    id: "sec-025",
    domain: "Security Fundamentals",
    type: "single",
    question: "Which wildcard mask in an ACL statement is the functional equivalent of the host keyword?",
    options: [
      "0.0.0.0",
      "255.255.255.255",
      "0.0.0.255",
      "255.255.255.0"
    ],
    answer: [0],
    explanation: "A wildcard bit of 0 means the corresponding address bit must match exactly, so the wildcard 0.0.0.0 requires all 32 bits to match a single address, which is exactly what the host keyword does. The wildcard 255.255.255.255 ignores every bit and is equivalent to the any keyword. The masks 0.0.0.255 and 255.255.255.0 are wrong because the first matches a /24 range of addresses and the second is a subnet mask pattern, not a host wildcard."
  },
  {
    id: "sec-026",
    domain: "Security Fundamentals",
    type: "single",
    question: "Refer to the exhibit. What is the effect of this configuration on router R1?",
    exhibit: "access-list 5 permit 10.99.99.0 0.0.0.255\nline vty 0 4\n access-class 5 in\n transport input ssh",
    options: [
      "Only devices with source addresses in 10.99.99.0/24 can open SSH sessions to R1",
      "Traffic from 10.99.99.0/24 passing through R1 is permitted and all other transit traffic is dropped",
      "Devices in 10.99.99.0/24 are blocked from managing R1 while all other networks are allowed",
      "Hosts in 10.99.99.0/24 can reach R1 using both Telnet and SSH"
    ],
    answer: [0],
    explanation: "The access-class command applies the ACL to management sessions terminating at the vty lines, not to transit traffic, so only sources in 10.99.99.0/24 may connect and the implicit deny blocks all other addresses. Because the ACL is a permit statement, those hosts are allowed rather than blocked. Telnet is unavailable to everyone because transport input ssh restricts the vty lines to SSH only, and traffic routed through R1 is completely unaffected by an access-class entry."
  },
  {
    id: "sec-027",
    domain: "Security Fundamentals",
    type: "multi",
    question: "Which two statements about ACL processing and placement are true? (Choose two.)",
    options: [
      "Extended ACLs should be placed as close to the source of traffic as possible",
      "An ACL is evaluated top-down and processing stops at the first matching statement",
      "An unmatched packet is forwarded because ACLs end with an implicit permit",
      "Standard ACLs should be placed as close to the source of traffic as possible",
      "A packet is compared against every statement and the most specific match is applied"
    ],
    answer: [0, 1],
    explanation: "Extended ACLs match source, destination, protocol, and ports, so they can safely drop unwanted traffic near the source before it consumes bandwidth. Statements are evaluated sequentially and the first match ends processing, so order is critical. ACLs end with an implicit deny, not an implicit permit, standard ACLs belong near the destination because they match only the source address, and IOS never searches for the most specific match the way a routing table does."
  },
  {
    id: "sec-028",
    domain: "Security Fundamentals",
    type: "single",
    question: "Refer to the exhibit. Which range of source addresses is matched by the permit statement?",
    exhibit: "R2(config)# access-list 30 permit 10.0.16.0 0.0.7.255",
    options: [
      "10.0.16.0 through 10.0.23.255",
      "10.0.16.0 through 10.0.31.255",
      "10.0.16.0 through 10.0.16.255",
      "10.0.0.0 through 10.0.23.255"
    ],
    answer: [0],
    explanation: "The wildcard 0.0.7.255 leaves the first 21 bits fixed and allows the last 11 bits to vary, which covers a block of 8 values in the third octet. Starting at 10.0.16.0, the matched range is 10.0.16.0 through 10.0.23.255, equivalent to 10.0.16.0/21. A range ending at 10.0.31.255 would require wildcard 0.0.15.255, a single /24 would use 0.0.0.255, and the range starting at 10.0.0.0 ignores the configured base address of 10.0.16.0."
  },
  {
    id: "sec-029",
    domain: "Security Fundamentals",
    type: "single",
    question: "Refer to the exhibit. After the ACL is applied inbound on the Internet-facing interface, users report that all return traffic from the Internet is blocked. What is the cause?",
    exhibit: "ip access-list extended INTERNET-IN\n 10 deny ip any any log\n 20 permit tcp any any established",
    options: [
      "The deny statement at sequence 10 matches all packets first, so the permit at sequence 20 is never evaluated",
      "The established keyword only works in ACLs applied in the outbound direction",
      "The log keyword on the deny statement disables the rest of the ACL",
      "Return traffic requires a permit udp any any established statement as well"
    ],
    answer: [0],
    explanation: "Because ACL processing stops at the first match, the deny ip any any statement at sequence 10 matches every packet and the established permit at sequence 20 can never be reached. The engineer must place the permit statement before the deny. The established keyword works in either direction, the log keyword only generates syslog messages and does not change matching behavior, and established applies only to TCP because it checks the ACK or RST flags, so a UDP version does not exist."
  },
  {
    id: "sec-030",
    domain: "Security Fundamentals",
    type: "dragdrop",
    question: "Drag each ACL characteristic on the left to its matching ACL concept on the right.",
    items: [
      "Drops traffic that matches no configured entry",
      "Filters using source address only",
      "Allows entries to be inserted using sequence numbers",
      "Filters using source, destination, protocol, and port numbers"
    ],
    targets: [
      "Standard ACL",
      "Extended ACL",
      "Named ACL editing",
      "Implicit deny"
    ],
    answer: [1, 3, 2, 0],
    explanation: "Standard ACLs examine only the source IP address, which is why they are placed near the destination. Extended ACLs match source and destination addresses plus protocol and port information, allowing precise filtering near the source. Named ACL configuration mode supports sequence numbers, so individual entries can be inserted or deleted without rebuilding the list. The implicit deny at the end of every ACL silently drops any packet that matches no configured entry."
  }
);
(window.QUESTION_BANK = window.QUESTION_BANK || []).push(
  {
    id: "sec-031",
    domain: "Security Fundamentals",
    type: "single",
    question: "Refer to the exhibit. GigabitEthernet0/0 connects to the internal LAN 192.168.1.0/24 and GigabitEthernet0/1 connects to the Internet. The goal is to block Internet hosts from reaching web servers on the LAN, but testing shows HTTP from the Internet still succeeds. Why does the configuration fail?",
    exhibit: "interface GigabitEthernet0/0\n ip address 192.168.1.1 255.255.255.0\n ip access-group 120 in\n!\naccess-list 120 deny tcp any 192.168.1.0 0.0.0.255 eq 80\naccess-list 120 permit ip any any",
    options: [
      "Applied inbound on Gi0/0, the ACL examines traffic leaving the LAN instead of traffic going toward it",
      "The deny statement must specify the established keyword to match HTTP traffic",
      "Extended ACLs cannot match the HTTP port and a standard ACL is required",
      "The permit ip any any statement is matched before the deny statement"
    ],
    answer: [0],
    explanation: "Inbound on Gi0/0 means packets entering the router from the LAN, which is traffic sourced by internal hosts, so packets arriving from the Internet toward the web servers never hit the ACL. The fix is to apply the ACL inbound on Gi0/1 or outbound on Gi0/0. The established keyword is unrelated to this failure, extended ACLs are exactly what match TCP port 80, and statements are processed top-down so the deny would be evaluated before the permit."
  },
  {
    id: "sec-032",
    domain: "Security Fundamentals",
    type: "single",
    question: "What is the purpose of the established keyword in the ACL statement permit tcp any any established?",
    options: [
      "It permits TCP segments that have the ACK or RST flag set, allowing return traffic for sessions initiated internally",
      "It permits only the initial SYN segment so new sessions can be established",
      "It tracks full session state so that related UDP and ICMP traffic is also permitted",
      "It permits TCP traffic only after the three-way handshake is verified in the router's connection table"
    ],
    answer: [0],
    explanation: "The established keyword matches TCP segments with the ACK or RST bit set, which are present in every segment of a session except the initial SYN. This allows replies to internally initiated connections while blocking new inbound connection attempts. It is a stateless check of TCP flags, not stateful inspection, so the router keeps no connection table and cannot extend the behavior to UDP or ICMP. A segment with only SYN set is exactly what the keyword blocks."
  },
  {
    id: "sec-033",
    domain: "Security Fundamentals",
    type: "multi",
    question: "Refer to the exhibit. Which two source addresses are denied by the ACL? (Choose two.)",
    exhibit: "access-list 40 deny 192.168.8.0 0.0.1.255\naccess-list 40 permit any",
    options: [
      "192.168.8.200",
      "192.168.9.77",
      "192.168.10.3",
      "192.168.7.255"
    ],
    answer: [0, 1],
    explanation: "The wildcard 0.0.1.255 allows the last 9 bits to vary, so the deny statement matches 192.168.8.0 through 192.168.9.255, a /23 block. Both 192.168.8.200 and 192.168.9.77 fall inside that range and are denied. 192.168.10.3 is beyond the upper boundary and 192.168.7.255 is below the lower boundary, so both fall through to the permit any statement and are forwarded."
  },
  {
    id: "sec-034",
    domain: "Security Fundamentals",
    type: "single",
    question: "How many IPv4 ACLs can be applied to a single router interface?",
    options: [
      "One inbound and one outbound",
      "One in total, regardless of direction",
      "Two inbound and two outbound",
      "An unlimited number in each direction"
    ],
    answer: [0],
    explanation: "IOS allows exactly one ACL per protocol, per interface, per direction, so an interface can have one inbound IPv4 ACL and one outbound IPv4 ACL at the same time. Applying a second ACL in the same direction replaces the first rather than adding to it. The other options are wrong because the limit is per direction rather than per interface as a whole, and multiple ACLs can never be stacked in a single direction."
  },
  {
    id: "sec-035",
    domain: "Security Fundamentals",
    type: "single",
    question: "Refer to the exhibit. Which traffic does the ACL statement match?",
    exhibit: "access-list 130 permit tcp any eq 80 any",
    options: [
      "Traffic sent from web servers using source TCP port 80",
      "Traffic sent to web servers on destination TCP port 80",
      "All HTTP traffic in both directions",
      "Traffic from clients using ephemeral ports above 1024"
    ],
    answer: [0],
    explanation: "In an extended ACL the port operator that follows the source address applies to the source port, so eq 80 placed after any matches packets whose source TCP port is 80. That describes traffic returning from web servers, such as HTTP responses. Matching requests sent to a web server would require the eq 80 operator to follow the destination address instead. The statement is unidirectional and says nothing about ephemeral client ports."
  },
  {
    id: "sec-036",
    domain: "Security Fundamentals",
    type: "single",
    question: "Refer to the exhibit. A user reports that the PC connected to GigabitEthernet0/2 has lost all connectivity. Based on the output, which action restores connectivity most quickly?",
    exhibit: "SW1# show port-security interface GigabitEthernet0/2\nPort Security              : Enabled\nPort Status                : Secure-shutdown\nViolation Mode             : Shutdown\nAging Time                 : 0 mins\nMaximum MAC Addresses      : 1\nTotal MAC Addresses        : 0\nLast Source Address:Vlan   : 000c.2911.beef:10\nSecurity Violation Count   : 1",
    options: [
      "Issue shutdown followed by no shutdown on the interface after removing the offending device",
      "Issue no switchport port-security violation shutdown to change the mode",
      "Clear the MAC address table with clear mac address-table dynamic",
      "Wait for the aging timer to expire and re-enable the port automatically"
    ],
    answer: [0],
    explanation: "The Secure-shutdown port status indicates the interface is in the err-disabled state after a violation. The fastest manual recovery is to remove the offending device and bounce the interface with shutdown followed by no shutdown. Changing the violation mode does not recover an already disabled port, clearing the MAC table has no effect on err-disabled interfaces, and the aging time of 0 means no automatic aging occurs; automatic recovery would require errdisable recovery to be configured."
  },
  {
    id: "sec-037",
    domain: "Security Fundamentals",
    type: "single",
    question: "What is the difference between the protect and restrict port security violation modes?",
    options: [
      "Both drop frames from unknown MAC addresses, but only restrict sends syslog and SNMP messages and increments the violation counter",
      "Protect shuts down the interface while restrict only drops offending frames",
      "Restrict drops all traffic on the port while protect drops only frames from unknown MAC addresses",
      "Protect generates syslog messages while restrict drops frames silently"
    ],
    answer: [0],
    explanation: "In both protect and restrict modes the port stays up and frames from unauthorized MAC addresses are dropped while allowed traffic continues to flow. The difference is visibility: restrict logs each violation through syslog and SNMP traps and increments the security violation counter, whereas protect drops frames silently with no notification. Neither mode shuts down the interface; only the shutdown mode places the port in the err-disabled state."
  },
  {
    id: "sec-038",
    domain: "Security Fundamentals",
    type: "multi",
    question: "A switch port is configured with port security in restrict violation mode. Which two actions does the switch take when a frame arrives from an unauthorized MAC address? (Choose two.)",
    options: [
      "It drops the frame from the unauthorized MAC address",
      "It generates a syslog message and increments the violation counter",
      "It places the interface in the err-disabled state",
      "It removes all secure MAC addresses from the interface",
      "It forwards the frame but marks it for monitoring"
    ],
    answer: [0, 1],
    explanation: "Restrict mode discards frames from MAC addresses that exceed the configured maximum while keeping the port operational, and it records each violation by sending syslog and SNMP notifications and incrementing the violation counter. The interface is never err-disabled in restrict mode; that behavior belongs to the shutdown violation mode. Existing secure MAC addresses are retained, and offending frames are dropped rather than forwarded or marked."
  },
  {
    id: "sec-039",
    domain: "Security Fundamentals",
    type: "single",
    question: "Refer to the exhibit. What is the effect of the sticky option in this port security configuration?",
    exhibit: "interface GigabitEthernet0/2\n switchport mode access\n switchport port-security\n switchport port-security maximum 2\n switchport port-security mac-address sticky",
    options: [
      "Dynamically learned MAC addresses are added to the running configuration and survive a reboot only if the configuration is saved",
      "MAC addresses are learned dynamically and automatically written to the startup configuration",
      "The administrator must manually enter each secure MAC address under the interface",
      "Learned MAC addresses age out after the default sticky timer of five minutes"
    ],
    answer: [0],
    explanation: "Sticky learning converts dynamically learned source MAC addresses into switchport port-security mac-address sticky entries in the running configuration. They become permanent only when the administrator saves the configuration with copy running-config startup-config; the switch never writes to the startup configuration automatically. Manual entry describes static secure MAC configuration, not sticky, and sticky addresses do not age out by default."
  },
  {
    id: "sec-040",
    domain: "Security Fundamentals",
    type: "single",
    question: "An engineer enables port security on an access interface with the single command switchport port-security and makes no other changes. Which behavior does the interface have?",
    options: [
      "One MAC address is allowed, and a violation places the port in the err-disabled state",
      "Two MAC addresses are allowed, and violations are logged but the port stays up",
      "One MAC address is allowed, and frames from other MACs are silently dropped while the port stays up",
      "No MAC limit is enforced until a maximum value is explicitly configured"
    ],
    answer: [0],
    explanation: "The default port security settings allow a maximum of one MAC address and use the shutdown violation mode, so a second source MAC address on the port triggers a violation that err-disables the interface. The protect-style silent drop and restrict-style logging behaviors occur only when those violation modes are explicitly configured. A MAC limit of one is enforced immediately upon enabling the feature, so the last option is also incorrect."
  },
  {
    id: "sec-041",
    domain: "Security Fundamentals",
    type: "single",
    question: "Refer to the exhibit. An engineer attempts to enable port security and receives the error shown. Which command must be entered first?",
    exhibit: "SW1(config)# interface GigabitEthernet0/3\nSW1(config-if)# switchport port-security\nCommand rejected: GigabitEthernet0/3 is a dynamic port.",
    options: [
      "switchport mode access",
      "switchport nonegotiate",
      "no switchport",
      "switchport port-security mac-address sticky"
    ],
    answer: [0],
    explanation: "Port security can only be enabled on interfaces that are statically configured as access or trunk ports, and the default dynamic auto or dynamic desirable DTP modes are rejected. Configuring switchport mode access makes the port a static access port so the port-security command is accepted. The nonegotiate command still requires a static mode to be set, no switchport turns the interface into a routed port where port security is unsupported, and sticky learning cannot be configured before port security itself is accepted."
  },
  {
    id: "sec-042",
    domain: "Security Fundamentals",
    type: "single",
    question: "Refer to the exhibit. The network team wants interfaces disabled by port security violations to recover automatically after five minutes without administrator intervention. Which configuration accomplishes this?",
    exhibit: "SW1# show interfaces status err-disabled\nPort      Name               Status       Reason\nGi0/2                        err-disabled psecure-violation",
    options: [
      "errdisable recovery cause psecure-violation and errdisable recovery interval 300",
      "switchport port-security aging time 5 on each interface",
      "errdisable detect cause psecure-violation",
      "switchport port-security violation protect on each interface"
    ],
    answer: [0],
    explanation: "The errdisable recovery cause psecure-violation command enables automatic recovery for ports disabled by port security, and the recovery interval of 300 seconds re-enables them after five minutes. Port security aging controls how long secure MAC addresses remain in the table, not how err-disabled ports recover. The errdisable detect command controls which events trigger err-disable rather than recovery, and changing the violation mode to protect prevents future shutdowns but does not recover ports that are already disabled."
  },
  {
    id: "sec-043",
    domain: "Security Fundamentals",
    type: "multi",
    question: "Refer to the exhibit. Which two conclusions can be drawn from the output? (Choose two.)",
    exhibit: "SW2# show port-security interface GigabitEthernet0/5\nPort Security              : Enabled\nPort Status                : Secure-up\nViolation Mode             : Restrict\nMaximum MAC Addresses      : 1\nTotal MAC Addresses        : 1\nConfigured MAC Addresses   : 0\nSticky MAC Addresses       : 0\nLast Source Address:Vlan   : 0050.7966.6800:20\nSecurity Violation Count   : 7",
    options: [
      "The interface remains operational despite the recorded violations",
      "The secure MAC address was learned dynamically rather than configured statically",
      "The interface is err-disabled and requires a shutdown and no shutdown sequence",
      "The violations were caused by exceeding a maximum of two MAC addresses",
      "Sticky learning saved the secure MAC address to the running configuration"
    ],
    answer: [0, 1],
    explanation: "The Secure-up status shows the port is still passing traffic, which is consistent with restrict mode keeping the interface operational while counting violations. With zero configured and zero sticky addresses but one total MAC address, the secure address must have been learned dynamically. The port is not err-disabled, the maximum is one MAC address rather than two, and sticky learning is not in use because the sticky counter is zero."
  },
  {
    id: "sec-044",
    domain: "Security Fundamentals",
    type: "single",
    question: "Which attack does DHCP snooping primarily prevent?",
    options: [
      "A rogue DHCP server handing out incorrect addressing information to clients",
      "An attacker flooding the switch CAM table with bogus source MAC addresses",
      "An attacker poisoning host ARP caches with forged gratuitous ARP replies",
      "An attacker performing a brute-force attack against the vty lines"
    ],
    answer: [0],
    explanation: "DHCP snooping classifies ports as trusted or untrusted and drops DHCP server messages such as OFFER and ACK that arrive on untrusted ports, which stops a rogue DHCP server from assigning a malicious default gateway or DNS server to clients. CAM table flooding is mitigated by port security, ARP cache poisoning is addressed by Dynamic ARP Inspection, and vty brute-force attempts are mitigated with ACLs, SSH, and login blocking features rather than DHCP snooping."
  },
  {
    id: "sec-045",
    domain: "Security Fundamentals",
    type: "single",
    question: "Refer to the exhibit. GigabitEthernet0/1 connects to the corporate DHCP server and all other ports connect to user PCs. A user connects an unauthorized home router that begins sending DHCPOFFER messages on an access port. What does the switch do?",
    exhibit: "ip dhcp snooping\nip dhcp snooping vlan 10\n!\ninterface GigabitEthernet0/1\n ip dhcp snooping trust",
    options: [
      "It drops the DHCPOFFER messages because they arrive on an untrusted port",
      "It forwards the DHCPOFFER messages because they belong to VLAN 10",
      "It err-disables GigabitEthernet0/1 because two DHCP servers were detected",
      "It forwards the messages but rate-limits them to prevent pool exhaustion"
    ],
    answer: [0],
    explanation: "With DHCP snooping enabled on VLAN 10, every port is untrusted by default except Gi0/1, which is explicitly trusted. Server-originated messages such as DHCPOFFER and DHCPACK are only accepted on trusted ports, so the offers from the rogue router on a user port are dropped. The VLAN assignment does not exempt traffic from inspection, the trusted server port is not err-disabled by someone else's rogue device, and rate limiting is a separate optional feature that applies to client messages, not a default action for rogue offers."
  }
);
(window.QUESTION_BANK = window.QUESTION_BANK || []).push(
  {
    id: "sec-046",
    domain: "Security Fundamentals",
    type: "multi",
    question: "Which two DHCP message types does a switch with DHCP snooping enabled discard when they are received on an untrusted port? (Choose two.)",
    options: [
      "DHCPOFFER",
      "DHCPACK",
      "DHCPDISCOVER",
      "DHCPREQUEST"
    ],
    answer: [0, 1],
    explanation: "DHCPOFFER and DHCPACK are messages sent by DHCP servers, and DHCP snooping only allows server messages to enter through trusted ports, so they are dropped on untrusted interfaces. DHCPDISCOVER and DHCPREQUEST are client messages and are expected on untrusted access ports where end hosts connect, so the switch forwards them after inspection. Blocking client messages on untrusted ports would break DHCP for every legitimate user."
  },
  {
    id: "sec-047",
    domain: "Security Fundamentals",
    type: "single",
    question: "Which information does the DHCP snooping binding database record for each completed DHCP lease on an untrusted port?",
    options: [
      "Client MAC address, assigned IP address, lease time, VLAN, and interface",
      "Client hostname, username, and the authenticating RADIUS server",
      "Server MAC address, scope name, and remaining pool size",
      "Client MAC address and default gateway only"
    ],
    answer: [0],
    explanation: "The binding database maps each client MAC address to its DHCP-assigned IP address along with the lease time, VLAN, and the switch interface where the lease was observed. This table is the reference that Dynamic ARP Inspection and IP Source Guard use to validate ARP messages and source IP addresses. The database contains no usernames or RADIUS information, no DHCP scope statistics, and it records far more than just the MAC address and gateway."
  },
  {
    id: "sec-048",
    domain: "Security Fundamentals",
    type: "single",
    question: "An attacker on an access port sends forged ARP replies that bind the default gateway's IP address to the attacker's MAC address. Which switch feature prevents this attack?",
    options: [
      "Dynamic ARP Inspection",
      "DHCP snooping by itself",
      "Port security with sticky MAC addresses",
      "BPDU guard"
    ],
    answer: [0],
    explanation: "Dynamic ARP Inspection intercepts ARP packets on untrusted ports and verifies that the sender IP-to-MAC binding matches an entry in the DHCP snooping database or a configured ARP ACL, dropping forged replies used for man-in-the-middle attacks. DHCP snooping alone inspects only DHCP traffic and builds the binding table but does not examine ARP packets. Port security limits which MAC addresses may transmit but cannot detect a legitimate MAC sending lies about IP ownership, and BPDU guard protects spanning tree rather than ARP."
  },
  {
    id: "sec-049",
    domain: "Security Fundamentals",
    type: "single",
    question: "Refer to the exhibit. After Dynamic ARP Inspection is enabled, a server with a statically configured IP address on untrusted port Gi0/12 in VLAN 20 can no longer communicate. What is the cause?",
    exhibit: "ip dhcp snooping\nip dhcp snooping vlan 20\nip arp inspection vlan 20\n!\ninterface GigabitEthernet0/10\n description Uplink-to-Distribution\n ip dhcp snooping trust\n ip arp inspection trust",
    options: [
      "The server never obtained a DHCP lease, so its ARP packets match no binding entry and are dropped",
      "DAI blocks all static IP addresses by design and the server must be converted to DHCP",
      "The uplink should be untrusted so that bindings can be learned from the distribution switch",
      "ARP inspection and DHCP snooping cannot be enabled on the same VLAN"
    ],
    answer: [0],
    explanation: "DAI validates ARP packets on untrusted ports against the DHCP snooping binding database. A statically addressed host never performs a DHCP exchange, so no binding exists and its ARP packets are discarded. The supported fix is to create an ARP ACL for the static host or mark its port trusted, not to force DHCP on the server, so the second option overstates the design. Uplinks toward the network infrastructure are correctly trusted, and DHCP snooping with DAI on the same VLAN is the normal, supported combination."
  },
  {
    id: "sec-050",
    domain: "Security Fundamentals",
    type: "multi",
    question: "Which two statements about Dynamic ARP Inspection are true? (Choose two.)",
    options: [
      "ARP packets received on trusted interfaces bypass inspection",
      "It validates ARP packets using the DHCP snooping binding database",
      "It prevents DHCP starvation attacks by rate-limiting DISCOVER messages",
      "It requires port security to be enabled on every untrusted interface",
      "It inspects only gratuitous ARP packets and ignores ARP replies"
    ],
    answer: [0, 1],
    explanation: "DAI inspects ARP packets arriving on untrusted ports and compares the sender bindings against the DHCP snooping database or static ARP ACLs, while traffic on trusted ports is forwarded without validation. DHCP starvation is mitigated by DHCP snooping rate limiting and port security, not by DAI. Port security is an independent feature that DAI does not require, and DAI examines all ARP requests and replies on untrusted ports, not just gratuitous ARP."
  },
  {
    id: "sec-051",
    domain: "Security Fundamentals",
    type: "dragdrop",
    question: "Drag each Layer 2 security feature on the left to the attack it mitigates on the right.",
    items: [
      "802.1X",
      "Dynamic ARP Inspection",
      "Port security",
      "DHCP snooping"
    ],
    targets: [
      "Rogue DHCP server offering malicious gateway information",
      "ARP cache poisoning for man-in-the-middle attacks",
      "CAM table overflow from flooded source MAC addresses",
      "Unauthorized devices connecting without authenticating"
    ],
    answer: [3, 1, 2, 0],
    explanation: "DHCP snooping drops server messages on untrusted ports, defeating rogue DHCP servers. Dynamic ARP Inspection validates ARP bindings against the snooping database to stop ARP poisoning man-in-the-middle attacks. Port security limits the number of source MAC addresses per port, preventing CAM table overflow floods that would force the switch to act like a hub. 802.1X requires devices to authenticate through a RADIUS server before the port forwards traffic, blocking unauthorized access."
  },
  {
    id: "sec-052",
    domain: "Security Fundamentals",
    type: "single",
    question: "Refer to the exhibit. Which credentials are required for a console connection and for an SSH connection to the router?",
    exhibit: "username admin secret S3cur3Pa55\n!\nline console 0\n password cisco123\n login\nline vty 0 4\n login local\n transport input ssh",
    options: [
      "Console requires the password cisco123; SSH requires the username admin with password S3cur3Pa55",
      "Both console and SSH require the username admin with password S3cur3Pa55",
      "Console requires the username admin; SSH requires the line password cisco123",
      "Console requires no credentials; SSH requires only the password cisco123"
    ],
    answer: [0],
    explanation: "The console line uses the login command with a line password, so a console user is prompted only for the password cisco123. The vty lines use login local, which authenticates against the local username database, so SSH users must supply the admin username and its secret. The credential sources are configured independently per line, so the same method does not apply to both, and the login command on the console means credentials are definitely required there."
  },
  {
    id: "sec-053",
    domain: "Security Fundamentals",
    type: "single",
    question: "Refer to the exhibit. An auditor reviews the configuration after service password-encryption was enabled. Which statement about the vty password is true?",
    exhibit: "line vty 0 4\n password 7 0822455D0A16\n login",
    options: [
      "It is encoded with the weak, reversible type 7 algorithm and can be decoded with freely available tools",
      "It is protected with a one-way MD5 hash that cannot be reversed",
      "It is encrypted with AES and can only be recovered using the configured master key",
      "It remains in plaintext because service password-encryption affects only the enable password"
    ],
    answer: [0],
    explanation: "The service password-encryption command applies the Vigenere-based type 7 encoding to line and other plaintext passwords, indicated by the 7 in the configuration. This encoding only deters casual shoulder surfing; numerous public tools reverse it instantly. It is not a one-way MD5 hash, which is what enable secret uses and is shown as type 5, and it is not AES, which applies to type 6 encryption with a configured master key. The command clearly did change the password from plaintext, so the last option is wrong."
  },
  {
    id: "sec-054",
    domain: "Security Fundamentals",
    type: "single",
    question: "A user account is created with the command username netops privilege 15 secret Str0ngPw. What is the effect when this user logs in to the router through a vty line configured with login local?",
    options: [
      "The user is placed directly into privileged EXEC mode without entering an enable password",
      "The user starts in user EXEC mode and must still enter the enable secret to reach privileged EXEC mode",
      "The user can run all configuration commands but cannot view the running configuration",
      "The user is restricted to show commands defined at privilege level 15"
    ],
    answer: [0],
    explanation: "Privilege level 15 is the highest IOS privilege level and corresponds to privileged EXEC mode, so a user assigned that level lands at the # prompt immediately after authenticating, with no enable password required. Default users at level 1 start in user EXEC mode and need the enable secret. Level 15 grants full access including configuration mode and viewing the running configuration, so the options describing restrictions are incorrect."
  },
  {
    id: "sec-055",
    domain: "Security Fundamentals",
    type: "multi",
    question: "Which two actions harden access to the management plane of a Cisco router? (Choose two.)",
    options: [
      "Configure transport input ssh on the vty lines to disable Telnet",
      "Apply an ACL with the access-class command to restrict which source addresses can reach the vty lines",
      "Enable the ip http server command so administrators avoid using the CLI",
      "Configure service password-encryption as the sole protection for privileged access",
      "Replace the enable secret with an enable password for backward compatibility"
    ],
    answer: [0, 1],
    explanation: "Restricting the vty lines to SSH removes plaintext Telnet from the management plane, and an access-class ACL limits management connections to approved administrative subnets. Enabling the unencrypted HTTP server adds an insecure management vector. Service password-encryption only applies reversible type 7 encoding and is not sufficient protection on its own, and replacing the hashed enable secret with the plaintext enable password weakens security instead of improving it."
  },
  {
    id: "sec-056",
    domain: "Security Fundamentals",
    type: "single",
    question: "Refer to the exhibit. An engineer prepares a router for SSH management but the crypto key generate rsa command is rejected. Which configuration must be completed first?",
    exhibit: "Router(config)# crypto key generate rsa\n% Please define a domain-name first.",
    options: [
      "Configure a domain name with the ip domain-name command",
      "Configure the vty lines with transport input ssh",
      "Enable SSH version 2 with the ip ssh version 2 command",
      "Create a local user account with the username command"
    ],
    answer: [0],
    explanation: "RSA key pairs are named using the device hostname combined with the domain name, so IOS requires both a non-default hostname and an ip domain-name before the keys can be generated. The vty transport setting, SSH version, and local user accounts are all part of a complete SSH configuration, but none of them is a prerequisite for key generation, and the error message explicitly identifies the missing domain name."
  },
  {
    id: "sec-057",
    domain: "Security Fundamentals",
    type: "single",
    question: "Which authentication scenario is an example of true multifactor authentication?",
    options: [
      "A password combined with a one-time code generated by an app on the user's smartphone",
      "A password combined with a four-digit PIN",
      "A fingerprint scan combined with facial recognition",
      "Two different passwords entered on separate login screens"
    ],
    answer: [0],
    explanation: "Multifactor authentication requires factors from at least two different categories: something you know, something you have, and something you are. A password is a knowledge factor and a one-time code from a smartphone app proves possession of the device, so together they form two distinct factors. A password plus a PIN combines two knowledge factors, fingerprint plus face combines two inherence factors, and two passwords are again the same single category, so none of those qualifies as multifactor."
  },
  {
    id: "sec-058",
    domain: "Security Fundamentals",
    type: "single",
    question: "A data center requires a retina scan before administrators can enter the server room. Which authentication factor does the retina scan represent?",
    options: [
      "Something you are",
      "Something you have",
      "Something you know",
      "Somewhere you are"
    ],
    answer: [0],
    explanation: "Biometric characteristics such as retina patterns, fingerprints, and facial geometry are inherence factors, classified as something you are. A badge or token would be something you have, and a password or PIN would be something you know. Location-based conditions such as connecting from a specific network are sometimes described as somewhere you are, but a biometric scan measures a physical trait of the person, not a location."
  },
  {
    id: "sec-059",
    domain: "Security Fundamentals",
    type: "multi",
    question: "Which two practices are recommended elements of a corporate password policy? (Choose two.)",
    options: [
      "Require passwords to mix uppercase, lowercase, numeric, and special characters",
      "Require an additional authentication factor such as a hardware token or biometric for sensitive access",
      "Encourage users to reuse one strong password across all corporate systems",
      "Store user passwords in a plaintext spreadsheet managed by the helpdesk",
      "Set passwords to never expire so users are not tempted to write them down"
    ],
    answer: [0, 1],
    explanation: "Complexity requirements increase the search space against brute-force and dictionary attacks, and layering multifactor authentication on top of passwords protects accounts even when a password is leaked. Reusing one password across systems means a single breach compromises everything, plaintext storage exposes every credential to anyone who obtains the file, and a blanket never-expire rule without compensating controls leaves compromised passwords valid indefinitely."
  },
  {
    id: "sec-060",
    domain: "Security Fundamentals",
    type: "single",
    question: "During the establishment of a site-to-site IPsec VPN, what is the purpose of IKE Phase 1?",
    options: [
      "To authenticate the peers and build a secure management channel used to negotiate the IPsec SAs",
      "To encrypt the user data that flows between the two sites",
      "To exchange routing updates between the VPN gateways",
      "To negotiate the transform set used by ESP for the data tunnel"
    ],
    answer: [0],
    explanation: "IKE Phase 1 authenticates the two peers using methods such as pre-shared keys or certificates and establishes the ISAKMP security association, a protected control channel. IKE Phase 2 then runs inside that channel to negotiate the IPsec SAs and transform sets that actually protect user data. User traffic encryption is performed by ESP after both phases complete, and routing updates are exchanged by routing protocols, not by IKE."
  }
);
