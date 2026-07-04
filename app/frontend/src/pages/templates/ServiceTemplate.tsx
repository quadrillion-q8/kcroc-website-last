import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

// 1. Import the Master Database
import { KCROC_GRAPH } from '../../data/graph';

// (Optional) Import your UI components here later:
// import Hero from '../../components/Hero';
// import ContactCTA from '../../components/ContactCTA';

const ServiceTemplate: React.FC = () => {
  // 2. Extract the slug from the URL (e.g., "macbook-repair" from /services/macbook-repair)
  const { serviceSlug } = useParams<{ serviceSlug: string }>();

  // 3. Query the Knowledge Graph
  // Note: Once we build the O(1) index, this will be GRAPH_INDEXES.bySlug[serviceSlug]
  const serviceData = KCROC_GRAPH.services.find(s => s.slug === serviceSlug);

  // 4. Handle 404s dynamically
  // If a user types /services/fake-repair, redirect them to your 404 page securely.
  if (!serviceData) {
    return <Navigate to={ROUTES.NOT_FOUND} replace />;
  }

  // 5. Render the UI purely from the Graph Data
  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {/* This is a structural wireframe. 
        You will replace this with your actual styled components (Hero, Features, etc.) 
      */}
      <header className="pt-32 pb-16 px-4 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-emerald-500 mb-6">
          {serviceData.title}
        </h1>
        <p className="text-xl text-neutral-300 max-w-2xl">
          {serviceData.description}
        </p>
      </header>

      <section className="px-4 py-12 max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Core Features</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {serviceData.coreFeatures.map((feature, index) => (
            <li key={index} className="flex items-center space-x-3 bg-neutral-800 p-4 rounded-lg">
              <span className="text-emerald-500">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* You can dynamically conditionally render UI! 
        Example: Only show the "Repair Only" warning if the graph says so.
      */}
      {serviceData.isRepairOnly && (
        <div className="max-w-7xl mx-auto px-4 py-6 text-yellow-400 bg-yellow-400/10 rounded-lg">
          ⚠️ Note: This is a diagnostic and repair service. We do not sell standalone hardware components.
        </div>
      )}
    </div>
  );
};

export default ServiceTemplate;
