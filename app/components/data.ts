export interface ProductBadge {
  value: string;
  label: string;
  iconType?: "feather" | "battery";
}

export interface MobileSpec {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  eyebrow: string;
  headline: string;
  headlineHighlight: string;
  subtitle: string;
  scriptTop: string;
  scriptSub: string;
  badge1: ProductBadge;
  badge2: ProductBadge;
  badge3: ProductBadge;
  badge4: ProductBadge;
  price: number;
  variant: string;
  image: string;
  cards: [string, string, string];
  mobileSpecs: MobileSpec[];
}

export const PRODUCTS: Product[] = [
  {
    id: "ashren-4k-camera",
    name: "Ashren 4K Pocket Gimbal Camera",
    category: "CREATOR GADGETS",
    eyebrow: "CAPTURE • CREATE • EXPLORE",
    headline: "Your Story",
    headlineHighlight: "Anywhere",
    subtitle: "Ashren brings you premium gadgets for creators, travelers and everyday adventurers.",
    scriptTop: "Small Camera",
    scriptSub: "Big Possibilities",
    badge1: { value: "4K", label: "Ultra HD" },
    badge2: { value: "180°", label: "Rotation" },
    badge3: { value: "AI", label: "Stabilization" },
    badge4: { value: "LIGHTWEIGHT", label: "& Portable", iconType: "feather" },
    price: 24999,
    variant: "Midnight Onyx • 128GB Bundle",
    image: "/product/camera.png",
    cards: ["/card/camera/card1.png", "/card/camera/card2.png", "/card/camera/card3.png"],
    mobileSpecs: [
      { id: "4k", title: "4K", subtitle: "Ultra HD", icon: "4k" },
      { id: "video", title: "HIGH", subtitle: "Frame Rate", icon: "video" },
      { id: "rotation", title: "180°", subtitle: "Rotation", icon: "rotation" },
      { id: "touch", title: "TOUCH", subtitle: "Screen", icon: "touch" },
      { id: "feather", title: "LIGHTWEIGHT", subtitle: "& Portable", icon: "feather" },
    ],
  },
  {
    id: "ashren-t1-drone",
    name: "Ashren T1 Falcon 4K FPV Drone",
    category: "AERIAL CINEMATOGRAPHY",
    eyebrow: "FLY • EXPLORE • DISCOVER",
    headline: "Sky View",
    headlineHighlight: "Unlimited",
    subtitle: "Ultra-compact quadcopter with 4K HDR camera, live FPV screen controller & optical flow stability.",
    scriptTop: "Fly Higher",
    scriptSub: "See Beyond",
    badge1: { value: "4K", label: "HDR Camera" },
    badge2: { value: "360°", label: "Prop Guard" },
    badge3: { value: "FPV", label: "Live Remote" },
    badge4: { value: "45 MIN", label: "Flight Time", iconType: "battery" },
    price: 38999,
    variant: "Arctic White • FPV Controller Bundle",
    image: "/product/drone.png",
    cards: ["/card/drone/card1.png", "/card/drone/card2.png", "/card/drone/card3.png"],
    mobileSpecs: [
      { id: "4k", title: "4K", subtitle: "HDR Video", icon: "4k" },
      { id: "fpv", title: "FPV", subtitle: "Live Screen", icon: "video" },
      { id: "guard", title: "360°", subtitle: "Obstacle Safe", icon: "rotation" },
      { id: "gps", title: "AUTO", subtitle: "Hover & Return", icon: "touch" },
      { id: "battery", title: "45 MIN", subtitle: "Flight Time", icon: "feather" },
    ],
  },
  {
    id: "ashren-aquago-4k",
    name: "Ashren AquaGo 4K Waterproof Action Cam",
    category: "WATERPROOF & ACTION",
    eyebrow: "DIVE • RECORD • ADVENTURE",
    headline: "Pure Action",
    headlineHighlight: "Unstoppable",
    subtitle: "All-weather waterproof 4K action camera with magnetic mount, HorizonLock stabilization & ultra-wide lens.",
    scriptTop: "Go Deeper",
    scriptSub: "Capture Adventure",
    badge1: { value: "4K 60", label: "FPS Video" },
    badge2: { value: "IPX8", label: "Waterproof" },
    badge3: { value: "AI", label: "HorizonLock" },
    badge4: { value: "MAGNETIC", label: "Snap Mount", iconType: "feather" },
    price: 19999,
    variant: "Obsidian Black • Waterproof Explorer Kit",
    image: "/product/camera2.png",
    cards: ["/card/camera/card2.png", "/card/camera/card1.png", "/card/camera/card3.png"],
    mobileSpecs: [
      { id: "4k", title: "4K 60", subtitle: "FPS Ultra HD", icon: "4k" },
      { id: "ipx8", title: "IPX8", subtitle: "Waterproof", icon: "video" },
      { id: "horizon", title: "360°", subtitle: "Horizon Lock", icon: "rotation" },
      { id: "touch", title: "SNAP", subtitle: "Magnetic Quick", icon: "touch" },
      { id: "feather", title: "FEATHER", subtitle: "Ultra Compact", icon: "feather" },
    ],
  },
];

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  variant: string;
  quantity: number;
}

