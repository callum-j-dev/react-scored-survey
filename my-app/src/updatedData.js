export const specificData = [
  {
    id: 'sso',
    name: 'Single Sign On (SSO)',
    abbreviation: 'SSO',
    questions: [
      {
        id: 'sso-q1',
        questionText: 'Do you have Single Sign On (SSO) implemented in your organization where available?',
        type: 'single',
        answers: [
          {
            id: 'sso-q1-a',
            answerText: 'Yes, and rolled out to all users (6)',
            hasTextField: false,
            score: 6
          },
          {
            id: 'sso-q1-b',
            answerText: 'Yes, but only partially rolled out (3)',
            hasTextField: false,
            score: 3
          },
          {
            id: 'sso-q1-c',
            answerText: 'No, we use unsernames and passwords (0)',
            hasTextField: false,
            score: 0
          },
        ]
      }
    ],
    blurbBullets: [
      "SSO allows users to access multiple apps with one set of credentials.",
      "Reduces risk of password related vulnerabilities.",
      "Simplifies access management.",
      "Minimizes the attack surface associated with multiple login credentials."
    ],
    additionalText: ''
  },
  {
    id: 'acm',
    name: 'Access Control Measures',
    abbreviation: 'Access Control',
    type: 'multi',
    questions: [
      {
        id: 'acm-q1',
        questionText: 'Do you limit critical information only based on need-to-know, least privilege, and zero trust?',
        type: 'multi',
        answers: [
          {
            id: 'acm-q1-a',
            answerText: 'We give admin privileges to a specific group of users that need it.',
            hasTextField: false,
            score: 0
          },
          {
            id: 'acm-q1-b',
            answerText: 'We remove all default accounts from applications and appliances.',
            hasTextField: false,
            score: 0
          },
          {
            id: 'acm-q1-c',
            answerText: 'We modify default configurations',
            hasTextField: false,
            score: 0
          }
        ],
        scoringRubric: [
          {
            max: 3,
            min: 3,
            score: 8
          },
          {
            max: 2,
            min: 1,
            score: 3
          },
          {
            max: 0,
            min: 0,
            score: 0
          }
        ]
      }
    ],
    blurbBullets: [
      "Restricting access to critical information and admin privileges only to those who need it reduces the potential impact of a compromised account.",
      "This practice helps maintain data confidentiality and integrity.",
      "Major security frameworks like NIST 800-53, NIST CSF, ISO 27001 and HIPAA require access controls based on principles like least privilege, need to know, and zero trust to protect sensitive systems and data."
    ],
    additionalText: "SCORE: 3 of 3 (8), 1-2 (3), 0 (0)"
  },
  {
    id: 'pvm',
    name: 'Patch and Vulnerability Management',
    abbreviation: 'Patch & Vulnerability Management',
    questions: [
      {
        id: 'pvm-q1',
        questionText: 'Do you have a process to patch or address critical vulnerabilities?',
        type: 'single',
        answers: [
          {
            id: 'pvm-q1-a',
            answerText: 'Yes we do (4)',
            hasTextField: false,
            score: 4
          },
          {
            id: 'pvm-q1-b',
            answerText: 'No, we do not (0)',
            hasTextField: false,
            score: 0
          }
        ]
      },
      {
        id: 'pvm-q2',
        questionText: 'Within how many days do you require critical vulnerabilities to be patched?',
        type: 'text',
        answers: [
          {
            id: 'pvm-q2-q',
            answerText: '',
            hasTextField: true,
            score: 0
          }
        ]
      },
      {
        id: 'pvm-q3',
        questionText: 'Do you conduct internal and/or external PEN testing?',
        type: 'single',
        answers: [
          {
            id: 'pvm-q3-a',
            answerText: 'Yes we do (2) How often: ',
            hasTextField: true,
            score: 2
          },
          {
            id: 'pvm-q3-b',
            answerText: "No, we don't (0)",
            hasTextField: false,
            score: 0
          }
        ]
      },
      {
        id: 'pvm-q4',
        questionText: 'Do you conduct monthly vulnerability tests?',
        type: 'single',
        answers: [
          {
            id: 'pvm-q4-a',
            answerText: 'Yes, we do (2)',
            hasTextField: false,
            score: 2
          }, 
          {
            id: 'pvm-q4-b',
            answerText: 'No, we do not (0)',
            hasTextField: false,
            score: 0
          }
        ]

      }
    ],
    blurbBullets: [
      "Supports Business Continuity: Timely remediation of vulnerabilities prevents outages or compromises that could disrupt operations.",
      "Mitigates Financial Impact: Proactively addressing vulnerabilities reduces the likelihood of costly breeches or ransomware incidents.",
      "Ensures Compliance: Regular patching and vulnerability management help meet regulatory requirements, avoiding penalties and reputational damage.",
      "Prompt patching closes known vulnerabilities, minimizing the entry points attackers can exploit.",
      "Prevents Exploitation of Known Threats: Applying patches quickly prevents attackers from using publicly disclosed vulnerabilities to breach systems.",
      "Protects Sensitive Data: Effective vulnerability management safeguards critical data by addressing weaknesses before they can be targeted."
    ],
    additionalText: "*Businesses with just one unresolved critical vulnerability are 33% more likely to experience a security incident than those that address the vulnerability (Source: Coalition 2025 Cyber Claims Report)."
  }
]

