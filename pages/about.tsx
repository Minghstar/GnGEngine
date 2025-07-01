import Layout from '../components/Layout';
import Card from '../components/Card';

export default function About() {
  return (
    <Layout 
      title="About Us - GNG Engine"
      description="Learn about GNG Engine's mission to showcase Australian college athletes and connect them with opportunities. Meet our team and discover our story."
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-charcoal mb-4 font-heading">
            About GNG Engine
          </h1>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto font-body">
            Connecting Australia's college athletes with opportunities and building the future of sports.
          </p>
        </div>

        {/* Mission Section */}
        <Card className="mb-12">
          <h2 className="text-2xl font-bold text-charcoal mb-4 font-heading">Our Mission</h2>
          <p className="text-base text-text-secondary leading-relaxed mb-4 font-body">
            GNG Engine is dedicated to showcasing the incredible talent of Australian college athletes 
            and creating meaningful connections between athletes, coaches, scouts, and opportunities. 
            We believe that every athlete deserves to be discovered and every opportunity deserves to 
            find the right person.
          </p>
          <p className="text-base text-text-secondary leading-relaxed font-body">
            Our platform serves as a bridge between the raw talent found in Australian universities 
            and the global sports community, helping athletes accelerate their careers while providing 
            organizations access to the best emerging talent.
          </p>
        </Card>

        {/* What We Do Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-charcoal mb-8 text-center font-heading">
            What We Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <div className="w-14 h-14 bg-primary-red rounded-full flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-charcoal mb-2 font-heading">Athlete Discovery</h3>
              <p className="text-text-secondary font-body">
                We maintain a comprehensive directory of Australian college athletes across all sports, 
                making it easy for scouts, coaches, and organizations to discover new talent.
              </p>
            </Card>
            <Card>
              <div className="w-14 h-14 bg-primary-red rounded-full flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-charcoal mb-2 font-heading">Network Building</h3>
              <p className="text-text-secondary font-body">
                We facilitate connections between athletes and opportunities, helping build a strong 
                network within the Australian sports community.
              </p>
            </Card>
            <Card>
              <div className="w-14 h-14 bg-primary-red rounded-full flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-charcoal mb-2 font-heading">Career Acceleration</h3>
              <p className="text-text-secondary font-body">
                By providing exposure and connections, we help athletes accelerate their careers 
                and reach their full potential in sports and beyond.
              </p>
            </Card>
            <Card>
              <div className="w-14 h-14 bg-primary-red rounded-full flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-charcoal mb-2 font-heading">Quality Assurance</h3>
              <p className="text-text-secondary font-body">
                We verify and maintain the quality of our athlete profiles, ensuring that organizations 
                can trust the information they find on our platform.
              </p>
            </Card>
          </div>
        </div>

        {/* Background Section */}
        <Card className="mb-12">
          <h2 className="text-2xl font-bold text-charcoal mb-4 font-heading">Our Background</h2>
          <p className="text-base text-text-secondary leading-relaxed mb-4 font-body">
            GNG Engine was born from a simple observation: there was no centralized platform 
            showcasing the incredible talent of Australian college athletes. While universities 
            have their own sports programs, there was no easy way for external organizations, 
            scouts, or fans to discover and connect with these athletes.
          </p>
          <p className="text-base text-text-secondary leading-relaxed mb-4 font-body">
            We recognized that many talented athletes were flying under the radar, missing out 
            on opportunities that could accelerate their careers. At the same time, organizations 
            looking for talent were struggling to find the right people for their programs.
          </p>
          <p className="text-base text-text-secondary leading-relaxed font-body">
            Today, GNG Engine serves as the premier platform for discovering Australian college 
            athletes, helping bridge the gap between talent and opportunity across all sports 
            and universities nationwide.
          </p>
        </Card>

        {/* Founder Section */}
        <Card className="mb-12">
          <h2 className="text-2xl font-bold text-charcoal mb-4 font-heading">Meet Our Founder</h2>
          <div className="md:flex items-center">
            <div className="md:w-1/3 mb-6 md:mb-0">
              <div className="w-32 h-32 bg-gradient-to-br from-primary-red to-accent-blue rounded-full flex items-center justify-center mx-auto">
                <span className="text-white text-3xl font-bold font-heading">GNG</span>
              </div>
            </div>
            <div className="md:w-2/3 md:pl-8">
              <h3 className="text-xl font-semibold text-charcoal mb-2 font-heading">
                GNG Engine Team
              </h3>
              <p className="text-base text-text-secondary leading-relaxed mb-2 font-body">
                Our team is passionate about sports and committed to helping Australian college 
                athletes succeed. We understand the challenges athletes face in getting noticed 
                and the opportunities that can come from the right connections.
              </p>
              <p className="text-base text-text-secondary leading-relaxed font-body">
                With backgrounds in sports, technology, and business, we've built GNG Engine 
                to be the platform we wish existed when we were college athletes ourselves.
              </p>
            </div>
          </div>
        </Card>

        {/* Contact Section */}
        <Card>
          <h2 className="text-2xl font-bold text-charcoal mb-4 font-heading">Get In Touch</h2>
          <p className="text-lg mb-4 font-body text-text-secondary">
            Have questions about GNG Engine? Want to learn more about how we can help you?
          </p>
          <div className="space-y-2">
            <p className="text-base font-body text-text-secondary">
              <strong>Email:</strong> <a href="mailto:info@gngengine.com" className="text-primary-red underline">info@gngengine.com</a>
            </p>
            <p className="text-base font-body text-text-secondary">
              <strong>Follow us:</strong> @GNGEngine on social media
            </p>
          </div>
        </Card>
      </div>
    </Layout>
  );
} 