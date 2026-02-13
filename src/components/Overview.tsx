import React, { useState } from 'react';
import { Trophy, Globe, MapPin, Search, X } from 'lucide-react';
import { getCountryName, countryMapping } from '@/constants/countryMapping';
import styles from './Overview.module.less';

interface OverviewProps {
  visitedCountries: string[];
  onToggleCountry: (countryId: string) => void;
}

const Overview: React.FC<OverviewProps> = ({ visitedCountries, onToggleCountry }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const count = visitedCountries.length;
  const percentage = ((count / 195) * 100).toFixed(1);

  const handleAddCountry = () => {
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setSearchQuery('');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCountrySelect = (countryId: string) => {
    onToggleCountry(countryId);
    setShowAddModal(false);
    setSearchQuery('');
  };

  // 过滤国家列表
  const filteredCountries = Object.entries(countryMapping).filter(([id, country]) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      country.cn.toLowerCase().includes(searchLower) ||
      country.en.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className={styles.overviewContainer}>
      <div className={styles.statsCard}>
        <div className={styles.statItem}>
          <div className={styles.statIcon}>
            <Globe size={24} color="#4caf50" />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.label}>Regions Visited</span>
            <span className={styles.value}>{count}</span>
          </div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statIcon}>
            <Trophy size={24} color="#ffb300" />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.label}>World Exploration Progress</span>
            <span className={styles.value}>{percentage}%</span>
          </div>
        </div>
      </div>

      <div className={styles.visitedList}>
        <div className={styles.visitedHeader}>
          <h3>
            <MapPin size={18} /> Visited
          </h3>
          <button className={styles.addCountryBtn} onClick={handleAddCountry}>Add</button>
        </div>
        {visitedCountries.length === 0 ? (
          <p className={styles.emptyText}>Click on countries on the map to start exploring!</p>
        ) : (
          <div className={styles.tagCloud}>
            {[...visitedCountries].reverse().slice(0, 20).map((id) => (
              <div 
                key={id} 
                className={styles.countryTag}
                onClick={() => onToggleCountry(id)}
              >
                {getCountryName(id)}
              </div>
            ))}
            {visitedCountries.length > 20 && (
              <div className={styles.moreText}>... and {visitedCountries.length - 20} more countries</div>
            )}
          </div>
        )}
      </div>

      {/* 添加国家弹框 */}
      {showAddModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>Add</h3>
              <button className={styles.closeBtn} onClick={handleCloseModal}>
                <X size={20} />
              </button>
            </div>
            <div className={styles.searchContainer}>
              <Search size={16} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search regions"
                value={searchQuery}
                onChange={handleSearchChange}
                className={styles.searchInput}
                autoFocus
              />
            </div>
            <div className={styles.countryList}>
              {filteredCountries.length === 0 ? (
                <p className={styles.noResults}>No countries found</p>
              ) : (
                filteredCountries.slice(0, 20).map(([id, country]) => (
                  <div
                    key={id}
                    className={`${styles.countryItem} ${visitedCountries.includes(id) ? styles.visited : ''}`}
                    onClick={() => handleCountrySelect(id)}
                  >
                    <span className={styles.countryName}>{country.cn}</span>
                    <span className={styles.countryEnglish}>{country.en}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;
