// Initialize D3.js Architecture Diagram
document.addEventListener("DOMContentLoaded", function () {
  // D3.js Architecture Diagram
  function createArchitectureDiagram() {
    const container = document.getElementById("mermaid-diagram");
    if (!container) return;

    // Clear existing content
    container.innerHTML = "";

    // Set up dimensions
    const margin = { top: 40, right: 40, bottom: 40, left: 40 };
    const width =
      Math.min(900, container.clientWidth) - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    // Create SVG
    const svg = d3
      .select(container)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr(
        "viewBox",
        `0 0 ${width + margin.left + margin.right} ${
          height + margin.top + margin.bottom
        }`
      )
      .style("background", "linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)")
      .style("border-radius", "12px")
      .style("box-shadow", "0 4px 20px rgba(0,0,0,0.08)");

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Define nodes with better positioning
    const nodes = [
      {
        id: "user",
        label: "End User",
        type: "user",
        x: width * 0.15,
        y: height * 0.3,
        icon: "👥",
        description: "Accessing website",
      },
      {
        id: "expert",
        label: "a7d Expert",
        type: "expert",
        x: width * 0.15,
        y: height * 0.7,
        icon: "🔧",
        description: "Accessibility specialist",
      },
      {
        id: "prod",
        label: "Production\nWorker",
        type: "worker",
        x: width * 0.5,
        y: height * 0.3,
        icon: "⚡",
        description: "Cloudflare Edge",
      },
      {
        id: "sandbox",
        label: "Sandbox\nWorker",
        type: "worker",
        x: width * 0.5,
        y: height * 0.7,
        icon: "🧪",
        description: "Testing environment",
      },
      {
        id: "website",
        label: "Company\nWebsite",
        type: "website",
        x: width * 0.85,
        y: height * 0.5,
        icon: "🌍",
        description: "Origin server",
      },
    ];

    // Define links with enhanced styling
    const links = [
      {
        source: "expert",
        target: "sandbox",
        label: "Reviews changes",
        type: "expert",
        curve: false,
      },
      {
        source: "sandbox",
        target: "prod",
        label: "Promotes changes",
        type: "flow",
        curve: false,
      },
      {
        source: "prod",
        target: "user",
        label: "✅ Accessible code",
        type: "success",
        curve: false,
      },
      {
        source: "website",
        target: "prod",
        label: "Original content",
        type: "secondary",
        curve: false,
      },
    ];

    // Create gradients and filters
    const defs = svg.append("defs");

    // Node gradients
    const createGradient = (id, color1, color2) => {
      const gradient = defs
        .append("linearGradient")
        .attr("id", id)
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "0%")
        .attr("y2", "100%");

      gradient
        .append("stop")
        .attr("offset", "0%")
        .attr("style", `stop-color:${color1};stop-opacity:1`);

      gradient
        .append("stop")
        .attr("offset", "100%")
        .attr("style", `stop-color:${color2};stop-opacity:1`);
    };

    createGradient("userGradient", "#dbeafe", "#bfdbfe");
    createGradient("workerGradient", "#eff6ff", "#dbeafe");
    createGradient("expertGradient", "#e0e7ff", "#c7d2fe");
    createGradient("websiteGradient", "#f1f5f9", "#e2e8f0");

    // Glow filter
    const glowFilter = defs
      .append("filter")
      .attr("id", "glow")
      .attr("width", "300%")
      .attr("height", "300%")
      .attr("x", "-100%")
      .attr("y", "-100%");

    glowFilter
      .append("feGaussianBlur")
      .attr("stdDeviation", "3")
      .attr("result", "coloredBlur");

    const feMerge = glowFilter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // Arrow markers with different colors
    const createArrowMarker = (id, color) => {
      defs
        .append("marker")
        .attr("id", id)
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 12)
        .attr("refY", 0)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5")
        .attr("fill", color)
        .style("filter", "drop-shadow(0px 2px 4px rgba(0,0,0,0.2))");
    };

    createArrowMarker("arrow-primary", "#2563eb");
    createArrowMarker("arrow-expert", "#6366f1");
    createArrowMarker("arrow-flow", "#3b82f6");
    createArrowMarker("arrow-success", "#10b981");
    createArrowMarker("arrow-secondary", "#64748b");

    // Draw links with curves
    const linkGroup = g.append("g").attr("class", "links");

    links.forEach((link, index) => {
      const sourceNode = nodes.find((n) => n.id === link.source);
      const targetNode = nodes.find((n) => n.id === link.target);

      const colors = {
        primary: "#2563eb",
        expert: "#6366f1",
        flow: "#3b82f6",
        success: "#10b981",
        secondary: "#64748b",
      };

      const color = colors[link.type] || "#64748b";

      if (link.curve) {
        // Create curved path
        const dx = targetNode.x - sourceNode.x;
        const dy = targetNode.y - sourceNode.y;
        const dr = Math.sqrt(dx * dx + dy * dy) * 0.3;

        const path = linkGroup
          .append("path")
          .attr(
            "d",
            `M${sourceNode.x},${sourceNode.y}A${dr},${dr} 0 0,1 ${targetNode.x},${targetNode.y}`
          )
          .attr("stroke", color)
          .attr("stroke-width", 3)
          .attr("fill", "none")
          .attr("marker-end", `url(#arrow-${link.type})`)
          .style("opacity", 0)
          .style("filter", "drop-shadow(0px 2px 4px rgba(0,0,0,0.1))");

        // Animate path drawing
        const totalLength = path.node().getTotalLength();
        path
          .attr("stroke-dasharray", totalLength + " " + totalLength)
          .attr("stroke-dashoffset", totalLength)
          .transition()
          .delay(index * 200)
          .duration(1000)
          .style("opacity", 0.8)
          .attr("stroke-dashoffset", 0);

        // Add label on curve
        const midPoint = path.node().getPointAtLength(totalLength / 2);
        linkGroup
          .append("text")
          .attr("x", midPoint.x)
          .attr("y", midPoint.y - 8)
          .attr("text-anchor", "middle")
          .attr("class", "link-label")
          .style("font-size", "11px")
          .style("font-weight", "600")
          .style("fill", color)
          .style("opacity", 0)
          .style("background", "white")
          .style("font-family", "Inter, sans-serif")
          .text(link.label)
          .transition()
          .delay(index * 200 + 500)
          .duration(500)
          .style("opacity", 1);
      } else {
        // Straight line
        const line = linkGroup
          .append("line")
          .attr("x1", sourceNode.x)
          .attr("y1", sourceNode.y)
          .attr("x2", sourceNode.x)
          .attr("y2", sourceNode.y)
          .attr("stroke", color)
          .attr("stroke-width", 3)
          .attr("marker-end", `url(#arrow-${link.type})`)
          .style("opacity", 0.8)
          .style("filter", "drop-shadow(0px 2px 4px rgba(0,0,0,0.1))")
          .transition()
          .delay(index * 200)
          .duration(1000)
          .attr("x2", targetNode.x)
          .attr("y2", targetNode.y);

        // Add label
        const midX = (sourceNode.x + targetNode.x) / 2;
        const midY = (sourceNode.y + targetNode.y) / 2;

        linkGroup
          .append("text")
          .attr("x", midX)
          .attr("y", midY - 8)
          .attr("text-anchor", "middle")
          .attr("class", "link-label")
          .style("font-size", "11px")
          .style("font-weight", "600")
          .style("fill", color)
          .style("opacity", 0)
          .style("font-family", "Inter, sans-serif")
          .text(link.label)
          .transition()
          .delay(index * 200 + 500)
          .duration(500)
          .style("opacity", 1);
      }
    });

    // Draw nodes
    const nodeGroup = g.append("g").attr("class", "nodes");

    nodes.forEach((node, index) => {
      const nodeG = nodeGroup
        .append("g")
        .attr("transform", `translate(${node.x}, ${node.y})`)
        .style("opacity", 0);

      const gradientMap = {
        user: "url(#userGradient)",
        worker: "url(#workerGradient)",
        expert: "url(#expertGradient)",
        website: "url(#websiteGradient)",
      };

      const strokeMap = {
        user: "#2563eb",
        worker: "#3b82f6",
        expert: "#6366f1",
        website: "#64748b",
      };

      // Node background circle
      const circle = nodeG
        .append("circle")
        .attr("r", 50)
        .attr("fill", gradientMap[node.type])
        .attr("stroke", strokeMap[node.type])
        .attr("stroke-width", 4)
        .style("filter", "drop-shadow(0px 8px 16px rgba(0,0,0,0.15))");

      // Icon
      nodeG
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "-8")
        .style("font-size", "24px")
        .text(node.icon);

      // Main label
      const labelLines = node.label.split("\n");
      const labelGroup = nodeG.append("g");

      labelLines.forEach((line, i) => {
        labelGroup
          .append("text")
          .attr("text-anchor", "middle")
          .attr("dy", 15 + i * 14)
          .style("font-size", "12px")
          .style("font-weight", "700")
          .style("fill", "#1e293b")
          .style("font-family", "Inter, sans-serif")
          .text(line);
      });

      // Description
      nodeG
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dy", 35)
        .style("font-size", "10px")
        .style("font-weight", "500")
        .style("fill", "#64748b")
        .style("font-family", "Inter, sans-serif")
        .text(node.description);

      // Animate node appearance
      nodeG
        .transition()
        .delay(index * 300)
        .duration(800)
        .style("opacity", 1)
        .attr("transform", `translate(${node.x}, ${node.y}) scale(1)`)
        .ease(d3.easeElasticOut);

      // Add hover effects
      nodeG
        .style("cursor", "pointer")
        .on("mouseenter", function () {
          d3.select(this)
            .select("circle")
            .transition()
            .duration(300)
            .attr("r", 55)
            .attr("stroke-width", 5)
            .style(
              "filter",
              "drop-shadow(0px 12px 24px rgba(0,0,0,0.2)) url(#glow)"
            );

          d3.select(this)
            .transition()
            .duration(300)
            .attr("transform", `translate(${node.x}, ${node.y}) scale(1.05)`);
        })
        .on("mouseleave", function () {
          d3.select(this)
            .select("circle")
            .transition()
            .duration(300)
            .attr("r", 50)
            .attr("stroke-width", 4)
            .style("filter", "drop-shadow(0px 8px 16px rgba(0,0,0,0.15))");

          d3.select(this)
            .transition()
            .duration(300)
            .attr("transform", `translate(${node.x}, ${node.y}) scale(1)`);
        });
    });

    // Add title
    g.append("text")
      .attr("x", width / 2)
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "700")
      .style("fill", "#1e293b")
      .style("font-family", "Inter, sans-serif")
      .style("opacity", 0)
      .text("a7d Edge Processing Architecture")
      .transition()
      .delay(1500)
      .duration(800)
      .style("opacity", 1);
  }

  // Initialize the diagram
  createArchitectureDiagram();

  // Make responsive
  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(createArchitectureDiagram, 300);
  });

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
