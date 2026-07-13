// CLI labs: Network Fundamentals.
(window.LAB_BANK = window.LAB_BANK || []).push(
  {
    id: "lf-duplex-mismatch",
    type: "troubleshoot",
    domain: "Network Fundamentals",
    title: "Terrible throughput on Fa0/5 (duplex mismatch)",
    difficulty: 1,
    scenario:
      "Users on SW1 port Fa0/5 report the link 'works but is unusably slow'. The port " +
      "connects to a server whose NIC autonegotiates. A previous admin hard-coded the " +
      "switch side. Diagnose with show commands, then restore autonegotiation on Fa0/5 " +
      "so both ends match. You are at SW1's privileged prompt.",
    device: { hostname: "SW1", startMode: "priv" },
    diagnosis: [
      { label: "Read Fa0/5's error counters", cmd: "sh(ow) int(erfaces) {if=FastEthernet0/5}" },
      { label: "Check Fa0/5 speed/duplex status", cmd: "sh(ow) int(erfaces) {if=FastEthernet0/5} status" },
    ],
    outputs: [
      {
        cmd: "sh(ow) int(erfaces) {if=FastEthernet0/5}",
        pre:
          "FastEthernet0/5 is up, line protocol is up (connected)\n" +
          "  Hardware is Fast Ethernet, address is 001b.2c3d.4e05\n" +
          "  Half-duplex, 100Mb/s, media type is 10/100BaseTX\n" +
          "  ...\n" +
          "  5 minute input rate 87000 bits/sec, 61 packets/sec\n" +
          "     1840 input errors, 0 CRC, 0 frame, 0 overrun, 0 ignored\n" +
          "     912 collisions, 388 late collision, 0 deferred",
        post:
          "FastEthernet0/5 is up, line protocol is up (connected)\n" +
          "  Hardware is Fast Ethernet, address is 001b.2c3d.4e05\n" +
          "  Full-duplex, 100Mb/s, media type is 10/100BaseTX\n" +
          "  ...\n" +
          "  5 minute input rate 87000 bits/sec, 61 packets/sec\n" +
          "     0 input errors, 0 CRC, 0 frame, 0 overrun, 0 ignored\n" +
          "     0 collisions, 0 late collision, 0 deferred",
      },
      {
        cmd: "sh(ow) int(erfaces) {if=FastEthernet0/5} status",
        pre:
          "Port      Name               Status       Vlan       Duplex  Speed Type\n" +
          "Fa0/5     SERVER-01          connected    10         half    100   10/100BaseTX",
        post:
          "Port      Name               Status       Vlan       Duplex  Speed Type\n" +
          "Fa0/5     SERVER-01          connected    10       a-full  a-100   10/100BaseTX",
      },
    ],
    fix: [
      {
        id: "duplex-auto",
        label: "Restore autonegotiation on Fa0/5",
        accept: ["duplex auto", "duplex full"],
        mode: "config-if",
        requiresInterface: "FastEthernet0/5",
        hints: [
          "Late collisions climbing on a live port are the classic signature of a duplex mismatch.",
          "The switch side is hard-coded half duplex while the server autonegotiates. Fix it on interface Fa0/5.",
          "On Fa0/5: 'duplex auto' (both ends autonegotiate) — 'duplex full' also matches the server here.",
        ],
        explanation:
          "When one side is hard-coded and the other autonegotiates, negotiation fails and the auto side " +
          "falls back to half duplex — late collisions under load are the giveaway. Matching both ends fixes it.",
      },
    ],
    completion:
      "Fa0/5 now negotiates full duplex with the server and the late-collision counter stops climbing. " +
      "Re-run 'show interfaces fa0/5' to confirm.",
  }
);
