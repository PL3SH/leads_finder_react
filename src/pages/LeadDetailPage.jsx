"use client"

import { useState , useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Textarea } from "@/components/ui/Textarea"
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  Star,
  ArrowLeft,
  Download,
  MessageSquare,
  Map,
  SearchIcon,
  Lightbulb,
  User,
  Clock,
  Briefcase,
  Brain
} from "lucide-react"
import {  leadTypes } from "@/lib/data"
import { getLeadsDetails } from "@/services/get_leads"

const LeadDetailPage = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [notes, setNotes] = useState("")
  const [lead, setLead] = useState(null)
  {/* reemplazar data del mock(lead) con leadsDeatils*/ }
  useEffect(() => {
    getLeadsDetails(params.id).then(setLead)
  }, [])
  console.log(lead)
  if (!lead) {
    return (
      <div className="min-h-screen bg-main">
        <div className="max-w-4xl mx-auto px-8 py-12 text-center">
          <h1 className="text-3xl font-normal text-primary mb-6">Lead Not Found</h1>
          <p className="text-lg text-secondary font-normal mb-8">
            The lead you're looking for doesn't exist or may have been removed.
          </p>
          <Button
            onClick={() => navigate(-1)}
            className="bg-black hover:bg-gray-800 text-white font-normal rounded-none"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    )
  }
  const leadTypeInfo = leadTypes.find((lt) => lt.id === lead.qualitative) || leadTypes[0]
  const getOutreachScript = () => {
    switch (lead.leadType) {
      case "alto":
        return `Hi ${lead.businessName} team,\n\nI noticed you don't currently have a website, but you have great contact information available. In today's digital world, having a professional website can significantly boost your visibility and customer reach.\n\nI'd love to discuss how we can help you establish a strong online presence. Would you be interested in a brief conversation about your digital marketing needs?\n\nBest regards,`
      case "medio":
        return `Hi ${lead.businessName} team,\n\nYour website shows good potential, and I see opportunities to take it to the next level. We specialize in helping businesses like yours improve their online performance and customer engagement.\n\nWould you be interested in learning about some strategies that could boost your online results?\n\nBest regards,`
      case "bajo":
        return `Hello ${lead.businessName},\n\nI was impressed by your professional website! It's clear you understand the importance of a strong online presence. I'd love to discuss some advanced strategies that could help you maximize your digital marketing ROI.\n\nWould you be open to exploring some cutting-edge approaches to online growth?\n\nBest regards,`
      default:
        return `Hi ${lead.businessName},\n\nI'd love to learn more about your business and discuss how we might be able to help you grow your online presence.\n\nWould you be interested in a brief conversation?\n\nBest regards,`
    }
  }

  const getSourceIcon = (lead) => {
    // Si no hay lead, no mostramos nada
    if (!lead) return null;
  
    const { is_google_search, is_maps_search, is_local_search } = lead;
  
    // Ambos Google Maps y Google Search
    if (is_google_search && is_maps_search) {
      return (
        <div className="flex gap-1">
          <Map className="h-4 w-4" />
          <SearchIcon className="h-4 w-4" />
        </div>
      );
    }
  
    // Solo Google Maps
    if (is_maps_search) {
      return <Map className="h-5 w-5" />;
    }
  
    // Solo Google Search
    if (is_google_search) {
      return <SearchIcon className="h-5 w-5" />;
    }
  
    // Solo Local Search (si quieres mostrar algo especial)
    if (is_local_search) {
      // Puedes usar otro icono, por ejemplo Briefcase, o un Badge
      return <Briefcase className="h-5 w-5" />;
      // O simplemente: return <span>Local</span>;
    }
  
    // Si ninguno es true
    return null;
  };

  const getSourceLabel = (source) => {
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
            onClick={() => navigate(-1)}
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
                <span className="text-2xl font-medium text-primary">{lead.score || "NA"}</span>
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
                     {lead.snippet || "No description available"}
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      {lead.phones && (
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                            <Phone className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-normal text-primary">Phone</h3>
                            <ul className="text-secondary font-normal hover:text-primary">
                              {lead.phones.map((phone) => (
                                <li key={phone}>{phone}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                      {lead.emails && (
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                            <Mail className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-normal text-primary">Email</h3>
                            <p className="text-secondary font-normal">{lead.emails}</p>
                          </div>
                        </div>
                      )}
                      {lead.website && (
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                            <Globe className="h-6 w-6 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-normal text-primary">Website</h3>
                            <a
                              href={lead.website}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button className="bg-black hover:bg-gray-800 text-white font-normal rounded-20px">
                                <Globe className="mr-2 h-4 w-4 text-purple-600" />
                                Visit Website
                              </Button>
                            </a>
                          </div>
                        </div>
                      )}
                      {lead.address && (
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                            <MapPin className="h-6 w-6 text-red-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-normal text-primary">Address</h3>
                            <p className="text-secondary font-normal">{lead.address}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="space-y-6">
                    {lead.city && (
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                            <MapPin className="h-6 w-6 text-red-600" />
                          </div>
                          <div>
                              <h3 className="text-xl font-normal text-primary">Country</h3>
                              <p className="text-secondary font-normal">{lead.country}</p>
                              <h3 className="text-xl font-normal text-primary">State</h3>
                              <p className="text-secondary font-normal">{lead.state}</p>
                              <h3 className="text-xl font-normal text-primary">City</h3>
                            <p className="text-secondary font-normal">{lead.city}</p>
                          </div>
                        </div>
                      )}
                      {lead.source && (
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                            {getSourceIcon(lead.source)}
                          </div>
                          <div>
                            <h3 className="text-xl font-normal text-primary">Source</h3>
                            <p className="text-secondary font-normal">{getSourceLabel(lead.source)}</p>
                          </div>
                        </div>
                      )}
                      {lead.category && (
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                            <Briefcase className="h-6 w-6 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-normal text-primary">Industry</h3>
                            <p className="text-secondary font-normal">{lead.category}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Lead Analysis */}
            <Card className="border-0 shadow-none bg-card">
              <CardContent className="p-8">
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100">
                      <Brain className="h-5 w-5 text-rose-600" />
                    </div>
                    <h2 className="text-2xl font-normal text-primary">Lead Analisys</h2>
                  </div>
                  <p className="text-secondary font-normal">
                    {lead.evaluation_analysis || "No analysis available for this lead."}
                  </p>
                </div>
              </CardContent>
            </Card>
            {/* Outreach Script */}
            <Card className="border-0 shadow-none bg-card">
              <CardContent className="p-8">
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                      <MessageSquare className="h-5 w-5 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-normal text-primary">Outreach Script</h2>
                  </div>
                  <p className="text-secondary font-normal">
                    A suggested script for reaching out to {lead.businessName}
                  </p>
                </div>
                <Textarea
                  value={getOutreachScript()}
                  readOnly
                  className="bg-gray-50 text-primary font-normal rounded-none"
                />
              </CardContent>
            </Card>
          </div>

          {/* Additional Information */}
          <div className="space-y-8">
            {/* Notes */}
            <Card className="border-0 shadow-none bg-card">
              <CardContent className="p-8">
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
                      <Lightbulb className="h-5 w-5 text-yellow-600" />
                    </div>
                    <h2 className="text-2xl font-normal text-primary">Notes</h2>
                  </div>
                  <p className="text-secondary font-normal">Add any additional notes or comments about this lead.</p>
                </div>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="bg-gray-50 text-primary font-normal rounded-none"
                />
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="border-0 shadow-none bg-card">
              <CardContent className="p-8">
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                      <Download className="h-5 w-5 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-normal text-primary">Actions</h2>
                  </div>
                  <p className="text-secondary font-normal">
                    Take action on this lead by downloading the outreach script or scheduling a follow-up.
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Button className="bg-black hover:bg-gray-800 text-white font-normal rounded-none">
                    <Download className="mr-2 h-4 w-4" />
                    Download Script
                  </Button>
                  <Button className="bg-black hover:bg-gray-800 text-white font-normal rounded-none">
                    <Clock className="mr-2 h-4 w-4" />
                    Schedule Follow-up
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeadDetailPage
