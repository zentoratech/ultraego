const state = {

    currentPage: "dashboard",

    members: [

        {
            id: "UE-2401",
            name: "Ali Raza",
            email: "ali.raza@ultraego.fit",
            plan: "ELITE",
            status: "ACTIVE",
            activity: "Today · 06:42",
            area: "Main Floor"
        },

        {
            id: "UE-2398",
            name: "Hamza Khan",
            email: "hamza.khan@ultraego.fit",
            plan: "PRO",
            status: "ACTIVE",
            activity: "Today · 07:05",
            area: "Strength Zone"
        },

        {
            id: "UE-2391",
            name: "Usman Ahmed",
            email: "usman.ahmed@ultraego.fit",
            plan: "CORE",
            status: "ACTIVE",
            activity: "Yesterday · 18:22",
            area: "Cardio Floor"
        },

        {
            id: "UE-2384",
            name: "Ayesha Malik",
            email: "ayesha.malik@ultraego.fit",
            plan: "ELITE",
            status: "EXPIRING",
            activity: "Yesterday · 17:11",
            area: "Main Floor"
        },

        {
            id: "UE-2379",
            name: "Bilal Hussain",
            email: "bilal.hussain@ultraego.fit",
            plan: "PRO",
            status: "ACTIVE",
            activity: "Sep 08 · 09:14",
            area: "Functional Area"
        },

        {
            id: "UE-2372",
            name: "Hira Shah",
            email: "hira.shah@ultraego.fit",
            plan: "CORE",
            status: "ACTIVE",
            activity: "Sep 08 · 07:52",
            area: "Cardio Floor"
        },

        {
            id: "UE-2368",
            name: "Taha Javed",
            email: "taha.javed@ultraego.fit",
            plan: "PRO",
            status: "ACTIVE",
            activity: "Sep 07 · 18:40",
            area: "Strength Zone"
        },

        {
            id: "UE-2361",
            name: "Maham Noor",
            email: "maham.noor@ultraego.fit",
            plan: "ELITE",
            status: "ACTIVE",
            activity: "Sep 07 · 17:28",
            area: "Main Floor"
        }

    ],

    trainers: [

        [
            "Usman Farooq",
            "Strength & Conditioning",
            28,
            "ACTIVE"
        ],

        [
            "Sana Iqbal",
            "HIIT / Fat Loss",
            21,
            "ACTIVE"
        ],

        [
            "Taha Javed",
            "Performance Training",
            16,
            "ACTIVE"
        ],

        [
            "Maham Noor",
            "Mobility & Recovery",
            12,
            "AWAY"
        ]

    ]

};


/* =========================================================
   DOM HELPER
========================================================= */

const $ = (selector) => {
    return document.querySelector(selector);
};


/* =========================================================
   PAGE MAP
========================================================= */

const pages = {

    dashboard: renderDashboard,

    members: renderMembers,

    attendance: renderAttendance,

    trainers: renderTrainers,

    memberships: renderMemberships,

    billing: renderBilling,

    reports: renderReports,

    system: renderSystem

};


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        bindGlobalEvents();

        updateClock();

        setInterval(
            updateClock,
            1000
        );

    }
);


/* =========================================================
   GLOBAL EVENTS
========================================================= */

function bindGlobalEvents() {

    $("#loginForm").addEventListener(
        "submit",
        handleLogin
    );

    $("#logoutButton").addEventListener(
        "click",
        logout
    );

    $("#topAddMember").addEventListener(
        "click",
        openAddMemberModal
    );

    $("#closeModal").addEventListener(
        "click",
        closeModal
    );

    $("#modalBackdrop").addEventListener(
        "click",
        closeModal
    );

    document
        .querySelectorAll(".nav-item")
        .forEach((button) => {

            button.addEventListener(
                "click",
                () => {

                    navigate(
                        button.dataset.page
                    );

                }
            );

        });

}


/* =========================================================
   LOGIN
========================================================= */

function handleLogin(event) {

    event.preventDefault();

    const username =
        $("#username").value.trim();

    const password =
        $("#password").value;

    if (
        username === "admin" &&
        password === "admin123"
    ) {

        $("#loginScreen")
            .classList
            .add("hidden");

        $("#app")
            .classList
            .remove("hidden");

        navigate("dashboard");

        showToast(
            "Secure session established."
        );

    } else {

        showToast(
            "Access denied. Check username and password."
        );

    }

}


function logout() {

    $("#app")
        .classList
        .add("hidden");

    $("#loginScreen")
        .classList
        .remove("hidden");

    $("#password").value = "";

}


/* =========================================================
   NAVIGATION
========================================================= */

function navigate(page) {

    if (!pages[page]) {

        page = "dashboard";

    }

    state.currentPage = page;


    document
        .querySelectorAll(".nav-item")
        .forEach((button) => {

            button.classList.toggle(
                "active",
                button.dataset.page === page
            );

        });


    const labels = {

        dashboard: [
            "OVERVIEW",
            "Overview"
        ],

        members: [
            "MEMBERS",
            "Member Directory"
        ],

        attendance: [
            "ATTENDANCE",
            "Attendance Control"
        ],

        trainers: [
            "TRAINERS",
            "Trainer Management"
        ],

        memberships: [
            "MEMBERSHIPS",
            "Membership Architecture"
        ],

        billing: [
            "BILLING",
            "Revenue Control"
        ],

        reports: [
            "REPORTS",
            "Performance Intelligence"
        ],

        system: [
            "SYSTEM",
            "System Configuration"
        ]

    };


    $("#pagePath").textContent =
        labels[page][0];

    $("#pageTitle").textContent =
        labels[page][1];


    /*
        IMPORTANT FIX

        The page renderer must be CALLED.

        Correct:
        pages[page]()

        Not:
        pages[page]

        This prevents raw JavaScript
        template code from appearing
        inside the dashboard.
    */

    $("#pageView").innerHTML =
        pages[page]();


    bindPageEvents();

}


/* =========================================================
   DASHBOARD
========================================================= */

function renderDashboard() {

    const bars = [
        58,
        72,
        51,
        78,
        88,
        69,
        94
    ];

    const days = [
        "MON",
        "TUE",
        "WED",
        "THU",
        "FRI",
        "SAT",
        "SUN"
    ];


    return `

        <div class="hero">

            <div>

                <div class="eyebrow">
                    01 / LIVE OVERVIEW
                </div>

                <h1>
                    Good evening, Admin.
                </h1>

                <p>
                    Your complete operational snapshot
                    for Ultra Ego Fitness.
                </p>

            </div>


            <div class="hero-actions">

                <button
                    class="secondary-button"
                    data-action="checkin"
                >
                    CHECK IN
                </button>

                <button
                    class="primary-button"
                    data-action="add-member"
                >
                    + ADD MEMBER
                </button>

            </div>

        </div>


        <div class="metrics">

            ${metric(
                "TOTAL MEMBERS",
                "1,248",
                "+8.4% THIS MONTH",
                "positive"
            )}

            ${metric(
                "ON FLOOR",
                "386",
                "31% OF MEMBERS",
                "positive"
            )}

            ${metric(
                "REVENUE",
                "₨ 12.84M",
                "+6.2% THIS MONTH",
                "positive"
            )}

            ${metric(
                "EXPIRING",
                "42",
                "NEEDS ATTENTION",
                "negative"
            )}

        </div>


        <div class="two-column">

            <div class="panel chart-panel">

                <div class="panel-header">

                    <h3>
                        ATTENDANCE TRAFFIC
                    </h3>

                    <span>
                        LAST 7 DAYS
                    </span>

                </div>


                <div class="chart">

                    ${bars
                        .map(
                            (value, index) => `

                                <div
                                    class="chart-column"
                                >

                                    <div
                                        class="chart-bar"
                                        style="height:${value}%"
                                    ></div>

                                    <b>
                                        ${days[index]}
                                    </b>

                                </div>

                            `
                        )
                        .join("")}

                </div>

            </div>


            <div class="panel">

                <div class="panel-header">

                    <h3>
                        LIVE FLOOR ACTIVITY
                    </h3>

                    <span>
                        NOW
                    </span>

                </div>


                <div class="activity-list">

                    ${state.members
                        .slice(0, 5)
                        .map(
                            (member, index) => `

                                <div
                                    class="activity-row"
                                >

                                    <div>

                                        <strong>
                                            ${member.name}
                                        </strong>

                                        <small>
                                            ${member.activity}
                                            ·
                                            ${member.area}
                                        </small>

                                    </div>


                                    <span
                                        class="pill ${
                                            index === 3
                                                ? "red"
                                                : "green"
                                        }"
                                    >
                                        ${
                                            index === 3
                                                ? "CHECK-OUT"
                                                : "CHECK-IN"
                                        }
                                    </span>

                                </div>

                            `
                        )
                        .join("")}

                </div>

            </div>

        </div>


        <div class="panel table-panel">

            <div class="toolbar">

                <strong>
                    RECENT MEMBER REGISTRY
                </strong>

                <button
                    class="manage-button"
                    data-page-action="members"
                >
                    VIEW DIRECTORY
                </button>

            </div>


            ${memberTable(
                state.members.slice(0, 5)
            )}

        </div>

    `;
}


/* =========================================================
   MEMBERS
========================================================= */

function renderMembers() {

    return `

        <div class="hero">

            <div>

                <div class="eyebrow">
                    02 / MEMBERS
                </div>

                <h1>
                    Member Directory
                </h1>

                <p>
                    Search and manage the complete
                    membership registry.
                </p>

            </div>


            <button
                class="primary-button"
                data-action="add-member"
            >
                + ADD MEMBER
            </button>

        </div>


        <div class="panel table-panel">

            <div class="toolbar">

                <strong>
                    ${state.members.length}
                    REGISTERED MEMBERS
                </strong>


                <input
                    id="memberSearch"
                    class="search-input"
                    type="search"
                    placeholder="Search by name, ID or plan..."
                >

            </div>


            <div id="memberTableContainer">

                ${memberTable(
                    state.members
                )}

            </div>

        </div>

    `;
}


/* =========================================================
   MEMBER TABLE
========================================================= */

function memberTable(members) {

    if (!members.length) {

        return `
            <div class="empty-state">
                No members matched your search.
            </div>
        `;

    }


    return `

        <div class="table-wrap">

            <table class="data-table">

                <thead>

                    <tr>

                        <th>
                            MEMBER
                        </th>

                        <th>
                            PLAN
                        </th>

                        <th>
                            STATUS
                        </th>

                        <th>
                            LAST ACTIVITY
                        </th>

                        <th>
                            ACTION
                        </th>

                    </tr>

                </thead>


                <tbody>

                    ${members
                        .map(
                            (member) => `

                                <tr>

                                    <td>

                                        <span
                                            class="person-name"
                                        >
                                            ${member.name}
                                        </span>

                                        <span
                                            class="person-meta"
                                        >
                                            ${member.id}
                                            ·
                                            ${member.email}
                                        </span>

                                    </td>


                                    <td>
                                        ${member.plan}
                                    </td>


                                    <td>
                                        ${statusPill(
                                            member.status
                                        )}
                                    </td>


                                    <td>
                                        ${member.activity}
                                    </td>


                                    <td>

                                        <button
                                            class="manage-button"
                                            data-member-id="${member.id}"
                                        >
                                            MANAGE
                                        </button>

                                    </td>

                                </tr>

                            `
                        )
                        .join("")}

                </tbody>

            </table>

        </div>

    `;

}


/* =========================================================
   ATTENDANCE
========================================================= */

function renderAttendance() {

    return `

        <div class="hero">

            <div>

                <div class="eyebrow">
                    03 / ATTENDANCE
                </div>

                <h1>
                    Attendance Control
                </h1>

                <p>
                    Monitor member movement across
                    the gym floor.
                </p>

            </div>


            <button
                class="primary-button"
                data-action="checkin"
            >
                + RECORD CHECK-IN
            </button>

        </div>


        <div class="metrics">

            ${metric(
                "ON FLOOR",
                "386",
                "LIVE MEMBERS",
                "positive"
            )}

            ${metric(
                "TODAY'S VISITS",
                "642",
                "+12.7%",
                "positive"
            )}

            ${metric(
                "AVG. SESSION",
                "72 MIN",
                "THIS WEEK",
                ""
            )}

            ${metric(
                "NO SHOWS",
                "14",
                "TODAY",
                "negative"
            )}

        </div>


        <div class="panel table-panel">

            <div class="toolbar">

                <strong>
                    TODAY'S ATTENDANCE LOG
                </strong>

                <span class="person-meta">
                    VERIFIED EVENTS
                </span>

            </div>


            ${attendanceTable()}

        </div>

    `;

}


