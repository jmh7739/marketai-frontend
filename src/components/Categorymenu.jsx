// src/components/CategoryMenu.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CategoryMenu.css';

// 카테고리 데이터
const categories = [
  { 
    id: 1, 
    name: '전자제품', 
    icon: '📱',
    subCategories: [
      { id: 101, name: '스마트폰' },
      { id: 102, name: '노트북/PC' },
      { id: 103, name: '태블릿' },
      { id: 104, name: '카메라' },
      { id: 105, name: '오디오' }
    ]
  },
  { 
    id: 2, 
    name: '패션의류', 
    icon: '👕',
    subCategories: [
      { id: 201, name: '남성의류' },
      { id: 202, name: '여성의류' },
      { id: 203, name: '신발' },
      { id: 204, name: '가방' },
      { id: 205, name: '액세서리' }
    ]
  },
  { 
    id: 3, 
    name: '스포츠용품', 
    icon: '⚽',
    subCategories: [
      { id: 301, name: '골프' },
      { id: 302, name: '자전거' },
      { id: 303, name: '등산/캠핑' },
      { id: 304, name: '헬스/요가' },
      { id: 305, name: '수영/수상스포츠' }
    ]
  },
  { 
    id: 4, 
    name: '가구/인테리어', 
    icon: '🛋️',
    subCategories: [
      { id: 401, name: '침실가구' },
      { id: 402, name: '거실가구' },
      { id: 403, name: '주방가구' },
      { id: 404, name: '인테리어소품' },
      { id: 405, name: '조명' }
    ]
  },
  { 
    id: 5, 
    name: '도서/음반', 
    icon: '📚',
    subCategories: [
      { id: 501, name: '도서' },
      { id: 502, name: 'CD/DVD' },
      { id: 503, name: 'LP레코드' },
      { id: 504, name: '악기' },
      { id: 505, name: '음악기기' }
    ]
  },
  { 
    id: 6, 
    name: '게임/취미', 
    icon: '🎮',
    subCategories: [
      { id: 601, name: '게임기기' },
      { id: 602, name: '게임타이틀' },
      { id: 603, name: '피규어/장난감' },
      { id: 604, name: '보드게임' },
      { id: 605, name: '취미용품' }
    ]
  }
];

const CategoryMenu = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  
  const handleCategoryHover = (categoryId) => {
    setExpandedCategory(categoryId);
  };
  
  const handleMouseLeave = () => {
    setExpandedCategory(null);
  };
  
  return (
    <div className="category-menu">
      <h2 className="category-title">카테고리</h2>
      <ul className="category-list">
        {categories.map(category => (
          <li 
            key={category.id} 
            className={`category-item ${expandedCategory === category.id ? 'expanded' : ''}`}
            onMouseEnter={() => handleCategoryHover(category.id)}
            onMouseLeave={handleMouseLeave}
          >
            <Link to={`/category/${category.id}`} className="category-link">
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
            </Link>
            
            {/* 서브 카테고리 */}
            {expandedCategory === category.id && (
              <ul className="subcategory-list">
                {category.subCategories.map(subCategory => (
                  <li key={subCategory.id} className="subcategory-item">
                    <Link to={`/category/${category.id}/${subCategory.id}`} className="subcategory-link">
                      {subCategory.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryMenu;