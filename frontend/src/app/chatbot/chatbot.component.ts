import {
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

import { ChatbotService } from '../services/chatbot.service';
import { Message } from './message';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})

export class ChatbotComponent {

  @ViewChild('chatBody')
  chatBody!: ElementRef;

  isOpen = false;
  isTyping = false;

  userMessage = '';

  currentStep = 0;

  selectedOption = '';

  lead = {

    // Common

    first_name: '',
    last_name: '',
    email: '',
    phone: '',

    // Contact

    company: '',
    requirement: '',

    // Career

    position: '',
    experience: '',
    location: '',

    // Internship

    college: '',
    department: '',
    year: '',
    skills: '',

    // Freelance

    project_name: '',
    description: '',
    budget: '',
    delivery_date: ''

  };

  messages: Message[] = [

    {

      sender: 'bot',

     text: `👋 Welcome to MPS Software Solutions

Thank you for visiting us.

I'm MPS AI Assistant, your virtual assistant. I'm here to help you with your business, career, and service-related enquiries.

Please choose one of the following options to continue:

1️⃣ Contact Us
2️⃣ Career Opportunities
3️⃣ Internship Applications
4️⃣ Freelance Project Enquiry

💬 Simply type the option number (1-4) or the service name to get started.`,

      time: this.getCurrentTime()

    }

  ];

  constructor(
    private chatbotService: ChatbotService
  ) {

  }

  // ==========================================
  // TOGGLE CHAT
  // ==========================================

  toggleChat() {

    this.isOpen = !this.isOpen;

    setTimeout(() => {

      this.scrollToBottom();

    },100);

  }  // ==========================================
  // GET CURRENT TIME
  // ==========================================

  getCurrentTime(): string {

    return new Date().toLocaleTimeString([], {

      hour: '2-digit',

      minute: '2-digit'

    });

  }

  // ==========================================
  // AUTO SCROLL
  // ==========================================

  scrollToBottom() {

    try {

      setTimeout(() => {

        if (this.chatBody) {

          this.chatBody.nativeElement.scrollTop =
            this.chatBody.nativeElement.scrollHeight;

        }

      }, 100);

    }

    catch (error) {

      console.log(error);

    }

  }

  // ==========================================
  // BOT REPLY
  // ==========================================

  botReply(message: string) {

    this.isTyping = true;

    this.scrollToBottom();

    setTimeout(() => {

      this.isTyping = false;

      this.messages.push({

        sender: 'bot',

        text: message,

        time: this.getCurrentTime()

      });

      this.scrollToBottom();

    }, 800);

  }

  // ==========================================
  // RESET CHAT
  // ==========================================

  resetChat() {

    this.currentStep = 0;

    this.selectedOption = '';

    this.userMessage = '';

    this.lead = {

      first_name: '',
      last_name: '',
      email: '',
      phone: '',

      company: '',
      requirement: '',

      position: '',
      experience: '',
      location: '',

      college: '',
      department: '',
      year: '',
      skills: '',

      project_name: '',
      description: '',
      budget: '',
      delivery_date: ''

    };
        this.messages = [
      {
        sender: 'bot',
        text:
`👋 Welcome to MPS Software Solutions

I'm MPS AI Assistant.

Please choose one option.
`,
        time: this.getCurrentTime()
      }
    ];

    this.scrollToBottom();

  }

  // ==========================================
  // SEND MESSAGE
  // ==========================================

