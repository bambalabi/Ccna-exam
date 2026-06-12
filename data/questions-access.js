(window.QUESTION_BANK = window.QUESTION_BANK || []).push(
  {
    id: "na-001",
    domain: "Network Access",
    type: "single",
    question: "Refer to the exhibit. A PC connected to Gi0/5 cannot reach any device in VLAN 20, although other hosts in VLAN 20 communicate normally. What is the most likely cause?",
    exhibit: "SW1# show vlan brief\n\nVLAN Name                             Status    Ports\n---- -------------------------------- --------- -------------------------------\n1    default                          active    Gi0/5, Gi0/6, Gi0/7\n10   SALES                            active    Gi0/1, Gi0/2\n20   ENGINEERING                      active    Gi0/3, Gi0/4\n30   VOICE                            active",
    options: [
      "Interface Gi0/5 is still assigned to the default VLAN instead of VLAN 20",
      "VLAN 20 is suspended and must be re-enabled with the state active command",
      "Interface Gi0/5 has been configured as a trunk port",
      "VLAN 20 has not been created in the VLAN database"
    ],
    answer: [0],
    explanation: "The show vlan brief output lists Gi0/5 under VLAN 1 (default), so the port was never assigned to VLAN 20 with the switchport access vlan 20 command. VLAN 20 clearly exists and shows a status of active, so the second and fourth options are wrong. A trunk port would not appear in the port list of show vlan brief at all, which rules out the trunk explanation."
  },
  {
    id: "na-002",
    domain: "Network Access",
    type: "single",
    question: "A network engineer must configure interface Gi0/10 so that an IP phone tags its voice traffic in VLAN 150 while the attached PC sends untagged traffic in VLAN 50. Which configuration accomplishes this?",
    options: [
      "switchport mode access\nswitchport access vlan 50\nswitchport voice vlan 150",
      "switchport mode trunk\nswitchport trunk native vlan 50\nswitchport trunk allowed vlan 50,150",
      "switchport mode access\nswitchport access vlan 150\nswitchport voice vlan 50",
      "switchport mode dynamic desirable\nswitchport access vlan 50\nswitchport voice vlan 150"
    ],
    answer: [0],
    explanation: "An access port with a voice VLAN carries the PC's data untagged in the access VLAN (50) and the phone's traffic tagged with 802.1Q in the voice VLAN (150). Configuring a full trunk would technically pass both VLANs but is not the Cisco-recommended design, exposes all VLANs unless pruned, and breaks features that expect an access port. The third option reverses the data and voice VLANs, and dynamic desirable would attempt DTP negotiation rather than guaranteeing access mode."
  },
  {
    id: "na-003",
    domain: "Network Access",
    type: "multi",
    question: "Which two statements about the default VLAN on a Cisco switch are true? (Choose two.)",
    options: [
      "VLAN 1 cannot be deleted or renamed",
      "VLAN 1 can be deleted as long as no ports are assigned to it",
      "All switch ports belong to VLAN 1 by default",
      "The default VLAN can be changed to VLAN 99 with the vlan default 99 command",
      "Untagged frames on a trunk are always assigned to VLAN 1"
    ],
    answer: [0, 2],
    explanation: "VLAN 1 is the factory default VLAN; every port is a member of it out of the box, and IOS does not allow VLAN 1 to be deleted or renamed. There is no vlan default command in IOS. Untagged frames on a trunk are placed into the native VLAN, which defaults to VLAN 1 but can be changed per trunk, so the last statement is not always true."
  },
  {
    id: "na-004",
    domain: "Network Access",
    type: "single",
    question: "Refer to the exhibit. Host A in VLAN 10 on SW1 cannot ping Host B in VLAN 10 on SW2. The link between the switches is configured as an access port on both sides. What should the engineer do to allow hosts in both VLAN 10 and VLAN 20 to communicate with their counterparts across the link?",
    exhibit: "HostA(VLAN10)--SW1[Gi0/1]=====[Gi0/1]SW2--HostB(VLAN10)\nHostC(VLAN20)--SW1                      SW2--HostD(VLAN20)\n\nSW1 Gi0/1: switchport mode access, switchport access vlan 1\nSW2 Gi0/1: switchport mode access, switchport access vlan 1",
    options: [
      "Configure Gi0/1 on both switches as an 802.1Q trunk",
      "Change the access VLAN on both Gi0/1 interfaces to VLAN 10",
      "Enable VTP on both switches so VLANs propagate across the link",
      "Configure an SVI for VLAN 10 on each switch"
    ],
    answer: [0],
    explanation: "To carry multiple VLANs (10 and 20) across a single interswitch link, the link must be an 802.1Q trunk that tags each frame with its VLAN ID. Setting the access VLAN to 10 would fix VLAN 10 only and still strand VLAN 20. VTP propagates VLAN definitions but does not carry user traffic for multiple VLANs over an access link, and SVIs provide Layer 3 access to the switch itself rather than Layer 2 transport between switches."
  },
  {
    id: "na-005",
    domain: "Network Access",
    type: "single",
    question: "A switch port is configured with switchport voice vlan 200. How does the attached Cisco IP phone learn that it should use VLAN 200 for voice traffic?",
    options: [
      "The switch advertises the voice VLAN to the phone using CDP",
      "The phone learns the voice VLAN from a DHCP option in its IP lease",
      "The phone reads the voice VLAN from the 802.1Q native VLAN field",
      "The switch sends the voice VLAN inside LACP PDUs"
    ],
    answer: [0],
    explanation: "Cisco switches advertise the configured voice VLAN to Cisco IP phones through CDP messages, and the phone then tags its voice frames with that VLAN ID and a CoS value. DHCP options can deliver TFTP server information but not the voice VLAN on Cisco access ports. The native VLAN concept applies to trunk links and carries untagged data, and LACP is used for EtherChannel negotiation, not phone provisioning."
  },
  {
    id: "na-006",
    domain: "Network Access",
    type: "single",
    question: "Refer to the exhibit. Based on the output, what is the operational status of interface Gi0/2?",
    exhibit: "SW1# show interfaces gi0/2 switchport\nName: Gi0/2\nSwitchport: Enabled\nAdministrative Mode: dynamic auto\nOperational Mode: static access\nAdministrative Trunking Encapsulation: dot1q\nOperational Trunking Encapsulation: native\nNegotiation of Trunking: On\nAccess Mode VLAN: 1 (default)\nTrunking Native Mode VLAN: 1 (default)",
    options: [
      "The port negotiated to become an access port because the neighbor did not initiate trunking",
      "The port is administratively shut down",
      "The port formed a trunk because both sides are set to dynamic auto",
      "The port is hard-coded as an access port with switchport mode access"
    ],
    answer: [0],
    explanation: "Administrative mode dynamic auto means the port is willing to become a trunk but will not initiate negotiation; since the operational mode is static access, the neighbor never asked to trunk (it is likely also dynamic auto or access). Two dynamic auto ports never form a trunk because neither side actively initiates DTP. The port is not hard-coded to access mode, because the administrative mode would then read static access, and nothing in the output indicates a shutdown state."
  },
  {
    id: "na-007",
    domain: "Network Access",
    type: "dragdrop",
    question: "Match each VLAN-related term to its correct description.",
    items: [
      "Access port",
      "Voice VLAN",
      "Native VLAN",
      "Default VLAN"
    ],
    targets: [
      "Carries traffic for a single data VLAN and sends frames untagged to the host",
      "Auxiliary VLAN on an access port used by an IP phone for tagged voice frames",
      "VLAN whose frames cross an 802.1Q trunk without a tag",
      "VLAN 1, to which all switch ports belong out of the box"
    ],
    answer: [0, 1, 2, 3],
    explanation: "An access port belongs to one data VLAN and exchanges untagged frames with the end device. The voice VLAN is a special second VLAN allowed on an access port so an IP phone can send tagged voice traffic. The native VLAN is the one VLAN on an 802.1Q trunk that travels untagged, while the default VLAN is VLAN 1, the initial membership of every port on a new switch."
  },
  {
    id: "na-008",
    domain: "Network Access",
    type: "single",
    question: "Refer to the exhibit. A user moved from the Sales team to Engineering, and the engineer issued the commands shown. The user now reports total loss of connectivity. What is the problem?",
    exhibit: "SW1(config)# interface gi0/8\nSW1(config-if)# switchport access vlan 25\n% Access VLAN does not exist. Creating vlan 25\nSW1(config-if)# end\nSW1# show vlan id 25\nVLAN Name                             Status    Ports\n---- -------------------------------- --------- ----------\n25   VLAN0025                         active    Gi0/8\nSW1# show interfaces status | include Gi0/8\nGi0/8     user-port    connected    25         a-full a-1000",
    options: [
      "VLAN 25 exists only on this switch and has no Layer 3 gateway or presence on the uplinks",
      "The switchport access vlan 25 command is rejected until the VLAN is created manually",
      "Interface Gi0/8 is err-disabled",
      "The port must be set to switchport mode access before the access VLAN takes effect"
    ],
    answer: [0],
    explanation: "The engineer fat-fingered or chose a VLAN that did not previously exist; IOS auto-created VLAN 25 locally, but if VLAN 25 is not defined network-wide, allowed on the trunks, and given a default gateway, the user is isolated even though the port shows connected. The output proves the command was accepted and the port is up, so the second and third options are wrong. An access VLAN assignment takes effect on a port operating in access mode regardless of whether the mode was explicitly typed, as long as the port is operationally access."
  },
  {
    id: "na-009",
    domain: "Network Access",
    type: "single",
    question: "Which statement correctly describes how a switch handles a frame received on an access port in VLAN 30 destined to an unknown unicast MAC address?",
    options: [
      "The switch floods the frame out all other ports in VLAN 30, including trunks that allow VLAN 30",
      "The switch floods the frame out all ports in all VLANs except the ingress port",
      "The switch drops the frame because the destination is not in the MAC table",
      "The switch forwards the frame only out the native VLAN of each trunk"
    ],
    answer: [0],
    explanation: "Unknown unicast frames are flooded, but flooding is constrained to the VLAN in which the frame arrived: all access ports in VLAN 30 and all trunks whose allowed list includes VLAN 30. A switch never leaks unknown unicast floods into other VLANs, which is the whole point of VLAN segmentation. Dropping would prevent legitimate hosts that have not yet been learned from receiving traffic, and the native VLAN is unrelated to the frame's VLAN membership."
  },
  {
    id: "na-010",
    domain: "Network Access",
    type: "multi",
    question: "An administrator configures switchport voice vlan 150 on interface Gi0/4, which is also configured with switchport access vlan 50. Which two statements about this interface are true? (Choose two.)",
    options: [
      "The interface carries two VLANs but still operates as an access port",
      "show interfaces gi0/4 trunk will list the port as trunking",
      "Traffic from the PC behind the phone is carried untagged in VLAN 50",
      "The interface must be configured with switchport mode trunk to carry the voice VLAN",
      "The phone's voice traffic is carried untagged in VLAN 150"
    ],
    answer: [0, 2],
    explanation: "A port with a data VLAN and a voice VLAN is a special case sometimes called a multi-VLAN access port: it carries the PC's traffic untagged in the access VLAN and the phone's traffic 802.1Q-tagged in the voice VLAN, yet it remains an access port. It does not appear in show interfaces trunk output and must not be configured as a trunk. The voice traffic is tagged, not untagged, which is how the switch distinguishes it from PC traffic."
  },
  {
    id: "na-011",
    domain: "Network Access",
    type: "single",
    question: "Refer to the exhibit. Why does the ping from PC1 to PC2 fail?",
    exhibit: "PC1 192.168.10.10/24 (VLAN 10) -- SW1 Gi0/1\nPC2 192.168.10.20/24 (VLAN 20) -- SW1 Gi0/2\n\nSW1# show vlan brief | include Gi0/[12]\n10   SALES        active    Gi0/1\n20   HR           active    Gi0/2",
    options: [
      "The PCs are in the same subnet but different VLANs, so frames are never bridged between them",
      "The PCs are in different subnets and need a router",
      "VLAN 20 is not allowed on the trunk between the switches",
      "PC2 must use a /16 mask to reach PC1"
    ],
    answer: [0],
    explanation: "Both hosts share subnet 192.168.10.0/24, so each PC ARPs directly for the other, but the switch will not forward frames between VLAN 10 and VLAN 20 at Layer 2, so the ARP requests never arrive. They are not in different subnets, so a router would not be consulted by the hosts; this same-subnet-different-VLAN mismatch is a classic design error. There is only one switch in the topology, so trunk pruning is irrelevant, and changing the mask does not bridge the VLAN boundary."
  },
  {
    id: "na-012",
    domain: "Network Access",
    type: "single",
    question: "Which command displays whether interface Gi0/3 is operating as an access port or a trunk, along with its administrative mode?",
    options: [
      "show interfaces gi0/3 switchport",
      "show vlan brief",
      "show interfaces gi0/3 status",
      "show running-config interface gi0/3"
    ],
    answer: [0],
    explanation: "show interfaces switchport reports both the administrative mode (what is configured, such as dynamic auto or trunk) and the operational mode (what the port is actually doing). show vlan brief lists only access port VLAN membership and omits trunks entirely. show interfaces status shows the VLAN column but not the administrative versus operational distinction, and show running-config shows configured commands but cannot reveal the negotiated operational result of DTP."
  },
  {
    id: "na-013",
    domain: "Network Access",
    type: "multi",
    question: "Which three of the following are valid reasons to place IP phones in a separate voice VLAN rather than the data VLAN? (Choose three.)",
    options: [
      "Voice traffic can be prioritized with QoS based on VLAN and CoS markings",
      "Voice devices can be addressed from a dedicated IP subnet, simplifying management",
      "Separating phones reduces the impact of data-network broadcasts on voice quality",
      "A voice VLAN encrypts the RTP audio streams between phones",
      "A voice VLAN doubles the available bandwidth on the access port"
    ],
    answer: [0, 1, 2],
    explanation: "Voice VLANs let the switch trust and prioritize tagged voice frames, give phones their own subnet and DHCP scope, and shield phones from broadcast and security issues in the data VLAN. A VLAN provides logical separation only; it performs no encryption of media streams, which would require SRTP or similar. VLAN separation also has no effect on the physical bandwidth of the port."
  },
  {
    id: "na-014",
    domain: "Network Access",
    type: "single",
    question: "Refer to the exhibit. An engineer issues the commands shown to remove VLAN 40. What happens to interfaces Gi0/11 and Gi0/12, which were assigned to VLAN 40?",
    exhibit: "SW1(config)# no vlan 40\nSW1(config)# end\nSW1# show vlan brief | include 40\nSW1#",
    options: [
      "The ports remain assigned to the nonexistent VLAN 40 and stop forwarding traffic",
      "The ports automatically move back to VLAN 1",
      "The ports are administratively shut down by the switch",
      "The ports become trunks carrying all remaining VLANs"
    ],
    answer: [0],
    explanation: "When a VLAN is deleted, ports assigned to it keep their configuration pointing at the now-missing VLAN and become inactive; they show up in show vlan brief under no VLAN and pass no traffic until the VLAN is re-created or the ports are reassigned. IOS does not helpfully move them to VLAN 1, shut them down administratively, or convert them to trunks, which is why deleting an in-use VLAN is a common cause of sudden user outages."
  },
  {
    id: "na-015",
    domain: "Network Access",
    type: "single",
    question: "A junior engineer reports that show vlan brief on a new switch shows VLANs 1002 through 1005 that nobody created and that cannot be removed. What should the senior engineer tell him?",
    options: [
      "They are legacy reserved VLANs for FDDI and Token Ring and are normal on every Cisco switch",
      "They indicate the switch was previously used and should be reset to factory defaults",
      "They are created by VTP and disappear when VTP is set to transparent mode",
      "They are dynamically learned private VLANs that age out after 300 seconds"
    ],
    answer: [0],
    explanation: "VLANs 1002-1005 are reserved legacy VLANs for FDDI and Token Ring media that exist by default on Cisco Catalyst switches and cannot be deleted or used for Ethernet traffic. Their presence says nothing about prior use of the switch. They are not created or removed by VTP mode changes, and they are static reserved entries, not dynamically learned private VLANs."
  }
);

