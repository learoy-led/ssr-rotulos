import { Injectable } from '@angular/core';
import { contactDetails } from '../../data/data';
import { ContactDetails } from '../../models/data.models';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {

  private contactDetails: ContactDetails = contactDetails

 
  public insertSchema(jsonLD: object, scriptId: string): void {
    const existing = document.getElementById(scriptId);
    if (existing) {
      existing.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = scriptId;
    script.text = JSON.stringify(jsonLD);

    document.head.appendChild(script);
  }

  
  public getLocalBusinessSchema(): object {
    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://www.rotuloslearoy.com/#business",
      "name": "Rótulos Learoy",
      "image": 'https://www.rotuloslearoy.com/rotulos-learoy-logo.webp',
      "url": this.contactDetails.url,
      "telephone": '+34'+this.contactDetails.phone,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": this.contactDetails.address1,
        "addressLocality": "Madrid",
        "postalCode": "28946",
        "addressCountry": "ES"
      },
      "openingHours": "Mo-Fr 10:00-19:00, Su 10:00-19:00",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 40.27297,
        "longitude": -3.76070
      },
      "sameAs": [
        this.contactDetails.tiktok,
        this.contactDetails.instagram
      ],
        "description": "Todo tipo de rótulación y cartelería para tiendas, hoteles, oficinas, etc. Pide tu letrero luminoso o sin luz para interior o exterior."
    };
  }

  public getWebSiteSchema(): object {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://www.rotuloslearoy.com/#website",
      "url": this.contactDetails.url,
      "name": "Rótulos Learoy",
      "description": "Todo tipo de rótulación y cartelería para tiendas, hoteles, oficinas, etc. Pide tu letrero luminoso o sin luz para interior o exterior.",
      "inLanguage": "es",
      "publisher": {
        "@type": "Organization",
        "name": this.contactDetails.longName,
        "logo": {
          "@type": "ImageObject",
          "url": 'https://www.rotuloslearoy.com/rotulos-learoy-logo.webp'
        }
      },
       "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.rotuloslearoy.com/rotulos-encontrados?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
    };
  }

  public getServiceSchema(serviceName: string, serviceDescription: string, serviceSlug: string, serviceImage: string): object {
    return {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": serviceName,
  "description": serviceDescription,
  "url": `https://www.rotuloslearoy.com/${serviceSlug}`,
  "image": serviceImage,
  "provider": {
    "@type": "LocalBusiness",
    "@id": "https://www.rotuloslearoy.com/#business",
    "name": "Rótulos Learoy", 
    "address": {
    "@type": "PostalAddress",
    "streetAddress": this.contactDetails.address1,
    "addressLocality": "Madrid",
    "postalCode": "28946",
    "addressCountry": "ES"
  },
  "telephone": '+34'+this.contactDetails.phone,
  "image": 'https://www.rotuloslearoy.com/rotulos-learoy-logo.webp',
  },
   "areaServed": "España",
  "serviceType":`Fabricación de ${serviceName}`,
  "offers": {
  "@type": "Offer",
  "availability": "https://schema.org/PreOrder",
  "url": `https://www.rotuloslearoy.com/${serviceSlug}`
},
    };
  }

}

