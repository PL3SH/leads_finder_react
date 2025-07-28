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
  Map,
  SearchIcon,
  User,
  Clock,
  Briefcase,
  Brain,
  Eye,
  Chrome
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
  const getSourceIcon = (is_google_search, is_maps_search, is_local_search) => {
    // Ambos Google Maps y Google Search
    if (is_google_search && is_maps_search) {
      return (
        <div className="flex gap-1">
          <Map className="h-4 w-4" />
          <Chrome className="h-4 w-4" />
        </div>
      );
    }
    if (is_google_search) {
      return <Chrome className="h-5 w-5" />;
    }
    if (is_maps_search) {
      return <Map className="h-5 w-5" />;
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

  const getSourceLabel = (is_google_search, is_maps_search, is_local_search) => {
    if (is_google_search == true) {
      return "Google Search"
    }
    if (is_maps_search == true) {
        return "Google Maps"
    }
    if (is_local_search == true) {
      return "Local Search"
    }if(is_google_search == true && is_maps_search == true) {
      return "Google Search + Google Maps"
    }
    return "Unknown"
  }
  const zoho_insert_lead = () => {
    console.log("insert lead")
  }
  const zoho_remove_lead = () => {
    console.log("remove lead")
  }
  return (
    <div className="min-h-screen bg-main">
      <div className="max-w-10xl mx-auto px-8 py-12">
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
                                <li key={phone}><a href={`tel:${phone}`}>{phone}</a></li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                      {lead.emails.length > 0 && (
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                            <Mail className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-normal text-primary">Email</h3>
                            <ul className="text-secondary font-normal hover:text-primary">
                              {lead.emails.map((email) => (
                                <li key={email}><a href={`mailto:${email}`}>{email}</a></li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                      {lead.website && (
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                            <Globe className="h-6 w-6 text-purple-600" />
                          </div>
                          <div>

                            <a
                              href={lead.website}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button className="bg-black hover:bg-gray-800 text-white font-normal rounded-20px">
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
                              <h3 className="text-xl font-normal text-primary">Location</h3>
                              <p className="text-secondary font-normal">{lead.city}, {lead.state}, {lead.country}</p>
                          </div>
                        </div>
                      )}
                      {(lead.is_maps_search || lead.is_google_search) && (
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                            {getSourceIcon(lead.is_google_search, lead.is_maps_search, lead.is_local_search)}
                          </div>
                          <div>
                            <h3 className="text-xl font-normal text-primary">Source</h3>
                            <p className="text-secondary font-normal">{getSourceLabel(lead.is_google_search, lead.is_maps_search, lead.is_local_search)}</p>
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
                    {lead.analysis.map((analysis)=>{
                      return (
                        <ul key={analysis.id}>
                          <li>{analysis}</li>
                        </ul>
                      )
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-8">
            {/* Performance metrics  */}
            <Card className="border-0 shadow-none bg-card">
              <CardContent className="p-8">
               <p className="text-2xl font-normal text-primary mb-4">Performance metrics</p>
               <div className="flex items-center gap-4 mb-6">
               <div className="space-y-2">
               <p className="font-normal">Cumulative Layout Shift</p>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <p className="font-normal">CLS: {parseFloat(lead.metrics?.cls || 0).toFixed(2)}/1</p>
                </div>
                <p className="font-normal">First Contentful Paint</p>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <p className="font-normal">FCP: {parseFloat(lead.metrics?.fcp || 0).toFixed(2)} Sec</p>
                </div>
                <p className="font-normal">Largest Contentful Paint</p>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <p className="font-normal">LCP: {parseFloat(lead.metrics?.lcp || 0).toFixed(2)} Sec</p>
                </div>
                <p className="font-normal">Total Blocking Time</p>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <p className="font-normal">TBT: {parseFloat(lead.metrics?.tbt || 0).toFixed(2)} ms</p>
                </div>
                <p className="font-normal">Time to Interactive</p>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <p className="font-normal">TTI: {parseFloat(lead.metrics?.tti || 0).toFixed(2)} Sec</p>
                </div>
               </div>

               </div>
              </CardContent>
            </Card>

            {/* Evaluation Analysis */}
            <Card className="border-0 shadow-none bg-card">
              <CardContent className="p-8">
                <div className="mb-6">
                  <h3 className="text-xl font-normal text-primary mb-2">SEO Score</h3>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-4xl font-bold text-primary">{lead.metrics?.seo_score || 0}/100</div>
                    <div className="flex-1 bg-gray-200 h-3 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-red-500 to-yellow-500  to-green-300 to-green-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${lead.metrics?.seo_score || 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* SEO Score */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">Performance Score</span>
                    <span className="text-sm font-medium text-green-600">{lead.metrics?.performance_score || 0}/100</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full rounded-full" style={{ width: `${lead.metrics?.performance_score || 0}%` }}></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">Accessibility Score</span>
                    <span className="text-sm font-medium text-yellow-600">{lead.metrics?.accessibility_score || 0}/100</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-yellow-500 h-full rounded-full" style={{ width: `${lead.metrics?.accessibility_score || 0}%` }}></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">Best practices Score</span>
                    <span className="text-sm font-medium text-red-600">{lead.metrics?.best_practices_score || 0}/100</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-red-500 h-full rounded-full" style={{ width: `${lead.metrics?.best_practices_score || 0}%` }}></div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-xs text-secondary">
                    SEO score based on local search optimization factors. Higher scores indicate better local visibility.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-none bg-card">
              <CardContent className="p-8">
                {lead.in_zoho_crm == true ? (
                  <Button className="bg-black hover:bg-gray-800 text-white font-normal rounded-none" onClick={zoho_remove_lead}>
                    <p>Remove from Zoho</p>
                  </Button>
                ) : (
                  <Button className="bg-black hover:bg-gray-800 text-white font-normal rounded-none" onClick={zoho_insert_lead}>
                    <p>Add to Zoho</p>
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeadDetailPage
