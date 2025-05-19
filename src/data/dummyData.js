// src/data/dummyData.js
export const featuredProducts = [
  {
    id: 1,
    title: '애플 아이폰 14 Pro 128GB 스페이스 블랙',
    description: '완전 새 제품, 국내 정식 발매 제품',
    currentPrice: 1250000,
    imageUrl: 'https://via.placeholder.com/300x300?text=iPhone+14+Pro',
    condition: '새 상품',
    seller: 'apple_store',
    sellerRating: 4.9,
    endTime: '2025-06-20T15:30:00',
    auctionType: 'auction',
    bidCount: 15,
    isHighestBidder: true
  },
  {
    id: 2,
    title: '삼성 갤럭시 S23 울트라 256GB 그린',
    description: '구매 후 1주일 사용, 상태 매우 좋음',
    currentPrice: 1110000,
    imageUrl: 'https://via.placeholder.com/300x300?text=Galaxy+S23+Ultra',
    condition: '중고 - 상태 매우 좋음',
    seller: 'tech_lover',
    sellerRating: 4.7,
    endTime: '2025-06-18T12:00:00',
    auctionType: 'auction',
    bidCount: 8,
    isHighestBidder: false
  },
  {
    id: 3,
    title: '소니 PS5 디스크 에디션 + 컨트롤러 2개',
    description: '거의 사용하지 않은 상태, 모든 구성품 포함',
    currentPrice: 630000,
    imageUrl: 'https://via.placeholder.com/300x300?text=PlayStation+5',
    condition: '중고 - 상태 좋음',
    seller: 'game_master',
    sellerRating: 4.8,
    endTime: '2025-06-19T18:45:00',
    auctionType: 'auction',
    bidCount: 12,
    isHighestBidder: true
  }
];

export const recommendedProducts = [
  {
    id: 4,
    title: '애플 맥북 프로 M2 13인치 512GB',
    description: '한 달 사용, 상태 매우 좋음',
    currentPrice: 1890000,
    imageUrl: 'https://via.placeholder.com/300x300?text=MacBook+Pro+M2',
    condition: '중고 - 상태 매우 좋음',
    seller: 'mac_lover',
    sellerRating: 4.9,
    endTime: '2025-06-21T14:30:00',
    auctionType: 'auction',
    bidCount: 7
  },
  {
    id: 5,
    title: '다이슨 V11 무선청소기 컴플리트',
    description: '6개월 사용, 작동 완벽',
    currentPrice: 550000,
    imageUrl: 'https://via.placeholder.com/300x300?text=Dyson+V11',
    condition: '중고 - 상태 좋음',
    seller: 'clean_home',
    sellerRating: 4.6,
    endTime: '2025-06-22T11:15:00',
    auctionType: 'auction',
    bidCount: 5
  },
  {
    id: 6,
    title: '나이키 에어포스 1 로우 화이트 265mm',
    description: '새 제품, 국내 매장 구매',
    currentPrice: 120000,
    imageUrl: 'https://via.placeholder.com/300x300?text=Nike+Air+Force+1',
    condition: '새 상품',
    seller: 'sneaker_head',
    sellerRating: 4.8,
    endTime: '2025-06-20T20:00:00',
    auctionType: 'buy-now',
    bidCount: 0
  },
  {
    id: 7,
    title: '캐논 EOS R5 바디 + RF 24-105 F4 렌즈',
    description: '셔터 카운트 2천회, 풀박스',
    currentPrice: 4120000,
    imageUrl: 'https://via.placeholder.com/300x300?text=Canon+EOS+R5',
    condition: '중고 - 상태 매우 좋음',
    seller: 'photo_master',
    sellerRating: 4.9,
    endTime: '2025-06-24T16:30:00',
    auctionType: 'auction',
    bidCount: 10
  }
];

