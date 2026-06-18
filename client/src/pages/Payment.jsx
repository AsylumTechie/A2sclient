import { useMemo, useState } from 'react';
import { CheckCircle2, CreditCard, Smartphone, Wallet } from 'lucide-react';
import SEO from '../components/SEO';
import { createPaymentOrder, verifyPayment } from '../api/client';

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function Payment() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    amount: 999,
    description: 'E-Commerce Seller Growth Consultation',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const amountLabel = useMemo(
    () => `₹${Number(formData.amount || 0).toLocaleString('en-IN')}`,
    [formData.amount]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'amount' ? Number(value) : value,
    }));
  };

  const handlePay = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    setLoading(true);

    try {
      const isSdkLoaded = await loadRazorpayScript();
      if (!isSdkLoaded) {
        throw new Error('Unable to load payment SDK. Please check your internet and try again.');
      }

      const { data } = await createPaymentOrder(formData);
      const order = data?.data;
      if (!order?.orderId || !order?.keyId) {
        throw new Error('Unable to initialize payment. Please try again.');
      }

      const razorpay = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: order.name,
        description: order.description,
        order_id: order.orderId,
        prefill: order.prefill,
        theme: { color: '#1d6af1' },
        handler: async (response) => {
          try {
            await verifyPayment(response);
            setStatus({
              type: 'success',
              message: `Payment successful! Payment ID: ${response.razorpay_payment_id}. Our team will contact you shortly.`,
            });
          } catch (error) {
            const message = error?.response?.data?.message || 'Payment captured but verification failed.';
            setStatus({ type: 'error', message });
          }
        },
        modal: {
          ondismiss: () => setStatus({ type: 'error', message: 'Payment was cancelled.' }),
        },
      });

      razorpay.open();
    } catch (error) {
      const message = error?.response?.data?.message || error.message || 'Payment failed. Please try again.';
      setStatus({ type: 'error', message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Pay Online - UPI, Cards & Wallets | A2S Ecom Solutions"
        description="Book your ₹999 E-Commerce Seller Growth Consultation. Pay securely via UPI, PhonePe, GPay, Paytm, cards, and netbanking."
        path="/pay"
        noindex
      />

      <section className="section-padding bg-gradient-to-b from-brand-50 to-white">
        <div className="container-custom max-w-4xl">
          <div className="mb-10 text-center">
            <span className="inline-block rounded-full bg-brand-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-700">
              Secure checkout
            </span>
            <h1 className="mt-4 font-display text-3xl font-bold text-slate-900 md:text-4xl">
              E-Commerce Seller Growth Consultation
            </h1>
            <p className="mt-3 text-lg text-slate-600">
              Expert guidance for Amazon, Flipkart, Meesho & more —{' '}
              <span className="font-bold text-brand-700">{amountLabel}</span>
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-5">
            <div className="space-y-4 lg:col-span-2">
              <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <h2 className="font-display font-semibold text-slate-900">Accepted payment methods</h2>
                <ul className="mt-4 space-y-3">
                  <PaymentMethod icon={Smartphone} label="UPI apps" detail="PhonePe, GPay, Paytm, BHIM" />
                  <PaymentMethod icon={CreditCard} label="Cards" detail="Debit & credit cards" />
                  <PaymentMethod icon={Wallet} label="Wallets & netbanking" detail="All major banks" />
                </ul>
              </div>
              <div className="rounded-2xl border border-brand-100 bg-brand-50/60 p-6">
                <h2 className="font-display font-semibold text-slate-900">What you get</h2>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {[
                    'Account health analysis',
                    'Listing optimization tips',
                    'Sales growth strategy',
                    'Marketplace guidance',
                    'Performance improvement plan',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-brand-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-lg lg:col-span-3">
              <h2 className="font-display text-xl font-bold text-slate-900">Complete your booking</h2>
              <p className="mt-2 text-sm text-slate-600">
                Fill in your details and proceed to pay securely via Razorpay.
              </p>

              <form className="mt-6 space-y-4" onSubmit={handlePay}>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Full name *"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Email *"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                />
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Phone number *"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                />
                <input
                  type="number"
                  min="1"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  readOnly
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-brand-700 outline-none"
                />
                <input
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  readOnly
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 outline-none"
                />

                <button type="submit" className="btn-primary w-full justify-center py-3.5" disabled={loading}>
                  {loading ? 'Starting payment...' : `Pay ${amountLabel} securely`}
                </button>
              </form>

              {status.message && (
                <p
                  className={`mt-4 rounded-xl px-4 py-3 text-sm ${
                    status.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                  }`}
                >
                  {status.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function PaymentMethod({ icon: Icon, label, detail }) {
  return (
    <li className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100 text-brand-600">
        <Icon size={20} />
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-900">{label}</p>
        <p className="text-xs text-slate-500">{detail}</p>
      </div>
    </li>
  );
}
