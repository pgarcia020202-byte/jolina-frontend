import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const [gameState, setGameState] = useState({
    score: 0,
    currentQuestion: 0,
    isPlaying: false,
    feedback: ''
  });

  const ecoQuestions = [
    {
      question: "What percentage of Earth's water is fresh water?",
      options: ["1%", "3%", "10%", "25%"],
      correct: 1
    },
    {
      question: "Which gas is primarily responsible for global warming?",
      options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
      correct: 2
    },
    {
      question: "How many tons of plastic enter our oceans each year?",
      options: ["1 million tons", "8 million tons", "15 million tons", "25 million tons"],
      correct: 1
    },
    {
      question: "What is the most effective way to reduce your carbon footprint?",
      options: ["Recycling", "Using reusable bags", "Reducing meat consumption", "Taking shorter showers"],
      correct: 2
    },
    {
      question: "Which renewable energy source is currently the most widely used globally?",
      options: ["Solar", "Wind", "Hydroelectric", "Geothermal"],
      correct: 2
    }
  ];

  const startGame = () => {
    setGameState({
      score: 0,
      currentQuestion: 0,
      isPlaying: true,
      feedback: ''
    });
  };

  const handleAnswer = (answerIndex) => {
    const currentQ = ecoQuestions[gameState.currentQuestion];
    let newScore = gameState.score;
    let feedback = '';

    if (answerIndex === currentQ.correct) {
      newScore += 10;
      feedback = '✅ Correct! Well done!';
    } else {
      feedback = `❌ Incorrect. The correct answer was: ${currentQ.options[currentQ.correct]}`;
    }

    setGameState({
      ...gameState,
      score: newScore,
      feedback
    });
  };

  const nextQuestion = () => {
    if (gameState.currentQuestion < ecoQuestions.length - 1) {
      setGameState({
        ...gameState,
        currentQuestion: gameState.currentQuestion + 1,
        feedback: ''
      });
    } else {
      setGameState({
        ...gameState,
        isPlaying: false,
        feedback: `Game Over! Your final score: ${gameState.score}/50`
      });
    }
  };

  return (
    <div className="about">
      {/* ==================== PAGE HEADER ==================== */}
      <section className="page-header">
        <div className="container">
          <h1>About Environmental Advocacy</h1>
          <p>Discover my passion for protecting our planet and the journey that led me to become an environmental advocate.</p>
        </div>
      </section>

      {/* ==================== MAIN CONTENT ==================== */}
      <main>
        {/* Content Section 1: What I Love About Environmental Advocacy */}
        <section className="section">
          <div className="container">
            <div className="content-section">
              <h2>What I Love About Environmental Advocacy</h2>
              
              <div className="two-column">
                <div>
                  <p>Environmental advocacy is more than just a cause—it's a way of life that connects us to something greater than ourselves. What I love most about this field is the incredible power of collective action. When communities come together to protect a forest, clean a beach, or advocate for sustainable policies, the impact is profound and lasting.</p>
                  
                  <p>The beauty of environmental advocacy lies in its accessibility. Everyone can participate, regardless of age, background, or resources. From choosing reusable bags at the grocery store to organizing community clean-up events, every action contributes to the larger movement. This inclusivity makes environmental advocacy both empowering and inspiring.</p>
                  
                  <p>I'm particularly passionate about the intersection of environmental protection and social justice. Climate change disproportionately affects vulnerable communities, making environmental advocacy an essential component of building a more equitable world. By fighting for clean air, safe water, and protected green spaces, we're also fighting for human rights and dignity.</p>
                </div>
                
                {/* Image 1 */}
                <div className="image-container">
                  <img src="/assets/community-garden.jpg" alt="Community members working together in a vibrant urban garden, planting vegetables and flowers" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section 2: My Journey with Environmental Advocacy */}
        <section className="section section-light">
          <div className="container">
            <div className="content-section">
              <h2>My Journey with Environmental Advocacy</h2>
              
              <div className="two-column">
                {/* Image 2 */}
                <div className="image-container">
                  <img src="/assets/nature-exploration.jpg" alt="Person hiking through a scenic mountain trail surrounded by lush greenery and wildflowers" />
                </div>
                
                <div>
                  <p>My environmental journey began during childhood, when my family would spend weekends exploring local parks and nature reserves. Those early experiences instilled in me a deep appreciation for the natural world and a desire to protect it. Watching documentaries about endangered species and climate change further fueled my passion.</p>
                  
                  <p>In school, I became involved in environmental clubs and participated in tree-planting initiatives. These experiences taught me the importance of hands-on action and community engagement. I learned that environmental advocacy isn't just about raising awareness—it's about taking concrete steps to create change.</p>
                  
                  <p>Today, I continue to advocate for environmental causes through various channels. Whether it's reducing my personal carbon footprint, supporting sustainable businesses, or educating others about environmental issues, I strive to make a positive impact every day. This portfolio represents my commitment to sharing knowledge and inspiring others to join the environmental movement.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ordered List: Learning/Involvement Timeline */}
        <section className="section">
          <div className="container">
            <div className="content-section">
              <h2>My Environmental Timeline</h2>
              <p>Here's an overview of my journey in environmental advocacy, from early experiences to current initiatives:</p>
              
              <ol className="timeline-list">
                <li><strong>Early Childhood:</strong> Developed a love for nature through family camping trips and visits to national parks, learning to appreciate biodiversity and natural ecosystems.</li>
                <li><strong>Elementary School:</strong> Participated in my first Earth Day celebration and school recycling program, understanding the basics of waste reduction and conservation.</li>
                <li><strong>Middle School:</strong> Joined the Environmental Club and helped organize a school-wide campaign to reduce single-use plastics in the cafeteria.</li>
                <li><strong>High School:</strong> Led a community tree-planting initiative that resulted in over 200 trees planted in local parks and neighborhoods.</li>
                <li><strong>Recent Years:</strong> Expanded advocacy efforts to include social media awareness campaigns, participation in climate marches, and supporting sustainable local businesses.</li>
                <li><strong>Present Day:</strong> Creating educational content, building this portfolio, and continuously learning about new ways to protect and preserve our environment for future generations.</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Blockquote Section */}
        <section className="section section-light">
          <div className="container">
            <blockquote>
              "The Earth does not belong to us: we belong to the Earth. We do not inherit the land from our ancestors; we borrow it from our children."
              <cite>— Chief Seattle (attributed)</cite>
            </blockquote>
            
            <p className="text-center mt-lg">This quote perfectly encapsulates why environmental advocacy matters. We have a responsibility to be stewards of the Earth, ensuring that future generations inherit a healthy, thriving planet. Every decision we make today shapes the world our children and grandchildren will live in.</p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="content-section" id="eco-game">
              <h2 className="text-center">Eco Quiz Mini-Game</h2>
              <p className="text-center">Test your eco-knowledge with a quick quiz. Get the highest score you can!</p>

              <div className="game-card">
                <div className="game-top">
                  <div className="game-score">Score: <span>{gameState.score}</span></div>
                  <div className="game-actions">
                    <button className="btn btn-primary" type="button" onClick={startGame}>
                      Start Game
                    </button>
                    {gameState.isPlaying && (
                      <button className="btn btn-secondary" type="button" onClick={nextQuestion} disabled={!gameState.feedback}>
                        Next
                      </button>
                    )}
                  </div>
                </div>

                <div className="game-question">
                  {gameState.isPlaying 
                    ? ecoQuestions[gameState.currentQuestion].question 
                    : 'Press "Start Game" to begin.'
                  }
                </div>
                
                {gameState.isPlaying && (
                  <div className="game-options">
                    {ecoQuestions[gameState.currentQuestion].options.map((option, index) => (
                      <button 
                        key={index}
                        className="btn btn-outline game-option"
                        onClick={() => handleAnswer(index)}
                        disabled={gameState.feedback !== ''}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
                
                {gameState.feedback && (
                  <div className="game-feedback">{gameState.feedback}</div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="section">
          <div className="container text-center">
            <h2>Ready to Start Your Own Journey?</h2>
            <p>Environmental advocacy begins with a single step. Whether you're just starting to learn about sustainability or looking to deepen your involvement, there are countless ways to make a difference.</p>
            <div className="mt-lg">
              <Link to="/register" className="btn btn-primary">Join Our Community</Link>
              <Link to="/contact" className="btn btn-secondary">Explore Resources</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
