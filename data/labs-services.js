// CLI labs: IP Services.
(window.LAB_BANK = window.LAB_BANK || []).push(
  {
    id: "li-pat",
    type: "config",
    domain: "IP Services",
    title: "Configure PAT (NAT overload) for the LAN",
    difficulty: 2,
    scenario:
      "R1's LAN 192.168.10.0/24 sits behind g0/0 and the Internet uplink is g0/1. " +
      "Configure PAT so every LAN host shares g0/1's public address: permit the LAN in " +
      "ACL 1, mark the NAT domains, and add the overload rule. You are at R1's user EXEC prompt.",
    device: { hostname: "R1", startMode: "user" },
    steps: [
      {
        label: "Enter privileged EXEC mode",
        accept: ["en(able)"],
        mode: "user",
        setsMode: "priv",
        hints: ["Move up from user EXEC first."],
        explanation: "enable moves from user EXEC (>) to privileged EXEC (#), where configuration modes become reachable.",
      },
      {
        label: "Enter global configuration mode",
        accept: ["conf(igure) t(erminal)"],
        mode: "priv",
        setsMode: "config",
        response: "Enter configuration commands, one per line.  End with CNTL/Z.",
        hints: ["'configure terminal' — or just 'conf t'."],
        explanation: "configure terminal enters global configuration mode, where ACLs and NAT rules live.",
      },
      {
        label: "ACL 1: permit the LAN subnet",
        accept: ["access-list 1 per(mit) 192.168.10.0 0.0.0.255"],
        mode: "config",
        hints: [
          "The ACL selects which sources get translated. Wildcard for /24 is 0.0.0.255.",
          "'access-list 1 permit 192.168.10.0 0.0.0.255'.",
        ],
        explanation: "This ACL feeds the NAT process — it selects candidate traffic; it never blocks anything by itself.",
      },
      {
        label: "Select the LAN interface g0/0",
        accept: ["int(erface) {if=GigabitEthernet0/0}"],
        mode: "config",
        setsMode: "config-if",
        hints: ["Mark the inside domain first — enter the LAN-facing interface."],
        explanation: "NAT domain labels are per-interface; the LAN side is 'inside' for inside source NAT.",
      },
      {
        label: "Mark g0/0 as NAT inside",
        accept: ["ip nat in(side)"],
        mode: "config-if",
        requiresInterface: "GigabitEthernet0/0",
        hints: ["'ip nat inside'."],
        explanation: "ip nat inside tells the router that traffic arriving here is from the private domain to be translated.",
      },
      {
        label: "Select the WAN interface g0/1",
        accept: ["int(erface) {if=GigabitEthernet0/1}"],
        mode: ["config", "config-if"],
        setsMode: "config-if",
        hints: ["Now the Internet-facing interface — you can enter it straight from interface mode."],
        explanation: "Interface commands can be entered from another interface's mode; IOS switches context directly.",
      },
      {
        label: "Mark g0/1 as NAT outside",
        accept: ["ip nat out(side)"],
        mode: "config-if",
        requiresInterface: "GigabitEthernet0/1",
        hints: ["'ip nat outside'."],
        explanation: "ip nat outside marks the public domain; translation happens between one inside and one outside interface.",
      },
      {
        label: "Add the PAT rule (list 1, interface g0/1, overload)",
        accept: ["ip nat in(side) so(urce) list 1 int(erface) {if=GigabitEthernet0/1} overload"],
        mode: "config",
        hints: [
          "This is a GLOBAL command — 'exit' from the interface first.",
          "It ties ACL 1 to the g0/1 address, with the keyword that enables port multiplexing.",
          "'ip nat inside source list 1 interface g0/1 overload'.",
        ],
        explanation:
          "The overload keyword makes this PAT: many inside hosts share g0/1's address, distinguished by " +
          "rewritten source ports. Without it only one host could translate at a time.",
      },
    ],
    outputs: [
      {
        cmd: "sh(ow) ip nat st(atistics)",
        pre: "Total active translations: 0 (0 static, 0 dynamic; 0 extended)\n! (NAT not configured yet)",
        post:
          "Total active translations: 3 (0 static, 3 dynamic; 3 extended)\n" +
          "Outside interfaces:\n  GigabitEthernet0/1\n" +
          "Inside interfaces:\n  GigabitEthernet0/0\n" +
          "Dynamic mappings:\n-- Inside Source\n" +
          "[Id: 1] access-list 1 interface GigabitEthernet0/1 refcount 3",
      },
      {
        cmd: "sh(ow) ip nat tr(anslations)",
        pre: "! (no translations)",
        post:
          "Pro Inside global        Inside local          Outside local         Outside global\n" +
          "tcp 203.0.113.2:4096    192.168.10.11:51122   198.51.100.7:443      198.51.100.7:443\n" +
          "tcp 203.0.113.2:4097    192.168.10.12:53001   198.51.100.9:80       198.51.100.9:80\n" +
          "icmp 203.0.113.2:1      192.168.10.13:1       8.8.8.8:1             8.8.8.8:1",
      },
    ],
    completion:
      "PAT is live: all 192.168.10.0/24 hosts now share g0/1's public address with unique port numbers. " +
      "Watch it work with 'show ip nat translations'.",
  },
  {
    id: "li-nat-swapped",
    type: "troubleshoot",
    domain: "IP Services",
    title: "NAT configured but nothing translates (swapped domains)",
    difficulty: 3,
    scenario:
      "After a change window, no LAN host can reach the Internet through R1. The PAT rule " +
      "and ACL are correct, but the translation table stays empty. R1's LAN is on g0/0 " +
      "and the Internet uplink is g0/1. Investigate the NAT configuration and fix what " +
      "you find. You are at R1's privileged prompt.",
    device: { hostname: "R1", startMode: "priv" },
    diagnosis: [
      { label: "Check NAT domains and counters", cmd: "sh(ow) ip nat st(atistics)" },
      { label: "Confirm the translation table state", cmd: "sh(ow) ip nat tr(anslations)" },
    ],
    outputs: [
      {
        cmd: "sh(ow) ip nat st(atistics)",
        pre:
          "Total active translations: 0 (0 static, 0 dynamic; 0 extended)\n" +
          "Outside interfaces:\n  GigabitEthernet0/0\n" +
          "Inside interfaces:\n  GigabitEthernet0/1\n" +
          "Hits: 0  Misses: 184\n" +
          "Dynamic mappings:\n-- Inside Source\n" +
          "[Id: 1] access-list 1 interface GigabitEthernet0/1 refcount 0",
        post:
          "Total active translations: 2 (0 static, 2 dynamic; 2 extended)\n" +
          "Outside interfaces:\n  GigabitEthernet0/1\n" +
          "Inside interfaces:\n  GigabitEthernet0/0\n" +
          "Hits: 96  Misses: 0\n" +
          "Dynamic mappings:\n-- Inside Source\n" +
          "[Id: 1] access-list 1 interface GigabitEthernet0/1 refcount 2",
      },
      {
        cmd: "sh(ow) ip nat tr(anslations)",
        pre: "! (no translations)",
        post:
          "Pro Inside global        Inside local          Outside local         Outside global\n" +
          "tcp 203.0.113.2:4096    192.168.10.11:51201   198.51.100.7:443      198.51.100.7:443\n" +
          "tcp 203.0.113.2:4097    192.168.10.14:49882   198.51.100.9:80       198.51.100.9:80",
      },
    ],
    fix: [
      {
        id: "inside-lan",
        label: "Mark g0/0 (LAN) as NAT inside",
        accept: ["ip nat in(side)"],
        mode: "config-if",
        requiresInterface: "GigabitEthernet0/0",
        hints: [
          "Compare the Inside/Outside interface lists in 'show ip nat statistics' with where the LAN and Internet actually are.",
          "The domains are swapped. The LAN interface g0/0 must be the INSIDE.",
          "On g0/0: 'ip nat inside'.",
        ],
        explanation:
          "Inside source NAT only translates packets that arrive on an 'ip nat inside' interface and leave via " +
          "'ip nat outside' — with the labels swapped, LAN traffic never qualifies and the table stays empty.",
      },
      {
        id: "outside-wan",
        label: "Mark g0/1 (Internet) as NAT outside",
        accept: ["ip nat out(side)"],
        mode: "config-if",
        requiresInterface: "GigabitEthernet0/1",
        hints: [
          "The Internet uplink g0/1 must be the OUTSIDE domain.",
          "On g0/1: 'ip nat outside'.",
        ],
        explanation:
          "Applying ip nat outside on g0/1 replaces the incorrect inside label there; with both domains correct, " +
          "translations appear immediately.",
      },
    ],
    completion:
      "The NAT domains now match the topology (inside=g0/0, outside=g0/1) and translations are being " +
      "created. Confirm with 'show ip nat statistics'.",
  },
  {
    id: "li-dhcp-relay",
    type: "config",
    domain: "IP Services",
    title: "Relay DHCP to a central server (ip helper-address)",
    difficulty: 1,
    scenario:
      "Clients on R1's g0/0 LAN broadcast DHCP Discovers, but the DHCP server lives in " +
      "the data center at 10.20.0.5 — routers do not forward broadcasts, so clients get " +
      "APIPA addresses. Configure R1 to relay DHCP requests to the server. You are at " +
      "R1's user EXEC prompt.",
    device: { hostname: "R1", startMode: "user" },
    steps: [
      {
        label: "Enter privileged EXEC mode",
        accept: ["en(able)"],
        mode: "user",
        setsMode: "priv",
        hints: ["Move up from user EXEC first."],
        explanation: "enable moves from user EXEC (>) to privileged EXEC (#), where configuration modes become reachable.",
      },
      {
        label: "Enter global configuration mode",
        accept: ["conf(igure) t(erminal)"],
        mode: "priv",
        setsMode: "config",
        response: "Enter configuration commands, one per line.  End with CNTL/Z.",
        hints: ["'configure terminal' — or just 'conf t'."],
        explanation: "configure terminal enters global configuration mode, required before any interface changes.",
      },
      {
        label: "Select the CLIENT-facing interface g0/0",
        accept: ["int(erface) {if=GigabitEthernet0/0}"],
        mode: "config",
        setsMode: "config-if",
        hints: [
          "The helper goes where the broadcasts ARRIVE — the interface facing the clients, not the server.",
          "'interface g0/0'.",
        ],
        explanation: "The relay must sit on the client-facing interface because that is where the Discover broadcasts land.",
      },
      {
        label: "Relay DHCP to 10.20.0.5",
        accept: ["ip help(er-address) 10.20.0.5"],
        mode: "config-if",
        requiresInterface: "GigabitEthernet0/0",
        hints: ["'ip helper-address 10.20.0.5'."],
        explanation:
          "ip helper-address converts the client's broadcast Discover into a unicast to 10.20.0.5, stamping the " +
          "client subnet in giaddr so the server picks the matching pool.",
      },
    ],
    outputs: [
      {
        cmd: "sh(ow) ip int(erface) {if=GigabitEthernet0/0}",
        pre:
          "GigabitEthernet0/0 is up, line protocol is up\n" +
          "  Internet address is 192.168.10.1/24\n" +
          "  Broadcast address is 255.255.255.255\n" +
          "  Helper address is not set",
        post:
          "GigabitEthernet0/0 is up, line protocol is up\n" +
          "  Internet address is 192.168.10.1/24\n" +
          "  Broadcast address is 255.255.255.255\n" +
          "  Helper address is 10.20.0.5",
      },
      {
        cmd: "sh(ow) run(ning-config) int(erface) {if=GigabitEthernet0/0}",
        pre: "interface GigabitEthernet0/0\n ip address 192.168.10.1 255.255.255.0\nend",
        post: "interface GigabitEthernet0/0\n ip address 192.168.10.1 255.255.255.0\n ip helper-address 10.20.0.5\nend",
      },
    ],
    completion:
      "R1 now relays LAN DHCP broadcasts to 10.20.0.5 as unicasts and clients receive leases from the " +
      "central server. Confirm with 'show ip interface g0/0'.",
  },
  {
    id: "li-ssh",
    type: "config",
    domain: "IP Services",
    title: "Enable SSH-only remote management",
    difficulty: 2,
    scenario:
      "R1 is still managed over Telnet. Convert it to SSH-only: set domain example.com, " +
      "generate 2048-bit RSA keys, force SSH version 2, create user admin with secret " +
      "Cisco123!, and lock the vty lines to SSH with local login. You are at R1's user " +
      "EXEC prompt (hostname is already R1).",
    device: { hostname: "R1", startMode: "user" },
    steps: [
      {
        label: "Enter privileged EXEC mode",
        accept: ["en(able)"],
        mode: "user",
        setsMode: "priv",
        hints: ["Move up from user EXEC first."],
        explanation: "enable moves from user EXEC (>) to privileged EXEC (#), where configuration modes become reachable.",
      },
      {
        label: "Enter global configuration mode",
        accept: ["conf(igure) t(erminal)"],
        mode: "priv",
        setsMode: "config",
        response: "Enter configuration commands, one per line.  End with CNTL/Z.",
        hints: ["'configure terminal' — or just 'conf t'."],
        explanation: "configure terminal enters global configuration mode, where all SSH prerequisites are configured.",
      },
      {
        label: "Set the domain name",
        accept: ["ip dom(ain-name) example.com", "ip dom(ain) name example.com"],
        mode: "config",
        hints: [
          "RSA key generation needs hostname + domain name; the hostname is already set.",
          "'ip domain-name example.com'.",
        ],
        explanation: "The domain name (with the hostname) labels the RSA key pair — key generation refuses to run without it.",
      },
      {
        label: "Generate 2048-bit RSA keys",
        accept: ["crypto key gen(erate) rsa mod(ulus) 2048"],
        mode: "config",
        response: "The name for the keys will be: R1.example.com\n% The key modulus size is 2048 bits\n% Generating 2048 bit RSA keys, keys will be non-exportable...\n[OK] (elapsed time was 2 seconds)",
        hints: ["'crypto key generate rsa modulus 2048'."],
        explanation: "The RSA key pair is what SSH encrypts with; 2048 bits is the modern minimum. Generating keys enables the SSH server.",
      },
      {
        label: "Force SSH version 2",
        accept: ["ip ssh ver(sion) 2"],
        mode: "config",
        group: "sshopts",
        hints: ["SSHv1 has known weaknesses — pin the version.", "'ip ssh version 2'."],
        explanation: "ip ssh version 2 disables the weaker SSHv1 protocol entirely; only v2 sessions are accepted.",
      },
      {
        label: "Create the admin user",
        accept: ["user(name) admin sec(ret) Cisco123!", "user(name) admin priv(ilege) 15 sec(ret) Cisco123!"],
        mode: "config",
        group: "sshopts",
        hints: ["Local login needs a local account with a hashed secret.", "'username admin secret Cisco123!'."],
        explanation: "username ... secret stores a hashed password in the local database that the vty lines will check via login local.",
      },
      {
        label: "Enter the vty lines 0-4",
        accept: ["line vty 0 4"],
        mode: "config",
        setsMode: "config-line",
        hints: ["The remote-access settings live on the vty lines.", "'line vty 0 4'."],
        explanation: "line vty 0 4 selects the five virtual terminal lines that remote sessions land on.",
      },
      {
        label: "Allow only SSH transport",
        accept: ["tra(nsport) in(put) ssh"],
        mode: "config-line",
        group: "vtyopts",
        hints: ["This silently disables Telnet on the lines.", "'transport input ssh'."],
        explanation: "transport input ssh restricts the vty lines to SSH; Telnet connections are refused from now on.",
      },
      {
        label: "Authenticate against the local database",
        accept: ["log(in) local"],
        mode: "config-line",
        group: "vtyopts",
        hints: ["Use the username/secret account rather than a line password.", "'login local'."],
        explanation: "login local makes the lines prompt for username + password validated against the local user database.",
      },
    ],
    outputs: [
      {
        cmd: "sh(ow) ip ssh",
        pre: "SSH Disabled - version 1.99\n%Please create RSA keys to enable SSH (and of atleast 768 bits for SSH v2).",
        post: "SSH Enabled - version 2.0\nAuthentication timeout: 120 secs; Authentication retries: 3",
      },
      {
        cmd: "sh(ow) run(ning-config) | sec(tion) line vty",
        pre: "line vty 0 4\n login\n transport input telnet",
        post: "line vty 0 4\n login local\n transport input ssh",
      },
    ],
    completion:
      "R1 now accepts only SSHv2 sessions authenticated as admin against the local database — Telnet is " +
      "dead. Verify with 'show ip ssh'.",
  }
);
