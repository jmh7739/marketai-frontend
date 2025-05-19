
// src/pages/ProductList.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import './ProductList.css';

// 더미 데이터 (나중에 API로 대체)
import { 
  featuredProducts, 
  recommendedProducts, 
  endingSoonProducts,
  popularProducts, 
  newProducts 
} from '../data/dummyData';

const ProductList = () => {
  const { categoryId, subCategoryId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q');
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('endingSoon');
  const [filters, setFilters] = useState({
    auctionType: 'all',
    priceMin: '',
    priceMax: '',
    condition: 'all'
  });
  const [pageTitle, setPageTitle] = useState('');
  
  // 상품 데이터 가져오기
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // 실제 구현에서는 API 호출
        // 여기서는 더미 데이터 사용
        let allProducts = [
          ...featuredProducts,
          ...recommendedProducts,
          ...endingSoonProducts,
          ...popularProducts,
          ...newProducts
        ];
        
        // 중복 제거
        allProducts = allProducts.filter((product, index, self) => 
          index === self.findIndex(p => p.id === product.id)
        );
        
        // 카테고리 필터링
        if (categoryId) {
          // 실제 구현에서는 API 호출로 카테고리 정보 가져와야 함
          setPageTitle(`카테고리: ${getCategoryName(categoryId, subCategoryId)}`);
          // 여기서는 임시로 랜덤으로 필터링
          allProducts = allProducts.filter(() => Math.random() > 0.3);
        }
        
        // 검색어 필터링
        if (searchQuery) {
          setPageTitle(`검색 결과: "${searchQuery}"`);
          // 실제 구현에서는 검색 API 호출
          // 여기서는 임시로 랜덤으로 필터링
          allProducts = allProducts.filter(() => Math.random() > 0.5);
        }
        
        setProducts(allProducts);
      } catch (error) {
        console.error('상품 목록 가져오기 실패:', error);
        setError('상품 목록을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [categoryId, subCategoryId, searchQuery]);
  
  // 카테고리 이름 가져오기 (임시)
  const getCategoryName = (categoryId, subCategoryId) => {
    const categories = {
      '1': '전자제품',
      '2': '패션의류',
      '3': '스포츠용품',
      '4': '가구/인테리어',
      '5': '도서/음반',
      '6': '게임/취미'
    };
    
    const subCategories = {
      '1': {
        '101': '스마트폰',
        '102': '노트북/PC',
        '103': '태블릿',
        '104': '카메라',
        '105': '오디오'
      },
      '2': {
        '201': '남성의류',
        '202': '여성의류',
        '203': '신발',
        '204': '가방',
        '205': '액세서리'
      }
      // 다른 서브 카테고리들...
    };
    
    if (subCategoryId && subCategories[categoryId] && subCategories[categoryId][subCategoryId]) {
      return `${categories[categoryId]} > ${subCategories[categoryId][subCategoryId]}`;
    }
    
    return categories[categoryId] || '전체 상품';
  };
  
  // 정렬 변경 핸들러
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    
    // 상품 정렬
    const sortedProducts = [...products];
    
    switch (e.target.value) {
      case 'endingSoon':
        sortedProducts.sort((a, b) => new Date(a.endTime) - new Date(b.endTime));
        break;
      case 'priceLow':
        sortedProducts.sort((a, b) => a.currentPrice - b.currentPrice);
        break;
      case 'priceHigh':
        sortedProducts.sort((a, b) => b.currentPrice - a.currentPrice);
        break;
      case 'bidCount':
        sortedProducts.sort((a, b) => b.bidCount - a.bidCount);
        break;
      case 'newest':
        // 임시로 랜덤 정렬
        sortedProducts.sort(() => Math.random() - 0.5);
        break;
      default:
        break;
    }
    
    setProducts(sortedProducts);
  };
  
  // 필터 변경 핸들러
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // 필터 적용
  const applyFilters = () => {
    // 실제 구현에서는 필터를 적용한 API 호출
    // 여기서는 현재 상품 목록에서 필터링
    let filteredProducts = [
      ...featuredProducts,
      ...recommendedProducts,
      ...endingSoonProducts,
      ...popularProducts,
      ...newProducts
    ];
    
    // 중복 제거
    filteredProducts = filteredProducts.filter((product, index, self) => 
      index === self.findIndex(p => p.id === product.id)
    );
    
    // 경매 유형 필터
    if (filters.auctionType !== 'all') {
      filteredProducts = filteredProducts.filter(
        product => product.auctionType === filters.auctionType
      );
    }
    
    // 가격 범위 필터
    if (filters.priceMin) {
      filteredProducts = filteredProducts.filter(
        product => product.currentPrice >= parseInt(filters.priceMin)
      );
    }
    
    if (filters.priceMax) {
      filteredProducts = filteredProducts.filter(
        product => product.currentPrice <= parseInt(filters.priceMax)
      );
    }
    
    // 상품 상태 필터
    if (filters.condition !== 'all') {
      filteredProducts = filteredProducts.filter(
        product => product.condition.includes(filters.condition)
      );
    }
    
    setProducts(filteredProducts);
  };
  
  // 필터 초기화
  const resetFilters = () => {
    setFilters({
      auctionType: 'all',
      priceMin: '',
      priceMax: '',
      condition: 'all'
    });
    
    // 상품 목록 다시 가져오기
    navigate(location.pathname);
  };
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>상품 목록을 불러오는 중입니다...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="error-container">
        <h2>오류 발생</h2>
        <p>{error}</p>
        <button 
          className="button"
          onClick={() => navigate('/')}
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }
  
  return (
    <div className="product-list-container">
      {/* 페이지 제목 */}
      <div className="product-list-header">
        <h1 className="page-title">{pageTitle || '전체 상품'}</h1>
        <div className="product-count">{products.length}개의 상품</div>
      </div>
      
      <div className="product-list-content">
        {/* 필터 사이드바 */}
        <aside className="product-filters">
          <div className="filter-header">
            <h2>필터</h2>
            <button 
              className="reset-filters"
              onClick={resetFilters}
            >
              초기화
            </button>
          </div>
          
          <div className="filter-section">
            <h3>경매 유형</h3>
            <div className="filter-options">
              <label className="filter-option">
                <input
                  type="radio"
                  name="auctionType"
                  value="all"
                  checked={filters.auctionType === 'all'}
                  onChange={handleFilterChange}
                />
                <span>전체</span>
              </label>
              <label className="filter-option">
                <input
                  type="radio"
                  name="auctionType"
                  value="auction"
                  checked={filters.auctionType === 'auction'}
                  onChange={handleFilterChange}
                />
                <span>경매</span>
              </label>
              <label className="filter-option">
                <input
                  type="radio"
                  name="auctionType"
                  value="buy-now"
                  checked={filters.auctionType === 'buy-now'}
                  onChange={handleFilterChange}
                />
                <span>즉시구매</span>
              </label>
            </div>
          </div>
          
          <div className="filter-section">
            <h3>가격 범위</h3>
            <div className="price-range">
              <input
                type="text"
                name="priceMin"
                value={filters.priceMin}
                onChange={handleFilterChange}
                placeholder="최소 가격"
                className="price-input"
              />
              <span className="price-separator">-</span>
              <input
                type="text"
                name="priceMax"
                value={filters.priceMax}
                onChange={handleFilterChange}
                placeholder="최대 가격"
                className="price-input"
              />
            </div>
          </div>
          
          <div className="filter-section">
            <h3>상품 상태</h3>
            <div className="filter-options">
              <label className="filter-option">
                <input
                  type="radio"
                  name="condition"
                  value="all"
                  checked={filters.condition === 'all'}
                  onChange={handleFilterChange}
                />
                <span>전체</span>
              </label>
              <label className="filter-option">
                <input
                  type="radio"
                  name="condition"
                  value="새 상품"
                  checked={filters.condition === '새 상품'}
                  onChange={handleFilterChange}
                />
                <span>새 상품</span>
              </label>
              <label className="filter-option">
                <input
                  type="radio"
                  name="condition"
                  value="중고"
                  checked={filters.condition === '중고'}
                  onChange={handleFilterChange}
                />
                <span>중고품</span>
              </label>
            </div>
          </div>
          
          <button 
            className="apply-filters-button"
            onClick={applyFilters}
          >
            필터 적용
          </button>
        </aside>
        
        {/* 상품 목록 */}
        <div className="product-list-main">
          <div className="product-list-actions">
            <div className="sort-options">
              <label>정렬: </label>
              <select 
                value={sortBy}
                onChange={handleSortChange}
                className="sort-select"
              >
                <option value="endingSoon">마감 임박순</option>
                <option value="priceLow">낮은 가격순</option>
                <option value="priceHigh">높은 가격순</option>
                <option value="bidCount">인기순</option>
                <option value="newest">최신순</option>
              </select>
            </div>
          </div>
          
          {products.length === 0 ? (
            <div className="no-products">
              <p>검색 결과가 없습니다.</p>
              <p>다른 검색어나 필터 조건을 시도해보세요.</p>
            </div>
          ) : (
            <div className="product-grid">
              {products.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  showCountdown={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;