import React from 'react';
import { motion } from 'framer-motion';
import { Scenario } from '../types';

interface SensitivityMatrixProps {
  lang: 'en' | 'ar';
  activeScenario: Scenario;
}

const COMMON_LABELS = {
    en: {
        title: 'Project Sensitivity Matrix',
        subtitle: 'Annual revenue projections under differing occupancy rates and scenario pricing models for the selected segment.',
        occupancyLabel: 'Occupancy Rate',
        currency: 'SAR',
        low: 'Low Range',
        high: 'High Range',
        pessimistic: 'Pessimistic (-5%)',
        base: 'Base Scenario',
        optimistic: 'Optimistic (+5%)',
        descPessimistic: 'Reduced daily/monthly lease yields',
        descBase: 'Normal baseline project rates',
        descOptimistic: 'Premium seasonal demand hikes'
    },
    ar: {
        title: 'مصفوفة حساسية إيرادات المشروع',
        subtitle: 'توقعات الإيرادات السنوية في ظل تباين معدلات الإشغال ونماذج تسعير السيناريوهات للقطاع المحدد.',
        occupancyLabel: 'معدل الإشغال',
        currency: 'ريال',
        low: 'نطاق منخفض',
        high: 'نطاق مرتفع',
        pessimistic: 'السيناريو المتحفظ (-٥٪)',
        base: 'السيناريو الأساسي (الواقعي)',
        optimistic: 'السيناريو المتفائل (+٥٪)',
        descPessimistic: 'عوائد إيجار يومية/شهرية مخفضة',
        descBase: 'معدلات المشروع الأساسية والواقعية',
        descOptimistic: 'ارتفاع الطلب الموسمي والأسعار'
    }
};

const OCCUPANCY_COLS = [1.0, 0.9, 0.8, 0.7, 0.6, 0.5];