(window.QUESTION_BANK = window.QUESTION_BANK || []).push(
  {
    id: "na-016",
    domain: "Network Access",
    type: "single",
    question: "Refer to the exhibit. Hosts in VLAN 10 can reach their gateway 10.1.10.1, but hosts in VLAN 20 cannot reach 10.1.20.1 on the same router-on-a-stick. What is the most likely cause?",
    exhibit: "R1# show running-config | section interface GigabitEthernet0/0\ninterface GigabitEthernet0/0\n no ip address\n!\ninterface GigabitEthernet0/0.10\n encapsulation dot1Q 10\n ip address 10.1.10.1 255.255.255.0\n!\ninterface GigabitEthernet0/0.20\n encapsulation dot1Q 30\n ip address 10.1.20.1 255.255.255.0",
    options: [
      "The subinterface Gi0/0.20 is configured with the wrong 802.1Q VLAN ID",
      "The physical interface Gi0/0 is missing an IP address",
      "Subinterface numbers must match the VLAN ID for routing to work",
      "The encapsulation dot1Q command is only valid on the physical interface"
    ],
    answer: [0],
    explanation: "Gi0/0.20 is configured with encapsulation dot1Q 30, so the router tags and accepts VLAN 30 frames on that subinterface while VLAN 20 traffic arriving from the switch is dropped. The physical interface intentionally has no IP address in a router-on-a-stick design. Although matching subinterface numbers to VLAN IDs is a best practice for readability, it is not required, and encapsulation dot1Q belongs on subinterfaces, not the physical port."
  },
  {
    id: "na-017",
    domain: "Network Access",
    type: "single",
    question: "Which configuration is required on the switch port that connects to a router performing router-on-a-stick interVLAN routing for VLANs 10, 20, and 30?",
    options: [
      "switchport mode trunk with VLANs 10, 20, and 30 allowed",
      "switchport mode access with switchport access vlan 10",
      "Three separate physical access ports, one per VLAN",
      "switchport mode dynamic auto with switchport nonegotiate"
    ],
    answer: [0],
    explanation: "Router-on-a-stick relies on a single 802.1Q trunk so tagged frames from all three VLANs reach the router subinterfaces. An access port would deliver only one untagged VLAN, defeating the design. Three physical links would work but is no longer router-on-a-stick and wastes ports, and combining dynamic auto with nonegotiate is invalid because nonegotiate requires a static trunk or access mode; routers also do not speak DTP, so negotiation would fail anyway."
  },
  {
    id: "na-018",
    domain: "Network Access",
    type: "multi",
    question: "Which two conditions must be met for an SVI (interface Vlan 30) on a Layer 2 access switch to come up in the up/up state? (Choose two.)",
    options: [
      "VLAN 30 must exist in the VLAN database",
      "At least one port in VLAN 30 (access or trunk allowing it) must be up and forwarding",
      "The switch must have ip routing enabled globally",
      "An OSPF process must be running for the SVI subnet",
      "The SVI must be configured with the no switchport command"
    ],
    answer: [0, 1],
    explanation: "An SVI comes up only when its VLAN exists and there is at least one active Layer 2 port participating in that VLAN, either an access port that is up or a trunk forwarding the VLAN. ip routing is needed to route between SVIs but not for a single management SVI to be up/up. Routing protocols are unrelated to SVI line state, and no switchport applies to routed physical ports, not SVIs."
  },
  {
    id: "na-019",
    domain: "Network Access",
    type: "single",
    question: "Refer to the exhibit. A multilayer switch is configured as shown, but hosts in VLAN 10 cannot ping hosts in VLAN 20 even though both SVIs are up/up. What is missing?",
    exhibit: "SW1# show running-config | include ip routing\nSW1#\nSW1# show ip interface brief | include Vlan\nVlan10    10.1.10.1    YES manual up    up\nVlan20    10.1.20.1    YES manual up    up",
    options: [
      "The global ip routing command has not been enabled",
      "A default route pointing to the upstream router",
      "An encapsulation dot1Q command on each SVI",
      "A transparent VTP domain so the SVIs can exchange routes"
    ],
    answer: [0],
    explanation: "The show running-config | include ip routing output returns nothing, proving IP routing is disabled, so the switch cannot route between its own SVIs even though both are up. Directly connected SVI subnets do not need a default route to reach each other. SVIs never use encapsulation dot1Q because tagging happens on trunk ports, and VTP manages VLAN definitions, not routing."
  },
  {
    id: "na-020",
    domain: "Network Access",
    type: "single",
    question: "Compared with router-on-a-stick, what is the primary advantage of using SVIs on a multilayer switch for interVLAN routing?",
    options: [
      "Traffic is routed in hardware without hairpinning through a single physical link",
      "SVIs support 802.1Q tagging while subinterfaces do not",
      "SVIs eliminate the need for a default gateway on hosts",
      "Router-on-a-stick cannot route more than two VLANs"
    ],
    answer: [0],
    explanation: "A multilayer switch routes between VLANs in ASIC hardware at backplane speed, while router-on-a-stick forces all interVLAN traffic to traverse one physical trunk to the router and back, creating a bottleneck. Subinterfaces fully support 802.1Q tagging, so that distractor is false. Hosts always need a default gateway regardless of where routing occurs, and router-on-a-stick scales to many VLANs, only limited by trunk bandwidth and router capacity."
  },
  {
    id: "na-021",
    domain: "Network Access",
    type: "dragdrop",
    question: "Match each interVLAN routing component to its description.",
    items: [
      "Router subinterface",
      "SVI",
      "Routed port",
      "802.1Q trunk"
    ],
    targets: [
      "Logical interface on a router that terminates one tagged VLAN in a router-on-a-stick design",
      "Virtual Layer 3 interface on a switch that serves as the gateway for a VLAN",
      "Physical switch port converted to Layer 3 with the no switchport command",
      "Link that carries multiple tagged VLANs between the switch and the router"
    ],
    answer: [0, 1, 2, 3],
    explanation: "Subinterfaces such as Gi0/0.10 terminate individual VLAN tags on a router-on-a-stick. An SVI (interface Vlan 10) is the switch's virtual gateway interface for a VLAN. A routed port is a physical switch interface taken out of Layer 2 switching with no switchport and given an IP address, typically for point-to-point Layer 3 links, while the 802.1Q trunk transports all the tagged VLANs between devices."
  },
  {
    id: "na-022",
    domain: "Network Access",
    type: "single",
    question: "Refer to the exhibit. The router-on-a-stick configuration shown handles VLANs 10 and 99, where VLAN 99 is the native VLAN on the switch trunk. Hosts in VLAN 99 cannot reach their gateway. Which change fixes the problem while keeping VLAN 99 native on the trunk?",
    exhibit: "interface GigabitEthernet0/1.10\n encapsulation dot1Q 10\n ip address 10.1.10.1 255.255.255.0\n!\ninterface GigabitEthernet0/1.99\n encapsulation dot1Q 99\n ip address 10.1.99.1 255.255.255.0",
    options: [
      "Change Gi0/1.99 to encapsulation dot1Q 99 native",
      "Move the 10.1.99.1 address to the physical interface and delete Gi0/1.99 entirely, keeping encapsulation dot1Q 99",
      "Configure switchport trunk native vlan 1 on the router",
      "Add ip routing on the router"
    ],
    answer: [0],
    explanation: "Because VLAN 99 is the native VLAN, the switch sends its frames untagged, but the subinterface expects a VLAN 99 tag; adding the native keyword tells the router to process untagged frames on that subinterface. Placing the IP on the physical interface also works for native VLAN traffic, but the option as written contradicts itself by keeping the encapsulation command. Routers do not use switchport commands, and ip routing is enabled by default on routers."
  },
  {
    id: "na-023",
    domain: "Network Access",
    type: "single",
    question: "How does an 802.1Q trunk port handle a frame that belongs to the native VLAN when transmitting it to a neighboring switch?",
    options: [
      "It sends the frame without any 802.1Q tag",
      "It tags the frame with VLAN ID 0",
      "It tags the frame with the native VLAN ID and sets the CoS bits to 7",
      "It encapsulates the frame in an ISL header"
    ],
    answer: [0],
    explanation: "By definition, the native VLAN on an 802.1Q trunk is transmitted untagged, which preserves compatibility with devices that do not understand tags. VLAN ID 0 in a tag is a priority tag and means the frame carries CoS but no VLAN assignment, which is different behavior. The switch does not add a native VLAN tag by default (unless vlan dot1q tag native is enabled), and ISL is a deprecated Cisco-proprietary encapsulation unrelated to 802.1Q operation."
  },
  {
    id: "na-024",
    domain: "Network Access",
    type: "multi",
    question: "Refer to the exhibit. Which two conclusions can be drawn from this output? (Choose two.)",
    exhibit: "SW1# show interfaces trunk\n\nPort        Mode             Encapsulation  Status        Native vlan\nGi0/1       on               802.1q         trunking      99\n\nPort        Vlans allowed on trunk\nGi0/1       10,20,30\n\nPort        Vlans allowed and active in management domain\nGi0/1       10,20\n\nPort        Vlans in spanning tree forwarding state and not pruned\nGi0/1       10,20",
    options: [
      "VLAN 30 is permitted on the trunk but does not exist in the VLAN database",
      "The trunk was statically configured rather than negotiated by DTP",
      "VLAN 99 traffic is tagged when crossing this trunk",
      "VLAN 30 is being pruned by VTP",
      "Gi0/1 negotiated trunking through dynamic desirable"
    ],
    answer: [0, 1],
    explanation: "VLAN 30 appears in the allowed list but is absent from the allowed-and-active line, which means it is not defined (active) in the VLAN database. The Mode column shows on, indicating switchport mode trunk was configured statically; a DTP-negotiated trunk would show desirable or auto in that column. VLAN 99 is the native VLAN, so its frames cross untagged, and there is no evidence of VTP pruning since 30 never reached the active list in the first place."
  },
  {
    id: "na-025",
    domain: "Network Access",
    type: "single",
    question: "An engineer wants to restrict a trunk so it carries only VLANs 10 and 20, and later needs to add VLAN 30 without disrupting the existing VLANs. Which command sequence is correct for the addition?",
    options: [
      "switchport trunk allowed vlan add 30",
      "switchport trunk allowed vlan 30",
      "switchport trunk allowed vlan all",
      "switchport trunk vlan append 30"
    ],
    answer: [0],
    explanation: "The add keyword appends VLAN 30 to the existing allowed list without touching VLANs 10 and 20. Issuing switchport trunk allowed vlan 30 replaces the entire list with only VLAN 30, instantly cutting off VLANs 10 and 20 across the trunk, a classic outage-causing mistake. The all keyword would permit every VLAN, violating the restriction requirement, and append is not a valid IOS keyword."
  },
  {
    id: "na-026",
    domain: "Network Access",
    type: "single",
    question: "Refer to the exhibit. CDP is reporting an error on SW1. What is the operational consequence of this condition?",
    exhibit: "SW1#\n%CDP-4-NATIVE_VLAN_MISMATCH: Native VLAN mismatch discovered on GigabitEthernet0/1 (99), with SW2 GigabitEthernet0/1 (1)",
    options: [
      "Untagged frames sent in VLAN 99 by SW1 are placed into VLAN 1 by SW2, leaking traffic between the VLANs",
      "The trunk goes down until both native VLANs match",
      "All tagged VLANs on the trunk stop forwarding",
      "SW2 err-disables its Gi0/1 interface"
    ],
    answer: [0],
    explanation: "With mismatched native VLANs, each switch transmits its native VLAN untagged and the receiver assigns those untagged frames to its own (different) native VLAN, effectively merging VLAN 99 and VLAN 1 traffic and creating a potential security hole and STP inconsistencies. The trunk itself stays up and tagged VLANs continue to forward normally, since tags identify them explicitly. CDP only logs the mismatch; it does not err-disable the port, although STP may block the inconsistent VLANs if PVST+ detects the mismatch."
  },
  {
    id: "na-027",
    domain: "Network Access",
    type: "multi",
    question: "Which two fields are part of the 4-byte 802.1Q tag inserted into an Ethernet frame? (Choose two.)",
    options: [
      "A 12-bit VLAN identifier",
      "A 3-bit Priority Code Point used for CoS",
      "An 8-bit Time To Live",
      "A 16-bit checksum of the tag itself",
      "A 6-bit DSCP value"
    ],
    answer: [0, 1],
    explanation: "The 802.1Q tag contains a 16-bit TPID (0x8100) followed by 3 bits of Priority Code Point for Layer 2 CoS, 1 Drop Eligible Indicator bit, and a 12-bit VLAN ID supporting 4094 usable VLANs. TTL is an IP header field, not part of the tag. The tag carries no dedicated checksum (the frame FCS is recomputed instead), and DSCP is a 6-bit field in the IP header, not the 802.1Q header."
  },
  {
    id: "na-028",
    domain: "Network Access",
    type: "single",
    question: "Refer to the exhibit. PC1 in VLAN 10 gets an IP address from DHCP but cannot reach any other subnet, while PCs in VLAN 20 work fine. R1 is a router-on-a-stick. Where is the fault?",
    exhibit: "SW1# show interfaces trunk\nPort        Mode         Encapsulation  Status        Native vlan\nGi0/24      on           802.1q         trunking      1\n\nPort        Vlans allowed on trunk\nGi0/24      20\n\nR1# show ip interface brief\nGigabitEthernet0/0.10   10.1.10.1   YES manual up   up\nGigabitEthernet0/0.20   10.1.20.1   YES manual up   up",
    options: [
      "VLAN 10 is excluded from the allowed list on the trunk to the router",
      "Subinterface Gi0/0.10 is administratively down",
      "The native VLAN should be 10 instead of 1",
      "DHCP assigned PC1 an address from the wrong pool"
    ],
    answer: [0],
    explanation: "The trunk Gi0/24 allows only VLAN 20, so VLAN 10 frames never reach the router subinterface; the router side is healthy since Gi0/0.10 is up/up. Note that PC1 may still get DHCP if the server or relay is local to VLAN 10, which fits the symptom of having an address but no off-subnet reachability. Changing the native VLAN does not admit VLAN 10 through the allowed list, and there is no evidence of a DHCP scope problem."
  },
  {
    id: "na-029",
    domain: "Network Access",
    type: "dragdrop",
    question: "Match each switch interface configuration command to its function.",
    items: [
      "switchport trunk allowed vlan remove 30",
      "switchport trunk native vlan 99",
      "switchport nonegotiate",
      "switchport trunk encapsulation dot1q"
    ],
    targets: [
      "Deletes a single VLAN from the trunk's permitted list while preserving the others",
      "Defines which VLAN crosses the trunk untagged",
      "Stops the interface from sending DTP frames",
      "Selects the tagging protocol on switches that also support ISL"
    ],
    answer: [0, 1, 2, 3],
    explanation: "The remove keyword subtracts one VLAN from the allowed list without replacing it. switchport trunk native vlan sets the untagged VLAN for the trunk. switchport nonegotiate disables DTP transmission and requires a statically set mode, and the encapsulation command chooses dot1q over the legacy ISL on platforms that support both."
  },
  {
    id: "na-030",
    domain: "Network Access",
    type: "single",
    question: "A switch trunk is configured with switchport trunk allowed vlan none. Users connected to access ports on the downstream switch report total connectivity loss, yet show interfaces trunk shows the trunk as trunking. Why does the trunk still show as up and trunking?",
    options: [
      "The allowed VLAN list controls forwarding, not the trunk's operational state, so the trunk stays up while carrying no VLANs",
      "DTP keepalives count as VLAN traffic and keep the trunk forwarding",
      "The native VLAN is always forwarded even when the allowed list is empty",
      "The switch ignores the none keyword and allows VLAN 1 implicitly"
    ],
    answer: [0],
    explanation: "Trunk status (trunking) reflects encapsulation and DTP/static mode agreement at Layer 2, independent of which VLANs are permitted; with an empty allowed list, the trunk is operationally up but forwards nothing. DTP frames are control traffic and do not represent user VLAN forwarding. Even the native VLAN is blocked when it is not in the allowed list, and IOS honors the none keyword rather than implicitly allowing VLAN 1."
  }
);

(window.QUESTION_BANK = window.QUESTION_BANK || []).push(
  {
    id: "na-031",
    domain: "Network Access",
    type: "single",
    question: "SW1's Gi0/1 is configured with switchport mode dynamic desirable, and SW2's Gi0/1 is configured with switchport mode dynamic auto. What is the resulting operational mode of the link?",
    options: [
      "Trunk, because desirable actively initiates and auto agrees to trunk",
      "Access, because at least one side must be set to mode trunk",
      "Trunk, but only after switchport nonegotiate is added on both sides",
      "The link suspends until both modes match exactly"
    ],
    answer: [0],
    explanation: "Dynamic desirable actively sends DTP requests to form a trunk, and dynamic auto passively accepts, so the link becomes an operational trunk. A static trunk command is not required when DTP negotiation succeeds. Adding switchport nonegotiate to a dynamic mode is rejected by IOS because nonegotiate requires a statically configured mode, and DTP mode mismatches do not suspend a link."
  },
  {
    id: "na-032",
    domain: "Network Access",
    type: "single",
    question: "Refer to the exhibit. Both switch interfaces are up/up, but VLAN traffic does not flow between the switches and SW2 logs CDP native VLAN and trunk mismatch warnings intermittently. What is the cause?",
    exhibit: "SW1 Gi0/1: switchport mode trunk\nSW1 Gi0/1: switchport nonegotiate\n\nSW2# show interfaces gi0/1 switchport | include Mode\nAdministrative Mode: dynamic auto\nOperational Mode: static access",
    options: [
      "SW1 sends no DTP frames, so SW2's dynamic auto port never learns it should trunk and stays in access mode",
      "SW2 must also have switchport nonegotiate before any trunk can form",
      "The dot1q encapsulation is mismatched between the switches",
      "SW1's trunk mode is incompatible with 802.1Q and requires ISL"
    ],
    answer: [0],
    explanation: "switchport nonegotiate on SW1 suppresses DTP entirely; SW2's dynamic auto port only trunks when it hears DTP requests, so it falls back to access mode, creating a one-sided trunk where tagged frames from SW1 are not understood. The fix is to statically configure switchport mode trunk on SW2 (nonegotiate on SW2 is optional hardening, not a requirement). Encapsulation is not shown to be mismatched, and 802.1Q is fully compatible with static trunk mode."
  },
  {
    id: "na-033",
    domain: "Network Access",
    type: "multi",
    question: "Which two combinations of DTP modes on opposite ends of a link result in an operational trunk? (Choose two.)",
    options: [
      "dynamic desirable and dynamic desirable",
      "dynamic auto and dynamic auto",
      "trunk and dynamic auto",
      "access and trunk",
      "access and dynamic desirable"
    ],
    answer: [0, 2],
    explanation: "Two dynamic desirable ports both initiate DTP and form a trunk, and a static trunk port sends DTP that a dynamic auto port accepts, also forming a trunk. Two dynamic auto ports both wait passively and never trunk, remaining access ports. Access paired with trunk is a broken mismatch (one side tags, the other does not), and access with dynamic desirable settles to access because the access side refuses to trunk."
  },
  {
    id: "na-034",
    domain: "Network Access",
    type: "single",
    question: "What is the default DTP administrative mode on most modern Catalyst access switch ports (for example, a Catalyst 2960 or 9200)?",
    options: [
      "dynamic auto",
      "dynamic desirable",
      "trunk",
      "access"
    ],
    answer: [0],
    explanation: "Modern Catalyst platforms default to dynamic auto, meaning ports passively accept trunk negotiation but do not initiate it; two factory-default switches connected together therefore end up with an access link. Dynamic desirable was the default on some older platforms such as certain 3550/3560 models, which is a common point of confusion. Trunk and access are never factory defaults; they must be explicitly configured."
  },
  {
    id: "na-035",
    domain: "Network Access",
    type: "single",
    question: "For security, an engineer must ensure that a port connecting to a user workstation can never negotiate a trunk, even if an attacker sends DTP frames. Which configuration is the Cisco-recommended best practice?",
    options: [
      "switchport mode access together with switchport nonegotiate",
      "switchport mode dynamic auto together with switchport nonegotiate",
      "switchport trunk allowed vlan none",
      "switchport mode dynamic desirable on the user port"
    ],
    answer: [0],
    explanation: "Hard-coding access mode prevents the port from ever trunking, and switchport nonegotiate additionally stops the port from transmitting DTP frames, removing the protocol from the wire entirely. Nonegotiate cannot be combined with dynamic modes; IOS rejects that combination. Emptying the allowed VLAN list affects trunks, not the negotiation itself, and dynamic desirable is the opposite of the goal because it actively solicits trunking."
  },
  {
    id: "na-036",
    domain: "Network Access",
    type: "single",
    question: "Refer to the exhibit. What can be concluded about how the trunk on Gi0/1 was established?",
    exhibit: "SW1# show interfaces trunk\nPort        Mode             Encapsulation  Status        Native vlan\nGi0/1       desirable        802.1q         trunking      1\nGi0/2       on               802.1q         trunking      1",
    options: [
      "Gi0/1 negotiated the trunk via DTP, while Gi0/2 is statically configured as a trunk",
      "Both ports are statically configured trunks",
      "Gi0/1 is statically configured and Gi0/2 negotiated via DTP",
      "Gi0/1 will revert to access mode if DTP is disabled on the neighbor and the neighbor is a static trunk"
    ],
    answer: [0],
    explanation: "The Mode column shows the administrative mode: desirable means Gi0/1 is set to dynamic desirable and reached trunking state through DTP negotiation, while on means Gi0/2 has switchport mode trunk configured. The third option reverses the meaning of the keywords. The fourth option is a trap: a desirable port facing a static trunk with nonegotiate would indeed fail to trunk, but the option misstates this as a certainty about reversion and is not a conclusion supported by this output."
  },
  {
    id: "na-037",
    domain: "Network Access",
    type: "single",
    question: "Two switches are connected with a working 802.1Q trunk. An engineer changes the native VLAN to 99 on SW1 only. Which mechanism detects and reacts to this misconfiguration?",
    options: [
      "CDP logs a native VLAN mismatch and PVST+ places the mismatched VLANs into a PVID-inconsistent blocking state",
      "DTP renegotiates the trunk and shuts it down",
      "LLDP err-disables the interface on both sides",
      "VTP removes VLAN 99 from the database to resolve the conflict"
    ],
    answer: [0],
    explanation: "CDP advertisements include the native VLAN, so each switch logs a NATIVE_VLAN_MISMATCH message, and per-VLAN spanning tree detects the inconsistency through mismatched PVID tags in BPDUs, blocking the affected VLANs with a PVID-inconsistent state to prevent loops and leakage. DTP negotiates trunking mode, not native VLAN consistency, and does not shut links down for this. LLDP does not err-disable ports for native VLAN issues, and VTP manages VLAN existence, not trunk native VLAN settings."
  },
  {
    id: "na-038",
    domain: "Network Access",
    type: "multi",
    question: "An engineer connects a Cisco switch to a non-Cisco switch that does not support DTP. The link must operate as an 802.1Q trunk. Which two commands are appropriate on the Cisco side? (Choose two.)",
    options: [
      "switchport mode trunk",
      "switchport nonegotiate",
      "switchport mode dynamic desirable",
      "switchport mode dynamic auto",
      "vtp mode transparent"
    ],
    answer: [0, 1],
    explanation: "Since the neighbor cannot speak DTP, the Cisco port must be statically set to trunk mode, and switchport nonegotiate stops the now-useless DTP frames from being sent to a device that may mishandle them. Both dynamic modes depend on a DTP-capable neighbor: desirable would send DTP forever without an answer and auto would simply fall back to access. VTP mode is unrelated to whether this individual link trunks."
  },
  {
    id: "na-039",
    domain: "Network Access",
    type: "single",
    question: "Refer to the exhibit. Users in VLAN 30 connected to SW2 lost connectivity right after a change on SW1. Based on the output, what was the change?",
    exhibit: "SW1# show interfaces trunk\nPort        Vlans allowed on trunk\nGi0/24      10,20\n\nSW1# show running-config interface gi0/24\ninterface GigabitEthernet0/24\n switchport mode trunk\n switchport trunk allowed vlan 10,20",
    options: [
      "Someone replaced the allowed VLAN list instead of using the add keyword, removing VLAN 30",
      "VLAN 30 was deleted from the VLAN database on SW1",
      "The native VLAN was changed to VLAN 30",
      "DTP renegotiated the trunk into access mode"
    ],
    answer: [0],
    explanation: "The running config shows switchport trunk allowed vlan 10,20, the signature of typing the command without the add keyword, which overwrites the previous list and silently drops VLAN 30 from the trunk. If VLAN 30 had been deleted from the database it could still appear in the allowed list, just not in the active line. A native VLAN change would not remove a tagged VLAN from the allowed list, and the interface clearly still shows trunk mode."
  },
  {
    id: "na-040",
    domain: "Network Access",
    type: "single",
    question: "Which statement accurately compares ISL and 802.1Q?",
    options: [
      "802.1Q inserts a 4-byte tag into the original frame, while ISL encapsulates the entire frame with a new header and trailer",
      "ISL supports a native VLAN, while 802.1Q tags every frame",
      "802.1Q is Cisco proprietary, while ISL is the IEEE standard",
      "ISL supports 4094 VLANs, while 802.1Q supports only 1005"
    ],
    answer: [0],
    explanation: "802.1Q is the IEEE standard that inserts a 4-byte tag after the source MAC address, whereas ISL is the legacy Cisco-proprietary method that wraps the whole frame in a 26-byte header and 4-byte trailer. The native VLAN concept (untagged frames) exists only in 802.1Q; ISL encapsulates everything, which is the reverse of the second option. The vendor attribution in option three is backwards, and 802.1Q's 12-bit VLAN field supports up to 4094 usable VLANs, more than ISL's 1024."
  },
  {
    id: "na-041",
    domain: "Network Access",
    type: "dragdrop",
    question: "Match each pair of DTP administrative modes (SW1 mode / SW2 mode) to the resulting operational link state.",
    items: [
      "desirable / auto",
      "auto / auto",
      "trunk / access",
      "trunk / trunk"
    ],
    targets: [
      "Trunk formed through DTP negotiation",
      "Access on both sides because neither port initiates",
      "Misconfigured link with one side tagging and the other not",
      "Trunk formed without any negotiation needed"
    ],
    answer: [0, 1, 2, 3],
    explanation: "Desirable initiates DTP and auto responds, producing a negotiated trunk. Auto on both ends leaves both ports passively waiting, so the link stays in access mode. Statically configuring trunk on one side and access on the other creates an inconsistent link where tagged frames meet an access port, causing connectivity and STP problems, while trunk on both sides forms a stable trunk regardless of DTP."
  },
  {
    id: "na-042",
    domain: "Network Access",
    type: "single",
    question: "A network uses VLAN 1 as the native VLAN on all trunks. The security team mandates mitigating VLAN hopping via double tagging. Which approach satisfies the requirement?",
    options: [
      "Change the native VLAN on trunks to an unused VLAN and do not assign that VLAN to any access port",
      "Enable DTP on all trunks so tags are negotiated",
      "Set the native VLAN to match the most heavily used data VLAN",
      "Configure switchport mode dynamic desirable on all access ports"
    ],
    answer: [0],
    explanation: "Double-tagging attacks work when the attacker's access VLAN equals the trunk's native VLAN, because the outer tag is stripped untagged onto the trunk; moving the native VLAN to a dedicated unused VLAN (optionally also tagging native traffic) breaks the attack. DTP does not authenticate or protect tags and should actually be disabled for security. Matching the native VLAN to a busy data VLAN recreates the exact vulnerable condition, and dynamic desirable on access ports invites switch spoofing, the other VLAN hopping variant."
  },
  {
    id: "na-043",
    domain: "Network Access",
    type: "multi",
    question: "Refer to the exhibit. Which two statements about interface Gi0/5 are true? (Choose two.)",
    exhibit: "SW1# show interfaces gi0/5 switchport\nName: Gi0/5\nSwitchport: Enabled\nAdministrative Mode: trunk\nOperational Mode: trunk\nAdministrative Trunking Encapsulation: dot1q\nNegotiation of Trunking: Off\nAccess Mode VLAN: 1 (default)\nTrunking Native Mode VLAN: 99\nVoice VLAN: none\nTrunking VLANs Enabled: 10,20,99",
    options: [
      "The interface does not transmit DTP frames",
      "Frames for VLAN 99 are sent untagged",
      "The interface negotiated trunking with its neighbor via DTP",
      "Frames for VLAN 10 are sent untagged",
      "The interface is carrying the voice VLAN 99"
    ],
    answer: [0, 1],
    explanation: "Negotiation of Trunking: Off indicates switchport nonegotiate is configured, so no DTP frames leave the port; combined with static trunk mode, the trunk exists without negotiation, making the third option false. VLAN 99 is the native VLAN and therefore crosses untagged, while VLAN 10 is a tagged VLAN in the enabled list. The Voice VLAN field reads none, so VLAN 99 is native, not voice."
  },
  {
    id: "na-044",
    domain: "Network Access",
    type: "single",
    question: "After connecting SW1 Gi0/3 (dynamic desirable) to a newly unboxed Catalyst switch, the link comes up as a trunk. The security engineer objects. Why did the trunk form without anyone configuring the new switch?",
    options: [
      "The new switch's default dynamic auto mode accepted the DTP request from the desirable port",
      "Factory-default Catalyst ports are set to mode trunk",
      "CDP automatically converts links between Cisco switches into trunks",
      "The new switch mirrored SW1's configuration through VTP"
    ],
    answer: [0],
    explanation: "Out of the box, Catalyst ports run dynamic auto, which passively agrees to trunk when the neighbor (dynamic desirable here) initiates DTP, so the trunk formed automatically; this is precisely why default DTP settings are considered a security risk. Factory defaults are never static trunk mode. CDP only advertises device information and never changes port modes, and VTP synchronizes VLAN databases, not interface configurations."
  },
  {
    id: "na-045",
    domain: "Network Access",
    type: "single",
    question: "Refer to the exhibit. A trunk between SW1 and SW2 carries VLANs 10 and 20. Hosts in VLAN 10 on SW2 work, but SW2's management SVI in VLAN 20 is unreachable from SW1's side, and show interfaces trunk on SW2 is shown. What is the problem?",
    exhibit: "SW2# show interfaces trunk\nPort        Mode     Encapsulation  Status     Native vlan\nGi0/1       on       802.1q         trunking   1\n\nPort        Vlans allowed on trunk\nGi0/1       10,20\n\nPort        Vlans allowed and active in management domain\nGi0/1       10\n\nPort        Vlans in spanning tree forwarding state and not pruned\nGi0/1       10",
    options: [
      "VLAN 20 does not exist in SW2's VLAN database, so the SVI is down and the VLAN is inactive on the trunk",
      "VLAN 20 is blocked by spanning tree on Gi0/1",
      "The native VLAN must be changed to 20 for management traffic",
      "The trunk mode on must be changed to desirable"
    ],
    answer: [0],
    explanation: "VLAN 20 appears in the allowed list but not in the allowed-and-active list, the signature of a VLAN missing from the local VLAN database; without the VLAN, the Vlan20 SVI also stays down/down. If STP were blocking VLAN 20, it would still appear in the active line and only be absent from the forwarding line. Management traffic does not need to ride the native VLAN, and the trunk is already operational, so changing the DTP mode accomplishes nothing."
  }
);

(window.QUESTION_BANK = window.QUESTION_BANK || []).push(
  {
    id: "na-046",
    domain: "Network Access",
    type: "single",
    question: "SW1 is configured with channel-group 1 mode active on Gi0/1-2, and SW2 is configured with channel-group 1 mode passive on its corresponding ports. Which protocol negotiates this bundle, and will it form?",
    options: [
      "LACP; the bundle forms because active initiates and passive responds",
      "PAgP; the bundle forms because active initiates and passive responds",
      "LACP; the bundle fails because at least one side must be passive-auto",
      "No protocol; mode active means unconditional bundling"
    ],
    answer: [0],
    explanation: "Active and passive are LACP keywords: active sends LACPDUs to initiate, and passive replies when it hears them, so the EtherChannel forms. PAgP uses desirable and auto, a frequent point of keyword confusion on the exam. Passive-auto is not a real requirement, and unconditional bundling is mode on, which uses no protocol at all."
  },
  {
    id: "na-047",
    domain: "Network Access",
    type: "single",
    question: "Refer to the exhibit. Why is the EtherChannel between SW1 and SW2 not forming?",
    exhibit: "SW1# show etherchannel summary\nFlags:  D - down        P - bundled in port-channel\n        I - stand-alone s - suspended\n        S - Layer2      U - in use\n\nGroup  Port-channel  Protocol    Ports\n------+-------------+-----------+--------------------------\n1      Po1(SD)       LACP        Gi0/1(I)  Gi0/2(I)\n\nSW2: interface range gi0/1-2\n      channel-group 1 mode passive",
    options: [
      "Both switches use passive-compatible settings, but SW1's ports are stand-alone, indicating SW2 is passive while SW1 is also not initiating; one side must run mode active",
      "LACP and PAgP are mixed on the two switches",
      "The port-channel number must match on both switches",
      "Gi0/1 and Gi0/2 are err-disabled"
    ],
    answer: [0],
    explanation: "The (I) stand-alone flag with an LACP protocol and an SD port-channel indicates the LACP negotiation never completes; with SW2 set to passive, SW1 must be active, because passive-passive leaves both ends silently waiting. There is no evidence of PAgP anywhere in the output. The channel-group number is locally significant and does not need to match between switches, and err-disabled ports would show D, not I."
  },
  {
    id: "na-048",
    domain: "Network Access",
    type: "multi",
    question: "Which three interface settings must match across all member ports for them to bundle into the same EtherChannel? (Choose three.)",
    options: [
      "Speed and duplex",
      "Switchport mode (access or trunk) and allowed/access VLANs",
      "Spanning-tree port priority",
      "Native VLAN on trunk members",
      "Interface description text"
    ],
    answer: [0, 1, 3],
    explanation: "EtherChannel members must agree on speed, duplex, operational mode, access VLAN or trunk allowed list, and native VLAN; a mismatch suspends the offending port from the bundle. STP port priority and cosmetic settings like descriptions are not checked for consistency. The consistency requirement exists because the port-channel is treated as one logical interface, so member behavior must be identical."
  },
  {
    id: "na-049",
    domain: "Network Access",
    type: "single",
    question: "An engineer configures channel-group 2 mode on for two links to a neighboring switch, but the neighbor's ports are set to channel-group 2 mode desirable. What happens?",
    options: [
      "The channel does not form, because mode on disables negotiation while desirable expects PAgP responses",
      "The channel forms because on is compatible with any PAgP mode",
      "The channel forms as a static LACP bundle",
      "Both switches fall back to independent links with no errors logged"
    ],
    answer: [0],
    explanation: "Mode on bundles unconditionally without sending or processing PAgP or LACP frames, while desirable requires a PAgP conversation; the desirable side never gets answers and refuses to bundle, and the on side may bundle blindly, risking loops and err-disabled states when STP detects inconsistency. On is only compatible with on at the far end. There is no such thing as a static LACP bundle formed with mode on, and the mismatch typically does produce log messages and suspended ports rather than a silent clean fallback."
  },
  {
    id: "na-050",
    domain: "Network Access",
    type: "single",
    question: "Refer to the exhibit. What does the (SU) flag next to Po1 and the (P) flags next to the member ports indicate?",
    exhibit: "SW1# show etherchannel summary\nFlags:  D - down        P - bundled in port-channel\n        I - stand-alone s - suspended\n        R - Layer3      S - Layer2\n        U - in use\n\nNumber of channel-groups in use: 1\nGroup  Port-channel  Protocol    Ports\n------+-------------+-----------+----------------------\n1      Po1(SU)         LACP      Gi0/1(P)    Gi0/2(P)",
    options: [
      "The port-channel is a Layer 2 channel that is operational, with both members actively bundled",
      "The port-channel is suspended and unusable",
      "The port-channel is a Layer 3 channel in use",
      "The members are up but waiting for LACP negotiation to finish"
    ],
    answer: [0],
    explanation: "S means Layer 2 and U means in use, so Po1 is a healthy switched EtherChannel, and P confirms each member port is bundled and passing traffic. Suspended would be a lowercase s on the member ports, an easy flag to misread. A Layer 3 channel would show R instead of S, and ports still negotiating or failing LACP would show I (stand-alone) rather than P."
  },
  {
    id: "na-051",
    domain: "Network Access",
    type: "single",
    question: "A single large backup transfer between two servers crosses a 4-link Gigabit EtherChannel, yet never exceeds 1 Gbps. Why?",
    options: [
      "EtherChannel hashing assigns all frames of one flow to a single member link to prevent reordering",
      "LACP reserves three of the four links as hot standby",
      "The default load-balancing method is round-robin per frame, capped at line rate",
      "STP blocks three of the four physical links inside the bundle"
    ],
    answer: [0],
    explanation: "The load-balancing hash (based on MAC, IP, or port fields) deterministically maps each flow to one physical member, so a single flow can never use more than one link's bandwidth; aggregate capacity helps only with multiple flows. LACP can hold links in standby when more than eight are configured, but not three out of four by default. Cisco EtherChannel never balances round-robin per frame, and STP sees the bundle as one logical interface, so it does not block individual members."
  },
  {
    id: "na-052",
    domain: "Network Access",
    type: "dragdrop",
    question: "Match each EtherChannel mode keyword to its behavior.",
    items: [
      "active",
      "passive",
      "desirable",
      "auto",
      "on"
    ],
    targets: [
      "Initiates LACP negotiation by sending LACPDUs",
      "Responds to LACP only if the neighbor initiates",
      "Initiates PAgP negotiation",
      "Responds to PAgP only if the neighbor initiates",
      "Bundles unconditionally with no negotiation protocol"
    ],
    answer: [0, 1, 2, 3, 4],
    explanation: "LACP uses active (initiator) and passive (responder), while the Cisco-proprietary PAgP uses desirable (initiator) and auto (responder). At least one side of a negotiated channel must be an initiator. Mode on disables both protocols and bundles statically, so it works only when both ends are set to on."
  },
  {
    id: "na-053",
    domain: "Network Access",
    type: "single",
    question: "Which configuration creates a Layer 3 EtherChannel on a multilayer switch?",
    options: [
      "no switchport on the member interfaces, then channel-group 1 mode active, then assign the IP address to interface Port-channel1",
      "Assign IP addresses to each physical member interface and bundle them with channel-group 1 mode active",
      "Configure switchport mode trunk on the members and add ip address on Port-channel1",
      "Create interface Port-channel1, assign the IP, and enable ip routing; the members join automatically"
    ],
    answer: [0],
    explanation: "A Layer 3 EtherChannel requires the member ports to be routed ports (no switchport) before bundling, and the IP address goes on the logical port-channel interface, never the members. Addressing the physical members individually creates separate routed links, not a channel. A trunk is Layer 2 and cannot carry an IP on the port-channel without no switchport, and member interfaces never join a channel automatically; each needs the channel-group command."
  },
  {
    id: "na-054",
    domain: "Network Access",
    type: "multi",
    question: "Refer to the exhibit. Which two actions resolve the suspended member port? (Choose two.)",
    exhibit: "SW1# show etherchannel summary\nGroup  Port-channel  Protocol    Ports\n------+-------------+-----------+----------------------\n1      Po1(SU)         LACP      Gi0/1(P)  Gi0/2(s)\n\nSW1# show run interface gi0/1\n switchport mode trunk\n switchport trunk allowed vlan 10,20\n channel-group 1 mode active\nSW1# show run interface gi0/2\n switchport mode trunk\n switchport trunk allowed vlan 10,20,30\n channel-group 1 mode active",
    options: [
      "Change Gi0/2's allowed VLAN list to 10,20 to match Gi0/1",
      "Change Gi0/1's allowed VLAN list to 10,20,30 to match Gi0/2 (and the port-channel)",
      "Reboot the switch to clear the suspended state",
      "Change Gi0/2 to channel-group 1 mode passive",
      "Replace LACP with PAgP on both members"
    ],
    answer: [0, 1],
    explanation: "Gi0/2 is suspended because its trunk allowed list differs from the other member; making the lists identical in either direction restores consistency and lets the port rejoin the bundle. A reboot does not fix a configuration mismatch. Mixing active and passive within the same switch's bundle does not address the VLAN mismatch, and swapping the negotiation protocol is irrelevant to a member-consistency failure."
  },
  {
    id: "na-055",
    domain: "Network Access",
    type: "single",
    question: "Which statement about EtherChannel and spanning tree is correct?",
    options: [
      "STP treats the entire port-channel as a single logical interface, so no member link is individually blocked",
      "STP blocks all but one member link of every EtherChannel",
      "EtherChannel requires STP to be disabled on member ports",
      "Each member link sends its own independent BPDUs"
    ],
    answer: [0],
    explanation: "One major benefit of EtherChannel is that STP sees the bundle as one logical port, so all members forward simultaneously instead of being blocked as redundant parallel links. If the same links were not bundled, STP would indeed block all but one, which is what the second option wrongly applies to a formed channel. STP remains enabled and runs on the logical interface, and BPDUs are sent on the channel as a whole, not per member."
  },
  {
    id: "na-056",
    domain: "Network Access",
    type: "single",
    question: "Refer to the exhibit. Traffic from many clients to a single server is heavily utilizing only one member of the EtherChannel. Which change distributes this traffic more evenly?",
    exhibit: "SW1# show etherchannel load-balance\nEtherChannel Load-Balancing Configuration:\n        dst-mac\n\nTopology: many clients --> SW1 --Po1--> SW2 --> single server",
    options: [
      "port-channel load-balance src-mac",
      "port-channel load-balance dst-ip",
      "channel-group 1 mode on",
      "lacp max-bundle 1"
    ],
    answer: [0],
    explanation: "With dst-mac balancing, every frame headed to the one server hashes to the same member link because the destination MAC never varies; hashing on source MAC (or source IP) uses the diverse client addresses to spread flows across members. dst-ip suffers the identical single-destination problem. Mode on changes negotiation, not hashing, and lacp max-bundle 1 would actually reduce the channel to a single active link."
  },
  {
    id: "na-057",
    domain: "Network Access",
    type: "single",
    question: "How many links can be actively forwarding in a single LACP EtherChannel, and what happens to additional configured links?",
    options: [
      "Up to 8 active links; up to 8 more can be in hot-standby mode",
      "Up to 4 active links; the rest are err-disabled",
      "Up to 16 active links with no standby concept",
      "Up to 2 active links per VLAN"
    ],
    answer: [0],
    explanation: "LACP supports a maximum of 8 active member links, and up to 8 additional links may be placed in hot-standby, ready to replace a failed active member based on LACP port priority. PAgP, by contrast, supports 8 with no standby pool. Extra links are placed in standby, not err-disabled, and there is no per-VLAN link limit in EtherChannel."
  },
  {
    id: "na-058",
    domain: "Network Access",
    type: "single",
    question: "Refer to the exhibit. An engineer applies the configuration shown but the port-channel interface never appears. What is wrong?",
    exhibit: "SW1(config)# interface port-channel 5\nSW1(config-if)# switchport mode trunk\nSW1(config-if)# exit\nSW1(config)# interface range gi0/1-2\nSW1(config-if-range)# switchport mode trunk\nSW1(config-if-range)# channel-group 5 mode desirable\nSW2 side: channel-group 5 mode active",
    options: [
      "SW1 runs PAgP (desirable) while SW2 runs LACP (active), so the protocols never negotiate a bundle",
      "The port-channel interface must be created only after the channel-group command",
      "Trunk mode cannot be combined with PAgP",
      "The channel-group numbers must be different on the two switches"
    ],
    answer: [0],
    explanation: "Desirable is PAgP and active is LACP; the two protocols are incompatible, so each side ignores the other's negotiation frames and no bundle forms. Pre-creating the port-channel interface is permitted (the channel-group command would also auto-create it), so ordering is not the failure here. PAgP works fine on trunk ports, and channel-group numbers are locally significant, so matching or differing numbers across switches does not matter."
  },
  {
    id: "na-059",
    domain: "Network Access",
    type: "multi",
    question: "Which two statements correctly contrast LACP and PAgP? (Choose two.)",
    options: [
      "LACP is an IEEE standard (802.3ad/802.1AX) usable with non-Cisco devices, while PAgP is Cisco proprietary",
      "LACP supports hot-standby links beyond the 8 active members, while PAgP does not",
      "PAgP supports more active links per bundle than LACP",
      "LACP modes are desirable and auto, while PAgP modes are active and passive",
      "PAgP is required for Layer 3 EtherChannels"
    ],
    answer: [0, 1],
    explanation: "LACP is standardized in IEEE 802.3ad (later 802.1AX) and interoperates with other vendors, and it allows up to 8 standby links in addition to 8 active ones; the proprietary PAgP supports 8 members with no standby pool. The mode names in the fourth option are swapped between the protocols, a classic exam trap. Both protocols, and even mode on, can be used for Layer 3 EtherChannels."
  },
  {
    id: "na-060",
    domain: "Network Access",
    type: "dragdrop",
    question: "Match each EtherChannel mode combination (SW1 / SW2) to the outcome.",
    items: [
      "active / active",
      "passive / passive",
      "desirable / auto",
      "auto / auto",
      "on / active"
    ],
    targets: [
      "LACP channel forms with both sides initiating",
      "No channel; both LACP sides wait silently",
      "PAgP channel forms",
      "No channel; both PAgP sides wait silently",
      "No channel; one side uses no protocol while the other expects LACP"
    ],
    answer: [0, 1, 2, 3, 4],
    explanation: "Active/active forms an LACP bundle since either side may initiate, but passive/passive fails because neither sends the first LACPDU. Desirable/auto succeeds under PAgP, while auto/auto fails for the same passive-passive reason. Mode on neither sends nor processes negotiation frames, so pairing it with active (or desirable) leaves the negotiating side unsatisfied and no stable channel forms."
  }
);
(window.QUESTION_BANK = window.QUESTION_BANK || []).push(
  {
    id: "na-061",
    domain: "Network Access",
    type: "single",
    question: "Refer to the exhibit. Three switches are connected in a triangle and all run Rapid PVST+ for VLAN 10. Based on the output collected from each switch, which switch is elected root bridge for VLAN 10?",
    exhibit: "SW1# show spanning-tree vlan 10 bridge\nVLAN0010   32778 (32768,  10)  0001.1111.1111   2    20  15  rstp\n\nSW2# show spanning-tree vlan 10 bridge\nVLAN0010   28682 (28672,  10)  00d0.ffff.ffff   2    20  15  rstp\n\nSW3# show spanning-tree vlan 10 bridge\nVLAN0010   28682 (28672,  10)  000a.bbbb.bbbb   2    20  15  rstp",
    options: [
      "SW1, because it has the lowest MAC address of the three switches",
      "SW2, because its bridge ID was learned before SW3 joined the topology",
      "SW3, because it ties with SW2 on priority and has the lower MAC address",
      "The root cannot be determined without knowing the port costs between the switches"
    ],
    answer: [2],
    explanation: "Root election compares the bridge priority field first and only uses the MAC address as a tiebreaker. SW2 and SW3 share the lowest priority (28672), so the election moves to the MAC tiebreak, which SW3 wins because 000a.bbbb.bbbb is lower than 00d0.ffff.ffff. SW1 has the lowest MAC overall, but its higher priority of 32768 removes it from contention before MAC is ever compared. Port costs influence root port selection on each switch, not the root bridge election itself."
  },
  {
    id: "na-062",
    domain: "Network Access",
    type: "multi",
    question: "Refer to the exhibit. Which two conclusions can be drawn about VLAN 10 spanning tree on SW3? (Choose two.)",
    exhibit: "SW3# show spanning-tree vlan 10\nVLAN0010\n  Spanning tree enabled protocol rstp\n  Root ID    Priority    24586\n             Address     0017.5a4b.0001\n             Cost        4\n             Port        25 (GigabitEthernet0/1)\n             Hello Time   2 sec  Max Age 20 sec  Forward Delay 15 sec\n\n  Bridge ID  Priority    32778  (priority 32768 sys-id-ext 10)\n             Address     0023.04ee.be01",
    options: [
      "SW3 is not the root bridge for VLAN 10",
      "The root bridge was configured with a priority of 24576",
      "SW3 has had its bridge priority manually lowered",
      "GigabitEthernet0/1 is a designated port for VLAN 10",
      "The root bridge is at least two switch hops away from SW3"
    ],
    answer: [0, 1],
    explanation: "The output lists a separate Root ID with a different MAC address plus a root cost and root port, which only appears when the local switch is not the root. The root advertises priority 24586, which is the configured value 24576 plus the sys-id-ext of 10, so the administrator set 24576. SW3 still has the default 32768 (shown as 32778 with the VLAN added), so its priority was not changed. Gi0/1 is identified as the root port, not a designated port, and a root cost of 4 equals a single gigabit hop, so the root is directly connected."
  },
  {
    id: "na-063",
    domain: "Network Access",
    type: "single",
    question: "SW3 connects directly to the root bridge SW1 through FastEthernet0/1 and connects to SW2 through GigabitEthernet0/1. SW2 connects to SW1 through another gigabit link. All interfaces use default IEEE short-method costs. Which port does SW3 select as its root port?",
    options: [
      "FastEthernet0/1, because a directly connected path to the root is always preferred",
      "GigabitEthernet0/1, because the total path cost of 8 is lower than the direct path cost of 19",
      "FastEthernet0/1, because it has the lower interface number on SW3",
      "GigabitEthernet0/1, because gigabit interfaces are always preferred regardless of cost"
    ],
    answer: [1],
    explanation: "Root port selection is based on the lowest cumulative cost to the root, not hop count or directness. The path through SW2 accumulates 4 + 4 = 8 (two gigabit links), which beats the direct FastEthernet path cost of 19. The idea that a direct connection wins is a common trap; STP happily takes more hops if the total cost is lower. Interface numbers and raw bandwidth only matter as later tiebreakers when costs are equal."
  },
  {
    id: "na-064",
    domain: "Network Access",
    type: "single",
    question: "A nonroot switch has two uplinks with identical cumulative path cost to the root bridge, but each uplink connects to a different upstream switch. Which criterion does the switch evaluate next to choose its root port?",
    options: [
      "The lowest local interface number",
      "The lowest sender port ID in the received BPDUs",
      "The lowest sender bridge ID in the received BPDUs",
      "The interface with the highest negotiated bandwidth"
    ],
    answer: [2],
    explanation: "When root path costs tie, the switch prefers the port that receives BPDUs from the neighbor with the lowest sender bridge ID. The sender port ID is only consulted later, when both candidate ports receive BPDUs from the same upstream switch, so it cannot break this particular tie first. Local interface numbering and bandwidth are not part of the IEEE decision sequence; bandwidth only influences the cost value that was already found to be equal."
  },
  {
    id: "na-065",
    domain: "Network Access",
    type: "single",
    question: "Refer to the exhibit. The administrator never configured a spanning-tree priority on this switch, yet the output shows 32778. What explains this value?",
    exhibit: "SW2# show spanning-tree vlan 10 | include Bridge ID|Priority|Address\n  Bridge ID  Priority    32778  (priority 32768 sys-id-ext 10)\n             Address     5897.bdaa.3c80",
    options: [
      "The extended system ID adds the VLAN number to the configured priority field",
      "A previous administrator configured spanning-tree vlan 10 priority 32778",
      "The switch increments its priority by 10 each time a topology change occurs",
      "Rapid PVST+ automatically raises the priority of switches that are not the root"
    ],
    answer: [0],
    explanation: "With the extended system ID, the 16-bit priority field is split into a 4-bit configurable priority and a 12-bit system ID that carries the VLAN number, so the displayed value is 32768 + 10 for VLAN 10. A value of 32778 cannot be configured directly because priorities must be multiples of 4096. Topology changes never modify the bridge priority, and Rapid PVST+ does not penalize nonroot switches; the value is purely the default priority plus the VLAN ID."
  },
  {
    id: "na-066",
    domain: "Network Access",
    type: "dragdrop",
    question: "Match each 802.1D spanning-tree port state to its description.",
    items: ["Learning", "Blocking", "Listening", "Forwarding"],
    targets: [
      "Receives BPDUs but does not learn MAC addresses or forward frames",
      "Sends and receives BPDUs to determine the port role but does not learn MAC addresses",
      "Populates the MAC address table but still discards user data frames",
      "Sends and receives user data and learns source MAC addresses"
    ],
    answer: [1, 2, 0, 3],
    explanation: "A blocking port only listens to BPDUs to stay aware of the topology while discarding all data frames. Listening is the first transitional state, where the port participates in BPDU exchange to settle its role, but the MAC table is untouched. Learning then builds the MAC address table for 15 seconds before forwarding finally passes user traffic. Mixing up listening and learning is the classic error: learning is the state that fills the table, while listening only handles BPDUs."
  },
  {
    id: "na-067",
    domain: "Network Access",
    type: "single",
    question: "Refer to the exhibit. A user reports that a desk port went dead this morning after the facilities team rearranged some equipment. Based on the output, what happened and what must the administrator do to restore service?",
    exhibit: "SW1# show interfaces status err-disabled\nPort      Name               Status       Reason               Err-disabled Vlans\nGi0/7     DESK-PORT          err-disabled bpduguard\n\nSW1# show logging | include Gi0/7\n%SPANTREE-2-BLOCK_BPDUGUARD: Received BPDU on port Gi0/7 with BPDU Guard enabled. Disabling port.\n%PM-4-ERR_DISABLE: bpduguard error detected on Gi0/7, putting Gi0/7 in err-disable state",
    options: [
      "A device sending BPDUs was connected to the edge port; remove it, then issue shutdown and no shutdown on Gi0/7",
      "The port detected a unidirectional link; replace the cable and the port recovers automatically",
      "A superior BPDU arrived and root guard blocked the port; it recovers as soon as the BPDUs stop",
      "The PortFast feature failed; remove spanning-tree portfast from the interface to recover it"
    ],
    answer: [0],
    explanation: "BPDU guard err-disables an edge port the moment any BPDU arrives, which typically means a switch or bridging device was plugged into a port intended for end hosts. After removing the offending device, the administrator must bounce the port with shutdown and no shutdown, or rely on errdisable recovery if it is configured. Root guard behaves differently: it puts the port in a root-inconsistent state that self-recovers, and it never err-disables. Unidirectional link issues involve loop guard or UDLD, not the bpduguard reason code shown."
  },
  {
    id: "na-068",
    domain: "Network Access",
    type: "single",
    question: "An engineer must ensure that switches added by another department downstream of the distribution layer can never take over as the spanning-tree root. On which ports should root guard be applied?",
    options: [
      "On the distribution switch's designated ports facing the downstream department switches",
      "On the root ports of every downstream department switch",
      "On all access ports where end-user workstations connect",
      "On the uplinks of the current root bridge toward the distribution layer"
    ],
    answer: [0],
    explanation: "Root guard is applied on designated ports that face parts of the network that must never contain the root; if a superior BPDU arrives there, the port moves to root-inconsistent and stops forwarding until the superior BPDUs cease. Applying it on root ports would be self-defeating because those ports must accept superior BPDUs from the legitimate root. Access ports with workstations are better protected with PortFast and BPDU guard, since hosts should send no BPDUs at all. Configuring it on the root bridge's own uplinks does not control where downstream superior BPDUs can appear."
  },
  {
    id: "na-069",
    domain: "Network Access",
    type: "single",
    question: "Refer to the exhibit. What condition caused the log message on SW2?",
    exhibit: "SW2# show logging | include LOOPGUARD\n%SPANTREE-2-LOOPGUARD_BLOCK: Loop guard blocking port GigabitEthernet0/2 on VLAN0010.",
    options: [
      "Gi0/2 received a BPDU with a better bridge ID than the current root",
      "Gi0/2 stopped receiving BPDUs, likely due to a unidirectional link, and loop guard prevented it from transitioning to forwarding",
      "Gi0/2 received a BPDU while configured as a PortFast edge port",
      "Gi0/2 detected a duplex mismatch and was placed in err-disabled state"
    ],
    answer: [1],
    explanation: "Loop guard watches nondesignated ports that normally receive BPDUs; if those BPDUs suddenly stop, which often indicates a unidirectional fiber or transceiver fault, the port is placed in a loop-inconsistent blocking state instead of aging out the BPDU information and forwarding, which would create a loop. A superior BPDU would trigger root guard, not loop guard. A BPDU on a PortFast edge port triggers BPDU guard. Loop guard does not err-disable the port; it recovers automatically once BPDUs are received again."
  },
  {
    id: "na-070",
    domain: "Network Access",
    type: "multi",
    question: "Which two statements accurately describe how Rapid Spanning Tree (802.1w) improves on legacy 802.1D? (Choose two.)",
    options: [
      "RSTP merges the blocking and listening states into a single discarding state",
      "RSTP uses a proposal and agreement handshake on point-to-point links instead of waiting on timers",
      "RSTP eliminates the learning state so ports transition directly to forwarding",
      "In RSTP, only the root bridge generates BPDUs and other switches relay them",
      "RSTP requires PortFast on every port to achieve fast convergence"
    ],
    answer: [0, 1],
    explanation: "RSTP collapses the old disabled, blocking, and listening states into discarding, leaving just discarding, learning, and forwarding. On full-duplex point-to-point links it negotiates rapid transitions through an explicit proposal and agreement exchange, removing the dependence on forward-delay timers. The learning state still exists in RSTP, so ports do not jump straight to forwarding. Every RSTP switch originates its own BPDUs each hello interval rather than relaying the root's, and PortFast equivalents are only needed on edge ports, not everywhere."
  },
  {
    id: "na-071",
    domain: "Network Access",
    type: "single",
    question: "Refer to the exhibit. Why is GigabitEthernet0/2 on SW2 assigned the backup role?",
    exhibit: "SW2# show spanning-tree vlan 10\n<output omitted>\nInterface           Role Sts Cost      Prio.Nbr Type\n------------------- ---- --- --------- -------- ----\nGi0/1               Desg FWD 19        128.1    Shr\nGi0/2               Back BLK 19        128.2    Shr",
    options: [
      "It provides a redundant path to the root bridge through a neighboring switch",
      "It connects to the same shared segment as Gi0/1, for which SW2 is already the designated switch",
      "It received a BPDU with an inferior bridge ID and was demoted",
      "It is waiting for the proposal and agreement handshake to complete"
    ],
    answer: [1],
    explanation: "A backup port is a discarding port that receives the switch's own BPDUs because another local port, here Gi0/1, is the designated port on the very same shared segment, typically through a hub. It backs up the designated port for that segment, not the path toward the root; a redundant path to the root through a different switch would be an alternate port instead. The Shr link type confirms a half-duplex shared segment, which is the only topology where backup ports normally appear. Inferior BPDUs and pending handshakes do not produce the backup role."
  },
  {
    id: "na-072",
    domain: "Network Access",
    type: "dragdrop",
    question: "Match each Rapid PVST+ port role to its description.",
    items: ["Alternate port", "Root port", "Backup port", "Designated port"],
    targets: [
      "The single best port toward the root bridge on a nonroot switch",
      "The forwarding port on each segment responsible for sending BPDUs onto that segment",
      "A discarding port that offers a redundant path to the root through a different neighboring switch",
      "A discarding port that provides redundancy to a segment this switch already serves as designated"
    ],
    answer: [1, 3, 0, 2],
    explanation: "Each nonroot switch elects exactly one root port, the lowest-cost path toward the root, while every segment has one designated port that forwards and originates BPDUs onto it. An alternate port discards traffic but holds a backup path to the root learned from another switch's superior BPDUs, allowing rapid failover if the root port dies. A backup port also discards, but it backs up the local switch's own designated port on a shared segment, which is why it only appears with hubs or half-duplex links. Confusing alternate with backup is the most common mistake: alternate protects the root path, backup protects a segment."
  },
  {
    id: "na-073",
    domain: "Network Access",
    type: "single",
    question: "An engineer issues the command spanning-tree vlan 10 root primary on SW2 while another switch currently holds the root role with priority 20480. What does the command actually configure?",
    options: [
      "It sets SW2's VLAN 10 priority to a value 4096 lower than the current root, in this case 16384",
      "It always sets SW2's VLAN 10 priority to 24576 regardless of the current root",
      "It enables a dynamic process that keeps lowering SW2's priority whenever a better root appears",
      "It sets SW2's priority to 0 to guarantee it permanently remains the root bridge"
    ],
    answer: [0],
    explanation: "The root primary macro checks the current root's priority: it configures 24576 if the existing root is at 24576 or higher, but if the root is already below 24576 it sets the local priority 4096 less than the root's value, so here SW2 receives 16384. It is a one-time calculation, not a running process, so a switch later configured with a still lower priority can steal the root role. Priority 0 is only what an administrator might set manually; the macro never uses it, which is why root primary offers no permanent guarantee."
  },
  {
    id: "na-074",
    domain: "Network Access",
    type: "single",
    question: "SW2 and SW3 are both nonroot switches connected by a single link. SW2 has a root path cost of 4 and SW3 has a root path cost of 8. Which port becomes the designated port on the segment between them, and what happens to the other port?",
    options: [
      "SW2's port becomes designated because of its lower root path cost; SW3's port becomes an alternate discarding port",
      "SW3's port becomes designated because the switch farther from the root must forward; SW2's port blocks",
      "Both ports forward because each switch already has a root port elsewhere",
      "The port on the switch with the lower MAC address becomes designated regardless of cost"
    ],
    answer: [0],
    explanation: "On every segment, the designated port belongs to the switch that advertises the lowest cost to the root, so SW2 with cost 4 wins over SW3 with cost 8. SW3's end of the link can be neither root port nor designated, so RSTP assigns it the alternate role and keeps it discarding to break the potential loop. Both ports forwarding would create exactly the loop STP exists to prevent. Bridge ID, including MAC address, is only consulted as a tiebreaker when the advertised root path costs are equal."
  },
  {
    id: "na-075",
    domain: "Network Access",
    type: "multi",
    question: "Which two statements about Rapid PVST+ on Cisco Catalyst switches are true? (Choose two.)",
    options: [
      "A separate RSTP instance runs for each active VLAN",
      "Every switch generates its own BPDUs each hello interval, even if it is not the root",
      "All VLANs must share a single common root bridge",
      "Convergence after a link failure depends on the max-age and forward-delay timers expiring",
      "Rapid PVST+ BPDUs are identical in format to legacy 802.1D BPDUs"
    ],
    answer: [0, 1],
    explanation: "Rapid PVST+ is Cisco's per-VLAN implementation of 802.1w, so each VLAN runs an independent RSTP instance with its own root election, which enables per-VLAN load sharing rather than forcing one common root. Unlike 802.1D, where switches relay BPDUs originated by the root, every RSTP switch sources its own BPDUs each hello time, and a neighbor's silence is detected after just three missed hellos. Convergence relies on proposal and agreement handshakes rather than max-age and forward-delay expiry, and the BPDUs are version 2 frames that legacy 802.1D bridges do not generate."
  }
);
(window.QUESTION_BANK = window.QUESTION_BANK || []).push(
  {
    id: "na-076",
    domain: "Network Access",
    type: "single",
    question: "Refer to the exhibit. Which statement about GigabitEthernet0/2 on SW3 is true?",
    exhibit: "SW3# show spanning-tree vlan 10\n<output omitted>\nInterface           Role Sts Cost      Prio.Nbr Type\n------------------- ---- --- --------- -------- ----\nGi0/1               Root FWD 4         128.1    P2p\nGi0/2               Altn BLK 4         128.2    P2p",
    options: [
      "It is discarding traffic but can transition to the root port role almost immediately if Gi0/1 fails",
      "It will begin forwarding after the max-age, listening, and learning timers expire, about 50 seconds after a failure",
      "It is faulty and must be administratively recovered with shutdown and no shutdown",
      "It is sending superior BPDUs to force the neighboring switch to block its own port"
    ],
    answer: [0],
    explanation: "An alternate port stores the best BPDU it receives from another switch and serves as a precomputed backup path to the root. Because the topology runs RSTP (P2p link type), the switch can promote the alternate port to root port and move it to forwarding within a few seconds using the proposal and agreement mechanism, without waiting on legacy timers. The 50-second timer sequence applies to classic 802.1D, not Rapid PVST+. The port is healthy, and alternate ports receive superior BPDUs rather than send them."
  },
  {
    id: "na-077",
    domain: "Network Access",
    type: "single",
    question: "Refer to the exhibit. The network runs legacy 802.1D PVST+ with the timers shown. A blocked port on SW4 stops receiving BPDUs because of an indirect failure two switches away. Approximately how long before that port starts forwarding user traffic?",
    exhibit: "SW4# show spanning-tree vlan 10 | include Hello\n             Hello Time   2 sec  Max Age 20 sec  Forward Delay 15 sec",
    options: [
      "30 seconds",
      "35 seconds",
      "50 seconds",
      "20 seconds"
    ],
    answer: [2],
    explanation: "For an indirect failure, the blocked port must first age out the stored superior BPDU, which takes the full max-age of 20 seconds, then move through listening (15 seconds) and learning (15 seconds), for a total of about 50 seconds. The 30-second answer applies only to a directly connected failure, where the port detects loss of carrier and skips the max-age wait, going straight to listening and learning. Twenty seconds is just the max-age component, and 35 seconds incorrectly combines max-age with only one forward-delay period."
  },
  {
    id: "na-078",
    domain: "Network Access",
    type: "single",
    question: "Which set of values lists the default IEEE short-method spanning-tree path costs for 10 Mbps, 100 Mbps, 1 Gbps, and 10 Gbps links, in that order?",
    options: [
      "100, 19, 4, 2",
      "100, 10, 4, 1",
      "250, 19, 10, 2",
      "19, 4, 2, 1"
    ],
    answer: [0],
    explanation: "The classic short-method costs are 100 for 10 Mbps Ethernet, 19 for FastEthernet, 4 for gigabit, and 2 for 10 gigabit, and these are the values Catalyst switches use by default. The other sequences mix in plausible-looking but wrong numbers; for example, 10 was never the FastEthernet cost, and the last option shifts every value one speed class too fast. Knowing these defaults is essential for root-port math, such as recognizing that two gigabit hops (4 + 4 = 8) beat one FastEthernet hop (19)."
  },
  {
    id: "na-079",
    domain: "Network Access",
    type: "dragdrop",
    question: "Match each spanning-tree protection feature to its function.",
    items: ["Loop guard", "BPDU guard", "Root guard", "PortFast"],
    targets: [
      "Lets an edge port skip listening and learning so it forwards immediately",
      "Err-disables an edge port the moment any BPDU is received on it",
      "Blocks a designated port that receives a superior BPDU from a switch that must not become root",
      "Blocks a nondesignated port that unexpectedly stops receiving BPDUs"
    ],
    answer: [3, 1, 2, 0],
    explanation: "PortFast accelerates edge ports straight to forwarding, while BPDU guard backs it up by err-disabling the port if a BPDU ever arrives, stopping rogue switches at the access edge. Root guard polices designated ports facing parts of the network that must never win the root election, placing them in root-inconsistent state on receipt of a superior BPDU. Loop guard solves the opposite problem: it reacts to the absence of expected BPDUs, typically from a unidirectional link, by holding the port in loop-inconsistent state instead of letting it creep into forwarding."
  },
  {
    id: "na-080",
    domain: "Network Access",
    type: "single",
    question: "Refer to the exhibit. The current root bridge for VLAN 10 uses priority 28672. Given the error shown, which priority value should the engineer configure so that SW1 deterministically becomes the root?",
    exhibit: "SW1(config)# spanning-tree vlan 10 priority 28000\n% Bridge Priority must be in increments of 4096.\n% Allowed values are:\n  0     4096  8192  12288 16384 20480 24576 28672\n  32768 36864 40960 45056 49152 53248 57344 61440",
    options: [
      "24576",
      "28000, but entered with the spanning-tree vlan 10 root primary command instead",
      "28671",
      "32768"
    ],
    answer: [0],
    explanation: "Bridge priority occupies only the upper 4 bits of the priority field when the extended system ID is in use, so it must be a multiple of 4096; 24576 is the highest allowed value that is still lower than the current root's 28672. Values such as 28000 or 28671 are rejected outright because they are not on the 4096 boundary, and no alternative command makes them valid. Configuring 32768 would leave SW1 with a worse priority than the existing root, so it could never win the election."
  },
  {
    id: "na-081",
    domain: "Network Access",
    type: "multi",
    question: "When a switch must choose its root port, which three criteria are evaluated, in order, after the root bridge has been identified? (Choose three.)",
    options: [
      "Lowest cumulative path cost to the root bridge",
      "Lowest sender bridge ID in the received BPDUs",
      "Lowest sender port ID in the received BPDUs",
      "Lowest local MAC address on the candidate interface",
      "Highest interface bandwidth on the candidate interface"
    ],
    answer: [0, 1, 2],
    explanation: "Root port election proceeds through a strict sequence: lowest accumulated cost to the root, then lowest sender bridge ID, then lowest sender port ID (port priority followed by port number) when both candidate ports connect to the same neighbor. The local MAC address belongs to the bridge ID used in root elections, not to per-port root-port selection. Bandwidth is only an input to the cost calculation; once costs are computed, raw interface speed is never compared directly."
  },
  {
    id: "na-082",
    domain: "Network Access",
    type: "single",
    question: "A campus has two distribution switches, D1 and D2, and access switches with one uplink to each. With Rapid PVST+, how can the engineer make both uplinks carry traffic instead of leaving one fully idle?",
    options: [
      "Configure D1 as root primary for odd VLANs and D2 as root primary for even VLANs so each uplink forwards for different VLANs",
      "Increase the port cost on the idle uplink so spanning tree unblocks it for all VLANs",
      "Enable PortFast on both uplinks so neither is ever placed in the blocking state",
      "Configure the same bridge priority on D1 and D2 so the root role is shared equally"
    ],
    answer: [0],
    explanation: "Because Rapid PVST+ runs an independent spanning-tree instance per VLAN, the engineer can place the root for some VLANs on D1 and for the others on D2; each access switch then forwards toward a different uplink depending on the VLAN, using both links simultaneously. Raising the cost of the idle uplink makes it even less attractive and changes nothing for forwarding. PortFast is strictly for edge ports and would invite loops on inter-switch links. Identical priorities do not share the root role; the lower MAC address simply wins all VLANs, recreating the original problem."
  },
  {
    id: "na-083",
    domain: "Network Access",
    type: "single",
    question: "An RSTP edge port configured with spanning-tree portfast, but without BPDU guard, receives a BPDU. What happens?",
    options: [
      "The port immediately loses its edge status and becomes a normal spanning-tree port that can generate topology changes",
      "The port is placed in the err-disabled state until an administrator recovers it",
      "The port ignores the BPDU because edge ports do not process spanning-tree frames",
      "The port forwards the BPDU to all other ports in the same VLAN"
    ],
    answer: [0],
    explanation: "PortFast assumes the port leads to a host, so receiving a BPDU proves that assumption wrong; the port silently drops its edge status and behaves as a regular RSTP port, participating in role computation and triggering topology change handling. Err-disable only occurs when BPDU guard is also configured, which this scenario explicitly excludes. Edge ports still listen for BPDUs precisely so they can detect this situation, and switches never flood BPDUs as if they were data frames; BPDUs are consumed and regenerated per switch."
  },
  {
    id: "na-084",
    domain: "Network Access",
    type: "single",
    question: "Refer to the exhibit. The link between SW1 and SW2 is an inter-switch link running Rapid PVST+. What is the consequence of the link type shown, and how can it be corrected?",
    exhibit: "SW1# show spanning-tree interface gigabitEthernet 0/3\nVlan                Role Sts Cost      Prio.Nbr Type\n------------------- ---- --- --------- -------- ----\nVLAN0010            Desg FWD 19        128.3    Shr",
    options: [
      "The half-duplex link is treated as shared, so RSTP cannot use the proposal and agreement handshake; configuring full duplex restores rapid transitions",
      "The shared type indicates a trunk carrying multiple VLANs; converting the port to access mode restores rapid convergence",
      "The Shr flag means the port connects to a hub, and RSTP is automatically disabled; replace the hub with a switch",
      "The link type has no effect on convergence because RSTP always converges within one hello interval"
    ],
    answer: [0],
    explanation: "RSTP classifies a port's link type from its duplex: full duplex becomes point-to-point and half duplex becomes shared. On a shared link the proposal and agreement handshake is not attempted, so the port falls back to slower, timer-based transitions even though RSTP is running. Setting both ends to full duplex (or fixing whatever forced half duplex) restores P2p classification and rapid convergence. Trunking has nothing to do with the Shr flag, RSTP is not disabled by it, and convergence speed absolutely depends on this classification."
  },
  {
    id: "na-085",
    domain: "Network Access",
    type: "single",
    question: "Refer to the exhibit. A neighboring switch connected to SW1 suffers a sudden power failure and stops transmitting. Based on the output, what is the maximum time its entry remains in SW1's CDP neighbor table?",
    exhibit: "SW1# show cdp\nGlobal CDP information:\n        Sending CDP packets every 60 seconds\n        Sending a holdtime value of 180 seconds\n        Sending CDPv2 advertisements is  enabled",
    options: [
      "60 seconds after the failure",
      "180 seconds after the last advertisement was received",
      "240 seconds, the sum of the timer and the holdtime",
      "The entry is removed immediately when the interface goes down"
    ],
    answer: [1],
    explanation: "Each CDP advertisement carries a holdtime telling the receiver how long to retain the entry without hearing another update, so SW1 keeps the neighbor for up to 180 seconds after the last frame it received. The 60-second value is only the advertisement interval, not a retention timer. CDP does not add the two values together. Immediate removal happens only if SW1's own connected interface physically goes down; a remote device dying without dropping link state must age out via holdtime."
  },
  {
    id: "na-086",
    domain: "Network Access",
    type: "single",
    question: "Refer to the exhibit. A technician must trace the cable between SW1 and SW2. Which statement correctly describes the physical connection?",
    exhibit: "SW1# show cdp neighbors\nCapability Codes: R - Router, T - Trans Bridge, B - Source Route Bridge,\n                  S - Switch, H - Host, I - IGMP, r - Repeater, P - Phone\n\nDevice ID        Local Intrfce     Holdtme    Capability  Platform  Port ID\nSW2              Gig 0/3           155        S I         WS-C2960  Gig 0/2\nRT1              Gig 0/24          133        R S I       ISR4321   Gig 0/0/1",
    options: [
      "SW1's Gi0/3 connects to SW2's Gi0/2",
      "SW1's Gi0/2 connects to SW2's Gi0/3",
      "SW2's Gi0/3 connects to SW1's Gi0/2",
      "SW1's Gi0/3 connects to SW2's Gi0/3"
    ],
    answer: [0],
    explanation: "In show cdp neighbors output taken on SW1, the Local Intrfce column is SW1's own port and the Port ID column is the interface on the remote device, so SW1 Gi0/3 plugs into SW2 Gi0/2. Reversing the two columns is the classic misread and produces the second and third options. The interface numbers on the two ends have no reason to match, so assuming Gi0/3 connects to Gi0/3 is also wrong."
  },
  {
    id: "na-087",
    domain: "Network Access",
    type: "multi",
    question: "Which two statements correctly contrast LLDP with CDP on Cisco switches? (Choose two.)",
    options: [
      "LLDP is the IEEE 802.1AB standard and interoperates with non-Cisco devices, while CDP is Cisco proprietary",
      "LLDP transmission and reception can be disabled independently on an interface, while CDP is toggled as a whole per interface",
      "LLDP is enabled globally by default on Cisco switches, while CDP must be enabled manually",
      "LLDP advertisements are carried over UDP, while CDP runs directly over Ethernet",
      "CDP supports advertising the native VLAN, while LLDP has no comparable capability"
    ],
    answer: [0, 1],
    explanation: "LLDP is the vendor-neutral IEEE 802.1AB protocol, making it the choice in multivendor environments, whereas CDP only runs between Cisco devices. LLDP also offers finer interface control through the separate lldp transmit and lldp receive commands, while CDP on an interface is simply on or off with no cdp enable. The defaults are the reverse of the third option: CDP runs by default and LLDP requires lldp run. Both protocols operate directly at Layer 2 using multicast frames, not UDP, and LLDP TLVs can convey VLAN information as well."
  },
  {
    id: "na-088",
    domain: "Network Access",
    type: "single",
    question: "Refer to the exhibit. An engineer needs to discover non-Cisco devices attached to SW1 but receives the error shown. Which configuration resolves the problem?",
    exhibit: "SW1# show lldp neighbors\n% LLDP is not enabled",
    options: [
      "Enter lldp run in global configuration mode",
      "Enter lldp enable on each interface that connects to a non-Cisco device",
      "Enter cdp run in global configuration mode, because LLDP relies on the CDP process",
      "Enter lldp transmit on each interface, which also activates the global LLDP process"
    ],
    answer: [0],
    explanation: "Unlike CDP, LLDP is disabled by default on Cisco IOS switches and must be activated globally with lldp run before any neighbors can be learned. The per-interface commands are lldp transmit and lldp receive, which fine-tune direction once the global process exists, but they do not start LLDP by themselves, and lldp enable is not a valid IOS command. CDP and LLDP are completely independent protocols, so enabling CDP has no effect on LLDP operation."
  },
  {
    id: "na-089",
    domain: "Network Access",
    type: "single",
    question: "Refer to the exhibit. An engineer ran show cdp neighbors first, then collected the output shown. Which piece of information in this output is NOT available in the brief show cdp neighbors listing?",
    exhibit: "SW1# show cdp neighbors detail\n-------------------------\nDevice ID: SW2.example.local\nEntry address(es):\n  IP address: 10.1.99.2\nPlatform: cisco WS-C2960X-24TS-L,  Capabilities: Switch IGMP\nInterface: GigabitEthernet0/3,  Port ID (outgoing port): GigabitEthernet0/2\nHoldtime : 152 sec\n\nVersion :\nCisco IOS Software, C2960X Software (C2960X-UNIVERSALK9-M), Version 15.2(7)E\n\nNative VLAN: 99\nDuplex: full",
    options: [
      "The neighbor's device ID",
      "The neighbor's IP address",
      "The neighbor's platform",
      "The neighbor's outgoing port ID"
    ],
    answer: [1],
    explanation: "The brief show cdp neighbors table includes the device ID, local interface, holdtime, capabilities, platform, and remote port ID, but it never lists Layer 3 addresses. The management IP address, along with the IOS version, native VLAN, and duplex setting, appears only in show cdp neighbors detail or show cdp entry output. This distinction matters operationally because finding a neighbor's address to SSH into requires the detail form of the command."
  },
  {
    id: "na-090",
    domain: "Network Access",
    type: "single",
    question: "Refer to the exhibit. Security policy states that devices in the public lobby must not learn any topology information from the switch, but discovery protocols must keep running everywhere else, including on ports with Cisco IP phones. Which configuration meets the requirement?",
    exhibit: "SW1# show running-config interface gigabitEthernet 0/15\ninterface GigabitEthernet0/15\n description LOBBY-KIOSK\n switchport mode access\n switchport access vlan 50\n spanning-tree portfast",
    options: [
      "Configure no cdp enable and no lldp transmit on interface Gi0/15",
      "Configure no cdp run and no lldp run in global configuration mode",
      "Configure switchport nonegotiate on interface Gi0/15",
      "Configure cdp holdtime 10 in global configuration mode"
    ],
    answer: [0],
    explanation: "Disabling CDP and LLDP advertisements on just the lobby interface stops the switch from leaking its hostname, platform, IOS version, and addressing to untrusted devices while leaving discovery intact elsewhere. The global no cdp run and no lldp run commands would kill discovery on every port, breaking the requirement and disrupting IP phones that rely on CDP to learn the voice VLAN. The switchport nonegotiate command only suppresses DTP, which is unrelated to information disclosure, and shortening the CDP holdtime changes aging, not what is advertised."
  }
);
(window.QUESTION_BANK = window.QUESTION_BANK || []).push(
  {
    id: "na-091",
    domain: "Network Access",
    type: "multi",
    question: "Which two statements about autonomous access points are true? (Choose two.)",
    options: [
      "Each access point must be configured and managed individually through its own CLI or GUI",
      "An autonomous AP offering multiple SSIDs mapped to different VLANs requires an 802.1Q trunk uplink",
      "Autonomous APs must build a CAPWAP tunnel to a wireless LAN controller before serving clients",
      "Client data from an autonomous AP is always tunneled to a central controller for switching",
      "Autonomous APs cannot support more than one SSID at a time"
    ],
    answer: [0, 1],
    explanation: "An autonomous AP contains its entire management and data plane, so every unit is configured one by one, which is exactly why large deployments become operationally painful. When it bridges several SSIDs into separate wired VLANs, the switch port must be a trunk carrying those VLANs plus the management VLAN. CAPWAP and centralized tunneling describe the lightweight architecture, not autonomous operation, where traffic is switched locally onto the wired network. Autonomous APs happily support multiple SSIDs, each mapped to its own VLAN."
  },
  {
    id: "na-092",
    domain: "Network Access",
    type: "single",
    question: "In a split-MAC architecture, which function remains on the lightweight access point rather than moving to the wireless LAN controller?",
    options: [
      "Transmitting beacons and sending acknowledgments for received frames in real time",
      "Authenticating wireless clients against the configured security policy",
      "Assigning channels and transmit power across the RF environment",
      "Managing client roaming between access points"
    ],
    answer: [0],
    explanation: "Split-MAC divides 802.11 duties by latency: time-critical operations such as beacon generation, probe responses, frame acknowledgments, retransmissions, and frame encryption must occur at the radio and therefore stay on the AP. Client authentication, RF management functions like channel and power assignment, and roaming coordination are management-plane tasks centralized on the WLC. Choosing the controller-side functions is the common trap; the rule of thumb is that anything with hard real-time deadlines cannot tolerate the round trip to the controller."
  },
  {
    id: "na-093",
    domain: "Network Access",
    type: "multi",
    question: "In a lightweight wireless deployment using split-MAC, which two functions are performed by the wireless LAN controller? (Choose two.)",
    options: [
      "Processing client association requests and authentication",
      "Dynamically assigning channels and transmit power to access points",
      "Sending 802.11 acknowledgment frames to clients",
      "Transmitting beacon frames for each enabled WLAN",
      "Encrypting individual data frames over the air"
    ],
    answer: [0, 1],
    explanation: "The WLC owns the non-real-time management functions: it terminates association and authentication exchanges, enforces security policy, and runs radio resource management to assign channels and power levels across all joined APs. Acknowledgments, beacons, and over-the-air encryption have strict timing requirements measured in microseconds, so they must be executed by the AP hardware itself. Mixing up the two halves of split-MAC is the most common error on this topic; the controller never touches per-frame real-time radio operations."
  },
  {
    id: "na-094",
    domain: "Network Access",
    type: "single",
    question: "A company deploys cloud-managed access points similar to Cisco Meraki. Which statement accurately describes how this architecture handles traffic?",
    options: [
      "Management and monitoring occur through the cloud dashboard, but client data is switched locally onto the wired network",
      "All client data frames are tunneled across the Internet to the cloud platform before reaching their destination",
      "The APs build CAPWAP tunnels to a hardware controller located in the cloud provider's data center",
      "The cloud platform handles real-time functions such as acknowledgments while the AP handles management"
    ],
    answer: [0],
    explanation: "Cloud-based architectures move only the management plane to the cloud: configuration, monitoring, and reporting flow between the AP and the dashboard, while user data is bridged directly onto the local switch port exactly as with an autonomous AP. Hauling every client frame across the Internet would add unacceptable latency and bandwidth cost, so the data plane stays local. The APs do not form CAPWAP tunnels to a remote hardware WLC, and real-time radio functions could never survive a round trip to the cloud."
  },
  {
    id: "na-095",
    domain: "Network Access",
    type: "dragdrop",
    question: "Match each wireless access point architecture to its description.",
    items: ["Cloud-based AP", "Autonomous AP", "Embedded wireless controller", "Lightweight AP"],
    targets: [
      "Self-contained device configured individually, with all MAC functions performed onboard",
      "Tunnels traffic to a WLC with CAPWAP and operates using the split-MAC model",
      "Managed through an Internet dashboard while switching client data locally",
      "Controller function runs on an access point itself to manage a small site"
    ],
    answer: [1, 3, 0, 2],
    explanation: "An autonomous AP is a standalone device holding its full configuration and performing every 802.11 function locally. A lightweight AP divides duties with a WLC under the split-MAC model and reaches the controller through CAPWAP tunnels. Cloud-based APs such as Meraki are administered from a hosted dashboard but never tunnel user data to the cloud, keeping the data plane local. An embedded wireless controller (such as Cisco EWC or Mobility Express) runs controller software directly on an AP, letting a small branch enjoy controller features without dedicated hardware."
  },
  {
    id: "na-096",
    domain: "Network Access",
    type: "single",
    question: "A branch office has lightweight APs joined to a WLC at headquarters across a WAN link. Management wants wireless clients to keep working even if the WAN link fails. Which AP mode supports this requirement?",
    options: [
      "FlexConnect mode, which can authenticate and locally switch client traffic when the controller is unreachable",
      "Local mode, because it is the default and most resilient mode",
      "Monitor mode, which operates independently of the controller",
      "Bridge mode, which converts the AP into a standalone autonomous device"
    ],
    answer: [0],
    explanation: "FlexConnect (formerly H-REAP) allows an AP to switch client traffic onto the local wired network and continue serving existing and new clients in standalone fashion when its CAPWAP tunnel to the WLC goes down. Local mode tunnels all client traffic to the controller, so a WAN outage severs the data path entirely. Monitor mode never serves clients at all; it is dedicated to scanning. Bridge mode is for mesh backhaul links between APs, not for surviving controller loss at a branch."
  },
  {
    id: "na-097",
    domain: "Network Access",
    type: "single",
    question: "An engineer troubleshooting an 802.11 problem needs an AP to capture all wireless frames on a channel and stream them to a PC running Wireshark. Which AP mode accomplishes this?",
    options: [
      "Sniffer mode",
      "Monitor mode",
      "Rogue detector mode",
      "SE-Connect mode"
    ],
    answer: [0],
    explanation: "Sniffer mode dedicates the AP radio to capturing 802.11 frames on a specified channel and forwarding them to a remote host running analysis software such as Wireshark, making it the packet-capture tool of the AP modes. Monitor mode also stops serving clients but uses its scanning for IDS, rogue detection, and location services rather than exporting raw captures. Rogue detector mode works on the wired side, correlating MAC addresses to spot rogues, and SE-Connect streams spectrum-analysis data about RF energy, not decoded 802.11 frames."
  },
  {
    id: "na-098",
    domain: "Network Access",
    type: "dragdrop",
    question: "Match each lightweight AP mode to its function.",
    items: ["Rogue detector", "Local", "Sniffer", "Monitor", "FlexConnect"],
    targets: [
      "Default mode; serves clients while tunneling their traffic to the WLC",
      "Dedicates the radios to scanning channels for IDS and rogue APs without serving clients",
      "Captures 802.11 frames and forwards them to a remote protocol analyzer",
      "Listens on the wired network to correlate MAC addresses of suspected rogue devices",
      "Serves clients and can switch their traffic locally when the WLC is unreachable"
    ],
    answer: [1, 3, 2, 0, 4],
    explanation: "Local is the default mode in which the AP serves clients and sends their traffic through the CAPWAP data tunnel to the controller. Monitor mode gives up client service entirely to scan every channel for intrusion detection and rogue APs, while sniffer mode similarly stops serving clients but streams raw captures to an analyzer. Rogue detector mode is unique in working on the wired side, matching MAC addresses seen on the LAN against over-the-air reports. FlexConnect adds branch resiliency by locally switching designated WLANs even during a controller outage."
  },
  {
    id: "na-099",
    domain: "Network Access",
    type: "single",
    question: "A firewall sits between a remote site's lightweight APs and the centralized WLC. Which ports must be permitted for the APs to join the controller and pass client traffic?",
    options: [
      "UDP 5246 for CAPWAP control and UDP 5247 for CAPWAP data",
      "TCP 5246 for CAPWAP control and TCP 5247 for CAPWAP data",
      "UDP 5246 only, because control and data share one tunnel",
      "UDP 16666 for control and UDP 16667 for data"
    ],
    answer: [0],
    explanation: "CAPWAP runs over UDP with the controller listening on 5246 for the control channel and 5247 for the data channel, so both must be opened toward the WLC. CAPWAP never uses TCP, eliminating the second option. Control and data are distinct tunnels on distinct ports, so permitting only 5246 would let APs join but blackhole all client traffic. The 16666 range belongs to legacy inter-controller mobility messaging, not AP-to-controller CAPWAP."
  },
  {
    id: "na-100",
    domain: "Network Access",
    type: "multi",
    question: "Which two statements about the CAPWAP tunnels between a lightweight AP and a WLC are true? (Choose two.)",
    options: [
      "The control channel is authenticated and encrypted using DTLS",
      "Encryption of the data channel is optional and is disabled by default",
      "Both channels are carried inside a single IPsec tunnel",
      "The data channel is always encrypted while the control channel is sent in cleartext",
      "CAPWAP uses TCP to guarantee delivery of control messages"
    ],
    answer: [0, 1],
    explanation: "CAPWAP secures its control channel with DTLS, using certificates installed on the AP and controller to authenticate the relationship and encrypt management exchanges. The data channel, which carries encapsulated client frames over UDP 5247, can optionally be protected with DTLS but ships disabled by default for performance. CAPWAP does not ride inside IPsec, and the fourth option reverses the actual behavior of the two channels. All CAPWAP transport is UDP, with reliability handled at the application layer rather than by TCP."
  },
  {
    id: "na-101",
    domain: "Network Access",
    type: "single",
    question: "Refer to the exhibit. What is the purpose of the option 43 command in this DHCP pool configuration?",
    exhibit: "Router(config)# ip dhcp pool BRANCH-APS\nRouter(dhcp-config)# network 10.10.10.0 255.255.255.0\nRouter(dhcp-config)# default-router 10.10.10.1\nRouter(dhcp-config)# option 43 hex f104.0a0a.6305",
    options: [
      "It supplies lightweight APs with the management IP address of a WLC they can use for CAPWAP discovery",
      "It provides IP phones with the address of the TFTP server that stores their firmware",
      "It assigns the DNS server that APs use to resolve their hostnames",
      "It defines the lease duration for access points in this subnet"
    ],
    answer: [0],
    explanation: "DHCP option 43 (vendor-specific information) is one of the standard WLC discovery methods: the encoded hex string carries one or more controller management addresses, here 10.10.99.5, which the AP adds to its candidate list and probes with CAPWAP discovery requests. Telephony firmware servers are advertised with option 150, a frequent distractor. DNS servers come from the dns-server pool command, and lease timers from the lease command, so neither relates to option 43."
  },
  {
    id: "na-102",
    domain: "Network Access",
    type: "single",
    question: "Refer to the exhibit. A lightweight AP operating in local mode connects to this switch port. Which configuration change aligns the port with Cisco best practice?",
    exhibit: "SW1# show running-config interface gigabitEthernet 1/0/7\ninterface GigabitEthernet1/0/7\n description AP-LOCAL-MODE\n switchport mode trunk\n switchport trunk allowed vlan 10,20,30,99\n switchport trunk native vlan 99",
    options: [
      "Convert the port to an access port assigned to the AP management VLAN",
      "Add all client VLANs to the allowed list so wireless users can reach their subnets",
      "Change the native VLAN to VLAN 1 so untagged CAPWAP packets are accepted",
      "Enable PAgP so the AP can bundle its uplink with the trunk"
    ],
    answer: [0],
    explanation: "A local-mode AP encapsulates every client frame inside its CAPWAP data tunnel to the WLC, so the only traffic on the switch port is the AP's own tunnel traffic in one VLAN; an access port in the AP management VLAN is the recommended design. A trunk adds no value because the client VLANs exist at the controller's trunk, not at the AP's port, which is why adding more allowed VLANs misses the point. Native VLAN tweaks and EtherChannel protocols are irrelevant here; trunks are only appropriate for FlexConnect APs that locally switch multiple VLANs."
  },
  {
    id: "na-103",
    domain: "Network Access",
    type: "single",
    question: "Refer to the exhibit. A FlexConnect AP locally switches WLAN CORP to VLAN 10 and WLAN GUEST to VLAN 20. Clients on CORP work normally, but GUEST clients cannot obtain DHCP addresses. Based on the switch port configuration, what is the solution?",
    exhibit: "SW1# show running-config interface gigabitEthernet 1/0/8\ninterface GigabitEthernet1/0/8\n description FLEXCONNECT-AP\n switchport mode access\n switchport access vlan 10",
    options: [
      "Configure the port as an 802.1Q trunk allowing VLANs 10 and 20, with the AP management VLAN as native",
      "Change the access VLAN from 10 to 20 so the GUEST WLAN can reach its subnet",
      "Configure switchport voice vlan 20 so the second WLAN is carried alongside VLAN 10",
      "Enable DTP negotiation so the AP can form a trunk dynamically"
    ],
    answer: [0],
    explanation: "When a FlexConnect AP locally switches more than one WLAN-to-VLAN mapping, its uplink must be a trunk so each WLAN's traffic is tagged onto the correct VLAN; an access port can only deliver one VLAN, which is why CORP works and GUEST fails. Swapping the access VLAN to 20 would simply reverse the symptom. The voice VLAN feature is built around CDP and Cisco IP phones, not access points. APs do not run DTP, so dynamic negotiation cannot create the trunk; it must be configured statically."
  },
  {
    id: "na-104",
    domain: "Network Access",
    type: "multi",
    question: "An engineer connects a wireless LAN controller's distribution system ports to a switch using link aggregation (LAG). Which two statements about this connection are true? (Choose two.)",
    options: [
      "The switch-side EtherChannel must be configured with channel-group mode on",
      "The WLC does not participate in LACP or PAgP negotiation for the LAG",
      "The switch ports should run channel-group mode active so LACP can verify the bundle",
      "Each physical port in the LAG must carry a different set of VLANs",
      "LAG requires the switch ports to be configured as access ports in the management VLAN"
    ],
    answer: [0, 1],
    explanation: "An AireOS WLC's LAG implementation does not speak LACP or PAgP, so the connected switch must form an unconditional EtherChannel using mode on; any negotiating mode such as active or desirable would wait for protocol frames the controller never sends, leaving the ports suspended. The bundle behaves as one logical 802.1Q trunk, so every member link carries the same tagged VLAN set rather than splitting VLANs across ports. Access-port configuration is wrong because the trunk must carry the management VLAN and all dynamic-interface VLANs."
  },
  {
    id: "na-105",
    domain: "Network Access",
    type: "multi",
    question: "Which two statements about wireless LAN controller interfaces are true? (Choose two.)",
    options: [
      "The management interface is used for in-band administration and terminates CAPWAP tunnels from access points",
      "A dynamic interface maps a WLAN to a specific VLAN on the wired network",
      "The virtual interface must be assigned a routable address reachable from the wired LAN",
      "The service port carries client data when the distribution ports are congested",
      "The redundancy management interface is required before any WLAN can be created"
    ],
    answer: [0, 1],
    explanation: "The management interface is the controller's primary in-band address; APs discover and join the WLC there, and CAPWAP tunnels terminate on it. Dynamic interfaces act like VLAN interfaces for client traffic, linking each WLAN to its wired VLAN. The virtual interface intentionally uses a nonroutable placeholder address (such as 192.0.2.1) for DHCP relay and web-auth redirects, so requiring routability is backwards. The service port is strictly for out-of-band management and recovery and never carries client data, and redundancy interfaces relate to HA pairing, not WLAN creation."
  }
);
