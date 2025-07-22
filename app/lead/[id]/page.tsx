"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  Star,
  ArrowLeft,
  Download,
  Gauge,
  MessageSquare,
  Map,
  SearchIcon,
  Target,
  Lightbulb,
  Award,
  CheckCircle,
  User,
  Clock,
  Briefcase,
  Users,
} from "lucide-react"
import { mockLeads } from "@/lib/data"
import { getExtendedLeadById } from "@/lib/lead-details"
import { leadTypes } from "@/lib/data"

export default function LeadDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [notes, setNotes] = useState("")

  const lead = getExtendedLeadById(params.id as string, mockLeads)

  if (!lead) {
    return (
      <div className="min-h-screen bg-main">
        <div className="max-w-4xl mx-auto px-8 py-12 text-center">
          <h1 className="text-3xl font-normal text-primary mb-6">Lead Not Found</h1>
          <p className="text-lg text-secondary font-normal mb-8">
            The lead you're looking for doesn't exist or may have been removed.
          </p>
          <Button
            onClick={() => router.back()}
            className="bg-black hover:bg-gray-800 text-white font-normal rounded-none"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  const leadTypeInfo = leadTypes.find((lt) => lt.id === lead.leadType) || leadTypes[0]

  const getOutreachScript = () => {
    switch (lead.leadType) {
      case "excellent":
        return `Hi ${lead.businessName} team,\n\nI noticed you don't currently have a website, but you have great contact information available. In today's digital world, having a professional website can significantly boost your visibility and customer reach.\n\nI'd love to discuss how we can help you establish a strong online presence. Would you be interested in a brief conversation about your digital marketing needs?\n\nBest regards,`
      case "good":
        return `Hello ${lead.businessName},\n\nI came across your website and noticed there might be some opportunities to improve its performance and user experience. Your business looks great, and I believe we can help you get even better results online.\n\nWould you be open to a quick conversation about optimizing your website's performance?\n\nBest regards,`
      case "medium":
        return `Hi ${lead.businessName} team,\n\nYour website shows good potential, and I see opportunities to take it to the next level. We specialize in helping businesses like yours improve their online performance and customer engagement.\n\nWould you be interested in learning about some strategies that could boost your online results?\n\nBest regards,`
      case "poor":
        return `Hello ${lead.businessName},\n\nI was impressed by your professional website! It's clear you understand the importance of a strong online presence. I'd love to discuss some advanced strategies that could help you maximize your digital marketing ROI.\n\nWould you be open to exploring some cutting-edge approaches to online growth?\n\nBest regards,`
      default:
        return `Hi ${lead.businessName},\n\nI'd love to learn more about your business and discuss how we might be able to help you grow your online presence.\n\nWould you be interested in a brief conversation?\n\nBest regards,`
    }
  }

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "google-maps":
        return <Map className="h-5 w-5" />
      case "google-search":
        return <SearchIcon className="h-5 w-5" />
      case "both":
        return (
          <div className="flex gap-1">
            <Map className="h-4 w-4" />
            <SearchIcon className="h-4 w-4" />
          </div>
        )
      default:
        return null
    }
  }

  const getSourceLabel = (source: string) => {
    switch (source) {
      case "google-maps":
        return "Google Maps"
      case "google-search":
        return "Google Search"
      case "both":
        return "Maps + Search"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="min-h-screen bg-main">
      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <Button
            onClick={() => router.back()}
            className="mb-8 bg-card border border-black text-primary hover:bg-gray-50 font-normal rounded-none"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Results
          </Button>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-5xl font-normal text-primary mb-4 leading-tight">{lead.businessName}</h1>
              <p className="text-xl text-secondary font-normal">{lead.category}</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge className={`${leadTypeInfo.color} px-4 py-2 text-sm font-normal rounded-none`}>
                {leadTypeInfo.label}
              </Badge>
              <div className="flex items-center gap-2 bg-yellow-100 px-4 py-3 rounded-none">
                <Star className="h-6 w-6 text-yellow-600" />
                <span className="text-2xl font-medium text-primary">{lead.leadScore}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Business Information */}
            <Card className="border-0 shadow-none bg-card">
              <CardContent className="p-8">
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-normal text-primary">Business Information</h2>
                  </div>
                  <p className="text-secondary font-normal">
                    Contact details and business information for {lead.businessName}
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      {lead.phone && (
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                            <Phone className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm text-secondary font-normal mb-1">Phone</p>
                            <p className="font-medium text-primary text-lg">{lead.phone}</p>
                          </div>
                        </div>
                      )}
                      {lead.email && (
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                            <Mail className="h-6 w-6 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm text-secondary font-normal mb-1">Email</p>
                            <p className="font-medium text-primary text-lg">{lead.email}</p>
                          </div>
                        </div>
                      )}
                      {lead.website && (
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                            <Globe className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-secondary font-normal mb-1">Website</p>
                            <a
                              href={lead.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-primary text-lg hover:underline"
                            >
                              {lead.website}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                          <MapPin className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm text-secondary font-normal mb-1">Address</p>
                          <p className="font-medium text-primary text-lg">{lead.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Source Information */}
            <Card className="border-0 shadow-none bg-card">
              <CardContent className="p-8">
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                      {getSourceIcon(lead.source)}
                    </div>
                    <h2 className="text-2xl font-normal text-primary">Lead Source Information</h2>
                  </div>
                  <p className="text-secondary font-normal">
                    Data source and discovery information for this business lead
                  </p>
                </div>

                <div className="p-6 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-medium text-primary">Data Source</span>
                    <Badge className="bg-blue-100 text-blue-800 px-3 py-1 font-normal rounded-none">
                      {getSourceLabel(lead.source)}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-card rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Map className="h-4 w-4 text-primary" />
                        <span className="font-medium text-primary">Google Maps</span>
                      </div>
                      <span className="text-sm text-secondary font-normal">
                        {lead.googleMapsListing ? "Listed" : "Not found"}
                      </span>
                    </div>

                    <div className="p-4 bg-card rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <SearchIcon className="h-4 w-4 text-primary" />
                        <span className="font-medium text-primary">Google Search</span>
                      </div>
                      <span className="text-sm text-secondary font-normal">
                        {lead.googleSearchRanking ? `Ranking #${lead.googleSearchRanking}` : "Not found"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Website Performance */}
            {lead.website && (
              <Card className="border-0 shadow-none bg-card">
                <CardContent className="p-8">
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                        <Gauge className="h-5 w-5 text-orange-600" />
                      </div>
                      <h2 className="text-2xl font-normal text-primary">Website Performance Analysis</h2>
                    </div>
                    <p className="text-secondary font-normal">
                      Technical performance metrics and optimization opportunities
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl">
                      <span className="text-lg font-medium text-primary">Google Lighthouse Score</span>
                      <span
                        className={`text-4xl font-medium ${
                          (lead.lighthouseScore || 0) >= 80
                            ? "text-green-600"
                            : (lead.lighthouseScore || 0) >= 40
                              ? "text-yellow-600"
                              : "text-red-600"
                        }`}
                      >
                        {lead.lighthouseScore || "N/A"}/100
                      </span>
                    </div>

                    {lead.lighthouseScore && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-xl">
                          <div className="flex justify-between items-center">
                            <span className="text-primary font-normal">Performance</span>
                            <span className="font-medium text-primary">
                              {Math.max(0, lead.lighthouseScore - 10)}/100
                            </span>
                          </div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl">
                          <div className="flex justify-between items-center">
                            <span className="text-primary font-normal">Accessibility</span>
                            <span className="font-medium text-primary">
                              {Math.min(100, lead.lighthouseScore + 15)}/100
                            </span>
                          </div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl">
                          <div className="flex justify-between items-center">
                            <span className="text-primary font-normal">Best Practices</span>
                            <span className="font-medium text-primary">
                              {Math.min(100, lead.lighthouseScore + 5)}/100
                            </span>
                          </div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl">
                          <div className="flex justify-between items-center">
                            <span className="text-primary font-normal">SEO</span>
                            <span className="font-medium text-primary">
                              {Math.max(0, lead.lighthouseScore - 5)}/100
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="p-6 bg-gray-50 rounded-xl">
                      <h4 className="font-medium text-primary mb-4 text-lg">Website Screenshot</h4>
                      <div className="bg-card border-2 border-dashed border-gray-300 rounded-xl h-48 flex items-center justify-center">
                        <p className="text-secondary font-normal">Website preview would appear here</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Search Snippet Information */}
            {lead.searchSnippet && (
              <Card className="border-0 shadow-none bg-card">
                <CardContent className="p-8">
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                        <SearchIcon className="h-5 w-5 text-blue-600" />
                      </div>
                      <h2 className="text-2xl font-normal text-primary">Google Search Result Preview</h2>
                    </div>
                    <p className="text-secondary font-normal">How this business appears in Google search results</p>
                  </div>

                  <div className="p-6 bg-gray-50 rounded-xl">
                    <div className="space-y-3">
                      <div className="text-blue-600 font-medium text-lg hover:underline cursor-pointer">
                        {lead.searchSnippet.title}
                      </div>
                      <div className="text-green-600 text-sm font-normal">{lead.searchSnippet.displayUrl}</div>
                      <div className="text-secondary text-sm font-normal leading-relaxed">
                        {lead.searchSnippet.description}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex justify-between items-center">
                        <span className="text-primary font-normal">Search Ranking</span>
                        <span className="font-medium text-primary">#{lead.googleSearchRanking}</span>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex justify-between items-center">
                        <span className="text-primary font-normal">Click-through Rate</span>
                        <span className="font-medium text-primary">
                          {lead.googleSearchRanking === 1
                            ? "28%"
                            : lead.googleSearchRanking === 2
                              ? "15%"
                              : lead.googleSearchRanking === 3
                                ? "11%"
                                : "8%"}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Local SEO Analysis */}
            {lead.localSEOScore && (
              <Card className="border-0 shadow-none bg-card">
                <CardContent className="p-8">
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                        <Target className="h-5 w-5 text-green-600" />
                      </div>
                      <h2 className="text-2xl font-normal text-primary">Local SEO Performance</h2>
                    </div>
                    <p className="text-secondary font-normal">
                      Local search optimization metrics and improvement opportunities
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl">
                      <span className="text-lg font-medium text-primary">Overall Local SEO Score</span>
                      <span
                        className={`text-4xl font-medium ${
                          lead.localSEOScore.overallScore >= 70
                            ? "text-green-600"
                            : lead.localSEOScore.overallScore >= 40
                              ? "text-yellow-600"
                              : "text-red-600"
                        }`}
                      >
                        {lead.localSEOScore.overallScore}/100
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-primary font-normal">Google My Business</span>
                          <span className="font-medium text-primary">
                            {lead.localSEOScore.factors.googleMyBusiness}/100
                          </span>
                        </div>
                        <div className="w-full bg-gray-300 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${lead.localSEOScore.factors.googleMyBusiness}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-xl">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-primary font-normal">Local Keywords</span>
                          <span className="font-medium text-primary">
                            {lead.localSEOScore.factors.localKeywords}/100
                          </span>
                        </div>
                        <div className="w-full bg-gray-300 rounded-full h-2">
                          <div
                            className="bg-yellow-500 h-2 rounded-full"
                            style={{ width: `${lead.localSEOScore.factors.localKeywords}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-xl">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-primary font-normal">Reviews & Ratings</span>
                          <span className="font-medium text-primary">{lead.localSEOScore.factors.reviews}/100</span>
                        </div>
                        <div className="w-full bg-gray-300 rounded-full h-2">
                          <div
                            className="bg-purple-500 h-2 rounded-full"
                            style={{ width: `${lead.localSEOScore.factors.reviews}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-xl">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-primary font-normal">Local Citations</span>
                          <span className="font-medium text-primary">{lead.localSEOScore.factors.citations}/100</span>
                        </div>
                        <div className="w-full bg-gray-300 rounded-full h-2">
                          <div
                            className="bg-pink-500 h-2 rounded-full"
                            style={{ width: `${lead.localSEOScore.factors.citations}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-xl md:col-span-2">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-primary font-normal">Website Optimization</span>
                          <span className="font-medium text-primary">
                            {lead.localSEOScore.factors.websiteOptimization}/100
                          </span>
                        </div>
                        <div className="w-full bg-gray-300 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${lead.localSEOScore.factors.websiteOptimization}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-blue-50 rounded-xl">
                      <h4 className="font-medium text-primary mb-4 text-lg flex items-center gap-2">
                        <Lightbulb className="h-5 w-5" />
                        SEO Recommendations
                      </h4>
                      <ul className="space-y-2">
                        {lead.localSEOScore.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-primary font-normal">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Business Hours */}
            {lead.businessHours && (
              <Card className="border-0 shadow-none bg-card">
                <CardContent className="p-8">
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                        <Clock className="h-5 w-5 text-green-600" />
                      </div>
                      <h2 className="text-2xl font-normal text-primary">Business Hours</h2>
                    </div>
                    <p className="text-secondary font-normal">
                      Operating hours and availability for {lead.businessName}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(lead.businessHours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                        <span className="font-medium text-primary capitalize">{day}</span>
                        <span className="text-primary font-normal">{hours}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Services & Specialties */}
            {(lead.services || lead.specialties) && (
              <Card className="border-0 shadow-none bg-card">
                <CardContent className="p-8">
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                        <Briefcase className="h-5 w-5 text-purple-600" />
                      </div>
                      <h2 className="text-2xl font-normal text-primary">Services & Specialties</h2>
                    </div>
                    <p className="text-secondary font-normal">Complete range of services and areas of expertise</p>
                  </div>

                  <div className="space-y-6">
                    {lead.services && (
                      <div>
                        <h3 className="text-lg font-medium text-primary mb-4">Services Offered</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {lead.services.map((service, index) => (
                            <div key={index} className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl">
                              <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0" />
                              <span className="text-primary font-normal text-sm">{service}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {lead.specialties && (
                      <div>
                        <h3 className="text-lg font-medium text-primary mb-4">Specialties</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {lead.specialties.map((specialty, index) => (
                            <div key={index} className="flex items-center gap-2 p-3 bg-yellow-50 rounded-xl">
                              <Award className="h-4 w-4 text-yellow-600 flex-shrink-0" />
                              <span className="text-primary font-normal">{specialty}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Reviews & Ratings */}
            {lead.reviews && (
              <Card className="border-0 shadow-none bg-card">
                <CardContent className="p-8">
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
                        <Star className="h-5 w-5 text-yellow-600" />
                      </div>
                      <h2 className="text-2xl font-normal text-primary">Customer Reviews</h2>
                    </div>
                    <p className="text-secondary font-normal">What customers are saying about {lead.businessName}</p>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-6 bg-yellow-50 rounded-xl">
                        <div className="text-3xl font-medium text-primary mb-2">
                          {lead.reviews.averageRating.toFixed(1)}
                        </div>
                        <div className="flex justify-center mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-5 w-5 ${
                                star <= Math.round(lead.reviews!.averageRating)
                                  ? "text-yellow-500 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-secondary">Average Rating</div>
                      </div>

                      <div className="text-center p-6 bg-blue-50 rounded-xl">
                        <div className="text-3xl font-medium text-primary mb-2">{lead.reviews.totalReviews}</div>
                        <div className="text-sm text-secondary">Total Reviews</div>
                      </div>

                      <div className="text-center p-6 bg-green-50 rounded-xl">
                        <div className="text-3xl font-medium text-primary mb-2">{lead.reviews.googleReviews}</div>
                        <div className="text-sm text-secondary">Google Reviews</div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-primary mb-4">Recent Reviews</h3>
                      <div className="space-y-4">
                        {lead.reviews.recentReviews.map((review, index) => (
                          <div key={index} className="p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-primary">{review.author}</span>
                              <div className="flex items-center gap-2">
                                <div className="flex">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      className={`h-4 w-4 ${
                                        star <= review.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-secondary">{review.date}</span>
                              </div>
                            </div>
                            <p className="text-secondary font-normal">{review.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Competitors Analysis */}
            {lead.competitors && (
              <Card className="border-0 shadow-none bg-card">
                <CardContent className="p-8">
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                        <Users className="h-5 w-5 text-red-600" />
                      </div>
                      <h2 className="text-2xl font-normal text-primary">Local Competition</h2>
                    </div>
                    <p className="text-secondary font-normal">Nearby competitors and market positioning analysis</p>
                  </div>

                  <div className="space-y-4">
                    {lead.competitors.map((competitor, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex-1">
                          <div className="font-medium text-primary mb-1">{competitor.name}</div>
                          <div className="text-sm text-secondary">{competitor.distance} away</div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-primary font-medium">{competitor.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Globe className="h-4 w-4 text-secondary" />
                            <span className={`text-sm ${competitor.hasWebsite ? "text-green-600" : "text-red-600"}`}>
                              {competitor.hasWebsite ? "Has Website" : "No Website"}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Lead Score Breakdown */}
            <Card className="border-0 shadow-none bg-card">
              <CardContent className="p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-normal text-primary mb-4">Lead Score Breakdown</h2>
                  <p className="text-secondary font-normal">
                    Detailed breakdown of how this lead's score was calculated
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                    <span className="text-primary font-normal">Contact Information Available</span>
                    <span className="font-medium text-primary">
                      {lead.phone || lead.email ? "+30 points" : "0 points"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                    <span className="text-primary font-normal">Website Status</span>
                    <span className="font-medium text-primary">
                      {!lead.website
                        ? "+25 points"
                        : (lead.lighthouseScore || 0) < 40
                          ? "+20 points"
                          : (lead.lighthouseScore || 0) < 80
                            ? "+10 points"
                            : "+5 points"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                    <span className="text-primary font-normal">Business Category Match</span>
                    <span className="font-medium text-primary">+15 points</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                    <span className="text-primary font-normal">Location Relevance</span>
                    <span className="font-medium text-primary">+10 points</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                    <span className="text-primary font-normal">Data Source Quality</span>
                    <span className="font-medium text-primary">
                      {lead.source === "both"
                        ? "+15 points"
                        : lead.source === "google-maps"
                          ? "+10 points"
                          : "+5 points"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-6 bg-yellow-100 rounded-xl">
                    <span className="font-medium text-primary text-lg">Total Lead Score</span>
                    <span className="font-medium text-primary text-2xl">{lead.leadScore}/100</span>
                  </div>
                </div>
                <div className="mt-6 p-6 bg-blue-50 rounded-xl">
                  <p className="text-primary font-normal">
                    <strong>Lead Type:</strong> {leadTypeInfo.label} - {leadTypeInfo.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Business Information */}
            <Card className="border-0 shadow-none bg-card">
              <CardContent className="p-6">
                <h3 className="text-xl font-normal text-primary mb-6">Business Details</h3>
                <div className="space-y-4">
                  {lead.yearEstablished && (
                    <div className="flex justify-between items-center">
                      <span className="text-secondary">Established</span>
                      <span className="font-medium text-primary">{lead.yearEstablished}</span>
                    </div>
                  )}
                  {lead.employeeCount && (
                    <div className="flex justify-between items-center">
                      <span className="text-secondary">Employees</span>
                      <span className="font-medium text-primary">{lead.employeeCount}</span>
                    </div>
                  )}
                  {lead.serviceArea && (
                    <div>
                      <span className="text-secondary text-sm">Service Area:</span>
                      <div className="mt-2 space-y-1">
                        {lead.serviceArea.map((area, index) => (
                          <div key={index} className="text-primary font-normal text-sm">
                            • {area}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            {lead.socialMedia && Object.values(lead.socialMedia).some(Boolean) && (
              <Card className="border-0 shadow-none bg-card">
                <CardContent className="p-6">
                  <h3 className="text-xl font-normal text-primary mb-6">Social Media</h3>
                  <div className="space-y-3">
                    {lead.socialMedia.facebook && (
                      <a
                        href={lead.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                      >
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">f</span>
                        </div>
                        <span className="text-primary font-normal">Facebook</span>
                      </a>
                    )}
                    {lead.socialMedia.instagram && (
                      <a
                        href={lead.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-pink-50 rounded-xl hover:bg-pink-100 transition-colors"
                      >
                        <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">@</span>
                        </div>
                        <span className="text-primary font-normal">Instagram</span>
                      </a>
                    )}
                    {lead.socialMedia.twitter && (
                      <a
                        href={lead.socialMedia.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                      >
                        <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">T</span>
                        </div>
                        <span className="text-primary font-normal">Twitter</span>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Market Position */}
            {lead.marketInsights && (
              <Card className="border-0 shadow-none bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                      <Target className="h-4 w-4 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-normal text-primary">Market Position</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div
                        className={`text-2xl font-medium mb-2 ${
                          lead.marketInsights.marketPosition === "leader"
                            ? "text-green-600"
                            : lead.marketInsights.marketPosition === "challenger"
                              ? "text-blue-600"
                              : lead.marketInsights.marketPosition === "follower"
                                ? "text-yellow-600"
                                : "text-purple-600"
                        }`}
                      >
                        {lead.marketInsights.marketPosition.charAt(0).toUpperCase() +
                          lead.marketInsights.marketPosition.slice(1)}
                      </div>
                      <p className="text-sm text-secondary">Market Position</p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-primary text-sm mb-2">Strengths:</h4>
                        {lead.marketInsights.strengths.map((strength, index) => (
                          <div key={index} className="text-sm text-secondary">
                            • {strength}
                          </div>
                        ))}
                      </div>

                      <div>
                        <h4 className="font-medium text-primary text-sm mb-2">Opportunities:</h4>
                        {lead.marketInsights.opportunities.map((opportunity, index) => (
                          <div key={index} className="text-sm text-secondary">
                            • {opportunity}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <Card className="border-0 shadow-none bg-card">
              <CardContent className="p-6">
                <h3 className="text-xl font-normal text-primary mb-6">Actions</h3>
                <div className="space-y-4">
                  <Button className="w-full h-12 bg-black hover:bg-gray-800 text-white font-normal rounded-none">
                    <Download className="mr-2 h-4 w-4" />
                    Export to Zoho
                  </Button>
                  <Button className="w-full h-12 bg-card border border-black text-primary hover:bg-gray-50 font-normal rounded-none">
                    <Download className="mr-2 h-4 w-4" />
                    Download vCard
                  </Button>
                  <Button className="w-full h-12 bg-green-100 hover:bg-green-200 text-green-800 font-normal rounded-none">
                    <Mail className="mr-2 h-4 w-4" />
                    Send Email
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Custom Notes */}
            <Card className="border-0 shadow-none bg-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100">
                    <MessageSquare className="h-4 w-4 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-normal text-primary">Custom Notes</h3>
                </div>
                <div className="space-y-4">
                  <Label htmlFor="notes" className="text-primary font-normal">
                    Add your notes about this lead
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Enter notes about this lead..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    className="bg-card border-gray-300 font-normal text-primary resize-none rounded-none"
                  />
                  <Button className="w-full h-12 bg-black hover:bg-gray-800 text-white font-normal rounded-none">
                    Save Notes
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Suggested Outreach Script */}
            <Card className="border-0 shadow-none bg-card">
              <CardContent className="p-6">
                <h3 className="text-xl font-normal text-primary mb-6">Suggested Outreach Script</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-xl text-sm text-primary whitespace-pre-line font-mono">
                    {getOutreachScript()}
                  </div>
                  <Button className="w-full h-12 bg-card border border-black text-primary hover:bg-gray-50 font-normal rounded-none">
                    Copy Script
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* SEO Opportunity Score */}
            {lead.localSEOScore && (
              <Card className="border-0 shadow-none bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                      <Award className="h-4 w-4 text-green-600" />
                    </div>
                    <h3 className="text-xl font-normal text-primary">SEO Opportunity</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div
                        className={`text-3xl font-medium mb-2 ${
                          lead.localSEOScore.overallScore >= 70
                            ? "text-green-600"
                            : lead.localSEOScore.overallScore >= 40
                              ? "text-yellow-600"
                              : "text-red-600"
                        }`}
                      >
                        {100 - lead.localSEOScore.overallScore}%
                      </div>
                      <p className="text-sm text-secondary font-normal">Improvement Potential</p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="text-sm text-primary mb-2 font-medium">Primary Opportunity:</div>
                      <div className="text-sm text-secondary font-normal">
                        {lead.localSEOScore.factors.websiteOptimization === 0
                          ? "Website Creation"
                          : lead.localSEOScore.factors.localKeywords < 50
                            ? "Local Keyword Optimization"
                            : lead.localSEOScore.factors.reviews < 60
                              ? "Review Management"
                              : "Citation Building"}
                      </div>
                    </div>

                    <Button className="w-full h-12 bg-green-100 hover:bg-green-200 text-green-800 font-normal rounded-none">
                      <Target className="mr-2 h-4 w-4" />
                      Create SEO Proposal
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
