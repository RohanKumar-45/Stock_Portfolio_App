import React, { useState } from 'react';

const Header = ({ title }) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6 mb-6 shadow-lg">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center">{title}</h1>
        <p className="text-center text-blue-100 mt-2">Track, Analyze, and Manage Your Investments</p>
      </div>
    </header>
  );
};

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const images = [
    {
      src: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop",
      title: "Stock Market Analysis",
      alt: "Stock market charts and graphs"
    },
    {
      src: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&h=400&fit=crop",
      title: "Portfolio Management",
      alt: "Financial portfolio dashboard"
    },
    {
      src: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=400&fit=crop",
      title: "Investment Growth",
      alt: "Investment growth visualization"
    }
  ];

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative max-w-4xl mx-auto mb-8 bg-white rounded-lg shadow-xl overflow-hidden">
      <div className="relative h-96">
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-2xl font-bold">{images[currentIndex].title}</h3>
        </div>
      </div>

      <button
        onClick={prevImage}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextImage}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-4 right-4 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const ImageCard = ({ imageSrc, title, description }) => {
  const [viewCount, setViewCount] = useState(0);

  const handleViewImage = () => {
    setViewCount(prevCount => prevCount + 1);
    window.open(imageSrc, '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
      <div className="h-48 overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">{description}</p>
        <div className="flex justify-between items-center">
          <button
            onClick={handleViewImage}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
          >
            View Full Image
          </button>
          <span className="text-sm text-gray-500">
            Viewed: {viewCount} times
          </span>
        </div>
      </div>
    </div>
  );
};

const ContactForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.description) {
      onSubmit({
        ...formData,
        id: Date.now(),
        timestamp: new Date().toLocaleString()
      });
      setFormData({ name: '', email: '', description: '' });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Contact Your Financial Advisor
      </h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            placeholder="Enter your full name"
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            placeholder="Enter your email address"
            required
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Message
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 resize-vertical"
            placeholder="Describe your portfolio questions or investment goals..."
            required
          />
        </div>
        
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
        >
          Submit Message
        </button>
      </div>
    </div>
  );
};

const SubmittedCard = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-4 border-l-4 border-blue-500">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-800">{data.name}</h3>
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {data.timestamp}
        </span>
      </div>
      <div className="mb-3">
        <span className="text-sm font-medium text-gray-600">Email: </span>
        <span className="text-blue-600">{data.email}</span>
      </div>
      <div>
        <span className="text-sm font-medium text-gray-600 block mb-2">Message:</span>
        <p className="text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-lg">
          {data.description}
        </p>
      </div>
    </div>
  );
};

const StockPortfolioApp = () => {
  const [submittedData, setSubmittedData] = useState([]);

  const handleFormSubmit = (data) => {
    setSubmittedData(prevData => [data, ...prevData]);
  };

  const imageCardsData = [
    {
      imageSrc: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=300&fit=crop",
      title: "Portfolio Dashboard",
      description: "Comprehensive view of your investment portfolio with real-time updates, performance metrics, and detailed analytics to help you make informed decisions."
    },
    {
      imageSrc: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop",
      title: "Market Analysis",
      description: "Advanced market analysis tools featuring technical indicators, trend analysis, and market sentiment data to guide your investment strategy."
    },
    {
      imageSrc: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop",
      title: "Investment Tracking",
      description: "Track your investments across multiple asset classes with detailed performance reports, risk assessment, and growth projections."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <Header title="Stock Market Portfolio" />
      
      <div className="container mx-auto px-4 pb-8">
        <ImageCarousel />
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {imageCardsData.map((card, index) => (
            <ImageCard
              key={index}
              imageSrc={card.imageSrc}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
        
        <div className="max-w-2xl mx-auto">
          <ContactForm onSubmit={handleFormSubmit} />
          
          {submittedData.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Submitted Messages ({submittedData.length})
              </h2>
              <div className="space-y-4">
                {submittedData.map((data) => (
                  <SubmittedCard key={data.id} data={data} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockPortfolioApp;