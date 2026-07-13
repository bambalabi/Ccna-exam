// Study guide topics: IP Services (configure/verify/troubleshoot objectives).
(window.GUIDE_BANK = window.GUIDE_BANK || []).push(
  {
    id: "gi-nat",
    domain: "IP Services",
    title: "NAT: Static, Pool, and PAT (Overload)",
    blueprint: "4.1 Configure and verify inside source NAT using static and pools",
    overview: [
      "NAT rewrites private (RFC 1918) source addresses into public ones at the network edge. Interfaces are labeled ip nat inside (toward users) and ip nat outside (toward the Internet); inside source NAT translates the source address of traffic going inside → outside.",
      "Three flavors: static NAT maps one inside address to one outside address permanently (needed for servers); dynamic NAT draws from a pool one-to-one; PAT (overload) multiplexes many hosts onto one address by rewriting source ports — the everyday form.",
    ],
    configs: [
      {
        title: "Mark the NAT domains and add static NAT",
        cli: "R1# configure terminal\nR1(config)# interface g0/0\nR1(config-if)# ip nat inside\nR1(config-if)# exit\nR1(config)# interface g0/1\nR1(config-if)# ip nat outside\nR1(config-if)# exit\nR1(config)# ip nat inside source static 192.168.10.50 203.0.113.50",
        notes: [
          "Forgetting the inside/outside labels is the most common NAT fault — translation rules do nothing without them.",
        ],
      },
      {
        title: "PAT with the outside interface address",
        cli: "R1(config)# access-list 1 permit 192.168.10.0 0.0.0.255\nR1(config)# ip nat inside source list 1 interface g0/1 overload",
        notes: [
          "The ACL selects who gets translated — it permits traffic INTO the NAT process, it does not filter packets.",
          "overload is the keyword that makes it PAT; without it the single interface address would allow only one translation at a time.",
        ],
      },
      {
        title: "Dynamic NAT from a pool",
        cli: "R1(config)# ip nat pool PUBLIC 203.0.113.10 203.0.113.20 netmask 255.255.255.0\nR1(config)# access-list 1 permit 192.168.10.0 0.0.0.255\nR1(config)# ip nat inside source list 1 pool PUBLIC",
        notes: [
          "Add overload after 'pool PUBLIC' to combine a pool with PAT; a pure pool exhausts when concurrent hosts exceed pool size.",
        ],
      },
    ],
    verify: [
      { cmd: "show ip nat translations", what: "Live translation table: inside local/global and outside pairs; PAT entries show the rewritten port numbers after the colon." },
      { cmd: "show ip nat statistics", what: "Which interfaces are inside/outside, which ACL and pool are in use, hit/miss counters, and pool exhaustion evidence." },
      { cmd: "clear ip nat translation *", what: "Flushes dynamic entries so a fresh test shows current behavior after a config change (static entries persist)." },
    ],
    troubleshooting: [
      {
        symptom: "No translations ever appear; inside hosts cannot reach the Internet",
        causes: ["ip nat inside/outside missing on one or both interfaces", "ACL does not permit the source subnet"],
        fix: "Verify domain labels in show ip nat statistics and correct the ACL; then re-test and watch show ip nat translations populate.",
      },
      {
        symptom: "Some hosts work, others fail intermittently",
        causes: ["Dynamic pool exhausted (no overload keyword) so late hosts get no address"],
        fix: "Add overload to the ip nat inside source statement or enlarge the pool; check 'misses' in show ip nat statistics.",
      },
      {
        symptom: "Static NAT server reachable from inside but not from the Internet",
        causes: ["Return-path routing missing for the public address", "An inbound ACL on the outside interface blocks the traffic"],
        fix: "Ensure the public prefix routes to R1 and any outside ACL permits the server's translated address and port.",
      },
    ],
    tips: [
      "Terminology is exam gold: inside local = private address, inside global = its public translation, outside global = the remote host as seen publicly.",
      "The NAT ACL never blocks traffic — packets it denies are simply routed untranslated. Distractors love implying otherwise.",
    ],
  },
  {
    id: "gi-ntp",
    domain: "IP Services",
    title: "NTP Client and Server Mode",
    blueprint: "4.2 Configure and verify NTP operating in a client and server mode",
    overview: [
      "NTP synchronizes device clocks against a hierarchy of sources measured in stratum: stratum 1 sits directly on a reference clock, and each hop away adds one. Accurate time matters for certificate validation and, above all, for correlating syslog timestamps during troubleshooting.",
      "A router configured with ntp server <address> is an NTP client; once synchronized it automatically also serves time downstream. ntp master [stratum] makes a router an authoritative source using its own clock — typical in labs or isolated networks.",
    ],
    configs: [
      {
        title: "Client pointing at a server, plus a local master",
        cli: "R2# configure terminal\nR2(config)# ntp server 10.1.1.1\nR2(config)# clock timezone EST -5\n! On R1, acting as the authoritative source:\nR1(config)# ntp master 3",
        notes: [
          "Synchronization takes several minutes of polling — an immediate check right after configuring will still show unsynchronized.",
          "ntp master 3 advertises stratum 3; clients of R2 would then see stratum 4.",
        ],
      },
    ],
    verify: [
      { cmd: "show ntp status", what: "The word 'synchronized' (or not), the stratum this device operates at, and the reference address it follows." },
      { cmd: "show ntp associations", what: "Every configured server with reachability and offset; the sys.peer marked * is the one actually being followed." },
      { cmd: "show clock detail", what: "Current time plus the time source (NTP vs hardware calendar) — confirms the clock is actually driven by NTP." },
    ],
    troubleshooting: [
      {
        symptom: "show ntp status says 'unsynchronized' long after configuration",
        causes: ["Server unreachable (routing/ACL blocks UDP 123)", "Server itself not synchronized so it refuses to serve", "Huge initial clock offset slowing convergence"],
        fix: "Ping the server, permit UDP 123 along the path, confirm the server's own show ntp status, and optionally set the clock close to correct first.",
      },
      {
        symptom: "Logs from different devices cannot be correlated (timestamps disagree)",
        causes: ["Devices synced to different sources or not at all", "Timezone settings differ so identical UTC displays differently"],
        fix: "Point all devices at the same NTP hierarchy and standardize clock timezone / service timestamps settings.",
      },
    ],
    tips: [
      "Lower stratum = closer to the reference clock = better. Stratum 16 means unsynchronized.",
      "NTP runs over UDP port 123 — one of the port numbers the exam expects on sight.",
    ],
  },
  {
    id: "gi-dhcp",
    domain: "IP Services",
    title: "DHCP Server, Client, and Relay",
    blueprint: "4.3/4.6 Explain the role of DHCP; configure and verify DHCP client and relay",
    overview: [
      "DHCP leases addresses through the DORA exchange: Discover, Offer, Request, Acknowledge. Discover is a broadcast, which routers do not forward — so when the DHCP server lives in another subnet, the client's gateway must relay the request with ip helper-address.",
      "An IOS router can play all three roles: server (define a pool, exclude static addresses), relay (helper address on the client-facing interface), and client (obtain an address on its own interface with ip address dhcp).",
    ],
    configs: [
      {
        title: "IOS DHCP server pool",
        cli: "R1# configure terminal\nR1(config)# ip dhcp excluded-address 192.168.10.1 192.168.10.10\nR1(config)# ip dhcp pool LAN10\nR1(dhcp-config)# network 192.168.10.0 255.255.255.0\nR1(dhcp-config)# default-router 192.168.10.1\nR1(dhcp-config)# dns-server 8.8.8.8\nR1(dhcp-config)# domain-name example.com\nR1(dhcp-config)# lease 7",
        notes: [
          "Exclusions must be configured before the pool hands those addresses out — the server otherwise offers everything in the network statement.",
        ],
      },
      {
        title: "Relay on the gateway + router interface as DHCP client",
        cli: "! Relay: on the interface facing the CLIENTS\nR1(config)# interface g0/0\nR1(config-if)# ip helper-address 10.20.0.5\n! Client: router obtains its own address\nR2(config)# interface g0/1\nR2(config-if)# ip address dhcp\nR2(config-if)# no shutdown",
        notes: [
          "The helper address goes on the client-facing interface, not the server-facing one — the most-tested relay detail.",
          "ip helper-address forwards several UDP broadcasts (DHCP 67/68, DNS 53, TFTP 69, NTP...) as unicasts to the target.",
        ],
      },
    ],
    verify: [
      { cmd: "show ip dhcp binding", what: "Active leases: which address went to which MAC and when it expires — cross-check against the client's own view." },
      { cmd: "show ip dhcp pool", what: "Pool utilization: total, leased, and remaining addresses; instantly reveals an exhausted scope." },
      { cmd: "show ip dhcp server statistics", what: "DORA message counters — zero received Discovers on a relay setup means requests never arrive." },
      { cmd: "show ip interface g0/0", what: "Displays 'Helper address is 10.20.0.5', confirming relay is bound to the right interface." },
    ],
    troubleshooting: [
      {
        symptom: "Clients in a remote subnet get 169.254.x.x APIPA addresses",
        causes: ["Missing/wrong ip helper-address on their gateway interface", "DHCP server has no pool for that subnet"],
        fix: "Add the helper on the client-facing interface and create a pool whose network matches the relayed subnet (the server selects a pool by the relay's giaddr).",
      },
      {
        symptom: "Some clients receive addresses that conflict with statically configured devices",
        causes: ["Static addresses inside the pool range were never excluded"],
        fix: "Add ip dhcp excluded-address for every static assignment, then clear the bad bindings with clear ip dhcp binding *.",
      },
      {
        symptom: "Clients get an address but cannot leave the subnet or resolve names",
        causes: ["Pool lacks default-router or dns-server options"],
        fix: "Add the missing options to the pool and have clients renew their lease to pick them up.",
      },
    ],
    tips: [
      "DORA order and transport: Discover/Request from the client (UDP 68 → 67 broadcast), Offer/Ack from the server. Memorize it.",
      "A relay agent turns the broadcast Discover into a unicast to the server and stamps the client subnet in giaddr — that is how the server picks the right pool.",
    ],
  },
  {
    id: "gi-ssh",
    domain: "IP Services",
    title: "Remote Access with SSH",
    blueprint: "4.8 Configure network devices for remote access using SSH",
    overview: [
      "SSH gives encrypted CLI access, replacing Telnet, which sends every keystroke — including passwords — in cleartext. Generating the RSA key pair requires a hostname and a domain name first, because they seed the key's label.",
      "The vty lines must be told to accept SSH (transport input ssh) and to authenticate against the local user database (login local). SSH version 2 should be forced; version 1 has known weaknesses.",
    ],
    configs: [
      {
        title: "Full SSH enablement sequence",
        cli: "Router# configure terminal\nRouter(config)# hostname R1\nR1(config)# ip domain-name example.com\nR1(config)# crypto key generate rsa modulus 2048\nR1(config)# ip ssh version 2\nR1(config)# username admin privilege 15 secret Str0ngPass!\nR1(config)# line vty 0 4\nR1(config-line)# transport input ssh\nR1(config-line)# login local\nR1(config-line)# exec-timeout 10 0",
        notes: [
          "Key generation fails with 'Please define a domain-name first' if the domain (or a non-default hostname) is missing — a scripted exam fault.",
          "transport input ssh silently disables Telnet on those lines; use 'transport input ssh telnet' only during migration.",
        ],
      },
      {
        title: "Restrict SSH sources with an ACL on the vty lines",
        cli: "R1(config)# access-list 10 permit 10.99.0.0 0.0.0.255\nR1(config)# line vty 0 4\nR1(config-line)# access-class 10 in",
        notes: [
          "access-class (not ip access-group) applies ACLs to vty lines — mixing these up is a classic distractor.",
        ],
      },
    ],
    verify: [
      { cmd: "show ip ssh", what: "SSH enabled or not, the version in use, and timeout/retry settings — 'SSH Disabled' here means no RSA keys exist yet." },
      { cmd: "show ssh", what: "Currently connected SSH sessions with user and version — proves a live login is actually using SSH." },
      { cmd: "show running-config | section line vty", what: "Confirms transport input ssh and login local landed on the vty lines." },
    ],
    troubleshooting: [
      {
        symptom: "SSH connection refused although the device is reachable",
        causes: ["RSA keys never generated (SSH disabled)", "vty transport still telnet-only", "vty access-class blocks the source"],
        fix: "Generate crypto keys (needs hostname + domain-name), set transport input ssh, and check the access-class ACL includes your management subnet.",
      },
      {
        symptom: "Login always fails with correct credentials",
        causes: ["login (line password) configured instead of login local, so the username database is ignored"],
        fix: "Set login local on the vty lines and create username ... secret accounts; retry the session.",
      },
      {
        symptom: "Old client cannot negotiate a connection",
        causes: ["ip ssh version 2 enforced while the client only speaks v1, or key too short for modern algorithms"],
        fix: "Upgrade the client (preferred) and regenerate a 2048-bit or larger RSA key; do not downgrade the device to SSHv1.",
      },
    ],
    tips: [
      "The prerequisite chain — hostname → ip domain-name → crypto key generate rsa — is one of the most re-tested orderings in the blueprint.",
      "SSH uses TCP 22, Telnet TCP 23; 'transport input none' on vty blocks all remote CLI access.",
    ],
  }
);