export interface ReviewItem {
  name: string;
  role: string;
  quote: string;
  rating: number;
  image: string;
  title: string;
  category: string;
}

export const REVIEWS: ReviewItem[] = [
  {
    name: "Aarav Sharma",
    role: "National Geographic Explorer",
    quote: "“The gimbal stability in sub-zero Himalayan altitudes blew me away. Replaced 5kg of heavy gear in my backpack.”",
    rating: 5.0,
    image: "/card/camera/card1.png",
    title: "Mountain Alpine 4K Expedition",
    category: "TRAVEL ADVENTURE",
  },
  {
    name: "Devendra Patel",
    role: "Cinematographer & VFX Artist",
    quote: "“The built-in screen controller means zero phone battery drain or connectivity hiccups during live sunset shoots.”",
    rating: 5.0,
    image: "/card/drone/card2.png",
    title: "Sunset Ridge 4K FPV Flight",
    category: "AERIAL CINEMATOGRAPHY",
  },
  {
    name: "Rhea Sen",
    role: "Travel & Creative Filmmaker",
    quote: "“Vibrant color rendering and night stabilization make handheld nighttime street photography a breeze.”",
    rating: 4.9,
    image: "/card/camera/card3.png",
    title: "Cityscape Night 4K Vlog & Timelapse",
    category: "CREATIVE TIMELAPSE",
  },
];

export interface DressColor {
  name: string;
  hex: string;
}

export interface Dress {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  discount: string;
  category: string;
  tag?: string;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  fabric: string;
  embroideryWork: string;
  silhouette: string;
  included: string;
  sizes: string[];
  colors: DressColor[];
  inStock: boolean;
}

export type DressProduct = Dress;

export const DRESSES_DATA: Dress[] = [
        {
          id:"aura-mulberry-silk-anarkali",name:"Aura Mulberry Silk Anarkali",subtitle:"Pleated Royal Silhouette with Scalloped Zari Dupatta",price:6499,originalPrice:10999,discount:"41% OFF",category:"Anarkali & Gowns",tag:"Best Seller",rating:4.9,reviewsCount:184,image:"/product/dress/dress-1.png",description:"Tradition Meets Modernity. Crafted in rich magenta mulberry silk featuring pleated kalidar flare and paired with an extensively embroidered golden scallop border dupatta.",fabric:"Pure Mulberry Raw Silk & Shimmer Tissue",embroideryWork:"Handcrafted Golden Floral Zari & Scalloped Lace",silhouette:"Floor-length Kalidar Flared Gown",included:"Flared Anarkali Gown, Matching Layered Skirt & Embellished Dupatta",sizes:[
            "XS","S","M","L","XL","XXL"
          ],colors:[
            {
              name:"Magenta Wine",hex:"#871F52"
            },{
              name:"Royal Gold",hex:"#D4AF37"
            }
          ],inStock:!0
        },{
          id:"noor-golden-ochre-anarkali",name:"Noor Golden Ochre Anarkali Set",subtitle:"Grace In Every Drape • Heavy Scallop Embroidered Border",price:6999,originalPrice:11499,discount:"39% OFF",category:"Anarkali & Gowns",tag:"Trending",rating:5,reviewsCount:146,image:"/product/dress/dress-2.png",description:"An opulent golden mustard and ochre ceremonial gown with cascading micro-pleated drape, paired with a matching tissue dupatta adorned with dense ivory zari work.",fabric:"Handspun Raw Silk & Shimmer Tissue Georgette",embroideryWork:"Floral Scallop Cutwork, Zari Thread & Resham Motif",silhouette:"Double-Layered Flared Royal Anarkali",included:"Double-Tier Anarkali Kurta, Flared Under-skirt & Embroidered Dupatta",sizes:[
            "S","M","L","XL","XXL"
          ],colors:[
            {
              name:"Golden Ochre",hex:"#A8681A"
            },{
              name:"Warm Amber",hex:"#C68B29"
            }
          ],inStock:!0
        },{
          id:"vesper-noir-peony-mini-dress",name:"Vesper Noir Peony Mini Dress",subtitle:"Sweetheart V-Neck with Cuffed Bishop Sleeves",price:3299,originalPrice:5499,discount:"40% OFF",category:"Festive Silk",tag:"New Arrival",rating:4.8,reviewsCount:92,image:"/product/dress/dress-3.png",description:"Effortless Elegance for Every Occasion. Tailored from soft breathable fabric with vintage golden peony motifs, button-down bodice, and flattering silhouette.",fabric:"Soft Breathable Premium Crepe & Georgette",embroideryWork:"Vintage Botanical Peony Print & Gold Lurex Threading",silhouette:"A-Line Mini Silhouette with Cinched Waist",included:"Mini Dress with Integrated Inner Lining",sizes:[
            "XS","S","M","L","XL"
          ],colors:[
            {
              name:"Midnight Noir",hex:"#18181B"
            },{
              name:"Champagne Gold",hex:"#D1B280"
            }
          ],inStock:!0
        },{
          id:"scarlet-blossom-button-mini-dress",name:"Scarlet Blossom Button Mini Dress",subtitle:"Vibrant Crimson Floral Print with Pearl Button Placket",price:3499,originalPrice:5999,discount:"42% OFF",category:"Festive Silk",tag:"Trending",rating:4.9,reviewsCount:118,image:"/product/dress/dress-4.png",description:"Dress the Moment. A striking coral and scarlet red floral printed mini dress featuring pearl-accented front buttons, ruched long sleeves, and a tailored v-neck.",fabric:"Lightweight Breathable Cotton Satin Blend",embroideryWork:"High-Definition Crimson Botanical Motif & Pearl Buttons",silhouette:"Fitted Waist Flattering Fit Mini",included:"Single Piece Tailored Mini Dress",sizes:[
            "XS","S","M","L","XL"
          ],colors:[
            {
              name:"Crimson Scarlet",hex:"#C0392B"
            },{
              name:"Peach Coral",hex:"#E77F67"
            }
          ],inStock:!0
        },{
          id:"jade-botanical-chanderi-kurti",name:"Jade Botanical Chanderi Short Kurti",subtitle:"Bell Sleeve Tunic Paired with Ivory Wide-Leg Trousers",price:3799,originalPrice:6299,discount:"40% OFF",category:"Embroidered Suits",tag:"Handcrafted",rating:4.8,reviewsCount:104,image:"/product/dress/dress-5.png",description:"Effortless Style Everyday. Handcrafted in lush emerald green and jade botanical prints, finished with fine lace neck trimming and breezy flare bell sleeves.",fabric:"Premium Cotton Chanderi & Soft Modal",embroideryWork:"Water-color Botanical Print & Delicate Scallop Neck Trim",silhouette:"A-Line Short Kurti with Wide-Leg Palazzo Pants",included:"Short Kurti & Ivory Straight Palazzo Trousers",sizes:[
            "S","M","L","XL","XXL"
          ],colors:[
            {
              name:"Jade Green",hex:"#1B4D3E"
            },{
              name:"Ivory Cream",hex:"#F3EFE0"
            }
          ],inStock:!0
        },{
          id:"espresso-rose-heritage-kurti",name:"Espresso Rose Heritage Short Kurti",subtitle:"Scallop Neckline with Vintage Golden Floral Jaal",price:3999,originalPrice:6499,discount:"38% OFF",category:"Embroidered Suits",tag:"Limited Edition",rating:4.9,reviewsCount:135,image:"/product/dress/dress-6.png",description:"Timeless Style for Every Occasion. Made with plush espresso brown fabric interwoven with ivory tea-rose florals, lace border detail, and contemporary flared sleeves.",fabric:"Premium Modal Cotton & Viscose Blend",embroideryWork:"Antique Tea-Rose Motif & Scalloped White Lace Neckline",silhouette:"Tailored Straight Cut Short Kurti",included:"Embroidered Tunic Kurti & Matching Ivory Palazzos",sizes:[
            "S","M","L","XL","XXL"
          ],colors:[
            {
              name:"Espresso Brown",hex:"#3E2723"
            },{
              name:"Alabaster Cream",hex:"#EFEBE9"
            }
          ],inStock:!0
        },{
          id:"sunburst-leheriya-wrap-dress",name:"Sunburst Leheriya Wrap-Style Dress",subtitle:"Marigold Yellow & Tangerine Diagonals with Button Front",price:2999,originalPrice:4999,discount:"40% OFF",category:"Festive Silk",tag:"Trending",rating:4.7,reviewsCount:88,image:"/product/dress/dress-7.png",description:"Look Good Feel Amazing. Radiant Rajasthani Leheriya wave prints in vibrant sunshine gold and tangerine orange with a flattering cinched empire waist and 3/4 sleeves.",fabric:"100% Breathable Soft Cotton Mulmul",embroideryWork:"Heritage Leheriya & Bandhej Wave Print",silhouette:"Pleated Empire Waist Mini Fusion Dress",included:"Single Piece Fusion Wrap Dress",sizes:[
            "XS","S","M","L","XL"
          ],colors:[
            {
              name:"Marigold Yellow",hex:"#F39C12"
            },{
              name:"Tangerine Orange",hex:"#E67E22"
            }
          ],inStock:!0
        },{
          id:"crimson-amber-bandhani-fusion-kurti",name:"Crimson & Amber Bandhani Fusion Kurti",subtitle:"Diagonal Dot Chevron Motif with Straight Palazzo Pants",price:3899,originalPrice:6199,discount:"37% OFF",category:"Embroidered Suits",tag:"Festive Pick",rating:4.9,reviewsCount:110,image:"/product/dress/dress-8.png",description:"A rich vermillion and sunset orange tie-dye chevron kurti paired with wide ivory trousers. Finished with lace-trimmed square neck for an elegant festive statement.",fabric:"Glazed Chanderi Cotton & Modal Silk",embroideryWork:"Geometric Bandhani Chevron & White Threadwork Lace",silhouette:"Straight Fitted Short Kurti with Flared Pants",included:"Chevron Tunic Kurti & Wide-Leg Flared Palazzo",sizes:[
            "S","M","L","XL","XXL"
          ],colors:[
            {
              name:"Vermillion Red",hex:"#B03A2E"
            },{
              name:"Sunset Orange",hex:"#D35400"
            }
          ],inStock:!0
        },{
          id:"saffron-marigold-embroidered-tunic",name:"Saffron Marigold Embroidered Tunic",subtitle:"Square Neckline with Multi-Hue Botanical Embroidery",price:3199,originalPrice:5299,discount:"39% OFF",category:"Chikankari & Organza",tag:"New Arrival",rating:4.8,reviewsCount:76,image:"/product/dress/dress-9.png",description:"Style Looks Good On You. Sunny saffron yellow top adorned with delicate multicolor floral vine embroidery, curved hemline, and breathable tailored quarter sleeves.",fabric:"Pure Slub Cotton & Breathable Linen Weave",embroideryWork:"Pastel Resham Thread Embroidery on Saffron Base",silhouette:"Curved Hemline Comfort Fit Tunic",included:"Single Piece Casual Tunic Top",sizes:[
            "XS","S","M","L","XL","XXL"
          ],colors:[
            {
              name:"Saffron Gold",hex:"#E59866"
            },{
              name:"Buttercup Yellow",hex:"#F7DC6F"
            }
          ],inStock:!0
        },{
          id:"olive-dahlia-bell-sleeve-tunic",name:"Olive Dahlia Bell Sleeve Tunic",subtitle:"Statement Flare Sleeves with Multicolored Bead Tassels",price:4299,originalPrice:6999,discount:"38% OFF",category:"Bridal & Luxury",tag:"Best Seller",rating:5,reviewsCount:164,image:"/product/dress/dress-10.png",description:"Every Outfit Tells a Story. Luxe olive chartreuse silk top featuring oversized botanical dahlia blooms and handcrafted swinging crystal-bead tassels on trumpet sleeves.",fabric:"Lustrous Modal Satin Silk",embroideryWork:"Botanical Placement Print with Handmade Glass Bead Fringes",silhouette:"Hourglass Empire Tunic with Dramatic Trumpet Sleeves",included:"Statement Bell-Sleeve Tunic Top",sizes:[
            "XS","S","M","L","XL"
          ],colors:[
            {
              name:"Olive Chartreuse",hex:"#7D8C1D"
            },{
              name:"Champagne Bloom",hex:"#D5D8B5"
            }
          ],inStock:!0
        },{
          id:"daisy-whisper-cotton-lounge-set",name:"Daisy Whisper Cotton Lounge Set",subtitle:"Monochrome Floral Print Tee & Relaxed Straight Pajama",price:2199,originalPrice:3999,discount:"45% OFF",category:"Chikankari & Organza",tag:"Best Seller",rating:4.9,reviewsCount:220,image:"/product/dress/dress-11.png",description:"Comfort Looks Good On You. Crafted in ultra-soft breathable combed cotton with playful monochrome daisy prints. Perfect for everyday lounging and peaceful sleep.",fabric:"100% Super-Combed Organic Cotton",embroideryWork:"Minimalist Typography & Monochrome Daisy Motif",silhouette:"Relaxed Fit Round-Neck Tee & Elastic Waistband Pants",included:"Cotton Graphic Tee & Matching Straight Pajama",sizes:[
            "XS","S","M","L","XL","XXL"
          ],colors:[
            {
              name:"Chalk White",hex:"#FDFEFE"
            },{
              name:"Charcoal Daisy",hex:"#2C3E50"
            }
          ],inStock:!0
        },{
          id:"morning-blossom-classic-night-suit",name:"Morning Blossom Classic Night Suit",subtitle:"Typography Tee & Side-Pocket Lounge Trouser",price:2299,originalPrice:4199,discount:"45% OFF",category:"Chikankari & Organza",tag:"Trending",rating:4.8,reviewsCount:195,image:"/product/dress/dress-12.png",description:"Good Night, Better Tomorrow. Premium 2-piece loungewear set featuring deep functional side pockets, soft ribbed neckline, and all-day breathable jersey cotton.",fabric:"Premium Ring-Spun Jersey Cotton",embroideryWork:"Inspiring Sleeve Typography & Daisy Silhouettes",silhouette:"Regular Comfort Fit T-shirt & Side-Pocket Lounge Bottoms",included:"Lounge T-Shirt & Deep Pocket Pajamas",sizes:[
            "S","M","L","XL","XXL"
          ],colors:[
            {
              name:"Snow White",hex:"#FFFFFF"
            },{
              name:"Onyx Black",hex:"#17202A"
            }
          ],inStock:!0
        },{
          id:"tribal-aztec-midnight-lounge-coord",name:"Tribal Aztec Midnight Lounge Co-ord",subtitle:"Chest Pocket Tee & Multi-Geometric Relaxed Pajama",price:2499,originalPrice:4499,discount:"44% OFF",category:"Chikankari & Organza",tag:"Festive Pick",rating:4.9,reviewsCount:178,image:"/product/dress/dress-13.png",description:"Stay Cozy, Stay You. Sleek midnight black relaxed-fit tee with an artisanal Aztec patch pocket, paired with plush printed geometric straight-leg trousers.",fabric:"Cloud-Soft Brushed Melange Cotton",embroideryWork:"Aztec Geometric Pocket Art & Tapestry Print Trouser",silhouette:"Comfort Oversized Crew Tee & Elastic Drawstring Bottoms",included:"Chest Pocket Tee & Patterned Pajama Pants",sizes:[
            "S","M","L","XL","XXL"
          ],colors:[
            {
              name:"Midnight Black",hex:"#1B1B1D"
            },{
              name:"Aztec Indigo & Wine",hex:"#3A2A45"
            }
          ],inStock:!0
        }
      ];

export const DRESSES: Dress[] = DRESSES_DATA;
