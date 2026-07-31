import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { faqs } from '../../data/faqs';
import { ContactDetails, Faq, Variable } from '../../models/data.models';
import { contactDetails } from '../../data/data';

@Component({
  selector: 'app-faqs',
  imports: [CommonModule],
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.css'
})
export class FaqsComponent implements OnChanges {

  @Input() material!: string

  public faqs: Faq[] = faqs
  public faqsProcessed: Faq[] = []
  public contactDetails: ContactDetails = contactDetails
  public showAnswear: boolean = false
  public openIndex: number | null = null;
  public faqIsHidden: boolean =  false

get variables(): Variable {
  return {
    material: this.material,
    correo: contactDetails.email,
    telefono: contactDetails.phone
  };
}

 ngOnChanges(): void { 

  this.faqsProcessed = this.faqs
  .filter(faq => {
    if (faq.question.includes('instala') && this.material !== 'neon') {
      return false; 
    }
    return true;
  }).map(faq => ({
        ...faq,
        question: faq.question.replace(/\{(\w+)\}/g, (_, key: keyof Variable) => this.variables[key] ?? ''),
        answear: faq.answear.replace(/\{(\w+)\}/g, (_, key: keyof Variable) => this.variables[key] ?? '')
      }));
        
    }

    public answearToggle(index: number) {
this.openIndex = this.openIndex === index ? null : index;
    }

  }

