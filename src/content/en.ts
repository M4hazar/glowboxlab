// Treści strony po angielsku. Zasada marki: bez długich myślników w tekstach.
export const en = {
  locale: "en",
  htmlLang: "en-GB",
  meta: {
    title: "GlowBox Lab | Custom LED Lightboxes",
    description:
      "Custom LED lightboxes, 3D printed to order. Your logo, name or idea turned into a glowing sign for your brand, gaming setup or a personal gift. Based in the UK, working with clients in the UK and Poland.",
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
    { label: "Work", href: "#work" },
    { label: "Personalisation", href: "#personalisation" },
    { label: "How it works", href: "#process" },
    { label: "FAQ", href: "#faq" },
  ],
  cta: "Get a quote",
  hero: {
    eyebrow: "Custom LED lightboxes",
    title: ["Your idea.", "Made to glow."],
    lead: "Personalised LED lightboxes, 3D printed to order. Your logo, name or idea, turned into a light that gets noticed.",
    primary: "Design your lightbox",
    secondary: "See our work",
    points: [
      "Design proof before production",
      "Up to 4 print colours",
      "UK and Poland",
    ],
    imageAlt:
      "GlowBox Lab hexagon lightbox with a white and blue glowing logo on a dark surface",
    scroll: "Discover GlowBox Lab",
  },
  viewer: {
    eyebrow: "3D preview",
    title: ["Turn it. Zoom in.", "Switch it on."],
    lead: "Explore a GlowBox Lab lightbox from every side. This is our own logo model, built from the same file we print.",
    label: "GlowBox Lab / showcase model",
    dragHint: "Drag to rotate",
    light: "Light",
    on: "ON",
    off: "OFF",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    rotateLeft: "Rotate left",
    rotateRight: "Rotate right",
    reset: "Reset view",
    fullscreen: "Full screen",
    exitFullscreen: "Exit full screen",
    ledColour: "LED colour",
    colours: { white: "White", blue: "Blue" },
    note: "Showcase model, 16 × 17 cm, 3.2 cm deep. Light colour options depend on the model.",
    loading: "Loading 3D model",
    fallback:
      "The 3D preview is not available on this device, so here is the lightbox as a photo.",
    canvasLabel:
      "Interactive 3D model of the GlowBox Lab lightbox. Use the buttons below to rotate, zoom and switch the light.",
  },
  work: {
    eyebrow: "Our work",
    title: "Made to stand out.",
    lead: "Every lightbox starts with someone's idea. Here are a few of the forms they have taken.",
    note: "Example visualisations.",
    cta: {
      title: "Your idea could be next.",
      text: "Send a logo, a name or just a rough thought. We will turn it into light.",
      link: "Start your project",
    },
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
        text: "Names, dates and details for weddings, anniversaries and birthdays.",
      },
      {
        image: "/images/work-logo.webp",
        alt: "Hexagon lightbox with the GlowBox Lab logo seen from the side",
        title: "Your logo, in light",
        text: "Clean geometry and an even glow for desks, shops and studios.",
      },
    ],
  },
  personalisation: {
    eyebrow: "Personalisation",
    title: ["Your idea.", "Our design."],
    lead: "Whether you arrive with a finished file or a rough thought, we take it from there.",
    imageAlt:
      "Printed GlowBox Lab logo design next to the finished glowing lightbox",
    paths: [
      {
        title: "Have a ready graphic?",
        text: "Send your logo, artwork or lettering. We check the file and prepare it for 3D printing.",
      },
      {
        title: "Only have an idea?",
        text: "Describe it in a few words or add a sketch or inspiration. We design the lightbox for you.",
      },
    ],
    link: "Tell us about your project",
  },
  process: {
    eyebrow: "How it works",
    title: "From idea to light.",
    steps: [
      {
        title: "Describe your idea",
        text: "Send your graphic or tell us what you have in mind, with the size and quantity.",
      },
      {
        title: "Get a quote and a design",
        text: "We prepare the price and a visual of your lightbox. You can ask for changes.",
      },
      {
        title: "We make it",
        text: "Once you approve the design, we 3D print and assemble your lightbox.",
      },
    ],
  },
  technology: {
    eyebrow: "Technology and quality",
    title: ["Considered form.", "Light with character."],
    imageAlt:
      "Close up of a lightbox edge with a textured 3D printed black frame and blue light",
    features: [
      {
        title: "3D printed housing",
        text: "The housing and details are shaped to your design, not to a template.",
      },
      {
        title: "LED backlight",
        text: "The light brings out the shape and colours of the front.",
      },
      {
        title: "Up to 4 colours",
        text: "The front is printed in up to four colours, chosen together with you.",
      },
      {
        title: "Made to measure",
        text: "Size and proportions follow your project, up to 256 × 256 mm.",
      },
    ],
  },
  inspiration: {
    eyebrow: "Inspiration",
    title: "Find its place.",
    lead: "At home, in the office, by your gaming setup or in your shop.",
    note: "Example arrangements.",
    items: [
      {
        image: "/images/inspiration-office.webp",
        alt: "Glowing hexagon lightbox on a desk next to a monitor and a plant",
        title: "Office and gaming",
      },
      {
        image: "/images/inspiration-home.webp",
        alt: "Glowing hexagon lightbox on a wooden shelf with books and a plant",
        title: "Home and retail spaces",
      },
    ],
  },
  faq: {
    eyebrow: "Good to know",
    title: "Questions?",
    items: [
      {
        q: "Can I send my own graphic?",
        a: "Yes. Send a logo, lettering or inspiration. We check how to prepare it for 3D printing and let you know if anything needs adjusting.",
      },
      {
        q: "What if I only have an idea?",
        a: "That is enough to start. Describe it, add a sketch or reference photos, and we design the lightbox for you.",
      },
      {
        q: "What does the price depend on?",
        a: "Mainly on the size, the complexity of the shape, the number of print colours and the quantity. You get an individual quote after sending your inquiry.",
      },
      {
        q: "How big can a lightbox be?",
        a: "Up to 256 × 256 mm at the front and up to 256 mm deep, which is what our printer can make in one piece. Tell us the size you have in mind and we will suggest the best proportions.",
      },
      {
        q: "Which file formats work best?",
        a: "Vector files (SVG, PDF, AI or EPS) give the cleanest result. High resolution PNG and JPG files work too.",
      },
      {
        q: "Can the light colour be changed?",
        a: "It depends on the model. Some lightboxes can be made with adjustable LED colour, so mention it in your inquiry.",
      },
      {
        q: "How is the lead time agreed?",
        a: "We agree the date together with the quote. Production starts once you approve the design.",
      },
      {
        q: "Do you work with clients in Poland?",
        a: "Yes. We are based in the UK and work with clients in the UK and Poland, in English and in Polish.",
      },
    ],
  },
  quote: {
    eyebrow: "Let's start with your idea",
    title: ["Let's design", "your lightbox."],
    lead: "Describe what you would like to create and attach your graphic. We will reply with a quote and the next steps.",
    chat: "Prefer to chat?",
    whatsapp: "Message us on WhatsApp",
    call: "Call",
    form: {
      name: "Name",
      email: "Email",
      phone: "Phone",
      optional: "optional",
      size: "Size",
      width: "Width",
      height: "Height",
      unit: "mm",
      sizeHint: "Maximum size: 256 × 256 mm, up to 256 mm deep.",
      sizeUnsure: "Not sure yet, please advise",
      decrease: "Decrease quantity",
      increase: "Increase quantity",
      quantity: "Quantity",
      deadline: "Needed by",
      description: "Describe your idea",
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
      required: "required",
      successTitle: "Thank you, {name}!",
      successText:
        "Your inquiry has reached us. We will reply by email with a quote and the next steps.",
      another: "Send another inquiry",
    },
    errors: {
      name: "Please enter your name.",
      email: "Please enter a valid email address.",
      phone: "Please enter a valid phone number.",
      size: "Enter a width and height of up to 256 mm, or tick “Not sure yet”.",
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
  footer: {
    tagline: "Custom LED lightboxes, 3D printed to order.",
    explore: "Explore",
    findUs: "Find us",
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
