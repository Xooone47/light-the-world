import { useState } from 'react';
import WorldMap from '@/components/WorldMap';
import Overview from '@/components/Overview';
import { usePersistence } from '@/hooks/usePersistence';
import './App.less';

function App() {
  const [visitedCountries, setVisitedCountries] = usePersistence<string[]>('visited-countries', []);

  const toggleCountry = (countryId: string) => {
    setVisitedCountries(
      visitedCountries.includes(countryId)
        ? visitedCountries.filter((id) => id !== countryId)
        : [...visitedCountries, countryId]
    );
  };

  return (
    <div className="app-container">
      <div className="left-panel">
        <WorldMap 
          visitedCountries={visitedCountries} 
          onToggleCountry={toggleCountry} 
        />
      </div>
      <div className="right-panel">
        <Overview 
          visitedCountries={visitedCountries} 
          onToggleCountry={toggleCountry} 
        />
      </div>
    </div>
  );
}

export default App;
