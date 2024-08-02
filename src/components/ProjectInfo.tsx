import React from 'react';

interface ProjectInfoProps {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  deadline: string;
  setDeadline: (deadline: string) => void;
}

const ProjectInfo: React.FC<ProjectInfoProps> = ({
  title,
  setTitle,
  description,
  setDescription,
  deadline,
  setDeadline,
}) => {
  return (
    <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Project Information</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="project-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Project Title
          </label>
          <input
            type="text"
            id="project-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="project-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Project Description
          </label>
          <textarea
            id="project-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="project-deadline" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Project Deadline
          </label>
          <input
            type="date"
            id="project-deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectInfo;