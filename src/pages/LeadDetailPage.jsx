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
        <div className="max-w-4xl mx-auto p-macos-lg text-center">
          <h1 className="text-largetitle macos-text-primary mb-macos-md">Lead Not Found</h1>
          <p className="text-body macos-text-secondary mb-macos-lg">
            The lead you're looking for doesn't exist or may have been removed.
          </p>
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
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
  return (
    <div className="min-h-screen bg-main relative overflow-hidden">
      {/* Background Floating Elements */}
      <div className="floating-element-1"></div>
      <div className="floating-element-2"></div>
      <div className="floating-element-3"></div>
      <div className="geo-shape-1"></div>
      <div className="geo-shape-2"></div>
      
      {/* Floating Particles */}
      <div className="floating-particles">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
        <div className="particle particle-6"></div>
        <div className="particle particle-7"></div>
        <div className="particle particle-8"></div>
        <div className="particle particle-9"></div>
      </div>
      
      <div className="max-w-7xl mx-auto p-macos-lg relative depth-neutral">
        {/* Header */}
        <div className="mb-macos-2xl">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="mb-macos-lg"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Results
          </Button>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-largetitle glass-text-primary mb-macos-sm ultra-sharp relative depth-top">{lead.businessName}</h1>
              <p className="text-title3 glass-text-secondary ultra-sharp">{lead.category}</p>
            </div>
            <div className="flex items-center gap-macos-sm">
              <Badge className={`${leadTypeInfo.color} px-macos-sm py-macos-xs text-footnote rounded-2xl backdrop-filter backdrop-blur-md border border-white/20`}>
                {leadTypeInfo.label}
              </Badge>
              <div className="flex items-center gap-2 glass-bg-accent px-macos-sm py-macos-xs rounded-2xl border glass-border backdrop-filter backdrop-blur-md">
                <Star className="h-5 w-5" style={{color: 'var(--glass-orange)'}} />
                <span className="text-title3 glass-text-primary">{lead.score || "NA"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-macos-lg relative depth-front">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-macos-lg relative depth-mid-front">
            {/* Business Information */}
            <Card className="card-glass backdrop-blur-4xl glass-shadow-strong relative depth-front">
              <CardContent className="p-macos-lg">
                <div className="mb-macos-lg">
                  <div className="flex items-center gap-macos-sm mb-macos-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full glass-icon-container glass-bg-accent backdrop-blur-4xl border glass-border glass-shadow-medium">
                      <User className="h-5 w-5 glass-text-secondary" />
                    </div>
                    <h2 className="text-title2 glass-text-primary ultra-sharp">Business Information</h2>
                  </div>
                  <p className="text-body glass-text-secondary">
                     {lead.snippet || "No description available"}
                  </p>
                </div>

                <div className="space-y-macos-md">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-macos-lg">
                    <div className="space-y-macos-md">
                      {lead.phones && (
                        <div className="flex items-center gap-macos-sm">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full glass-icon-container glass-bg-accent backdrop-blur-4xl border glass-border glass-shadow-light">
                            <Phone className="h-5 w-5 glass-text-secondary" />
                          </div>
                          <div>
                            <h3 className="text-headline glass-text-primary">Phone</h3>
                            <ul className="text-body glass-text-secondary">
                              {lead.phones.map((phone) => (
                                <li key={phone}><a className="hover:underline transition-all duration-200">{phone}</a></li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                      {lead.emails.length > 0 && (
                        <div className="flex items-center gap-macos-sm">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full glass-icon-container glass-bg-accent backdrop-blur-4xl border glass-border glass-shadow-light">
                            <Mail className="h-5 w-5 glass-text-secondary" />
                          </div>
                          <div>
                            <h3 className="text-headline glass-text-primary">Email</h3>
                            <ul className="text-body glass-text-secondary">
                              {lead.emails.map((email) => (
                                <li key={email}><a href={`mailto:${email}`} className="hover:underline transition-all duration-200" style={{color: 'var(--glass-blue)'}}>{email}</a></li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                      {lead.website && (
                        <div className="flex items-center gap-macos-sm">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full glass-icon-container glass-bg-accent backdrop-blur-4xl border glass-border glass-shadow-light">
                            <Globe className="h-5 w-5 glass-text-secondary" />
                          </div>
                          <div>
                            <h3 className="text-headline glass-text-primary mb-2">Website</h3>
                            <a
                              href={lead.website}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button size="sm" className="glass-glow hover:glass-glow">
                                Visit Website
                              </Button>
                            </a>
                          </div>
                        </div>
                      )}
                      {lead.address && (
                        <div className="flex items-center gap-macos-sm">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full glass-bg-accent backdrop-filter backdrop-blur-md border glass-border">
                            <MapPin className="h-5 w-5 glass-text-secondary" />
                          </div>
                          <div>
                            <h3 className="text-headline glass-text-primary">Address</h3>
                            <p className="text-body glass-text-secondary">{lead.address}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="space-y-macos-md">
                    {lead.city && (
                        <div className="flex items-center gap-macos-sm">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full glass-bg-accent backdrop-filter backdrop-blur-md border glass-border">
                            <MapPin className="h-5 w-5 glass-text-secondary" />
                          </div>
                          <div>
                              <h3 className="text-headline glass-text-primary">Location</h3>
                              <p className="text-body glass-text-secondary">{lead.city}, {lead.state}, {lead.country}</p>
                          </div>
                        </div>
                      )}
                      {(lead.is_maps_search || lead.is_google_search) && (
                        <div className="flex items-center gap-macos-sm">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full glass-bg-accent backdrop-filter backdrop-blur-md border glass-border">
                            <div className="glass-text-secondary">{getSourceIcon(lead.is_google_search, lead.is_maps_search, lead.is_local_search)}</div>
                          </div>
                          <div>
                            <h3 className="text-headline glass-text-primary">Source</h3>
                            <p className="text-body glass-text-secondary">{getSourceLabel(lead.is_google_search, lead.is_maps_search, lead.is_local_search)}</p>
                          </div>
                        </div>
                      )}
                      {lead.category && (
                        <div className="flex items-center gap-macos-sm">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full glass-bg-accent backdrop-filter backdrop-blur-md border glass-border">
                            <Briefcase className="h-5 w-5 glass-text-secondary" />
                          </div>
                          <div>
                            <h3 className="text-headline glass-text-primary">Industry</h3>
                            <p className="text-body glass-text-secondary">{lead.category}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Lead Analysis */}
            <Card className="card-glass backdrop-blur-4xl glass-shadow-strong relative depth-front">
              <CardContent className="p-macos-lg">
                <div className="mb-macos-lg">
                  <div className="flex items-center gap-macos-sm mb-macos-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full glass-icon-container glass-bg-accent backdrop-blur-4xl border glass-border glass-shadow-medium">
                      <Brain className="h-5 w-5 glass-text-secondary" />
                    </div>
                    <h2 className="text-title2 glass-text-primary ultra-sharp">Lead Analysis</h2>
                  </div>
                  <div className="text-body glass-text-secondary">
                    {lead.analysis.map((analysis, index)=>{
                      return (
                        <ul key={index} className="list-disc list-inside space-y-1">
                          <li>{analysis}</li>
                        </ul>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-macos-lg relative depth-mid-front">
            {/* Performance metrics  */}
            <Card className="card-glass backdrop-blur-5xl glass-shadow-strong relative depth-far-front">
              <CardContent className="p-macos-lg">
               <h3 className="text-title2 glass-text-primary mb-macos-sm ultra-sharp">Performance Metrics</h3>
               <div className="space-y-macos-sm">
                <div className="flex items-center justify-between py-3 border-b glass-border backdrop-blur-xl">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 glass-text-secondary" />
                    <span className="text-subheadline glass-text-secondary">Cumulative Layout Shift</span>
                  </div>
                  <span className="text-callout glass-text-primary font-medium">{parseFloat(lead.metrics?.cls || 0).toFixed(2)}/1</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b glass-border backdrop-blur-xl">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 glass-text-secondary" />
                    <span className="text-subheadline glass-text-secondary">First Contentful Paint</span>
                  </div>
                  <span className="text-callout glass-text-primary font-medium">{parseFloat(lead.metrics?.fcp || 0).toFixed(2)}s</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b glass-border backdrop-blur-xl">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 glass-text-secondary" />
                    <span className="text-subheadline glass-text-secondary">Largest Contentful Paint</span>
                  </div>
                  <span className="text-callout glass-text-primary font-medium">{parseFloat(lead.metrics?.lcp || 0).toFixed(2)}s</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b glass-border backdrop-blur-xl">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 glass-text-secondary" />
                    <span className="text-subheadline glass-text-secondary">Total Blocking Time</span>
                  </div>
                  <span className="text-callout glass-text-primary font-medium">{parseFloat(lead.metrics?.tbt || 0).toFixed(2)}ms</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 glass-text-secondary" />
                    <span className="text-subheadline glass-text-secondary">Time to Interactive</span>
                  </div>
                  <span className="text-callout glass-text-primary font-medium">{parseFloat(lead.metrics?.tti || 0).toFixed(2)}s</span>
                </div>
               </div>
              </CardContent>
            </Card>

            {/* Evaluation Analysis */}
            <Card className="card-glass backdrop-blur-5xl glass-shadow-strong relative depth-far-front glass-glow">
              <CardContent className="p-macos-lg">
                <div className="mb-macos-md">
                  <h3 className="text-title2 glass-text-primary mb-macos-sm ultra-sharp">SEO Score</h3>
                  <div className="flex items-center gap-macos-sm mb-macos-md">
                    <div className="text-largetitle glass-text-primary font-bold">{lead.metrics?.seo_score || 0}<span className="text-title3 glass-text-secondary">/100</span></div>
                    <div className="flex-1 glass-bg-secondary backdrop-blur-xl" style={{height: '8px', borderRadius: '12px', overflow: 'hidden'}}>
                      <div 
                        className="h-full rounded-xl transition-all duration-500 ease-out backdrop-filter backdrop-blur-md"
                        style={{ 
                          background: lead.metrics?.seo_score >= 80 ? 'linear-gradient(90deg, var(--glass-green), rgba(34, 197, 94, 0.8))' : lead.metrics?.seo_score >= 60 ? 'linear-gradient(90deg, var(--glass-orange), rgba(249, 115, 22, 0.8))' : 'linear-gradient(90deg, var(--glass-red), rgba(239, 68, 68, 0.8))',
                          width: `${lead.metrics?.seo_score || 0}%`,
                          boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)'
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-macos-sm">
                  <div className="flex items-center justify-between py-3 border-b glass-border backdrop-blur-xl">
                    <span className="text-subheadline glass-text-secondary">Performance Score</span>
                    <span className="text-callout glass-text-primary font-medium">{lead.metrics?.performance_score || 0}/100</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b glass-border backdrop-blur-xl">
                    <span className="text-subheadline glass-text-secondary">Accessibility Score</span>
                    <span className="text-callout glass-text-primary font-medium">{lead.metrics?.accessibility_score || 0}/100</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-subheadline glass-text-secondary">Best Practices Score</span>
                    <span className="text-callout glass-text-primary font-medium">{lead.metrics?.best_practices_score || 0}/100</span>
                  </div>
                </div>

                <div className="mt-macos-md pt-macos-sm border-t glass-border backdrop-blur-xl">
                  <p className="text-footnote glass-text-tertiary">
                    SEO score based on local search optimization factors. Higher scores indicate better local visibility.
                  </p>
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
