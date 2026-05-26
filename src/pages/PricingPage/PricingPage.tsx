import { useState } from 'react';
import {
  Check,
  X,
  Zap,
  Star,
  Users,
  ChevronDown,
  Shield,
  Award,
} from 'lucide-react';
import './PricingPage.css';

interface PricingPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  features: string[];
  cta: string;
  featured: boolean;
  icon: React.ElementType;
  color: 'default' | 'purple' | 'cyan';
}

interface FAQItem {
  q: string;
  a: string;
}

const PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    monthlyPrice: 0,
    annualPrice: 0,
    description: 'Perfect for getting started with AI-powered resume analysis.',
    features: [
      '3 resume analyses per month',
      'Basic ATS score',
      'PDF export',
      'Email support',
      'Modern template',
    ],
    cta: 'Get Started Free',
    featured: false,
    icon: Star,
    color: 'default',
  },
  {
    id: 'pro',
    name: 'Pro',
    monthlyPrice: 19,
    annualPrice: 15,
    description:
      'For serious job seekers who want every advantage in the market.',
    features: [
      'Unlimited resume analyses',
      'Full AI resume rewrite',
      'Job description matching',
      'Priority support',
      'All 15+ templates',
      'LinkedIn optimization tips',
      'Cover letter generator',
      'ATS optimization suite',
    ],
    cta: 'Start Pro Trial',
    featured: true,
    icon: Zap,
    color: 'purple',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthlyPrice: 49,
    annualPrice: 39,
    description: 'For teams and organizations scaling their hiring process.',
    features: [
      'Everything in Pro',
      'Team collaboration (10 seats)',
      'Custom templates & branding',
      'Dedicated account manager',
      'API access',
      'SSO & advanced security',
      'Analytics dashboard',
      'Priority SLA',
    ],
    cta: 'Contact Sales',
    featured: false,
    icon: Users,
    color: 'cyan',
  },
];

const FEATURES_TABLE = [
  { name: 'Resume Analyses', free: '3/month', pro: 'Unlimited', ent: 'Unlimited' },
  { name: 'ATS Score', free: 'Basic', pro: 'Advanced', ent: 'Advanced' },
  { name: 'AI Rewrite', free: false, pro: true, ent: true },
  { name: 'Job Matching', free: false, pro: true, ent: true },
  { name: 'Templates', free: '1', pro: '15+', ent: 'Custom' },
  { name: 'PDF Export', free: true, pro: true, ent: true },
  { name: 'Cover Letter', free: false, pro: true, ent: true },
  { name: 'Team Seats', free: false, pro: '1', ent: '10+' },
  { name: 'API Access', free: false, pro: false, ent: true },
  { name: 'Priority Support', free: false, pro: true, ent: true },
];

const TESTIMONIALS = [
  {
    quote:
      '"ResumeIQ Pro got my ATS score from 58 to 94 in under an hour. I had 3 interviews within a week of applying. Best investment I\'ve made in my job search."',
    name: 'Sarah Chen',
    role: 'Software Engineer @ Stripe',
    avatar: 'SC',
    stars: 5,
  },
  {
    quote:
      '"The job matching feature is a game-changer. It told me exactly what keywords I was missing for each role. I went from no callbacks to landing a senior position at my dream company."',
    name: 'Marcus Rodriguez',
    role: 'Product Manager @ Meta',
    avatar: 'MR',
    stars: 5,
  },
];

const FAQS: FAQItem[] = [
  {
    q: 'Can I cancel my subscription at any time?',
    a: 'Absolutely. You can cancel your subscription at any time from your Settings page. You\'ll retain access until the end of your billing period, with no questions asked.',
  },
  {
    q: 'Is there a free trial for Pro?',
    a: 'Yes! We offer a 7-day free trial for the Pro plan. No credit card required to start. You\'ll be notified before any charge occurs.',
  },
  {
    q: 'How does the annual billing work?',
    a: 'Annual billing is charged once per year and gives you a 20% discount compared to monthly billing. You can switch between billing cycles at any time.',
  },
  {
    q: 'What counts as a "resume analysis"?',
    a: 'Each time you run a full AI analysis on a resume — including ATS scoring, keyword extraction, and recommendations — it counts as one analysis. Viewing or downloading your resume does not count.',
  },
  {
    q: 'Can I upgrade or downgrade my plan?',
    a: 'Yes, you can change your plan at any time. Upgrades take effect immediately (with prorated billing), and downgrades apply at the start of your next billing cycle.',
  },
];

