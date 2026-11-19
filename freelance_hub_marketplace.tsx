import React, { useState, useMemo, useEffect } from 'react';
import {
  Briefcase,
  Users,
  ShieldCheck,
  Wallet,
  CreditCard,
  Smartphone,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  Search,
  Filter,
  Plus,
  Send,
  Star,
  Award,
  Zap,
  Crown,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  FileText,
  MessageSquare,
  Sliders,
  Lock,
  Building2,
  Sparkles,
  ChevronRight,
  X,
  Check,
  RefreshCw,
  BarChart3,
  Globe,
  Info,
  Layers,
  BadgeCheck,
  Receipt
} from 'lucide-react';

// ============================================================================
// UTILITY FUNCTIONS & CURRENCY FORMATTER
// ============================================================================
const formatKSh = (amount) => {
  const num = Number(amount) || 0;
  return `KSh ${num.toLocaleString('en-KE', { maximumFractionDigits: 0 })}`;
};

const generateId = (prefix = 'ID') => `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;

// ============================================================================
// INITIAL SEED DATA (Realistic Kenyan & International Freelance Marketplace)
// ============================================================================
const INITIAL_JOBS = [
  {
    id: 'JOB-101',
    title: 'Full-Stack E-Commerce Website with M-Pesa Daraja Integration',
    clientName: 'Savanna Fresh Organics Ltd',
    clientLocation: 'Nairobi, Kenya',
    clientVerified: true,
    clientSpend: 185000,
    category: 'Web & Mobile Dev',
    budget: 50000,
    tier: 'Premium', // Basic (Free), Featured (500), Urgent (1000), Premium (2000)
    tierFee: 2000,
    postedAt: '2 hours ago',
    proposalsCount: 6,
    description:
      'We are looking for an experienced full-stack developer to build a modern e-commerce storefront for organic farm produce in Nairobi. Must integrate Safaricom M-Pesa STK Push for instant checkout and Pesapal/Visa for diaspora orders.',
    skills: ['React', 'Node.js', 'M-Pesa Daraja API', 'Tailwind CSS', 'PostgreSQL'],
    milestonesTemplate: [
      { title: 'UI/UX Design & Database Architecture', percentage: 30 },
      { title: 'Storefront & M-Pesa STK Integration', percentage: 40 },
      { title: 'Testing, Deployment & Handover', percentage: 30 }
    ],
    status: 'open'
  },
  {
    id: 'JOB-102',
    title: 'Corporate Brand Identity, Logo & Pitch Deck Design',
    clientName: 'RiftValley Solar Energy',
    clientLocation: 'Nakuru, Kenya',
    clientVerified: true,
    clientSpend: 92000,
    category: 'Design & Creative',
    budget: 30000,
    tier: 'Urgent',
    tierFee: 1000,
    postedAt: '4 hours ago',
    proposalsCount: 11,
    description:
      'Seeking a senior brand designer to revamp our visual identity ahead of our Series A investor roadshow. Deliverables include primary/secondary logos, brand guidelines PDF, and a 15-slide investor pitch deck.',
    skills: ['Brand Identity', 'Figma', 'Adobe Illustrator', 'Pitch Deck'],
    milestonesTemplate: [
      { title: '3 Logo Concepts & Typography System', percentage: 40 },
      { title: 'Brand Guidelines & Final Pitch Deck', percentage: 60 }
    ],
    status: 'open'
  },
  {
    id: 'JOB-103',
    title: 'SEO Content Strategy & 12 FinTech Blog Articles',
    clientName: 'PesaSmart Advisory',
    clientLocation: 'London, UK (Hiring in KE)',
    clientVerified: true,
    clientSpend: 340000,
    category: 'Writing & Content',
    budget: 24000,
    tier: 'Featured',
    tierFee: 500,
    postedAt: '1 day ago',
    proposalsCount: 8,
    description:
      'Looking for a knowledgeable East African FinTech writer to produce 12 well-researched, SEO-optimized articles covering mobile money, SME lending, and digital payments across Kenya, Uganda, and Tanzania.',
    skills: ['FinTech Writing', 'SEO Strategy', 'Research', 'Copywriting'],
    milestonesTemplate: [
      { title: 'Keyword Audit & First 6 Articles', percentage: 50 },
      { title: 'Remaining 6 Articles & SEO Meta Setup', percentage: 50 }
    ],
    status: 'open'
  },
  {
    id: 'JOB-104',
    title: 'QuickBooks Online Cleanup & KRA Tax Compliance Audit',
    clientName: 'Kilimani Dental Studio',
    clientLocation: 'Nairobi, Kenya',
    clientVerified: false,
    clientSpend: 20000,
    category: 'Accounting & Finance',
    budget: 20000,
    tier: 'Basic',
    tierFee: 0,
    postedAt: '1 day ago',
    proposalsCount: 4,
    description:
      'Need a certified CPA(K) to reconcile 6 months of M-Pesa Till and bank statements in QuickBooks Online and prepare monthly VAT/PAYE schedules.',
    skills: ['CPA(K)', 'QuickBooks', 'KRA iTax', 'Bookkeeping'],
    milestonesTemplate: [
      { title: 'Bank & M-Pesa Reconciliation', percentage: 50 },
      { title: 'Tax Schedules & Management Report', percentage: 50 }
    ],
    status: 'open'
  }
];

const INITIAL_PROPOSALS = [
  {
    id: 'PROP-201',
    jobId: 'JOB-101',
    jobTitle: 'Full-Stack E-Commerce Website with M-Pesa Daraja Integration',
    freelancerName: 'brian_kamau',
    freelancerDisplayName: 'Brian Kamau',
    freelancerTitle: 'Senior Full-Stack & M-Pesa Integration Engineer',
    freelancerRating: 4.95,
    freelancerJobsCompleted: 34,
    freelancerVerified: true,
    freelancerTier: 'Pro',
    bidAmount: 50000,
    deliveryDays: 14,
    coverLetter:
      'Habari! I have integrated Safaricom Daraja STK Push and Flutterwave split payments for 12+ Kenyan e-commerce stores. I can deliver a fast, mobile-first Next.js/React store with automated M-Pesa receipts.',
    status: 'pending',
    submittedAt: '1 hour ago'
  },
  {
    id: 'PROP-202',
    jobId: 'JOB-102',
    jobTitle: 'Corporate Brand Identity, Logo & Pitch Deck Design',
    freelancerName: 'amina_hassan',
    freelancerDisplayName: 'Amina Hassan',
    freelancerTitle: 'Lead Brand & UI/UX Designer',
    freelancerRating: 5.0,
    freelancerJobsCompleted: 28,
    freelancerVerified: true,
    freelancerTier: 'Premium',
    bidAmount: 30000,
    deliveryDays: 7,
    coverLetter:
      'Hello RiftValley Solar team! I specialize in clean-energy and FinTech brand identities across East Africa. Happy to share my recent investor pitch deck portfolio.',
    status: 'pending',
    submittedAt: '3 hours ago'
  }
];

const INITIAL_CONTRACTS = [
  {
    id: 'CON-301',
    jobId: 'JOB-099',
    jobTitle: 'Mobile SACCO Member Portal & Loan Calculator',
    clientName: 'Savanna Fresh Organics Ltd',
    freelancerName: 'Brian Kamau',
    totalAmount: 30000,
    paymentGateway: 'M-Pesa STK Push',
    createdAt: 'Nov 12, 2026',
    milestones: [
      {
        id: 'MS-1',
        title: 'Milestone 1: Portal Wireframes & Member Auth (30%)',
        amount: 9000,
        status: 'released', // unpaid | funded_escrow | submitted | released
        paidAt: 'Nov 12, 2026',
        releasedAt: 'Nov 15, 2026'
      },
      {
        id: 'MS-2',
        title: 'Milestone 2: Loan Amortization & M-Pesa Repayment API (40%)',
        amount: 12000,
        status: 'submitted', // Ready for client approval & release!
        paidAt: 'Nov 15, 2026',
        deliverableNote: 'Staging link deployed with working M-Pesa sandbox STK push & statement PDF export.'
      },
      {
        id: 'MS-3',
        title: 'Milestone 3: Production Go-Live & Staff Training (30%)',
        amount: 9000,
        status: 'unpaid'
      }
    ]
  }
];

const INITIAL_TRANSACTIONS = [
  {
    id: 'TXN-8801',
    date: 'Nov 15, 2026',
    type: 'milestone_release',
    description: 'Milestone 1 Release: Mobile SACCO Member Portal',
    gateway: 'Flutterwave Split (M-Pesa)',
    grossAmount: 9000,
    platformCommission: 900,
    freelancerNet: 8100,
    status: 'completed'
  },
  {
    id: 'TXN-8802',
    date: 'Nov 15, 2026',
    type: 'escrow_deposit',
    description: 'Milestone 2 Funded: Mobile SACCO Member Portal',
    gateway: 'M-Pesa STK Push',
    grossAmount: 12000,
    platformCommission: 0, // Recognized on release
    freelancerNet: 0,
    status: 'escrow_held'
  },
  {
    id: 'TXN-8803',
    date: 'Nov 18, 2026',
    type: 'listing_fee',
    description: 'Premium Job Listing Fee (JOB-101)',
    gateway: 'Pesapal Card',
    grossAmount: 2000,
    platformCommission: 2000,
    freelancerNet: 0,
    status: 'completed'
  },
  {
    id: 'TXN-8804',
    date: 'Nov 18, 2026',
    type: 'listing_fee',
    description: 'Urgent Job Listing Fee (JOB-102)',
    gateway: 'M-Pesa STK Push',
    grossAmount: 1000,
    platformCommission: 1000,
    freelancerNet: 0,
    status: 'completed'
  },
  {
    id: 'TXN-8805',
    date: 'Nov 19, 2026',
    type: 'subscription',
    description: 'Freelancer Pro Membership (Brian Kamau)',
    gateway: 'M-Pesa STK Push',
    grossAmount: 500,
    platformCommission: 500,
    freelancerNet: 0,
    status: 'completed'
  },
  {
    id: 'TXN-8806',
    date: 'Nov 19, 2026',
    type: 'subscription',
    description: 'Business Hiring Plan (Savanna Fresh Organics)',
    gateway: 'Visa / Mastercard',
    grossAmount: 2000,
    platformCommission: 2000,
    freelancerNet: 0,
    status: 'completed'
  }
];

const INITIAL_MESSAGES = [
  {
    id: 'MSG-1',
    contractId: 'CON-301',
    senderRole: 'client',
    senderName: 'Savanna Fresh Organics Ltd',
    text: 'Hi Brian, Milestone 2 funds (KSh 12,000) have been secured via M-Pesa STK Push. Looking forward to testing the loan calculator!',
    timestamp: 'Nov 15, 10:15 AM'
  },
  {
    id: 'MSG-2',
    contractId: 'CON-301',
    senderRole: 'freelancer',
    senderName: 'Brian Kamau',
    text: 'Thank you! I have completed the loan amortization engine and M-Pesa repayment webhook, and submitted Milestone 2 for your review.',
    timestamp: 'Nov 19, 02:40 PM'
  }
];

const INITIAL_REVIEWS = [
  {
    id: 'REV-1',
    clientName: 'Nairobi Tech Hub',
    projectTitle: 'Event Ticketing & USSD Check-in App',
    rating: 5,
    comment: 'Brian delivered ahead of schedule. The M-Pesa STK Push integration worked flawlessly during our 800-person conference.',
    date: 'Oct 28, 2026'
  },
  {
    id: 'REV-2',
    clientName: 'Mombasa Logistics Group',
    projectTitle: 'Fleet Tracking Dashboard in React',
    rating: 5,
    comment: 'Clear communication, clean code, and smooth milestone handover through Freelance Hub.',
    date: 'Sep 14, 2026'
  }
];

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================
export default function App() {
  // Active Top-Level Navigation View
  const [activeView, setActiveView] = useState('freelancer'); // 'freelancer' | 'client' | 'admin' | 'monetization' | 'payments'
  const [freelancerSubTab, setFreelancerSubTab] = useState('jobs'); // 'jobs' | 'contracts' | 'wallet' | 'membership'
  const [clientSubTab, setClientSubTab] = useState('manage'); // 'manage' | 'post' | 'subscriptions'

  // Marketplace Core State
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [proposals, setProposals] = useState(INITIAL_PROPOSALS);
  const [contracts, setContracts] = useState(INITIAL_CONTRACTS);
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);

  // Freelancer Account & Wallet State (Logged-in demo freelancer: Brian Kamau)
  const [freelancerProfile, setFreelancerProfile] = useState({
    name: 'Brian Kamau',
    title: 'Senior Full-Stack & M-Pesa Integration Engineer',
    location: 'Nairobi, Kenya',
    hourlyRate: 2500,
    tier: 'Pro', // 'Free' | 'Pro' | 'Premium'
    isFeatured: false,
    featuredDays: 0,
    isVerified: true,
    availableBalance: 8100, // From Milestone 1 (90% of 9,000)
    withdrawnTotal: 0,
    payoutRequests: []
  });

  // Client Account State (Logged-in demo client: Savanna Fresh Organics Ltd)
  const [clientProfile, setClientProfile] = useState({
    companyName: 'Savanna Fresh Organics Ltd',
    location: 'Nairobi, Kenya',
    plan: 'Business', // 'Starter' | 'Business' | 'Enterprise'
    verified: true
  });

  // Job Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTierFilter, setSelectedTierFilter] = useState('All');

  // Interactive Modals State
  const [selectedJobForProposal, setSelectedJobForProposal] = useState(null);
  const [proposalForm, setProposalForm] = useState({
    bidAmount: '',
    deliveryDays: '10',
    coverLetter: ''
  });

  // Payment Gateway Checkout Modal State
  const [paymentModal, setPaymentModal] = useState(null);
  // Structure: { title, subtitle, amount, purpose, gateway, phone, cardLast4, onSuccess }
  const [paymentStep, setPaymentStep] = useState('select'); // 'select' | 'processing' | 'success'
  const [selectedGateway, setSelectedGateway] = useState('M-Pesa STK Push');
  const [mpesaPhone, setMpesaPhone] = useState('0712 345 678');

  // Withdrawal Modal State
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [withdrawMethod, setWithdrawMethod] = useState('M-Pesa');
  const [withdrawDestination, setWithdrawDestination] = useState('0712 345 678');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  // Messaging Drawer State
  const [messageDrawerContractId, setMessageDrawerContractId] = useState(null);
  const [newMessageText, setNewMessageText] = useState('');

  // Review Modal State
  const [reviewModalContract, setReviewModalContract] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  // Post a Job Form State
  const [newJobForm, setNewJobForm] = useState({
    title: '',
    category: 'Web & Mobile Dev',
    budget: '30000',
    tier: 'Featured',
    description: '',
    skills: 'React, M-Pesa API, Node.js',
    m1Title: 'Phase 1: Discovery & Initial Prototype',
    m1Pct: 30,
    m2Title: 'Phase 2: Core Development & Review',
    m2Pct: 40,
    m3Title: 'Phase 3: Final Delivery & Handover',
    m3Pct: 30
  });

  // Admin Revenue Simulator State
  const [simProjectsPerMonth, setSimProjectsPerMonth] = useState(50);
  const [simAvgProjectValue, setSimAvgProjectValue] = useState(20000);
  const [simProFreelancers, setSimProFreelancers] = useState(200);
  const [simPremiumFreelancers, setSimPremiumFreelancers] = useState(50);
  const [simBusinessClients, setSimBusinessClients] = useState(30);
  const [simFeaturedJobs, setSimFeaturedJobs] = useState(40);

  // Toast Notification Banner
  const [toast, setToast] = useState(null);

  const triggerToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  // ============================================================================
  // COMPUTED METRICS (REAL-TIME LEDGER & WALLET AGGREGATIONS)
  // ============================================================================
  const freelancerPendingEscrow = useMemo(() => {
    let total = 0;
    contracts.forEach((c) => {
      if (c.freelancerName === freelancerProfile.name) {
        c.milestones.forEach((m) => {
          if (m.status === 'funded_escrow' || m.status === 'submitted') {
            total += m.amount * 0.9; // Freelancer's 90% share held in milestone escrow
          }
        });
      }
    });
    return total;
  }, [contracts, freelancerProfile.name]);

  const adminMetrics = useMemo(() => {
    let grossCollected = 0;
    let totalCommissions = 0;
    let totalFreelancerPayouts = 0;
    let pendingEscrow = 0;
    let completedCount = 0;

    transactions.forEach((t) => {
      if (t.status === 'completed') {
        grossCollected += t.grossAmount;
        totalCommissions += t.platformCommission;
        totalFreelancerPayouts += t.freelancerNet;
        completedCount += 1;
      } else if (t.status === 'escrow_held') {
        grossCollected += t.grossAmount;
        pendingEscrow += t.grossAmount;
      }
    });

    return {
      grossCollected,
      totalCommissions,
      totalFreelancerPayouts,
      pendingEscrow,
      completedCount
    };
  }, [transactions]);

  const filteredJobs = useMemo(() => {
    const tierOrder = { Premium: 1, Urgent: 2, Featured: 3, Basic: 4 };
    return jobs
      .filter((job) => {
        const matchesSearch =
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesCat = selectedCategory === 'All' || job.category === selectedCategory;
        const matchesTier = selectedTierFilter === 'All' || job.tier === selectedTierFilter;
        return matchesSearch && matchesCat && matchesTier;
      })
      .sort((a, b) => (tierOrder[a.tier] || 9) - (tierOrder[b.tier] || 9));
  }, [jobs, searchQuery, selectedCategory, selectedTierFilter]);

  // ============================================================================
  // INTERACTIVE WORKFLOW HANDLERS
  // ============================================================================

  // Open Payment Checkout Modal
  const initiatePayment = ({ title, subtitle, amount, purpose, onSuccess }) => {
    setPaymentStep('select');
    setSelectedGateway('M-Pesa STK Push');
    setPaymentModal({
      title,
      subtitle,
      amount: Number(amount),
      purpose,
      onSuccess
    });
  };

  // Execute Simulated Payment (M-Pesa STK Push / Flutterwave / Pesapal / Card / PayPal)
  const handleConfirmPayment = () => {
    if (!paymentModal) return;
    setPaymentStep('processing');

    setTimeout(() => {
      setPaymentStep('success');
      if (paymentModal.onSuccess) {
        paymentModal.onSuccess(selectedGateway);
      }
    }, 1400);
  };

  // Freelancer Submits Proposal
  const handleOpenProposalModal = (job) => {
    setSelectedJobForProposal(job);
    setProposalForm({
      bidAmount: String(job.budget),
      deliveryDays: '10',
      coverLetter: `Hello ${job.clientName}, I have reviewed your requirements for "${job.title}" and can deliver high-quality results across all milestones.`
    });
  };

  const handleSubmitProposal = (e) => {
    e.preventDefault();
    if (!selectedJobForProposal) return;
    const bid = Number(proposalForm.bidAmount) || selectedJobForProposal.budget;

    const newProposal = {
      id: generateId('PROP'),
      jobId: selectedJobForProposal.id,
      jobTitle: selectedJobForProposal.title,
      freelancerName: 'brian_kamau',
      freelancerDisplayName: freelancerProfile.name,
      freelancerTitle: freelancerProfile.title,
      freelancerRating: 4.95,
      freelancerJobsCompleted: 34,
      freelancerVerified: freelancerProfile.isVerified,
      freelancerTier: freelancerProfile.tier,
      bidAmount: bid,
      deliveryDays: Number(proposalForm.deliveryDays) || 7,
      coverLetter: proposalForm.coverLetter,
      status: 'pending',
      submittedAt: 'Just now'
    };

    setProposals((prev) => [newProposal, ...prev]);
    setJobs((prev) =>
      prev.map((j) =>
        j.id === selectedJobForProposal.id ? { ...j, proposalsCount: j.proposalsCount + 1 } : j
      )
    );
    setSelectedJobForProposal(null);
    triggerToast(`Proposal submitted for "${selectedJobForProposal.title}"!`);
  };

  // Client Posts a New Job (Free Basic or Paid Featured/Urgent/Premium)
  const handlePublishJob = (e) => {
    e.preventDefault();
    const tierFees = { Basic: 0, Featured: 500, Urgent: 1000, Premium: 2000 };
    const fee = tierFees[newJobForm.tier] || 0;
    const budget = Number(newJobForm.budget) || 20000;

    const finalizeJobCreation = (gatewayUsed = 'Free Basic Tier') => {
      const createdJob = {
        id: generateId('JOB'),
        title: newJobForm.title || 'Custom Web & Mobile Application',
        clientName: clientProfile.companyName,
        clientLocation: clientProfile.location,
        clientVerified: clientProfile.verified,
        clientSpend: 185000,
        category: newJobForm.category,
        budget,
        tier: newJobForm.tier,
        tierFee: fee,
        postedAt: 'Just now',
        proposalsCount: 0,
        description:
          newJobForm.description ||
          'Looking for a skilled freelancer to execute this project with clear milestone deliverables.',
        skills: newJobForm.skills
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        milestonesTemplate: [
          { title: newJobForm.m1Title, percentage: Number(newJobForm.m1Pct) },
          { title: newJobForm.m2Title, percentage: Number(newJobForm.m2Pct) },
          { title: newJobForm.m3Title, percentage: Number(newJobForm.m3Pct) }
        ],
        status: 'open'
      };

      setJobs((prev) => [createdJob, ...prev]);

      if (fee > 0) {
        setTransactions((prev) => [
          {
            id: generateId('TXN'),
            date: 'Nov 19, 2026',
            type: 'listing_fee',
            description: `${newJobForm.tier} Job Listing Fee (${createdJob.id})`,
            gateway: gatewayUsed,
            grossAmount: fee,
            platformCommission: fee,
            freelancerNet: 0,
            status: 'completed'
          },
          ...prev
        ]);
      }

      setNewJobForm({
        ...newJobForm,
        title: '',
        description: ''
      });
      setClientSubTab('manage');
      triggerToast(`Job published live to marketplace (${newJobForm.tier} Tier)!`);
    };

    if (fee > 0) {
      initiatePayment({
        title: `Publish ${newJobForm.tier} Job Listing`,
        subtitle: `${newJobForm.title || 'New Job'} • Boosted visibility & priority badge`,
        amount: fee,
        purpose: 'listing_fee',
        onSuccess: (gateway) => finalizeJobCreation(gateway)
      });
    } else {
      finalizeJobCreation();
    }
  };

  // Client Hires Freelancer & Funds Milestone 1
  const handleHireAndFundMilestone1 = (proposal) => {
    const job = jobs.find((j) => j.id === proposal.jobId);
    const templates = job?.milestonesTemplate || [
      { title: 'Milestone 1: Upfront Kickoff (30%)', percentage: 30 },
      { title: 'Milestone 2: Core Delivery (40%)', percentage: 40 },
      { title: 'Milestone 3: Final Approval (30%)', percentage: 30 }
    ];

    const builtMilestones = templates.map((t, idx) => ({
      id: `MS-${idx + 1}`,
      title: t.title,
      amount: Math.round((proposal.bidAmount * t.percentage) / 100),
      status: idx === 0 ? 'funded_escrow' : 'unpaid',
      paidAt: idx === 0 ? 'Nov 19, 2026' : null
    }));

    const firstMilestoneAmount = builtMilestones[0].amount;

    initiatePayment({
      title: `Hire ${proposal.freelancerDisplayName} & Fund Milestone 1`,
      subtitle: `${builtMilestones[0].title} • Held safely in milestone escrow until you approve`,
      amount: firstMilestoneAmount,
      purpose: 'escrow_deposit',
      onSuccess: (gateway) => {
        const newContract = {
          id: generateId('CON'),
          jobId: proposal.jobId,
          jobTitle: proposal.jobTitle,
          clientName: clientProfile.companyName,
          freelancerName: proposal.freelancerDisplayName,
          totalAmount: proposal.bidAmount,
          paymentGateway: gateway,
          createdAt: 'Nov 19, 2026',
          milestones: builtMilestones
        };

        setContracts((prev) => [newContract, ...prev]);
        setProposals((prev) =>
          prev.map((p) => (p.id === proposal.id ? { ...p, status: 'hired' } : p))
        );
        setJobs((prev) =>
          prev.map((j) => (j.id === proposal.jobId ? { ...j, status: 'in_progress' } : j))
        );

        setTransactions((prev) => [
          {
            id: generateId('TXN'),
            date: 'Nov 19, 2026',
            type: 'escrow_deposit',
            description: `Milestone 1 Escrow: ${proposal.jobTitle}`,
            gateway,
            grossAmount: firstMilestoneAmount,
            platformCommission: 0,
            freelancerNet: 0,
            status: 'escrow_held'
          },
          ...prev
        ]);

        triggerToast(
          `Hired ${proposal.freelancerDisplayName}! ${formatKSh(firstMilestoneAmount)} funded in Milestone 1 escrow.`
        );
      }
    });
  };

  // Client Funds Next Unpaid Milestone
  const handleFundMilestone = (contract, milestone) => {
    initiatePayment({
      title: `Fund ${milestone.title}`,
      subtitle: `Contract: ${contract.jobTitle} • Freelancer: ${contract.freelancerName}`,
      amount: milestone.amount,
      purpose: 'escrow_deposit',
      onSuccess: (gateway) => {
        setContracts((prev) =>
          prev.map((c) => {
            if (c.id !== contract.id) return c;
            return {
              ...c,
              milestones: c.milestones.map((m) =>
                m.id === milestone.id
                  ? { ...m, status: 'funded_escrow', paidAt: 'Nov 19, 2026' }
                  : m
              )
            };
          })
        );

        setTransactions((prev) => [
          {
            id: generateId('TXN'),
            date: 'Nov 19, 2026',
            type: 'escrow_deposit',
            description: `${milestone.title} (${contract.id})`,
            gateway,
            grossAmount: milestone.amount,
            platformCommission: 0,
            freelancerNet: 0,
            status: 'escrow_held'
          },
          ...prev
        ]);

        triggerToast(`${formatKSh(milestone.amount)} funded into milestone escrow!`);
      }
    });
  };

  // Freelancer Submits Milestone Work for Client Approval
  const handleSubmitMilestoneWork = (contractId, milestoneId) => {
    setContracts((prev) =>
      prev.map((c) => {
        if (c.id !== contractId) return c;
        return {
          ...c,
          milestones: c.milestones.map((m) =>
            m.id === milestoneId
              ? {
                  ...m,
                  status: 'submitted',
                  deliverableNote: 'Work completed and uploaded for client approval.'
                }
              : m
          )
        };
      })
    );
    triggerToast('Milestone work submitted! Client notified to review & release funds.');
  };

  // Client Approves Milestone & Releases 90% Freelancer / 10% Platform Commission Split
  const handleApproveAndReleaseMilestone = (contract, milestone) => {
    const commission = Math.round(milestone.amount * 0.1);
    const freelancerShare = milestone.amount - commission;

    setContracts((prev) =>
      prev.map((c) => {
        if (c.id !== contract.id) return c;
        return {
          ...c,
          milestones: c.milestones.map((m) =>
            m.id === milestone.id ? { ...m, status: 'released', releasedAt: 'Nov 19, 2026' } : m
          )
        };
      })
    );

    // Credit Freelancer Wallet if it's the active demo freelancer
    if (contract.freelancerName === freelancerProfile.name) {
      setFreelancerProfile((prev) => ({
        ...prev,
        availableBalance: prev.availableBalance + freelancerShare
      }));
    }

    // Update Transaction Ledger: convert escrow_held to completed split settlement
    setTransactions((prev) => [
      {
        id: generateId('TXN'),
        date: 'Nov 19, 2026',
        type: 'milestone_release',
        description: `Split Payout: ${milestone.title} (${contract.jobTitle})`,
        gateway: `${contract.paymentGateway} Split`,
        grossAmount: milestone.amount,
        platformCommission: commission,
        freelancerNet: freelancerShare,
        status: 'completed'
      },
      ...prev
    ]);

    triggerToast(
      `Approved! ${formatKSh(freelancerShare)} (90%) released to ${contract.freelancerName} & ${formatKSh(
        commission
      )} (10%) credited to Freelance Hub.`
    );
  };

  // Freelancer Withdrawal Request (M-Pesa or Bank)
  const handleWithdrawFunds = (e) => {
    e.preventDefault();
    const amt = Number(withdrawAmount);
    if (!amt || amt <= 0 || amt > freelancerProfile.availableBalance) {
      triggerToast('Enter a valid amount within your available balance.', 'error');
      return;
    }

    const request = {
      id: generateId('WDR'),
      date: 'Nov 19, 2026',
      method: withdrawMethod,
      destination: withdrawDestination,
      amount: amt,
      status: 'Processed via Instant Payout'
    };

    setFreelancerProfile((prev) => ({
      ...prev,
      availableBalance: prev.availableBalance - amt,
      withdrawnTotal: prev.withdrawnTotal + amt,
      payoutRequests: [request, ...prev.payoutRequests]
    }));

    setWithdrawModalOpen(false);
    setWithdrawAmount('');
    triggerToast(`${formatKSh(amt)} sent to ${withdrawMethod} (${withdrawDestination})!`);
  };

  // Upgrade Freelancer Membership / Add-ons
  const handlePurchaseFreelancerPlan = (planName, price, isAddon = false) => {
    if (price === 0) {
      setFreelancerProfile((prev) => ({ ...prev, tier: planName }));
      triggerToast(`Switched to ${planName} account.`);
      return;
    }

    initiatePayment({
      title: isAddon ? `Add-on: ${planName}` : `Upgrade to Freelancer ${planName}`,
      subtitle: 'Instant activation & priority visibility in client searches',
      amount: price,
      purpose: 'subscription',
      onSuccess: (gateway) => {
        if (isAddon) {
          if (planName.includes('Verified')) {
            setFreelancerProfile((prev) => ({ ...prev, isVerified: true }));
          } else {
            setFreelancerProfile((prev) => ({
              ...prev,
              isFeatured: true,
              featuredDays: planName.includes('30') ? 30 : 7
            }));
          }
        } else {
          setFreelancerProfile((prev) => ({ ...prev, tier: planName }));
        }

        setTransactions((prev) => [
          {
            id: generateId('TXN'),
            date: 'Nov 19, 2026',
            type: 'subscription',
            description: `${planName} (${freelancerProfile.name})`,
            gateway,
            grossAmount: price,
            platformCommission: price,
            freelancerNet: 0,
            status: 'completed'
          },
          ...prev
        ]);

        triggerToast(`${planName} activated!`);
      }
    });
  };

  // Upgrade Client Business Plan
  const handlePurchaseClientPlan = (planName, price) => {
    if (price === 0) {
      setClientProfile((prev) => ({ ...prev, plan: planName }));
      return;
    }
    initiatePayment({
      title: `Subscribe to ${planName} Hiring Plan`,
      subtitle: 'Unlimited job posts, candidate shortlisting & dedicated support',
      amount: price,
      purpose: 'subscription',
      onSuccess: (gateway) => {
        setClientProfile((prev) => ({ ...prev, plan: planName }));
        setTransactions((prev) => [
          {
            id: generateId('TXN'),
            date: 'Nov 19, 2026',
            type: 'subscription',
            description: `${planName} Client Subscription (${clientProfile.companyName})`,
            gateway,
            grossAmount: price,
            platformCommission: price,
            freelancerNet: 0,
            status: 'completed'
          },
          ...prev
        ]);
        triggerToast(`Upgraded to ${planName} Plan!`);
      }
    });
  };

  // Send Contract Message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessageText.trim() || !messageDrawerContractId) return;

    const senderRole = activeView === 'client' ? 'client' : 'freelancer';
    const senderName =
      senderRole === 'client' ? clientProfile.companyName : freelancerProfile.name;

    setMessages((prev) => [
      ...prev,
      {
        id: generateId('MSG'),
        contractId: messageDrawerContractId,
        senderRole,
        senderName,
        text: newMessageText.trim(),
        timestamp: 'Just now'
      }
    ]);
    setNewMessageText('');
  };

  // Submit Client Review
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!reviewModalContract) return;
    setReviews((prev) => [
      {
        id: generateId('REV'),
        clientName: reviewModalContract.clientName,
        projectTitle: reviewModalContract.jobTitle,
        rating: reviewRating,
        comment: reviewComment || 'Great collaboration and reliable delivery!',
        date: 'Nov 19, 2026'
      },
      ...prev
    ]);
    setReviewModalContract(null);
    setReviewComment('');
    triggerToast('Verified review published to freelancer profile!');
  };

  // ============================================================================
  // RENDER HELPERS
  // ============================================================================
  const getTierBadge = (tier) => {
    switch (tier) {
      case 'Premium':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">
            <Crown className="w-3.5 h-3.5 text-amber-600" /> Premium
          </span>
        );
      case 'Urgent':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-300">
            <Zap className="w-3.5 h-3.5 text-rose-600" /> Urgent
          </span>
        );
      case 'Featured':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Featured
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
            Basic
          </span>
        );
    }
  };

  // ============================================================================
  // MAIN UI LAYOUT
  // ============================================================================
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 max-w-md animate-bounce">
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border ${
              toast.type === 'error'
                ? 'bg-rose-900 text-white border-rose-700'
                : 'bg-slate-900 text-white border-emerald-500/40'
            }`}
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <p className="text-sm font-medium">{toast.message}</p>
          </div>
        </div>
      )}

      {/* TOP NAVIGATION & ROLE SWITCHER */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3 gap-3">
            {/* Brand Logo */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl font-extrabold tracking-tight text-slate-900">
                      Freelance<span className="text-emerald-600">Hub</span>
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                      KE & Global
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">Milestone Escrow & Split-Payment Marketplace</p>
                </div>
              </div>
            </div>

            {/* Role & Section Switcher */}
            <nav className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
              {[
                { id: 'freelancer', label: 'Freelancer View', icon: Users },
                { id: 'client', label: 'Client View', icon: Building2 },
                { id: 'admin', label: 'Owner / Admin', icon: ShieldCheck },
                { id: 'monetization', label: 'Revenue Model', icon: TrendingUp },
                { id: 'payments', label: 'Payment Flow', icon: CreditCard }
              ].map((tab) => {
                const Icon = tab.icon;
                const active = activeView === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveView(tab.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                      active
                        ? 'bg-white text-emerald-700 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* ===================================================================== */}
        {/* VIEW 1: FREELANCER MARKETPLACE, CONTRACTS, WALLET & SUBSCRIPTIONS     */}
        {/* ===================================================================== */}
        {activeView === 'freelancer' && (
          <div className="space-y-6">
            {/* Freelancer Top Summary Banner */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-xl font-bold shrink-0">
                  BK
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-lg sm:text-xl font-bold text-slate-900">
                      {freelancerProfile.name}
                    </h1>
                    {freelancerProfile.isVerified && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        <BadgeCheck className="w-3.5 h-3.5" /> Verified Pro
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <Crown className="w-3.5 h-3.5" /> {freelancerProfile.tier} Plan
                    </span>
                    {freelancerProfile.isFeatured && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                        <Sparkles className="w-3.5 h-3.5" /> Featured ({freelancerProfile.featuredDays}d)
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 mt-0.5">{freelancerProfile.title}</p>
                  <div className="flex flex-wrap items-center gap-4 mt-1.5 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> 4.95 (34 jobs)
                    </span>
                    <span>{freelancerProfile.location}</span>
                    <span>Rate: {formatKSh(freelancerProfile.hourlyRate)}/hr</span>
                  </div>
                </div>
              </div>

              {/* Freelancer Wallet Quick Card */}
              <div className="flex flex-wrap items-center gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div>
                  <p className="text-xs text-slate-500 font-medium">Available Wallet</p>
                  <p className="text-xl font-extrabold text-emerald-700">
                    {formatKSh(freelancerProfile.availableBalance)}
                  </p>
                </div>
                <div className="h-8 w-px bg-slate-200 hidden sm:block" />
                <div>
                  <p className="text-xs text-slate-500 font-medium">In Milestone Escrow (90%)</p>
                  <p className="text-base font-bold text-slate-800">
                    {formatKSh(freelancerPendingEscrow)}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setWithdrawAmount(String(freelancerProfile.availableBalance));
                    setWithdrawModalOpen(true);
                  }}
                  className="ml-auto sm:ml-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <Smartphone className="w-4 h-4" /> Withdraw M-Pesa/Bank
                </button>
              </div>
            </div>

            {/* Freelancer Sub-Navigation */}
            <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
              {[
                { id: 'jobs', label: `Browse Jobs (${filteredJobs.length})` },
                { id: 'contracts', label: `My Contracts & Proposals (${contracts.length})` },
                { id: 'wallet', label: 'Earnings Ledger & Reviews' },
                { id: 'membership', label: 'Pro Plans & Featured Boosts' }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setFreelancerSubTab(t.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                    freelancerSubTab === t.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* SUB-TAB: BROWSE JOBS */}
            {freelancerSubTab === 'jobs' && (
              <div className="space-y-4">
                {/* Search & Filters */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search jobs by title, React, M-Pesa, CPA, SEO..."
                      className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3.5 py-2 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="All">All Categories</option>
                    <option value="Web & Mobile Dev">Web & Mobile Dev</option>
                    <option value="Design & Creative">Design & Creative</option>
                    <option value="Writing & Content">Writing & Content</option>
                    <option value="Accounting & Finance">Accounting & Finance</option>
                  </select>
                  <select
                    value={selectedTierFilter}
                    onChange={(e) => setSelectedTierFilter(e.target.value)}
                    className="px-3.5 py-2 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="All">All Listing Tiers</option>
                    <option value="Premium">Premium Listings</option>
                    <option value="Urgent">Urgent Listings</option>
                    <option value="Featured">Featured Listings</option>
                    <option value="Basic">Basic (Free) Listings</option>
                  </select>
                </div>

                {/* Job Cards */}
                <div className="grid grid-cols-1 gap-4">
                  {filteredJobs.map((job) => {
                    const alreadyApplied = proposals.some(
                      (p) => p.jobId === job.id && p.freelancerDisplayName === freelancerProfile.name
                    );
                    const estNet = Math.round(job.budget * 0.9);
                    return (
                      <div
                        key={job.id}
                        className={`bg-white rounded-2xl border p-5 shadow-sm transition-all hover:shadow-md ${
                          job.tier === 'Premium'
                            ? 'border-amber-300 ring-1 ring-amber-200/60'
                            : 'border-slate-200'
                        }`}
                      >
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div className="space-y-2 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              {getTierBadge(job.tier)}
                              <span className="text-xs font-medium text-slate-500">
                                {job.category} • Posted {job.postedAt}
                              </span>
                              {job.status === 'in_progress' && (
                                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                                  Hired / In Progress
                                </span>
                              )}
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">{job.description}</p>
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {job.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-500">
                              <span className="font-semibold text-slate-700 flex items-center gap-1">
                                {job.clientName}
                                {job.clientVerified && (
                                  <BadgeCheck className="w-4 h-4 text-emerald-600" />
                                )}
                              </span>
                              <span>{job.clientLocation}</span>
                              <span>Client Spent: {formatKSh(job.clientSpend)}+</span>
                              <span>{job.proposalsCount} proposals</span>
                            </div>
                          </div>

                          <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-3 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 shrink-0">
                            <div className="md:text-right">
                              <p className="text-xs text-slate-500">Fixed Milestone Budget</p>
                              <p className="text-xl font-extrabold text-slate-900">
                                {formatKSh(job.budget)}
                              </p>
                              <p className="text-xs text-emerald-700 font-medium">
                                You take home {formatKSh(estNet)} (90%)
                              </p>
                            </div>
                            <button
                              disabled={alreadyApplied || job.status !== 'open'}
                              onClick={() => handleOpenProposalModal(job)}
                              className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                                alreadyApplied
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                                  : job.status !== 'open'
                                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                              }`}
                            >
                              {alreadyApplied ? 'Proposal Sent ✓' : 'Submit Proposal'}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SUB-TAB: FREELANCER CONTRACTS & PROPOSALS */}
            {freelancerSubTab === 'contracts' && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-lg font-bold text-slate-900">Active Milestone Contracts</h2>
                  {contracts.map((contract) => (
                    <div
                      key={contract.id}
                      className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                              {contract.id}
                            </span>
                            <span className="text-xs text-slate-500">
                              Client: <strong>{contract.clientName}</strong>
                            </span>
                          </div>
                          <h3 className="text-base font-bold text-slate-900 mt-1">
                            {contract.jobTitle}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setMessageDrawerContractId(contract.id)}
                            className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5"
                          >
                            <MessageSquare className="w-4 h-4 text-emerald-600" /> Messages
                          </button>
                        </div>
                      </div>

                      {/* Milestones List */}
                      <div className="space-y-2.5">
                        {contract.milestones.map((m) => (
                          <div
                            key={m.id}
                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200"
                          >
                            <div>
                              <p className="text-sm font-semibold text-slate-900">{m.title}</p>
                              <p className="text-xs text-slate-500 mt-0.5">
                                Milestone Value: <strong>{formatKSh(m.amount)}</strong> • Your 90%
                                Payout: <strong className="text-emerald-700">{formatKSh(m.amount * 0.9)}</strong>
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              {m.status === 'released' && (
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                                  Paid & Released ✓
                                </span>
                              )}
                              {m.status === 'submitted' && (
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                                  Awaiting Client Approval
                                </span>
                              )}
                              {m.status === 'funded_escrow' && (
                                <button
                                  onClick={() => handleSubmitMilestoneWork(contract.id, m.id)}
                                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold"
                                >
                                  Submit Work for Approval
                                </button>
                              )}
                              {m.status === 'unpaid' && (
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-200 text-slate-600">
                                  Not Yet Funded by Client
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Submitted Proposals */}
                <div className="space-y-3">
                  <h2 className="text-lg font-bold text-slate-900">My Submitted Proposals</h2>
                  {proposals
                    .filter((p) => p.freelancerDisplayName === freelancerProfile.name)
                    .map((prop) => (
                      <div
                        key={prop.id}
                        className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                      >
                        <div>
                          <p className="font-bold text-sm text-slate-900">{prop.jobTitle}</p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Bid: <strong>{formatKSh(prop.bidAmount)}</strong> • Delivery:{' '}
                            {prop.deliveryDays} days • Submitted {prop.submittedAt}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold self-start sm:self-center ${
                            prop.status === 'hired'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-blue-50 text-blue-700'
                          }`}
                        >
                          {prop.status === 'hired' ? 'Hired ✓' : 'Under Client Review'}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* SUB-TAB: WALLET LEDGER & VERIFIED REVIEWS */}
            {freelancerSubTab === 'wallet' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-bold text-slate-900">
                      Payout & Withdrawal History
                    </h2>
                    <span className="text-xs text-slate-500">
                      Total Withdrawn: {formatKSh(freelancerProfile.withdrawnTotal)}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-800">
                    Ledger backed by regulated split-payment settlement partners (Flutterwave /
                    Safaricom M-Pesa).
                  </div>
                  {freelancerProfile.payoutRequests.length === 0 ? (
                    <p className="text-sm text-slate-500 py-6 text-center">
                      No withdrawals yet. Click <strong>Withdraw M-Pesa/Bank</strong> above to test
                      an instant payout!
                    </p>
                  ) : (
                    <div className="space-y-2.5">
                      {freelancerProfile.payoutRequests.map((w) => (
                        <div
                          key={w.id}
                          className="p-3 rounded-xl border border-slate-200 flex items-center justify-between"
                        >
                          <div>
                            <p className="text-sm font-bold text-slate-900">
                              {w.method} • {w.destination}
                            </p>
                            <p className="text-xs text-slate-500">
                              {w.id} • {w.date}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-extrabold text-emerald-700">
                              -{formatKSh(w.amount)}
                            </p>
                            <p className="text-[11px] text-emerald-600 font-medium">{w.status}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Verified Client Reviews */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                  <h2 className="text-base font-bold text-slate-900">
                    Verified Client Reviews ({reviews.length})
                  </h2>
                  <div className="space-y-3">
                    {reviews.map((rev) => (
                      <div key={rev.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-bold text-slate-900">{rev.projectTitle}</p>
                          <div className="flex items-center gap-0.5 text-amber-500">
                            {Array.from({ length: rev.rating }).map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 mt-1.5">"{rev.comment}"</p>
                        <p className="text-[11px] text-slate-400 mt-1.5">
                          {rev.clientName} • {rev.date}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB: FREELANCER SUBSCRIPTIONS & FEATURED BOOSTS */}
            {freelancerSubTab === 'membership' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {[
                    {
                      name: 'Free',
                      price: 0,
                      desc: 'Genuine opportunity to find work without paying.',
                      features: [
                        'Create full freelancer profile',
                        'Browse all marketplace jobs',
                        'Up to 10 proposals per month',
                        'Standard search placement'
                      ]
                    },
                    {
                      name: 'Pro',
                      price: 500,
                      popular: true,
                      desc: 'Ideal for active freelancers scaling monthly clients.',
                      features: [
                        '50 job proposals per month',
                        'Priority profile visibility in bids',
                        'Instant SMS/Email job alerts',
                        'Expanded portfolio showcase'
                      ]
                    },
                    {
                      name: 'Premium',
                      price: 1000,
                      desc: 'Maximum exposure & top-of-list client placement.',
                      features: [
                        'Unlimited job proposals',
                        'Featured freelancer badge',
                        'Proposal win-rate analytics',
                        'Priority dispute & payout support'
                      ]
                    }
                  ].map((plan) => {
                    const isCurrent = freelancerProfile.tier === plan.name;
                    return (
                      <div
                        key={plan.name}
                        className={`bg-white rounded-2xl border p-6 shadow-sm flex flex-col justify-between ${
                          plan.popular ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-slate-200'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-slate-900">{plan.name} Account</h3>
                            {plan.popular && (
                              <span className="text-[11px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                                Most Popular
                              </span>
                            )}
                          </div>
                          <p className="text-2xl font-extrabold text-slate-900 mt-3">
                            {plan.price === 0 ? 'KSh 0' : `${formatKSh(plan.price)}/mo`}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">{plan.desc}</p>
                          <ul className="mt-4 space-y-2 text-sm text-slate-700">
                            {plan.features.map((f) => (
                              <li key={f} className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <button
                          onClick={() => handlePurchaseFreelancerPlan(plan.name, plan.price)}
                          className={`mt-6 w-full py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                            isCurrent
                              ? 'bg-slate-100 text-slate-600 cursor-default'
                              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          }`}
                        >
                          {isCurrent
                            ? 'Current Active Plan'
                            : plan.price === 0
                            ? 'Switch to Free'
                            : `Subscribe (${formatKSh(plan.price)})`}
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Profile Boosts & Verification Add-ons */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                  <h3 className="text-base font-bold text-slate-900 mb-3">
                    One-Time Profile Visibility Boosts & Verification
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { title: 'Featured Profile (7 Days)', price: 300 },
                      { title: 'Featured Profile (30 Days)', price: 800 },
                      { title: 'Verified ID & Skills Badge', price: 500 }
                    ].map((addon) => (
                      <div
                        key={addon.title}
                        className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3"
                      >
                        <div>
                          <p className="text-sm font-bold text-slate-900">{addon.title}</p>
                          <p className="text-xs font-semibold text-emerald-700">
                            {formatKSh(addon.price)}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            handlePurchaseFreelancerPlan(addon.title, addon.price, true)
                          }
                          className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold"
                        >
                          Activate
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===================================================================== */}
        {/* VIEW 2: CLIENT DASHBOARD (HIRE, MILESTONE ESCROW & POST A JOB)        */}
        {/* ===================================================================== */}
        {activeView === 'client' && (
          <div className="space-y-6">
            {/* Client Header */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-slate-900">{clientProfile.companyName}</h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {clientProfile.plan} Hiring Plan
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {clientProfile.location} • Post jobs for free or boost visibility, fund milestones
                  safely, and approve work before payout.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setClientSubTab('manage')}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold ${
                    clientSubTab === 'manage'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Contracts & Proposals
                </button>
                <button
                  onClick={() => setClientSubTab('post')}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5 ${
                    clientSubTab === 'post'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                  }`}
                >
                  <Plus className="w-4 h-4" /> Post a New Job
                </button>
                <button
                  onClick={() => setClientSubTab('subscriptions')}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold ${
                    clientSubTab === 'subscriptions'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Business Plans
                </button>
              </div>
            </div>

            {/* CLIENT SUB-TAB: MANAGE CONTRACTS & PROPOSALS */}
            {clientSubTab === 'manage' && (
              <div className="space-y-6">
                {/* Active Contracts & Milestone Escrow Approvals */}
                <div className="space-y-4">
                  <h2 className="text-lg font-bold text-slate-900">
                    Active Contracts & Milestone Escrow Approvals
                  </h2>
                  {contracts.map((contract) => (
                    <div
                      key={contract.id}
                      className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-3">
                        <div>
                          <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                            {contract.id} • Paid via {contract.paymentGateway}
                          </span>
                          <h3 className="text-base font-bold text-slate-900 mt-1">
                            {contract.jobTitle}
                          </h3>
                          <p className="text-xs text-slate-500">
                            Hired Freelancer: <strong>{contract.freelancerName}</strong> • Total
                            Contract: <strong>{formatKSh(contract.totalAmount)}</strong>
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setMessageDrawerContractId(contract.id)}
                            className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5"
                          >
                            <MessageSquare className="w-4 h-4 text-emerald-600" /> Chat
                          </button>
                          <button
                            onClick={() => setReviewModalContract(contract)}
                            className="px-3 py-1.5 rounded-xl border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold flex items-center gap-1.5"
                          >
                            <Star className="w-3.5 h-3.5" /> Leave Review
                          </button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {contract.milestones.map((m) => {
                          const platformCut = Math.round(m.amount * 0.1);
                          const freelancerCut = m.amount - platformCut;
                          return (
                            <div
                              key={m.id}
                              className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3"
                            >
                              <div className="space-y-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <p className="text-sm font-bold text-slate-900">{m.title}</p>
                                  <span className="text-xs font-bold text-slate-700">
                                    ({formatKSh(m.amount)})
                                  </span>
                                </div>
                                <p className="text-xs text-slate-500">
                                  Split on Approval: Freelancer receives{' '}
                                  <strong className="text-emerald-700">
                                    {formatKSh(freelancerCut)} (90%)
                                  </strong>{' '}
                                  • Freelance Hub fee:{' '}
                                  <strong>{formatKSh(platformCut)} (10%)</strong>
                                </p>
                                {m.deliverableNote && (
                                  <p className="text-xs text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 inline-block mt-1">
                                    Deliverable: {m.deliverableNote}
                                  </p>
                                )}
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                {m.status === 'released' && (
                                  <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                                    Approved & Split Paid ✓
                                  </span>
                                )}
                                {m.status === 'submitted' && (
                                  <button
                                    onClick={() => handleApproveAndReleaseMilestone(contract, m)}
                                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-colors"
                                  >
                                    Approve & Release Funds
                                  </button>
                                )}
                                {m.status === 'funded_escrow' && (
                                  <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                                    Funded in Escrow (Work in Progress)
                                  </span>
                                )}
                                {m.status === 'unpaid' && (
                                  <button
                                    onClick={() => handleFundMilestone(contract, m)}
                                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold"
                                  >
                                    Fund Milestone ({formatKSh(m.amount)})
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Incoming Freelancer Proposals */}
                <div className="space-y-3">
                  <h2 className="text-lg font-bold text-slate-900">
                    Incoming Freelancer Proposals ({proposals.filter((p) => p.status === 'pending').length})
                  </h2>
                  {proposals
                    .filter((p) => p.status === 'pending')
                    .map((prop) => (
                      <div
                        key={prop.id}
                        className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                      >
                        <div className="space-y-1.5 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-bold text-base text-slate-900">
                              {prop.freelancerDisplayName}
                            </span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                              {prop.freelancerTier}
                            </span>
                            <span className="text-xs text-amber-600 font-semibold flex items-center gap-0.5">
                              <Star className="w-3.5 h-3.5 fill-amber-500" /> {prop.freelancerRating}
                            </span>
                          </div>
                          <p className="text-xs font-medium text-slate-500">
                            Applying for: <strong className="text-slate-800">{prop.jobTitle}</strong>
                          </p>
                          <p className="text-sm text-slate-600">"{prop.coverLetter}"</p>
                        </div>
                        <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end gap-2 shrink-0">
                          <div className="md:text-right">
                            <p className="text-lg font-extrabold text-slate-900">
                              {formatKSh(prop.bidAmount)}
                            </p>
                            <p className="text-xs text-slate-500">in {prop.deliveryDays} days</p>
                          </div>
                          <button
                            onClick={() => handleHireAndFundMilestone1(prop)}
                            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm"
                          >
                            Hire & Fund Milestone 1
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* CLIENT SUB-TAB: POST A NEW JOB */}
            {clientSubTab === 'post' && (
              <form
                onSubmit={handlePublishJob}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5 max-w-3xl"
              >
                <h2 className="text-lg font-bold text-slate-900">
                  Publish a New Job Opportunity
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">Job Title</label>
                    <input
                      type="text"
                      required
                      value={newJobForm.title}
                      onChange={(e) => setNewJobForm({ ...newJobForm, title: e.target.value })}
                      placeholder="e.g. Build Corporate Website with M-Pesa Checkout"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                    <select
                      value={newJobForm.category}
                      onChange={(e) => setNewJobForm({ ...newJobForm, category: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm bg-white"
                    >
                      <option>Web & Mobile Dev</option>
                      <option>Design & Creative</option>
                      <option>Writing & Content</option>
                      <option>Accounting & Finance</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Total Project Budget (KSh)
                    </label>
                    <input
                      type="number"
                      min="1000"
                      required
                      value={newJobForm.budget}
                      onChange={(e) => setNewJobForm({ ...newJobForm, budget: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Project Scope & Deliverables
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={newJobForm.description}
                    onChange={(e) => setNewJobForm({ ...newJobForm, description: e.target.value })}
                    placeholder="Describe deliverables, timeline, and required expertise..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>

                {/* Job Listing Package Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Select Job Listing Package (Platform Revenue Stream #2)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      { tier: 'Basic', price: 0, desc: 'Standard marketplace listing' },
                      { tier: 'Featured', price: 500, desc: 'Highlighted badge & higher rank' },
                      { tier: 'Urgent', price: 1000, desc: 'Urgent tag + instant freelancer alert' },
                      { tier: 'Premium', price: 2000, desc: 'Top pinned placement + verified badge' }
                    ].map((pkg) => {
                      const selected = newJobForm.tier === pkg.tier;
                      return (
                        <button
                          type="button"
                          key={pkg.tier}
                          onClick={() => setNewJobForm({ ...newJobForm, tier: pkg.tier })}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            selected
                              ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-500/20'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <p className="text-sm font-bold text-slate-900">{pkg.tier}</p>
                          <p className="text-base font-extrabold text-emerald-700 mt-0.5">
                            {pkg.price === 0 ? 'Free' : formatKSh(pkg.price)}
                          </p>
                          <p className="text-[11px] text-slate-500 mt-1">{pkg.desc}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setClientSubTab('manage')}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-sm"
                  >
                    {newJobForm.tier === 'Basic'
                      ? 'Publish Free Job'
                      : `Proceed to Checkout & Publish (${newJobForm.tier})`}
                  </button>
                </div>
              </form>
            )}

            {/* CLIENT SUB-TAB: BUSINESS SUBSCRIPTIONS */}
            {clientSubTab === 'subscriptions' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  {
                    name: 'Starter',
                    price: 0,
                    desc: 'Pay-as-you-go hiring for occasional projects.',
                    features: ['Free basic job postings', 'Milestone escrow protection', 'Standard support']
                  },
                  {
                    name: 'Business',
                    price: 2000,
                    popular: true,
                    desc: 'For growing companies hiring freelancers every month.',
                    features: [
                      'Unlimited featured job boosts',
                      'Candidate shortlisting tools',
                      'Company employer branding',
                      'Monthly hiring & spend analytics'
                    ]
                  },
                  {
                    name: 'Enterprise',
                    price: 5000,
                    desc: 'Custom procurement, multi-team seats & dedicated manager.',
                    features: [
                      'Dedicated account manager',
                      'Custom milestone & invoicing workflows',
                      'Priority talent vetting',
                      'API & bulk payout support'
                    ]
                  }
                ].map((plan) => {
                  const active = clientProfile.plan === plan.name;
                  return (
                    <div
                      key={plan.name}
                      className={`bg-white rounded-2xl border p-6 shadow-sm flex flex-col justify-between ${
                        plan.popular ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-slate-200'
                      }`}
                    >
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{plan.name} Package</h3>
                        <p className="text-2xl font-extrabold text-slate-900 mt-2">
                          {plan.price === 0 ? 'Free' : `${formatKSh(plan.price)}/mo`}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">{plan.desc}</p>
                        <ul className="mt-4 space-y-2 text-sm text-slate-700">
                          {plan.features.map((f) => (
                            <li key={f} className="flex items-center gap-2">
                              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <button
                        onClick={() => handlePurchaseClientPlan(plan.name, plan.price)}
                        className={`mt-6 w-full py-2.5 rounded-xl text-sm font-semibold ${
                          active
                            ? 'bg-slate-100 text-slate-600'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        }`}
                      >
                        {active ? 'Active Plan' : `Select ${plan.name}`}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ===================================================================== */}
        {/* VIEW 3: OWNER / ADMIN DASHBOARD & INTERACTIVE REVENUE SIMULATOR       */}
        {/* ===================================================================== */}
        {activeView === 'admin' && (
          <div className="space-y-6">
            {/* Live Platform Financial KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <p className="text-xs font-semibold text-slate-500 uppercase">
                  Total Gross Volume Collected
                </p>
                <p className="text-2xl font-extrabold text-slate-900 mt-1">
                  {formatKSh(adminMetrics.grossCollected)}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Across M-Pesa, Flutterwave, Pesapal & Cards
                </p>
              </div>
              <div className="bg-emerald-900 text-white rounded-2xl p-5 shadow-sm">
                <p className="text-xs font-semibold text-emerald-200 uppercase">
                  Platform Revenue Earned
                </p>
                <p className="text-2xl font-extrabold mt-1">
                  {formatKSh(adminMetrics.totalCommissions)}
                </p>
                <p className="text-xs text-emerald-200 mt-1">
                  10% Job Commissions + Listings + Subscriptions
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <p className="text-xs font-semibold text-slate-500 uppercase">
                  Freelancer Net Payouts (90%)
                </p>
                <p className="text-2xl font-extrabold text-slate-900 mt-1">
                  {formatKSh(adminMetrics.totalFreelancerPayouts)}
                </p>
                <p className="text-xs text-emerald-600 font-medium mt-1">
                  Released directly via split settlement
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <p className="text-xs font-semibold text-slate-500 uppercase">
                  Funds Held in Milestone Escrow
                </p>
                <p className="text-2xl font-extrabold text-amber-600 mt-1">
                  {formatKSh(adminMetrics.pendingEscrow)}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Awaiting client milestone approval
                </p>
              </div>
            </div>

            {/* Interactive Platform Revenue & Scale Simulator */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-emerald-600" /> Interactive Platform Revenue &
                    Scale Simulator
                  </h2>
                  <p className="text-xs text-slate-500">
                    Model monthly and annual Freelance Hub earnings across commissions, listings,
                    and subscriptions.
                  </p>
                </div>
                <div className="flex gap-2">
                  {[10, 50, 100, 500].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => {
                        setSimProjectsPerMonth(preset);
                        setSimAvgProjectValue(20000);
                      }}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-slate-700"
                    >
                      {preset} jobs/mo
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Sliders */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Completed Projects / Month</span>
                      <span className="text-emerald-700">{simProjectsPerMonth} projects</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="600"
                      step="5"
                      value={simProjectsPerMonth}
                      onChange={(e) => setSimProjectsPerMonth(Number(e.target.value))}
                      className="w-full accent-emerald-600"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Average Project Value</span>
                      <span className="text-emerald-700">{formatKSh(simAvgProjectValue)}</span>
                    </div>
                    <input
                      type="range"
                      min="5000"
                      max="100000"
                      step="5000"
                      value={simAvgProjectValue}
                      onChange={(e) => setSimAvgProjectValue(Number(e.target.value))}
                      className="w-full accent-emerald-600"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Freelancer Pro Subscribers (KSh 500/mo)</span>
                      <span className="text-emerald-700">{simProFreelancers} freelancers</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      step="10"
                      value={simProFreelancers}
                      onChange={(e) => setSimProFreelancers(Number(e.target.value))}
                      className="w-full accent-emerald-600"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Freelancer Premium (KSh 1,000/mo) & Business Plans (KSh 2,000/mo)</span>
                      <span className="text-emerald-700">
                        {simPremiumFreelancers} Prem / {simBusinessClients} Biz
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="range"
                        min="0"
                        max="300"
                        step="5"
                        value={simPremiumFreelancers}
                        onChange={(e) => setSimPremiumFreelancers(Number(e.target.value))}
                        className="w-full accent-emerald-600"
                      />
                      <input
                        type="range"
                        min="0"
                        max="200"
                        step="5"
                        value={simBusinessClients}
                        onChange={(e) => setSimBusinessClients(Number(e.target.value))}
                        className="w-full accent-emerald-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Projected Output Card */}
                {(() => {
                  const commRev = simProjectsPerMonth * simAvgProjectValue * 0.1;
                  const subRev =
                    simProFreelancers * 500 +
                    simPremiumFreelancers * 1000 +
                    simBusinessClients * 2000;
                  const listingRev = simFeaturedJobs * 500;
                  const totalMonthly = commRev + subRev + listingRev;

                  return (
                    <div className="bg-slate-900 text-white rounded-2xl p-5 flex flex-col justify-between space-y-4">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-emerald-400 font-bold">
                          Projected Monthly Platform Revenue
                        </p>
                        <p className="text-3xl font-extrabold mt-1">{formatKSh(totalMonthly)}</p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Annualized Run Rate: {formatKSh(totalMonthly * 12)} (before gateway fees &
                          taxes)
                        </p>
                      </div>
                      <div className="space-y-2 text-xs border-t border-slate-800 pt-3">
                        <div className="flex justify-between">
                          <span className="text-slate-300">10% Project Commissions:</span>
                          <span className="font-bold text-emerald-400">{formatKSh(commRev)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-300">Recurring Subscriptions (Pro/Biz):</span>
                          <span className="font-bold text-emerald-400">{formatKSh(subRev)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-300">Featured Job Listings (40/mo):</span>
                          <span className="font-bold text-emerald-400">
                            {formatKSh(listingRev)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Live Split-Settlement Transaction Ledger */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm overflow-x-auto">
              <h2 className="text-base font-bold text-slate-900 mb-3">
                Live Split-Settlement & Platform Ledger
              </h2>
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="py-2.5 px-3">Txn ID</th>
                    <th className="py-2.5 px-3">Description</th>
                    <th className="py-2.5 px-3">Gateway</th>
                    <th className="py-2.5 px-3">Gross</th>
                    <th className="py-2.5 px-3">Platform Fee</th>
                    <th className="py-2.5 px-3">Freelancer (90%)</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {transactions.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-mono text-xs">{t.id}</td>
                      <td className="py-2.5 px-3 font-medium text-slate-900">{t.description}</td>
                      <td className="py-2.5 px-3 text-slate-600">{t.gateway}</td>
                      <td className="py-2.5 px-3 font-semibold">{formatKSh(t.grossAmount)}</td>
                      <td className="py-2.5 px-3 font-bold text-emerald-700">
                        {formatKSh(t.platformCommission)}
                      </td>
                      <td className="py-2.5 px-3 text-slate-700">{formatKSh(t.freelancerNet)}</td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                            t.status === 'completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {t.status === 'completed' ? 'Settled' : 'In Escrow'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* VIEW 4: 7-STREAM MONETIZATION BLUEPRINT                               */}
        {/* ===================================================================== */}
        {activeView === 'monetization' && (
          <div className="space-y-6">
            <div className="bg-emerald-900 text-white rounded-2xl p-6 shadow-sm">
              <h1 className="text-xl sm:text-2xl font-extrabold">
                How Freelance Hub Makes Money: 7-Stream Monetization Architecture
              </h1>
              <p className="text-sm text-emerald-100 mt-1 max-w-3xl">
                Core Principle: Make it free and attractive to join, then earn automatically whenever
                clients and freelancers succeed on the platform.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  num: '1',
                  title: '10% Commission on Completed Jobs (Primary)',
                  price: '10% Split Fee',
                  detail:
                    'Client pays KSh 30,000 → Freelancer receives KSh 27,000 (90%) → Freelance Hub earns KSh 3,000 (10%) automatically upon milestone approval.'
                },
                {
                  num: '2',
                  title: 'Tiered Job Posting Fees',
                  price: 'Free to KSh 2,000',
                  detail:
                    'Basic job posts are Free to attract employers; Featured (KSh 500), Urgent (KSh 1,000), and Premium (KSh 2,000) boost visibility.'
                },
                {
                  num: '3',
                  title: 'Freelancer Membership Subscriptions',
                  price: 'KSh 500 – 1,000/mo',
                  detail:
                    'Free tier gives genuine access; Pro (KSh 500/mo) and Premium (KSh 1,000/mo) unlock more proposals, priority ranking, and analytics.'
                },
                {
                  num: '4',
                  title: 'Featured Profiles & Verified Badges',
                  price: 'KSh 300 – 800',
                  detail:
                    '7-day featured boost (KSh 300), 30-day spotlight (KSh 800), and vetted ID/skills verification badge (KSh 500).'
                },
                {
                  num: '5',
                  title: 'Business & Enterprise Hiring Plans',
                  price: 'KSh 2,000 – 5,000+/mo',
                  detail:
                    'Starter (Free), Business (KSh 2,000/mo), and Enterprise (KSh 5,000+/mo) for repeat corporate recruiters.'
                },
                {
                  num: '6',
                  title: 'Targeted Ecosystem Advertising',
                  price: 'Negotiated Rates',
                  detail:
                    'Sponsored placements for web hosts, SaaS tools, coding bootcamps, and certification providers.'
                },
                {
                  num: '7',
                  title: 'Career & Value-Added Services',
                  price: 'Optional Add-ons',
                  detail:
                    'CV & portfolio reviews, skills assessments, interview prep, and professional certifications.'
                }
              ].map((stream) => (
                <div
                  key={stream.num}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-extrabold text-xs flex items-center justify-center">
                      #{stream.num}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-800">
                      {stream.price}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{stream.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{stream.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* VIEW 5: KENYA & GLOBAL PAYMENT FLOW + MILESTONE ESCROW COMPLIANCE     */}
        {/* ===================================================================== */}
        {activeView === 'payments' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h1 className="text-xl font-extrabold text-slate-900">
                Milestone-Based Split Payment & Gateway Architecture
              </h1>
              <p className="text-sm text-slate-600">
                Integrated local and international payment rails ensure clients in Kenya and abroad
                can fund milestones effortlessly while Freelance Hub collects its 10% commission
                automatically.
              </p>

              {/* Supported Gateways */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
                {[
                  {
                    name: 'Flutterwave (Top Choice)',
                    tag: 'Split Payments',
                    desc: 'Supports Kenyan M-Pesa, Cards & subaccount split settlements.'
                  },
                  {
                    name: 'M-Pesa Daraja API',
                    tag: 'Kenya Essential',
                    desc: 'Instant STK Push deposits & B2C freelancer payouts.'
                  },
                  {
                    name: 'Pesapal',
                    tag: 'Local + Cards',
                    desc: 'Unified M-Pesa, Airtel Money, Visa & Mastercard checkout.'
                  },
                  {
                    name: 'Visa / Mastercard',
                    tag: 'Global Clients',
                    desc: 'International credit/debit card funding for diaspora & global firms.'
                  },
                  {
                    name: 'PayPal',
                    tag: 'International',
                    desc: 'Trusted global checkout option for international clients.'
                  }
                ].map((gw) => (
                  <div
                    key={gw.name}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5"
                  >
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {gw.tag}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900">{gw.name}</h3>
                    <p className="text-xs text-slate-600">{gw.desc}</p>
                  </div>
                ))}
              </div>

              {/* Regulatory & Compliance Notice */}
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-900 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Important Escrow & Split-Settlement Compliance Note:</p>
                  <p className="mt-1 leading-relaxed">
                    Split payments are not automatically regulated escrow. Freelance Hub uses
                    provider-approved delayed-settlement / safeguarding arrangements so client
                    funds are never held in a personal bank account, with clear dispute and refund
                    procedures before releasing the 90% freelancer / 10% platform split.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ===================================================================== */}
      {/* MODAL 1: SUBMIT FREELANCER PROPOSAL                                   */}
      {/* ===================================================================== */}
      {selectedJobForProposal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleSubmitProposal}
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Submit Proposal</h3>
                <p className="text-xs text-slate-500 mt-0.5">{selectedJobForProposal.title}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedJobForProposal(null)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Total Bid (KSh)
                </label>
                <input
                  type="number"
                  required
                  value={proposalForm.bidAmount}
                  onChange={(e) => setProposalForm({ ...proposalForm, bidAmount: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Delivery Time (Days)
                </label>
                <input
                  type="number"
                  required
                  value={proposalForm.deliveryDays}
                  onChange={(e) =>
                    setProposalForm({ ...proposalForm, deliveryDays: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex justify-between">
              <span>Estimated Net Earnings (after 10% platform fee):</span>
              <strong>{formatKSh((Number(proposalForm.bidAmount) || 0) * 0.9)}</strong>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Cover Letter</label>
              <textarea
                rows={4}
                required
                value={proposalForm.coverLetter}
                onChange={(e) => setProposalForm({ ...proposalForm, coverLetter: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedJobForProposal(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
              >
                Send Proposal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 2: INTEGRATED CHECKOUT (M-PESA STK PUSH / FLUTTERWAVE / CARD)   */}
      {/* ===================================================================== */}
      {paymentModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                  Freelance Hub Secure Checkout
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">{paymentModal.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{paymentModal.subtitle}</p>
              </div>
              <button
                onClick={() => setPaymentModal(null)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between">
              <span className="text-xs text-slate-300">Total Payable Amount</span>
              <span className="text-2xl font-extrabold text-emerald-400">
                {formatKSh(paymentModal.amount)}
              </span>
            </div>

            {paymentStep === 'select' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Choose Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      'M-Pesa STK Push',
                      'Flutterwave Split',
                      'Pesapal',
                      'Visa / Mastercard',
                      'PayPal'
                    ].map((gw) => (
                      <button
                        type="button"
                        key={gw}
                        onClick={() => setSelectedGateway(gw)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                          selectedGateway === gw
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {gw}
                      </button>
                    ))}
                  </div>
                </div>

                {selectedGateway.includes('M-Pesa') && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Safaricom M-Pesa Phone Number
                    </label>
                    <input
                      type="text"
                      value={mpesaPhone}
                      onChange={(e) => setMpesaPhone(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                    />
                  </div>
                )}

                <button
                  onClick={handleConfirmPayment}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md"
                >
                  Pay {formatKSh(paymentModal.amount)} via {selectedGateway}
                </button>
              </div>
            )}

            {paymentStep === 'processing' && (
              <div className="py-8 text-center space-y-3">
                <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto" />
                <p className="text-sm font-bold text-slate-900">
                  Processing {selectedGateway} Payment...
                </p>
                <p className="text-xs text-slate-500">
                  {selectedGateway.includes('M-Pesa')
                    ? `Check your phone (${mpesaPhone}) for the M-Pesa STK PIN prompt.`
                    : 'Verifying transaction with payment provider...'}
                </p>
              </div>
            )}

            {paymentStep === 'success' && (
              <div className="py-6 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <p className="text-base font-bold text-slate-900">Payment Confirmed!</p>
                <p className="text-xs text-slate-500">
                  Receipt logged in Freelance Hub split-settlement ledger.
                </p>
                <button
                  onClick={() => setPaymentModal(null)}
                  className="px-6 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 3: FREELANCER M-PESA / BANK WITHDRAWAL                          */}
      {/* ===================================================================== */}
      {withdrawModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleWithdrawFunds}
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Withdraw Freelancer Earnings</h3>
              <button
                type="button"
                onClick={() => setWithdrawModalOpen(false)}
                className="p-1 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-500">
              Available Balance: <strong>{formatKSh(freelancerProfile.availableBalance)}</strong>
            </p>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Payout Method</label>
              <select
                value={withdrawMethod}
                onChange={(e) => setWithdrawMethod(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white"
              >
                <option value="M-Pesa">M-Pesa Mobile Money (Instant B2C)</option>
                <option value="Bank Transfer (PesaLink / EFT)">
                  Bank Transfer (KCB / Equity / Co-op / NCBA)
                </option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {withdrawMethod === 'M-Pesa' ? 'M-Pesa Phone Number' : 'Bank Account Number'}
              </label>
              <input
                type="text"
                required
                value={withdrawDestination}
                onChange={(e) => setWithdrawDestination(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Amount (KSh)</label>
              <input
                type="number"
                required
                min="100"
                max={freelancerProfile.availableBalance}
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setWithdrawModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
              >
                Confirm Withdrawal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 4: CONTRACT MESSAGING DRAWER                                    */}
      {/* ===================================================================== */}
      {messageDrawerContractId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Contract Workspace Chat</h3>
                <p className="text-xs text-slate-500">Contract ID: {messageDrawerContractId}</p>
              </div>
              <button
                onClick={() => setMessageDrawerContractId(null)}
                className="p-1 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-64 overflow-y-auto space-y-3 p-2">
              {messages
                .filter((m) => m.contractId === messageDrawerContractId)
                .map((m) => (
                  <div key={m.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-bold text-slate-900">{m.senderName}</span>
                      <span className="text-slate-400">{m.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-700">{m.text}</p>
                  </div>
                ))}
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={newMessageText}
                onChange={(e) => setNewMessageText(e.target.value)}
                placeholder="Write a message about milestones or deliverables..."
                className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-1"
              >
                <Send className="w-4 h-4" /> Send
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 5: CLIENT REVIEW MODAL                                          */}
      {/* ===================================================================== */}
      {reviewModalContract && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleSubmitReview}
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">
                Review {reviewModalContract.freelancerName}
              </h3>
              <button
                type="button"
                onClick={() => setReviewModalContract(null)}
                className="p-1 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Rating (1–5)</label>
              <select
                value={reviewRating}
                onChange={(e) => setReviewRating(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white"
              >
                <option value={5}>5 Stars — Exceptional</option>
                <option value={4}>4 Stars — Great Work</option>
                <option value={3}>3 Stars — Satisfactory</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Feedback</label>
              <textarea
                rows={3}
                required
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Share your experience working with this freelancer..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setReviewModalContract(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
              >
                Publish Review
              </button>
            </div>
          </form>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            <strong className="text-slate-800">Freelance Hub</strong> — Kenyan & International
            Freelance Marketplace with Milestone Escrow & 10% Split Settlements.
          </p>
          <p>Supported Rails: M-Pesa Daraja • Flutterwave • Pesapal • Visa/Mastercard • PayPal</p>
        </div>
      </footer>
    </div>
  );
}