import { Component } from '@angular/core';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.css'
})
export class JobCardComponent {
  showPopup: boolean = false;
  selectedJobDetails: any;

  jobs = [
    {
      title: 'UI UX Designer',
      company: 'Amazon',
      aboutCompany: 'Amazon is a multinational technology company that focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence. It is one of the Big Five companies in the U.S. information technology industry, along with Google, Apple, Microsoft, and Facebook.',
      location: 'Jakarta, ID',
      setting:'on-site',
      salary: '5000-8000',
      description: 'Join Amazon\'s dynamic team in Jakarta as a UI/UX Designer, where you will have the opportunity to shape the digital experiences of millions of customers worldwide. As a UI/UX Designer, you will collaborate with cross-functional teams to conceptualize and design innovative user interfaces and experiences that elevate the Amazon brand and drive user engagement. You will utilize your creativity, user-centered design principles, and technical expertise to deliver intuitive and visually appealing solutions across web and mobile platforms. This role offers a unique chance to work on challenging projects, contribute to Amazon\'s success, and grow your career in a fast-paced and inclusive environment.',
      type: 'Full-time',
      date: '3 July 2023',
      imageUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Ffreebiesupply.com%2Flogos%2Famazon-dark-logo%2F&psig=AOvVaw1VdyhlJCHOeJu-ydc-zRUF&ust=1715288247690000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIjLv-f4_oUDFQAAAAAdAAAAABAZ',
      responsibilities: [
        'Collaborate with product management and engineering teams to define and implement innovative solutions for the product direction, visuals, and experience.',
        'Execute all visual design stages from concept to final hand-off to engineering.',
        'Conceptualize original ideas that bring simplicity and user friendliness to complex design roadblocks.',
        'Create wireframes, storyboards, user flows, process flows, and site maps to effectively communicate interaction and design ideas.',
        'Present and defend designs and key milestone deliverables to peers and executive level stakeholders.',
        'Conduct user research and evaluate user feedback.',
        'Establish and promote design guidelines, best practices, and standards.',
        'Stay updated on emerging technologies and industry trends.'
    ],
    qualifications: [
        'Bachelor\'s degree in Design, Fine Arts, Computer Science, or a related field.',
        'Proven UI/UX design experience with a strong portfolio.',
        'Proficiency in design and prototyping tools such as Sketch, Adobe XD, Figma, or similar.',
        'Experience in creating wireframes, storyboards, user flows, process flows, and site maps.',
        'Ability to present your designs and sell your solutions to various stakeholders.',
        'Up-to-date with the latest UI/UX trends, techniques, and technologies.',
        'Excellent visual design skills with sensitivity to user-system interaction.',
        'Ability to solve problems creatively and effectively.',
        'Experience working in an Agile/Scrum development process is a plus.',
        'Excellent communication, interpersonal, and collaboration skills.'
    ],
      benefits: 'Benefits of UI UX Designer...',
      howToApply: 'How to apply for UI UX Designer...'
    }
    
  ];

  constructor() { }

  showJobDetails(job: any) {
    this.selectedJobDetails = job;
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }
}
