// File: src/components/dev/SchemaDashboard.tsx
import React, { useState, useEffect } from 'react';
import { generateAutomatedSchema } from '../../utils/schema/schemaBuilder';
import { KCROCEntity, ServiceEntity } from '../../types/knowledgeGraph';

interface SchemaDashboardProps {
  entity?: KCROCEntity; // Make it optional so we can provide a default fallback
}

/**
 * Structural Validator for Schema.org @graph
 */
const validateSchemaStructure = (schema: any): string => {
  if (!schema) return "Error: Empty schema";
  if (!schema["@context"]) return "Error: Missing @context";
  if (!schema["@graph"]) return "Error: Missing @graph array";
  if (!Array.isArray(schema["@graph"])) return "Error: @graph must be an array";
  if (schema["@graph"].length === 0) return "Warning: @graph is empty";
  return "Valid Structure";
};

// Default Mock Entity for isolated testing
const defaultMockEntity: ServiceEntity = {
  id: 'srv-laptop-repair-hawalli',
  entityType: 'Service',
  slug: 'laptop-repair-kuwait',
  isActive: true,
  title: 'Kuwait Computer Repair On Call - Laptop Services',
  description: 'Expert laptop motherboard diagnostics and repair. Free pick & drop included.',
  primaryKeyword: 'laptop repair hawalli',
  secondaryKeywords: [],
  synonyms: [],
  aliases: [],
  isPickAndDropEligible: true,
  basePrice: 15,
  serviceCategory: 'Computer Repair',
  seo: {
    title: 'Laptop Repair in Kuwait | Free Pick & Drop',
    description: 'Get your laptop fixed today. Visit our shop or use our free pickup service.',
    canonicalUrl: '/laptop-repair-kuwait'
  },
  build: {
    lastReviewed: '2026-06-28',
    contentVersion: '1.0',
    schemaVersion: '1.0',
    validationStatus: 'Valid',
    isDeprecated: false
  },
  relationships: [],
  media: [
    {
      imageId: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto/v1769908596/laptop-hero.jpg',
      altText: 'Technician repairing a laptop motherboard',
      role: 'hero',
      priority: 'eager'
    }
  ],
  schemaTypes: ['Service', 'WebPage', 'ImageObject', 'BreadcrumbList']
};

export default function SchemaDashboard({ entity = defaultMockEntity }: SchemaDashboardProps) {
  const [schemaJson, setSchemaJson] = useState<any>(null);
  const [rawString, setRawString] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [validationStatus, setValidationStatus] = useState<string>('Pending');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // 1. Entity Telemetry Logging
    console.table({
      id: entity.id,
      type: entity.entityType,
      schemaTypes: entity.schemaTypes.join(', '),
      mediaCount: entity.media?.length || 0,
      hasSEO: !!entity.seo
    });

    try {
      // 2. Generate Schema
      const generated = generateAutomatedSchema(entity);
      setRawString(generated);

      // 3. Safe Parsing
      const parsed = JSON.parse(generated);
      setSchemaJson(parsed);
      
      // 4. Structural Validation
      const status = validateSchemaStructure(parsed);
      setValidationStatus(status);
      setError(null);

    } catch (err: any) {
      console.error("❌ Schema JSON is invalid:", err);
      setError(`JSON Parsing Error: ${err.message}`);
      setValidationStatus('Critical Error');
    }
  }, [entity]);

  const handleCopy = () => {
    navigator.clipboard.writeText(rawString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isStatusValid = validationStatus === 'Valid Structure';

  return (
    <div className="p-6 bg-slate-900 text-slate-200 rounded-xl shadow-2xl border border-slate-700 max-w-5xl mx-auto my-8 font-sans">
      
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 border-b border-slate-700 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            🧠 SEO Schema Engine
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Analyzing Entity: <span className="text-cyan-400 font-mono">{entity.id}</span>
          </p>
        </div>
        
        {/* Status Badge & Actions */}
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <span className={`px-3 py-1 text-xs font-bold rounded-full ${isStatusValid ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
            {validationStatus}
          </span>
          <button 
            onClick={handleCopy}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium rounded-lg transition-colors"
          >
            {copied ? 'Copied!' : 'Copy JSON-LD'}
          </button>
        </div>
      </div>

      {/* Code Viewer */}
      <div className="relative">
        {error ? (
          <div className="bg-red-950/50 border border-red-500/50 text-red-200 p-4 rounded-lg text-sm font-mono overflow-auto">
            {error}
            <div className="mt-4 text-xs text-red-400">
              <strong>Raw Output:</strong>
              <pre className="mt-2 opacity-70">{rawString}</pre>
            </div>
          </div>
        ) : (
          <pre className="bg-[#0d1117] p-4 rounded-lg text-xs font-mono text-emerald-300 overflow-x-auto border border-slate-800 shadow-inner max-h-[600px] overflow-y-auto custom-scrollbar">
            {JSON.stringify(schemaJson, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
