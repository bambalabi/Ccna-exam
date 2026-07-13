// Study guide topics: Security Fundamentals (configure/verify/troubleshoot objectives).
(window.GUIDE_BANK = window.GUIDE_BANK || []).push(
  {
    id: "gs-device-access",
    domain: "Security Fundamentals",
    title: "Device Access Control with Local Passwords",
    blueprint: "5.3 Configure and verify device access control using local passwords",
    overview: [
      "IOS protects three doors: the console line (physical), the vty lines (remote), and privileged EXEC mode. Each can carry its own password, or all can authenticate against local username/secret accounts — the stronger, auditable option.",
      "enable secret stores an MD5-or-better hash and always overrides the legacy cleartext enable password. service password-encryption scrambles remaining cleartext line passwords with weak type-7 encoding — better than nothing, but only 'secret' commands use real hashing.",
    ],
    configs: [
      {
        title: "Console, vty and enable protection",
        cli: "R1# configure terminal\nR1(config)# enable secret Priv15Pass!\nR1(config)# line console 0\nR1(config-line)# password ConsolePass!\nR1(config-line)# login\nR1(config-line)# exec-timeout 5 0\nR1(config-line)# exit\nR1(config)# line vty 0 4\nR1(config-line)# password VtyPass!\nR1(config-line)# login\nR1(config-line)# exit\nR1(config)# service password-encryption",
        notes: [
          "login (without local) means 'ask for this line's password'. A vty line with login but no password refuses connections entirely.",
        ],
      },
      {
        title: "Local username database (preferred)",
        cli: "R1(config)# username admin privilege 15 secret Str0ngPass!\nR1(config)# line console 0\nR1(config-line)# login local\nR1(config-line)# exit\nR1(config)# line vty 0 4\nR1(config-line)# login local",
        notes: [
          "login local ignores any line password and prompts for username + password from the local database.",
          "privilege 15 drops the user straight into privileged EXEC, skipping the enable prompt.",
        ],
      },
    ],
    verify: [
      { cmd: "show running-config | section line", what: "The console/vty stanzas: which login mode each line uses and whether passwords are present (type 7 shown when service password-encryption is on)." },
      { cmd: "show users", what: "Who is connected right now and on which line — confirms your test login actually used the path you secured." },
      { cmd: "show running-config | include username|enable", what: "Local accounts and the enable secret hash types (secret 5/8/9 = hashed; password 0/7 = weak) at a glance." },
    ],
    troubleshooting: [
      {
        symptom: "Remote login prompts for a password but rejects the username database entries",
        causes: ["Line uses login instead of login local, so only the line password is checked"],
        fix: "Change the vty/console line to login local; the next session prompts for username and validates against local accounts.",
      },
      {
        symptom: "vty connection is closed immediately with 'Password required, but none set'",
        causes: ["login configured on the line with no password command present"],
        fix: "Either set a line password or switch to login local with a username/secret account.",
      },
      {
        symptom: "Both enable password and enable secret exist and the old password no longer works",
        causes: ["enable secret always takes precedence when both are configured"],
        fix: "Use the secret's value, and remove the legacy enable password entirely (no enable password) to avoid confusion.",
      },
    ],
    tips: [
      "'secret' = real hash, 'password' = cleartext or reversible type 7. The exam repeatedly asks which commands store hashes.",
      "exec-timeout 0 0 means never time out — acceptable in a lab, flagged as a risk in any security-themed question.",
    ],
  },
  {
    id: "gs-acls",
    domain: "Security Fundamentals",
    title: "Standard and Extended ACLs",
    blueprint: "5.6 Configure and verify access control lists",
    overview: [
      "An ACL is an ordered list of permit/deny statements evaluated top-down; the first match wins and an invisible 'deny any' ends every list. Standard ACLs (1-99) match source address only; extended ACLs (100-199) match protocol, source, destination, and ports.",
      "Placement rule: extended ACLs go close to the source (kill unwanted traffic early); standard ACLs go close to the destination (they can't tell destinations apart, so filtering early would overblock). Named ACLs allow editing individual sequence numbers instead of rewriting the list.",
    ],
    configs: [
      {
        title: "Numbered standard ACL applied outbound",
        cli: "R1# configure terminal\nR1(config)# access-list 10 permit 192.168.10.0 0.0.0.255\nR1(config)# access-list 10 deny any\nR1(config)# interface g0/1\nR1(config-if)# ip access-group 10 out",
        notes: [
          "Wildcard masks invert subnet masks: /24 → 0.0.0.255; host 10.1.1.1 can be written 'host 10.1.1.1'.",
        ],
      },
      {
        title: "Named extended ACL with port matching",
        cli: "R1(config)# ip access-list extended BLOCK-WEB\nR1(config-ext-nacl)# deny tcp 192.168.10.0 0.0.0.255 any eq 80\nR1(config-ext-nacl)# deny tcp 192.168.10.0 0.0.0.255 any eq 443\nR1(config-ext-nacl)# permit ip any any\nR1(config-ext-nacl)# exit\nR1(config)# interface g0/0\nR1(config-if)# ip access-group BLOCK-WEB in",
        notes: [
          "Without the final permit ip any any, the implicit deny would drop everything not explicitly denied — the most common self-inflicted outage.",
          "Edit named ACLs surgically: 'ip access-list extended BLOCK-WEB' then '15 deny tcp ... eq 8080' inserts at sequence 15.",
        ],
      },
    ],
    verify: [
      { cmd: "show access-lists", what: "Every ACL with sequence numbers and per-line match counters — zero hits on a line you expect to match is the diagnosis." },
      { cmd: "show ip interface g0/0", what: "Which ACL is applied inbound and outbound on the interface — catches 'configured but never applied' and wrong-direction mistakes." },
      { cmd: "show running-config | section access-list", what: "The exact configured order of entries, which determines evaluation order for numbered ACLs." },
    ],
    troubleshooting: [
      {
        symptom: "Legitimate traffic is being dropped after adding an ACL",
        causes: ["Implicit deny at the end with no closing permit", "A broad deny placed above a narrower permit", "ACL applied in the wrong direction"],
        fix: "Read the list top-down in show access-lists, reorder or insert the missing permit at the right sequence, and confirm in/out placement.",
      },
      {
        symptom: "ACL exists but has no effect at all",
        causes: ["Never applied with ip access-group (or applied on the wrong interface)"],
        fix: "Apply the ACL on the intended interface and direction; verify with show ip interface that it is listed.",
      },
      {
        symptom: "Remote management locked out right after applying a vty or interface ACL",
        causes: ["Your own management subnet is not permitted before the deny"],
        fix: "From console access, insert a permit for the management subnet above the deny; always permit your own path before applying.",
      },
    ],
    tips: [
      "One ACL per interface, per direction, per protocol — a second ip access-group replaces the first, it does not add.",
      "Wildcard 0.0.0.0 = exact host; 255.255.255.255 = any. 'host' and 'any' are shorthands the exam mixes freely with numeric forms.",
    ],
  },
  {
    id: "gs-l2-security",
    domain: "Security Fundamentals",
    title: "Layer 2 Security: Port Security, DHCP Snooping, DAI",
    blueprint: "5.7 Configure and verify Layer 2 security features (DHCP snooping, dynamic ARP inspection, and port security)",
    overview: [
      "Port security limits which and how many MAC addresses may use an access port, defeating MAC flooding and casual device swaps. Violation modes: shutdown (default, err-disables the port), restrict (drops + logs + counts), protect (drops silently).",
      "DHCP snooping classifies ports as trusted (toward the real server) or untrusted (toward users) and drops server-type DHCP messages on untrusted ports, killing rogue DHCP servers; it also builds a binding table of IP/MAC/port. Dynamic ARP inspection (DAI) then validates ARP packets on untrusted ports against that table, blocking ARP spoofing.",
    ],
    configs: [
      {
        title: "Port security with sticky learning",
        cli: "SW1# configure terminal\nSW1(config)# interface fastEthernet 0/5\nSW1(config-if)# switchport mode access\nSW1(config-if)# switchport port-security\nSW1(config-if)# switchport port-security maximum 2\nSW1(config-if)# switchport port-security mac-address sticky\nSW1(config-if)# switchport port-security violation restrict",
        notes: [
          "The port must be a static access (or trunk) port first — port security is rejected on dynamic (DTP) ports.",
          "Sticky learning writes learned MACs into the running config; save it to make them survive a reload.",
        ],
      },
      {
        title: "DHCP snooping and DAI for VLAN 10",
        cli: "SW1(config)# ip dhcp snooping\nSW1(config)# ip dhcp snooping vlan 10\nSW1(config)# no ip dhcp snooping information option\nSW1(config)# interface gigabitEthernet 0/1\nSW1(config-if)# ip dhcp snooping trust\nSW1(config-if)# exit\nSW1(config)# ip arp inspection vlan 10\nSW1(config)# interface gigabitEthernet 0/1\nSW1(config-if)# ip arp inspection trust",
        notes: [
          "Trust only the uplink toward the DHCP server; user ports stay untrusted by default — that is the whole point.",
          "DAI depends on the snooping binding table, so enable DHCP snooping first or every ARP on untrusted ports is dropped.",
        ],
      },
    ],
    verify: [
      { cmd: "show port-security interface fa0/5", what: "Port's security state, violation mode, max vs current MAC count, and the violation counter — err-disabled shows here as secure-shutdown." },
      { cmd: "show port-security address", what: "The secure MAC table: which addresses are locked to which ports and how they were learned (sticky/static/dynamic)." },
      { cmd: "show ip dhcp snooping", what: "Snooping-enabled VLANs and per-port trust state — confirms the uplink is trusted and user ports are not." },
      { cmd: "show ip dhcp snooping binding", what: "The IP/MAC/port bindings DAI relies on; an empty table with DAI enabled explains widespread ARP drops." },
      { cmd: "show ip arp inspection statistics", what: "Forwarded vs dropped ARP counts per VLAN — rising drops locate spoofing (or a missing binding table)." },
    ],
    troubleshooting: [
      {
        symptom: "Port went err-disabled after a violation",
        causes: ["Default violation mode shutdown triggered by an unexpected MAC (new device, phone swap, hub added)"],
        fix: "Remove the offending device, clear stale sticky MACs if the change is legitimate, then shutdown / no shutdown (or errdisable recovery cause psecure-violation).",
      },
      {
        symptom: "All clients stopped getting DHCP after enabling snooping",
        causes: ["Uplink or server port left untrusted, so OFFER/ACK messages are dropped"],
        fix: "Configure ip dhcp snooping trust on the interface toward the DHCP server/relay and leases resume immediately.",
      },
      {
        symptom: "Hosts with static IPs lose connectivity once DAI is enabled",
        causes: ["Static hosts have no DHCP snooping binding, so their ARP packets fail validation"],
        fix: "Add an ARP ACL permitting the static IP/MAC pairs (or convert the hosts to DHCP) and apply it to the DAI configuration.",
      },
    ],
    tips: [
      "Violation modes ranked for the exam: protect = silent drop, restrict = drop + syslog + counter, shutdown = err-disable. Only shutdown takes the port down.",
      "Trusted vs untrusted is per PORT, while snooping/DAI are enabled per VLAN — questions love swapping those scopes.",
    ],
  }
);
