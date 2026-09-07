const SkillsSection = () => {
  const skillCategories = [
    ["Interface", "React / TypeScript / D3.js / information architecture"],
    ["Systems", "Python / Django / Flask / REST APIs / Azure"],
    ["Experience", "Figma / user research / teaching / facilitation"],
    ["Intelligence", "Machine learning / NLP / AI agents / security"],
  ];

  return (
    <section className="atlas-section atlas-section--deep" aria-labelledby="skills-title">
      <div className="atlas-section-inner">
        <div className="atlas-section-heading">
          <div>
            <p className="eyebrow">A practical toolkit</p>
            <h2 id="skills-title">Many tools. One point of view.</h2>
          </div>
          <p>Technology is the material. Good judgment is the method.</p>
        </div>
        <div className="atlas-skill-grid">
          {skillCategories.map(([title, skills], index) => (
            <article className="atlas-skill" key={title}>
              <span className="atlas-role-index">0{index + 1}</span>
              <h3>{title}</h3>
              <p className="atlas-skill-list">{skills}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
