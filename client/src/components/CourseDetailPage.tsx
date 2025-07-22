import React, { useState } from 'react';
import { ArrowLeft, Clock, Users, Award, CheckCircle, Send, User, Mail, Phone, MessageSquare, BookOpen, Target, Briefcase, Code, Palette } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '../lib/queryClient';
import Header from './Header';
import Footer from './Footer';
import WhatsAppFloat from './WhatsAppFloat';

// Define CourseApplication interface locally
interface CourseApplication {
  id?: string
  full_name: string
  email: string
  phone: string
  course_name: string
  experience_level: string
  interest_message: string
  user_id?: string
  created_at?: string
}

interface CourseData {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  highlights: string[];
  details: string[];
  fullDescription: string;
  curriculum: string[];
  prerequisites: string[];
  careerOpportunities: string[];
  icon: React.ElementType;
}

interface CourseDetailPageProps {
  courseId: string;
  onBack: () => void;
}

const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ courseId, onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    experience: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Create mutation for course application
  const createCourseApplication = useMutation({
    mutationFn: async (applicationData: Omit<CourseApplication, 'id' | 'created_at'>) => {
      return apiRequest('/api/course-applications', {
        method: 'POST',
        body: JSON.stringify(applicationData),
      });
    },
    onSuccess: () => {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', course: '', experience: '', message: '' });
      
      // Show confirmation popup
      setTimeout(() => {
        alert('Thank you! Our team will contact you shortly.');
      }, 100);
    },
    onError: (error: any) => {
      console.error('Error submitting course application:', error);
      setSubmitStatus('error');
    },
  });

  const coursesData: Record<string, CourseData> = {
    'mean-stack': {
      id: 'mean-stack',
      title: 'MEAN Stack Development',
      description: 'Complete full-stack development with MongoDB, Express.js, Angular, and Node.js.',
      duration: '2 months',
      level: 'Beginner to Advanced',
      highlights: ['HTML, CSS, JS, Bootstrap', 'React JS, Node.js', 'MongoDB'],
      details: [
        'Frontend development with HTML, CSS, JavaScript',
        'Modern frameworks: React JS and Bootstrap',
        'Backend development with Node.js',
        'Database management with MongoDB',
        'Full-stack project development'
      ],
      fullDescription: 'Our MEAN Stack Development program is designed to transform you into a complete full-stack developer. This comprehensive 2-month course covers everything from frontend technologies like HTML, CSS, and JavaScript to backend development with Node.js and database management with MongoDB. You\'ll learn to build responsive web applications, work with modern frameworks like React JS, and deploy applications to production environments. The program emphasizes hands-on learning through real-world projects that mirror industry standards.',
      curriculum: [
        'Frontend Development: HTML5, CSS3, Bootstrap, Responsive Design',
        'JavaScript Fundamentals: ES6+, DOM Manipulation, Async Programming',
        'React JS: Component-based Architecture, State Management, Hooks',
        'Backend Development: Node.js, Express.js, RESTful APIs',
        'Database Management: MongoDB, Mongoose, Database Design',
        'Version Control: Git, GitHub, Collaboration Workflows',
        'API Development: RESTful APIs, JSON, Authentication',
        'Deployment: Cloud platforms, CI/CD, Production best practices'
      ],
      prerequisites: [
        'Basic computer literacy',
        'No prior programming experience required',
        'Willingness to learn and practice regularly',
        'Access to a computer with internet connection'
      ],
      careerOpportunities: [
        'MEAN Stack Developer',
        'Full Stack Developer',
        'Frontend Developer',
        'Backend Developer',
        'Web Application Developer',
        'JavaScript Developer'
      ],
      icon: Code
    },
    'uiux-design': {
      id: 'uiux-design',
      title: 'UI/UX Design',
      description: 'The UI/UX Design Training program is designed to equip learners with a strong foundation in user interface (UI) and user experience (UX) design principles, tools, and methodologies.',
      duration: '2 months',
      level: 'Beginner to Intermediate',
      highlights: ['HTML, CSS, JS, Bootstrap', 'React JS, Node.js, MongoDB', 'Figma, Adobe XD, Sketch'],
      details: [
        'Full product design lifecycle training',
        'User research and wireframing techniques',
        'Prototyping and visual design mastery',
        'Industry tools: Figma, Adobe XD, Sketch',
        'Real-world case studies and projects'
      ],
      fullDescription: 'The UI/UX Design Training program is designed to equip learners with a strong foundation in user interface (UI) and user experience (UX) design principles, tools, and methodologies. Through hands-on projects and real-world case studies, students learn how to create intuitive, attractive, and user-centered digital products. The course covers the full product design lifecycle—from user research and wireframing to prototyping, testing, and visual design—using industry tools like Figma, Adobe XD, and Sketch. Fees: ₹40,000 + GST. Mode: Online / Offline. Average Salaries: ₹3L - ₹7L Per Annum. Hiring Companies: TCS, Accenture, Amazon, CISCO, Capgemini, etc.',
      curriculum: [
        'HTML: Structure and semantic markup for web interfaces',
        'CSS: Styling, layouts, responsive design principles',
        'JavaScript: Interactive elements and user behavior',
        'Bootstrap: Rapid prototyping and responsive frameworks',
        'React JS: Component-based UI development',
        'Node.js: Backend integration for full-stack understanding',
        'MongoDB: Database design for user data management',
        'Figma: Professional design tool for UI/UX workflows',
        'Adobe XD: Prototyping and design system creation',
        'Sketch: Vector-based design for digital interfaces'
      ],
      prerequisites: [
        'Basic computer literacy and internet navigation',
        'Creative thinking and visual design interest',
        'No prior design experience required',
        'Understanding of websites and mobile apps helpful'
      ],
      careerOpportunities: [
        'UI Designer',
        'UX Designer',
        'Product Designer',
        'Interaction Designer',
        'UX Researcher',
        'Visual Designer',
        'Web/App Interface Designer'
      ],
      icon: Palette
    },
    '1': {
      id: '1',
      title: 'Full Stack Master Program',
      description: 'Complete web development training covering frontend, backend, and database technologies.',
      duration: '16 weeks',
      level: 'Beginner to Advanced',
      highlights: ['HTML, CSS, Bootstrap', 'JavaScript, Python, Java', 'Angular, SQL'],
      details: [
        'Real-time web & backend development',
        'Project-based learning',
        'Version control, API integration, SQL practices'
      ],
      fullDescription: 'Our Full Stack Master Program is designed to transform you into a complete web developer. This comprehensive 16-week course covers everything from frontend technologies like HTML, CSS, and JavaScript to backend development with Python and Java. You\'ll learn to build responsive web applications, work with databases, and deploy applications to production environments. The program emphasizes hands-on learning through real-world projects that mirror industry standards.',
      curriculum: [
        'Frontend Development: HTML5, CSS3, Bootstrap, Responsive Design',
        'JavaScript Fundamentals: ES6+, DOM Manipulation, Async Programming',
        'Backend Development: Python/Django, Java/Spring Boot',
        'Database Management: SQL, MySQL, PostgreSQL',
        'Version Control: Git, GitHub, Collaboration Workflows',
        'API Development: RESTful APIs, JSON, Authentication',
        'Frontend Frameworks: Angular, Component-based Architecture',
        'Deployment: Cloud platforms, CI/CD, Production best practices'
      ],
      prerequisites: [
        'Basic computer literacy',
        'No prior programming experience required',
        'Willingness to learn and practice regularly',
        'Access to a computer with internet connection'
      ],
      careerOpportunities: [
        'Full Stack Developer',
        'Frontend Developer',
        'Backend Developer',
        'Web Application Developer',
        'Software Engineer',
        'Technical Lead'
      ],
      icon: BookOpen
    },
    '2': {
      id: '2',
      title: 'Cloud Computing',
      description: 'Master cloud platforms and DevOps practices for modern infrastructure management.',
      duration: '13 weeks',
      level: 'Intermediate',
      highlights: ['Linux, AWS, Azure, GCP', 'DevOps'],
      details: [
        'Virtual machines, cloud storage',
        'CI/CD pipelines',
        'Infrastructure as Code'
      ],
      fullDescription: 'The Cloud Computing course provides comprehensive training in modern cloud technologies and DevOps practices. Over 13 weeks, you\'ll master the three major cloud platforms - AWS, Azure, and Google Cloud Platform. Learn to design, deploy, and manage scalable cloud infrastructure, implement DevOps practices, and automate deployment processes. This course is perfect for IT professionals looking to advance their careers in cloud computing.',
      curriculum: [
        'Linux Fundamentals: Command line, System administration, Shell scripting',
        'AWS Services: EC2, S3, RDS, Lambda, VPC, IAM',
        'Microsoft Azure: Virtual Machines, Storage, App Services, Azure AD',
        'Google Cloud Platform: Compute Engine, Cloud Storage, BigQuery',
        'DevOps Practices: CI/CD, Jenkins, Docker, Kubernetes',
        'Infrastructure as Code: Terraform, CloudFormation',
        'Monitoring & Logging: CloudWatch, Azure Monitor, Stackdriver',
        'Security: Cloud security best practices, Compliance'
      ],
      prerequisites: [
        'Basic understanding of networking concepts',
        'Familiarity with command line interface',
        'Basic knowledge of virtualization',
        'Understanding of web technologies'
      ],
      careerOpportunities: [
        'Cloud Engineer',
        'DevOps Engineer',
        'Cloud Architect',
        'Site Reliability Engineer',
        'Infrastructure Engineer',
        'Cloud Security Specialist'
      ],
      icon: BookOpen
    },
    '3': {
      id: '3',
      title: 'Cloud Computing Master Program',
      description: 'Advanced cloud computing with comprehensive DevOps and automation training.',
      duration: '18 weeks',
      level: 'Advanced',
      highlights: ['Linux, Shell Scripting', 'AWS/Azure/GCP, DevOps', 'Python'],
      details: [
        'Real-world DevOps environments',
        'Scripting for automation',
        'End-to-end deployment'
      ],
      fullDescription: 'The Cloud Computing Master Program is our most comprehensive cloud training course. This 18-week intensive program covers advanced cloud architecture, DevOps automation, and enterprise-level deployment strategies. You\'ll work with real-world scenarios, learn advanced scripting with Python, and master the art of building scalable, resilient cloud infrastructure. Perfect for professionals aiming for senior cloud roles.',
      curriculum: [
        'Advanced Linux: System administration, Performance tuning, Security',
        'Shell Scripting: Bash, PowerShell, Automation scripts',
        'Python for DevOps: Automation, API integration, Infrastructure management',
        'Multi-cloud Architecture: AWS, Azure, GCP integration',
        'Advanced DevOps: GitOps, Advanced CI/CD, Blue-green deployments',
        'Container Orchestration: Docker, Kubernetes, Service mesh',
        'Infrastructure Automation: Terraform, Ansible, Puppet',
        'Monitoring & Observability: Prometheus, Grafana, ELK stack',
        'Cloud Security: Advanced security practices, Compliance frameworks',
        'Cost Optimization: Resource management, Cost monitoring'
      ],
      prerequisites: [
        'Basic cloud computing knowledge',
        'Experience with Linux command line',
        'Understanding of networking and security concepts',
        'Basic programming knowledge preferred'
      ],
      careerOpportunities: [
        'Senior Cloud Architect',
        'DevOps Lead',
        'Cloud Solutions Architect',
        'Platform Engineer',
        'Cloud Consultant',
        'Technical Director'
      ],
      icon: BookOpen
    },
    '4': {
      id: '4',
      title: 'UI/UX Design Training',
      description: 'Comprehensive UI/UX design training covering user research, wireframing, prototyping, and visual design.',
      duration: '8 weeks',
      level: 'Beginner to Intermediate',
      highlights: ['HTML, CSS, JS, Bootstrap', 'React JS, Node.js, MongoDB', 'Figma, Adobe XD, Sketch'],
      details: [
        'Full product design lifecycle training',
        'User research and wireframing techniques', 
        'Prototyping and visual design mastery',
        'Industry tools: Figma, Adobe XD, Sketch',
        'Real-world case studies and projects'
      ],
      fullDescription: 'The UI/UX Design Training program is designed to equip learners with a strong foundation in user interface (UI) and user experience (UX) design principles, tools, and methodologies. Through hands-on projects and real-world case studies, students learn how to create intuitive, attractive, and user-centered digital products. The course covers the full product design lifecycle—from user research and wireframing to prototyping, testing, and visual design—using industry tools like Figma, Adobe XD, and Sketch.',
      curriculum: [
        'HTML: Structure and semantic markup for web interfaces',
        'CSS: Styling, layouts, responsive design principles',
        'JavaScript: Interactive elements and user behavior',
        'Bootstrap: Rapid prototyping and responsive frameworks',
        'React JS: Component-based UI development',
        'Node.js: Backend integration for full-stack understanding',
        'MongoDB: Database design for user data management',
        'Figma: Professional design tool for UI/UX workflows',
        'Adobe XD: Prototyping and design system creation',
        'Sketch: Vector-based design for digital interfaces'
      ],
      prerequisites: [
        'Basic computer literacy and internet navigation',
        'Creative thinking and visual design interest',
        'No prior design experience required',
        'Understanding of websites and mobile apps helpful'
      ],
      careerOpportunities: [
        'UI Designer',
        'UX Designer', 
        'Product Designer',
        'Interaction Designer',
        'UX Researcher',
        'Visual Designer',
        'Web/App Interface Designer'
      ],
      icon: BookOpen
    },
    '5': {
      id: '5',
      title: 'Data Science Master Training',
      description: 'Complete data science program covering ML, AI, and advanced analytics.',
      duration: '20 weeks',
      level: 'Intermediate to Advanced',
      highlights: ['SQL, Statistics, Python', 'Data Science, ML, Deep Learning', 'AI, Power BI'],
      details: [
        'Real-world ML models',
        'Data wrangling & visualization',
        'AI project applications'
      ],
      fullDescription: 'The Data Science Master Training is our most comprehensive program for aspiring data scientists. This 20-week intensive course covers the complete data science pipeline from data collection and cleaning to advanced machine learning and AI applications. You\'ll work with real datasets, build predictive models, and learn to communicate insights through powerful visualizations.',
      curriculum: [
        'Statistics & Probability: Descriptive statistics, Inferential statistics, Hypothesis testing',
        'Python for Data Science: NumPy, Pandas, Data manipulation',
        'SQL & Databases: Advanced queries, Data warehousing, ETL processes',
        'Data Visualization: Matplotlib, Seaborn, Plotly, Power BI',
        'Machine Learning: Supervised learning, Unsupervised learning, Model evaluation',
        'Deep Learning: Neural networks, TensorFlow, Keras, PyTorch',
        'Natural Language Processing: Text analysis, Sentiment analysis',
        'Computer Vision: Image processing, CNN applications',
        'Big Data Technologies: Spark, Hadoop, Cloud ML services',
        'MLOps: Model deployment, Monitoring, Version control'
      ],
      prerequisites: [
        'Basic mathematics and statistics knowledge',
        'Programming experience (any language) preferred',
        'Analytical thinking and problem-solving skills',
        'Bachelor\'s degree in any field preferred'
      ],
      careerOpportunities: [
        'Data Scientist',
        'Machine Learning Engineer',
        'AI Engineer',
        'Data Analyst',
        'Research Scientist',
        'Business Intelligence Developer'
      ],
      icon: BookOpen
    },
    '6': {
      id: '6',
      title: 'Data Analytics Training',
      description: 'Business intelligence and data analytics with practical dashboard creation.',
      duration: '13 weeks',
      level: 'Beginner to Intermediate',
      highlights: ['Excel, Advanced Excel', 'SQL, Power BI', 'Python'],
      details: [
        'Dashboard creation',
        'Data cleaning & aggregation',
        'BI storytelling'
      ],
      fullDescription: 'The Data Analytics Training program focuses on practical business intelligence and analytics skills. Over 13 weeks, you\'ll master Excel, SQL, and Power BI to transform raw data into actionable business insights. Learn to create compelling dashboards, perform statistical analysis, and tell stories with data that drive business decisions.',
      curriculum: [
        'Excel Mastery: Advanced formulas, Pivot tables, Data analysis tools',
        'SQL Fundamentals: Queries, Joins, Aggregations, Stored procedures',
        'Power BI: Data modeling, DAX, Interactive dashboards, Reports',
        'Python for Analytics: Pandas, Data cleaning, Statistical analysis',
        'Statistics for Business: Descriptive analytics, Trend analysis',
        'Data Visualization: Chart types, Design principles, Best practices',
        'Business Intelligence: KPIs, Metrics, Performance dashboards',
        'Data Storytelling: Presentation skills, Executive reporting',
        'ETL Processes: Data extraction, Transformation, Loading',
        'Project Work: Real business case studies and implementations'
      ],
      prerequisites: [
        'Basic computer skills',
        'Familiarity with Excel helpful',
        'Business acumen and analytical thinking',
        'No programming experience required'
      ],
      careerOpportunities: [
        'Data Analyst',
        'Business Analyst',
        'BI Developer',
        'Reporting Analyst',
        'Market Research Analyst',
        'Operations Analyst'
      ],
      icon: BookOpen
    },
    '7': {
      id: '7',
      title: 'Java Developer Training',
      description: 'Enterprise Java development with J2EE and database integration.',
      duration: '16 weeks',
      level: 'Beginner to Advanced',
      highlights: ['Java, J2EE', 'SQL'],
      details: [
        'OOP, Servlets, JDBC',
        'SQL queries & logic building',
        'Java-based app development'
      ],
      fullDescription: 'The Java Developer Training program provides comprehensive training in enterprise Java development. Over 16 weeks, you\'ll master core Java concepts, object-oriented programming, and enterprise Java technologies. Learn to build robust, scalable applications using J2EE technologies, work with databases using JDBC, and develop web applications using servlets and JSP.',
      curriculum: [
        'Java Fundamentals: Syntax, Data types, Control structures, Methods',
        'Object-Oriented Programming: Classes, Objects, Inheritance, Polymorphism',
        'Advanced Java: Collections, Exception handling, Multithreading',
        'JDBC: Database connectivity, Prepared statements, Connection pooling',
        'SQL: Database design, Queries, Stored procedures, Optimization',
        'Servlets & JSP: Web development, Session management, MVC pattern',
        'J2EE Technologies: EJB, JPA, Web services, Spring framework',
        'Development Tools: Eclipse/IntelliJ, Maven, JUnit testing',
        'Design Patterns: Singleton, Factory, Observer, MVC',
        'Project Development: End-to-end application development'
      ],
      prerequisites: [
        'Basic computer programming concepts',
        'Logical thinking and problem-solving skills',
        'No prior Java experience required',
        'Mathematics background helpful'
      ],
      careerOpportunities: [
        'Java Developer',
        'Backend Developer',
        'Enterprise Application Developer',
        'Software Engineer',
        'Technical Lead',
        'Java Architect'
      ],
      icon: BookOpen
    },
    '8': {
      id: '8',
      title: 'Python Developer Training',
      description: 'Python programming from basics to advanced with database integration.',
      duration: '13 weeks',
      level: 'Beginner to Advanced',
      highlights: ['Python', 'SQL'],
      details: [
        'Python basics to advanced',
        'Data handling, file ops',
        'SQL queries for backend integration'
      ],
      fullDescription: 'The Python Developer Training program offers comprehensive Python programming education from fundamentals to advanced concepts. Over 13 weeks, you\'ll learn Python syntax, data structures, object-oriented programming, and database integration. The course covers web development with Django/Flask, data manipulation, and automation scripting, preparing you for diverse Python development roles.',
      curriculum: [
        'Python Basics: Syntax, Variables, Data types, Control structures',
        'Data Structures: Lists, Tuples, Dictionaries, Sets, Strings',
        'Functions & Modules: Function design, Lambda functions, Packages',
        'Object-Oriented Programming: Classes, Inheritance, Encapsulation',
        'File Handling: Reading/writing files, CSV, JSON, XML processing',
        'Database Integration: SQLite, MySQL, PostgreSQL with Python',
        'Web Development: Django/Flask frameworks, REST APIs',
        'Data Manipulation: NumPy, Pandas for data analysis',
        'Automation & Scripting: System automation, Web scraping',
        'Testing & Debugging: Unit testing, Error handling, Code optimization'
      ],
      prerequisites: [
        'Basic computer literacy',
        'Logical thinking and problem-solving skills',
        'No prior programming experience required',
        'Interest in learning programming concepts'
      ],
      careerOpportunities: [
        'Python Developer',
        'Backend Developer',
        'Data Analyst',
        'Automation Engineer',
        'Web Developer',
        'Software Engineer'
      ],
      icon: BookOpen
    }
  };

  const course = coursesData[courseId];

  if (!course) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Course Not Found</h1>
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-pink-700 transition-all duration-300"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\+]?[0-9\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.experience) {
      newErrors.experience = 'Please select your experience level';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitStatus('idle');
    
    const applicationData: Omit<CourseApplication, 'id' | 'createdAt'> = {
      fullName: formData.name,
      email: formData.email,
      phone: formData.phone,
      courseName: course.title,
      experienceLevel: formData.experience,
      interestMessage: formData.message
    };

    createCourseApplication.mutate(applicationData);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-600 via-pink-700 to-pink-800 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)'
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-pink-200 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Courses
          </button>

          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              {course.title}
            </h1>
            <p className="text-2xl text-pink-100 mb-8 leading-relaxed animate-slide-up">
              {course.description}
            </p>
            
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                <p className="text-green-700 dark:text-green-300 font-semibold text-center">
                  🎉 Application submitted successfully! We'll get back to you soon.
                </p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                <p className="text-red-700 dark:text-red-300 font-semibold text-center">
                  ❌ There was an error submitting your application. Please try again.
                </p>
              </div>
            )}
            
            <div className="flex flex-wrap gap-6 text-lg">
              <div className="flex items-center gap-2">
                <Clock size={20} className="text-pink-300" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={20} className="text-pink-300" />
                <span>{course.level}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={20} className="text-pink-300" />
                <span>Certificate Included</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Course Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <BookOpen size={32} className="text-pink-600" />
                Course Overview
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                {course.fullDescription}
              </p>
            </section>

            {/* Key Highlights */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <CheckCircle size={32} className="text-pink-600" />
                Key Highlights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.highlights.map((highlight, index) => (
                  <div key={index} className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-xl border border-pink-200 dark:border-pink-800">
                    <div className="flex items-center gap-3">
                      <CheckCircle size={20} className="text-pink-600 flex-shrink-0" />
                      <span className="text-gray-800 dark:text-gray-200 font-medium">{highlight}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Detailed Curriculum */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <Target size={32} className="text-pink-600" />
                Detailed Curriculum
              </h2>
              <div className="space-y-4">
                {course.curriculum.map((item, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Prerequisites */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Prerequisites
              </h2>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                <ul className="space-y-3">
                  {course.prerequisites.map((prereq, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{prereq}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Career Opportunities */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <Briefcase size={32} className="text-pink-600" />
                Career Opportunities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.careerOpportunities.map((career, index) => (
                  <div key={index} className="bg-gradient-to-r from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 p-4 rounded-xl border border-pink-200 dark:border-pink-800">
                    <div className="flex items-center gap-3">
                      <Briefcase size={20} className="text-pink-600 flex-shrink-0" />
                      <span className="text-gray-800 dark:text-gray-200 font-medium">{career}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Application Form */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-pink-100 dark:border-pink-900 sticky top-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Apply for This Course
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300 ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300 ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="+91 84388 29844"
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                {/* Experience Level */}
                <div>
                  <label htmlFor="experience" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Experience Level *
                  </label>
                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300 ${
                      errors.experience ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select your experience level</option>
                    <option value="beginner">Complete Beginner</option>
                    <option value="some-knowledge">Some Knowledge</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                  {errors.experience && (
                    <p className="mt-1 text-sm text-red-600">{errors.experience}</p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Why are you interested in this course? *
                  </label>
                  <div className="relative">
                    <MessageSquare size={18} className="absolute left-3 top-4 text-gray-400" />
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none transition-all duration-300 ${
                        errors.message ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Tell us about your goals and what you hope to achieve with this course..."
                    />
                  </div>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={createCourseApplication.isPending}
                  className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 disabled:from-pink-400 disabled:to-pink-500 text-white py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 group transform hover:scale-105 shadow-lg hover:shadow-xl disabled:transform-none disabled:cursor-not-allowed"
                >
                  {createCourseApplication.isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Submitting Application...
                    </>
                  ) : (
                    <>
                      <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                      Apply
                    </>
                  )}
                </button>
              </form>

              {/* Contact Info */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
                  Need more information? Contact us directly:
                </p>
                <div className="space-y-2 text-sm">
                  <a href="tel:+918438829844" className="flex items-center gap-2 text-pink-600 hover:text-pink-700 transition-colors">
                    <Phone size={16} />
                    +91 84388 29844
                  </a>
                  <a href="mailto:ecrontechnologies@gmail.com" className="flex items-center gap-2 text-pink-600 hover:text-pink-700 transition-colors">
                    <Mail size={16} />
                    ecrontechnologies@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default CourseDetailPage;