export const endingSoonProducts = [
  {
    id: 8,
    title: '루이비통 네버풀 MM 다미에 에벤',
    description: '정품, 구매 영수증 있음, 사용감 적음',
    currentPrice: 1450000,
    imageUrl: 'https://via.placeholder.com/300x300?text=Louis+Vuitton+Neverfull',
    condition: '중고 - 상태 좋음',
    seller: 'luxury_goods',
    sellerRating: 4.7,
    endTime: '2025-06-16T10:30:00',
    auctionType: 'auction',
    bidCount: 18
  },
  {
    id: 9,
    title: '발뮤다 토스터 화이트 (The Toaster)',
    description: '3개월 사용, 상태 매우 좋음',
    currentPrice: 189000,
    imageUrl: 'https://via.placeholder.com/300x300?text=Balmuda+Toaster',
    condition: '중고 - 상태 매우 좋음',
    seller: 'kitchen_pro',
    sellerRating: 4.5,
    endTime: '2025-06-16T14:15:00',
    auctionType: 'auction',
    bidCount: 6
  },
  {
    id: 10,
    title: '애플 에어팟 프로 2세대',
    description: '풀박스, 한 달 사용',
    currentPrice: 235000,
    imageUrl: 'https://via.placeholder.com/300x300?text=AirPods+Pro+2',
    condition: '중고 - 상태 매우 좋음',
    seller: 'audio_freak',
    sellerRating: 4.6,
    endTime: '2025-06-16T16:00:00',
    auctionType: 'auction',
    bidCount: 9
  },
  {
    id: 11,
    title: '소니 WH-1000XM5 노이즈캔슬링 헤드폰',
    description: '2개월 사용, 풀박스, 상태 매우 좋음',
    currentPrice: 320000,
    imageUrl: 'https://via.placeholder.com/300x300?text=Sony+WH-1000XM5',
    condition: '중고 - 상태 매우 좋음',
    seller: 'sound_engineer',
    sellerRating: 4.8,
    endTime: '2025-06-16T18:30:00',
    auctionType: 'auction',
    bidCount: 11
  }
];

export const popularProducts = [
  {
    id: 12,
    title: '레고 스타워즈 밀레니엄 팔콘 75192',
    description: '미개봉 새제품, 국내 정품',
    currentPrice: 1050000,
    imageUrl: 'https://via.placeholder.com/300x300?text=LEGO+Millennium+Falcon',
    condition: '새 상품',
    seller: 'brick_master',
    sellerRating: 4.9,
    endTime: '2025-06-25T12:00:00',
    auctionType: 'auction',
    bidCount: 25
  },
  {
    id: 13,
    title: '롤렉스 서브마리너 데이트 126610LN',
    description: '2023년 구매, 풀셋, 상태 매우 좋음',
    currentPrice: 15500000,
    imageUrl: 'https://via.placeholder.com/300x300?text=Rolex+Submariner',
    condition: '중고 - 상태 매우 좋음',
    seller: 'watch_collector',
    sellerRating: 5.0,
    endTime: '2025-06-28T20:00:00',
    auctionType: 'auction',
    bidCount: 32
  },
  {
    id: 14,
    title: '닌텐도 스위치 OLED 화이트 + 게임 3종',
    description: '4개월 사용, 상태 매우 좋음',
    currentPrice: 370000,
    imageUrl: 'https://via.placeholder.com/300x300?text=Nintendo+Switch+OLED',
    condition: '중고 - 상태 매우 좋음',
    seller: 'game_enthusiast',
    sellerRating: 4.7,
    endTime: '2025-06-22T15:45:00',
    auctionType: 'auction',
    bidCount: 17
  },
  {
    id: 15,
    title: '보스 홈스피커 500 화이트',
    description: '새제품, 미개봉',
    currentPrice: 450000,
    imageUrl: 'https://via.placeholder.com/300x300?text=Bose+Home+Speaker+500',
    condition: '새 상품',
    seller: 'audio_store',
    sellerRating: 4.8,
    endTime: '2025-06-23T14:30:00',
    auctionType: 'buy-now',
    bidCount: 0
  }
];

