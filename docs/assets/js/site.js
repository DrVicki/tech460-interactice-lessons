// TECH460 Course Data
const courseModules = [
  {
    week: 1,
    title: "Career Advancement & GCA Orientation",
    description: "Self-assessment, advancement plan, and GCA/Python readiness. Launch a career and certification plan.",
    topics: ["Career Strategy", "GCA Orientation", "Python Readiness", "Certification Plan"]
  },
  {
    week: 2,
    title: "Python Foundations & String Operations",
    description: "Python, strings, and implementation planning. Document reliable foundation habits.",
    topics: ["Python Foundations", "String Operations", "Implementation Planning"]
  },
  {
    week: 3,
    title: "Looping & Interview Implementation",
    description: "Looping, pair discovery, and timed practice. Demonstrate structured traversal and debugging.",
    topics: ["Looping", "Pair Discovery", "Timed Practice", "Debugging"]
  },
  {
    week: 4,
    title: "Optimization & Multidimensional Problems",
    description: "Hash maps, pointers, matrices, and discussion. Explain correct, efficient trade-offs.",
    topics: ["Hash Maps", "Pointers", "Matrices", "Optimization"]
  },
  {
    week: 5,
    title: "Timed Readiness & Efficient Problem Solving",
    description: "Decomposition, efficiency, and GCA strategy. Prioritize remaining GCA review needs.",
    topics: ["Decomposition", "Efficiency", "GCA Strategy", "Problem Solving"]
  },
  {
    week: 6,
    title: "Official General Coding Assessment",
    description: "GCA readiness and official assessment. Complete the assigned GCA.",
    topics: ["GCA Readiness", "Official Assessment", "Coding Evaluation"]
  },
  {
    week: 7,
    title: "Career Corner: Translation to Industry",
    description: "Interview evidence, system design, and mock interview. Create interview-ready career evidence.",
    topics: ["Interview Evidence", "System Design", "Mock Interview", "Career Evidence"]
  },
  {
    week: 8,
    title: "Course Wrap-Up & Next Step",
    description: "Outcome review, remediation, and next step. Document the next career or certification step.",
    topics: ["Outcome Review", "Remediation", "Next Steps", "Certification Planning"]
  }
];

// Render curriculum
function renderCurriculum() {
  const container = document.getElementById('curriculum-list');
  if (!container) return;

  container.innerHTML = courseModules.map(module => `
    <div class="curriculum-item">
      <div class="curriculum-week">Week ${module.week}</div>
      <div class="curriculum-content">
        <h4>${module.title}</h4>
        <p>${module.description}</p>
        <div class="curriculum-topics">
          ${module.topics.map(topic => `<span class="topic-tag">${topic}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderCurriculum();
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
