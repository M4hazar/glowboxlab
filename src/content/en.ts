// Treści strony po angielsku. Zasada marki: bez długich myślników w tekstach.
export const en = {
  locale: "en",
  htmlLang: "en-GB",
  meta: {
    title: "GlowBox Lab | Custom LED Lightboxes",
    description:
      "Custom 3D printed LED lightboxes: business logos, esports team logos, gamer tags and personal gifts. Based in Walsall, UK, shipping across Europe.",
    ogImage: "/og/glowbox-lab-en.jpg",
    ogAlt: "GlowBox Lab LED lightbox with the hexagon logo glowing blue",
  },
  a11y: {
    skip: "Skip to content",
    menu: "Open menu",
    closeMenu: "Close menu",
    home: "GlowBox Lab home page",
    language: "Language",
    mainNav: "Main navigation",
  },
  nav: [
    { label: "Home", href: "#top" },
    { label: "Portfolio", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#quote" },
  ],
  cta: "Get a quote",
  hero: {
    eyebrow: "Custom LED lightboxes",
    title: ["Your idea.", "Made to glow."],
    lead: "Illuminated logos, names and artwork, 3D printed to order. For businesses, esports teams and gamers, and as gifts.",
    primary: "Get a quote",
    secondary: "View portfolio",
  },
  viewer: {
    light: "Light",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    rotateLeft: "Rotate left",
    rotateRight: "Rotate right",
    fullscreen: "Full screen",
    exitFullscreen: "Exit full screen",
    fallback:
      "The 3D preview is not available on this device, so here is the lightbox as a photo.",
    canvasLabel:
      "Interactive 3D model of the GlowBox Lab lightbox. Drag to rotate or use the buttons below.",
  },
  work: {
    title: "Portfolio",
    lead: "Sample lightbox designs.",
    controls: {
      roledescription: "carousel",
      scrollLeft: "Scroll left",
      scrollRight: "Scroll right",
      pause: "Pause scrolling",
      play: "Resume scrolling",
      previous: "Previous project",
      next: "Next project",
      close: "Close",
      counter: "{current} of {total}",
      cta: "Ask about a similar project",
      all: "View all",
    },
    items: [
      {
        image: "/images/work-devils.webp",
        alt: "Red and orange Devil's sign lightbox with a horned character and flames",
        title: "Logo outline",
        text: "For a bar, an esports team or a brand.",
        description:
          "The housing follows the exact outline of the logo, with flames and a character. It works where a sign has to catch the eye: behind a bar, on a tournament stage or in a gaming room.",
        details: [
          { label: "Shape", value: "Follows the logo outline" },
          { label: "Front colours", value: "Red, orange, white" },
        ],
      },
      {
        image: "/images/work-heart.webp",
        alt: "Red heart lightbox with the names Agnieszka and Paweł and yellow roses",
        title: "A personal gift",
        text: "Names and dates for a wedding, an anniversary or a birthday.",
        description:
          "A heart with names and roses, designed as a gift. A date, a dedication or your own artwork can be added.",
        details: [
          { label: "Shape", value: "Heart" },
          { label: "Front colours", value: "Red, yellow, cream" },
        ],
      },
      {
        image: "/images/work-logo.webp",
        alt: "Hexagon lightbox with the GlowBox Lab logo seen from the side",
        title: "Brand or channel logo",
        text: "For a desk, a counter, a gaming setup or a studio.",
        description:
          "A logo set in a simple hexagonal housing. It looks good on a counter, on a shelf and in the background of streams and videos.",
        details: [
          { label: "Shape", value: "Hexagon" },
          { label: "Front colours", value: "Blue, white" },
        ],
      },
    ],
  },
  process: {
    title: "Our process",
    lead: "Four stages, from inquiry to delivery.",
    counter: "Step {current} of {total}",
    previous: "Previous step",
    next: "Next step",
    steps: [
      {
        title: "Inquiry",
        text: "Artwork, size and quantity.",
        description:
          "Send us your logo, artwork or a description of your project. A finished file is not required: we can create the design from a sketch or a reference.",
        details: [
          "Tell us the size (up to 256 × 256 × 256 mm) and quantity. If you are not sure, we will help you choose.",
          "Vector files (SVG, PDF, AI, EPS) work best. High quality PNG and JPG files are also accepted.",
          "Send your inquiry through the form, WhatsApp or email.",
        ],
      },
      {
        title: "Design and quote",
        text: "A reply within 24 hours.",
        description:
          "We review your materials and prepare a visual of your lightbox together with a quote. Before production starts, you know how it will look and what it costs.",
        details: [
          "The quote is free and comes with no obligation.",
          "The price depends on size, shape, number of colours and quantity.",
          "You can request changes to the design at this stage.",
        ],
      },
      {
        title: "Production",
        text: "Made to order.",
        description:
          "We 3D print the housing and then fit the LED lighting inside.",
        details: [
          "Production only starts after you approve the design.",
          "The lead time is agreed individually, together with the quote.",
          "Housings up to 256 mm are printed in one piece.",
        ],
      },
      {
        title: "Shipping",
        text: "Packing and delivery.",
        description:
          "We carefully pack your finished lightbox and ship it to your address.",
        details: [
          "We ship across Europe.",
          "Collection in person in Walsall is also available.",
        ],
      },
    ],
  },
  faq: {
    title: "Common questions",
    items: [
      {
        q: "Can I send my own graphic?",
        a: "Yes. Vector files (SVG, PDF, AI, EPS) work best, but high quality PNG and JPG files are also accepted. We check every file and let you know if anything needs adjusting.",
      },
      {
        q: "Do I need a finished design?",
        a: "No. A description, a sketch or a reference is enough. We prepare the design from it and send it to you for approval.",
      },
      {
        q: "Do you make lightboxes with team logos or gamer tags?",
        a: "Yes. We make lightboxes with esports team logos, gamer tags and setup artwork, both single pieces and sets for a whole team.",
      },
      {
        q: "How big can a lightbox be?",
        a: "Up to 256 × 256 × 256 mm. At that size the housing is printed in one piece.",
      },
      {
        q: "What does the price depend on?",
        a: "The size, the shape, the number of colours and the quantity. You get the exact price in a free quote.",
      },
      {
        q: "How long does it take?",
        a: "The lead time is agreed individually, together with the quote. Production starts once you approve the design.",
      },
      {
        q: "Where do you deliver?",
        a: "We ship across Europe. Collection in person in Walsall is also available.",
      },
    ],
  },
  quote: {
    title: "Let's design your lightbox",
    lead: "Describe your project and attach artwork if you have it. We will reply with a quote and the next steps.",
    form: {
      name: "Name",
      email: "Email",
      phone: "Phone",
      optional: "optional",
      size: "Size",
      width: "Width",
      height: "Height",
      depth: "Depth",
      unit: "mm",
      sizeHint: "Maximum size: 256 × 256 × 256 mm.",
      sizeUnsure: "Not sure about the size, please advise",
      decrease: "Decrease quantity",
      increase: "Increase quantity",
      quantity: "Quantity",
      deadline: "Needed by",
      description: "Project description",
      placeholders: {
        name: "Emma",
        email: "emma@example.com",
        phone: "+44 7700 900000",
        width: "200",
        height: "150",
        depth: "60",
      },
      descriptionPlaceholder:
        "For example: our café logo, about 20 cm wide, white and blue light, for the wall behind the counter.",
      files: "Attach graphic",
      filesHint:
        "Logo, artwork or inspiration. PNG, JPG, SVG, PDF, AI or EPS. Up to 3 files, 4 MB in total.",
      filesDrop: "Drop files here or click to choose",
      filesSelected: "Attached files",
      remove: "Remove",
      notice: "We use these details only to prepare your quote.",
      privacy: "Privacy policy",
      submit: "Send quote request",
      sending: "Sending",
      successTitle: "Thank you, {name}!",
      successText:
        "We have received your inquiry and will reply by email within 24 hours.",
      another: "Send another inquiry",
    },
    errors: {
      name: "Please enter your name.",
      email: "Please enter a valid email address.",
      phone: "Please enter a valid phone number.",
      size: "Enter a size of up to 256 × 256 × 256 mm, or tick “Not sure about the size”.",
      quantity: "Enter a quantity from 1 to 500.",
      description: "The description should be at least 20 characters long.",
      fileType: "This file type is not supported: {file}",
      fileSize: "The files are too large. The limit is 4 MB in total.",
      fileCount: "You can attach up to 3 files.",
      summary: "Please check the highlighted fields.",
      generic:
        "The inquiry could not be sent. Please try again or contact us on WhatsApp.",
    },
  },
  contact: {
    email: "Email",
    call: "Call",
    whatsapp: "Message us on WhatsApp",
    location: "Walsall, United Kingdom",
    delivery: "Shipping across Europe or collection in person.",
    socials: "GlowBox Lab on social media",
    promises: [
      "We reply within 24 hours",
      "Free quote, no obligation",
      "We speak English and Polish",
    ],
  },
  footer: {
    tagline: "Custom LED lightboxes, 3D printed to order.",
    privacy: "Privacy",
    cookies: "Cookies",
    terms: "Quote and order terms",
    rights: "GlowBox Lab",
  },
  portfolio: {
    title: "Portfolio",
    lead: "All projects in one place. Select a project to see the details.",
    description:
      "GlowBox Lab portfolio: 3D printed LED lightboxes with business logos, team logos, gamer tags, names or your own artwork.",
  },
  legal: {
    back: "Back to home page",
    updated: "Last updated: 28 October 2026",
  },
  notFound: {
    title: "This page does not exist.",
    text: "The link may be broken or the page may have moved.",
    back: "Go to the home page",
  },
};

export type Dictionary = typeof en;
