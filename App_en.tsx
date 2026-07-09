import React, { useState } from 'react';
import { SCENARIOS, COMPARISON_LINKS } from './constants';
import { Scenario } from './types';
import Header from './components/Header';
import { Section } from './components/DashboardComponents';
import { FadeInUp } from './components/AnimatedWrappers';
import { motion, AnimatePresence } from 'framer-motion';
import { BanknotesIcon } from './components/Icons';
import ComparisonModal from './components/ComparisonModal';
import SensitivityMatrix from './components/SensitivityMatrix';
import DetailedAssumptions from './components/DetailedAssumptions';
import { 
  ResponsiveContainer, 
  AreaChart, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  Area 
} from 'recharts';

const formatCurrency = (value: number) => {
    return `SAR ${Math.round(value).toLocaleString('en-US')}`;
};

type CaseType = 'worst' | 'base' | 'best';

const SegmentedControl: React.FC<{
    name: string;
    options: { value: string | number; label: string; className?: string; activePillClassName?: string; activeTextClassName?: string }[];
    selected: string | number;
    onChange: (value: any) => void;
    dark?: boolean;
}> = ({ name, options, selected, onChange, dark = false }) => {
    
    const containerClass = dark ? 'bg-white/10' : 'bg-[#E5E5EA]';
    const defaultActivePillClass = 'bg-white shadow-sm ring-1 ring-black/5';
    const defaultActiveTextClass = 'text-black';
    const defaultInactiveTextClass = dark ? 'text-white/60 hover:text-white' : 'text-[#8E8E93] hover:text-black';

    return (
        <div className={`p-1 rounded-full flex relative w-full sm:w-auto overflow-hidden ${containerClass}`}>
            {options.map((option) => {
                const isActive = selected === option.value;
                const activePillClass = option.activePillClassName || defaultActivePillClass;
                const activeTextClass = option.activeTextClassName || defaultActiveTextClass;

                return (
                    <button
                        key={option.value}
                        onClick={() => onChange(option.value)}
                        className={`relative z-10 flex-1 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-bold transition-colors duration-200 rounded-full whitespace-nowrap ${
                            isActive ? activeTextClass : (option.className || defaultInactiveTextClass)
                        }`}
                        style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                        {isActive && (
                            <motion.div
                                layoutId={`pill-${name}`}
                                className={`absolute inset-0 rounded-full ${activePillClass}`}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10">{option.label}</span>
                    </button>
                );
            })}
        </div>
    );
};

const DigitalLedger: React.FC<{ 
    revenue: number; 
    items: { category: string; amount: number; color?: string; highlight?: boolean; percent?: number; subtotal?: boolean }[];
    activeCase?: CaseType;
}> = ({ revenue, items, activeCase = 'base' }) => {
    return (
        <div className="w-full space-y-6">
            <div className="flex justify-between items-end border-b border-white/10 pb-4">
                <div>
                     <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-0.5 block animate-pulse">Total Pro-Rata Revenue</span>
                     <span className="text-xl sm:text-2xl font-bold text-white tracking-tight tabular-nums">{formatCurrency(revenue)}</span>
                </div>
                <div className="text-right">
                     <span className="text-[10px] font-medium text-white/40 bg-white/5 px-2 py-0.5 rounded border border-white/5">Active Occupancy</span>
                </div>
            </div>
            
            <div className="space-y-4">
                {items.map((item, idx) => {
                    const percent = item.percent !== undefined ? item.percent : (revenue > 0 ? Math.round((item.amount / revenue) * 100) : 0);
                    
                    if (item.subtotal) {
                        return (
                            <div key={idx} className="border-t border-b border-white/10 py-3.5 my-2 px-1">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${item.color || 'bg-white'} shadow-[0_0_6px_currentColor]`}></div>
                                        <span className="text-sm font-bold text-sky-200 tracking-wide">{item.category}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-base font-black text-white tabular-nums">{formatCurrency(item.amount)}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    }

                    if (item.highlight) {
                         const ledgerHighlightStyles = {
                             worst: {
                                 cardBg: "from-red-500/20 to-red-950/10 border-red-500/30 shadow-[0_8px_32px_rgba(239,68,68,0.15)]",
                                 textColor: "text-red-100",
                                 percentBg: "text-red-400 bg-red-400/10",
                                 glowDot: "text-red-400"
                             },
                             base: {
                                 cardBg: "from-blue-500/20 to-blue-950/10 border-blue-500/30 shadow-[0_8px_32px_rgba(59,130,246,0.15)]",
                                 textColor: "text-blue-100",
                                 percentBg: "text-blue-400 bg-blue-400/10",
                                 glowDot: "text-blue-400"
                             },
                             best: {
                                 cardBg: "from-emerald-500/20 to-emerald-950/10 border-emerald-500/30 shadow-[0_8px_32px_rgba(16,185,129,0.15)]",
                                 textColor: "text-emerald-100",
                                 percentBg: "text-emerald-400 bg-emerald-400/10",
                                 glowDot: "text-emerald-400"
                             }
                         };
                         
                         const styles = ledgerHighlightStyles[activeCase];

                         return (
                            <motion.div 
                                key={idx}
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className={`relative overflow-hidden rounded-2xl bg-gradient-to-b ${styles.cardBg} border p-5 sm:p-6`}
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-20">
                                    <div className="w-16 h-16 bg-white rounded-full blur-2xl animate-pulse"></div>
                                </div>
                                
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                             <div className={`w-2 h-2 rounded-full ${item.color || 'bg-white'} shadow-[0_0_8px_currentColor] ${styles.glowDot}`}></div>
                                             <span className={`text-xs font-bold uppercase tracking-widest ${styles.textColor}`}>{item.category}</span>
                                        </div>
                                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${styles.percentBg}`}>{percent}%</span>
                                    </div>
                                    
                                    <div className="flex items-baseline gap-2 mt-1">
                                        <span className="text-2xl sm:text-4xl font-black text-white tracking-tighter tabular-nums">{formatCurrency(item.amount)}</span>
                                    </div>

                                    <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden mt-4">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${percent}%` }}
                                            transition={{ duration: 1.2, ease: "circOut" }}
                                            className={`h-full rounded-full ${item.color || 'bg-white'} shadow-[0_0_10px_currentColor]`}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    }

                    return (
                        <div key={idx} className="group px-1 opacity-85 hover:opacity-100 transition-opacity">
                            <div className="flex justify-between items-center mb-1.5">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ring-1 ring-white/10 ${item.color || 'bg-white'}`}></div>
                                    <span className="text-xs font-medium text-white/80 tracking-wide">{item.category}</span>
                                </div>
                                <div className="text-right">
                                    <span className="block text-sm font-bold text-white/95 tabular-nums">{formatCurrency(item.amount)}</span>
                                </div>
                            </div>
                            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percent}%` }}
                                    transition={{ duration: 1.2, ease: "circOut" }}
                                    className={`h-full rounded-full ${item.color || 'bg-white'} opacity-60`}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const App_en: React.FC<{ onToggleLanguage: () => void }> = ({ onToggleLanguage }) => {
  const [activeModel, setActiveModel] = useState<'ltr' | 'str' | 'combined'>('combined');
  const [activeCase, setActiveCase] = useState<CaseType>('base');
  const [occupancyRate, setOccupancyRate] = useState<number>(0.8); // 0.8 = 80%
  const [mabaatPercentage] = useState<number>(0.25); // Management fee 25%
  
  const activeScenario = SCENARIOS.find(s => s.id === activeModel) || SCENARIOS[0];
  const baseFinancials = activeScenario.financials[activeCase];

  // Dynamic Calculations
  const effectiveOccupancy = occupancyRate;
  const effectiveRevenue = Math.round(baseFinancials.revenue * effectiveOccupancy);

  const strRatio = activeModel === 'combined' 
    ? 2910000 / 4241100 
    : (activeModel === 'str' ? 1.0 : 0.0);
  const strRevenue = Math.round(effectiveRevenue * strRatio);
  const vatAmount = Math.round(strRevenue * 0.15);
  
  // 15% OTA commission deduction for short-term rental (STR) portion
  const otaCommissionAmount = Math.round(strRevenue * 0.15);

  // Mathwaa management fee is 25% of the remaining revenue AFTER deducting OTA fees and VAT
  const remainingPostDeductions = effectiveRevenue - otaCommissionAmount - vatAmount;
  const effectiveMabaat = remainingPostDeductions > 0 
    ? Math.round(remainingPostDeductions * mabaatPercentage) 
    : 0;
  
  // Owner net net income is the remainder
  const effectiveNetIncome = Math.max(0, remainingPostDeductions - effectiveMabaat);
  
  const caseOptions = [
      { 
          value: 'worst', 
          label: 'Conservative (-5%)',
          activePillClassName: 'bg-red-600 shadow-sm ring-1 ring-red-700',
          activeTextClassName: 'text-white'
      },
      { 
          value: 'base', 
          label: 'Realistic',
          activePillClassName: 'bg-blue-600 shadow-sm ring-1 ring-blue-700',
          activeTextClassName: 'text-white'
      },
      { 
          value: 'best', 
          label: 'Optimistic (+5%)',
          activePillClassName: 'bg-emerald-600 shadow-sm ring-1 ring-emerald-700',
          activeTextClassName: 'text-white'
      },
  ];

  const occupancyOptions = [
      { value: 0.5, label: '50%' },
      { value: 0.6, label: '60%' },
      { 
          value: 0.7, 
          label: '70%', 
          className: 'text-emerald-400 hover:text-emerald-300',
          activePillClassName: 'bg-emerald-500 shadow-sm ring-1 ring-emerald-600',
          activeTextClassName: 'text-white'
      },
      { 
          value: 0.8, 
          label: '80%', 
          className: 'text-emerald-400 hover:text-emerald-300',
          activePillClassName: 'bg-emerald-500 shadow-sm ring-1 ring-emerald-600',
          activeTextClassName: 'text-white'
      },
      { value: 0.9, label: '95%' }, // Improved clarity/breathing of steps
      { value: 1.0, label: '100%' },
  ];

  const caseVisuals = {
    worst: {
      bg: "bg-[#160606]",
      border: "border-red-900/40",
      glow: "shadow-[0_0_60px_rgba(239,68,68,0.1)]",
      statusDot: "bg-red-500",
      badgeBg: "bg-red-500/15 text-red-300 border-red-500/20",
      revenueCardBg: "bg-red-500/5 border-red-500/10",
      highlight: "text-red-400",
      accent: "#EF4444"
    },
    base: {
      bg: "bg-[#060D1E]",
      border: "border-blue-900/40",
      glow: "shadow-[0_0_60px_rgba(59,130,246,0.1)]",
      statusDot: "bg-blue-500",
      badgeBg: "bg-blue-500/15 text-blue-300 border-blue-500/20",
      revenueCardBg: "bg-blue-500/5 border-blue-500/10",
      highlight: "text-blue-400",
      accent: "#3B82F6"
    },
    best: {
      bg: "bg-[#031109]",
      border: "border-emerald-900/40",
      glow: "shadow-[0_0_60px_rgba(16,185,129,0.1)]",
      statusDot: "bg-emerald-500",
      badgeBg: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
      revenueCardBg: "bg-emerald-500/5 border-emerald-500/10",
      highlight: "text-emerald-400",
      accent: "#10B981"
    }
  };

  // Build ledger items
  const postDeductionsBase = effectiveRevenue - otaCommissionAmount - vatAmount;
  const ownerPercent = postDeductionsBase > 0 ? Math.round((effectiveNetIncome / postDeductionsBase) * 100) : 0;
  const mathwaaPercent = postDeductionsBase > 0 ? Math.round((effectiveMabaat / postDeductionsBase) * 100) : 0;
  const ledgerItems = [
    ...(otaCommissionAmount > 0 ? [{ category: 'OTA Booking Commission (15% of STR)', amount: otaCommissionAmount, color: 'bg-amber-500' }] : []),
    ...(vatAmount > 0 ? [{ category: 'VAT (15%)', amount: vatAmount, color: 'bg-[#D4AF37]' }] : []),
    { category: 'Net Revenue', amount: postDeductionsBase, color: 'bg-sky-400', subtotal: true },
    { category: `Mathwaa Management Fee (${mathwaaPercent}%)`, amount: effectiveMabaat, color: 'bg-purple-400', percent: mathwaaPercent },
    { category: "Owner's Net Net Income", amount: effectiveNetIncome, color: 'bg-emerald-400', highlight: true, percent: ownerPercent }
  ];

  // dynamic chart generation based on currently selected scenario
  const getDynamicChartData = () => {
    return [0.5, 0.6, 0.7, 0.8, 0.9, 1.0].map(occ => {
      return {
        name: `${Math.round(occ * 100)}% Occ`,
        pessimistic: Math.round(activeScenario.financials.worst.revenue * occ),
        base: Math.round(activeScenario.financials.base.revenue * occ),
        optimistic: Math.round(activeScenario.financials.best.revenue * occ)
      };
    });
  };

  const chartData = getDynamicChartData();

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] font-sans overflow-x-hidden selection:bg-[#4A2C5A] selection:text-white">
      <Header onToggleLanguage={onToggleLanguage} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        
        {/* Project Header */}
        <FadeInUp>
          <div className="text-center pt-8 pb-8 sm:pt-14 sm:pb-8">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-block mb-3 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm"
            >
                <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-purple-700 font-mono">Hayy Al Salam Project - Feasibility Dashboard</span>
            </motion.div>
            <h1 className="text-4xl sm:text-7xl font-black text-[#1D1D1F] tracking-tighter mb-4 leading-none select-none">
              Hayy Al Salam<span className="text-[#8A6E99]">.</span>
            </h1>
            <p className="text-xs sm:text-xl text-gray-500 max-w-3xl mx-auto font-medium leading-relaxed tracking-tight px-4 mb-12">
                Riyadh Luxury Property Analysis under <span className="text-[#8A6E99] font-bold">Hybrid Models</span>. 23 Unified Premium Units comprising 15 × 2BR and 8 × 3BR, divided into short-term (STR) and long-term (LTR) operations.
            </p>
          </div>
        </FadeInUp>

        {/* STATS OVERVIEW CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 sm:mb-12">
          <motion.div whileHover={{ y: -3 }} className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-sm">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Total Unit Inventory</span>
            <span className="text-2xl sm:text-4xl font-extrabold text-[#4A2C5A] tracking-tight">23 Units</span>
            <span className="text-xs text-gray-500 block mt-1">15 x 2BR | 8 x 3BR</span>
          </motion.div>
          <motion.div whileHover={{ y: -3 }} className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-sm">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">STR Sub-Segment</span>
            <span className="text-2xl sm:text-4xl font-extrabold text-amber-600 tracking-tight">15 Units</span>
            <span className="text-xs text-gray-500 block mt-1">10 x 2BR | 5 x 3BR</span>
          </motion.div>
          <motion.div whileHover={{ y: -3 }} className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-sm">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">LTR Sub-Segment</span>
            <span className="text-2xl sm:text-4xl font-extrabold text-blue-600 tracking-tight">8 Units</span>
            <span className="text-xs text-gray-500 block mt-1">5 x 2BR | 3 x 3BR</span>
          </motion.div>
          <motion.div whileHover={{ y: -3 }} className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-sm">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Active Cycle Split</span>
            <span className="text-2xl sm:text-4xl font-extrabold text-purple-700 tracking-tight">12 Months</span>
            <span className="text-xs text-gray-500 block mt-1">Continuous Year-Round Operations</span>
          </motion.div>
        </div>

        {/* ASSET OPERATING STRATEGY SELECTOR */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Active Operating Strategy</h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">Select one of the 3 deployment models to simulate the 23-unit luxury portfolio performance.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Executive LTR */}
            <button 
              onClick={() => setActiveModel('ltr')}
              className={`text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between cursor-pointer ${
                activeModel === 'ltr' 
                  ? 'bg-amber-600/5 border-amber-600 shadow-sm ring-1 ring-amber-600/30' 
                  : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm'
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase ${
                    activeModel === 'ltr' ? 'bg-amber-600/10 text-amber-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                    Executive LTR
                  </div>
                  <span className="text-xs font-mono font-bold text-gray-400">8 Units</span>
                </div>
                <h4 className="font-bold text-gray-900 text-base mb-1">Long-Term Rental</h4>
                <p className="text-xs text-gray-500 leading-relaxed">Stable 1-year corporate leases, zero tenant turnover friction, and steady yields.</p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between w-full">
                <span className="text-[10px] text-gray-400 font-mono">BASE YR1 REVENUE</span>
                <span className="text-sm font-extrabold text-amber-600">SAR 1,331,100</span>
              </div>
            </button>

            {/* STR */}
            <button 
              onClick={() => setActiveModel('str')}
              className={`text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between cursor-pointer ${
                activeModel === 'str' 
                  ? 'bg-amber-500/5 border-amber-500 shadow-sm ring-1 ring-amber-500/30' 
                  : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm'
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase ${
                    activeModel === 'str' ? 'bg-amber-500/10 text-amber-600' : 'bg-gray-100 text-gray-500'
                  }`}>
                    Short-Term (STR)
                  </div>
                  <span className="text-xs font-mono font-bold text-gray-400">15 Units</span>
                </div>
                <h4 className="font-bold text-gray-900 text-base mb-1">STR Portfolio Segment</h4>
                <p className="text-xs text-gray-500 leading-relaxed">Premium daily pricing capturing tourism surges, weekend bookings, and seasonal peaks.</p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between w-full">
                <span className="text-[10px] text-gray-400 font-mono">BASE YR1 REVENUE</span>
                <span className="text-sm font-extrabold text-amber-500">SAR 2,910,000</span>
              </div>
            </button>

            {/* Combined */}
            <button 
              onClick={() => setActiveModel('combined')}
              className={`text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between cursor-pointer ${
                activeModel === 'combined' 
                  ? 'bg-[#4A2C5A]/5 border-[#4A2C5A] shadow-sm ring-1 ring-[#4A2C5A]/30' 
                  : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm'
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase ${
                    activeModel === 'combined' ? 'bg-[#4A2C5A]/10 text-[#4A2C5A]' : 'bg-gray-100 text-gray-500'
                  }`}>
                    Combined Model
                  </div>
                  <span className="text-xs font-mono font-bold text-gray-400">23 Units (All)</span>
                </div>
                <h4 className="font-bold text-gray-900 text-base mb-1">Hybrid Portfolio Model</h4>
                <p className="text-xs text-gray-500 leading-relaxed">Optimal blend: 15 units running STR to milk peaks, and 8 stable units under permanent contracts.</p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between w-full">
                <span className="text-[10px] text-gray-400 font-mono">BASE YR1 REVENUE</span>
                <span className="text-sm font-extrabold text-[#4A2C5A]">SAR 4,241,100</span>
              </div>
            </button>
          </div>
        </div>

        {/* THE COCKPIT PORTFOLIO ANALYSIS MODULE */}
        <Section title="Interactive Portfolio Simulator" className="!mt-0 !pt-0" titleColor="text-[#1D1D1F]">
            
            <div className={`text-white rounded-3xl sm:rounded-[2.5rem] relative overflow-hidden transition-all duration-500 border ${caseVisuals[activeCase].bg} ${caseVisuals[activeCase].border} ${caseVisuals[activeCase].glow}`}>
                {/* Noise Texture */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 mix-blend-overlay pointer-events-none"></div>
                
                {/* Sticky control bar */}
                <div className="bg-white/5 backdrop-blur-xl border-b border-white/10 p-5 sm:p-6 flex flex-col gap-4 sticky top-0 z-20">
                    <div className="flex flex-col xl:flex-row items-center justify-between gap-4">
                         
                         {/* Portfolio Info Badge */}
                         <div className="flex items-center gap-3 text-left w-full xl:w-auto">
                             <span className={`w-3 h-3 rounded-full animate-pulse ${caseVisuals[activeCase].statusDot}`}></span>
                             <span className="text-xs sm:text-sm font-bold text-white font-mono">
                                 {activeModel === 'ltr' 
                                   ? "Hayy Al Salam Executive LTR (8 Luxury Units)" 
                                   : activeModel === 'str' 
                                     ? "Hayy Al Salam STR Segment (15 Luxury Units)" 
                                     : "Hayy Al Salam Combined Portfolio (23 Luxury Units)"}
                             </span>
                         </div>

                        {/* Scenario select */}
                        <div className="w-full xl:w-auto overflow-x-auto pb-1 xl:pb-0 hide-scrollbar">
                            <div className="min-w-max flex flex-col sm:flex-row items-start sm:items-center gap-2">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 block sm:inline mb-1 sm:mb-0">Scenario Tier:</span>
                                <SegmentedControl 
                                    name="portfolio-case"
                                    selected={activeCase} 
                                    onChange={(val) => setActiveCase(val)}
                                    dark={true}
                                    options={caseOptions}
                                />
                            </div>
                        </div>
                    </div>
                    
                    {/* Occupancy and fees selector */}
                    <div className="w-full overflow-x-auto pb-1 sm:pb-0 hide-scrollbar border-t border-white/10 pt-3">
                         <div className="flex flex-col sm:flex-row items-center justify-between gap-4 min-w-max mx-auto">
                            
                            {/* Occupancy rate slider values */}
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Set Occupancy:</span>
                                <SegmentedControl 
                                    name="portfolio-occupancy"
                                    selected={occupancyRate} 
                                    onChange={(val) => setOccupancyRate(val)}
                                    dark={true}
                                    options={occupancyOptions}
                                />
                            </div>

                            {/* Mathwaa standard commission */}
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Exclusive Mgmt Fee:</span>
                                <div className="p-1 rounded-full flex relative bg-white/10">
                                    <div className="px-4 py-1.5 text-xs sm:text-sm font-bold rounded-full bg-white text-black shadow-sm ring-1 ring-black/5 cursor-default">
                                        25% Mathwaa Management Fee
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${activeScenario.id}-${activeCase}-${occupancyRate}`}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3, ease: "circOut" }}
                        className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10"
                    >
                        {/* LEFT COLUMN */}
                        <div className="lg:col-span-7 space-y-6">
                            
                            {/* Prominent Revenue figures */}
                            <div className={`rounded-3xl p-6 sm:p-8 border transition-all duration-500 relative overflow-hidden ${caseVisuals[activeCase].revenueCardBg}`}>
                                <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                                    <BanknotesIcon className="w-32 h-32 text-white" />
                                </div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/55 mb-2">
                                    Simulated Year 1 Gross Revenue
                                </p>
                                <div className="flex items-baseline gap-4">
                                    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tighter text-white tabular-nums">
                                        {formatCurrency(effectiveRevenue)}
                                    </h2>
                                </div>
                                <div className={`inline-flex items-center gap-2 mt-4 px-3 py-1 rounded-full border transition-all duration-500 ${caseVisuals[activeCase].badgeBg}`}>
                                    <span className={`w-2 h-2 rounded-full animate-pulse ${caseVisuals[activeCase].statusDot}`}></span>
                                    <span className="text-[10px] font-bold text-white/90 tracking-wider uppercase font-mono">
                                        {activeScenario.occupancyDurationLabel} @ {Math.round(effectiveOccupancy * 100)}% OCCUPANCY Rate
                                    </span>
                                </div>

                                {vatAmount > 0 && (
                                    <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-xs font-sans">
                                        <div>
                                            <span className="text-white/40 block">Net Revenue:</span>
                                            <span className="text-white font-bold">{formatCurrency(strRevenue)}</span>
                                        </div>
                                        <div>
                                            <span className="text-white/40 block">Collected VAT (15%):</span>
                                            <span className={`font-bold font-mono ${caseVisuals[activeCase].highlight}`}>+{formatCurrency(vatAmount)}</span>
                                        </div>
                                        <div className="col-span-2 pt-2 border-t border-white/5 flex justify-between items-center text-sm">
                                            <span className="text-white/60 font-semibold font-sans">Total Booking Invoice (Incl. VAT):</span>
                                            <span className={`font-extrabold ${caseVisuals[activeCase].highlight}`}>{formatCurrency(effectiveRevenue + vatAmount)}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Net Income breakdown glass ledger */}
                            <div className={`rounded-3xl p-5 sm:p-6 border transition-all duration-500 ${caseVisuals[activeCase].revenueCardBg}`}>
                                <h4 className="text-sm font-bold mb-4 flex items-center gap-2 text-white/90">
                                    <div className="p-1.5 bg-white/10 rounded-md">
                                        <BanknotesIcon className={`w-4 h-4 ${caseVisuals[activeCase].highlight}`} />
                                    </div>
                                    Ownership Share & Fee Dividends
                                </h4>
                                <DigitalLedger 
                                    revenue={effectiveRevenue} 
                                    items={ledgerItems} 
                                    activeCase={activeCase}
                                />
                            </div>
                        </div>

                        {/* RIGHT COLUMN */}
                        <div className="lg:col-span-12 xl:col-span-5 space-y-6 lg:order-none">
                             
                             {/* Description block */}
                             <div className={`p-6 rounded-3xl border transition-all duration-500 ${caseVisuals[activeCase].revenueCardBg}`}>
                                 <h4 className="text-white font-bold text-base mb-2">Segment Strategic Orientation</h4>
                                 <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                                     {activeScenario.description}
                                 </p>
                             </div>

                             {/* Units counts Mix for the active segment */}
                             <div className={`rounded-3xl p-5 sm:p-6 border transition-all duration-500 ${caseVisuals[activeCase].revenueCardBg}`}>
                                 <h4 className="text-sm font-bold mb-4 text-white/90">{activeScenario.unitCount} Active Segment Units</h4>
                                 <div className="space-y-3">
                                     {activeScenario.unitMix.map((unit, idx) => (
                                         <div key={idx} className="bg-white/5 rounded-2xl p-4 border border-white/5">
                                             <div className="flex justify-between items-center mb-1">
                                                 <span className="text-xs font-bold text-white block">{unit.name}</span>
                                                 <span className={`text-sm font-black ${caseVisuals[activeCase].highlight}`}>{unit.count} Units</span>
                                             </div>
                                             <p className="text-[10px] text-white/40">Blended Seasonal Plan Yield Rate</p>
                                         </div>
                                     ))}
                                 </div>
                             </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </Section>

        {/* VISUAL CHART SECTION: SENSITIVITY CURVES */}
        <Section title="Revenue Curve vs. Occupancy Levels" titleColor="text-[#1D1D1F]">
             <div className="bg-white rounded-3xl p-5 sm:p-8 border border-gray-200/80 shadow-sm">
                 <div className="mb-6">
                     <h4 className="text-lg font-bold text-gray-900 mb-1">Scenario Comparison Scale</h4>
                     <p className="text-xs sm:text-sm text-gray-500">Visualizing how Pessimistic (-5%), Base (Baseline), and Optimistic (+5%) models perform from 50% to 100% occupancy for <span className="font-bold text-purple-700">{activeScenario.name}</span>.</p>
                 </div>
                 
                 <div className="h-[300px] sm:h-[400px] w-full">
                     <ResponsiveContainer width="100%" height="100%">
                         <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                             <defs>
                                 <linearGradient id="colorOptimistic" x1="0" y1="0" x2="0" y2="1">
                                     <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                                     <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                                 </linearGradient>
                                 <linearGradient id="colorBase" x1="0" y1="0" x2="0" y2="1">
                                     <stop offset="5%" stopColor="#4A2C5A" stopOpacity={0.2}/>
                                     <stop offset="95%" stopColor="#4A2C5A" stopOpacity={0}/>
                                 </linearGradient>
                                 <linearGradient id="colorPessimistic" x1="0" y1="0" x2="0" y2="1">
                                     <stop offset="5%" stopColor="#8E8E93" stopOpacity={0.2}/>
                                     <stop offset="95%" stopColor="#8E8E93" stopOpacity={0}/>
                                 </linearGradient>
                             </defs>
                             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB"/>
                             <XAxis dataKey="name" stroke="#9CA3AF" tick={{ fontSize: 11, fontWeight: 'bold' }} />
                             <YAxis 
                                 stroke="#9CA3AF" 
                                 tick={{ fontSize: 10 }} 
                                 tickFormatter={(v) => `SAR ${(v / 1000).toLocaleString()}k`} 
                             />
                             <Tooltip 
                                 formatter={(val: number) => [formatCurrency(val), '']} 
                                 contentStyle={{ backgroundColor: '#1F2937', color: '#FFF', borderRadius: '12px', border: 'none', fontSize: '12px' }} 
                             />
                             <Legend iconType="circle" />
                             <Area 
                                 name="Optimistic (+5%)" 
                                 type="monotone" 
                                 dataKey="optimistic" 
                                 stroke="#10B981" 
                                 fillOpacity={1} 
                                 fill="url(#colorOptimistic)" 
                                 strokeWidth={3}
                             />
                             <Area 
                                 name="Base (Normal)" 
                                 type="monotone" 
                                 dataKey="base" 
                                 stroke="#4A2C5A" 
                                 fillOpacity={1} 
                                 fill="url(#colorBase)" 
                                 strokeWidth={3}
                             />
                             <Area 
                                 name="Pessimistic (-5%)" 
                                 type="monotone" 
                                 dataKey="pessimistic" 
                                 stroke="#8E8E93" 
                                 fillOpacity={1} 
                                 fill="url(#colorPessimistic)" 
                                 strokeWidth={2}
                             />
                         </AreaChart>
                     </ResponsiveContainer>
                 </div>
             </div>
        </Section>

        {/* DYNAMIC SENSITIVITY MATRIX */}
        <div className="mt-12 sm:mt-16">
            <SensitivityMatrix lang="en" activeScenario={activeScenario} />
        </div>

        {/* COMPREHENSIVE MODEL ASSUMPTIONS */}
        <DetailedAssumptions lang="en" />

      </main>

      <footer className="py-16 text-center bg-gray-100/50 border-t border-gray-200">
         <p className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-[0.25em]">
            Study by Mathwaa Property Management® / Proprietary and Confidential
         </p>
         <p className="text-[10px] text-gray-300 mt-2 font-mono">Platform v2.10 (Riyadh Feasibility Engine)</p>
      </footer>
    </div>
  );
};

export default App_en;