  sendMessage() {

    if (!this.userMessage.trim()) {
      return;
    }

    const text = this.userMessage.trim();

    this.messages.push({

      sender: 'user',

      text: text,

      time: this.getCurrentTime()

    });

    this.userMessage = '';

    this.scrollToBottom();

    switch (this.currentStep) {

      // ===============================
      // STEP 0
      // ===============================

      case 0:

        this.selectedOption = text.toLowerCase();

        if (this.selectedOption === '1' || this.selectedOption === 'contact') {

          this.selectedOption = 'contact';

        }

        else if (this.selectedOption === '2' || this.selectedOption === 'career') {

          this.selectedOption = 'career';

        }

        else if (this.selectedOption === '3' || this.selectedOption === 'internship') {

          this.selectedOption = 'internship';

        }

        else if (
          this.selectedOption === '4' ||
          this.selectedOption === 'freelance' ||
          this.selectedOption === 'freelance project'
        ) {

          this.selectedOption = 'freelance';

        }

        else {

          this.botReply(`Please choose only:

1️⃣ Contact

2️⃣ Career

3️⃣ Internship

4️⃣ Freelance Project`);

          return;

        }

        this.currentStep = 1;

        this.botReply('Please enter your First Name.');

      break;
            // ===================================
      // STEP 1
      // FIRST NAME
      // ===================================

      case 1:

        this.lead.first_name = text;

        this.currentStep = 2;

        this.botReply('Please enter your Last Name.');

      break;

      // ===================================
      // STEP 2
      // LAST NAME
      // ===================================

      case 2:

        this.lead.last_name = text;

        this.currentStep = 3;

        this.botReply('Please enter your Email Address.');

      break;

      // ===================================
      // STEP 3
      // EMAIL
      // ===================================

      case 3:

        if (!this.validateEmail(text)) {

          this.botReply('❌ Please enter a valid Email Address.');

          return;

        }

        this.lead.email = text;

        this.currentStep = 4;

        this.botReply('Please enter your Mobile Number.');

      break;

      // ===================================
      // STEP 4
      // PHONE
      // ===================================

      case 4:

        if (!this.validatePhone(text)) {

          this.botReply('❌ Please enter a valid Mobile Number.');

          return;

        }

        this.lead.phone = text;

        if (this.selectedOption === 'contact') {

          this.currentStep = 10;

          this.botReply('Please enter your Company Name.');

        }

        else if (this.selectedOption === 'career') {

          this.currentStep = 20;

          this.botReply('Which Position are you applying for?');

        }

        else if (this.selectedOption === 'internship') {

          this.currentStep = 30;

          this.botReply('Please enter your College Name.');

        }

        else {

          this.currentStep = 40;

          this.botReply('Please enter your Project Name.');

        }

      break;

      // ===================================
      // CONTACT
      // ===================================

      case 10:

        this.lead.company = text;

        this.currentStep = 11;

        this.botReply('Please describe your Requirement.');

      break;
            // ===================================
      // STEP 11
      // CONTACT REQUIREMENT
      // ===================================

      case 11:

        this.lead.requirement = text;

        this.saveContact();

        this.botReply(

`✅ Thank you ${this.lead.first_name}!

Your Contact Inquiry has been submitted successfully.

Our Business Team will contact you shortly.

Have a great day 😊`

        );

        this.currentStep = 999;

      break;

      // ===================================
      // CAREER
      // ===================================

      case 20:

        this.lead.position = text;

        this.currentStep = 21;

        this.botReply(
          'How many years of experience do you have? (Type Fresher if applicable)'
        );

      break;

      // ===================================
      // STEP 21
      // EXPERIENCE
      // ===================================

      case 21:

        this.lead.experience = text;

        this.currentStep = 22;

        this.botReply(
          'Preferred Job Location?'
        );

      break;

      // ===================================
      // STEP 22
      // LOCATION
      // ===================================

      case 22:

        this.lead.location = text;

        this.saveCareer();

        this.botReply(

`✅ Thank you ${this.lead.first_name}!

Your Career Application has been submitted successfully.

Our HR Team will review your profile.

If your profile matches our requirements, we will contact you soon.

Thank you for applying to MPS Software Solutions.`

        );

        this.currentStep = 999;

      break;

      // ===================================
      // INTERNSHIP
      // ===================================

      case 30:

        this.lead.college = text;

        this.currentStep = 31;

        this.botReply(
          'Please enter your Department.'
        );

      break;
            // ===================================
      // STEP 31
      // DEPARTMENT
      // ===================================

      case 31:

        this.lead.department = text;

        this.currentStep = 32;

        this.botReply(
          'Current Year / Passed Out Year?'
        );

      break;

      // ===================================
      // STEP 32
      // YEAR
      // ===================================

      case 32:

        this.lead.year = text;

        this.currentStep = 33;

        this.botReply(
          'Please enter your Skills.'
        );

      break;

      // ===================================
      // STEP 33
      // SKILLS
      // ===================================

      case 33:

        this.lead.skills = text;

        this.saveInternship();

        this.botReply(

`✅ Thank you ${this.lead.first_name}!

Your Internship Application has been submitted successfully.

Our Internship Team will review your profile.

We will contact you shortly.

Thank you.`

        );

        this.currentStep = 999;

      break;

      // ===================================
      // FREELANCE
      // ===================================

      case 40:

        this.lead.project_name = text;

        this.currentStep = 41;

        this.botReply(
          'Please describe your Project.'
        );

      break;

      // ===================================
      // STEP 41
      // DESCRIPTION
      // ===================================

      case 41:

        this.lead.description = text;

        this.currentStep = 42;

        this.botReply(
          'Estimated Budget?'
        );

      break;
            // ===================================
      // STEP 42
      // BUDGET
      // ===================================

      case 42:

        this.lead.budget = text;

        this.currentStep = 43;

        this.botReply(
          'Expected Delivery Date? (DD/MM/YYYY)'
        );

      break;

      // ===================================
      // STEP 43
      // DELIVERY DATE
      // ===================================

      case 43:

        this.lead.delivery_date = text;

        this.saveFreelance();

        this.botReply(

`✅ Thank you ${this.lead.first_name}!

Your Freelance Project Request has been submitted successfully.

Our Business Team will contact you shortly.

Have a great day 😊`

        );

        this.currentStep = 999;

      break;

      // ===================================
      // CHAT FINISHED
      // ===================================

      case 999:

        this.botReply(

`If you would like to start a new conversation,

Please click the Refresh button.

Thank you 😊`

        );

      break;

      // ===================================
      // DEFAULT
      // ===================================

      default:

        this.botReply(
          'Something went wrong. Please try again.'
        );

      break;

    }

  }