export const newProducts = [
  {
    id: 16,
    title: '샤넬 클래식 미디엄 플랩백 블랙 캐비어',
    description: '새 상품, 풀셋, 매장 구매',
    currentPrice: 9500000,
    imageUrl: 'https://via.placeholder.com/300x300?text=Chanel+Classic+Flap',
    condition: '새 상품',
    seller: 'luxury_authentic',
    sellerRating: 4.9,
    endTime: '2025-06-30T12:00:00',
    auctionType: 'auction',
    bidCount: 5
  },
  {
    id: 17,
    title: '마샬 액톤 II 블루투스 스피커',
    description: '개봉만 한 새 제품, 작동 확인용으로만 사용',
    currentPrice: 280000,
    imageUrl: 'https://via.placeholder.com/300x300?text=Marshall+Acton+II',
    condition: '중고 - 거의 새 것',
    seller: 'audiophile',
    sellerRating: 4.7,
    endTime: '2025-06-24T10:15:00',
    auctionType: 'auction',
    bidCount: 3
  },
  {
    id: 18,
    title: '올리브영 최신 뷰티박스 5월',
    description: '미개봉 새 제품, 정가 10만원',
    currentPrice: 65000,
    imageUrl: 'https://via.placeholder.com/300x300?text=Olive+Young+Beauty+Box',
    condition: '새 상품',
    seller: 'beauty_lover',
    sellerRating: 4.5,
    endTime: '2025-06-20T22:00:00',
    auctionType: 'buy-now',
    bidCount: 0
  },
  {
    id: 19,
    title: '필립스 면도기 S9000 프레스티지',
    description: '미개봉 새제품, AS 가능',
    currentPrice: 320000,
    imageUrl: 'https://via.placeholder.com/300x300?text=Philips+S9000+Prestige',
    condition: '새 상품',
    seller: 'electro_shop',
    sellerRating: 4.8,
    endTime: '2025-06-25T16:30:00',
    auctionType: 'auction',
    bidCount: 2
  }
];

// 상세 제품 정보를 위한 확장 데이터
export const productDetails = {
  1: {
    id: 1,
    title: '애플 아이폰 14 Pro 128GB 스페이스 블랙',
    description: '완전 새 제품, 국내 정식 발매 제품입니다. 2023년 5월 구입했으며, 개봉 후 사용하지 않은 상태입니다. 모든 구성품이 그대로 있으며, 액정보호필름도 부착되어 있지 않은 상태입니다. 애플케어+ 미가입 상태이며, 보증기간은 구매일로부터 1년입니다.',
    fullDescription: `
      # 제품 상세 정보
      - 모델명: 아이폰 14 Pro
      - 용량: 128GB
      - 색상: 스페이스 블랙
      - 구매일: 2023년 5월
      - 보증: 애플 1년 무상보증 적용중
      - 사용기간: 미사용 (개봉만 한 상태)
      
      # 구성품
      - 아이폰 14 Pro 본체
      - 정품 USB-C to Lightning 케이블
      - 퀵 스타트 가이드 및 애플 스티커
      - 원래 구매 영수증 (개인정보 제외)
      
      # 제품 상태
      - 외관: 100% 흠집 없음
      - 기능: 모든 기능 정상 작동
      - 배터리 상태: 100% (미사용)
      
      # 판매 이유
      회사에서 지급받은 휴대폰이 생겨서 판매합니다.
      
      # 직거래 가능 지역
      서울 강남구 일대에서 직거래 가능합니다.
      
      # 발송 방법
      - 직거래: 서울 강남구 일대
      - 택배: 선불 (3,000원)
    `,
    currentPrice: 1250000,
    startingPrice: 1150000,
    buyNowPrice: 1350000,
    bidIncrement: 10000,
    images: [
      'https://via.placeholder.com/800x600?text=iPhone+14+Pro+Main',
      'https://via.placeholder.com/800x600?text=iPhone+14+Pro+Side',
      'https://via.placeholder.com/800x600?text=iPhone+14+Pro+Back',
      'https://via.placeholder.com/800x600?text=iPhone+14+Pro+Box'
    ],
    condition: '새 상품',
    seller: {
      username: 'apple_store',
      rating: 4.9,
      totalSales: 156,
      joinDate: '2022-01-15',
      responseRate: 98,
      responseTime: '1시간 이내'
    },
    endTime: '2025-06-20T15:30:00',
    auctionType: 'auction',
    bidCount: 15,
    bidHistory: [
      { username: 'tech_hunter', amount: 1250000, date: '2025-06-15T14:30:00' },
      { username: 'phone_collector', amount: 1240000, date: '2025-06-15T12:15:00' },
      { username: 'digital_life', amount: 1230000, date: '2025-06-14T23:45:00' },
      { username: 'apple_fan', amount: 1220000, date: '2025-06-14T20:10:00' },
      { username: 'smart_buyer', amount: 1210000, date: '2025-06-14T18:30:00' }
    ],
    viewCount: 342,
    watchCount: 28,
    shippingOptions: [
      { method: '택배', price: 3000, estimatedDelivery: '1-2일 소요' },
      { method: '직거래', price: 0, location: '서울 강남구' }
    ],
    returnPolicy: '단순 변심에 의한 반품은 불가능합니다. 제품에 이상이 있을 경우 3일 이내에 연락주세요.',
    categories: ['전자제품', '스마트폰', '애플']
  }
};