"use client"

import { useState } from "react"
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
  Users,
} from "lucide-react"
import { mockLeads, leadTypes } from "@/lib/data"

const LeadDetailPage = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [notes, setNotes] = useState("")

  const lead = mockLeads.find((l) => l.id === params.id)

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

  const getSourceIcon = (source) => {
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
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                            <Phone className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-normal text-primary">Phone</h3>
                            <p className="text-secondary font-normal">{lead.phone}</p>
                          </div>
                        </div>
                      )}
                      {lead.email && (
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                            <Mail className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-normal text-primary">Email</h3>
                            <p className="text-secondary font-normal">{lead.email}</p>
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
                            <p className="text-secondary font-normal">{lead.website}</p>
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
                      {lead.industry && (
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                            <Briefcase className="h-6 w-6 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-normal text-primary">Industry</h3>
                            <p className="text-secondary font-normal">{lead.industry}</p>
                          </div>
                        </div>
                      )}
                      {lead.employeeCount && (
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100">
                            <Users className="h-6 w-6 text-pink-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-normal text-primary">Employee Count</h3>
                            <p className="text-secondary font-normal">{lead.employeeCount}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
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