/* =========================================================
   ATTENDANCE TABLE
========================================================= */

function attendanceTable() {

    const times = [
        "06:42",
        "07:05",
        "07:31",
        "08:12",
        "08:36",
        "09:02"
    ];


    return `

        <div class="table-wrap">

            <table class="data-table">

                <thead>

                    <tr>

                        <th>
                            MEMBER
                        </th>

                        <th>
                            TIME
                        </th>

                        <th>
                            EVENT
                        </th>

                        <th>
                            AREA
                        </th>

                        <th>
                            VERIFICATION
                        </th>

                    </tr>

                </thead>


                <tbody>

                    ${state.members
                        .slice(0, 6)
                        .map(
                            (member, index) => `

                                <tr>

                                    <td>

                                        <span
                                            class="person-name"
                                        >
                                            ${member.name}
                                        </span>

                                        <span
                                            class="person-meta"
                                        >
                                            ${member.id}
                                        </span>

                                    </td>


                                    <td>
                                        ${
                                            times[index] ||
                                            "09:20"
                                        }
                                        AM
                                    </td>


                                    <td>
                                        ${
                                            index === 3
                                                ? "CHECK-OUT"
                                                : "CHECK-IN"
                                        }
                                    </td>


                                    <td>
                                        ${member.area.toUpperCase()}
                                    </td>


                                    <td>
                                        ${statusPill(
                                            "VERIFIED"
                                        )}
                                    </td>

                                </tr>

                            `
                        )
                        .join("")}

                </tbody>

            </table>

        </div>

    `;

}


/* =========================================================
   TRAINERS
========================================================= */

function renderTrainers() {

    return `

        <div class="hero">

            <div>

                <div class="eyebrow">
                    04 / TRAINERS
                </div>

                <h1>
                    Trainer Management
                </h1>

                <p>
                    Coach assignments and performance overview.
                </p>

            </div>


            <button
                class="primary-button"
                data-action="trainer"
            >
                + ADD TRAINER
            </button>

        </div>


        <div class="metrics">

            ${metric(
                "ACTIVE TRAINERS",
                "18",
                "ALL PROGRAMS",
                "positive"
            )}

            ${metric(
                "CLIENTS",
                "412",
                "PERSONAL TRAINING",
                "positive"
            )}

            ${metric(
                "AVG. RATING",
                "4.9 / 5",
                "MEMBER SCORE",
                "positive"
            )}

            ${metric(
                "OPEN SLOTS",
                "07",
                "TODAY",
                ""
            )}

        </div>


        <div class="panel table-panel">

            <div class="toolbar">

                <strong>
                    TRAINER DIRECTORY
                </strong>

            </div>


            <div class="table-wrap">

                <table class="data-table">

                    <thead>

                        <tr>

                            <th>
                                TRAINER
                            </th>

                            <th>
                                SPECIALTY
                            </th>

                            <th>
                                CLIENTS
                            </th>

                            <th>
                                STATUS
                            </th>

                            <th>
                                ACTION
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        ${state.trainers
                            .map(
                                (trainer) => `

                                    <tr>

                                        <td>

                                            <span
                                                class="person-name"
                                            >
                                                ${trainer[0]}
                                            </span>

                                            <span
                                                class="person-meta"
                                            >
                                                ULTRA EGO COACH
                                            </span>

                                        </td>


                                        <td>
                                            ${trainer[1]}
                                        </td>


                                        <td>
                                            ${trainer[2]}
                                        </td>


                                        <td>
                                            ${statusPill(
                                                trainer[3]
                                            )}
                                        </td>


                                        <td>

                                            <button
                                                class="manage-button"
                                                data-action="profile"
                                            >
                                                PROFILE
                                            </button>

                                        </td>

                                    </tr>

                                `
                            )
                            .join("")}

                    </tbody>

                </table>

            </div>

        </div>

    `;

}


