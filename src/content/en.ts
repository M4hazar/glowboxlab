// Treści strony po angielsku. Zasada marki: bez długich myślników w tekstach.
export const en = {
  locale: "en",
  htmlLang: "en-GB",
  meta: {
    title: "GlowBox Lab | Custom LED Lightboxes",
    description:
      "Custom LED lightboxes, 3D printed to order. Your logo, name or idea turned into a glowing sign for your brand, gaming setup or a personal gift. Based in Walsall, UK, shipping across Europe.",
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
    { label: "Work", href: "#work" },
    { label: "How it works", href: "#process" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#quote" },
  ],
  cta: "Get a quote",
  hero: {
    eyebrow: "Custom LED lightboxes",
    title: ["Your idea.", "Made to glow."],
    lead: "Each one is 3D printed from scratch. All we need is a logo, a name or a short description.",
    primary: "Get a quote",
    secondary: "See our work",
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
    title: "Our work",
    lead: "A few of the forms a lightbox can take.",
    note: "Example visualisations.",
    items: [
      {
        image: "/images/work-devils.webp",
        alt: "Red and orange Devil's sign lightbox with a horned character and flames",
        title: "Bold character",
        text: "A logo with attitude for a bar, a team or a brand.",
      },
      {
        image: "/images/work-heart.webp",
        alt: "Red heart lightbox with the names Agnieszka and Paweł and yellow roses",
        title: "A personal gift",
        text: "Names and dates for a wedding, an anniversary or a birthday.",
      },
      {
        image: "/images/work-logo.webp",
        alt: "Hexagon lightbox with the GlowBox Lab logo seen from the side",
        title: "Your logo, in light",
        text: "For a desk, a shop or a studio.",
      },
    ],
  },
  process: {
    title: "How it works",
    steps: [
      {
        title: "Send your idea",
        text: "A logo, a graphic or just a description. Add the size and quantity.",
      },
      {
        title: "Get a quote and a design",
        text: "We send you the price and a visual. You can ask for changes.",
      },
      {
        title: "We make it",
        text: "Once you approve the design, we 3D print and assemble your lightbox.",
      },
    ],
  },
  faq: {
    title: "Common questions",
    items: [
      {
        q: "Can I send my own graphic?",
        a: "Yes. A vector file (SVG, PDF, AI or EPS) works best, but good quality PNG and JPG files are fine too. We check the file and let you know if anything needs adjusting.",
      },
      {
        q: "What if I only have an idea?",
        a: "That is enough. Describe it or add a sketch or inspiration, and we design the lightbox for you.",
      },
      {
        q: "How big can a lightbox be?",
        a: "Up to 256 × 256 mm at the front and 256 mm deep. That is what our printer makes in one piece.",
      },
      {
        q: "What does the price depend on?",
        a: "The size, the shape, the number of colours and the quantity. We send you a price once we have your inquiry.",
      },
      {
        q: "How long does it take?",
        a: "We agree the date together with the quote. Production starts once you approve the design.",
      },
      {
        q: "Where do you deliver?",
        a: "Across Europe. You can also collect your lightbox in person in Walsall.",
      },
    ],
  },
  quote: {
    title: "Let's design your lightbox",
    lead: "Describe your idea and attach a graphic if you have one. We will reply with a price and the next steps.",
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
      sizeHint: "Up to 256 mm in each dimension.",
      sizeUnsure: "Not sure yet, please advise",
      decrease: "Decrease quantity",
      increase: "Increase quantity",
      quantity: "Quantity",
      deadline: "Needed by",
      description: "What should glow?",
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
      consent:
        "I agree that GlowBox Lab may use my details to handle this inquiry.",
      privacy: "Privacy policy",
      submit: "Send quote request",
      sending: "Sending",
      successTitle: "Thank you, {name}!",
      successText:
        "Your inquiry has reached us. We will reply by email with a quote and the next steps.",
      another: "Send another inquiry",
    },
    errors: {
      name: "Please enter your name.",
      email: "Please enter a valid email address.",
      phone: "Please enter a valid phone number.",
      size: "Enter a size of up to 256 mm, or tick “Not sure yet”.",
      quantity: "Enter a quantity from 1 to 500.",
      description: "Tell us a little more (at least 20 characters).",
      consent: "Please confirm to send the inquiry.",
      fileType: "This file type is not supported: {file}",
      fileSize: "The files are too large. The limit is 4 MB in total.",
      fileCount: "You can attach up to 3 files.",
      summary: "Please check the highlighted fields.",
      generic:
        "Something went wrong and the inquiry was not sent. Please try again or message us on WhatsApp.",
    },
  },
  contact: {
    email: "Email",
    call: "Call",
    whatsapp: "Message us on WhatsApp",
    location: "Walsall, United Kingdom",
    delivery: "We ship across Europe. You can also collect in person.",
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
    terms: "Quote terms",
    rights: "GlowBox Lab",
  },
  legal: {
    back: "Back to home page",
    updated: "Last updated: 27 October 2026",
  },
  notFound: {
    title: "This page does not exist.",
    text: "The link may be broken or the page may have moved.",
    back: "Go to the home page",
  },
};

export type Dictionary = typeof en;