const SensitivityMatrix: React.FC<SensitivityMatrixProps> = ({ lang, activeScenario }) => {
  const isRTL = lang === 'ar';
  const t = COMMON_LABELS[lang];
  const locale = isRTL ? 'ar-SA' : 'en-US';

  const scenariosList = [
    { 
       id: 'worst', 
       name: t.pessimistic, 
       desc: t.descPessimistic, 
       color: '#C98B8B', 
       baseVal: activeScenario.financials.worst.revenue 
    },
    { 
       id: 'base', 
       name: t.base, 
       desc: t.descBase, 
       color: '#4A2C5A', 
       baseVal: activeScenario.financials.base.revenue 
    },
    { 
       id: 'best', 
       name: t.optimistic, 
       desc: t.descOptimistic, 
       color: '#10B981', 
       baseVal: activeScenario.financials.best.revenue 
    }
  ];

  // For opacity scaling: find overall min and max in our calculated matrix
  const matrixValues: number[] = [];
  scenariosList.forEach(s => {
    OCCUPANCY_COLS.forEach(occ => {
      matrixValues.push(s.baseVal * occ);
    });
  });
  const overallMin = Math.min(...matrixValues);
  const overallMax = Math.max(...matrixValues);

  return (
    <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`w-full max-w-6xl mx-auto ${isRTL ? 'font-cairo' : 'font-sans'}`} 
        dir={isRTL ? 'rtl' : 'ltr'}
    >
        {/* Dark Glass Card */}
        <div className="bg-[#09090b] rounded-[24px] sm:rounded-[32px] shadow-2xl border border-white/10 overflow-hidden relative">
             {/* Noise Texture */}
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.10] mix-blend-overlay pointer-events-none"></div>
             
             {/* Dynamic Ambient Glow */}
             <div 
                 className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full blur-[80px] sm:blur-[125px] pointer-events-none mix-blend-screen transition-all duration-700"
                 style={{ backgroundColor: `${activeScenario.color}25` }}
             ></div>

             <div className="relative z-10 p-5 sm:p-10">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-10 border-b border-white/5 pb-6 gap-6">
                    <div className="text-center md:text-left rtl:md:text-right">
                        <h3 className="text-xl sm:text-3xl font-bold text-white tracking-tight mb-2">
                            {t.title}
                        </h3>
                        <p className="text-xs sm:text-base leading-relaxed text-white/50 max-w-2xl font-medium">
                            {t.subtitle} <span className="text-white font-bold">{activeScenario.name}</span>
                        </p>
                    </div>
                    {/* Legend */}
                    <div className="flex items-center gap-4 bg-white/5 rounded-full px-5 py-2.5 border border-white/5 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-white opacity-20"></div>
                             <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">{t.low}</span>
                        </div>
                        <div className="w-12 h-[2px] bg-gradient-to-r from-white/10 to-[#10B981] rounded-full"></div>
                        <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981]"></div>
                             <span className="text-[10px] font-bold text-[#10B981] uppercase tracking-wider">{t.high}</span>
                        </div>
                    </div>
                </div>

                {/* Table Content */}
                <div className="overflow-x-auto pb-4 hide-scrollbar">
                     <div className="min-w-[900px]">
                        {/* Column Headers */}
                        <div className="grid grid-cols-7 gap-3 mb-6 px-2 text-center items-end">
                             <div className="col-span-1 text-left rtl:text-right pb-2">
                                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/40 pl-2">
                                    {t.occupancyLabel}
                                </span>
                             </div>
                             {OCCUPANCY_COLS.map((occ) => (
                                 <div key={occ} className="col-span-1">
                                     <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/5">
                                        <span className="text-xs sm:text-sm font-bold text-white">
                                            {`${Math.round(occ * 100)}%`}
                                        </span>
                                     </div>
                                 </div>
                             ))}
                        </div>

                        {/* Rows */}
                        <div className="space-y-4">
                            {scenariosList.map((scenario, sIdx) => (
                                <div key={sIdx} className="grid grid-cols-7 gap-3 items-center p-2 rounded-2xl hover:bg-white/5 transition-colors duration-300">
                                    {/* Row Header */}
                                    <div className="col-span-1 text-left rtl:text-right pr-2">
                                        <div className="text-sm sm:text-base font-bold text-white tracking-tight">{scenario.name}</div>
                                        <div className="text-[10px] font-medium text-white/40 mt-0.5 line-clamp-1">
                                            {scenario.desc}
                                        </div>
                                    </div>

                                    {/* Cells */}
                                    {OCCUPANCY_COLS.map((occ, oIdx) => {
                                        const val = Math.round(scenario.baseVal * occ);
                                        // Calculate intensity
                                        const denominator = overallMax - overallMin;
                                        const fraction = denominator > 0 ? (val - overallMin) / denominator : 0.5;
                                        const opacity = 0.08 + (fraction * 0.75); 
                                        
                                        return (
                                            <motion.div 
                                                key={oIdx} 
                                                className="col-span-1 relative h-[4.2rem] rounded-xl flex flex-col items-center justify-center cursor-default group/cell overflow-hidden"
                                                whileHover={{ scale: 1.05, y: -2 }}
                                                transition={{ type: "spring", stiffness: 450, damping: 25 }}
                                            >
                                                {/* Background Color Layer */}
                                                <div 
                                                    className="absolute inset-0 bg-[#10B981] transition-all duration-300" 
                                                    style={{ opacity }}
                                                />
                                                
                                                {/* Shine Effect */}
                                                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover/cell:opacity-100 transition-opacity duration-300" />
                                                
                                                {/* Border */}
                                                <div className="absolute inset-0 border border-white/5 rounded-xl group-hover/cell:border-white/20 transition-colors duration-200" />

                                                {/* Content */}
                                                <div className="relative z-10 text-center">
                                                    <span className="block text-sm sm:text-base font-black text-white tabular-nums tracking-tight drop-shadow">
                                                        {val.toLocaleString(locale)}
                                                    </span>
                                                    <span className="text-[9px] font-bold text-emerald-300 uppercase tracking-widest mt-0.5 opacity-0 group-hover/cell:opacity-100 transition-all duration-200 absolute left-0 right-0 -bottom-3 translate-y-1 group-hover/cell:translate-y-0">
                                                        {t.currency}
                                                    </span>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                     </div>
                </div>

             </div>
        </div>
    </motion.div>
  );
};

export default SensitivityMatrix;