export const updatedData = [
  {
    id: 0,
    name: 'Category 1',
    abbreviation: 'C1',
    questions: [
      {
        id: '0-0',
        questionText: 'Question 1',
        type: 'single',
        answers: [
          {
            id: "0-0-0",
            answerText: 'Answer a, 1pt',
            hasTextField: true,
            score: 1
          },
          {
            id: "0-0-1",
            answerText: 'Answer b, 2pt',
            hasTextField: false,
            score: 2
          },
          {
            id: "0-0-2",
            answerText: 'Answer c, 3pt',
            hasTextField: false,
            score: 3
          }
        ]
      },
      {
        id: '0-1',
        questionText: 'Question 2',
        type: 'multi',
        answers: [
          {
            id: "0-1-0",
            answerText: 'Answer a, 1pt',
            hasTextField: false,
            score: 1
          },
          {
            id: "0-1-1",
            answerText: 'Answer b, 2pt',
            hasTextField: false,
            score: 2
          },
          {
            id: "0-1-2",
            answerText: 'Answer c, 3pt',
            hasTextField: false,
            score: 3
          }
        ],
        scoringRubric: [
      {
        max: 4,
        min: 3,
        score: 8
      },
      {
        max: 2,
        min: 1,
        score: 3
      },
      {
        max: 0,
        min: 0,
        score: 0
      }
    ]
      },
      {
        id: '0-2',
        questionText: 'Question 3',
        type: 'text',
        answers: [
          {
            id: '0-2-0',
            answerText: '',
            hasTextField: true,
            score: 0
          }
        ]
      }

    ],
    blurbBullets: [
      "Blurb 1",
      "Blurb 2",
      "Blurb 3",
      "Blurb 4"
    ]
  },
  {
    id: 1,
    name: 'Category 2',
    abbreviation: 'C2',
    questions: [
      {
        id: '1-0',
        questionText: 'Question 1',
        type: 'single',
        
        answers: [
          {
            id: "1-0-0",
            answerText: 'Answer a, 1pt',
            hasTextField: false,
            score: 1
          },
          {
            id: "1-0-1",
            answerText: 'Answer b, 2pt',
            hasTextField: false,
            score: 2
          },
          {
            id: "1-0-2",
            answerText: 'Answer c, 3pt',
            hasTextField: false,
            score: 3
          }
        ]
      },
      {
        id: '1-1',
        questionText: 'Question 2',
        type: 'multi',
        answers: [
          {
            id: "1-1-0",
            answerText: 'Answer a, 1pt',
            hasTextField: false,
            score: 1
          },
          {
            id: "1-1-1",
            answerText: 'Answer b, 2pt',
            hasTextField: false,
            score: 2
          },
          {
            id: "1-1-2",
            answerText: 'Answer c, 3pt',
            hasTextField: false,
            score: 3
          }
        ],
        scoringRubric: [
          {
            max: 4,
            min: 3,
            score: 8
          },
          {
            max: 2,
            min: 1,
            score: 3
          },
          {
            max: 0,
            min: 0,
            score: 0
          }
        ]
      }
    ],
    blurbBullets: [
      "Blurb 1",
      "Blurb 2",
      "Blurb 3",
      "Blurb 4"
    ]
  }
]

// export const data = [
//   {
//     id: 0,
//     questionText: 'Question 1',
//     type: 'single',
//     answers: [
//       {
//         id: "0a",
//         answerText: 'Answer a, 1pt',
//         score: 1
//       },
//       {
//         id: "0b",
//         answerText: 'Answer b, 2pt',
//         score: 2
//       },
//       {
//         id: "0c",
//         answerText: 'Answer c, 3pt',
//         score: 3
//       }
//     ]
//   },
//   {
//     id: 1,
//     questionText: 'Question 2',
//     type: 'multi',
//     answers: [
//       {
//         id: "1a",
//         answerText: 'Answer a, 1pt',
//         score: 1
//       },
//       {
//         id: "1b",
//         answerText: 'Answer b, 2pt',
//         score: 2
//       },
//       {
//         id: "1c",
//         answerText: 'Answer c, 3pt',
//         score: 3
//       },
//     ]
//   },
//   {
//     id: 2,
//     questionText: 'Question 3',
//     type: 'single',
//     answers: [
//       {
//         id: "2a",
//         answerText: 'Answer a, 1pt',
//         score: 1
//       },
//       {
//         id: "2b",
//         answerText: 'Answer b, 2pt',
//         score: 2
//       },
//       {
//         id: "2c",
//         answerText: 'Answer c, 3pt',
//         score: 3
//       },
//     ]
//   },
// ]
