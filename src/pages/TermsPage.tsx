const TermsPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Terms of Service</h1>

        <div className="prose max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Acceptance of Terms</h2>
            <p className="text-gray-600 mb-4">
              By accessing and using Impact Prodige, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Use License</h2>
            <p className="text-gray-600 mb-4">
              Permission is granted to temporarily use Impact Prodige for personal, non-commercial purposes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Disclaimer</h2>
            <p className="text-gray-600 mb-4">
              The materials on Impact Prodige are provided on an 'as is' basis. We make no warranties, expressed or implied.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms, please contact us.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
