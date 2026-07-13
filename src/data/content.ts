export const companyInfo = {
  name: 'Shaheen Assignments Limited',
  tagline: 'Shaheen Assignment Services',
  description: 'Professional assignment writing and academic services trusted by hundreds of students across Pakistan.',
  whatsapp: '+923128268793',
  whatsappChannel: 'https://www.whatsapp.com/channel/0029VbCOSaIJ93wT38mvGM0C',
  email: 'shaheenassingmentcompany1@gmail.com',
  facebook: 'https://facebook.com/shaheenassignment',
  telegram: 'https://t.me/shaheenassignment',
  easypaisa: {
    name: 'Ansha Gull',
    number: '03420423970',
  },
  jazzcash: {
    name: 'Mateen Ahmad',
    number: '03420423970',
  },
  owner: 'Malik Mateen',
  ceo: 'Malik Mateen',
  viceOwner: 'Kainat Waseem',
  officeHours: '9:00 AM to 12:00 PM',
}

export interface Package {
  id: string
  name: string
  subtitle: string
  price: string
  priceValue: number
  comparePrice: string
  comparePriceValue: number
  joinFee: string
  dailySalary: string
  pageWrite: string
  referralsRequired: number
  features: string[]
  popular: boolean
  color: string
}

export const packages: Package[] = [
  {
    id: 'small',
    name: 'SMALL',
    subtitle: 'Starter Package',
    price: 'PKR 1,500',
    priceValue: 1500,
    comparePrice: 'PKR 2,000',
    comparePriceValue: 2000,
    joinFee: 'PKR 1,500',
    dailySalary: '400 Direct',
    pageWrite: 'Page Write 02',
    referralsRequired: 8,
    features: [
      'Daily Salary: PKR 400',
      'Page Write: 02 Pages',
      'Direct Payment',
      'WhatsApp Support',
      'Basic Assignments',
    ],
    popular: false,
    color: 'from-lime/20 to-lime/10',
  },
  {
    id: 'big',
    name: 'BIG OFFER',
    subtitle: 'Premium Package',
    price: 'PKR 3,000',
    priceValue: 3000,
    comparePrice: 'PKR 5,000',
    comparePriceValue: 5000,
    joinFee: 'PKR 3,000',
    dailySalary: '800 Direct',
    pageWrite: 'Page Write 04',
    referralsRequired: 5,
    features: [
      'Daily Salary: PKR 800',
      'Page Write: 04 Pages',
      'Direct Payment',
      'Premium Assignments',
      'Priority Support',
      'VIP Access',
      'Fast Delivery',
    ],
    popular: true,
    color: 'from-lime to-lime-dark',
  },
  {
    id: 'large',
    name: 'LARGE',
    subtitle: 'Professional Package',
    price: 'PKR 5,000',
    priceValue: 5000,
    comparePrice: 'PKR 10,000',
    comparePriceValue: 10000,
    joinFee: 'PKR 5,000',
    dailySalary: '1,600 Direct',
    pageWrite: 'Page Write 08',
    referralsRequired: 3,
    features: [
      'Daily Salary: PKR 1,600',
      'Page Write: 08 Pages',
      'Direct Payment',
      'Premium Assignments',
      'Priority Support',
      'VIP Access',
      'Fast Delivery',
      'Dedicated Manager',
    ],
    popular: false,
    color: 'from-lime/20 to-lime/10',
  },
  {
    id: 'extralarge',
    name: 'EXTRA LARGE',
    subtitle: 'Enterprise Package',
    price: 'PKR 10,000',
    priceValue: 10000,
    comparePrice: 'PKR 20,000',
    comparePriceValue: 20000,
    joinFee: 'PKR 10,000',
    dailySalary: '3,200 Direct',
    pageWrite: 'Page Write 16',
    referralsRequired: 2,
    features: [
      'Daily Salary: PKR 3,200',
      'Page Write: 16 Pages',
      'Direct Payment',
      'Premium Assignments',
      'Priority Support',
      'VIP Access',
      'Fast Delivery',
      'Dedicated Manager',
      '24/7 Support',
    ],
    popular: false,
    color: 'from-lime/20 to-lime/10',
  },
]

export const services = [
  { id: 1, title: 'Handwriting' },
  { id: 2, title: 'MS Word' },
  { id: 3, title: 'Assignment' },
  { id: 4, title: 'Typing Work' },
]

// Company Staff
export const staff = {
  ceo: {
    name: 'Malik-Mateen',
    role: 'CEO of Company',
    image: null,
  },
  viceOwner: {
    name: 'Kainat Waseem',
    role: 'Company Vice Owner',
    image: null,
  },
  seniorAppliners: [
    { name: 'Sania Gafoor', role: 'Senior Appliner' },
    { name: 'Alia Waheed', role: 'Senior Appliner' },
    { name: 'Mishal Malik', role: 'Senior Appliner' },
    { name: 'Fizza Sami', role: 'Senior Appliner' },
    { name: 'Abeera Safdar', role: 'Senior Appliner' },
    { name: 'Muskan Malik', role: 'Senior Appliner' },
    { name: 'Zarish Hayyat', role: 'Senior Appliner' },
    { name: 'Muqadas Quyyum', role: 'Senior Appliner' },
  ],
}

// Payment Screenshots
export const paymentScreenshots = [
  { id: 1, amount: 'PKR 800', name: 'Ahmed', date: '2024' },
  { id: 2, amount: 'PKR 700', name: 'Sana', date: '2024' },
  { id: 3, amount: 'PKR 800', name: 'Hassan', date: '2024' },
  { id: 4, amount: 'PKR 700', name: 'Bilal', date: '2024' },
  { id: 5, amount: 'PKR 800', name: 'Fatima', date: '2024' },
  { id: 6, amount: 'PKR 600', name: 'Usman', date: '2024' },
  { id: 7, amount: 'PKR 400', name: 'Sana', date: '2024' },
  { id: 8, amount: 'PKR 700', name: 'Zainab', date: '2024' },
]

export const faqs = [
  {
    question: 'How do I place an order?',
    answer: 'Fill out the registration form with your details, select a package, and make payment via EasyPaisa or JazzCash. After payment confirmation, your order will be processed.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept EasyPaisa (03420423970 - Ansha Gull) and JazzCash (03420423970 - Mateen Ahmad).',
  },
  {
    question: 'How long does delivery take?',
    answer: 'Small package delivers in 2 days, Big package delivers in 1 day, with urgent options available.',
  },
  {
    question: 'What is the referral system?',
    answer: 'Small package requires 8 referrals, Big package requires 5 referrals to unlock premium content. Contact HR team for referral details.',
  },
  {
    question: 'How do I contact support?',
    answer: 'Reach us via WhatsApp at +92 312 8268793, email at shaheenassingmentcompany1@gmail.com, or through our contact form.',
  },
]