  // ===================================
  // SAVE METHODS START BELOW
  // ===================================
    // ==========================================
  // SAVE CONTACT
  // ==========================================
   saveContact() {

  const data = {

    full_name: this.lead.first_name + ' ' + this.lead.last_name,

    email: this.lead.email,

    phone: this.lead.phone,

    company: this.lead.company,

    service_interest: "Contact",

    budget_range: "",

    message: this.lead.requirement

  };

  this.chatbotService.saveContact(data).subscribe({

    next: (response:any) => {

      console.log("✅ Contact Saved");
      console.log(response);

    },

    error:(error:any)=>{

      console.log(error.error);

    }

  });

}

  // ==========================================
  // SAVE CAREER
  // ==========================================

  saveCareer() {

    const data = {

      full_name: this.lead.first_name + ' ' + this.lead.last_name,

      email: this.lead.email,

      phone: this.lead.phone,

      location: this.lead.location,

      role: this.lead.position,

      experience: this.lead.experience,

      work_type: 'Full Time',

      notice_period: 'Immediate',

      portfolio_url: '',

      about: '',

      agreed: true

    };

    this.chatbotService.saveCareer(data).subscribe({

      next: (response: any) => {

        console.log('✅ Career Saved');

        console.log(response);

      },

      error: (error: any) => {

        console.error('❌ Career Error');

        console.error(error);

      }

    });

  }
  // ==========================================
// SAVE INTERNSHIP
// ==========================================

saveInternship() {

  const data = {

    full_name: this.lead.first_name + ' ' + this.lead.last_name,

    email: this.lead.email,

    phone: this.lead.phone,

    college: this.lead.college,

    department: this.lead.department,

    year_of_study: this.lead.year,

    duration: "1 Month",

    start_date: new Date().toISOString().split('T')[0],

    message: this.lead.skills

  };

  console.log(data);

  this.chatbotService.saveInternship(data).subscribe({

    next: (response: any) => {

      console.log("✅ Internship Saved");

      console.log(response);

    },

    error: (error: any) => {

      console.error("❌ Internship Error");

      console.log(error.error);

    }

  });

}

  // ==========================================
  // SAVE FREELANCE
  // ==========================================

  saveFreelance() {

    const data = {

      first_name: this.lead.first_name,

      last_name: this.lead.last_name,

      email: this.lead.email,

      phone: this.lead.phone,

      project_name: this.lead.project_name,

      description: this.lead.description,

      budget: this.lead.budget,

      delivery_date: this.lead.delivery_date

    };

    this.chatbotService.saveFreelance(data).subscribe({

      next: (response: any) => {

        console.log('✅ Freelance Saved');

        console.log(response);

      },

      error: (error: any) => {

        console.error('❌ Freelance Error');

        console.error(error);

      }

    });

  }

  // ==========================================
  // EMAIL VALIDATION
  // ==========================================

  validateEmail(email: string): boolean {

    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);

  }

  // ==========================================
  // PHONE VALIDATION
  // ==========================================

  validatePhone(phone: string): boolean {

    const pattern = /^[0-9]{10}$/;

    return pattern.test(phone);

  }

}