/* =========================================================
   MEMBERSHIPS
========================================================= */

function renderMemberships() {

    return `

        <div class="hero">

            <div>

                <div class="eyebrow">
                    05 / MEMBERSHIPS
                </div>

                <h1>
                    Membership Architecture
                </h1>

                <p>
                    Simple plans with clear value
                    and controlled pricing.
                </p>

            </div>

        </div>


        <div class="membership-grid">

            ${membershipCard(
                "01 / PROGRAM",
                "CORE",
                "₨ 16,500",
                "Independent training",
                [
                    "Gym floor access",
                    "Locker access",
                    "Fitness assessment"
                ],
                false
            )}


            ${membershipCard(
                "02 / PROGRAM",
                "PRO",
                "₨ 27,500",
                "Guided progression",
                [
                    "Everything in Core",
                    "2 coaching sessions",
                    "Nutrition review"
                ],
                true
            )}


            ${membershipCard(
                "03 / PROGRAM",
                "ELITE",
                "₨ 41,500",
                "Maximum performance",
                [
                    "Everything in Pro",
                    "Unlimited coaching",
                    "Priority booking"
                ],
                false
            )}

        </div>

    `;

}


function membershipCard(
    code,
    name,
    price,
    description,
    features,
    featured
) {

    return `

        <article
            class="membership-card ${
                featured ? "featured" : ""
            }"
        >

            <span class="plan-code">
                ${code}
            </span>


            <h3>
                ${name}
            </h3>


            <div class="price">

                ${price}

                <small>
                    / MONTH
                </small>

            </div>


            <p>
                ${description}
            </p>


            <ul class="feature-list">

                ${features
                    .map(
                        (feature) => `
                            <li>
                                ${feature}
                            </li>
                        `
                    )
                    .join("")}

            </ul>


            <button
                class="${
                    featured
                        ? "primary-button"
                        : "secondary-button"
                }"
                data-action="plan"
            >
                SELECT PLAN
            </button>

        </article>

    `;

}


/* =========================================================
   BILLING
========================================================= */

function renderBilling() {

    const payments = [

        [
            "Ali Raza",
            "ELITE",
            "₨ 41,500",
            "10 Sep 2026",
            "PAID"
        ],

        [
            "Hamza Khan",
            "PRO",
            "₨ 27,500",
            "09 Sep 2026",
            "PAID"
        ],

        [
            "Usman Ahmed",
            "CORE",
            "₨ 16,500",
            "08 Sep 2026",
            "PAID"
        ],

        [
            "Ayesha Malik",
            "ELITE",
            "₨ 41,500",
            "07 Sep 2026",
            "PENDING"
        ]

    ];


    return `

        <div class="hero">

            <div>

                <div class="eyebrow">
                    06 / BILLING
                </div>

                <h1>
                    Revenue Control
                </h1>

                <p>
                    Payments, collections and
                    outstanding accounts.
                </p>

            </div>


            <button
                class="primary-button"
                data-action="payment"
            >
                + NEW PAYMENT
            </button>

        </div>


        <div class="metrics">

            ${metric(
                "COLLECTED",
                "₨ 12.84M",
                "+6.2%",
                "positive"
            )}

            ${metric(
                "PENDING",
                "₨ 1.04M",
                "18 INVOICES",
                "negative"
            )}

            ${metric(
                "TRANSACTIONS",
                "624",
                "+11.4%",
                "positive"
            )}

            ${metric(
                "AVG. PAYMENT",
                "₨ 20,580",
                "PER TRANSACTION",
                ""
            )}

        </div>


        <div class="panel table-panel">

            <div class="toolbar">

                <strong>
                    RECENT PAYMENT ACTIVITY
                </strong>

            </div>


            <div class="table-wrap">

                <table class="data-table">

                    <thead>

                        <tr>

                            <th>
                                MEMBER
                            </th>

                            <th>
                                PLAN
                            </th>

                            <th>
                                AMOUNT
                            </th>

                            <th>
                                DATE
                            </th>

                            <th>
                                STATUS
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        ${payments
                            .map(
                                (payment) => `

                                    <tr>

                                        <td>

                                            <span
                                                class="person-name"
                                            >
                                                ${payment[0]}
                                            </span>

                                            <span
                                                class="person-meta"
                                            >
                                                MEMBERSHIP PAYMENT
                                            </span>

                                        </td>


                                        <td>
                                            ${payment[1]}
                                        </td>


                                        <td>
                                            <strong>
                                                ${payment[2]}
                                            </strong>
                                        </td>


                                        <td>
                                            ${payment[3]}
                                        </td>


                                        <td>
                                            ${statusPill(
                                                payment[4]
                                            )}
                                        </td>

                                    </tr>

                                `
                            )
                            .join("")}

                    </tbody>

                </table>

            </div>

        </div>

    `;

}


