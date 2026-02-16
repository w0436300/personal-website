import { useState } from 'react';

const EMAIL = 'xinpingxh@gmail.com';
const GITHUB_URL = 'https://github.com/w0436300';
const LINKEDIN_URL = 'https://www.linkedin.com/in/xinping-w/';

function buildMailto(name, email, message) {
  const subject = encodeURIComponent(`Contact from portfolio: ${name || 'Someone'}`);
  const body = encodeURIComponent(
    (message || '').trim()
      ? `${message}\n\n— ${name || 'Anonymous'} (${email || ''})`
      : `— ${name || 'Anonymous'} (${email || ''})`
  );
  return `mailto:${EMAIL}?subject=${subject}&body=${body}`;
}

function isValidEmail(s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((s || '').trim());
}

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const n = name.trim();
    const em = email.trim();
    const msg = message.trim();
    if (!n || !em || !msg) {
      setError('Please fill out every field in the form.');
      return;
    }
    if (!isValidEmail(em)) {
      setError('Please enter a valid email address.');
      return;
    }
    window.location.href = buildMailto(n, em, msg);
    setName('');
    setEmail('');
    setMessage('');
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setMessage('');
    setError('');
  };

  return (
    <section id="contact" className="max-w-6xl mx-auto px-4">
      <div className="text-center">
        <small className="inline-block font-bold uppercase tracking-wide mt-6 mb-2 text-gray-900">
          GET IN TOUCH
        </small>
        <h1 className="text-gray-900 text-2xl md:text-3xl font-bold">Contact Me</h1>
      </div>
      <div className="text-center">
        <h4 className="mt-4">
          <a
            href={`mailto:${EMAIL}`}
            className="inline-block px-4 py-2 bg-amber-500 text-white font-medium rounded hover:bg-amber-600 transition-colors"
          >
            Send me an email
          </a>
        </h4>
        <div className="flex justify-center gap-2 mt-3 mb-2">
          <a
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            href={GITHUB_URL}
          >
            <i className="fab fa-github" />
          </a>
          <a
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            href={LINKEDIN_URL}
          >
            <i className="fab fa-linkedin" />
          </a>
        </div>
      </div>

      <div className="w-full pt-8 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-7 lg:col-span-8">
                <h4 className="mb-4 text-center text-gray-900 text-lg font-semibold">Send me your message</h4>
                <form onSubmit={handleSubmit} onReset={handleReset}>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 mb-4 border border-blue-600 bg-gray-100 rounded"
                    placeholder="Your Name"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 mb-4 border border-blue-600 bg-gray-100 rounded"
                    placeholder="Enter Your Email"
                  />
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 mb-4 border border-blue-600 bg-gray-100 rounded"
                    rows={4}
                    placeholder="Your Message"
                  />
                  {error && (
                    <p className="text-red-600 text-sm mb-2" role="alert">
                      {error}
                    </p>
                  )}
                  <div className="flex justify-between gap-4">
                    <button
                      className="flex-1 py-3 px-4 bg-gray-800 text-white font-medium rounded-full border border-blue-600 hover:bg-gray-700 transition-colors"
                      type="submit"
                    >
                      Submit Now
                    </button>
                    <button
                      className="flex-1 py-3 px-4 bg-gray-800 text-white font-medium rounded-full border border-blue-600 hover:bg-gray-700 transition-colors"
                      type="reset"
                    >
                      Clear Form
                    </button>
                  </div>
                </form>
              </div>
              <div className="md:col-span-5 lg:col-span-4">
                <h4 className="mb-4 text-center text-gray-900 text-lg font-semibold">Talk to me</h4>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center w-full border border-blue-600 bg-gray-100 p-2 rounded mb-4">
                    <i className="fab fa-github text-2xl mt-1 mr-4 text-gray-700" />
                    <div>
                      <h4 className="font-semibold text-gray-900">GitHub</h4>
                      <a
                        href="https://github.com/w0436300?tab=repositories"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-900 hover:underline"
                      >
                        Claire
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center w-full border border-blue-600 bg-gray-100 p-2 rounded mb-4">
                    <i className="fab fa-linkedin text-2xl mt-1 mr-4 text-gray-700" />
                    <div>
                      <h4 className="font-semibold text-gray-900">LinkedIn</h4>
                      <a
                        href={LINKEDIN_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-900 hover:underline"
                      >
                        Claire
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
