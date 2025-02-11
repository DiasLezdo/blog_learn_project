import Link from "next/link";
import React from "react";

const page = async () => {
  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-3 dark:text-cyan-500">
      <h5 className="mt-5">Effective Date: [02-11-25]</h5>
      <p>
        Welcome to Belogoo. This Privacy Policy explains how we collect, use,
        and safeguard your information when you visit or interact with our
        website. By accessing or using Belogoo, you agree to the practices
        described in this policy.
      </p>
      <div className="mt-5 flex flex-col gap-3">
        <h2 className="text-xl font-medium">Information We Collect</h2>
        <p>
          Account Registration: If you choose to register for an account, we may
          collect personal details such as your name, email address, username,
          and any other information you voluntarily provide. User Content: When
          you post your art, write blog posts, or leave comments, the content
          you submit becomes publicly visible. While we do not claim ownership
          of your content, by submitting it you grant Belogoo a license to
          display and distribute it on our platform.Usage Data: We may
          automatically collect information such as your IP address, browser
          type, operating system, referring URLs, pages viewed, and other usage
          statistics. This information is used to analyze trends and administer
          the site. Cookies and Similar Technologies: We may use cookies or
          similar technologies to enhance your experience, remember your
          preferences, and understand how you interact with our site. You can
          control cookie settings through your browser, but note that disabling
          cookies may affect functionality.
        </p>
      </div>
      <div className="mt-5 flex flex-col gap-3">
        <h2 className="text-xl font-medium">How We Use Your Information</h2>
        <p>
          Belogoo uses the collected information for several purposes, including
          to: Provide and maintain our website. Enhance and personalize your
          experience on our platform. Monitor and analyze usage and trends to
          improve our services. Communicate with you regarding updates,
          promotional offers, or important notices related to your account and
          our services. Ensure the security of our platform and prevent misuse.
        </p>
      </div>
      <div className="mt-5 flex flex-col gap-3">
        <h2 className="text-xl font-medium">Third-Party Services</h2>
        <p>
          Authentication: We do not use any third-party authentication services.
          Other Services: While we currently do not integrate external
          authentication providers, we may use third-party analytics or
          performance monitoring tools. These services may collect data as
          described above. Please note that these third parties have their own
          privacy policies that govern their use of your data.
        </p>
      </div>
      <div className="mt-5 flex flex-col gap-3">
        <h2 className="text-xl font-medium">Data Security</h2>
        <p>
          We implement a variety of technical and organizational measures to
          safeguard your personal information. However, no method of
          transmission or storage is completely secure. While we strive to
          protect your data, we cannot guarantee absolute security.
        </p>
      </div>
      <div className="mt-5 flex flex-col gap-3">
        <h2 className="text-xl font-medium">Your Rights and Choices</h2>
        <p>
          Depending on your jurisdiction, you may have rights regarding your
          personal information, such as: The right to access the data we hold
          about you. The right to request correction or deletion of your data.
          The right to restrict or object to our processing of your data.
        </p>
      </div>
      <div className="mt-5 flex flex-col gap-3">
        <h2 className="text-xl font-medium">Children’s Privacy</h2>
        <p>
          Belogoo is not intended for individuals under the age of 13. We do not
          knowingly collect personal information from children under 13. If you
          believe that we have inadvertently collected such information, please
          contact us so that we can promptly remove it.
        </p>
      </div>
      <div className="mt-5 flex flex-col gap-3">
        <h2 className="text-xl font-medium">Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page with a revised effective date. We encourage you
          to review this policy periodically to stay informed about how we
          protect your information. Your continued use of Belogoo after any
          modifications signifies your acceptance of the updated terms.
        </p>
      </div>
      <div className="mt-5 flex flex-col gap-3">
        <h2 className="text-xl font-medium">Contact Us</h2>
        <p>
          If you have any questions, concerns, or requests regarding this
          Privacy Policy or our data practices, please contact us at:
        </p>
        <ul>
          <li>
            Email :{" "}
            <Link href={"mailto:diazlezdo@gmail.com"}>team@belogoo.com</Link>
          </li>
          <li>
            Contact :{" "}
            <Link className="text-blue-500 dark:text-white" href={"/contact"}>
              here
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default page;
