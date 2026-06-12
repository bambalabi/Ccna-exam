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
(window.QUESTION_BANK = window.QUESTION_BANK || []).push(
  {
    id: "sec-061",
    domain: "Security Fundamentals",
    type: "dragdrop",
    question: "Drag each security term on the left to its matching definition on the right.",
    items: ["Exploit", "Mitigation technique", "Threat", "Vulnerability"],
    targets: [
      "A weakness in a system or its design that can be compromised",
      "A potential danger that may take advantage of a weakness",
      "A tool, script, or method used to take advantage of a weakness",
      "A countermeasure that reduces the likelihood or impact of an attack"
    ],
    answer: [3, 2, 0, 1],
    explanation: "A vulnerability is the weakness itself, while a threat is the potential danger that could act on that weakness. An exploit is the concrete mechanism, such as a script or technique, that actually takes advantage of the vulnerability. A mitigation technique, such as a patch or an ACL, is the countermeasure that reduces risk. Confusing threat and exploit is the classic trap: the threat is potential, whereas the exploit is the realized method."
  },
  {
    id: "sec-062",
    domain: "Security Fundamentals",
    type: "single",
    question: "An attacker attempts to log in to many different corporate user accounts using the same single commonly used password, then waits an hour before trying a second password against the same set of accounts. Which type of attack is described?",
    options: [
      "Dictionary attack against a single account",
      "Password spraying",
      "On-path (man-in-the-middle) attack",
      "Brute-force attack against a single account"
    ],
    answer: [1],
    explanation: "Password spraying tries one or a few common passwords across many accounts and paces the attempts to stay under account-lockout and detection thresholds. A dictionary or brute-force attack instead targets one account with many candidate passwords, which quickly triggers lockout policies. An on-path attack intercepts traffic between two parties and does not involve guessing credentials at a login prompt."
  },
  {
    id: "sec-063",
    domain: "Security Fundamentals",
    type: "single",
    question: "An attacker connects a laptop to an access port and runs a tool that sends thousands of frames per second, each with a different bogus source MAC address. Shortly afterward, the switch begins forwarding unicast traffic out all ports in the VLAN and the attacker captures other users' conversations. Which attack is being performed?",
    options: [
      "ARP poisoning",
      "VLAN hopping",
      "MAC address flooding (CAM table overflow)",
      "DHCP starvation"
    ],
    answer: [2],
    explanation: "Flooding frames with random source MACs exhausts the switch MAC address (CAM) table; once it is full, the switch cannot learn new addresses and floods unknown unicast traffic out every port, letting the attacker eavesdrop. Port security with a low maximum MAC count mitigates this attack. ARP poisoning forges ARP replies rather than source MACs, DHCP starvation exhausts the DHCP pool with bogus DISCOVER messages, and VLAN hopping abuses trunk negotiation or double tagging."
  },
  {
    id: "sec-064",
    domain: "Security Fundamentals",
    type: "multi",
    question: "Which three security services does an IPsec VPN provide for traffic between two sites? (Choose three.)",
    options: [
      "Confidentiality through encryption of the protected traffic",
      "Data integrity through hashed message authentication codes",
      "Origin authentication of the VPN peers",
      "Guaranteed bandwidth for the tunneled traffic",
      "Automatic compression of all tunneled traffic"
    ],
    answer: [0, 1, 2],
    explanation: "IPsec provides confidentiality (encryption with algorithms such as AES), integrity (HMACs such as SHA-based hashes detect modification in transit), and authentication of the peers (pre-shared keys or certificates), plus anti-replay protection. IPsec does not reserve bandwidth, which is a QoS function, and it does not compress traffic; encryption actually makes payloads incompressible downstream."
  },
  {
    id: "sec-065",
    domain: "Security Fundamentals",
    type: "dragdrop",
    question: "Drag each IPsec component on the left to its matching description on the right.",
    items: ["Transport mode", "IKE", "ESP", "Tunnel mode", "AH"],
    targets: [
      "Encrypts and authenticates the payload and is identified by IP protocol 50",
      "Provides integrity and origin authentication but no encryption, IP protocol 51",
      "Negotiates security associations and exchanges keys between the peers",
      "Encapsulates the entire original IP packet behind a new IP header",
      "Protects only the payload and reuses the original IP header"
    ],
    answer: [2, 4, 1, 3, 0],
    explanation: "ESP (IP protocol 50) provides encryption plus integrity and is the protocol used in virtually all modern IPsec deployments, while AH (IP protocol 51) authenticates but never encrypts. IKE is the control-plane protocol that builds the security associations and derives keys before any user data is protected. Tunnel mode hides the original IP header inside a new one, which is required for site-to-site gateways, whereas transport mode keeps the original header and protects only the payload, typically for host-to-host traffic."
  },
  {
    id: "sec-066",
    domain: "Security Fundamentals",
    type: "single",
    question: "A site-to-site IPsec VPN using ESP fails to establish data connectivity because one router sits behind a PAT device that cannot translate the ESP packets. Which feature allows the tunnel to operate through the PAT device?",
    options: [
      "AH in transport mode",
      "GRE without IPsec",
      "NAT Traversal, which encapsulates ESP inside UDP port 4500",
      "Switching the tunnel from IKEv2 to IKEv1"
    ],
    answer: [2],
    explanation: "ESP is IP protocol 50 and carries no Layer 4 port numbers, so a PAT device has nothing to translate and drops or mistranslates the packets. NAT Traversal (NAT-T) detects the NAT during IKE negotiation and wraps ESP inside UDP port 4500, giving the PAT device ports to work with. AH is even worse through NAT because it authenticates the IP header, plain GRE provides no encryption, and changing the IKE version does not address the missing port information in ESP."
  },
  {
    id: "sec-067",
    domain: "Security Fundamentals",
    type: "single",
    question: "Refer to the exhibit. During which stage of IPsec VPN establishment are the parameters shown negotiated between the two peers?",
    exhibit: "crypto ipsec transform-set STRONG esp-aes 256 esp-sha256-hmac\n mode tunnel",
    options: [
      "IKE Phase 1 main mode",
      "The TCP three-way handshake that precedes ISAKMP",
      "DH group selection for the management session",
      "IKE Phase 2, which builds the IPsec security associations"
    ],
    answer: [3],
    explanation: "A transform set defines the encryption and hashing used to protect actual user data (here ESP with AES-256 and SHA-256), and these parameters are negotiated during IKE Phase 2, sometimes called quick mode. IKE Phase 1 negotiates the protected ISAKMP control channel and authenticates the peers but does not agree on the data-plane transforms. ISAKMP runs over UDP 500, not TCP, so no TCP handshake is involved."
  },
  {
    id: "sec-068",
    domain: "Security Fundamentals",
    type: "single",
    question: "A company must build an encrypted site-to-site tunnel between two routers that also carries OSPF, which uses multicast hello packets, between the sites. Which solution meets the requirement?",
    options: [
      "GRE over IPsec",
      "A pure IPsec ESP tunnel without encapsulation enhancements",
      "Clientless SSL VPN between the two routers",
      "AH in transport mode"
    ],
    answer: [0],
    explanation: "Traditional IPsec protects only unicast IP traffic and cannot natively carry multicast routing protocol packets such as OSPF hellos. Encapsulating traffic in GRE first turns the multicast packets into unicast GRE packets, which IPsec can then encrypt, so GRE over IPsec supports routing protocols across the tunnel. A pure ESP tunnel drops the multicast hellos, clientless SSL VPN is a browser-based remote-access technology rather than a router-to-router tunnel, and AH provides no encryption at all."
  },
  {
    id: "sec-069",
    domain: "Security Fundamentals",
    type: "single",
    question: "A site-to-site VPN configured to use AH consistently fails when packets pass through an intermediate NAT device, even though the same path works for other traffic. Why does AH fail in this scenario?",
    options: [
      "AH uses UDP port 500, which NAT devices always block",
      "AH integrity protection covers the IP header, so the NAT address change invalidates the hash",
      "AH encrypts the IP header so the NAT device cannot read the destination address",
      "AH supports only IPv6 and the NAT device is IPv4-only"
    ],
    answer: [1],
    explanation: "AH computes its integrity check value over the payload and the immutable fields of the IP header, including the source and destination addresses. When NAT rewrites an address, the receiver recomputes the hash, gets a mismatch, and discards the packet, so AH is fundamentally incompatible with NAT. AH does not encrypt anything, which also rules out the encrypted-header option, and it is identified by IP protocol 51 rather than a UDP port. ESP with NAT-T is the standard workaround."
  },
  {
    id: "sec-070",
    domain: "Security Fundamentals",
    type: "single",
    question: "External contractors must reach two internal web applications from personal devices on which the company is not permitted to install any VPN software. Which remote-access solution should the engineer deploy?",
    options: [
      "Site-to-site IPsec tunnels to each contractor location",
      "An IKEv2 IPsec client VPN with AnyConnect installed on each device",
      "A GRE tunnel from each contractor device",
      "A clientless SSL VPN portal accessed through a standard web browser"
    ],
    answer: [3],
    explanation: "A clientless SSL VPN uses the TLS capability already built into every web browser, so contractors simply log in to an HTTPS portal and are proxied to the published internal web applications with no software installation. An AnyConnect or IKEv2 client solution violates the no-software constraint. Site-to-site tunnels terminate between gateways and are impractical for roaming personal devices, and GRE provides no encryption or per-user authentication."
  },
  {
    id: "sec-071",
    domain: "Security Fundamentals",
    type: "multi",
    question: "Which two statements accurately compare site-to-site and remote-access VPNs? (Choose two.)",
    options: [
      "A site-to-site VPN is terminated on gateways and is transparent to the end hosts at each site",
      "A remote-access VPN typically requires client software or a browser session on the user device",
      "A site-to-site VPN requires VPN client software on every host at both sites",
      "A remote-access VPN can only use IPsec and never TLS"
    ],
    answer: [0, 1],
    explanation: "In a site-to-site VPN the routers or firewalls at each location encrypt traffic between the sites, so individual hosts need no VPN configuration and are unaware of the tunnel. Remote-access VPNs serve individual users, who connect either with installed client software such as AnyConnect or through a clientless TLS browser portal. The claim that every host needs client software in a site-to-site design reverses the models, and remote-access VPNs commonly use TLS in addition to IPsec, so the IPsec-only statement is false."
  },
  {
    id: "sec-072",
    domain: "Security Fundamentals",
    type: "multi",
    question: "A network team must choose between TACACS+ and RADIUS for managing administrator logins to routers and switches. Which two characteristics are advantages of TACACS+ over RADIUS for this purpose? (Choose two.)",
    options: [
      "It encrypts the entire packet body rather than only the password field",
      "It supports granular, per-command authorization for device administration",
      "It uses UDP, which reduces session overhead",
      "It is an open standard implemented identically by all vendors",
      "It combines authentication and authorization into a single exchange"
    ],
    answer: [0, 1],
    explanation: "TACACS+ encrypts the full packet body, whereas RADIUS obscures only the user password and sends other attributes in cleartext, and TACACS+ fully separates authentication, authorization, and accounting, enabling per-command authorization that is ideal for device administration. TACACS+ uses TCP port 49, not UDP, so the UDP statement describes RADIUS. TACACS+ is Cisco-proprietary in origin while RADIUS is the open standard, and combining authentication with authorization in one exchange is RADIUS behavior, generally considered a limitation for device management."
  },
  {
    id: "sec-073",
    domain: "Security Fundamentals",
    type: "dragdrop",
    question: "Drag each protocol characteristic on the left to the AAA protocol attribute it describes on the right.",
    items: [
      "Encrypts only the password field",
      "TCP port 49",
      "UDP ports 1812 and 1813",
      "Encrypts the entire packet body"
    ],
    targets: [
      "TACACS+ transport protocol and port",
      "RADIUS authentication and accounting ports",
      "TACACS+ payload protection",
      "RADIUS payload protection"
    ],
    answer: [1, 2, 3, 0],
    explanation: "TACACS+ runs over TCP port 49 and encrypts the entire body of every packet, which is why it is preferred for device administration. RADIUS uses UDP, with port 1812 for authentication and 1813 for accounting (legacy implementations used 1645 and 1646), and it protects only the user password attribute while the rest of the packet travels in cleartext. Mixing up the transport protocols is the most common error: TCP belongs to TACACS+ and UDP to RADIUS."
  },
  {
    id: "sec-074",
    domain: "Security Fundamentals",
    type: "single",
    question: "Refer to the exhibit. All TACACS+ servers become unreachable because of a WAN outage. What happens when an administrator attempts to open an SSH session to the router?",
    exhibit: "aaa new-model\naaa authentication login default group tacacs+ local\n!\ntacacs server TAC1\n address ipv4 10.10.10.21\n key Tacacs123\n!\nusername admin privilege 15 secret Adm1nP@ss\n!\nline vty 0 4\n login authentication default\n transport input ssh",
    options: [
      "The session is rejected until at least one TACACS+ server responds",
      "The router authenticates the administrator against the local username database",
      "The router grants access without any authentication",
      "The administrator must supply the enable secret instead of a username"
    ],
    answer: [1],
    explanation: "The method list group tacacs+ local tries the TACACS+ server group first and falls back to the next method only when the servers do not respond, so during the outage the local account admin is used. The fallback occurs only on server unreachability; if a reachable server returns a FAIL for bad credentials, the router does not move on to the local database. Access is never granted without authentication, and the enable secret governs privileged EXEC access, not the initial login method."
  },
  {
    id: "sec-075",
    domain: "Security Fundamentals",
    type: "single",
    question: "A security team wants to eliminate password use for network administrators and instead authenticate them with cryptographic credentials that are issued by an internal CA and installed on corporate laptops. Which password alternative does this describe?",
    options: [
      "Biometric authentication",
      "One-time passwords delivered by SMS",
      "Digital certificates",
      "A longer passphrase policy"
    ],
    answer: [2],
    explanation: "Digital certificates issued by a certificate authority bind a public key to an identity, letting the laptop prove who it is through cryptographic operations instead of a memorized secret. Biometrics rely on physical characteristics such as fingerprints rather than issued credentials, SMS one-time passwords are still passwords and depend on a phone channel, and a longer passphrase policy strengthens passwords rather than eliminating them."
  }
);
(window.QUESTION_BANK = window.QUESTION_BANK || []).push(
  {
    id: "sec-076",
    domain: "Security Fundamentals",
    type: "single",
    question: "Refer to the exhibit. No other authentication commands are configured on the device. What happens when a user attempts to open a Telnet session to the router?",
    exhibit: "line vty 0 4\n login\n transport input telnet ssh",
    options: [
      "The user is prompted for the enable secret",
      "The connection is refused because the login command requires a line password that has not been set",
      "The user is authenticated against the local username database",
      "The user is placed directly into user EXEC mode with no password"
    ],
    answer: [1],
    explanation: "The login command tells the vty lines to authenticate with the line password, but no password command is present, so IOS rejects the session with the message password required, but none set. Authentication against local usernames would require login local instead of login. The enable secret protects privileged EXEC mode, not the initial line login, and IOS never bypasses authentication on vty lines that are configured with login."
  },
  {
    id: "sec-077",
    domain: "Security Fundamentals",
    type: "single",
    question: "Refer to the exhibit. An engineer must additionally permit SSH from only host 10.10.20.77 to server 172.16.30.9 without disturbing the existing entries. Which configuration meets the requirement?",
    exhibit: "R1# show access-lists\nExtended IP access list BRANCH-IN\n    10 deny ip 10.99.0.0 0.0.255.255 any\n    20 permit tcp 10.10.20.0 0.0.0.255 host 172.16.30.9 eq 443\n    30 deny ip any any log",
    options: [
      "ip access-list extended BRANCH-IN\n 35 permit tcp host 10.10.20.77 host 172.16.30.9 eq 22",
      "ip access-list extended BRANCH-IN\n permit tcp host 10.10.20.77 host 172.16.30.9 eq 22",
      "ip access-list extended BRANCH-IN\n 25 permit tcp host 10.10.20.77 host 172.16.30.9 eq 22",
      "ip access-list extended BRANCH-IN\n 5 permit tcp 10.10.20.0 0.0.0.255 host 172.16.30.9 eq 22"
    ],
    answer: [2],
    explanation: "Inserting the entry at sequence 25 places it before the explicit deny ip any any at line 30, so the SSH traffic from host 10.10.20.77 is matched and permitted while every other line is untouched. Adding the statement at sequence 35, or appending it with no sequence number (which places it at the end), positions it after the deny any entry where it can never be matched. Permitting the entire 10.10.20.0/24 subnet at sequence 5 allows SSH from far more hosts than the single address the requirement specifies."
  },
  {
    id: "sec-078",
    domain: "Security Fundamentals",
    type: "single",
    question: "Refer to the exhibit. An engineer must ensure that only hosts in the 10.0.100.0/24 management subnet can open SSH sessions to the router itself, without affecting traffic that is routed through the router. Which command completes the configuration?",
    exhibit: "access-list 5 permit 10.0.100.0 0.0.0.255\n!\nline vty 0 4\n transport input ssh\n login local",
    options: [
      "ip access-group 5 in applied to every Layer 3 interface",
      "access-class 5 out configured under line vty 0 4",
      "ip access-group 5 out applied to the management interface",
      "access-class 5 in configured under line vty 0 4"
    ],
    answer: [3],
    explanation: "The access-class command applies an ACL to the vty lines and filters only sessions destined to the router itself, so access-class 5 in permits SSH solely from 10.0.100.0/24 regardless of which interface the connection arrives on. Applying ip access-group 5 in on every interface would also filter transit traffic, breaking ordinary forwarding for other sources. The out direction on access-class restricts outbound connections that users initiate from the router, which does not address the requirement."
  },
  {
    id: "sec-079",
    domain: "Security Fundamentals",
    type: "multi",
    question: "Refer to the exhibit. Which two source addresses are permitted to establish SSH sessions through the interface? (Choose two.)",
    exhibit: "access-list 120 permit tcp 172.16.4.0 0.0.3.255 any eq 22\naccess-list 120 deny ip any any\n!\ninterface GigabitEthernet0/0\n ip access-group 120 in",
    options: [
      "172.16.5.66",
      "172.16.8.1",
      "172.16.3.254",
      "172.16.7.254",
      "172.16.12.22"
    ],
    answer: [0, 3],
    explanation: "The wildcard mask 0.0.3.255 leaves the last two bits of the third octet and the entire fourth octet unchecked, so the permit statement matches sources 172.16.4.0 through 172.16.7.255. Both 172.16.5.66 and 172.16.7.254 fall inside that block. The address 172.16.3.254 is just below the range, while 172.16.8.1 and 172.16.12.22 are above it, so all three are dropped by the explicit deny ip any any."
  },
  {
    id: "sec-080",
    domain: "Security Fundamentals",
    type: "single",
    question: "Refer to the exhibit. The offending device has been removed and errdisable recovery is not configured on the switch. Which action returns GigabitEthernet0/5 to service?",
    exhibit: "SW1# show port-security interface gigabitEthernet 0/5\nPort Security              : Enabled\nPort Status                : Secure-shutdown\nViolation Mode             : Shutdown\nAging Time                 : 0 mins\nAging Type                 : Absolute\nMaximum MAC Addresses      : 1\nTotal MAC Addresses        : 0\nLast Source Address:Vlan   : 000c.2911.aa34:10\nSecurity Violation Count   : 1",
    options: [
      "Wait for the interface to recover automatically after the aging timer expires",
      "Change the violation mode to restrict so the port comes back up",
      "Enter shutdown followed by no shutdown on the interface",
      "Enter clear mac address-table dynamic interface gigabitEthernet 0/5"
    ],
    answer: [2],
    explanation: "A Secure-shutdown status means the port is err-disabled after a shutdown-mode violation, and without errdisable recovery the only way to restore it is to administratively shut and then no shut the interface. The aging timer shown is 0 and applies to secure MAC entries, not to err-disabled recovery, so the port never recovers on its own. Changing the violation mode affects future violations but does not re-enable a port that is already err-disabled, and clearing the dynamic MAC table has no effect on the err-disabled state."
  },
  {
    id: "sec-081",
    domain: "Security Fundamentals",
    type: "single",
    question: "Refer to the exhibit. What is the effect of the aging configuration on the secure MAC addresses learned on the interface?",
    exhibit: "interface GigabitEthernet0/7\n switchport mode access\n switchport port-security\n switchport port-security maximum 2\n switchport port-security aging time 10\n switchport port-security aging type inactivity",
    options: [
      "All secure MAC addresses are deleted every 10 minutes regardless of traffic",
      "A dynamically learned secure MAC address is removed after it sends no traffic for 10 minutes, freeing a slot for a new device",
      "The interface is err-disabled if a connected device stays idle for 10 minutes",
      "Sticky secure MAC addresses are removed from the startup configuration after 10 minutes"
    ],
    answer: [1],
    explanation: "With aging type inactivity, the 10-minute timer counts only periods with no traffic from a secure address, so an idle device's MAC is aged out and one of the two allowed slots opens for a different device. Aging type absolute, not inactivity, would remove entries 10 minutes after they were learned regardless of activity. Aging never err-disables a port, and sticky addresses do not age out and are saved to the configuration rather than removed from it."
  },
  {
    id: "sec-082",
    domain: "Security Fundamentals",
    type: "single",
    question: "Refer to the exhibit. A compromised host on GigabitEthernet0/2 begins flooding DHCPDISCOVER messages at 200 packets per second to exhaust the DHCP pool. How does the switch respond?",
    exhibit: "ip dhcp snooping\nip dhcp snooping vlan 10\n!\ninterface GigabitEthernet0/2\n switchport mode access\n switchport access vlan 10\n ip dhcp snooping limit rate 10",
    options: [
      "It places GigabitEthernet0/2 in the err-disabled state",
      "It forwards the first 10 packets each second and silently drops the excess while the port stays up",
      "It marks the interface as trusted so the server can answer faster",
      "It rate-limits all traffic on the interface to 10 packets per second"
    ],
    answer: [0],
    explanation: "The ip dhcp snooping limit rate command sets a ceiling on DHCP packets per second for the untrusted port, and when the rate is exceeded the switch err-disables the interface, cutting off the starvation attack at its source. The limit does not merely police the excess DHCP packets, which is why the drop-and-stay-up option is wrong, and it applies only to DHCP traffic rather than to all frames. Trust state is configured manually with ip dhcp snooping trust and is never assigned dynamically."
  },
  {
    id: "sec-083",
    domain: "Security Fundamentals",
    type: "single",
    question: "Refer to the exhibit. SW1 and SW2 both run DHCP snooping and Dynamic ARP Inspection on VLAN 20, and each switch builds bindings only for its directly connected hosts. Hosts on SW1 cannot communicate with hosts on SW2 because SW2 drops their ARP packets arriving on the trunk. Which configuration change on SW2 resolves the problem?",
    exhibit: "SW2 configuration:\nip dhcp snooping\nip dhcp snooping vlan 20\nip arp inspection vlan 20\n!\ninterface GigabitEthernet0/1\n description Trunk to SW1\n switchport mode trunk",
    options: [
      "Configure ip arp inspection trust on interface GigabitEthernet0/1",
      "Configure ip dhcp snooping trust on all access ports in VLAN 20",
      "Create an ARP access list that lists every host connected to SW1",
      "Disable DHCP snooping on VLAN 20 so the binding table is no longer consulted"
    ],
    answer: [0],
    explanation: "DAI validates ARP packets received on untrusted ports against the local DHCP snooping binding table, and SW2 has no bindings for hosts that obtained their leases through SW1, so their legitimate ARP packets are dropped on the trunk. Because SW1 already inspects its own hosts, the inter-switch trunk should be configured with ip arp inspection trust, which is Cisco's recommended design for switch-to-switch links. Trusting all access ports would let any host poison ARP, an ARP access list for every DHCP client is unmanageable, and disabling DHCP snooping breaks DAI entirely."
  },
  {
    id: "sec-084",
    domain: "Security Fundamentals",
    type: "dragdrop",
    question: "Drag each wireless security technology on the left to its matching description on the right.",
    items: ["GCMP", "TKIP", "SAE", "AES-CCMP"],
    targets: [
      "Legacy encryption protocol introduced with the original WPA certification",
      "Encryption protocol required by the WPA2 certification",
      "Authentication method that replaces the PSK exchange in WPA3-Personal",
      "Stronger encryption protocol introduced with WPA3"
    ],
    answer: [1, 3, 2, 0],
    explanation: "WPA was a stopgap that introduced TKIP, a per-packet keying wrapper around the old RC4 cipher, while WPA2 mandated the far stronger AES-based CCMP. WPA3 introduces GCMP for encryption and Simultaneous Authentication of Equals (SAE) for personal-mode authentication, replacing the WPA2 pre-shared key handshake that is vulnerable to offline dictionary attacks. The common trap is pairing SAE with encryption; SAE is an authentication and key-establishment method, not a cipher."
  },
  {
    id: "sec-085",
    domain: "Security Fundamentals",
    type: "multi",
    question: "Which two security improvements does WPA3 provide over WPA2? (Choose two.)",
    options: [
      "Simultaneous Authentication of Equals replaces the WPA2 pre-shared key handshake, resisting offline dictionary attacks",
      "TKIP is reintroduced for backward compatibility with legacy clients",
      "Protected Management Frames (802.11w) are required rather than optional",
      "Open networks must authenticate clients with shared WEP keys",
      "Enterprise mode no longer requires an authentication server"
    ],
    answer: [0, 2],
    explanation: "WPA3-Personal uses SAE, a password-authenticated key exchange that defeats the offline dictionary attacks possible against captured WPA2 four-way handshakes and provides forward secrecy. WPA3 also makes Protected Management Frames mandatory, blocking deauthentication and disassociation spoofing. TKIP is prohibited rather than reintroduced, WEP has been deprecated for years and has no role in WPA3, and WPA3-Enterprise still relies on 802.1X with an authentication server."
  },
  {
    id: "sec-086",
    domain: "Security Fundamentals",
    type: "single",
    question: "A warehouse uses legacy handheld inventory scanners whose radios support only TKIP encryption. Which Wi-Fi security certification must the WLAN supporting these scanners operate under?",
    options: [
      "WPA2",
      "WPA3",
      "WPA",
      "WEP"
    ],
    answer: [2],
    explanation: "TKIP was introduced with the original WPA certification as a firmware-upgradable improvement over WEP, so devices limited to TKIP require a WPA WLAN. WPA2 certification mandates AES-CCMP, and WPA3 requires CCMP or GCMP while explicitly prohibiting TKIP, so neither supports TKIP-only clients. WEP is a separate, broken encryption scheme that predates TKIP and is not the certification under which TKIP operates."
  },
  {
    id: "sec-087",
    domain: "Security Fundamentals",
    type: "multi",
    question: "Which two statements about WPA2 Enterprise mode are true? (Choose two.)",
    options: [
      "Each user is authenticated individually using 802.1X with an EAP method",
      "It requires an authentication server, typically RADIUS, to validate credentials",
      "All users share one pre-shared key that is configured on every client",
      "It cannot use AES-CCMP encryption",
      "It is configured on a WLC by entering a passphrase under the WLAN Security tab"
    ],
    answer: [0, 1],
    explanation: "Enterprise mode replaces the shared passphrase with 802.1X authentication, in which each user or device presents individual credentials through an EAP method and a RADIUS server makes the authentication decision. This provides per-user accountability and the ability to revoke a single user without rekeying everyone. A shared pre-shared key and a passphrase entered on the WLC describe Personal (PSK) mode, and both Personal and Enterprise WPA2 use AES-CCMP for encryption."
  },
  {
    id: "sec-088",
    domain: "Security Fundamentals",
    type: "dragdrop",
    question: "Drag each 802.1X component on the left to its matching role on the right.",
    items: ["Authentication server", "EAP", "Supplicant", "Authenticator"],
    targets: [
      "Software on the endpoint that requests network access and supplies credentials",
      "Switch or access point that relays credentials and opens or blocks the port",
      "System that validates the credentials and returns the access decision",
      "Framework that defines how authentication messages are carried between the components"
    ],
    answer: [2, 3, 0, 1],
    explanation: "In 802.1X the supplicant is the client software on the endpoint, the authenticator is the switch or AP that sits in the middle and enforces the port state, and the authentication server, usually RADIUS, makes the actual accept or reject decision. EAP is not a device role at all; it is the extensible framework whose messages are carried over the LAN (EAPoL) between supplicant and authenticator and inside RADIUS to the server. Swapping the supplicant and authenticator roles is the most frequent mistake."
  },
  {
    id: "sec-089",
    domain: "Security Fundamentals",
    type: "multi",
    question: "An engineer is creating a WLAN on a Cisco WLC GUI that must use WPA2 with a pre-shared key. Which two configuration steps are required on the WLAN's Security settings? (Choose two.)",
    options: [
      "On the Layer 2 tab, set Layer 2 Security to WPA+WPA2 and enable the WPA2 policy with AES encryption",
      "Under Authentication Key Management, enable PSK and enter the pre-shared key",
      "On the Layer 3 tab, enable Web Policy with passthrough",
      "Under AAA Servers, define a RADIUS authentication server for the WLAN",
      "Under Authentication Key Management, enable 802.1X"
    ],
    answer: [0, 1],
    explanation: "WPA2 Personal on a WLC is configured on the WLAN's Security > Layer 2 tab by choosing WPA+WPA2 as the Layer 2 security method, enabling the WPA2 policy with AES, then selecting PSK under Authentication Key Management and entering the key. Enabling 802.1X key management or defining a RADIUS server applies to WPA2 Enterprise, not PSK. Layer 3 Web Policy creates web authentication or passthrough portals, which is a separate security mechanism that is not required for WPA2-PSK."
  },
  {
    id: "sec-090",
    domain: "Security Fundamentals",
    type: "single",
    question: "Refer to the exhibit. An engineer enters the command shown on a router. Which effect does the command have?",
    exhibit: "R1(config)# login block-for 300 attempts 3 within 60",
    options: [
      "Each login prompt is delayed by 60 seconds to slow down automated tools",
      "A user account is locked for 300 seconds after 3 failed attempts on that account",
      "If 3 login attempts fail within 60 seconds, the router enters a quiet mode that blocks login attempts for 300 seconds",
      "Only 3 concurrent vty sessions are allowed, each limited to 300 seconds"
    ],
    answer: [2],
    explanation: "The login block-for command mitigates brute-force and dictionary attacks: when the threshold of 3 failed attempts within 60 seconds is reached, the router enters a quiet period of 300 seconds during which it refuses login connections, except from sources permitted by an optional quiet-mode ACL. The protection is device-wide rather than per-account, so the account-lockout option is wrong. It introduces no per-prompt delay and has nothing to do with limiting concurrent vty sessions or session duration."
  }
);
