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
(window.QUESTION_BANK = window.QUESTION_BANK || []).push(
  {
    id: "auto-016",
    domain: "Automation and Programmability",
    type: "single",
    question: "Refer to the exhibit. Which statement about the JSON data returned by the controller is true?",
    exhibit: "{\n  \"device\": {\n    \"hostname\": \"SW1\",\n    \"uptime\": 86400,\n    \"isManaged\": true,\n    \"interfaces\": [\"Gig0/1\", \"Gig0/2\"],\n    \"location\": null\n  }\n}",
    options: [
      "The value of isManaged is a Boolean",
      "The value of uptime is a string because all JSON values are text",
      "The value of interfaces is an object containing two keys",
      "The value of location is the four-character string null"
    ],
    answer: [0],
    explanation: "The unquoted literal true is one of the two JSON Boolean values, so isManaged is a Boolean. The value 86400 has no quotation marks, which makes it a number, not a string. The interfaces value is enclosed in square brackets, which denotes an array of two strings rather than an object, because objects use curly braces with key-value pairs. Finally, the unquoted literal null is the JSON null type; it would be a string only if it were written in double quotes."
  },
  {
    id: "auto-017",
    domain: "Automation and Programmability",
    type: "single",
    question: "Refer to the exhibit. A Python script fails to parse this JSON payload received from an automation tool. What causes the parser to reject the data?",
    exhibit: "{\n  \"hostname\": \"R1\",\n  \"interfaces\": [\"Gig0/0\", \"Gig0/1\"],\n}",
    options: [
      "A trailing comma follows the last key-value pair in the object",
      "Array elements cannot be strings and must be numbers",
      "The key hostname must be written without quotation marks",
      "Square brackets are not a valid structure inside a JSON object"
    ],
    answer: [0],
    explanation: "Strict JSON does not permit a comma after the final member of an object or the final element of an array, so the comma after the closing bracket of the interfaces array causes a parse error. Arrays may contain strings, numbers, Booleans, nulls, objects, or other arrays, so string elements are perfectly valid. JSON keys must always be enclosed in double quotes, so removing the quotes from hostname would create a second error rather than fix one, and arrays in square brackets are legal values inside objects."
  },
  {
    id: "auto-018",
    domain: "Automation and Programmability",
    type: "single",
    question: "Refer to the exhibit. A script parses this REST API response into a variable named data. Which value does data[\"response\"][\"devices\"][1][\"mgmtIp\"] return?",
    exhibit: "{\n  \"response\": {\n    \"devices\": [\n      { \"hostname\": \"SW1\", \"mgmtIp\": \"10.1.1.10\" },\n      { \"hostname\": \"SW2\", \"mgmtIp\": \"10.1.1.20\" }\n    ]\n  }\n}",
    options: [
      "10.1.1.20",
      "10.1.1.10",
      "SW2",
      "An error, because an array cannot be indexed with a number"
    ],
    answer: [0],
    explanation: "Array indexing starts at zero, so index 1 selects the second object in the devices array, which describes SW2, and its mgmtIp key holds the string 10.1.1.20. Choosing 10.1.1.10 reflects the common mistake of treating index 1 as the first element. SW2 is the value of the hostname key of that same object, not the mgmtIp key. Indexing an array with an integer is exactly how array elements are retrieved, so no error occurs."
  },
  {
    id: "auto-019",
    domain: "Automation and Programmability",
    type: "multi",
    question: "Refer to the exhibit. An engineer pastes this text into a JSON validator and it reports errors. Which two problems must be corrected to make the data valid JSON? (Choose two.)",
    exhibit: "{\n  'vlan': 10,\n  name: \"USERS\",\n  \"shutdown\": false\n}",
    options: [
      "The key vlan is enclosed in single quotes instead of double quotes",
      "The key name is not enclosed in quotation marks at all",
      "The value false must be enclosed in quotation marks",
      "The value 10 must be enclosed in quotation marks"
    ],
    answer: [0, 1],
    explanation: "JSON requires every key to be a string delimited by double quotes, so 'vlan' in single quotes and the completely unquoted key name are both syntax errors. The literal false is a valid JSON Boolean exactly as written; wrapping it in quotes would change it into a string and alter its meaning. Likewise, 10 is a valid JSON number, and numbers are written without quotation marks unless the designer intends them to be strings."
  },
  {
    id: "auto-020",
    domain: "Automation and Programmability",
    type: "single",
    question: "An automation script must add a brand-new VLAN object to a controller through its REST API, and the controller assigns the unique identifier of the new object in its response. Which HTTP method should the script use?",
    options: [
      "POST",
      "GET",
      "PUT",
      "HEAD"
    ],
    answer: [0],
    explanation: "POST is the standard verb for creating a new resource when the server allocates the identifier and location of the object, which is why the controller answers with the new ID. GET only retrieves data and never changes server state. PUT is normally used to create or fully replace a resource at a URI that the client already specifies, so it does not fit a workflow where the server assigns the identifier. HEAD returns only response headers and cannot create anything."
  },
  {
    id: "auto-021",
    domain: "Automation and Programmability",
    type: "single",
    question: "Refer to the exhibit. A script sends a POST request to a controller and receives this response. What does the response indicate?",
    exhibit: "HTTP/1.1 201 Created\nLocation: /api/v1/vlans/87\nContent-Type: application/json\n\n{ \"id\": 87, \"name\": \"GUEST\", \"vlanId\": 30 }",
    options: [
      "The request succeeded and a new resource now exists at /api/v1/vlans/87",
      "The request succeeded but the server returned only cached data",
      "The request was accepted and queued, but processing has not finished yet",
      "The request failed because the client must first authenticate"
    ],
    answer: [0],
    explanation: "Status code 201 specifically means that the request succeeded and a new resource was created, and the Location header tells the client the URI of that new object. A plain success that returns existing data would normally be 200 OK, and cached responses involve codes such as 304. A request that is accepted for later asynchronous processing returns 202 Accepted, not 201. Authentication failures produce 401, which is in the 4xx client-error class rather than the 2xx success class."
  },
  {
    id: "auto-022",
    domain: "Automation and Programmability",
    type: "single",
    question: "Refer to the exhibit. A script authenticates to a controller, receives a valid token, and then makes the request shown, which fails. What does the 403 response mean?",
    exhibit: "DELETE /api/v1/network-device/3f2a HTTP/1.1\nHost: controller.example.com\nAuthorization: Bearer eyJhbGciOiJIUzI1NiJ9.ok\n\nHTTP/1.1 403 Forbidden\n\n{ \"error\": \"insufficient privileges for this operation\" }",
    options: [
      "The credentials were accepted, but the account is not authorized to perform this operation",
      "The token is missing or expired, so the client must authenticate again",
      "The resource 3f2a does not exist in the controller inventory",
      "The controller encountered an internal failure while deleting the device"
    ],
    answer: [0],
    explanation: "A 403 Forbidden response means the server understood who the client is but refuses the action because the authenticated identity lacks permission, which matches the insufficient-privileges message. A missing or expired token would instead trigger 401 Unauthorized, prompting re-authentication. A nonexistent resource returns 404 Not Found, and an internal controller failure returns a 5xx code such as 500. Distinguishing 401 from 403 is exactly the difference between failed authentication and failed authorization."
  },
  {
    id: "auto-023",
    domain: "Automation and Programmability",
    type: "single",
    question: "A monitoring script issues GET https://controller.local/api/v1/templates/site-99 and receives status code 404. What is the most likely cause?",
    options: [
      "No resource exists at the requested URI path on the server",
      "The request omitted valid authentication credentials",
      "The server crashed while processing an otherwise valid request",
      "The request syntax was malformed and could not be parsed"
    ],
    answer: [0],
    explanation: "Status 404 Not Found means the server is reachable and processed the request but has no resource matching the URI, for example because the template ID site-99 was deleted or mistyped. Missing or invalid credentials produce 401 Unauthorized. A server-side crash or unhandled exception is reported with a 5xx code such as 500 Internal Server Error. A request that the server cannot parse because of bad syntax returns 400 Bad Request rather than 404."
  },
  {
    id: "auto-024",
    domain: "Automation and Programmability",
    type: "single",
    question: "A provisioning script replaces the entire configuration of an existing interface resource through a REST API. The network is unreliable, so the script may transmit the identical request several times. Which HTTP method keeps the result the same no matter how many times the request is repeated?",
    options: [
      "PUT",
      "POST",
      "CONNECT",
      "TRACE"
    ],
    answer: [0],
    explanation: "PUT is idempotent: it replaces the resource at a known URI with the supplied representation, so sending the same PUT five times leaves the resource in exactly the same final state as sending it once. POST is not idempotent, because each repeated POST can create an additional resource or apply the action again. CONNECT establishes tunnels through proxies and TRACE echoes requests for diagnostics; neither is used to modify resource representations on a controller."
  },
  {
    id: "auto-025",
    domain: "Automation and Programmability",
    type: "single",
    question: "Refer to the exhibit. Which statement correctly identifies a component of this REST API request URI?",
    exhibit: "https://dnac.example.com/dna/intent/api/v1/network-device?managementIpAddress=10.10.20.81",
    options: [
      "managementIpAddress=10.10.20.81 is a query parameter that filters which results the API returns",
      "managementIpAddress=10.10.20.81 is an HTTP header that authenticates the request",
      "/dna/intent/api/v1/network-device is the query string portion of the URI",
      "dnac.example.com identifies the resource being requested rather than the server"
    ],
    answer: [0],
    explanation: "Everything after the question mark is the query string, and managementIpAddress=10.10.20.81 is a key-value query parameter that narrows the result set to the device with that management address. Headers are sent separately in the HTTP message, not embedded in the URI, so the parameter is not a header. The segment /dna/intent/api/v1/network-device is the resource path, not the query string. The hostname dnac.example.com identifies the server (the authority portion), while the path identifies the resource on that server."
  },
  {
    id: "auto-026",
    domain: "Automation and Programmability",
    type: "single",
    question: "Refer to the exhibit. Which authentication mechanism is this REST API request using?",
    exhibit: "GET /dna/intent/api/v1/interface HTTP/1.1\nHost: dnac.example.com\nAuthorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.x7Hk2...",
    options: [
      "A bearer token obtained earlier, presented in the Authorization header",
      "HTTP basic authentication with a base64-encoded username and password",
      "A static API key carried in a custom X-API-Key header",
      "Client certificate authentication negotiated inside the TLS handshake"
    ],
    answer: [0],
    explanation: "The Authorization header begins with the keyword Bearer followed by a token, which the client obtained from an earlier authentication exchange and now presents to prove its identity on each call. Basic authentication would instead use the keyword Basic followed by base64-encoded username:password. An API key scheme would place the key in a vendor-defined header such as X-API-Key rather than the standard Authorization Bearer format. Certificate authentication happens during TLS session setup and would not appear as an Authorization header at all."
  },
  {
    id: "auto-027",
    domain: "Automation and Programmability",
    type: "single",
    question: "How does HTTP basic authentication transmit a client's credentials to a REST API server?",
    options: [
      "The username and password are joined with a colon, base64 encoded, and sent in the Authorization header of each request",
      "The password is irreversibly hashed with SHA-256 so the server can never recover it",
      "The credentials are exchanged once for a token, and only the token appears in later requests",
      "The username and password are encrypted with the server's public key before transmission"
    ],
    answer: [0],
    explanation: "Basic authentication simply concatenates username:password, encodes the result with base64, and places it in the Authorization header on every request, which is why it must be protected by HTTPS, since base64 is trivially reversible encoding rather than encryption. No hashing or public-key encryption of the credentials is performed by the scheme itself. Exchanging credentials once for a reusable token describes token or bearer authentication, which exists precisely to avoid resending the password on every call."
  },
  {
    id: "auto-028",
    domain: "Automation and Programmability",
    type: "multi",
    question: "Which two statements describe characteristics of REST-based APIs? (Choose two.)",
    options: [
      "They use standard HTTP methods such as GET, POST, PUT, and DELETE to operate on resources",
      "Resources are identified by URIs, and their representations are commonly exchanged as JSON",
      "The server must maintain a dedicated session for each client between API calls",
      "They can encode payload data only in XML format"
    ],
    answer: [0, 1],
    explanation: "REST maps create, read, update, and delete operations onto the standard HTTP verbs, and each resource is addressed by a URI with its state typically serialized as JSON, although XML and other formats are also possible. REST is deliberately stateless, meaning every request carries all the information the server needs, so the server keeps no per-client session between calls, which makes the third option wrong. The last option is wrong both because XML is not required and because JSON is in fact the dominant payload format on Cisco controllers."
  },
  {
    id: "auto-029",
    domain: "Automation and Programmability",
    type: "multi",
    question: "Which three elements are typically included in a REST API request sent to a network controller? (Choose three.)",
    options: [
      "An HTTP method such as GET or POST",
      "A URI that identifies the target resource",
      "Headers, such as an Authorization header carrying a token",
      "A TFTP transfer of the device startup configuration",
      "An SNMP community string for read-write access"
    ],
    answer: [0, 1, 2],
    explanation: "A REST call is an HTTP message, so it always specifies a method that defines the action, a URI that identifies the resource, and headers that carry metadata such as credentials and content type; many requests also include a JSON body. TFTP is a separate file transfer protocol used for tasks like image copies and has no role inside an HTTP request. SNMP community strings belong to the SNMP management protocol, which is an alternative to REST APIs rather than a component of them."
  },
  {
    id: "auto-030",
    domain: "Automation and Programmability",
    type: "dragdrop",
    question: "Drag each HTTP method on the left to the CRUD action it performs on the right.",
    items: ["GET", "DELETE", "POST", "PUT"],
    targets: [
      "Create a new resource whose identifier the server assigns",
      "Retrieve a resource without modifying it",
      "Replace an existing resource and remain idempotent on retries",
      "Remove a resource from the server"
    ],
    answer: [2, 0, 3, 1],
    explanation: "POST creates new resources and is not idempotent, which is why the server typically assigns the new identifier and returns 201. GET is the safe, read-only retrieval method that never changes server state. PUT replaces the full representation of a resource at a known URI and is idempotent, so repeating it produces the same final state. DELETE removes the addressed resource, completing the classic create, read, update, and delete mapping onto HTTP verbs."
  }
);
(window.QUESTION_BANK = window.QUESTION_BANK || []).push(
  {
    id: "auto-031",
    domain: "Automation and Programmability",
    type: "dragdrop",
    question: "Drag each HTTP status code on the left to the condition it reports on the right.",
    items: ["401 Unauthorized", "500 Internal Server Error", "201 Created", "404 Not Found", "403 Forbidden"],
    targets: [
      "No resource exists at the requested URI",
      "A new resource was successfully created by the request",
      "The request lacks valid authentication credentials",
      "The server failed internally while processing the request",
      "The authenticated user lacks permission for the operation"
    ],
    answer: [3, 2, 0, 1, 4],
    explanation: "404 reports that the URI does not map to any resource, while 201 confirms successful creation, usually with a Location header pointing at the new object. 401 means authentication is missing or invalid, so the client must supply credentials, whereas 403 means the server knows who the client is but still denies the action for lack of authorization. 500 belongs to the 5xx server-error class and indicates the fault lies with the server rather than with the request."
  },
  {
    id: "auto-032",
    domain: "Automation and Programmability",
    type: "single",
    question: "Which capability of Cisco Catalyst Center (formerly DNA Center) most clearly distinguishes intent-based management from traditional element-by-element device management?",
    options: [
      "An operator expresses a business-level policy once, and the controller translates it into device configurations across the network",
      "An operator opens an SSH session to each switch and pastes a configuration template",
      "Devices are configured individually, and the controller later audits them with SNMP polling",
      "Configuration changes are written to a TFTP server that devices fetch at every reboot"
    ],
    answer: [0],
    explanation: "Intent-based networking lets the administrator state the desired outcome, such as an access policy or QoS treatment, and the controller computes and pushes the corresponding device-level configuration everywhere it applies. Pasting templates over SSH and configuring devices one at a time with after-the-fact SNMP audits are exactly the traditional per-device workflows that intent-based management replaces. Distributing configurations from a TFTP server at boot is a legacy technique and involves no translation of intent into policy."
  },
  {
    id: "auto-033",
    domain: "Automation and Programmability",
    type: "single",
    question: "A developer wants to write an external application that retrieves the device inventory from Cisco Catalyst Center. Which interface should the application use?",
    options: [
      "The intent REST API, sending HTTPS requests and parsing JSON responses",
      "An OpenFlow session to port 6653 of the controller",
      "An SSH connection to the CLI of each managed switch",
      "An SNMPv2c GET request directly to the controller MIB"
    ],
    answer: [0],
    explanation: "Catalyst Center exposes its northbound intent API as a REST interface over HTTPS, and applications authenticate, request resources such as /dna/intent/api/v1/network-device, and parse the JSON that is returned. OpenFlow is a southbound protocol for programming forwarding behavior in certain SDN designs, not a way for applications to query Catalyst Center. Connecting by SSH to individual switches bypasses the controller and defeats the purpose of centralized inventory, and the controller is not managed through SNMP MIB queries for this task."
  },
  {
    id: "auto-034",
    domain: "Automation and Programmability",
    type: "multi",
    question: "Which two statements describe how managing a campus with Cisco Catalyst Center differs from managing it with per-device CLI sessions? (Choose two.)",
    options: [
      "Configuration and software image compliance can be monitored and enforced centrally for the entire site",
      "Assurance features correlate telemetry from many devices to surface network-wide health issues",
      "Routing protocols are no longer needed because the controller forwards all packets itself",
      "Devices lose their local configuration files and become stateless forwarders"
    ],
    answer: [0, 1],
    explanation: "A controller maintains a central view, so it can verify that every device runs the approved configuration and software image and remediate drift, and its assurance function correlates telemetry across the whole network to identify problems no single device can see. The controller does not sit in the data path, so routers and switches still run routing protocols and forward their own traffic. Managed devices also retain their local configurations; the controller generates and audits those configurations rather than eliminating them."
  },
  {
    id: "auto-035",
    domain: "Automation and Programmability",
    type: "single",
    question: "In a controller-based fabric such as Cisco SD-Access, which statement describes the overlay?",
    options: [
      "A logical layer of virtual tunnels, such as VXLAN, built on top of the physical network to carry user traffic and policy",
      "The collection of physical routed links and the IGP that connects the switches",
      "The management VLAN used to reach device loopback addresses",
      "The out-of-band network that connects console ports to a terminal server"
    ],
    answer: [0],
    explanation: "The overlay is the virtual topology of tunnels, VXLAN in SD-Access, that rides on top of the physical infrastructure and carries endpoint traffic along with policy information such as group tags. The physical routed links and IGP form the underlay, whose only job is to provide IP reachability between tunnel endpoints. A management VLAN and an out-of-band console network are administrative access methods and are not part of the fabric data-plane abstraction at all."
  },
  {
    id: "auto-036",
    domain: "Automation and Programmability",
    type: "single",
    question: "Which definition best describes the term fabric as used in software-defined access networking?",
    options: [
      "The combination of the physical underlay and the logical overlay, operating together as a single programmable network",
      "Only the physical cabling and switches that connect the wiring closets",
      "The redundant supervisor modules inside a single modular chassis",
      "The set of REST API endpoints published by the controller"
    ],
    answer: [0],
    explanation: "A fabric is the complete system formed when the logical overlay of tunnels runs across the physical underlay, with the controller managing both as one programmable whole. The physical plant alone is just the underlay, so the second option captures only half of the concept. Switch fabric between supervisor modules inside one chassis is an unrelated use of the word fabric at the hardware level, and the REST endpoints are the controller's northbound interface, not the network fabric itself."
  },
  {
    id: "auto-037",
    domain: "Automation and Programmability",
    type: "single",
    question: "Why is Ansible described as an agentless configuration management tool?",
    options: [
      "It connects to devices over existing protocols such as SSH and requires no special software installed on the managed device",
      "It runs entirely on the managed device, so no management server is needed",
      "Managed devices periodically pull their configuration from a central master daemon",
      "It uses a compiled binary agent that is injected into device memory only during execution"
    ],
    answer: [0],
    explanation: "Ansible pushes changes from a control node over protocols the devices already support, such as SSH or device APIs, so nothing extra has to be installed or maintained on routers and switches, which is ideal for network gear that cannot host agents. The control node, not the managed device, runs Ansible itself. A pull model in which nodes contact a central master describes agent-based tools like the classic Puppet architecture, and Ansible injects no resident binary into devices."
  },
  {
    id: "auto-038",
    domain: "Automation and Programmability",
    type: "single",
    question: "Refer to the exhibit. Which statement about this automation artifact is true?",
    exhibit: "---\n- name: Configure NTP on branch routers\n  hosts: routers\n  gather_facts: no\n  tasks:\n    - name: Set NTP server\n      cisco.ios.ios_config:\n        lines:\n          - ntp server 10.0.0.1",
    options: [
      "It is an Ansible playbook written in YAML that pushes the change to the hosts in the routers group",
      "It is a Terraform configuration written in HCL that is applied with terraform apply",
      "It is a JSON document because it begins with three dashes",
      "It is a Puppet manifest that devices pull from a master server"
    ],
    answer: [0],
    explanation: "The structure of indented key-value pairs and lists, the optional document-start marker of three dashes, and keywords such as hosts and tasks identify this as a YAML Ansible playbook, which the control node pushes to the inventory group named routers. Terraform uses HCL blocks with resource declarations and braces, which look nothing like this. JSON delimits objects with curly braces and never starts with dashes. Puppet manifests use their own Ruby-like declarative syntax and a pull-based agent model."
  },
  {
    id: "auto-039",
    domain: "Automation and Programmability",
    type: "single",
    question: "What is the purpose of the state file that Terraform maintains?",
    options: [
      "It records the mapping between the declared resources and the real infrastructure so Terraform can compute what must change",
      "It stores an encrypted archive of device passwords for use during provisioning",
      "It is a transcript of every CLI command Terraform sent to each device",
      "It caches downloaded provider plugins to speed up later runs"
    ],
    answer: [0],
    explanation: "Terraform compares the desired state declared in configuration files with the recorded state of what it previously built; the state file holds that record, letting terraform plan show exactly which resources to add, change, or destroy. It is not a credential vault, and secrets in state are actually a handling concern rather than a feature. Terraform is declarative and works through provider APIs, so it keeps no CLI transcript, and provider plugins are cached in a separate directory, not in the state file."
  },
  {
    id: "auto-040",
    domain: "Automation and Programmability",
    type: "single",
    question: "A team is comparing Terraform with Ansible for infrastructure provisioning. Which characteristic is specific to Terraform?",
    options: [
      "It uses declarative HCL files and a state file to converge infrastructure on the described end state",
      "It executes ordered task lists from YAML playbooks pushed over SSH",
      "It requires an agent to be installed on every managed network device",
      "It can only read information from devices and cannot create resources"
    ],
    answer: [0],
    explanation: "Terraform's model is declarative: the engineer writes the desired end state in HashiCorp Configuration Language, and the tool consults its state file to determine and apply only the necessary changes. Ordered YAML task lists pushed over SSH describe Ansible playbooks, not Terraform. Neither tool installs agents on managed devices, so the agent requirement is false for both. Terraform absolutely creates, modifies, and destroys resources, which is its primary purpose, so the read-only description is wrong."
  },
  {
    id: "auto-041",
    domain: "Automation and Programmability",
    type: "multi",
    question: "Which two characteristics describe Ansible? (Choose two.)",
    options: [
      "It uses a push model in which the control node initiates changes toward the managed devices",
      "Its playbooks are written in YAML",
      "Managed nodes must run a persistent agent that polls a central master",
      "Its configuration language is HCL, the same language used by Terraform"
    ],
    answer: [0, 1],
    explanation: "Ansible operates on a push model: an engineer or scheduler runs a playbook on the control node, which connects out to the managed devices and applies the tasks. Those playbooks are YAML documents describing plays and tasks. Ansible is agentless, so no resident agent polls a master; that pull-with-agent design belongs to tools like classic Puppet and Chef. HCL is the language of Terraform, while Ansible relies on YAML with Jinja2 templating rather than HCL."
  },
  {
    id: "auto-042",
    domain: "Automation and Programmability",
    type: "single",
    question: "Which task in network operations is an example of using generative AI rather than predictive AI?",
    options: [
      "Producing a draft ACL configuration from an engineer's natural-language description of the required policy",
      "Forecasting next week's WAN link utilization from six months of interface counters",
      "Flagging an access point whose client onboarding times deviate from the learned baseline",
      "Estimating the probability that a power supply will fail within 30 days"
    ],
    answer: [0],
    explanation: "Generative AI creates new content, so turning a plain-language policy request into draft configuration text is a generative use case. Forecasting future link utilization, detecting deviation from a learned performance baseline, and estimating failure probability are all examples of predictive AI, which analyzes historical telemetry to anticipate or detect conditions rather than to author new artifacts. The distinction between creating content and predicting outcomes is exactly what separates the two AI categories on the current exam."
  },
  {
    id: "auto-043",
    domain: "Automation and Programmability",
    type: "single",
    question: "A network assurance platform learns the normal range of wireless client onboarding times at each site and raises an alert when a site drifts outside that range, before users open tickets. Which technology does this describe?",
    options: [
      "Predictive AI applied to network operations telemetry",
      "Generative AI composing incident summaries",
      "A southbound API programming the data plane",
      "Static threshold-based SNMP trap monitoring"
    ],
    answer: [0],
    explanation: "Learning a dynamic baseline from historical telemetry and anticipating or detecting anomalies before they affect users is predictive AI, the analytics style used by assurance platforms such as Catalyst Center. Generative AI would produce new content such as written summaries or configurations, which is not what baselining does. A southbound API is a controller-to-device programming channel, unrelated to analytics. Static SNMP thresholds are fixed values set by humans, whereas the scenario describes thresholds learned and adjusted by the system itself."
  },
  {
    id: "auto-044",
    domain: "Automation and Programmability",
    type: "multi",
    question: "Which two statements correctly distinguish generative AI from predictive AI in network operations? (Choose two.)",
    options: [
      "Generative AI produces new artifacts such as configuration snippets or troubleshooting summaries",
      "Predictive AI analyzes historical data to forecast or detect conditions such as capacity exhaustion",
      "Predictive AI must always run on the network device itself, while generative AI runs in the cloud",
      "Generative AI output is deterministic and never requires human review before deployment"
    ],
    answer: [0, 1],
    explanation: "The defining trait of generative AI is creating new content, such as draft configurations, scripts, or natural-language summaries, while predictive AI mines historical telemetry to forecast trends and detect anomalies. Where each model runs is an architectural choice, not a defining property, so the on-device versus cloud claim is false. Generative models are probabilistic and can produce plausible but incorrect output, which is precisely why their suggestions must be validated by engineers before being deployed to production devices."
  },
  {
    id: "auto-045",
    domain: "Automation and Programmability",
    type: "dragdrop",
    question: "Drag each JSON value on the left to its data type on the right.",
    items: ["true", "{\"vlan\": 10}", "\"GigabitEthernet0/1\"", "[10, 20, 30]", "24"],
    targets: ["String", "Number", "Boolean", "Array", "Object"],
    answer: [2, 4, 0, 3, 1],
    explanation: "Double quotation marks make \"GigabitEthernet0/1\" a string, while the bare digits 24 form a number because they are unquoted. The literal true is one of the two Boolean values. Square brackets enclosing comma-separated values define an array, and curly braces enclosing key-value pairs define an object. Recognizing these delimiters matters because quoting a number or Boolean silently turns it into a string, a frequent source of automation bugs."
  }
);
(window.QUESTION_BANK = window.QUESTION_BANK || []).push(
  {
    id: "auto-046",
    domain: "Automation and Programmability",
    type: "single",
    question: "Refer to the exhibit. Which statement about the data types in this JSON object is true?",
    exhibit: "{\n  \"vlan\": {\n    \"id\": \"100\",\n    \"name\": \"USERS\",\n    \"ports\": 24,\n    \"active\": true\n  }\n}",
    options: [
      "The value of id is a string even though it contains only digits",
      "The value of id is a number because it contains only digits",
      "The value of ports is a string because all object values inherit the type of the first key",
      "The value of active is a string containing the word true"
    ],
    answer: [0],
    explanation: "Quotation marks determine the type: because \"100\" is enclosed in double quotes it is a string, and a script that performs arithmetic on it without conversion will fail or misbehave. Content alone never makes a value a number; the unquoted 24 for ports is a number precisely because it lacks quotes. JSON values are typed independently, so there is no inheritance from other keys, and the unquoted literal true for active is a Boolean, not a string."
  },
  {
    id: "auto-047",
    domain: "Automation and Programmability",
    type: "single",
    question: "Due to a network timeout, an automation script does not receive a response and retransmits the identical POST /api/v1/vlans request that the controller had in fact already processed. What is the likely outcome?",
    options: [
      "A second, duplicate VLAN object may be created because POST is not idempotent",
      "The controller silently ignores the retry because HTTP guarantees duplicate suppression",
      "The retry replaces the first object because POST always overwrites by URI",
      "The controller returns 404 because the collection URI no longer exists after the first POST"
    ],
    answer: [0],
    explanation: "POST is defined as non-idempotent, so each accepted request to a collection URI can create another resource, and a blind retry after a timeout commonly produces duplicates unless the API implements its own deduplication keys. HTTP itself provides no duplicate suppression. Overwriting an existing resource at a specific URI is the behavior of PUT, not POST to a collection. The collection URI continues to exist after a creation, so a 404 on the retry would not be expected."
  },
  {
    id: "auto-048",
    domain: "Automation and Programmability",
    type: "single",
    question: "Refer to the exhibit. What is the purpose of the Content-Type header in this request?",
    exhibit: "POST /api/v1/vlans HTTP/1.1\nHost: controller.example.com\nContent-Type: application/json\nAccept: application/json\n\n{ \"vlanId\": 30, \"name\": \"IOT\" }",
    options: [
      "It tells the server that the request body is formatted as JSON",
      "It tells the server which format the client wants the response body to use",
      "It authenticates the client to the API endpoint",
      "It specifies which HTTP version the server must use for the response"
    ],
    answer: [0],
    explanation: "Content-Type describes the media type of the body the sender is transmitting, so application/json informs the server that the payload should be parsed as JSON. Declaring the format the client prefers for the response is the job of the Accept header, which is also present in the exhibit and is the classic distractor. Authentication is carried by the Authorization header or similar mechanisms, and the HTTP protocol version appears on the request line, not in a header."
  },
  {
    id: "auto-049",
    domain: "Automation and Programmability",
    type: "multi",
    question: "Which two statements about JSON syntax are true? (Choose two.)",
    options: [
      "Every key in an object must be a string enclosed in double quotes",
      "An object is an unordered collection of key-value pairs enclosed in curly braces",
      "Comments can be added to any line by prefixing it with two slashes",
      "A trailing comma after the final element of an array is permitted"
    ],
    answer: [0, 1],
    explanation: "JSON mandates that object keys be double-quoted strings, and an object is defined as a brace-delimited set of key-value pairs whose order carries no meaning. Unlike many programming languages, JSON has no comment syntax, so slash-prefixed comments make a document invalid, a difference that often surprises engineers coming from JavaScript. Trailing commas after the last element of an array or object are likewise forbidden by the standard, even though some lenient parsers tolerate them."
  },
  {
    id: "auto-050",
    domain: "Automation and Programmability",
    type: "dragdrop",
    question: "Drag each tool or interface on the left to the description that matches it on the right.",
    items: ["Terraform", "REST API", "Ansible", "Puppet"],
    targets: [
      "Agentless tool that pushes YAML playbooks to devices over SSH",
      "Declarative tool that uses HCL and tracks deployments in a state file",
      "Tool whose traditional model uses an agent that pulls manifests from a master",
      "Stateless HTTP-based interface used by applications to interact with a controller"
    ],
    answer: [2, 0, 3, 1],
    explanation: "Ansible is agentless and pushes YAML playbooks over SSH from a control node. Terraform declares the desired end state in HCL and records what it built in a state file so it can compute changes. Puppet's classic architecture installs an agent on each node that periodically pulls compiled manifests from a master server. A REST API is not a configuration tool at all but a stateless HTTP interface through which applications and scripts exchange data with a controller."
  },
  {
    id: "auto-051",
    domain: "Automation and Programmability",
    type: "single",
    question: "Refer to the exhibit. How does the tool that consumes this file apply the configuration to the infrastructure?",
    exhibit: "resource \"iosxe_vlan\" \"users\" {\n  vlan_id = 100\n  name    = \"USERS\"\n}",
    options: [
      "It compares the declared end state with its recorded state and makes only the changes needed to converge",
      "It executes the lines top to bottom as an ordered list of imperative CLI commands",
      "It emails the file to the device administrator for manual entry",
      "It converts the block into SNMP SET operations against the VLAN MIB"
    ],
    answer: [0],
    explanation: "The block syntax with the resource keyword identifies HashiCorp Configuration Language, so the consuming tool is Terraform, which is declarative: terraform plan diffs the desired state against the state file and the real infrastructure, and terraform apply performs only the necessary additions, changes, or deletions. HCL is not an ordered script of CLI commands, which distinguishes it from imperative approaches. Terraform providers talk to device or controller APIs programmatically, not through email and not by generating SNMP SET operations."
  },
  {
    id: "auto-052",
    domain: "Automation and Programmability",
    type: "multi",
    question: "Which two HTTP methods are idempotent, meaning that repeating the identical request leaves the server in the same state as issuing it once? (Choose two.)",
    options: [
      "GET",
      "PUT",
      "POST",
      "PATCH"
    ],
    answer: [0, 1],
    explanation: "GET is safe and idempotent because it only reads data, and PUT is idempotent because it replaces the resource at a given URI with the same representation no matter how many times it is repeated. POST is explicitly non-idempotent, since each request can create another resource or trigger the action again. PATCH applies a partial modification and is not guaranteed idempotent; for example, a patch that appends to a list or increments a value changes the result on every repetition."
  },
  {
    id: "auto-053",
    domain: "Automation and Programmability",
    type: "single",
    question: "Refer to the exhibit. Which statement describes the top-level structure of this JSON document returned by an API?",
    exhibit: "[\n  { \"id\": 1, \"hostname\": \"R1\" },\n  { \"id\": 2, \"hostname\": \"R2\" }\n]",
    options: [
      "It is an array whose two elements are objects",
      "It is an object containing two arrays",
      "It is invalid because a JSON document must begin with a curly brace",
      "It is a single object with four key-value pairs"
    ],
    answer: [0],
    explanation: "The outermost delimiters are square brackets, so the document is an array, and each of its two comma-separated elements is a curly-brace object with id and hostname keys. An object containing arrays would start with a curly brace and use named keys. A JSON text may legally have an array, an object, or even a bare scalar as its top level, so starting with a bracket is valid. The two objects remain separate elements; their keys are not merged into one object."
  },
  {
    id: "auto-054",
    domain: "Automation and Programmability",
    type: "single",
    question: "An engineer opens an SSH session to a router to change its configuration, and a monitoring server polls the same router with SNMP. Which plane of the device do these activities use?",
    options: [
      "The management plane",
      "The data plane",
      "The control plane",
      "The policy plane"
    ],
    answer: [0],
    explanation: "Protocols through which humans and tools administer a device, including SSH, SNMP, syslog, NETCONF, and HTTPS APIs, belong to the management plane. The data plane is the per-packet forwarding machinery that moves user traffic through the device. The control plane comprises protocols such as OSPF and STP that the device uses to build its forwarding intelligence. There is no standard plane called the policy plane; policy is expressed through the management plane and enforced by the other two."
  },
  {
    id: "auto-055",
    domain: "Automation and Programmability",
    type: "single",
    question: "Which Cisco Catalyst Center capability ingests streaming telemetry from devices and applies machine learning to identify when network behavior deviates from its learned baseline?",
    options: [
      "Assurance with AI-driven analytics",
      "The configuration template editor",
      "Software image management (SWIM)",
      "Discovery and inventory collection"
    ],
    answer: [0],
    explanation: "The Assurance function of Catalyst Center continuously receives telemetry, learns site-specific baselines with machine learning, and raises AI-driven issues when behavior drifts from normal, enabling proactive troubleshooting. The template editor only generates and deploys CLI configurations and performs no analytics. Software image management standardizes and distributes device operating system images. Discovery and inventory build the database of managed devices, which Assurance consumes, but discovery itself does no baseline analysis."
  },
  {
    id: "auto-056",
    domain: "Automation and Programmability",
    type: "multi",
    question: "Refer to the exhibit. Which two statements about this JSON object are true? (Choose two.)",
    exhibit: "{\n  \"interface\": \"Loopback0\",\n  \"ipv4\": \"10.255.0.1\",\n  \"enabled\": false,\n  \"mtu\": 1500,\n  \"neighbors\": []\n}",
    options: [
      "The value of enabled is a Boolean",
      "The value of neighbors is a valid empty array",
      "The value of mtu is a string because it appears after a colon",
      "The value of ipv4 is a number because it contains digits"
    ],
    answer: [0, 1],
    explanation: "The unquoted literal false is a JSON Boolean, and a pair of empty square brackets is a perfectly legal array containing zero elements, a common way for APIs to represent no results. Every JSON value appears after a colon, so that tells you nothing about type; mtu is a number because 1500 is unquoted. The ipv4 value is wrapped in double quotes, making it a string, which is also necessary because the dotted-decimal form would not be a valid JSON number anyway."
  },
  {
    id: "auto-057",
    domain: "Automation and Programmability",
    type: "single",
    question: "REST APIs are described as stateless. What does this mean for a client making a series of calls to a controller?",
    options: [
      "Each request must carry all the information the server needs, because the server retains no client session context between requests",
      "The controller discards its configuration database after every request",
      "The client may send each request only once and can never retry",
      "All requests must use the GET method because other methods change state"
    ],
    answer: [0],
    explanation: "Statelessness means the server treats every request independently, so the client includes everything required, such as its authentication token and full resource path, on each call rather than relying on remembered session context. The server's own data, including the configuration database, naturally persists; statelessness concerns client session state, not stored resources. Retries are allowed and are exactly why idempotent methods matter. All HTTP methods remain available; statelessness is unrelated to whether a request reads or modifies resources."
  },
  {
    id: "auto-058",
    domain: "Automation and Programmability",
    type: "dragdrop",
    question: "Drag each software-defined networking term on the left to its description on the right.",
    items: ["Underlay", "Northbound API", "Overlay", "Southbound API"],
    targets: [
      "Interface that automation applications use to communicate with the controller",
      "Interface the controller uses to program and manage the network devices",
      "Logical tunnels, such as VXLAN, built on top of the physical network",
      "Physical routed network that provides IP reachability between fabric devices"
    ],
    answer: [1, 3, 2, 0],
    explanation: "The northbound API faces upward from the controller toward scripts, dashboards, and orchestration platforms, while the southbound interface faces downward to configure and monitor the managed devices. Within the fabric itself, the overlay is the virtual layer of tunnels such as VXLAN that carries endpoint traffic and policy, and the underlay is the physical routed infrastructure whose sole responsibility is delivering IP reachability between the tunnel endpoints."
  },
  {
    id: "auto-059",
    domain: "Automation and Programmability",
    type: "single",
    question: "A team adopts a generative AI assistant that drafts device configurations from natural-language requests. Which operational safeguard is most important before the output reaches production devices?",
    options: [
      "Have an engineer review and validate the generated configuration, because the model can produce plausible but incorrect commands",
      "Disable logging on the devices so the AI-generated commands are not recorded",
      "Deploy the output immediately to all devices so any error is at least consistent everywhere",
      "Convert the generated configuration from JSON to XML before deployment"
    ],
    answer: [0],
    explanation: "Generative models are probabilistic and can hallucinate syntax or semantics that look correct but are wrong for the platform or the intent, so human review and testing, ideally in a lab or staged rollout, is the essential control. Disabling logging removes accountability and makes troubleshooting harder, the opposite of a safeguard. Pushing unverified output everywhere simultaneously maximizes the blast radius of any error. The serialization format of the output has no bearing on whether its content is correct."
  },
  {
    id: "auto-060",
    domain: "Automation and Programmability",
    type: "multi",
    question: "Which two statements describe the underlay network in a Cisco SD-Access fabric? (Choose two.)",
    options: [
      "It consists of routed point-to-point links running an IGP to provide IP reachability between fabric nodes",
      "It transports the VXLAN-encapsulated traffic generated by the overlay",
      "It assigns endpoints to virtual networks and applies group-based policy tags",
      "It tracks endpoint-to-location mappings so hosts can roam between edge switches"
    ],
    answer: [0, 1],
    explanation: "The underlay is intentionally simple: routed links with an IGP, commonly IS-IS in SD-Access, whose only job is to provide stable IP reachability among the fabric nodes, and across that reachability it carries the VXLAN-encapsulated packets created by the overlay. Assigning endpoints to virtual networks and stamping traffic with group tags is overlay functionality. Tracking endpoint-to-location mappings for roaming is performed by the fabric's LISP-based control plane, which also belongs to the overlay rather than the underlay."
  }
);
