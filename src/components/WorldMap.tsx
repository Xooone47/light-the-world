import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import styles from './WorldMap.module.less';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface WorldMapProps {
  visitedCountries: string[];
  onToggleCountry: (countryId: string) => void;
}

const initialZoom = 0.6;
const initialCenter = [0, 20];

const WorldMap: React.FC<WorldMapProps> = ({ visitedCountries, onToggleCountry }) => {
  const [zoom, setZoom] = useState(initialZoom);
  const [center, setCenter] = useState(initialCenter);

  const handleZoomIn = () => {
    setZoom(prevZoom => Math.min(prevZoom * 1.5, 4));
  };

  const handleZoomOut = () => {
    setZoom(prevZoom => Math.max(prevZoom / 1.5, 0.5));
  };

  const handleReset = () => {
    setZoom(initialZoom);
    setCenter(initialCenter);
  };

  return (
    <div className={styles.mapWrapper}>
      <div className={styles.zoomControls}>
        <button className={styles.zoomBtn} onClick={handleZoomIn}>
          +
        </button>
        <button className={styles.zoomBtn} onClick={handleZoomOut}>
          −
        </button>
        <button className={`${styles.zoomBtn} ${styles.resetBtn}`} onClick={handleReset}>
          R
        </button>
      </div>
      
      <ComposableMap
        projection="geoMercator"
        width={800}
        height={500}
        style={{
          width: "100%",
          height: "auto",
        }}
      >
        <ZoomableGroup
          zoom={zoom}
          center={center}
          onZoomEnd={setZoom}
          onMoveEnd={({ coordinates }) => setCenter(coordinates)}
          disablePanning={false}
          enableZoom={false}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }: { geographies: any[] }) =>
              geographies.map((geo) => {
                const countryName = geo.properties.name;
                const isVisited = visitedCountries.includes(geo.id || countryName);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => onToggleCountry(geo.id || countryName)}
                    style={{
                      default: {
                        fill: isVisited ? "#4caf50" : "#333",
                        outline: "none",
                        stroke: "#555",
                        strokeWidth: 0.5,
                      },
                      hover: {
                        fill: isVisited ? "#388e3c" : "#444",
                        outline: "none",
                        cursor: "pointer",
                      },
                      pressed: {
                        fill: "#4caf50",
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>


    </div>
  );
};

export default WorldMap;
