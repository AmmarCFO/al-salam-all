import { Scenario, ScenarioType, MarketingVideo, ComparisonLink } from './types';

export const SCENARIOS: Scenario[] = [
  {
    id: 'combined',
    type: ScenarioType.HYBRID,
    name: 'Hayy Al Salam (Combined Portfolio)',
    color: '#4A2C5A', // Royal Purple
    description: 'Comprehensive analysis for the 23-unit luxury portfolio. Combining 15 × 2BR apartments (10 STR + 5 LTR) and 8 × 3BR apartments (5 STR + 3 LTR) across 12 months lease in Riyadh.',
    
    financials: {
        worst: {
            revenue: 4029045, 
            mabaatShare: 800160, 
            netIncome: 2400480, 
            roi: 8.0
        },
        base: {
            revenue: 4241100,
            mabaatShare: 842025, 
            netIncome: 2526075, 
            roi: 8.42
        },
        best: {
            revenue: 4453155, 
            mabaatShare: 883890, 
            netIncome: 2651670, 
            roi: 8.84
        }
    },

    propertyValue: 34500000, 
    
    unitCount: 23,
    unitLabel: 'Units',
    occupancyDurationLabel: 'Annual Hybrid Projection',
    
    unitMix: [
        { 
            name: '2 Bedroom (Short-Term Rental) - 10 Units', 
            count: 10, 
            avgPrice: 180000, 
            priceRange: { min: 171000, avg: 180000, max: 189000 }, 
        },
        { 
            name: '2 Bedroom (Long-Term Rental) - 5 Units', 
            count: 5, 
            avgPrice: 153000, 
            priceRange: { min: 145350, avg: 153000, max: 160650 }, 
        },
        { 
            name: '3 Bedroom (Short-Term Rental) - 5 Units', 
            count: 5, 
            avgPrice: 222000, 
            priceRange: { min: 210900, avg: 222000, max: 233100 }, 
        },
        { 
            name: '3 Bedroom (Long-Term Rental) - 3 Units', 
            count: 3, 
            avgPrice: 188700, 
            priceRange: { min: 179265, avg: 188700, max: 198135 }, 
        }
    ],
  },
  {
    id: '2br',
    type: ScenarioType.HYBRID,
    name: '2 Bedroom Segment (15 Units)',
    color: '#2A5B64', // Teal
    description: 'Targeted analysis for the 15 Two-Bedroom apartments comprising 10 Short-Term Rental (STR) and 5 Long-Term Rental (LTR) layouts. Designed to capture premium business travelers and families.',
    
    financials: {
        worst: {
            revenue: 2436750, 
            mabaatShare: 480600,
            netIncome: 1441800, 
            roi: 7.2
        },
        base: {
            revenue: 2565000, 
            mabaatShare: 506250,
            netIncome: 1518750, 
            roi: 7.6
        },
        best: {
            revenue: 2693250, 
            mabaatShare: 531900,
            netIncome: 1595700, 
            roi: 8.0
        }
    },

    propertyValue: 22500000, 
    
    unitCount: 15,
    unitLabel: 'Units',
    occupancyDurationLabel: '2BR Sub-Portfolio',
    
    unitMix: [
        { 
            name: '2BR (STR) Layouts', 
            count: 10, 
            avgPrice: 180000,
            priceRange: { min: 171000, avg: 180000, max: 189000 },
        },
        { 
            name: '2BR (LTR) Layouts', 
            count: 5, 
            avgPrice: 153000,
            priceRange: { min: 145350, avg: 153000, max: 160650 },
        }
    ],
  },
  {
    id: '3br',
    type: ScenarioType.HYBRID,
    name: '3 Bedroom Segment (8 Units)',
    color: '#8A6E99', // Muted Violet
    description: 'Targeted analysis for the 8 Three-Bedroom apartments comprising 5 Short-Term Rental (STR) and 3 Long-Term Rental (LTR) units. Geared toward high-income families and premium corporate group trips.',
    
    financials: {
        worst: {
            revenue: 1592295, 
            mabaatShare: 319560,
            netIncome: 958680, 
            roi: 10.0
        },
        base: {
            revenue: 1676100, 
            mabaatShare: 335775,
            netIncome: 1007325, 
            roi: 10.5
        },
        best: {
            revenue: 1759905, 
            mabaatShare: 351990,
            netIncome: 1055970, 
            roi: 11.0
        }
    },

    propertyValue: 12000000, 
    
    unitCount: 8,
    unitLabel: 'Units',
    occupancyDurationLabel: '3BR Sub-Portfolio',
    
    unitMix: [
        { 
            name: '3BR (STR) Layouts', 
            count: 5, 
            avgPrice: 222000,
            priceRange: { min: 210900, avg: 222000, max: 233100 },
        },
        { 
            name: '3BR (LTR) Layouts', 
            count: 3, 
            avgPrice: 188700,
            priceRange: { min: 179265, avg: 188700, max: 198135 },
        }
    ],
  },
  {
    id: 'str',
    type: ScenarioType.SHORT_TERM,
    name: 'STR Portfolio Segment (15 Units)',
    color: '#D4AF37', // Gold
    description: 'Consolidated Short-Term Rental (STR) segment containing 15 units (10 × 2BR and 5 × 3BR). Programmed to capitalize on Riyadh daily pricing advantages.',
    
    financials: {
        worst: {
            revenue: 2764500, 
            mabaatShare: 483787,
            netIncome: 1451363, 
            roi: 7.4
        },
        base: {
            revenue: 2910000, 
            mabaatShare: 509250,
            netIncome: 1527750, 
            roi: 7.8
        },
        best: {
            revenue: 3055500, 
            mabaatShare: 534712,
            netIncome: 1604138, 
            roi: 8.2
        }
    },

    propertyValue: 22500000, 
    
    unitCount: 15,
    unitLabel: 'Units',
    occupancyDurationLabel: 'STR Sub-Portfolio',
    
    unitMix: [
        { 
            name: '2BR Short-Term layouts', 
            count: 10, 
            avgPrice: 180000,
            priceRange: { min: 171000, avg: 180000, max: 189000 },
        },
        { 
            name: '3BR Short-Term layouts', 
            count: 5, 
            avgPrice: 222000,
            priceRange: { min: 210900, avg: 222000, max: 233100 },
        }
    ],
  },
  {
    id: 'ltr',
    type: ScenarioType.LONG_TERM,
    name: 'LTR Portfolio Segment (8 Units)',
    color: '#AA7C11', // Bronze
    description: 'Steady Long-Term Rental (LTR) segment of 8 premium contracts (5 × 2BR and 3 × 3BR). Providing high visual financial predictability, lowering operational churn and marketing costs.',
    
    financials: {
        worst: {
            revenue: 1264545, 
            mabaatShare: 316136,
            netIncome: 948409, 
            roi: 7.9
        },
        base: {
            revenue: 1331100, 
            mabaatShare: 332775,
            netIncome: 998325, 
            roi: 8.3
        },
        best: {
            revenue: 1397655, 
            mabaatShare: 349414,
            netIncome: 1048241, 
            roi: 8.7
        }
    },

    propertyValue: 12000000, 
    
    unitCount: 8,
    unitLabel: 'Units',
    occupancyDurationLabel: 'LTR Sub-Portfolio',
    
    unitMix: [
        { 
            name: '2BR Long-Term layouts', 
            count: 5, 
            avgPrice: 153000,
            priceRange: { min: 145350, avg: 153000, max: 160650 },
        },
        { 
            name: '3BR Long-Term layouts', 
            count: 3, 
            avgPrice: 188700,
            priceRange: { min: 179265, avg: 188700, max: 198135 },
        }
    ],
  }
];

