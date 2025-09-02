// Initialize Mermaid
document.addEventListener("DOMContentLoaded", function () {
  // Configure Mermaid
  mermaid.initialize({
    startOnLoad: true,
    theme: "default",
    themeVariables: {
      primaryColor: "#2563eb",
      primaryTextColor: "#1e293b",
      primaryBorderColor: "#2563eb",
      lineColor: "#64748b",
      sectionBkgColor: "#f8fafc",
      altSectionBkgColor: "#ffffff",
      gridColor: "#e2e8f0",
      secondaryColor: "#64748b",
      tertiaryColor: "#f1f5f9",
      background: "#ffffff",
      fontFamily: "Inter, sans-serif",
    },
    flowchart: {
      useMaxWidth: true,
      htmlLabels: true,
      curve: "basis",
    },
  });

  // Define the Mermaid diagram
  const diagramDefinition = `
    flowchart LR
        A[End user] --> cf1[Cloudflare Worker Production]
        B[Authenticated a7d Accessibility Expert] --> cf2[Cloudflare Worker Sandbox]
        cf2 --> |Injected JS Overlay Editor| B
        cf2 --> cf1
        cf1 --> cf2
        cf1 --> |Accessible Code| A
        cf1 --> X[Company Website]
        X[Company Website] --> cf1
        
        classDef userClass fill:#dbeafe,stroke:#2563eb,stroke-width:2px,color:#1e293b
        classDef workerClass fill:#f0fdf4,stroke:#10b981,stroke-width:2px,color:#1e293b
        classDef websiteClass fill:#fef3c7,stroke:#f59e0b,stroke-width:2px,color:#1e293b
        classDef expertClass fill:#fce7f3,stroke:#ec4899,stroke-width:2px,color:#1e293b
        
        class A userClass
        class cf1,cf2 workerClass
        class X websiteClass
        class B expertClass
    `;

  // Render the diagram
  const diagramContainer = document.getElementById("mermaid-diagram");
  if (diagramContainer) {
    diagramContainer.innerHTML = diagramDefinition;
    mermaid.init(undefined, diagramContainer);
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Add click handlers for CTA buttons
  const ctaButtons = document.querySelectorAll(
    ".cta-primary, .cta-secondary, .cta-button"
  );
  ctaButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const buttonText = this.textContent.toLowerCase();

      if (buttonText.includes("demo")) {
        handleBookDemo();
      } else if (buttonText.includes("audit")) {
        handleDownloadAudit();
      } else if (buttonText.includes("checklist")) {
        handleGetChecklist();
      } else if (buttonText.includes("dashboard")) {
        handleViewDashboard();
      } else if (buttonText.includes("evidence")) {
        handleExportEvidence();
      }
    });
  });

  // CTA button handlers
  function handleBookDemo() {
    // In a real implementation, this would open a modal or redirect to a booking system
    alert(
      "Demo booking functionality would be integrated here. This could redirect to Calendly, HubSpot, or a custom booking system."
    );
    console.log("Book Demo clicked");
  }

  function handleDownloadAudit() {
    // In a real implementation, this would trigger a download or open a form
    alert(
      "Sample audit download would be triggered here. This could be a PDF download or a form to collect contact information."
    );
    console.log("Download Sample Audit clicked");
  }

  function handleGetChecklist() {
    // In a real implementation, this would download a checklist or open a form
    alert(
      "Checklist download would be triggered here. This could be a downloadable resource or lead magnet."
    );
    console.log("Get Checklist clicked");
  }

  function handleViewDashboard() {
    // In a real implementation, this would redirect to a dashboard demo or login
    alert(
      "Dashboard demo would open here. This could redirect to a live demo or demo video."
    );
    console.log("View Dashboard clicked");
  }

  function handleExportEvidence() {
    // In a real implementation, this would trigger evidence pack export
    alert(
      "Evidence pack export would be triggered here. This would typically require authentication."
    );
    console.log("Export Evidence Pack clicked");
  }

  // Add navbar scroll effect
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(255, 255, 255, 0.98)";
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)";
      navbar.style.boxShadow = "none";
    }
  });

  // Add intersection observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe sections for animation
  document.querySelectorAll("section").forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    observer.observe(section);
  });

  // Mobile menu toggle (basic implementation)
  const navBrand = document.querySelector(".nav-brand");
  const navLinks = document.querySelector(".nav-links");

  // Create mobile menu button
  const mobileMenuButton = document.createElement("button");
  mobileMenuButton.innerHTML = "☰";
  mobileMenuButton.className = "mobile-menu-btn";
  mobileMenuButton.style.cssText = `
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--primary-color);
        
        @media (max-width: 768px) {
            display: block;
        }
    `;

  // Add mobile menu functionality
  navBrand.parentNode.insertBefore(mobileMenuButton, navLinks);

  mobileMenuButton.addEventListener("click", function () {
    if (navLinks.style.display === "flex") {
      navLinks.style.display = "none";
    } else {
      navLinks.style.display = "flex";
      navLinks.style.flexDirection = "column";
      navLinks.style.position = "absolute";
      navLinks.style.top = "100%";
      navLinks.style.left = "0";
      navLinks.style.right = "0";
      navLinks.style.background = "white";
      navLinks.style.padding = "1rem";
      navLinks.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
    }
  });

  // Form validation helper function
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Analytics tracking (placeholder)
  function trackEvent(eventName, properties = {}) {
    console.log("Analytics Event:", eventName, properties);
    // In a real implementation, this would send data to analytics services
    // like Google Analytics, Mixpanel, or Segment
  }

  // Track page load
  trackEvent("Page Loaded", {
    page: "Landing Page",
    timestamp: new Date().toISOString(),
  });

  // Track section views
  const sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id || entry.target.className;
          trackEvent("Section Viewed", {
            section: sectionId,
            timestamp: new Date().toISOString(),
          });
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll("section").forEach((section) => {
    sectionObserver.observe(section);
  });

  console.log("a7d Landing Page initialized successfully");
});
