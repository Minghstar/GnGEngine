import Layout from '../components/Layout';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with backend/email service
    setSubmitted(true);
  };

  return (
    <Layout 
      title="Contact Us - GNG Engine"
      description="Contact GNG Engine to learn more, ask questions, or request a demo. We're here to help athletes, scouts, and organizations."
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Hero/Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4 font-heading">
            Contact GNG Engine
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-xl mx-auto font-body">
            Have a question, want to request a demo, or need support? Fill out the form below and our team will get back to you.
          </p>
        </div>

        <Card>
          {submitted ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-charcoal mb-4 font-heading">Thank you!</h2>
              <p className="text-text-secondary font-body">Your message has been received. We'll be in touch soon.</p>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-heading text-charcoal mb-1">Name</label>
                <Input id="name" name="name" type="text" required value={form.name} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-heading text-charcoal mb-1">Email</label>
                <Input id="email" name="email" type="email" required value={form.email} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-heading text-charcoal mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="rounded-lg border border-neutral-gray px-4 py-2 text-base bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-accent-blue w-full font-body"
                  value={form.message}
                  onChange={handleChange}
                />
              </div>
              <div className="pt-2">
                <Button variant="primary" type="submit" className="w-full">Send Message</Button>
              </div>
            </form>
          )}
        </Card>
      </div>
    </Layout>
  );
} 