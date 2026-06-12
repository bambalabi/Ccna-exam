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