export const MARKETING_VIDEOS: MarketingVideo[] = [
    {
        id: 'v1',
        title: 'Community Overview',
        thumbnailUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
        videoUrl: '#',
    },
    {
        id: 'v2',
        title: 'Apartment Interior',
        thumbnailUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
        videoUrl: '#',
    }
];

export const COMPARISON_LINKS: Record<string, ComparisonLink[]> = {
  combined: [
    {
        platform: 'Azure Compound',
        type: '2 Bedroom Apartment',
        title: '2 Bedroom Apartment in Al Rabwa',
        location: 'Al Rabwa',
        area: '145 sqm',
        price: 135000,
        url: 'https://rightcompound.com/green-diamond-compound',
        photosUrl: 'https://www.canva.com/design/DAG8309BRgE/2V4p8Fmz0oOuQa-AMXBNow/edit?utm_content=DAG8309BRgE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
    },
    {
        platform: 'Roshan Residences',
        type: '2 Bedroom Fully Furnished',
        title: '2 Bedroom Furnished in Al Reem',
        location: 'Al Reem',
        area: '120 sqm',
        price: 145000,
        url: 'https://rightcompound.com/al-reem-residences-compound',
        photosUrl: 'https://www.canva.com/design/DAG84DVDdtU/oWQm9eq2ZwKCDxdi3QPgIw/edit?utm_content=DAG84DVDdtU&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
    },
    {
        platform: 'Al Salam Residences Complexes',
        type: '2 Bedroom Fully Furnished + Terrace',
        title: '2 Bedroom Furnished + Terrace in Al Salam',
        location: 'Al Salam',
        area: '135 sqm',
        price: 150000,
        url: 'https://rightcompound.com/hittin-residential-compound-riyadh',
        photosUrl: 'https://www.canva.com/design/DAG84DmPBK4/ndxj8ASiUXX9SSpUr353YA/edit?utm_content=DAG84DmPBK4&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
    },
    {
        platform: 'Hayy Al Salam Compound',
        type: '3 Bedroom Premium Furnished',
        title: '3 Bedroom Premium in Al Salam, Riyadh',
        location: 'Al Salam',
        area: '185 sqm',
        price: 195000,
        url: '#',
        photosUrl: '#'
    }
  ],
  '2br': [
    {
        platform: 'Azure Compound',
        type: '2 Bedroom Apartment',
        title: '2 Bedroom Apartment in Al Rabwa',
        location: 'Al Rabwa',
        area: '145 sqm',
        price: 135000,
        url: 'https://rightcompound.com/green-diamond-compound',
        photosUrl: 'https://www.canva.com/design/DAG8309BRgE/2V4p8Fmz0oOuQa-AMXBNow/edit?utm_content=DAG8309BRgE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
    },
    {
        platform: 'Azure Compound',
        type: '2 Bedroom Fully Furnished',
        title: '2 Bedroom Furnished in Al Reem',
        location: 'Al Reem',
        area: '120 sqm',
        price: 145000,
        url: 'https://rightcompound.com/al-reem-residences-compound',
        photosUrl: 'https://www.canva.com/design/DAG84DVDdtU/oWQm9eq2ZwKCDxdi3QPgIw/edit?utm_content=DAG84DVDdtU&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
    }
  ],
  '3br': [
    {
        platform: 'Bayut',
        type: '3 Bedroom Furnished',
        title: 'Premium 3BR Apartment in Al Salam',
        location: 'Al Salam',
        area: '180 sqm',
        price: 16500,
        period: '/mo',
        url: 'https://www.bayut.sa/ar/property/details-87842870.html'
    },
    {
        platform: 'Airbnb',
        type: '3 Bedroom Holiday Home',
        title: 'Luxury 3BR with Balcony',
        location: 'Al Salam, Riyadh',
        area: '175 sqm',
        price: 22000,
        period: '/mo',
        url: '#'
    }
  ]
};

export const MABAAT_SHARE_PERCENTAGE = 0.25; // Management fee remains 25%
export const BRANCHES: any[] = [];
