import { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import Sidebar from '../sidebar/Sidebar';
import './upcomingevent.css';

export default function ProjectDashboard() {
  const [currentPage, setCurrentPage] = useState(1);

  type TeamMember = { color: string };
  type Project = {
    id: number;
    name: string;
    logo: string;
    logoColor: string;
    logoBorder?: string;
    logoTextColor?: string;
    description: string;
    participants: number;
    workshops: number;
    presentations: number;
    daysLeft: number;
    teamMembers: TeamMember[];
  };

  const projects: Project[] = [
    {
      id: 1,
      name: 'Web Summit',
      logo: 'WS',
      logoColor: 'logo-facebook',
      description: 'Web Summit is one of the largest global technology conferences, bringing together startup founders, investors, and industry leaders from various sectors. The event features keynote speeches from top executives, panel discussions on business trends, and startup pitching competitions.',
      participants: 1000,
      workshops: 10,
      presentations: 2,
      daysLeft: 7,
      teamMembers: [
        { color: 'avatar-yellow' },
        { color: 'avatar-blue' },
        { color: 'avatar-green' }
      ]
    },
    {
      id: 2,
      name: 'Google I/O',
      logo: 'G',
      logoColor: 'logo-google',
      description: 'Google I/O is an annual developer conference where Google announces new technologies, software updates, and AI advancements. It includes keynotes, hands-on workshops, and networking opportunities for developers.',
      participants: 2000,
      workshops: 15,
      presentations: 3,
      daysLeft: 9,
      teamMembers: [
        { color: 'avatar-red' },
        { color: 'avatar-blue' },
        { color: 'avatar-yellow' },
        { color: 'avatar-green' }
      ]
    },
    {
      id: 3,
      name: 'Adobe Max',
      logo: 'AM',
      logoColor: 'logo-adobe',
      description: 'Adobe MAX is an annual creativity conference where designers, illustrators, and content creators gather to explore the latest tools and trends in digital design. Hosted by Adobe, the event features in-depth workshops and live demonstrations.',
      participants: 800,
      workshops: 0,
      presentations: 1,
      daysLeft: 10,
      teamMembers: [
        { color: 'avatar-blue' },
        { color: 'avatar-pink' },
        { color: 'avatar-yellow' },
        { color: 'avatar-green' }
      ]
    },
    {
      id: 4,
      name: 'TechCrunch Disrupt',
      logo: 'TC',
      logoColor: 'logo-twitter',
      description: 'TechCrunch Disrupt is a premier startup conference that brings together innovative entrepreneurs, investors, and tech enthusiasts. The event features the famous Startup Battlefield competition and networking sessions.',
      participants: 1500,
      workshops: 12,
      presentations: 5,
      daysLeft: 12,
      teamMembers: [
        { color: 'avatar-blue' },
        { color: 'avatar-purple' },
        { color: 'avatar-orange' }
      ]
    },
    {
      id: 5,
      name: 'SXSW Interactive',
      logo: 'SX',
      logoColor: 'logo-spotify',
      description: 'South by Southwest Interactive is a major tech and innovation festival that showcases digital creativity and emerging technology. The event combines interactive sessions with music and film festivals.',
      participants: 3000,
      workshops: 25,
      presentations: 8,
      daysLeft: 15,
      teamMembers: [
        { color: 'avatar-green' },
        { color: 'avatar-red' },
        { color: 'avatar-blue' },
        { color: 'avatar-yellow' }
      ]
    }
  ];

  const totalProjects = 5;
  const projectsPerPage = 3;
  const totalPages = Math.ceil(totalProjects / projectsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="dashboard-main">
        {/* Dashboard Content */}
        <div className="container">
          {/* Search Bar */}
          <div className="top-bar">
            <div className="search-wrapper">
              <input type="text" placeholder="Search..." className="search-input" />
              <div className="search-icon">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
            <div className="user-info">
              <div className="user-initial">AM</div>
              <span className="user-name">Aiden Max</span>
              <svg className="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
          {/* Project List */}
          <div className="project-section-container">
            <h2 className="section-title centered-title">Your upcoming projects</h2>
            <div className="project-list">
              {projects.slice((currentPage-1)*projectsPerPage, currentPage*projectsPerPage).map((project: Project) => (
                <div key={project.id} className="project-card">
                  <div className="card-header">
                    <div className="project-header">
                      <div className={`project-logo ${project.logoColor} ${project.logoBorder || ''} ${project.logoTextColor || ''}`}>
                        {project.logo}
                      </div>
                      <div className="project-details">
                        <div className="project-title">
                          <h3>{project.name}</h3>
                          <span className="due">in {project.daysLeft} days</span>
                          <MoreVertical size={16} className="text-gray-400" /> 
                        </div>
                        <p className="description">{project.description}</p>
                        <div className="card-separator"></div>
                        <div className="stats">
                          <div>
                            <p className="stat-value">{project.participants}</p>
                            <p className="stat-label">participants</p>
                          </div>
                          <div>
                            <p className="stat-value">{project.workshops}</p>
                            <p className="stat-label">workshops</p>
                          </div>
                          <div>
                            <p className="stat-value">{project.presentations}</p>
                            <p className="stat-label">presentations</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-actions-row">

                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Pagination */}
            <div className="pagination-wrapper">
              <span className="pagination-info">Showing 3 of 5 products</span>
              <div className="pagination-buttons">
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Prev
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    className={currentPage === index + 1 ? 'active-page' : ''}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
