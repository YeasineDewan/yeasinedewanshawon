import React, { useState } from 'react';
import { Card, CardHeader, CardBody, Button } from '@heroui/react';
import { Icon } from '@iconify/react';

interface ServicePack {
  id: string;
  name: string;
  icon: string;
  originalPrice: number;
  currentPrice: number;
  renewalPrice: number;
  features: string[];
  color: string;
}

const servicePacks: ServicePack[] = [
  {
    id: 'basic',
    name: 'Basic Pack',
    icon: 'lucide:server',
    originalPrice: 8000,
    currentPrice: 8000,
    renewalPrice: 0,
    color: 'blue',
    features: [
      'Basic website development',
      'Mobile responsive design',
      'Contact form integration',
      'Basic SEO optimization',
      '1 month support'
    ]
  },
  {
    id: 'professional',
    name: 'Professional Pack',
    icon: 'lucide:shield',
    originalPrice: 15000,
    currentPrice: 15000,
    renewalPrice: 0,
    color: 'green',
    features: [
      'Advanced website development',
      'E-commerce integration',
      'Penetration testing',
      'Advanced security features',
      '3 months support'
    ]
  },
  {
    id: 'premium',
    name: 'Premium Pack',
    icon: 'lucide:crown',
    originalPrice: 25000,
    currentPrice: 25000,
    renewalPrice: 0,
    color: 'purple',
    features: [
      'Full-stack development',
      'Custom web applications',
      'Complete cybersecurity',
      'Advanced security audits',
      '6 months support'
    ]
  }
];

// Color mapping function for dynamic classes
const getColorClasses = (color: string) => {
  const colorMap: { [key: string]: string } = {
    blue: 'text-blue-500',
    green: 'text-green-500',
    purple: 'text-purple-500'
  };
  return colorMap[color] || 'text-gray-500';
};

const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState('basic');

  const activePack = servicePacks.find(pack => pack.id === activeTab);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Service Packs</h1>
        <p className="text-lg text-foreground-600">Choose the perfect package for your project</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="flex bg-gray-100 rounded-lg p-1">
          {['basic', 'professional', 'premium'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-red-500 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Pack
            </button>
          ))}
        </div>
      </div>

      {/* Active Service Pack Card */}
      {activePack && (
        <Card className="bg-white border-2 hover:shadow-lg transition-shadow max-w-md mx-auto">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <Icon 
                icon={activePack.icon} 
                width="48" 
                height="48" 
                className={getColorClasses(activePack.color)}
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{activePack.name}</h2>
          </CardHeader>
          
          <CardBody className="space-y-6">
            {/* Features List */}
            <ul className="space-y-3">
              {activePack.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                  <Icon icon="lucide:check" className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* Pricing */}
            <div className="border-t pt-6">
              <div className="text-center space-y-2">
                <div className="flex justify-center items-center gap-2">
                  <span className="text-gray-500 line-through text-sm">
                    ৳{activePack.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-2xl font-bold text-gray-800">
                    ৳{activePack.currentPrice.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500">/project</span>
                </div>
                {activePack.renewalPrice > 0 && (
                  <p className="text-xs text-gray-500">
                    Renewal: ৳{activePack.renewalPrice.toLocaleString()}/year
                  </p>
                )}
              </div>
            </div>

            {/* Hire Button */}
            <Button 
              color="primary" 
              className={`w-full ${
                activePack.color === 'blue' ? 'bg-blue-500 hover:bg-blue-600' :
                activePack.color === 'green' ? 'bg-green-500 hover:bg-green-600' :
                activePack.color === 'purple' ? 'bg-purple-500 hover:bg-purple-600' : 'bg-gray-500'
              }`}
              as="a"
              href="/contact"
            >
              Hire Now
            </Button>
          </CardBody>
        </Card>
      )}

      {/* Additional Info */}
      <div className="mt-12 text-center">
        <h3 className="text-2xl font-semibold mb-4">Need a Custom Solution?</h3>
        <p className="text-gray-600 mb-6">
          Contact me for custom pricing and tailored solutions for your specific needs.
        </p>
        <Button color="primary" size="lg" as="a" href="/contact">
          Get Custom Quote
        </Button>
      </div>
    </div>
  );
};

export default Services;
