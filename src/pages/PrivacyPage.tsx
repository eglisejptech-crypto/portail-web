const PrivacyPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Privacy Policy</h1>

        <div className="prose max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Introduction</h2>
            <p className="text-gray-600 mb-4">
              This Privacy Policy describes how Impact Prodige collects, uses, and protects your personal information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information We Collect</h2>
            <p className="text-gray-600 mb-4">
              We collect information that you provide directly to us, including name, email address, and other contact information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">
              We use the information we collect to provide, maintain, and improve our services, and to communicate with you.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about this Privacy Policy, please contact us.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
