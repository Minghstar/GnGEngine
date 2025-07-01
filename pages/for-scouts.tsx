import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';

export default function ForScouts() {
  return (
    <Layout 
      title="For Scouts - GNG Engine"
      description="Discover how GNG Engine helps scouts and organizations find top Australian college athletes. Learn how to use the platform and get in touch."
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Hero/Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4 font-heading">
            For Scouts & Organizations
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto font-body">
            GNG Engine is your gateway to discovering, evaluating, and connecting with Australia's top college athletes across all sports.
          </p>
        </div>

        {/* Value Proposition */}
        <Card className="mb-10">
          <h2 className="text-2xl font-bold text-charcoal mb-4 font-heading">Why Use GNG Engine?</h2>
          <ul className="list-disc pl-6 space-y-2 text-text-secondary font-body">
            <li>Access a curated, up-to-date directory of Australian college athletes.</li>
            <li>Filter by sport, college, year, and more to find the right talent.</li>
            <li>View detailed athlete profiles with academic and athletic background.</li>
            <li>Save time and effort in your scouting and recruitment process.</li>
            <li>Connect directly with athletes or request more information (coming soon).</li>
          </ul>
        </Card>

        {/* Step-by-Step Guide */}
        <Card className="mb-10">
          <h2 className="text-2xl font-bold text-charcoal mb-4 font-heading">How It Works</h2>
          <ol className="list-decimal pl-6 space-y-2 text-text-secondary font-body">
            <li>Browse the <a href="/directory" className="text-primary-red underline">Athlete Directory</a> to discover talent.</li>
            <li>Use advanced filters to narrow your search by sport, college, year, or nationality.</li>
            <li>Click on an athlete to view their full profile, background, and highlights.</li>
            <li>Use the "Scout This Athlete" button to express interest or request contact (feature coming soon).</li>
            <li>For custom scouting needs, <a href="/contact" className="text-primary-red underline">contact us</a> directly.</li>
          </ol>
        </Card>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <Button variant="primary" className="text-lg px-10 py-4">Contact GNG Engine</Button>
          <p className="text-text-secondary mt-4 font-body">
            Want to discuss your scouting needs or request a custom search? <br />
            <a href="mailto:info@gngengine.com" className="text-primary-red underline">Email us</a> and our team will get back to you.
          </p>
        </div>
      </div>
    </Layout>
  );
} 