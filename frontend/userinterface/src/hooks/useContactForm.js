import { useState } from 'react';

/**
 * useContactForm — orchestration hook for the Contact page form.
 *
 * Extracts form state + submit logic so Contact.jsx stays pure UI.
 * In the future, this can be extended to call a real contact API endpoint.
 */
export const useContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    // TODO: call contactApi.sendMessage(form) when backend endpoint exists
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return {
    form,
    handleChange,
    handleSubmit,
    submitted,
  };
};
