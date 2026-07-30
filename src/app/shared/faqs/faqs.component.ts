import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { faqs } from '../../data/faqs';
import { Faq, Variable } from '../../models/data.models';
import { contactDetails } from '../../data/data';

@Component({
  selector: 'app-faqs',
  imports: [CommonModule],
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.css'
})
export class FaqsComponent implements OnInit {

  @Input() material!: string

  public faqs: Faq[] = faqs
  public faqsProcessed: Faq[] = []
  public contactDetails = contactDetails


get variables(): Variable {
  return {
    material: this.material,
    correo: contactDetails.email,
    telefono: contactDetails.phone
  };
}

 ngOnInit(): void { 
  
     this.faqsProcessed = faqs.map(faq => ({
        ...faq,
        question: faq.question.replace(/\{(\w+)\}/g, (_, key: keyof Variable) => this.variables[key] ?? ''),
        answear: faq.answear.replace(/\{(\w+)\}/g, (_, key: keyof Variable) => this.variables[key] ?? '')
      }));
          
    }

  }

