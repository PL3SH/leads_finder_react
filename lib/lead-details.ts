import type { Lead } from "./types"

// Extended lead details with additional information for detail pages
export interface ExtendedLead extends Lead {
  description?: string
  services?: string[]
  businessHours?: {
    monday?: string
    tuesday?: string
    wednesday?: string
    thursday?: string
    friday?: string
    saturday?: string
    sunday?: string
  }
  socialMedia?: {
    facebook?: string
    instagram?: string
    twitter?: string
    linkedin?: string
  }
  yearEstablished?: number
  employeeCount?: string
  specialties?: string[]
  certifications?: string[]
  paymentMethods?: string[]
  serviceArea?: string[]
  reviews?: {
    googleReviews: number
    averageRating: number
    totalReviews: number
    recentReviews: Array<{
      author: string
      rating: number
      text: string
      date: string
    }>
  }
  competitors?: Array<{
    name: string
    distance: string
    rating: number
    hasWebsite: boolean
  }>
  marketInsights?: {
    marketPosition: "leader" | "challenger" | "follower" | "niche"
    strengths: string[]
    opportunities: string[]
    threats: string[]
  }
}

// Generate extended details for all leads
export const generateExtendedLeadDetails = (baseLead: Lead): ExtendedLead => {
  const leadId = baseLead.id
  const category = baseLead.category.toLowerCase()

  // Generate consistent data based on lead ID for reproducibility
  const seed = leadId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const random = (min: number, max: number) =>
    Math.floor((((seed * 9301 + 49297) % 233280) / 233280) * (max - min + 1)) + min

  const extendedLead: ExtendedLead = {
    ...baseLead,
    yearEstablished: 2024 - random(5, 25),
    employeeCount: random(1, 50) < 5 ? "1-5" : random(1, 50) < 15 ? "6-15" : random(1, 50) < 30 ? "16-30" : "30+",
    paymentMethods: ["Cash", "Credit Cards", "Debit Cards", ...(random(1, 10) > 5 ? ["PayPal", "Venmo"] : [])],
    reviews: {
      googleReviews: random(10, 150),
      averageRating: random(30, 50) / 10,
      totalReviews: random(15, 200),
      recentReviews: [
        {
          author: "Sarah M.",
          rating: random(4, 5),
          text: "Great service and professional staff. Highly recommend!",
          date: "2024-01-10",
        },
        {
          author: "Mike R.",
          rating: random(3, 5),
          text: "Good experience overall. Will come back again.",
          date: "2024-01-05",
        },
        {
          author: "Jennifer L.",
          rating: random(4, 5),
          text: "Excellent quality and attention to detail.",
          date: "2023-12-28",
        },
      ],
    },
  }

  // Category-specific details
  switch (category) {
    case "hair salon":
      extendedLead.description = `${baseLead.businessName} is a full-service hair salon offering cutting-edge styles and professional hair care services. Our experienced stylists stay current with the latest trends and techniques to give you the perfect look.`
      extendedLead.services = [
        "Hair Cuts",
        "Hair Coloring",
        "Highlights",
        "Perms",
        "Hair Styling",
        "Hair Treatments",
        "Blowouts",
        "Wedding Hair",
      ]
      extendedLead.specialties = ["Color Correction", "Balayage", "Keratin Treatments", "Bridal Styling"]
      extendedLead.businessHours = {
        monday: "Closed",
        tuesday: "9:00 AM - 7:00 PM",
        wednesday: "9:00 AM - 7:00 PM",
        thursday: "9:00 AM - 8:00 PM",
        friday: "9:00 AM - 8:00 PM",
        saturday: "8:00 AM - 6:00 PM",
        sunday: "10:00 AM - 5:00 PM",
      }
      extendedLead.certifications = ["Licensed Cosmetologists", "Redken Certified", "L'Oreal Professional"]
      break

    case "bakery":
      extendedLead.description = `${baseLead.businessName} is a local bakery specializing in fresh-baked goods, custom cakes, and artisanal breads. We use only the finest ingredients to create delicious treats for every occasion.`
      extendedLead.services = [
        "Fresh Bread",
        "Custom Cakes",
        "Pastries",
        "Cookies",
        "Wedding Cakes",
        "Birthday Cakes",
        "Catering",
        "Special Orders",
      ]
      extendedLead.specialties = ["Artisan Breads", "Custom Decorating", "Gluten-Free Options", "Vegan Treats"]
      extendedLead.businessHours = {
        monday: "6:00 AM - 6:00 PM",
        tuesday: "6:00 AM - 6:00 PM",
        wednesday: "6:00 AM - 6:00 PM",
        thursday: "6:00 AM - 6:00 PM",
        friday: "6:00 AM - 7:00 PM",
        saturday: "6:00 AM - 7:00 PM",
        sunday: "7:00 AM - 5:00 PM",
      }
      extendedLead.certifications = ["Food Safety Certified", "ServSafe Certified"]
      break

    case "dentist":
      extendedLead.description = `${baseLead.businessName} provides comprehensive dental care for patients of all ages. Our modern facility and experienced team ensure comfortable, quality dental treatment in a welcoming environment.`
      extendedLead.services = [
        "General Dentistry",
        "Teeth Cleaning",
        "Fillings",
        "Crowns",
        "Root Canals",
        "Teeth Whitening",
        "Oral Surgery",
        "Pediatric Dentistry",
      ]
      extendedLead.specialties = ["Cosmetic Dentistry", "Implants", "Orthodontics", "Emergency Care"]
      extendedLead.businessHours = {
        monday: "8:00 AM - 5:00 PM",
        tuesday: "8:00 AM - 5:00 PM",
        wednesday: "8:00 AM - 5:00 PM",
        thursday: "8:00 AM - 5:00 PM",
        friday: "8:00 AM - 3:00 PM",
        saturday: "8:00 AM - 2:00 PM",
        sunday: "Closed",
      }
      extendedLead.certifications = ["DDS Licensed", "ADA Member", "Board Certified"]
      break

    case "restaurant":
      extendedLead.description = `${baseLead.businessName} offers a unique dining experience with fresh, locally-sourced ingredients and exceptional service. Our menu features both classic favorites and innovative dishes.`
      extendedLead.services = [
        "Dine-In",
        "Takeout",
        "Delivery",
        "Catering",
        "Private Events",
        "Happy Hour",
        "Weekend Brunch",
      ]
      extendedLead.specialties = ["Farm-to-Table", "Craft Cocktails", "Wine Selection", "Seasonal Menu"]
      extendedLead.businessHours = {
        monday: "11:00 AM - 9:00 PM",
        tuesday: "11:00 AM - 9:00 PM",
        wednesday: "11:00 AM - 9:00 PM",
        thursday: "11:00 AM - 10:00 PM",
        friday: "11:00 AM - 11:00 PM",
        saturday: "10:00 AM - 11:00 PM",
        sunday: "10:00 AM - 9:00 PM",
      }
      extendedLead.certifications = ["Food Service License", "Liquor License", "Health Department Certified"]
      break

    case "gym":
      extendedLead.description = `${baseLead.businessName} is a full-service fitness center dedicated to helping you achieve your health and fitness goals. We offer state-of-the-art equipment and expert guidance.`
      extendedLead.services = [
        "Gym Membership",
        "Personal Training",
        "Group Classes",
        "Cardio Equipment",
        "Weight Training",
        "Yoga Classes",
        "Nutrition Counseling",
      ]
      extendedLead.specialties = ["Strength Training", "HIIT Classes", "Functional Fitness", "Senior Fitness"]
      extendedLead.businessHours = {
        monday: "5:00 AM - 10:00 PM",
        tuesday: "5:00 AM - 10:00 PM",
        wednesday: "5:00 AM - 10:00 PM",
        thursday: "5:00 AM - 10:00 PM",
        friday: "5:00 AM - 9:00 PM",
        saturday: "6:00 AM - 8:00 PM",
        sunday: "7:00 AM - 8:00 PM",
      }
      extendedLead.certifications = ["ACSM Certified", "CPR/AED Certified", "NASM Certified Trainers"]
      break

    case "plumber":
      extendedLead.description = `${baseLead.businessName} provides reliable plumbing services for residential and commercial properties. Our licensed plumbers are available for emergency repairs and routine maintenance.`
      extendedLead.services = [
        "Emergency Repairs",
        "Pipe Installation",
        "Drain Cleaning",
        "Water Heater Service",
        "Bathroom Remodeling",
        "Kitchen Plumbing",
        "Leak Detection",
      ]
      extendedLead.specialties = [
        "24/7 Emergency Service",
        "Trenchless Repair",
        "Green Plumbing Solutions",
        "Commercial Plumbing",
      ]
      extendedLead.businessHours = {
        monday: "7:00 AM - 6:00 PM",
        tuesday: "7:00 AM - 6:00 PM",
        wednesday: "7:00 AM - 6:00 PM",
        thursday: "7:00 AM - 6:00 PM",
        friday: "7:00 AM - 6:00 PM",
        saturday: "8:00 AM - 4:00 PM",
        sunday: "Emergency Only",
      }
      extendedLead.certifications = ["Licensed Plumber", "Bonded & Insured", "Master Plumber Certified"]
      break

    case "lawyer":
      extendedLead.description = `${baseLead.businessName} provides experienced legal representation and counsel. Our attorneys are committed to protecting your rights and achieving the best possible outcomes.`
      extendedLead.services = [
        "Legal Consultation",
        "Personal Injury",
        "Family Law",
        "Criminal Defense",
        "Business Law",
        "Estate Planning",
        "Real Estate Law",
      ]
      extendedLead.specialties = ["Trial Advocacy", "Mediation", "Contract Law", "Immigration Law"]
      extendedLead.businessHours = {
        monday: "8:00 AM - 6:00 PM",
        tuesday: "8:00 AM - 6:00 PM",
        wednesday: "8:00 AM - 6:00 PM",
        thursday: "8:00 AM - 6:00 PM",
        friday: "8:00 AM - 5:00 PM",
        saturday: "By Appointment",
        sunday: "Closed",
      }
      extendedLead.certifications = ["State Bar Licensed", "ABA Member", "Board Certified Specialist"]
      break

    case "accountant":
      extendedLead.description = `${baseLead.businessName} offers comprehensive accounting and tax services for individuals and businesses. Our certified professionals ensure accurate financial management and tax compliance.`
      extendedLead.services = [
        "Tax Preparation",
        "Bookkeeping",
        "Payroll Services",
        "Business Consulting",
        "Audit Support",
        "Financial Planning",
        "QuickBooks Setup",
      ]
      extendedLead.specialties = [
        "Small Business Accounting",
        "Tax Planning",
        "IRS Representation",
        "Financial Analysis",
      ]
      extendedLead.businessHours = {
        monday: "8:00 AM - 6:00 PM",
        tuesday: "8:00 AM - 6:00 PM",
        wednesday: "8:00 AM - 6:00 PM",
        thursday: "8:00 AM - 6:00 PM",
        friday: "8:00 AM - 5:00 PM",
        saturday: "9:00 AM - 2:00 PM",
        sunday: "Closed",
      }
      extendedLead.certifications = ["CPA Licensed", "IRS Enrolled Agent", "QuickBooks ProAdvisor"]
      break

    case "auto mechanic":
      extendedLead.description = `${baseLead.businessName} provides expert automotive repair and maintenance services. Our ASE-certified technicians use the latest diagnostic equipment to keep your vehicle running smoothly.`
      extendedLead.services = [
        "Oil Changes",
        "Brake Repair",
        "Engine Diagnostics",
        "Transmission Service",
        "AC Repair",
        "Tire Service",
        "State Inspections",
        "Preventive Maintenance",
      ]
      extendedLead.specialties = ["Import Vehicles", "Diesel Engines", "Hybrid Vehicles", "Classic Cars"]
      extendedLead.businessHours = {
        monday: "7:00 AM - 6:00 PM",
        tuesday: "7:00 AM - 6:00 PM",
        wednesday: "7:00 AM - 6:00 PM",
        thursday: "7:00 AM - 6:00 PM",
        friday: "7:00 AM - 6:00 PM",
        saturday: "8:00 AM - 4:00 PM",
        sunday: "Closed",
      }
      extendedLead.certifications = ["ASE Certified", "State Licensed", "Manufacturer Certified"]
      break

    case "florist":
      extendedLead.description = `${baseLead.businessName} creates beautiful floral arrangements for all occasions. From weddings to sympathy flowers, we provide fresh, high-quality blooms with artistic flair.`
      extendedLead.services = [
        "Wedding Flowers",
        "Funeral Arrangements",
        "Birthday Bouquets",
        "Corporate Events",
        "Delivery Service",
        "Plant Care",
        "Custom Arrangements",
      ]
      extendedLead.specialties = ["Bridal Bouquets", "Seasonal Arrangements", "Exotic Flowers", "Event Decorating"]
      extendedLead.businessHours = {
        monday: "9:00 AM - 6:00 PM",
        tuesday: "9:00 AM - 6:00 PM",
        wednesday: "9:00 AM - 6:00 PM",
        thursday: "9:00 AM - 6:00 PM",
        friday: "9:00 AM - 7:00 PM",
        saturday: "8:00 AM - 6:00 PM",
        sunday: "10:00 AM - 4:00 PM",
      }
      extendedLead.certifications = ["Certified Floral Designer", "Wedding Specialist Certified"]
      break

    case "photographer":
      extendedLead.description = `${baseLead.businessName} captures life's precious moments with artistic vision and professional expertise. We specialize in creating timeless images that tell your unique story.`
      extendedLead.services = [
        "Wedding Photography",
        "Portrait Sessions",
        "Event Photography",
        "Corporate Headshots",
        "Family Photos",
        "Senior Portraits",
        "Product Photography",
      ]
      extendedLead.specialties = ["Natural Light Photography", "Digital Editing", "Album Design", "Drone Photography"]
      extendedLead.businessHours = {
        monday: "10:00 AM - 6:00 PM",
        tuesday: "10:00 AM - 6:00 PM",
        wednesday: "10:00 AM - 6:00 PM",
        thursday: "10:00 AM - 6:00 PM",
        friday: "10:00 AM - 6:00 PM",
        saturday: "9:00 AM - 8:00 PM",
        sunday: "12:00 PM - 6:00 PM",
      }
      extendedLead.certifications = ["Professional Photographers Association", "Certified Professional Photographer"]
      break

    case "contractor":
      extendedLead.description = `${baseLead.businessName} provides comprehensive construction and remodeling services. Our licensed contractors deliver quality workmanship and reliable service for residential and commercial projects.`
      extendedLead.services = [
        "Home Remodeling",
        "Kitchen Renovation",
        "Bathroom Remodel",
        "Roofing",
        "Flooring",
        "Painting",
        "Electrical Work",
        "Plumbing",
      ]
      extendedLead.specialties = ["Custom Homes", "Historic Restoration", "Green Building", "Commercial Construction"]
      extendedLead.businessHours = {
        monday: "7:00 AM - 5:00 PM",
        tuesday: "7:00 AM - 5:00 PM",
        wednesday: "7:00 AM - 5:00 PM",
        thursday: "7:00 AM - 5:00 PM",
        friday: "7:00 AM - 5:00 PM",
        saturday: "8:00 AM - 2:00 PM",
        sunday: "Closed",
      }
      extendedLead.certifications = ["Licensed Contractor", "Bonded & Insured", "Better Business Bureau A+"]
      break

    default:
      extendedLead.description = `${baseLead.businessName} is a professional service provider committed to excellence and customer satisfaction.`
      extendedLead.services = ["Professional Services", "Consultation", "Customer Support"]
      extendedLead.businessHours = {
        monday: "9:00 AM - 5:00 PM",
        tuesday: "9:00 AM - 5:00 PM",
        wednesday: "9:00 AM - 5:00 PM",
        thursday: "9:00 AM - 5:00 PM",
        friday: "9:00 AM - 5:00 PM",
        saturday: "Closed",
        sunday: "Closed",
      }
  }

  // Add social media based on lead type and website presence
  if (baseLead.website || random(1, 10) > 6) {
    extendedLead.socialMedia = {
      facebook:
        random(1, 10) > 3
          ? `https://facebook.com/${baseLead.businessName.toLowerCase().replace(/\s+/g, "")}`
          : undefined,
      instagram:
        random(1, 10) > 5
          ? `https://instagram.com/${baseLead.businessName.toLowerCase().replace(/\s+/g, "")}`
          : undefined,
      twitter:
        random(1, 10) > 7
          ? `https://twitter.com/${baseLead.businessName.toLowerCase().replace(/\s+/g, "")}`
          : undefined,
    }
  }

  // Add service area
  const addressParts = baseLead.address.split(", ")
  const city = addressParts[addressParts.length - 2]
  const state = addressParts[addressParts.length - 1]?.split(" ")[0]
  extendedLead.serviceArea = [
    city,
    `${city} Metro Area`,
    `${state} Statewide`,
    ...(random(1, 10) > 5 ? ["Surrounding Counties"] : []),
  ]

  // Add competitors
  extendedLead.competitors = [
    {
      name: `${category === "hair salon" ? "Style" : category === "bakery" ? "Fresh" : category === "dentist" ? "Smile" : "Pro"} ${category === "hair salon" ? "Studio" : category === "bakery" ? "Bakery" : category === "dentist" ? "Dental" : "Services"}`,
      distance: `${random(1, 5)}.${random(1, 9)} miles`,
      rating: random(35, 48) / 10,
      hasWebsite: random(1, 10) > 4,
    },
    {
      name: `${city} ${category === "hair salon" ? "Hair" : category === "bakery" ? "Bread" : category === "dentist" ? "Family Dental" : "Professional"} ${category === "hair salon" ? "Salon" : category === "bakery" ? "Company" : category === "dentist" ? "Care" : "Group"}`,
      distance: `${random(2, 8)}.${random(1, 9)} miles`,
      rating: random(30, 45) / 10,
      hasWebsite: random(1, 10) > 6,
    },
    {
      name: `${category === "hair salon" ? "Elegant" : category === "bakery" ? "Corner" : category === "dentist" ? "Modern" : "Elite"} ${category === "hair salon" ? "Hair Design" : category === "bakery" ? "Bakehouse" : category === "dentist" ? "Dentistry" : "Solutions"}`,
      distance: `${random(3, 10)}.${random(1, 9)} miles`,
      rating: random(25, 42) / 10,
      hasWebsite: random(1, 10) > 3,
    },
  ]

  // Add market insights
  const leadScore = baseLead.leadScore
  extendedLead.marketInsights = {
    marketPosition:
      leadScore >= 85 ? "leader" : leadScore >= 70 ? "challenger" : leadScore >= 50 ? "follower" : "niche",
    strengths:
      leadScore >= 80
        ? ["Strong local presence", "Excellent customer service", "Competitive pricing"]
        : leadScore >= 60
          ? ["Good reputation", "Convenient location", "Quality services"]
          : ["Niche specialization", "Personal attention", "Flexible scheduling"],
    opportunities: baseLead.website
      ? ["Social media marketing", "Online reviews management", "SEO optimization"]
      : ["Website development", "Online presence", "Digital marketing", "Google My Business optimization"],
    threats: ["New competitors", "Economic downturn", "Changing consumer preferences"],
  }

  return extendedLead
}

// Get extended lead details by ID
export const getExtendedLeadById = (leadId: string, allLeads: Lead[]): ExtendedLead | null => {
  const baseLead = allLeads.find((lead) => lead.id === leadId)
  if (!baseLead) return null

  return generateExtendedLeadDetails(baseLead)
}
