import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";
import Reveal from "./Reveal";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "success",
      title: `Thank you, ${formData.name}! Your message has been sent.`,
      timer: 2000,
      showConfirmButton: false,
    });

    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="bg-gray-50 py-10 rounded-2xl">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-red-600 ">
          Please, Contact Us!!
        </h2>
        <h2 className=" text-center text-red-600 mb-10">
          “We’re here to answer your questions and help save lives—reach out to
          us anytime.”
        </h2>

        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-6">Send Us a Message</h3>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="input input-bordered w-full"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="input input-bordered w-full"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="4"
                  className="textarea textarea-bordered w-full"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>

                <button
                  type="submit"
                  className="btn bg-red-500 text-white w-full hover:bg-red-600 transition"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="bg-red-50 p-8 rounded-xl shadow flex flex-col justify-center">
              <h3 className="text-xl font-semibold mb-6">Get In Touch</h3>

              <div className="flex items-center gap-4 mb-4">
                <FaPhoneAlt className="text-red-500 text-xl" />
                <p className="text-gray-700">+880 1315-562442</p>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <FaEnvelope className="text-red-500 text-xl" />
                <p className="text-gray-700">support@blooddonate.com</p>
              </div>

              <p className="text-gray-600">
                We are available 24/7 to help donors and recipients. Your
                message matters to us.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ContactUs;
