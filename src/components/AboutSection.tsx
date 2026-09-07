const AboutSection = () => {
  const roles = [
    ["01", "Teaching", "Python, AI, and machine learning made tangible."],
    ["02", "Researching", "HCI questions where pedagogy meets technology."],
    ["03", "Building", "Digital products with clarity, care, and a point of view."],
    ["04", "Explaining", "AI ideas for people who want to understand the why."],
  ];

  return (
    <section className="atlas-section" aria-labelledby="about-title">
      <div className="atlas-section-inner">
        <div className="atlas-section-heading">
          <div>
            <p className="eyebrow">A multidisciplinary practice</p>
            <h2 id="about-title">The work between the lines.</h2>
          </div>
          <p>One practice, four entry points. I move between making, teaching, research, and translating ideas for wider audiences.</p>
        </div>
        <div className="atlas-role-grid">
          {roles.map(([index, title, description]) => (
            <article className="atlas-role" key={index}>
              <span className="atlas-role-index">{index}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
        <p className="atlas-bio">My background spans language education, cybersecurity, and full-stack development. The common thread is making complex systems easier to enter, understand, and use.</p>
      </div>
    </section>
  );
};

export default AboutSection;
