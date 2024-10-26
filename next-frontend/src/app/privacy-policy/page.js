"use server";

const PrivacyPolicy = () => {
  return (
    <div>
      <div className="max-w-4xl mx-auto p-6 my-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-gray-700 mb-4">
          <strong>Effective Date:</strong> 17/05/2014
        </p>

        <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
        <p className="text-gray-600 mb-4">
          University of Rajshahi Department of Information and Communication
          Engineering is committed to protecting your privacy. This Privacy
          Policy explains how we collect, use, disclose, and safeguard your
          information when you visit our result processing website.
        </p>

        <h2 className="text-xl font-semibold mb-2">
          2. Information We Collect
        </h2>
        <p className="text-gray-600 mb-4">
          - <strong>Personal Information:</strong> We may collect personal
          information such as your name, student ID, email address, and other
          contact details.
          <br />- <strong>Usage Data:</strong> We collect information about how
          you access and use our website, including your IP address, browser
          type, and pages visited.
        </p>

        <h2 className="text-xl font-semibold mb-2">
          3. How We Use Your Information
        </h2>
        <p className="text-gray-600 mb-4">
          We use the information we collect to:
          <ul className="list-disc list-inside ml-4">
            <li>Provide and maintain the functionality of the website.</li>
            <li>
              Communicate with you about your results and other academic
              information.
            </li>
            <li>Improve our website and services.</li>
            <li>
              Ensure compliance with university policies and legal obligations.
            </li>
          </ul>
        </p>

        <h2 className="text-xl font-semibold mb-2">
          4. Sharing Your Information
        </h2>
        <p className="text-gray-600 mb-4">
          We may share your information with:
          <ul className="list-disc list-inside ml-4">
            <li>
              <strong>University Administration:</strong> To facilitate academic
              and administrative processes.
            </li>
            <li>
              <strong>Service Providers:</strong> Third-party vendors who help
              us operate our website and provide services to you.
            </li>
            <li>
              <strong>Legal Authorities:</strong> If required by law or to
              protect our rights and interests.
            </li>
          </ul>
        </p>

        <h2 className="text-xl font-semibold mb-2">5. Data Security</h2>
        <p className="text-gray-600 mb-4">
          We implement appropriate technical and organizational measures to
          protect your information from unauthorized access, use, or disclosure.
          However, no method of transmission over the internet or electronic
          storage is completely secure.
        </p>

        <h2 className="text-xl font-semibold mb-2">
          6. Cookies and Tracking Technologies
        </h2>
        <p className="text-gray-600 mb-4">
          Our website may use cookies and similar technologies to enhance your
          experience. You can set your browser to refuse cookies, but this may
          affect your ability to use certain features of the website.
        </p>

        <h2 className="text-xl font-semibold mb-2">7. Your Rights</h2>
        <p className="text-gray-600 mb-4">
          Depending on your location, you may have the right to:
          <ul className="list-disc list-inside ml-4">
            <li>Access and receive a copy of your personal data.</li>
            <li>Request correction of any inaccurate data.</li>
            <li>Request deletion of your personal data.</li>
            <li>Object to or restrict our processing of your data.</li>
          </ul>
          To exercise these rights, please contact us at{" "}
          <a
            href="mailto:iftekharweb@gmail.com"
            className="text-blue-500 hover:underline"
          >
            iftekharweb@gmail.com
          </a>
          .
        </p>

        <h2 className="text-xl font-semibold mb-2">
          8. Changes to This Privacy Policy
        </h2>
        <p className="text-gray-600 mb-4">
          We may update this Privacy Policy from time to time. We will notify
          you of significant changes by posting the new policy on our website.
          Your continued use of the site after such changes constitutes your
          acceptance of the new policy.
        </p>

        <h2 className="text-xl font-semibold mb-2">9. Contact Us</h2>
        <p className="text-gray-600">
          If you have any questions or concerns about this Privacy Policy,
          please contact us at{" "}
          <a
            href="mailto:iftekharweb@gmail.com"
            className="text-blue-500 hover:underline"
          >
            iftekharweb@gmail.com
          </a>{" "}
          or{" "}
          <a
            href="tel:+8801888659546"
            className="text-blue-500 hover:underline"
          >
            +8801888659546
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