/* =========================================================
   REPORTS
========================================================= */

function renderReports() {

    const bars = [
        44,
        51,
        57,
        49,
        65,
        61,
        72,
        78,
        70,
        84,
        91,
        96
    ];


    return `

        <div class="hero">

            <div>

                <div class="eyebrow">
                    07 / REPORTS
                </div>

                <h1>
                    Performance Intelligence
                </h1>

                <p>
                    Business metrics across members,
                    programs and revenue.
                </p>

            </div>


            <button
                class="secondary-button"
                data-action="export"
            >
                EXPORT REPORT
            </button>

        </div>


        <div class="kpi-grid">

            ${kpi(
                "MEMBER RETENTION",
                "94%",
                "Excellent retention",
                94
            )}

            ${kpi(
                "PLAN CONVERSION",
                "71%",
                "Trial to paid",
                71
            )}

            ${kpi(
                "TRAINER UTILIZATION",
                "82%",
                "Healthy capacity",
                82
            )}

        </div>


        <div
            class="two-column"
            style="margin-top:10px;"
        >

            <div class="panel chart-panel">

                <div class="panel-header">

                    <h3>
                        REVENUE PERFORMANCE
                    </h3>

                    <span>
                        12 MONTHS
                    </span>

                </div>


                <div class="chart">

                    ${bars
                        .map(
                            (value, index) => `

                                <div
                                    class="chart-column"
                                >

                                    <div
                                        class="chart-bar"
                                        style="height:${value}%"
                                    ></div>

                                    <b>
                                        ${index + 1}
                                    </b>

                                </div>

                            `
                        )
                        .join("")}

                </div>

            </div>


            <div class="panel">

                <div class="panel-header">

                    <h3>
                        PROGRAM MIX
                    </h3>

                    <span>
                        MEMBERS
                    </span>

                </div>


                <div class="activity-list">

                    ${programMix(
                        "Strength Training",
                        182,
                        91
                    )}

                    ${programMix(
                        "HIIT / Fat Loss",
                        141,
                        70
                    )}

                    ${programMix(
                        "Performance",
                        96,
                        48
                    )}

                    ${programMix(
                        "Mobility",
                        64,
                        32
                    )}

                </div>

            </div>

        </div>

    `;

}


function kpi(
    title,
    value,
    description,
    percentage
) {

    return `

        <div class="kpi">

            <label>
                ${title}
            </label>

            <strong>
                ${value}
            </strong>

            <small>
                ${description}
            </small>

            <div class="progress">

                <span
                    style="width:${percentage}%"
                ></span>

            </div>

        </div>

    `;

}


function programMix(
    name,
    members,
    percentage
) {

    return `

        <div
            class="activity-row"
            style="
                display:block;
                padding:14px 0;
            "
        >

            <div
                style="
                    display:flex;
                    justify-content:space-between;
                "
            >

                <strong>
                    ${name}
                </strong>

                <span class="person-meta">
                    ${members}
                </span>

            </div>


            <div class="progress">

                <span
                    style="width:${percentage}%"
                ></span>

            </div>

        </div>

    `;

}


/* =========================================================
   SYSTEM
========================================================= */

