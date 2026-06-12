(window.QUESTION_BANK = window.QUESTION_BANK || []).push(
  {
    id: "auto-001",
    domain: "Automation and Programmability",
    type: "single",
    question: "A network team replaces manual per-device CLI configuration of 300 switches with an automated provisioning system based on templates. Which outcome is the most direct result of this change?",
    options: [
      "Configurations become more consistent because human typing errors are removed from each deployment",
      "Network monitoring is no longer required because automated changes cannot fail",
      "Device CPU utilization increases significantly because each switch must run a local automation agent",
      "The control plane is removed from the switches and moved to the provisioning server"
    ],
    answer: [0],
    explanation: "Automation applies the same validated template to every device, eliminating the typos and skipped steps that occur when an engineer configures hundreds of devices by hand. Automation does not remove the need for monitoring; failed or unexpected changes must still be detected. Template-based provisioning does not require an agent on each device, and a provisioning tool only manages configuration; it does not relocate the control plane, which is what an SDN controller would do."
  },
  {
    id: "auto-002",
    domain: "Automation and Programmability",
    type: "multi",
    question: "Which two effects does network automation have on day-to-day network management? (Choose two.)",
    options: [
      "Configuration changes can be deployed across many devices quickly with consistent results",
      "Changes can be tested, versioned, and rolled back programmatically, which reduces the impact of human error",
      "Network downtime is eliminated because automated scripts cannot introduce misconfigurations",
      "Operating expenses always increase because automation tools require more staff to maintain"
    ],
    answer: [0, 1],
    explanation: "Automation provides speed and consistency: one validated change can be pushed to hundreds of devices, and because changes are stored as code they can be reviewed, version-controlled, and rolled back. Automation does not eliminate downtime; a flawed script can propagate an error to every device at once, which is why testing matters. Automation generally reduces operational effort over time rather than requiring more staff, even though there is an initial investment in tooling and skills."
  },
  {
    id: "auto-003",
    domain: "Automation and Programmability",
    type: "single",
    question: "An engineer manually adds a new VLAN and SVI to 200 branch routers over SSH during a weekend change window. Which problem is MOST likely to result from this manual approach?",
    options: [
      "Inconsistent configurations across devices caused by typing mistakes and skipped steps",
      "Routing protocol reconvergence on every device in the network at the same time",
      "Exhaustion of the available VTY lines on the management network",
      "Automatic rollback of the changes when the SSH sessions disconnect"
    ],
    answer: [0],
    explanation: "Repeating the same multi-line change 200 times by hand almost guarantees that some devices end up with typos, missing commands, or steps applied in the wrong order, producing configuration drift between supposedly identical sites. Adding a VLAN and SVI does not force network-wide reconvergence on unrelated devices. VTY lines are per-device, so serial SSH sessions to different routers do not exhaust them, and IOS does not automatically roll back committed configuration when a session ends."
  },
  {
    id: "auto-004",
    domain: "Automation and Programmability",
    type: "single",
    question: "Over several months, engineers make undocumented ad hoc changes to individual switches, so the running configurations gradually diverge from the approved standard template. Which term describes this condition?",
    options: [
      "Configuration drift",
      "Software image dispersion",
      "Control plane fragmentation",
      "Schema validation failure"
    ],
    answer: [0],
    explanation: "Configuration drift is the gradual, unplanned divergence of device configurations from the intended baseline, usually caused by manual one-off changes that are never reflected in the standard template. Software image dispersion would refer to inconsistent OS versions, not configuration content. Control plane fragmentation is not a standard term for this condition, and schema validation applies to structured data formats such as JSON or YANG, not to drifting CLI configurations."
  },
  {
    id: "auto-005",
    domain: "Automation and Programmability",
    type: "single",
    question: "In a traditional network that does not use an SDN controller, where does the control plane operate?",
    options: [
      "Distributed across the network, with each device independently computing its own forwarding decisions",
      "Centralized on a dedicated controller that programs the forwarding tables of every device",
      "On the network management station that collects SNMP data from the devices",
      "Only on the core routers, which download forwarding tables to the access layer"
    ],
    answer: [0],
    explanation: "In traditional networking the control plane is distributed: every router and switch runs its own protocols such as OSPF and STP and builds its own tables. A centralized controller programming forwarding tables describes SDN, not traditional operation. An SNMP management station monitors devices but does not compute forwarding decisions, and access switches build their own MAC and routing tables rather than downloading them from the core."
  },
  {
    id: "auto-006",
    domain: "Automation and Programmability",
    type: "single",
    question: "Which statement correctly describes how configuration is performed in a traditional campus network without a controller?",
    options: [
      "Each device is configured individually through interfaces such as the CLI or SNMP",
      "An operator expresses network-wide intent, and the configuration is generated automatically",
      "A controller pushes device configurations through a southbound API such as NETCONF",
      "Devices derive their configuration automatically from the overlay control protocol"
    ],
    answer: [0],
    explanation: "Traditional management is device-by-device: an engineer connects to each switch or router and applies configuration through the CLI, or in limited cases through SNMP. Expressing abstract intent that is translated into device configuration is the defining behavior of controller-based, intent-based systems such as Cisco Catalyst (DNA) Center. Southbound API pushes likewise require a controller, and overlay control protocols distribute reachability information, not device configuration."
  },
  {
    id: "auto-007",
    domain: "Automation and Programmability",
    type: "multi",
    question: "Which two advantages does controller-based networking provide compared with traditional per-device management? (Choose two.)",
    options: [
      "Network-wide policies can be defined once and applied consistently from a central point",
      "External applications can request network changes programmatically through a northbound API",
      "Forwarding decisions are no longer performed by the network devices themselves",
      "A single controller failure can never affect network operations"
    ],
    answer: [0, 1],
    explanation: "A controller gives a single point where policy is defined and then enforced consistently across all managed devices, and its northbound API lets scripts and applications automate the network programmatically. Devices still perform data plane forwarding in hardware even when the control logic is centralized, so the third option is wrong. Controller availability is actually a design concern, which is why controllers are deployed in redundant clusters; a single controller failure is not automatically harmless."
  },
  {
    id: "auto-008",
    domain: "Automation and Programmability",
    type: "dragdrop",
    question: "Drag each characteristic on the left to the description that matches it on the right.",
    items: [
      "Distributed control plane",
      "Per-device CLI changes",
      "Northbound API for applications",
      "Centralized policy definition"
    ],
    targets: [
      "The configuration method most commonly used in traditional networking",
      "How intent is expressed once and enforced everywhere in controller-based networking",
      "Where routing and forwarding decisions originate in traditional networking",
      "How external software integrates with a controller-based network"
    ],
    answer: [1, 3, 0, 2],
    explanation: "Traditional networks are configured device by device through the CLI, and each device runs its own distributed control plane to make independent forwarding decisions. Controller-based networks centralize policy definition so intent is declared once and pushed everywhere, and they expose a northbound API so external applications and scripts can drive the network programmatically. Keeping these pairs straight is essential for comparing the two operational models on the exam."
  },
  {
    id: "auto-009",
    domain: "Automation and Programmability",
    type: "single",
    question: "A network migrates to a controller-based architecture in which the control plane is centralized. Which function typically remains on each individual switch?",
    options: [
      "Forwarding traffic in the data plane based on the tables programmed by the controller",
      "Computing the network-wide topology and best paths",
      "Defining the security and segmentation policy for the campus",
      "Hosting the northbound REST API used by management applications"
    ],
    answer: [0],
    explanation: "Even with a centralized control plane, the data plane stays on the devices: each switch still forwards packets in hardware using the tables the controller programs into it. Topology computation and path selection are exactly what moves to the controller in this model. Policy definition is performed centrally on the controller, and the northbound API is exposed by the controller to applications, not by individual switches."
  },
  {
    id: "auto-010",
    domain: "Automation and Programmability",
    type: "single",
    question: "A company must deploy an identical security policy to 500 campus switches and ensure that any future policy update reaches every device the same day. Which approach best meets the requirement?",
    options: [
      "Use a controller that maintains the policy centrally and pushes it to all devices through southbound interfaces",
      "Open SSH sessions to each switch and paste the policy from a shared text document",
      "Enable SNMPv2c read-write access and modify the relevant MIB objects on each switch",
      "Configure each switch to download its startup configuration from a TFTP server at every reboot"
    ],
    answer: [0],
    explanation: "A controller stores the policy as central intent and uses its southbound interfaces to deploy and update it on every managed device quickly and consistently. Pasting configuration over 500 SSH sessions is slow and error-prone, which is the problem being solved. SNMPv2c writes are insecure and impractical for complex policy, and TFTP downloads at reboot only apply at restart, leaving devices out of date until they reload."
  },
  {
    id: "auto-011",
    domain: "Automation and Programmability",
    type: "single",
    question: "Which design consideration becomes MORE important when a network moves from autonomous devices to a controller-based architecture?",
    options: [
      "High availability of the controller, because it is now a critical component for network changes",
      "CPU sizing on each access switch, because every switch must run a heavyweight controller agent",
      "Avoiding controller software upgrades, because devices cannot forward traffic while the controller restarts",
      "Increasing the number of VTY lines on each device to support the controller's sessions"
    ],
    answer: [0],
    explanation: "Centralizing intelligence concentrates risk: if the controller is unavailable, the network can usually keep forwarding but cannot be modified or fully monitored, so controllers are deployed as redundant clusters. Controller-based solutions do not generally require heavyweight agents that strain access-switch CPUs. During a controller restart, devices continue forwarding with their existing programmed state, so the third option overstates the impact, and VTY line counts are not the meaningful scaling factor for controller communication."
  },
  {
    id: "auto-012",
    domain: "Automation and Programmability",
    type: "single",
    question: "Which function does a northbound API perform in a software-defined network architecture?",
    options: [
      "It allows applications and automation scripts to send requests to and receive data from the controller",
      "It allows the controller to program forwarding behavior on the network devices",
      "It allows network devices to exchange reachability information with each other",
      "It encapsulates end-user traffic between fabric edge nodes"
    ],
    answer: [0],
    explanation: "The northbound interface sits between the controller and the software above it, letting applications, orchestration tools, and scripts consume the controller's services, typically through REST. Programming the devices is the role of the southbound interface, which is the most tempting distractor because it is the mirror image. Device-to-device reachability exchange describes distributed routing protocols, and encapsulating user traffic between edge nodes describes the data plane overlay, such as VXLAN."
  },
  {
    id: "auto-013",
    domain: "Automation and Programmability",
    type: "single",
    question: "Which protocol is commonly used on the southbound interface between an SDN controller and the network devices it manages?",
    options: [
      "OpenFlow",
      "A REST API consumed by an inventory reporting application",
      "OSPF running between the distribution switches",
      "RADIUS between the devices and an authentication server"
    ],
    answer: [0],
    explanation: "OpenFlow is a classic southbound protocol that lets a controller program flow entries directly into device forwarding tables; NETCONF and RESTCONF are other common southbound options. A REST API used by a reporting application is a northbound interaction because the consumer is software above the controller, not a managed device. OSPF between switches is the traditional distributed control plane rather than a controller interface, and RADIUS handles AAA, not controller-to-device programming."
  },
  {
    id: "auto-014",
    domain: "Automation and Programmability",
    type: "single",
    question: "An automation script issues REST calls to an SDN controller to retrieve the current network topology and device inventory. Which interface is the script using?",
    options: [
      "The controller's northbound interface",
      "The controller's southbound interface",
      "The fabric data plane between edge nodes",
      "The console interface of each managed device"
    ],
    answer: [0],
    explanation: "Software that talks to the controller from above, such as automation scripts, dashboards, and orchestration platforms, uses the northbound interface, which on Cisco controllers is a REST API. The southbound interface points the other way, from the controller down to the managed devices. The data plane carries user traffic rather than API calls, and the script never touches device consoles because the controller already holds the inventory and topology data."
  },
  {
    id: "auto-015",
    domain: "Automation and Programmability",
    type: "multi",
    question: "Which two activities are functions of the control plane on a network device? (Choose two.)",
    options: [
      "Exchanging OSPF link-state advertisements with neighboring routers",
      "Processing STP BPDUs to compute a loop-free Layer 2 topology",
      "Forwarding frames based on entries in the MAC address table",
      "Rewriting packet headers to perform NAT translation"
    ],
    answer: [0, 1],
    explanation: "The control plane builds the information used to forward traffic: OSPF LSA exchange populates the routing table, and STP BPDU processing determines which ports forward or block. Actually switching frames with the MAC table is the data plane in action, even though the table itself was built by control plane learning. NAT header rewriting is also performed packet-by-packet in the data plane, even though the NAT rules were configured through the management plane."
  }
);
