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
    <section id="contact" className="container">
      <div className="text-center">
        <small className="d-inline-block fw-bold text-uppercase mt-4 mb-2 text-dark">
          GET IN TOUCH
        </small>
        <h1 className="text-dark">Contact Me</h1>
      </div>
      <div className="contact-form text-center">
        <h4>
          <a
            href={`mailto:${EMAIL}`}
            className="btn btn-warning text-white custom-link"
          >
            Send me an email
          </a>
        </h4>
        <div className="social-links-container icon mt-3 mb-2">
          <a
            className="share-link btn btn-success btn-md-square rounded-circle mb-2 me-2 custom-btn"
            target="_blank"
            rel="noopener noreferrer"
            href={GITHUB_URL}
          >
            <i className="fab fa-github" />
          </a>
          <a
            className="share-link btn btn-success btn-md-square rounded-circle mb-2 me-2 custom-btn"
            target="_blank"
            rel="noopener noreferrer"
            href={LINKEDIN_URL}
          >
            <i className="fab fa-linkedin" />
          </a>
        </div>
      </div>

      <div className="container-fluid contact pt-4 pb-5">
        <div className="container">
          <div className="p-5 contact-form">
            <div className="row g-5">
              <div className="col-md-7 col-lg-8">
                <h4 className="mb-4 text-center text-dark">Send me your message</h4>
                <form onSubmit={handleSubmit} onReset={handleReset}>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-100 form-control p-3 mb-4 border-primary bg-light"
                    placeholder="Your Name"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-100 form-control p-3 mb-4 border-primary bg-light"
                    placeholder="Enter Your Email"
                  />
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-100 form-control mb-4 p-3 border-primary bg-light"
                    rows={4}
                    placeholder="Your Message"
                  />
                  {error && (
                    <p className="text-danger small mb-2" role="alert">
                      {error}
                    </p>
                  )}
                  <div className="d-flex justify-content-between">
                    <button
                      className="w-50 btn btn-primary form-control p-3 border-primary rounded-pill me-5 custom-btn"
                      type="submit"
                    >
                      Submit Now
                    </button>
                    <button
                      className="w-50 btn btn-primary form-control p-3 border-primary rounded-pill custom-btn"
                      type="reset"
                    >
                      Clear Form
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-md-5 col-lg-4">
                <h4 className="mb-4 text-center text-dark">Talk to me</h4>
                <div className="row">
                  <div className="contact-border col-4 col-md-12 col-lg-12">
                    <div className="d-inline-flex w-100 border bg-light border-primary p-2 rounded mb-4">
                      <i className="fab fa-github fa-2x mt-3 me-4" />
                      <div className="hide-text-small">
                        <h4>GitHub</h4>
                        <a
                          href="https://github.com/w0436300?tab=repositories"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-dark"
                        >
                          Claire
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-4 col-md-12 col-lg-12">
                    <div className="d-inline-flex w-100 border bg-light border-primary p-2 rounded mb-4">
                      <i className="fab fa-linkedin fa-2x mt-3 me-4" />
                      <div className="hide-text-small">
                        <h4>LinkedIn</h4>
                        <a
                          href={LINKEDIN_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-dark"
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
      </div>
    </section>
  );
}
