import { Component,Input } from '@angular/core';
import { on } from 'events';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  allJobs: any[] = [
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
    },
    {
      "title": "Frontend Developer",
      "company": "Google",
      "aboutCompany": "Google is a multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, a search engine, cloud computing, software, and hardware.",
      "location": "Mountain View, CA",
      "setting": "Remote",
      "salary": "6000-10000",
      "description": "Join Google's innovative team as a Frontend Developer, where you will work on cutting-edge web applications that reach millions of users worldwide. As a Frontend Developer, you will collaborate with designers and backend engineers to implement elegant and responsive user interfaces using modern web technologies. You will have the opportunity to contribute to open-source projects, experiment with new frameworks, and shape the future of web development. This role offers competitive compensation, flexible work arrangements, and the chance to make a meaningful impact in the tech industry.",
      "type": "Full-time",
      "date": "10 August 2023",
      "imageUrl": "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffreebiesupply.com%2Flogos%2Fgoogle-gmail-logo%2F&psig=AOvVaw0gcZQuI41PcANn9OWCV64E&ust=1715289771336000&source=images&cd=vfe&ved=0CBIQjRxqFwoTCKiV6cH7_oUDFQAAAAAdAAAAABAD",
      "responsibilities": [
          "Develop user-facing features using Angular, React, or Vue.js.",
          "Collaborate with backend developers to design APIs and integrate with server-side logic.",
          "Optimize web applications for maximum speed and scalability.",
          "Implement responsive designs that work seamlessly across different devices and screen sizes.",
          "Write clean, maintainable, and well-documented code.",
          "Contribute to code reviews and provide constructive feedback to peers.",
          "Stay up-to-date with the latest frontend technologies and best practices.",
          "Participate in sprint planning, daily stand-ups, and retrospectives."
      ],
      "qualifications": [
          "Bachelor's degree in Computer Science, Engineering, or a related field.",
          "Proven experience as a frontend developer with a strong portfolio.",
          "Proficiency in HTML, CSS, JavaScript, and modern frontend frameworks (Angular, React, Vue.js).",
          "Experience with version control systems such as Git.",
          "Familiarity with UI/UX design principles and best practices.",
          "Excellent problem-solving and debugging skills.",
          "Ability to work independently and in a team environment.",
          "Strong communication and collaboration skills."
      ],
      "benefits": "Benefits of Frontend Developer...",
      "howToApply": "How to apply for Frontend Developer..."
  },
  {
      "title": "Data Scientist",
      "company": "Microsoft",
      "aboutCompany": "Microsoft is a multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
      "location": "Redmond, WA",
      "setting": "Hybrid",
      "salary": "7000-12000",
      "description": "Join Microsoft's dynamic team as a Data Scientist, where you will work on cutting-edge projects that leverage data to drive business insights and innovation. As a Data Scientist, you will analyze large datasets, develop machine learning models, and generate actionable insights to solve complex business problems. You will collaborate with cross-functional teams to identify opportunities for data-driven decision-making and drive the adoption of data science best practices across the organization. This role offers competitive compensation, flexible work arrangements, and the opportunity to work on high-impact projects that shape the future of technology.",
      "type": "Full-time",
      "date": "15 September 2023",
      "imageUrl": "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffreebiesupply.com%2Flogos%2Fmicrosoft-logo%2F&psig=AOvVaw0xU38nZWL_nIgBJdLYr3Nm&ust=1715290579121000&source=images&cd=vfe&ved=0CBIQjRxqFwoTCKiMm7D8_oUDFQAAAAAdAAAAABAE",
      "responsibilities": [
          "Develop predictive models and algorithms to solve business problems.",
          "Analyze large datasets to extract actionable insights and trends.",
          "Build and deploy machine learning pipelines for data preprocessing, feature engineering, model training, and evaluation.",
          "Collaborate with stakeholders to understand business requirements and translate them into analytical solutions.",
          "Communicate findings and recommendations to technical and non-technical audiences.",
          "Stay abreast of advancements in data science and machine learning techniques.",
          "Contribute to the development of data science tools and platforms.",
          "Participate in peer code reviews and provide feedback to improve code quality."
      ],
      "qualifications": [
          "Master's or Ph.D. degree in Computer Science, Statistics, Mathematics, or a related field.",
          "Proven experience as a data scientist or machine learning engineer.",
          "Proficiency in programming languages such as Python or R.",
          "Experience with machine learning libraries/frameworks (e.g., TensorFlow, PyTorch, scikit-learn).",
          "Strong understanding of statistical analysis, hypothesis testing, and experimental design.",
          "Familiarity with data visualization tools (e.g., Matplotlib, Seaborn, Tableau).",
          "Excellent problem-solving and analytical skills.",
          "Ability to work independently and in a team environment.",
          "Strong communication and collaboration skills."
      ],
      "benefits": "Benefits of Data Scientist...",
      "howToApply": "How to apply for Data Scientist..."
    }
    
  ]; // assuming this is where you store your jobs data
  filteredJobs: any[] = [];
  searchQuery: string = '';

  // constructor(private dataService: DataService) { }

  ngOnInit() {
    // Fetch data when component initializes
   
      // this.allJobs = jobs;
      this.filteredJobs = this.allJobs; // Initialize filteredJobs with allJobs
    
  }


  onSearch(query: string[]) {
    // Filter jobs based on the search query
    if (!query[0].trim() && !query[1].trim()) { 
      // If the search query is empty, show all jobs
      this.filteredJobs = this.allJobs;
    } else {
      this.filteredJobs = this.allJobs.filter(job =>
        job.title.toLowerCase().includes(query[0].toLowerCase()) &&
        (job.location.toLowerCase().includes(query[1].toLowerCase()) || job.salary.toLowerCase().includes(query[1].toLowerCase()))
      );
      
    }
 
  }

}
