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
