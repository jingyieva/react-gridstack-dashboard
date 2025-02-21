export const FILTER_FIELDS = [

    {
        key: 'event_id',
        name: 'Event ID',
    },
    {
        key: 'summary',
        name: 'Summary',
    },
    {
        key: 'status',
        name: 'Status',
        type: 'Select',
        options: [
           { value: 4, text: "已通報", },
           { value: 5, text: "已關單", },
        ]
    },
    {
        key: 'item',
        name: 'Item',
        type: 'Select',
        options: [
            { value: "入侵嘗試", text: "入侵嘗試", },
            { value: "入侵攻擊", text: "入侵攻擊", },
            { value: "入侵攻擊情資（INT）", text: "入侵攻擊情資（INT）", },
            { value: "回饋情資（FBI）", text: "回饋情資（FBI）", },
            { value: "尚需調查", text: "尚需調查", },
            { value: "惡意內容", text: "惡意內容", },
            { value: "惡意程式", text: "惡意程式", },
            { value: "掃描刺探", text: "掃描刺探", },
            { value: "政策規則", text: "政策規則", },
            { value: "系統弱點", text: "系統弱點", },
            { value: "系統服務", text: "系統服務", },
            { value: "經同意之網路攻防演練", text: "經同意之網路攻防演練", },
            { value: "Early-Warning", text: "Early-Warning", },
            { value: "網頁攻擊情資（DEF）", text: "網頁攻擊情資（DEF）", },
            { value: "詐欺攻擊", text: "詐欺攻擊", },
            { value: "資安訊息情資（ANA）", text: "資安訊息情資（ANA）", },
            { value: "資安預警情資（EWA）", text: "資安預警情資（EWA）", },
            { value: "資訊內容安全", text: "資訊內容安全", },
            { value: "資訊蒐集", text: "資訊蒐集", },
            { value: "服務阻斷", text: "服務阻斷", },
            { value: "預警通知", text: "預警通知", },
            { value: "其他", text: "其他", },
            { value: "Announcement Advisory, ANA", text: "Announcement Advisory, ANA", },
            { value: "Authorized cyber-attack and defense exercise", text: "Authorized cyber-attack and defense exercise", },
            { value: "Awaiting for investigation", text: "Awaiting for investigation", },
            { value: "Defacement, DEF", text: "Defacement, DEF", },
            { value: "Distributed denial of service attack", text: "Distributed denial of service attack", },
            { value: "Early Warning, EWA", text: "Early Warning, EWA", },
            { value: "Feedback Information, FBI", text: "Feedback Information, FBI", },
            { value: "Fraud attack", text: "Fraud attack", },
            { value: "Information confidentiality", text: "Information confidentiality", },
            { value: "Intelligence collection", text: "Intelligence collection", },
            { value: "Intrusion attack", text: "Intrusion attack", },
            { value: "Intrusion attempt", text: "Intrusion attempt", },
            { value: "Intrusion, INT", text: "Intrusion, INT", },
            { value: "Malicious content", text: "Malicious content", },
            { value: "Malicious software", text: "Malicious software", },
            { value: "Policy rules and regulations", text: "Policy rules and regulations", },
            { value: "Scan or sniffer", text: "Scan or sniffer", },
            { value: "System persistence service", text: "System persistence service", },
            { value: "System weakness", text: "System weakness", },
            { value: "Other", text: "Other", },
            { value: "Undefined", text: "Undefined", },
        ]
    },
    {
        key: 'priority',
        name: 'Priority',
        type: 'Select',
        options: [
           { value: 0, text: "Low",       },
           { value: 1, text: "Medium",    },
           { value: 2, text: "High",      },
           { value: 3, text: "Critical",  },
           { value: 4, text: "Undefined", },
        ]
    },
    {
        key: 'attack_source_ip',
        name: 'Source IP',
    },
    {
        key: 'attack_source_ipv6',
        name: 'Source IPv6',
    },
    {
        key: 'attack_source_country',
        name: 'Source Country',
    },
    {
        key: 'target_host_ip',
        name: 'Target IP',
    },
    {
        key: 'target_host_ipv6',
        name: 'Target IPv6',
    },
    {
        key: 'target_host_country',
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
        key: 'summary',
        name: 'Summary',
        type: 'category',
    },
    {
        key: 'status',
        name: 'Status',
        type: 'category',
    },
    {
        key: 'item',
        name: 'Item',
        type: 'category',
    },
    {
        key: 'priority',
        name: 'Priority',
        type: 'category',
    },
    {
        key: 'attack_source_ip',
        name: 'Source IP',
        type: 'category',
    },
    // {
    //     key: 'attack_source_ipv6',
    //     name: 'Source IPv6',
    // },
    {
        key: 'attack_source_country',
        name: 'Source Country',
        type: 'category',
    },
    {
        key: 'target_host_ip',
        name: 'Target IP',
        type: 'category',
    },
    // {
    //     key: 'target_host_ipv6',
    //     name: 'Target IPv6',
    // },
    {
        key: 'target_host_country',
        name: 'Target Country',
        type: 'category',
    },
];

export const MOCK_DATAS = {

    summary: [
        '偵測來源單一帳號持續登入失敗',
        '惡意程式擴散通報',
        'DDI特定高風險事件偵測',
        'administrators 群組之帳號，由預期外的主機登入',
        '單一來源IP觸發多種阻擋WAF事件',
        'DDOS 攻擊行為偵測',
        'SQL_Injection未阻擋事件偵測',
        'HTTP: Directory Traversal事件偵測',
        '防火牆登入成功事件偵測',
        '發現無法清除刪除病毒紀錄',
    ],

    status: [
        "已通報",
        "已關單",
    ],

    priority: [
        "Low",
        "Medium",
        "High",
        "Critical",
        "Undefined",
    ],

    item: [
        "入侵嘗試",
        "入侵攻擊",
        "入侵攻擊情資（INT）",
        "回饋情資（FBI）",
        "尚需調查",
        "惡意內容",
        "惡意程式",
        "掃描刺探",
        "政策規則",
        "系統弱點",
        "系統服務",
        "經同意之網路攻防演練",
        "Early-Warning",
        "網頁攻擊情資（DEF）",
        "詐欺攻擊",
        "資安訊息情資（ANA）",
        "資安預警情資（EWA）",
        "資訊內容安全",
        "資訊蒐集",
        "服務阻斷",
        "預警通知",
        "其他"
    ],

    target_host_country: [
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
    attack_source_country: [
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
    attack_source_ip: ['171.0.55.63', '72.10.30.1', '172.20.241.20', '172.23.116.15', '10.254.175.151',
        '172.20.101.102', '10.7.171.55', '169.254.1.218',
        '10.81.30.211', '172.23.116.14'],
    target_host_ip: ['171.0.55.63', '72.10.30.1', '172.20.241.20', '172.23.116.15', '10.254.175.151',
            '172.20.101.102', '10.7.171.55', '169.254.1.218',
            '10.81.30.211', '172.23.116.14']
}