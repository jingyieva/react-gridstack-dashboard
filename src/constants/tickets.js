import { generateTs } from "utils/times";

export const FILTER_FIELDS = [

    {
        key: 'record_id',
        name: 'Record ID',
    },
    {
        key: 'title',
        name: 'Title',
    },
    {
        key: 'status',
        name: 'Status',
        type: 'Select',
        options: [
           { value: 1, text: "Open",     },
           { value: 2, text: "Reported", },
           { value: 3, text: "Closed",   },
        ]
    },
    {
        key: 'category',
        name: 'Category',
        type: 'Select',
        options: [
            { value: "intrusionAttempt", text: "Intrusion Attempt", },
            { value: "intrusion", text: "Intrusion", },
            { value: "malware", text: "Malware", },
            { value: "fraud", text: "Fraud", },
            { value: "ddoS", text: "DDoS", },
            { value: "recon", text: "Recon", },
            { value: "policy", text: "Policy", },
            { value: "vulnerability", text: "Vulnerability", },
            { value: "other", text: "Other", },
        ]
    },
    {
        key: 'severity',
        name: 'Severity',
        type: 'Select',
        options: [
           { value: 0, text: "Low",       },
           { value: 1, text: "Medium",    },
           { value: 2, text: "High",      },
           { value: 3, text: "Critical",  },
        ]
    },
    {
        key: 'source_label',
        name: 'Source Label',
    },
    {
        key: 'source_country',
        name: 'Source Country',
    },
    {
        key: 'target_label',
        name: 'Target Label',
    },
    {
        key: 'target_country',
        name: 'Target Country',
    },
];

export const CHART_AXIS_FIELDS = [
    {
        key: 'create_ts',
        name: 'Create Date',
        type: 'time',
    },
    {
        key: 'title',
        name: 'Title',
        type: 'category',
    },
    {
        key: 'status',
        name: 'Status',
        type: 'category',
    },
    {
        key: 'category',
        name: 'Category',
        type: 'category',
    },
    {
        key: 'severity',
        name: 'Severity',
        type: 'category',
    },
    {
        key: 'source_label',
        name: 'Source Label',
        type: 'category',
    },
    {
        key: 'source_country',
        name: 'Source Country',
        type: 'category',
    },
    {
        key: 'target_label',
        name: 'Target Label',
        type: 'category',
    },
    {
        key: 'target_country',
        name: 'Target Country',
        type: 'category',
    },
];

export const MOCK_DATAS = {

    create_ts: generateTs(new Date(), 30),

    title: [
        "User login failure detected",
        "Suspicious file upload attempt",
        "Multiple blocked requests from same IP",
        "Unusual admin login location",
        "High volume of failed transactions",
        "DDoS activity pattern detected",
        "SQL injection attempt blocked",
        "Unauthorized directory access attempt",
        "Firewall configuration change logged",
        "Antivirus detected unresolved threat"
    ],

    status: [
        "Open",    
        "Reported",
        "Closed",  
    ],

    severity: [
        "Low",
        "Medium",
        "High",
        "Critical",
    ],

    category: [
        "Intrusion Attempt",
        "Intrusion",
        "Malware",
        "Fraud",
        "DDoS",
        "Recon",
        "Policy",
        "Vulnerability",
        "Service",
        "Other",
    ],

    target_country: [
        'U.S.A',
        'Taiwan',
        'Japan',
        'South Korea',
        'Thailand',
        'India',
        'Canada',
        'England',
        'France',
        'Australia',
        'New Zealand'
    ],
    source_country: [
        'China',
        'Vietnam',
        'Mexico',
        'Russia',
        'Canada',
        'England',
        'Sweden',
        'Turkey',
        'South Africa',
        'Eygpt',
        'Columbia',
        'Brazil'
    ],
    source_label: [
        "SRC-001",
        "SRC-002",
        "SRC-003",
        "SRC-004",
        "SRC-005",
        "SRC-006",
        "SRC-007",
        "SRC-008",
        "SRC-009",
        "SRC-010"
    ],
    target_label: [
        "TGT-001",
        "TGT-002",
        "TGT-003",
        "TGT-004",
        "TGT-005",
        "TGT-006",
        "TGT-007",
        "TGT-008",
        "TGT-009",
        "TGT-010"
    ]
}