function renderSystem() {

    return `

        <div class="hero">

            <div>

                <div class="eyebrow">
                    08 / SYSTEM
                </div>

                <h1>
                    System Configuration
                </h1>

                <p>
                    Manage the identity and operating
                    preferences of the workspace.
                </p>

            </div>

        </div>


        <div class="panel settings-panel">

            <div class="form-grid">

                ${field(
                    "GYM NAME",
                    "Ultra Ego Fitness"
                )}

                ${field(
                    "ADMIN EMAIL",
                    "admin@ultraego.fit"
                )}

                ${field(
                    "PHONE",
                    "+92 300 0000000"
                )}

                ${field(
                    "CITY",
                    "Karachi"
                )}

                ${field(
                    "CURRENCY",
                    "PKR — Pakistani Rupee"
                )}

                ${field(
                    "MEMBER PREFIX",
                    "UE-"
                )}

            </div>


            <div class="form-actions">

                <button
                    class="primary-button"
                    data-action="save"
                >
                    SAVE CONFIGURATION
                </button>

            </div>

        </div>

    `;

}


function field(
    label,
    value
) {

    return `

        <div class="field">

            <label>
                ${label}
            </label>

            <input
                value="${value}"
            >

        </div>

    `;

}


/* =========================================================
   COMPONENT HELPERS
========================================================= */

function metric(
    title,
    value,
    description,
    type
) {

    return `

        <div class="metric">

            <label>
                ${title}
            </label>

            <strong>
                ${value}
            </strong>

            <small class="${type}">
                ${description}
            </small>

        </div>

    `;

}


function statusPill(status) {

    let className = "green";


    if (
        status === "EXPIRING" ||
        status === "PENDING" ||
        status === "AWAY"
    ) {

        className = "red";

    }


    return `

        <span
            class="pill ${className}"
        >
            ${status}
        </span>

    `;

}


/* =========================================================
   PAGE EVENTS
========================================================= */

function bindPageEvents() {

    document
        .querySelectorAll("[data-page-action]")
        .forEach((button) => {

            button.addEventListener(
                "click",
                () => {

                    navigate(
                        button.dataset.pageAction
                    );

                }
            );

        });


    document
        .querySelectorAll("[data-action]")
        .forEach((button) => {

            button.addEventListener(
                "click",
                () => {

                    handleAction(
                        button.dataset.action
                    );

                }
            );

        });


    document
        .querySelectorAll("[data-member-id]")
        .forEach((button) => {

            button.addEventListener(
                "click",
                () => {

                    openMemberModal(
                        button.dataset.memberId
                    );

                }
            );

        });


    const search =
        $("#memberSearch");


    if (search) {

        search.addEventListener(
            "input",
            () => {

                const query =
                    search.value
                        .toLowerCase()
                        .trim();


                const filtered =
                    state.members.filter(
                        (member) => {

                            return [
                                member.id,
                                member.name,
                                member.email,
                                member.plan,
                                member.status
                            ]
                                .join(" ")
                                .toLowerCase()
                                .includes(query);

                        }
                    );


                $("#memberTableContainer")
                    .innerHTML =
                    memberTable(filtered);


                bindPageEvents();

            }
        );

    }

}


/* =========================================================
   ACTIONS
========================================================= */

function handleAction(action) {

    const messages = {

        checkin:
            "Attendance event recorded successfully.",

        trainer:
            "Trainer module is ready for a new profile.",

        payment:
            "Payment entry module opened.",

        plan:
            "Membership plan selected.",

        export:
            "Report prepared for export.",

        save:
            "System configuration saved.",

        profile:
            "Trainer profile opened."

    };


    if (action === "add-member") {

        openAddMemberModal();

        return;

    }


    showToast(
        messages[action] ||
        "Action completed."
    );

}


/* =========================================================
   ADD MEMBER MODAL
========================================================= */

