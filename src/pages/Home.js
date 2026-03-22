import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      {/* ==================== HERO SECTION ==================== */}
      <section className="hero">
        <div className="hero-content">
          <h1>Protecting Our Planet, One Action at a Time</h1>
          <p>Join the movement for environmental advocacy. Together, we can create sustainable solutions for climate change, preserve biodiversity, and build a greener future for generations to come.</p>
          <div>
            <Link to="/register" className="btn btn-primary">Join the Movement</Link>
            <Link to="/about" className="btn btn-outline">Learn More</Link>
          </div>
          
          {/* Featured Hero Image */}
          <div className="hero-image">
            <img src="/assets/hero-nature.jpg" alt="Lush green forest with sunlight streaming through the trees, representing the beauty of nature we strive to protect" />
          </div>
        </div>
      </section>

      {/* ==================== MAIN CONTENT ==================== */}
      <main>
        {/* Key Highlights Section */}
        <section className="section">
          <div className="container">
            <h2 className="text-center">Why Environmental Advocacy Matters</h2>
            <p className="text-center">Every action counts in the fight to protect our planet. Here are key reasons why environmental advocacy is crucial today.</p>
            
            <div className="highlights">
              <h3>Key Highlights</h3>
              <ul>
                <li>Climate change affects every continent, with rising temperatures causing extreme weather events and threatening ecosystems worldwide.</li>
                <li>Over 1 million species are currently at risk of extinction due to habitat loss, pollution, and human activities.</li>
                <li>Sustainable practices can reduce carbon footprints by up to 50% when adopted at individual and community levels.</li>
                <li>Clean energy investments create three times more jobs than fossil fuel industries while protecting our atmosphere.</li>
                <li>Youth-led environmental movements have successfully influenced policy changes in over 100 countries globally.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Preview Section 1: About */}
        <section className="section section-light">
          <div className="container">
            <h2 className="text-center">Discover Our Mission</h2>
            <div className="card-grid">
              {/* Card 1 */}
              <div className="card">
                <div className="card-image">
                  <img src="/assets/climate-action.jpg" alt="Group of volunteers planting trees in a community garden" />
                </div>
                <div className="card-content">
                  <h3>Climate Action</h3>
                  <p>Learn about the urgent need for climate action and how individuals can make meaningful contributions to reducing greenhouse gas emissions.</p>
                  <Link to="/about" className="btn btn-secondary">Read More</Link>
                </div>
              </div>
              
              {/* Card 2 */}
              <div className="card">
                <div className="card-image">
                  <img src="/assets/ocean-conservation.jpg" alt="Crystal clear ocean water with coral reef and marine life" />
                </div>
                <div className="card-content">
                  <h3>Ocean Conservation</h3>
                  <p>Explore the importance of protecting our oceans, reducing plastic pollution, and preserving marine biodiversity for future generations.</p>
                  <Link to="/about" className="btn btn-secondary">Read More</Link>
                </div>
              </div>
              
              {/* Card 3 */}
              <div className="card">
                <div className="card-image">
                  <img src="/assets/sustainable-living.jpg" alt="Eco-friendly home with solar panels and garden" />
                </div>
                <div className="card-content">
                  <h3>Sustainable Living</h3>
                  <p>Discover practical tips for adopting a sustainable lifestyle, from reducing waste to choosing eco-friendly products and renewable energy.</p>
                  <Link to="/about" className="btn btn-secondary">Read More</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Preview Section 2: Resources & Contact */}
        <section className="section section-dark">
          <div className="container">
            <h2 className="text-center">Connect & Get Involved</h2>
            <p className="text-center">Ready to make a difference? Explore our resources, connect with like-minded advocates, and take the first step toward environmental action.</p>
            
            <div className="card-grid">
              {/* Resource Preview */}
              <div className="card">
                <div className="card-content">
                  <h3>📚 Resources Library</h3>
                  <p>Access curated resources including guides, research papers, and tools to help you understand environmental issues and take informed action.</p>
                  <Link to="/contact" className="btn btn-primary">View Resources</Link>
                </div>
              </div>
              
              {/* Contact Preview */}
              <div className="card">
                <div className="card-content">
                  <h3>✉️ Get in Touch</h3>
                  <p>Have questions or want to collaborate? Reach out through our contact form. We welcome partnerships with individuals and organizations.</p>
                  <Link to="/contact" className="btn btn-primary">Contact Us</Link>
                </div>
              </div>
              
              {/* Register Preview */}
              <div className="card">
                <div className="card-content">
                  <h3>🌱 Join Our Community</h3>
                  <p>Sign up to receive updates on environmental news, upcoming events, and opportunities to participate in advocacy campaigns.</p>
                  <Link to="/register" className="btn btn-primary">Sign Up Now</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Preview Section 3: Call to Action */}
        <section className="section">
          <div className="container text-center">
            <h2>Ready to Make a Difference?</h2>
            <p>Environmental advocacy starts with awareness and grows through action. Whether you're new to sustainability or a seasoned activist, there's a place for you in this movement.</p>
            <div className="mt-lg">
              <Link to="/register" className="btn btn-primary">Join the Movement Today</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
