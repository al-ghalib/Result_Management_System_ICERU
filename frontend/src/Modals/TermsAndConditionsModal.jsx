import React from "react";
import { MdOutlineCancel } from "react-icons/md";

const TermsAndConditionsModal = ({ handleTerm }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white py-5 px-8 rounded-xl w-[60%] max-h-[90vh] overflow-y-auto">
        <div>
          <div className="flex justify-between items-center pb-1">
            <div className="pt-2">
              <p className="text-2xl font-semibold"></p>
            </div>
            <div className="pt-2">
              <button onClick={handleTerm}>
                <MdOutlineCancel className="text-2xl hover:text-red-500" />
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-6 my-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Terms & Conditions</h1>
          <p className="text-gray-700 mb-4">
            <strong>Effective Date:</strong> 17/05/2014
          </p>

          <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
          <p className="text-gray-600 mb-4">
            Welcome to the Result Processing System of University of Rajshahi
            Department of Information and Communication Engineering. By
            accessing or using our website, you agree to comply with and be
            bound by the following terms and conditions. Please read these terms
            carefully before using the site.
          </p>

          <h2 className="text-xl font-semibold mb-2">2. Acceptance of Terms</h2>
          <p className="text-gray-600 mb-4">
            By accessing or using our website, you accept and agree to be bound
            by these Terms & Conditions and our Privacy Policy. If you do not
            agree with these terms, please do not use our website.
          </p>

          <h2 className="text-xl font-semibold mb-2">3. User Eligibility</h2>
          <p className="text-gray-600 mb-4">
            Our website is intended for use by current students, faculty, and
            staff of University of Rajshahi. Unauthorized access or use by
            individuals not affiliated with the university is strictly
            prohibited.
          </p>

          <h2 className="text-xl font-semibold mb-2">4. Use of the Website</h2>
          <p className="text-gray-600 mb-4">
            - You agree to use the website only for lawful purposes and in a
            manner that does not infringe the rights of, restrict, or inhibit
            anyone else's use and enjoyment of the website.
            <br />- You are responsible for maintaining the confidentiality of
            your login credentials and for all activities that occur under your
            account.
          </p>

          <h2 className="text-xl font-semibold mb-2">
            5. Intellectual Property
          </h2>
          <p className="text-gray-600 mb-4">
            - All content on the website, including text, graphics, logos,
            icons, images, and software, is the property of University of
            Rajshahi or its content suppliers and is protected by international
            copyright laws.
            <br />- You may not reproduce, distribute, modify, create derivative
            works from, or publicly display any content without our prior
            written permission.
          </p>

          <h2 className="text-xl font-semibold mb-2">6. Data Accuracy</h2>
          <p className="text-gray-600 mb-4">
            We strive to ensure that the information provided on our website is
            accurate and up-to-date. However, we do not warrant or guarantee the
            accuracy, completeness, or reliability of any information provided.
          </p>

          <h2 className="text-xl font-semibold mb-2">7. Changes to Terms</h2>
          <p className="text-gray-600 mb-4">
            We reserve the right to modify or replace these terms at any time.
            We will notify you of significant changes by posting the new terms
            on our website. Your continued use of the site after such changes
            constitutes your acceptance of the new terms.
          </p>

          <h2 className="text-xl font-semibold mb-2">
            8. Limitation of Liability
          </h2>
          <p className="text-gray-600 mb-4">
            - To the fullest extent permitted by law, University of Rajshahi
            shall not be liable for any direct, indirect, incidental,
            consequential, or punitive damages arising out of your access to or
            use of the website.
            <br />- We do not guarantee that the website will be uninterrupted,
            secure, or free of errors.
          </p>

          <h2 className="text-xl font-semibold mb-2">9. Termination</h2>
          <p className="text-gray-600 mb-4">
            We may terminate or suspend your access to the website immediately,
            without prior notice or liability, if you breach these terms.
          </p>

          <h2 className="text-xl font-semibold mb-2">10. Governing Law</h2>
          <p className="text-gray-600 mb-4">
            These terms are governed by and construed in accordance with the
            laws of Bangladesh. Any disputes arising from or relating to these
            terms will be resolved in the courts of Bangladesh.
          </p>

          <h2 className="text-xl font-semibold mb-2">11. Contact Us</h2>
          <p className="text-gray-600">
            If you have any questions about these Terms & Conditions, please
            contact us at{" "}
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
    </div>
  );
};

export default TermsAndConditionsModal;
