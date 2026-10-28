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
    { label: "Portfolio", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#quote" },
  ],
  cta: "Get a quote",
  hero: {
    eyebrow: "Custom LED lightboxes",
    title: ["Your idea.", "Made to glow."],
    lead: "Each one is 3D printed from scratch. All we need is a logo, a name or a short description.",
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
    lead: "A few of the forms a lightbox can take.",
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
      cta: "I want one like this",
      all: "View all",
    },
    items: [
      {
        image: "/images/work-devils.webp",
        alt: "Red and orange Devil's sign lightbox with a horned character and flames",
        title: "Bold character",
        text: "A logo with attitude for a bar, a team or a brand.",
        description:
          "Cut to the exact outline of the logo, with flames and a character. It works best where it has to catch the eye, such as behind a bar or in a gaming room.",
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
          "A heart with names and roses, made as a gift. You can add a date, a short message or your own artwork.",
        details: [
          { label: "Shape", value: "Heart" },
          { label: "Front colours", value: "Red, yellow, cream" },
        ],
      },
      {
        image: "/images/work-logo.webp",
        alt: "Hexagon lightbox with the GlowBox Lab logo seen from the side",
        title: "Your logo, in light",
        text: "For a desk, a shop or a studio.",
        description:
          "A logo set in a simple hexagonal housing. It looks good on a counter, on a shelf or in the background of your videos.",
        details: [
          { label: "Shape", value: "Hexagon" },
          { label: "Front colours", value: "Blue, white" },
        ],
      },
    ],
  },
  process: {
    title: "Process",
    lead: "From idea to finished lightbox in four steps.",
    counter: "Step {current} of {total}",
    previous: "Previous step",
    next: "Next step",
    steps: [
      {
        title: "You send your idea",
        text: "A logo, a graphic or just a description.",
        description:
          "Tell us what should glow: your company logo, a sign for your gaming room or an idea for a gift. A sketch or some inspiration is enough, we will refine the design together.",
        details: [
          "Tell us the size (up to 256 × 256 × 256 mm) and quantity. Not sure about the size? We will help.",
          "A vector file (SVG, PDF, AI, EPS) works best, but PNG and JPG are fine too.",
          "Send it through the form, WhatsApp or email.",
        ],
      },
      {
        title: "You get a quote and a design",
        text: "We reply within 24 hours.",
        description:
          "We check your files and prepare a quote with a visual. You see how your lightbox will look before anything is printed.",
        details: [
          "The quote is free and comes with no obligation.",
          "The price depends on size, shape, number of colours and quantity.",
          "You can ask for changes to the design.",
        ],
      },
      {
        title: "We print and assemble",
        text: "Production starts once you approve.",
        description:
          "Every lightbox is made from scratch for your design. We 3D print the housing and fit the LED lighting inside.",
        details: [
          "We only start production once you approve the design.",
          "We agree the lead time together with the quote.",
          "Housings up to 256 mm are printed in one piece.",
        ],
      },
      {
        title: "You receive your lightbox",
        text: "Shipping or pickup in Walsall.",
        description:
          "We pack your finished lightbox and send it to your address. If you are nearby, you can collect it in person.",
        details: ["We ship across Europe.", "Pickup in person in Walsall."],
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
        a: "Up to 256 × 256 × 256 mm. That is what our printer makes in one piece.",
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
      sizeHint: "Maximum size: 256 × 256 × 256 mm.",
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
      size: "Enter a size of up to 256 × 256 × 256 mm, or tick “Not sure yet”.",
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
  portfolio: {
    title: "Portfolio",
    lead: "All our projects in one place. Click one to see the details.",
    description:
      "GlowBox Lab portfolio: 3D printed LED lightboxes with logos, names or your own artwork.",
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