const CheckVal = ({ val }: { val: boolean | string }) => {
  if (val === true) return <Check size={16} className="pp-tbl-check" />;
  if (val === false) return <X size={16} className="pp-tbl-x" />;
  return <span className="pp-tbl-text">{val}</span>;
};

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="pp-page">
      {/* Background */}
      <div className="pp-bg">
        <div className="pp-orb pp-orb--purple" />
        <div className="pp-orb pp-orb--cyan" />
        <div className="pp-orb pp-orb--emerald" />
        <div className="pp-grid-overlay" />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Hero */}
        <div className="pp-hero animate-fadeInUp">
          <div className="pp-hero__eyebrow">
            <Shield size={14} />
            <span>Simple, Transparent Pricing</span>
          </div>
          <h1 className="pp-hero__title">
            Invest in Your{' '}
            <span className="gradient-text">Career Success</span>
          </h1>
          <p className="pp-hero__subtitle">
            Start free, upgrade when you're ready. No hidden fees, no surprises.
            Cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="pp-toggle-wrap">
            <span className={`pp-toggle-label ${!annual ? 'pp-toggle-label--active' : ''}`}>
              Monthly
            </span>
            <button
              className={`pp-toggle-switch ${annual ? 'pp-toggle-switch--on' : ''}`}
              onClick={() => setAnnual((a) => !a)}
              aria-label="Toggle annual billing"
            >
              <span className="pp-toggle-thumb" />
            </button>
            <span className={`pp-toggle-label ${annual ? 'pp-toggle-label--active' : ''}`}>
              Annual
            </span>
            {annual && (
              <span className="pp-toggle-badge">Save 20%</span>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="pp-cards">
          {PLANS.map((plan, i) => (
            <div
              key={plan.id}
              className={`pp-card ${plan.featured ? 'pp-card--featured' : ''} pp-card--${plan.color}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {plan.featured && (
                <div className="pp-popular-badge">
                  <Star size={11} />
                  Most Popular
                </div>
              )}

              {/* Card Header */}
              <div className="pp-card__header">
                <div className={`pp-card__icon pp-card__icon--${plan.color}`}>
                  <plan.icon size={20} />
                </div>
                <h3 className="pp-card__name">{plan.name}</h3>
                <p className="pp-card__desc">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="pp-price">
                <span className="pp-price__currency">$</span>
                <span className="pp-price__amount">
                  {annual ? plan.annualPrice : plan.monthlyPrice}
                </span>
                <span className="pp-price__period">/mo</span>
                {annual && plan.monthlyPrice > 0 && (
                  <span className="pp-price__original">
                    ${plan.monthlyPrice}
                  </span>
                )}
              </div>

              {/* Features */}
              <ul className="pp-features">
                {plan.features.map((f) => (
                  <li key={f} className="pp-feature">
                    <Check size={14} className="pp-feature__check" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className={`pp-cta-btn ${
                  plan.featured ? 'pp-cta-btn--featured' : 'pp-cta-btn--default'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="pp-table-section">
          <div className="pp-table-header">
            <h2 className="pp-table-title">
              Full Feature <span className="gradient-text">Comparison</span>
            </h2>
          </div>
          <div className="pp-table-wrap glass-card">
            <table className="pp-table">
              <thead>
                <tr className="pp-table__head-row">
                  <th className="pp-table__th pp-table__th--feature">Feature</th>
                  <th className="pp-table__th">Free</th>
                  <th className="pp-table__th pp-table__th--pro">
                    <div className="pp-table-pro-badge">Pro</div>
                  </th>
                  <th className="pp-table__th">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {FEATURES_TABLE.map((row, i) => (
                  <tr
                    key={row.name}
                    className={`pp-table__row ${i % 2 === 0 ? 'pp-table__row--alt' : ''}`}
                  >
                    <td className="pp-table__td pp-table__td--feature">
                      {row.name}
                    </td>
                    <td className="pp-table__td">
                      <CheckVal val={row.free} />
                    </td>
                    <td className="pp-table__td pp-table__td--pro">
                      <CheckVal val={row.pro} />
                    </td>
                    <td className="pp-table__td">
                      <CheckVal val={row.ent} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Testimonials */}
        <div className="pp-testimonials-section">
          <h2 className="pp-section-title">
            Trusted by <span className="gradient-text">10,000+</span> Job Seekers
          </h2>
          <div className="pp-testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="pp-testimonial glass-card">
                <div className="pp-testimonial__stars">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} size={14} className="pp-testimonial__star" />
                  ))}
                </div>
                <p className="pp-testimonial__quote">{t.quote}</p>
                <div className="pp-testimonial__author">
                  <div className="pp-testimonial__avatar">{t.avatar}</div>
                  <div>
                    <p className="pp-testimonial__name">{t.name}</p>
                    <p className="pp-testimonial__role">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="pp-faq-section">
          <h2 className="pp-section-title" style={{ textAlign: 'center', marginBottom: 40 }}>
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <div className="pp-faq-list">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className={`pp-faq-item glass-card ${openFaq === i ? 'pp-faq-item--open' : ''}`}
              >
                <button
                  className="pp-faq-question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className="pp-faq-chevron"
                    style={{
                      transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                </button>
                {openFaq === i && (
                  <div className="pp-faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="pp-bottom-cta">
          <div className="pp-bottom-cta__glow" />
          <div className="pp-bottom-cta__content glass-card">
            <Award size={32} className="pp-bottom-cta__icon" />
            <h2 className="pp-bottom-cta__title">
              Start Free Today
            </h2>
            <p className="pp-bottom-cta__subtitle">
              Join 10,000+ professionals using ResumeIQ to land their dream jobs.
              No credit card required.
            </p>
            <div className="pp-bottom-cta__actions">
              <button className="pp-cta-btn pp-cta-btn--featured pp-cta-btn--large">
                <Zap size={18} />
                Get Started for Free
              </button>
              <button className="pp-cta-outline-btn">
                View Demo
              </button>
            </div>
            <p className="pp-bottom-cta__note">
              ✓ Free forever &nbsp;&nbsp; ✓ No credit card &nbsp;&nbsp; ✓ Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