function openAddMemberModal() {

    openModal(`

        <h2>
            Create Member Profile
        </h2>

        <p>
            Add a new member to the Ultra Ego registry.
        </p>


        <div class="modal-form">

            <div class="field">

                <label>
                    FULL NAME
                </label>

                <input
                    id="newMemberName"
                    placeholder="e.g. Ahmed Hassan"
                >

            </div>


            <div class="field">

                <label>
                    EMAIL
                </label>

                <input
                    id="newMemberEmail"
                    placeholder="member@example.com"
                >

            </div>


            <div class="field">

                <label>
                    MEMBERSHIP
                </label>

                <select id="newMemberPlan">

                    <option>
                        CORE
                    </option>

                    <option selected>
                        PRO
                    </option>

                    <option>
                        ELITE
                    </option>

                </select>

            </div>


            <button
                class="primary-button"
                id="createMemberButton"
            >
                CREATE MEMBER
            </button>

        </div>

    `);


    $("#createMemberButton")
        .addEventListener(
            "click",
            createMember
        );

}


function createMember() {

    const name =
        $("#newMemberName")
            .value
            .trim();


    const email =
        $("#newMemberEmail")
            .value
            .trim();


    const plan =
        $("#newMemberPlan")
            .value;


    if (!name) {

        showToast(
            "Please enter the member name."
        );

        return;

    }


    const number =
        2402 +
        state.members.length;


    state.members.unshift({

        id: `UE-${number}`,

        name: name,

        email:
            email ||
            "member@ultraego.fit",

        plan: plan,

        status: "ACTIVE",

        activity: "Just now",

        area: "Main Floor"

    });


    closeModal();

    navigate("members");

    showToast(
        `${name} was added successfully.`
    );

}


/* =========================================================
   EDIT MEMBER
========================================================= */

function openMemberModal(id) {

    const member =
        state.members.find(
            (item) =>
                item.id === id
        );


    if (!member) {

        return;

    }


    openModal(`

        <h2>
            ${member.name}
        </h2>

        <p>
            ${member.id}
            ·
            ${member.email}
        </p>


        <div class="modal-form">

            <div class="field">

                <label>
                    MEMBERSHIP
                </label>

                <select id="editPlan">

                    <option
                        ${
                            member.plan === "CORE"
                                ? "selected"
                                : ""
                        }
                    >
                        CORE
                    </option>

                    <option
                        ${
                            member.plan === "PRO"
                                ? "selected"
                                : ""
                        }
                    >
                        PRO
                    </option>

                    <option
                        ${
                            member.plan === "ELITE"
                                ? "selected"
                                : ""
                        }
                    >
                        ELITE
                    </option>

                </select>

            </div>


            <div class="field">

                <label>
                    STATUS
                </label>

                <select id="editStatus">

                    <option
                        ${
                            member.status === "ACTIVE"
                                ? "selected"
                                : ""
                        }
                    >
                        ACTIVE
                    </option>

                    <option
                        ${
                            member.status === "EXPIRING"
                                ? "selected"
                                : ""
                        }
                    >
                        EXPIRING
                    </option>

                </select>

            </div>


            <button
                class="primary-button"
                id="saveMemberButton"
            >
                SAVE MEMBER
            </button>

        </div>

    `);


    $("#saveMemberButton")
        .addEventListener(
            "click",
            () => {

                member.plan =
                    $("#editPlan").value;

                member.status =
                    $("#editStatus").value;


                closeModal();

                navigate("members");

                showToast(
                    `${member.name} was updated.`
                );

            }
        );

}


/* =========================================================
   MODAL
========================================================= */

function openModal(content) {

    $("#modalContent")
        .innerHTML =
        content;


    $("#modal")
        .classList
        .remove("hidden");

}


function closeModal() {

    $("#modal")
        .classList
        .add("hidden");

}


/* =========================================================
   CLOCK
========================================================= */

function updateClock() {

    const now =
        new Date();


    $("#currentDate")
        .textContent =
        now.toLocaleDateString(
            "en-PK",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );


    $("#currentTime")
        .textContent =
        now.toLocaleTimeString(
            "en-PK",
            {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false
            }
        );

}


/* =========================================================
   TOAST
========================================================= */

function showToast(message) {

    const toast =
        document.createElement(
            "div"
        );


    toast.className =
        "toast";


    toast.textContent =
        message;


    $("#toastContainer")
        .appendChild(toast);


    setTimeout(
        () => {

            toast.remove();

        },
        2600
    );

}