import "./Contact.css";
import { useState } from "react";
import API_BASE from "../api/apiConfig";

export default function Contact() {
  const [status, setStatus] = useState(null); // 'sending', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      discord: formData.get("discord"),
      message: formData.get("message"),
    };

    try {
      const apiUrl = API_BASE;
      const response = await fetch(`${apiUrl}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        e.target.reset(); // Clear form
        setTimeout(() => setStatus(null), 5000);
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Failed to send message.");
      }
    } catch (err) {
      console.error("Contact form error:", err);
      setStatus("error");
      setErrorMessage("Network error. Is the backend running?");
    }
  }

  return (
    <div className="contact-page">
      <div className="contact-inner">
        <div>
          <div className="contact-hero">
            <h1>Contact the ET Gaming Crew</h1>
            <p>Questions, collabs, or partnerships — we'd love to hear from you. Drop us a message and we'll get back.</p>
          </div>

          <div className="contact-form">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-row">
                <div className="field">
                  <label htmlFor="name">Name</label>
                  <input id="name" name="name" className="input" placeholder="Gamer tag or real name" required disabled={status === "sending"} />
                </div>
                <div className="field">
                  <label htmlFor="discord">Discord</label>
                  <input id="discord" name="discord" className="input" placeholder="Discord#0000 (optional)" disabled={status === "sending"} />
                </div>
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" className="input" placeholder="you@example.com" required disabled={status === "sending"} />
              </div>

              <div>
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" className="input" placeholder="Tell us about your idea or issue" required disabled={status === "sending"} />
              </div>

              <div>
                <button type="submit" className="btn-submit" disabled={status === "sending"}>
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>

                {status === "success" && (
                  <span style={{ marginLeft: 12, color: 'var(--neon-green)', fontWeight: 'bold' }}>
                    ✅ Message sent — thanks!
                  </span>
                )}
                {status === "error" && (
                  <span style={{ marginLeft: 12, color: 'var(--neon-red)', fontWeight: 'bold' }}>
                    ❌ {errorMessage}
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
